import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  extractMailbox,
  validateSenderIdentity
} from "../src/verification/sender-identity.js";

const certificateBytes = new Uint8Array(
  readFileSync("fixtures/keycard-test-cert.pgp")
);

const fingerprint =
  "07D8539F269583C160E333151763E15ED3E9286C";

const validInput = {
  certificateBytes,
  expectedFingerprint: fingerprint,
  from: "Keycard Test <keycard@example.com>"
};

test("accepts valid self-certified sender identity", async () => {
  const result = await validateSenderIdentity(validInput);

  assert.equal(result.fingerprint, fingerprint);
  assert.equal(result.email, "keycard@example.com");
  assert.equal(result.keyCreationTime, 1790822191);
});

test("rejects mismatched Thunderbird sender", async () => {
  await assert.rejects(
    validateSenderIdentity({
      ...validInput,
      from: "Other Person <other@example.com>"
    }),
    /sender does not match/
  );
});

test("rejects unapproved certificate fingerprint", async () => {
  await assert.rejects(
    validateSenderIdentity({
      ...validInput,
      expectedFingerprint: "A".repeat(40)
    }),
    /fingerprint does not match/
  );
});

test("rejects missing fingerprint approval", async () => {
  await assert.rejects(
    validateSenderIdentity({
      ...validInput,
      expectedFingerprint: undefined
    }),
    /approved fingerprint required/
  );
});

test("rejects malformed sender addresses", () => {
  assert.throws(
    () => extractMailbox("user@example.com\r\nBcc: attacker@example.com"),
    /Invalid sender email/
  );
});
