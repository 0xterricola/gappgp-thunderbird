import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

import { createComposeSigningPayload } from
  "../src/protocol/compose-mime.js";

import { validateSenderIdentity } from
  "../src/verification/sender-identity.js";

test("v0.7 preview uses approved identity and invalidates changed selection", async () => {
  const html = `
    <!doctype html>
    <html>
      <body>
        <div id="subject"></div>
        <div id="format"></div>
        <div id="body"></div>
      </body>
    </html>
  `;

  const dom = new JSDOM(html, {
    url: "https://shellpgp.test/preview.html?tabId=11",
    runScripts: "outside-only"
  });

  const { window } = dom;

  window.HTMLCanvasElement.prototype.getContext = () => ({});

  const certificate = new Uint8Array(
    readFileSync("fixtures/keycard-test-cert.pgp")
  );

  const fingerprint =
    "07D8539F269583C160E333151763E15ED3E9286C";

  const details = {
    isPlainText: true,
    plainTextBody: "Hello from Keycard Shell.",
    subject: "Identity Test",
    from: "Keycard Test <keycard@example.com>",
    to: [],
    cc: [],
    bcc: [],
    replyTo: [],
    identityId: "test-identity"
  };

  let signingRequest = null;

  window.browser = {
    compose: {
      getComposeDetails: async () => details,
      listAttachments: async () => []
    }
  };

  window.ShellPGPVerifier = {
    validateSenderIdentity: async args =>
      validateSenderIdentity({
        ...args,
        certificateBytes: Uint8Array.from(
          args.certificateBytes
        )
      })
  };

  window.ShellPGPQR = {
    renderQRCode: async () => {}
  };

  window.ShellPGPProtocol = {
    loadProtocol: async () => ({
      createComposeSigningPayload,
      createSignRequest: (
        messageText,
        keyCreationTime,
        signatureCreationTime,
        maxBytes
      ) => {
        signingRequest = {
          messageText,
          keyCreationTime,
          signatureCreationTime,
          maxBytes
        };

        return {
          urText: "ur:bytes/test"
        };
      }
    })
  };

  window.eval(
    readFileSync("preview.js", "utf8")
  );

  const heading = [
    ...window.document.querySelectorAll("h2")
  ].find(element =>
    element.textContent.includes(
      "ShellPGP v0.7 — Approved Identity Signing"
    )
  );

  assert.ok(heading, "v0.7 panel must exist");

  const section = heading.closest("section");

  const fileInput = section.querySelector(
    'input[type="file"]'
  );

  const fingerprintInput = section.querySelector(
    'input[type="text"]'
  );

  assert.ok(fileInput);
  assert.ok(fingerprintInput);

  const selectedFile = {
    size: certificate.length,
    arrayBuffer: async () =>
      Uint8Array.from(certificate).buffer
  };

  Object.defineProperty(fileInput, "files", {
    configurable: true,
    value: [selectedFile]
  });

  fingerprintInput.value = fingerprint;

  const buttons = [
    ...section.querySelectorAll("button")
  ];

  const generateButton = buttons.find(button =>
    button.textContent.includes(
      "Generate Current Draft Signing QR"
    )
  );

  const exportButton = buttons.find(button =>
    button.textContent.includes(
      "Verify & Export Current Draft"
    )
  );

  assert.ok(generateButton);
  assert.ok(exportButton);

  generateButton.click();

  for (let i = 0; i < 50 && !signingRequest; i++) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  assert.ok(
    signingRequest,
    "Approved certificate must produce a signing request"
  );

  assert.equal(
    signingRequest.keyCreationTime,
    1790822191
  );

  assert.equal(signingRequest.maxBytes, 104);

  assert.equal(
    signingRequest.messageText,
    "Content-Type: text/plain; charset=us-ascii\r\n" +
    "\r\nHello from Keycard Shell.\r\n"
  );

  for (let i = 0; i < 50 && exportButton.disabled; i++) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  assert.equal(exportButton.disabled, false);

  fingerprintInput.value = "A".repeat(40);

  fingerprintInput.dispatchEvent(
    new window.Event("input", { bubbles: true })
  );

  assert.equal(
    exportButton.disabled,
    true,
    "Changing the approved identity must invalidate export"
  );

  dom.window.close();
});
