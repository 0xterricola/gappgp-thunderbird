import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

import {
  verifyHardwareSignature
} from "../src/verification/browser-entry.js";

const messageBytes = new Uint8Array(
  readFileSync("fixtures/v06-hardware-message.txt")
);

const signatureBytes = new Uint8Array(
  readFileSync("fixtures/v06-hardware-signature.sig")
);

const certificateBytes = new Uint8Array(
  readFileSync("fixtures/keycard-test-cert.pgp")
);

const response = readFileSync(
  "fixtures/v06-hardware-response.ur",
  "utf8"
);

test("v0.6 hardware fixture contains new compose message", () => {
  assert.equal(messageBytes.length, 72);

  assert.equal(
    Buffer.from(messageBytes).toString("utf8"),
    "Content-Type: text/plain; charset=us-ascii\r\n" +
    "\r\n" +
    "Signed from Thunderbird!\r\n"
  );
});

test("v0.6 hardware response decodes to exact detached signature", async () => {
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
});

test("v0.6 real-compose hardware signature verifies", async () => {
  const result = await verifyHardwareSignature({
    messageBytes,
    signatureBytes,
    certificateBytes
  });

  assert.equal(result.verified, true);
  assert.equal(result.messageBytes, 72);
});

test("v0.6 hardware signature rejects altered compose content", async () => {
  const modified = Uint8Array.from(messageBytes);

  modified[modified.length - 3] ^= 1;

  await assert.rejects(
    verifyHardwareSignature({
      messageBytes: modified,
      signatureBytes,
      certificateBytes
    })
  );
});
