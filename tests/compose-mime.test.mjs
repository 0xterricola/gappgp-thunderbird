import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  createComposeSigningPayload
} from "../src/protocol/compose-mime.js";

const draft = text => ({
  isPlainText: true,
  plainTextBody: text
});

test("compose payload matches hardware fixture", () => {
  const result = createComposeSigningPayload(
    draft("Hello from Keycard Shell.")
  );

  assert.deepEqual(
    Buffer.from(result.messageBytes),
    readFileSync("fixtures/hardware-message.txt")
  );

  assert.equal(result.byteLength, 73);
});

test("LF input is canonicalized to CRLF", () => {
  const result = createComposeSigningPayload(
    draft("First line\nSecond line")
  );

  assert.ok(
    result.messageText.endsWith(
      "First line\r\nSecond line\r\n"
    )
  );

  assert.doesNotMatch(result.messageText, /(?<!\r)\n/);
});

test("HTML compose is rejected", () => {
  assert.throws(() =>
    createComposeSigningPayload({
      isPlainText: false,
      plainTextBody: "Hello"
    })
  );
});

test("oversized compose payload is rejected", () => {
  assert.throws(() =>
    createComposeSigningPayload(draft("A".repeat(100)))
  );
});

test("non-ASCII compose content is rejected", () => {
  assert.throws(() =>
    createComposeSigningPayload(draft("Hello 🌍"))
  );
});

test("bare carriage returns are rejected", () => {
  assert.throws(() =>
    createComposeSigningPayload(draft("Hello\rWorld"))
  );
});
