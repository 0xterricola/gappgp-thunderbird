import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import * as openpgp from "openpgp";

import {
  verifyHardwareSignature,
  createSignedFixtureEmail
} from "../src/verification/browser-entry.js";

const expectedFingerprint =
  "07D8539F269583C160E333151763E15ED3E9286C";

const response = readFileSync(
  "fixtures/hardware-response.ur",
  "utf8"
);

const signatureBytes = new Uint8Array(
  readFileSync("fixtures/hardware-signature.sig")
);

const messageBytes = new Uint8Array(
  readFileSync("fixtures/hardware-message.txt")
);

const certificateBytes = new Uint8Array(
  readFileSync("fixtures/keycard-test-cert.pgp")
);

const inputs = {
  messageBytes,
  signatureBytes,
  certificateBytes
};

test("hardware fixtures have expected sizes", () => {
  assert.equal(signatureBytes.length, 119);
  assert.equal(messageBytes.length, 73);
  assert.equal(certificateBytes.length, 239);
});

test("browser UR decoder recovers exact hardware signature", async () => {
  const dom = new JSDOM("", {
    runScripts: "outside-only"
  });

  dom.window.eval(
    readFileSync("dist/sign-request.js", "utf8")
  );

  const protocol =
    await dom.window.ShellPGPProtocol.loadProtocol();

  const decoded = protocol.decodeSignResponse(response);

  assert.deepEqual(
    Buffer.from(decoded.signatureBytes),
    Buffer.from(signatureBytes)
  );

  assert.equal(decoded.packet.tag, 2);
  assert.equal(decoded.packet.version, 4);
  assert.equal(decoded.packet.signatureType, 1);
  assert.equal(decoded.packet.publicKeyAlgorithm, 19);
  assert.equal(decoded.packet.hashAlgorithm, 8);

  assert.throws(
    () => protocol.decodeSignResponse("ur:crypto-account/invalid")
  );
});

test("authentic hardware signature verifies", async () => {
  const result = await verifyHardwareSignature(inputs);

  assert.equal(result.verified, true);
  assert.equal(result.fingerprint, expectedFingerprint);
  assert.equal(result.messageBytes, 73);
});

test("modified message is rejected", async () => {
  const tampered = Uint8Array.from(messageBytes);

  const index = Buffer.from(tampered).indexOf("Hello");

  assert.ok(index >= 0);

  tampered[index] = "J".charCodeAt(0);

  await assert.rejects(
    verifyHardwareSignature({
      ...inputs,
      messageBytes: tampered
    })
  );
});

test("modified signature is rejected", async () => {
  const tampered = Uint8Array.from(signatureBytes);

  tampered[tampered.length - 1] ^= 1;

  await assert.rejects(
    verifyHardwareSignature({
      ...inputs,
      signatureBytes: tampered
    })
  );
});

test("signed email preserves exact MIME fixture", async () => {
  const result = await createSignedFixtureEmail(inputs);

  const eml = result.eml;

  assert.equal(result.fingerprint, expectedFingerprint);

  assert.match(
    eml,
    /Content-Type: multipart\/signed;/
  );

  assert.match(
    eml,
    /protocol="application\/pgp-signature"/
  );

  assert.match(
    eml,
    /micalg=pgp-sha256/
  );

  assert.match(
    eml,
    /-----BEGIN PGP SIGNATURE-----/
  );

  // Ensure no bare LF line endings.
  assert.doesNotMatch(eml, /(?<!\r)\n/);

  const boundary =
    "shellpgp-keycard-hardware-test-v05";

  const firstDelimiter = `--${boundary}\r\n`;

  const start = eml.indexOf(firstDelimiter);

  assert.ok(start >= 0);

  const bodyStart = start + firstDelimiter.length;

  const bodyEnd = eml.indexOf(
    `\r\n--${boundary}\r\n`,
    bodyStart
  );

  assert.ok(bodyEnd > bodyStart);

  const signedPart = eml.slice(bodyStart, bodyEnd);

  assert.equal(
    signedPart,
    Buffer.from(messageBytes).toString("utf8")
  );

  // The email date must match the authenticated signature timestamp.
  const signature = await openpgp.readSignature({
    binarySignature: signatureBytes
  });

  const signatureDate =
    signature.packets[0].created.toUTCString();

  assert.ok(
    eml.includes(`Date: ${signatureDate}\r\n`)
  );
});

test("export rejects anything other than the fixed fixture", async () => {
  const different = Uint8Array.from(messageBytes);

  different[50] ^= 1;

  await assert.rejects(
    createSignedFixtureEmail({
      ...inputs,
      messageBytes: different
    })
  );
});
