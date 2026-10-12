import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import * as openpgp from "openpgp";

import {
  createSignedComposeEmail
} from "../src/verification/browser-entry.js";

const signatureBytes = new Uint8Array(
  readFileSync("fixtures/hardware-signature.sig")
);

const messageBytes = new Uint8Array(
  readFileSync("fixtures/hardware-message.txt")
);

const certificateBytes = new Uint8Array(
  readFileSync("fixtures/keycard-test-cert.pgp")
);

const signature = await openpgp.readSignature({
  binarySignature: signatureBytes
});

const signatureTime = Math.floor(
  signature.packets[0].created.getTime() / 1000
);

const input = {
  messageBytes,
  signatureBytes,
  certificateBytes,
  expectedSignatureCreationTime: signatureTime,
  expectedFingerprint:
    "07D8539F269583C160E333151763E15ED3E9286C",
  subject: "ShellPGP Sender Policy Test",
  from: "Keycard Test <keycard@example.com>",
  to: ["keycard@example.com"]
};

test("approved matching sender exports successfully", async () => {
  const result = await createSignedComposeEmail(input);

  assert.equal(result.verified, true);
  assert.equal(
    result.fingerprint,
    input.expectedFingerprint
  );
});

test("mismatched sender blocks export", async () => {
  await assert.rejects(
    createSignedComposeEmail({
      ...input,
      from: "Other Person <other@example.com>"
    }),
    /sender does not match/
  );
});

test("unapproved fingerprint blocks export", async () => {
  await assert.rejects(
    createSignedComposeEmail({
      ...input,
      expectedFingerprint: "A".repeat(40)
    }),
    /fingerprint does not match/
  );
});

test("missing fingerprint approval blocks custom path", async () => {
  await assert.rejects(
    createSignedComposeEmail({
      ...input,
      expectedFingerprint: ""
    }),
    /approved fingerprint required/
  );
});
