import * as openpgp from "openpgp";
import { validateSenderIdentity } from "./sender-identity.js";

export { validateSenderIdentity };

const EXPECTED_FINGERPRINT =
  "07D8539F269583C160E333151763E15ED3E9286C";

export async function verifyHardwareSignature({
  messageBytes,
  signatureBytes,
  certificateBytes,
  expectedFingerprint = EXPECTED_FINGERPRINT
}) {
  if (
    !(messageBytes instanceof Uint8Array) ||
    !(signatureBytes instanceof Uint8Array) ||
    !(certificateBytes instanceof Uint8Array)
  ) {
    throw new Error("Expected binary message, signature and certificate");
  }

  if (
    messageBytes.length === 0 ||
    messageBytes.length > 104 ||
    signatureBytes.length === 0 ||
    signatureBytes.length > 8192
  ) {
    throw new Error("Invalid input length");
  }

  // The current proof of concept supports ASCII canonical text only.
  if (messageBytes.some(byte => byte > 0x7f)) {
    throw new Error("Non-ASCII message unsupported");
  }

  const publicKey = await openpgp.readKey({
    binaryKey: certificateBytes
  });

  const fingerprint = publicKey.getFingerprint().toUpperCase();

  const approvedFingerprint = String(
    expectedFingerprint ?? ""
  ).replace(/\s/g, "").toUpperCase();

  if (!/^[0-9A-F]{40}$/.test(approvedFingerprint)) {
    throw new Error("Invalid approved signing fingerprint");
  }

  if (fingerprint !== approvedFingerprint) {
    throw new Error("Unexpected signing certificate");
  }

  const signature = await openpgp.readSignature({
    binarySignature: signatureBytes
  });

  const messageText = new TextDecoder().decode(messageBytes);

  const message = await openpgp.createMessage({
    text: messageText
  });

  // Explicitly permit secp256k1 for this known hardware key.
  // Leave unrelated algorithm policies unchanged.
  const config = {
    rejectCurves: new Set(
      [...openpgp.config.rejectCurves].filter(
        curve => curve !== openpgp.enums.curve.secp256k1
      )
    )
  };

  const result = await openpgp.verify({
    message,
    signature,
    verificationKeys: publicKey,
    config
  });

  if (result.signatures.length !== 1) {
    throw new Error("Expected exactly one signature");
  }

  const verification = result.signatures[0];

  await verification.verified;

  const keyID = verification.keyID.toHex();

  if (keyID !== publicKey.getKeyID().toHex()) {
    throw new Error("Unexpected signing key ID");
  }

  return {
    verified: true,
    fingerprint,
    keyID,
    messageBytes: messageBytes.length
  };
}

// ShellPGP v0.5 — Export the verified hardware-signing fixture.
// This is not the current Thunderbird compose message.

export async function createSignedFixtureEmail({
  messageBytes,
  signatureBytes,
  certificateBytes
}) {
  const expectedFixture =
    "Content-Type: text/plain; charset=us-ascii\r\n" +
    "\r\n" +
    "Hello from Keycard Shell.\r\n";

  const expectedBytes = new TextEncoder().encode(expectedFixture);

  if (
    messageBytes.length !== expectedBytes.length ||
    !messageBytes.every((byte, index) => byte === expectedBytes[index])
  ) {
    throw new Error("Only the verified MIME test fixture can be exported");
  }

  // Reverify cryptographically before producing an email.
  const verification = await verifyHardwareSignature({
    messageBytes,
    signatureBytes,
    certificateBytes
  });

  if (!verification.verified) {
    throw new Error("Hardware signature verification failed");
  }

  const signature = await openpgp.readSignature({
    binarySignature: signatureBytes
  });

  // The signing time is part of the authenticated OpenPGP signature.
  // Verification above must succeed before this value is used.
  const signatureCreationTime = signature.packets?.[0]?.created;

  if (
    !(signatureCreationTime instanceof Date) ||
    !Number.isFinite(signatureCreationTime.getTime())
  ) {
    throw new Error("Invalid OpenPGP signature creation time");
  }

  const armor = signature.armor()
    .replace(/\r?\n/g, "\r\n")
    .replace(/\r\n*$/, "\r\n");

  const boundary = "shellpgp-keycard-hardware-test-v05";

  const headers = [
    "From: Keycard Test <keycard@example.com>",
    "To: Keycard Test <keycard@example.com>",
    "Subject: ShellPGP Hardware Signing Test",
    `Date: ${signatureCreationTime.toUTCString()}`,
    "MIME-Version: 1.0",
    "X-ShellPGP-Prototype: fixture-only",
    `Content-Type: multipart/signed; protocol="application/pgp-signature"; micalg=pgp-sha256; boundary="${boundary}"`
  ];

  const eml =
    headers.join("\r\n") +
    "\r\n\r\n" +
    `--${boundary}\r\n` +
    expectedFixture +
    // Extra CRLF: the delimiter's CRLF is not part of the signed entity.
    `\r\n--${boundary}\r\n` +
    'Content-Type: application/pgp-signature; name="signature.asc"\r\n' +
    "Content-Description: OpenPGP digital signature\r\n" +
    'Content-Disposition: attachment; filename="signature.asc"\r\n' +
    "Content-Transfer-Encoding: 7bit\r\n" +
    "\r\n" +
    armor +
    `--${boundary}--\r\n`;

  return {
    eml,
    fingerprint: verification.fingerprint,
    keyID: verification.keyID
  };
}

