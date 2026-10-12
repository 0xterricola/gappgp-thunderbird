import * as openpgp from "openpgp";

const MAX_CERTIFICATE_BYTES = 65536;

export function extractMailbox(value) {
  if (typeof value !== "string") {
    throw new Error("Sender address must be a string");
  }

  const text = value.trim();
  const match = text.match(/<([^<>]+)>$/);
  const address = match ? match[1] : text;

  if (
    !/^[^\s<>@,]+@[^\s<>@,]+$/.test(address) ||
    /[\r\n]/.test(text)
  ) {
    throw new Error("Invalid sender email address");
  }

  return address.toLowerCase();
}

export async function validateSenderIdentity({
  certificateBytes,
  expectedFingerprint,
  from
}) {
  if (
    !(certificateBytes instanceof Uint8Array) ||
    certificateBytes.length === 0 ||
    certificateBytes.length > MAX_CERTIFICATE_BYTES
  ) {
    throw new Error("Invalid public certificate");
  }

  const approvedFingerprint = String(
    expectedFingerprint ?? ""
  ).replace(/\s/g, "").toUpperCase();

  if (!/^[0-9A-F]{40}$/.test(approvedFingerprint)) {
    throw new Error("Explicit approved fingerprint required");
  }

  const config = {
    ...openpgp.config,
    rejectCurves: new Set(
      [...openpgp.config.rejectCurves].filter(
        curve => curve !== openpgp.enums.curve.secp256k1
      )
    )
  };

  const key = await openpgp.readKey({
    binaryKey: certificateBytes
  });

  const fingerprint = key.getFingerprint().toUpperCase();

  if (fingerprint !== approvedFingerprint) {
    throw new Error("Certificate fingerprint does not match approved identity");
  }

  const userIDs = key.getUserIDs();

  if (userIDs.length !== 1) {
    throw new Error("Expected exactly one certified User ID");
  }

  const certifiedEmail = extractMailbox(userIDs[0]);
  const senderEmail = extractMailbox(from);

  if (certifiedEmail !== senderEmail) {
    throw new Error("Thunderbird sender does not match certificate User ID");
  }

  await key.verifyPrimaryKey(undefined, undefined, config);

  const certifications = await key.verifyPrimaryUser(
    undefined,
    new Date(),
    undefined,
    config
  );

  const primaryKeyID = key.getKeyID().toHex();

  if (!certifications.some(
    certification =>
      certification.valid === true &&
      certification.keyID.toHex() === primaryKeyID
  )) {
    throw new Error("Valid User ID self-certification not found");
  }

  const creationDate = key.getCreationTime();
  const keyCreationTime = Math.floor(
    creationDate.getTime() / 1000
  );

  if (
    !Number.isInteger(keyCreationTime) ||
    keyCreationTime <= 0 ||
    keyCreationTime > 0xffffffff
  ) {
    throw new Error("Invalid OpenPGP key creation time");
  }

  return {
    fingerprint,
    userID: userIDs[0],
    email: certifiedEmail,
    keyCreationTime
  };
}
