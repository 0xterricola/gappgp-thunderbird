import * as openpgp from "openpgp";

const EXPECTED_FINGERPRINT =
  "07D8539F269583C160E333151763E15ED3E9286C";

export async function verifyHardwareSignature({
  messageBytes,
  signatureBytes,
  certificateBytes
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

  if (fingerprint !== EXPECTED_FINGERPRINT) {
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