// ShellPGP v0.6 — Export a newly signed Thunderbird compose message.
// Only the MIME body is cryptographically signed. RFC 5322 headers
// (From, To, Subject, Date) are not covered by the OpenPGP signature.

function safeComposeHeader(value, label, required = false) {
  if (typeof value !== "string" || value.length > 180) {
    throw new Error(`Invalid ${label} header`);
  }

  if (/[^\x20-\x7e]/.test(value)) {
    throw new Error(`${label} must be single-line ASCII`);
  }

  const cleaned = value.trim();

  if (required && !cleaned) {
    throw new Error(`${label} is required`);
  }

  return cleaned;
}

export async function createSignedComposeEmail({
  messageBytes,
  signatureBytes,
  certificateBytes,
  expectedFingerprint = EXPECTED_FINGERPRINT,
  expectedSignatureCreationTime,
  subject,
  from,
  to
}) {
  const mimePrefix =
    "Content-Type: text/plain; charset=us-ascii\r\n\r\n";

  if (!(messageBytes instanceof Uint8Array)) {
    throw new Error("Invalid compose MIME bytes");
  }

  const mimeText = new TextDecoder("utf-8", {
    fatal: true
  }).decode(messageBytes);

  if (
    !mimeText.startsWith(mimePrefix) ||
    !mimeText.endsWith("\r\n") ||
    /(?<!\r)\n/.test(mimeText)
  ) {
    throw new Error("Unsupported MIME signing payload");
  }

  if (
    !Number.isInteger(expectedSignatureCreationTime) ||
    expectedSignatureCreationTime <= 0
  ) {
    throw new Error("Invalid expected signature timestamp");
  }

  const safeSubject = safeComposeHeader(
    subject ?? "",
    "Subject"
  );

  const safeFrom = safeComposeHeader(
    from,
    "From",
    true
  );

  if (
    !Array.isArray(to) ||
    !to.every(recipient => typeof recipient === "string")
  ) {
    throw new Error("Unsupported recipient format");
  }

  const safeRecipients = to.map(recipient =>
    safeComposeHeader(recipient, "To", true)
  );

  // Verify the certificate, its User ID, and sender alignment.
  await validateSenderIdentity({
    certificateBytes,
    expectedFingerprint,
    from: safeFrom
  });

  // Independently verify the exact MIME bytes.
  const verification = await verifyHardwareSignature({
    messageBytes,
    signatureBytes,
    certificateBytes,
    expectedFingerprint
  });

  if (!verification.verified) {
    throw new Error("Hardware signature is not verified");
  }

  const signature = await openpgp.readSignature({
    binarySignature: signatureBytes
  });

  const created = signature.packets?.[0]?.created;

  if (
    !(created instanceof Date) ||
    !Number.isFinite(created.getTime())
  ) {
    throw new Error("Invalid signature creation timestamp");
  }

  const actualCreationTime = Math.floor(
    created.getTime() / 1000
  );

  if (actualCreationTime !== expectedSignatureCreationTime) {
    throw new Error(
      "Signature timestamp does not match the signing request"
    );
  }

  const boundary = "shellpgp-compose-v06";

  // Reject a signed body containing our MIME boundary delimiter.
  if (mimeText.includes("\r\n--" + boundary)) {
    throw new Error("MIME boundary collision");
  }

  const armor = signature.armor()
    .replace(/\r?\n/g, "\r\n")
    .trimEnd() + "\r\n";

  const headers = [
    `From: ${safeFrom}`,
    ...(safeRecipients.length
      ? [`To: ${safeRecipients.join(", ")}`]
      : []),
    `Subject: ${safeSubject}`,
    `Date: ${created.toUTCString()}`,
    "MIME-Version: 1.0",
    "X-ShellPGP-Prototype: v0.6-compose-export",
    `Content-Type: multipart/signed; protocol="application/pgp-signature"; micalg=pgp-sha256; boundary="${boundary}"`
  ];

  const eml =
    headers.join("\r\n") +
    "\r\n\r\n" +
    `--${boundary}\r\n` +
    mimeText +
    `\r\n--${boundary}\r\n` +
    'Content-Type: application/pgp-signature; name="signature.asc"\r\n' +
    "Content-Description: OpenPGP digital signature\r\n" +
    'Content-Disposition: attachment; filename="signature.asc"\r\n' +
    "Content-Transfer-Encoding: 7bit\r\n" +
    "\r\n" +
    armor +
    `--${boundary}--\r\n`;

  return {
    eml,
    verified: true,
    fingerprint: verification.fingerprint,
    keyID: verification.keyID,
    messageBytes: messageBytes.length,
    signatureCreationTime: actualCreationTime
  };
}
