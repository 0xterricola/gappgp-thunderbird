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

const inputs = {
  messageBytes,
  signatureBytes,
  certificateBytes,
  expectedSignatureCreationTime: signatureTime,
  subject: "ShellPGP v0.6 Compose Test",
  from: "Keycard Test <keycard@example.com>",
  to: ["keycard@example.com"]
};

test("real-compose exporter accepts verified hardware signature", async () => {
  const result = await createSignedComposeEmail(inputs);

  assert.equal(result.verified, true);
  assert.equal(result.messageBytes, 73);
  assert.equal(
    result.signatureCreationTime,
    signatureTime
  );

  assert.match(
    result.eml,
    /multipart\/signed/
  );

  assert.match(
    result.eml,
    /Subject: ShellPGP v0\.6 Compose Test/
  );

  assert.match(
    result.eml,
    /-----BEGIN PGP SIGNATURE-----/
  );

  const boundary = "shellpgp-compose-v06";
  const startDelimiter = `--${boundary}\r\n`;
  const start = result.eml.indexOf(startDelimiter)
    + startDelimiter.length;
  const end = result.eml.indexOf(
    `\r\n--${boundary}\r\n`,
    start
  );

  assert.ok(end > start);
  assert.equal(
    result.eml.slice(start, end),
    Buffer.from(messageBytes).toString("utf8")
  );
});

test("export rejects signature timestamp mismatch", async () => {
  await assert.rejects(
    createSignedComposeEmail({
      ...inputs,
      expectedSignatureCreationTime: signatureTime + 1
    }),
    /timestamp does not match/
  );
});

test("export rejects tampered compose content", async () => {
  const tampered = Uint8Array.from(messageBytes);
  tampered[tampered.length - 3] ^= 1;

  await assert.rejects(
    createSignedComposeEmail({
      ...inputs,
      messageBytes: tampered
    })
  );
});

test("export rejects email header injection", async () => {
  await assert.rejects(
    createSignedComposeEmail({
      ...inputs,
      subject: "Test\r\nBcc: attacker@example.com"
    }),
    /single-line ASCII/
  );
});
