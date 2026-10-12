"use strict";

async function showPreview() {
  const params = new URLSearchParams(location.search);
  const tabId = Number(params.get("tabId"));

  if (!Number.isSafeInteger(tabId) || tabId <= 0) {
    throw new Error("Invalid compose tab ID");
  }

  const details = await browser.compose.getComposeDetails(tabId);

  const body = details.isPlainText
    ? (details.plainTextBody ?? "")
    : (details.body ?? "");

  document.getElementById("subject").textContent =
    details.subject || "(no subject)";

  document.getElementById("format").textContent =
    details.isPlainText ? "Plain text" : "HTML";

  document.getElementById("body").textContent = body;
}

showPreview().catch(error => {
  document.getElementById("body").textContent =
    `Unable to load preview: ${error.message}`;
});


// Development-only protocol compatibility test.
window.testShellPGPProtocol = async function () {
  const protocol = await ShellPGPProtocol.loadProtocol();

  const result = protocol.createSignRequest(
    "Hello from Keycard Shell.",
    1790822191,
    1791697117,
    104
  );

  if (!result.urText.startsWith("ur:bytes/")) {
    throw new Error("Invalid UR request");
  }

  console.log("[ShellPGP] SIGN REQUEST: PASS", result);

  return result;
};

// ShellPGP v0.4 — Hardware QR signing fixture.
// This does NOT sign or send the current Thunderbird draft.

(function initializeSigningQR() {
  const section = document.createElement("section");
  section.style.marginTop = "28px";

  const heading = document.createElement("h2");
  heading.textContent = "Keycard Shell Signing Test";

  const description = document.createElement("p");
  description.textContent =
    "Generate a signing QR for our previously verified MIME fixture. " +
    "This is NOT the current Thunderbird draft.";

  const payloadDisplay = document.createElement("pre");
  payloadDisplay.textContent =
    "Content-Type: text/plain; charset=us-ascii\r\n" +
    "\r\n" +
    "Hello from Keycard Shell.\r\n";

  const button = document.createElement("button");
  button.textContent = "Generate Signing QR";
  button.style.padding = "12px 18px";
  button.style.cursor = "pointer";

  const status = document.createElement("p");
  status.setAttribute("role", "status");
  status.textContent = "No signing request generated.";

  const canvas = document.createElement("canvas");
  canvas.style.maxWidth = "100%";
  canvas.style.display = "none";

  section.append(
    heading,
    description,
    payloadDisplay,
    button,
    status,
    canvas
  );

  document.body.append(section);

  button.addEventListener("click", async () => {
    button.disabled = true;
    canvas.style.display = "none";
    status.textContent = "Generating signing request...";

    try {
      const protocol = await ShellPGPProtocol.loadProtocol();

      const message =
        "Content-Type: text/plain; charset=us-ascii\r\n" +
        "\r\n" +
        "Hello from Keycard Shell.\r\n";

      const keyCreationTime = 1790822191;
      const signatureCreationTime =
        Math.floor(Date.now() / 1000);

      const result = protocol.createSignRequest(
        message,
        keyCreationTime,
        signatureCreationTime,
        104
      );

      await ShellPGPQR.renderQRCode(canvas, result.urText);

      canvas.style.display = "block";

      status.textContent =
        `QR ready. ${result.messageBytes} MIME bytes. ` +
        "Review the message on Keycard Shell before approving.";

      console.log("[ShellPGP] Hardware signing QR generated", {
        messageBytes: result.messageBytes,
        keyCreationTime: result.keyCreationTime,
        signatureCreationTime: result.signatureCreationTime
      });

    } catch (error) {
      status.textContent = `QR generation failed: ${error.message}`;
      console.error("[ShellPGP] QR generation failed", error);
    } finally {
      button.disabled = false;
    }
  });
})();

// ShellPGP v0.5 — Local QR signature-response scanner.
//
// The camera is activated only after an explicit click.
// No video or QR data is uploaded.
// QR capture does not establish signature validity.

(function initializeResponseScanner() {
  const section = document.createElement("section");
  section.style.marginTop = "28px";

  const heading = document.createElement("h2");
  heading.textContent = "Keycard Shell Response";

  const description = document.createElement("p");
  description.textContent =
    "Scan the signature-response QR displayed by Keycard Shell.";

  const startButton = document.createElement("button");
  startButton.textContent = "Scan Signature Response";
  startButton.style.padding = "12px 18px";
  startButton.style.cursor = "pointer";

  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop Camera";
  stopButton.style.padding = "12px 18px";
  stopButton.style.marginLeft = "8px";
  stopButton.hidden = true;

  const status = document.createElement("p");
  status.setAttribute("role", "status");
  status.textContent = "No signature response captured.";

  const video = document.createElement("video");
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;
  video.style.width = "100%";
  video.style.maxWidth = "420px";
  video.style.display = "none";

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", {
    willReadFrequently: true
  });

  let stream = null;
  let animationId = null;
  let scanning = false;

  function stopCamera() {
    scanning = false;

    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
      stream = null;
    }

    video.pause();
    video.srcObject = null;
    video.style.display = "none";

    startButton.disabled = false;
    stopButton.hidden = true;
  }

  function scanFrame() {
    if (!scanning) return;

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        video.videoWidth > 0 &&
        video.videoHeight > 0) {

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const frame = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const decoded = ShellPGPScanner.decodeFrame(frame);

      if (decoded) {
        if (!/^ur:bytes\//i.test(decoded)) {
          status.textContent =
            "QR detected, but it is not a UR:BYTES response.";
        } else {
          // Keep captured response in memory, not console logs.
          window.shellpgpCapturedResponse = decoded;

          stopCamera();

          status.textContent =
            "UR:BYTES response captured successfully. " +
            "OpenPGP verification is still pending.";

          console.log(
            "[ShellPGP] Hardware response QR captured"
          );

          return;
        }
      }
    }

    animationId = requestAnimationFrame(scanFrame);
  }

  startButton.addEventListener("click", async () => {
    if (scanning) return;

    startButton.disabled = true;
    status.textContent = "Requesting camera permission...";

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera access is unavailable in this extension window"
        );
      }

      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "environment"
        }
      });

      scanning = true;

      video.srcObject = stream;
      video.style.display = "block";
      stopButton.hidden = false;

      await video.play();

      status.textContent =
        "Camera active. Point it toward Keycard Shell's response QR.";

      animationId = requestAnimationFrame(scanFrame);

    } catch (error) {
      stopCamera();
      status.textContent =
        "Camera could not start: " + error.message;

      console.error(
        "[ShellPGP] Camera initialization failed:",
        error.message
      );
    }
  });

  stopButton.addEventListener("click", () => {
    stopCamera();
    status.textContent = "Camera stopped.";
  });

  window.addEventListener("pagehide", stopCamera);

  section.append(
    heading,
    description,
    startButton,
    stopButton,
    status,
    video
  );

  document.body.append(section);
})();

// ShellPGP v0.5 — Camera-independent hardware signature verification.

(function initializeSignatureVerification() {
  const section = document.createElement("section");
  section.style.marginTop = "28px";

  const heading = document.createElement("h2");
  heading.textContent = "Verify Hardware Signature";

  const description = document.createElement("p");
  description.textContent =
    "Paste a Keycard Shell UR:BYTES signature response. " +
    "Verification uses the fixed 73-byte MIME test fixture, " +
    "not the current Thunderbird draft.";

  const input = document.createElement("textarea");
  input.placeholder = "ur:bytes/...";
  input.rows = 4;
  input.style.width = "100%";

  const button = document.createElement("button");
  button.textContent = "Verify Signature";
  button.style.padding = "12px 18px";

  const status = document.createElement("p");
  status.setAttribute("role", "status");
  status.textContent = "No signature verified.";

  input.addEventListener("input", () => {
    status.textContent = "Unverified response.";
  });

  button.addEventListener("click", async () => {
    button.disabled = true;
    status.textContent = "Verifying hardware signature...";

    try {
      const protocol = await ShellPGPProtocol.loadProtocol();

      const decoded = protocol.decodeSignResponse(
        input.value.trim()
      );

      const fixture =
        "Content-Type: text/plain; charset=us-ascii\r\n" +
        "\r\n" +
        "Hello from Keycard Shell.\r\n";

      const messageBytes = new TextEncoder().encode(fixture);

      if (messageBytes.length !== 73) {
        throw new Error("Unexpected MIME fixture length");
      }

      const certificateResponse = await fetch(
        browser.runtime.getURL("fixtures/keycard-test-cert.pgp")
      );

      if (!certificateResponse.ok) {
        throw new Error("Could not load test certificate");
      }

      const certificateBytes = new Uint8Array(
        await certificateResponse.arrayBuffer()
      );

      const result = await ShellPGPVerifier.verifyHardwareSignature({
        messageBytes,
        signatureBytes: decoded.signatureBytes,
        certificateBytes
      });

      status.textContent =
        "CRYPTOGRAPHIC VERIFICATION: PASS — " +
        result.fingerprint +
        " (fixed MIME test fixture only)";

      console.log("[ShellPGP] Cryptographic verification PASS");

    } catch (error) {
      status.textContent =
        "VERIFICATION FAILED: " + error.message;

      console.error("[ShellPGP] Verification failed:", error.message);
    } finally {
      button.disabled = false;
    }
  });

  const exportButton = document.createElement("button");
  exportButton.textContent = "Export Signed Test Email (.eml)";
  exportButton.style.padding = "12px 18px";
  exportButton.style.marginLeft = "8px";

  exportButton.addEventListener("click", async () => {
    exportButton.disabled = true;
    status.textContent = "Verifying and exporting signed email...";

    try {
      const protocol = await ShellPGPProtocol.loadProtocol();

      const decoded = protocol.decodeSignResponse(
        input.value.trim()
      );

      const fixture =
        "Content-Type: text/plain; charset=us-ascii\r\n" +
        "\r\n" +
        "Hello from Keycard Shell.\r\n";

      const messageBytes = new TextEncoder().encode(fixture);

      const response = await fetch(
        browser.runtime.getURL("fixtures/keycard-test-cert.pgp")
      );

      if (!response.ok) {
        throw new Error("Test certificate unavailable");
      }

      const certificateBytes = new Uint8Array(
        await response.arrayBuffer()
      );

      const result = await ShellPGPVerifier.createSignedFixtureEmail({
        messageBytes,
        signatureBytes: decoded.signatureBytes,
        certificateBytes
      });

      const blob = new Blob([result.eml], {
        type: "message/rfc822"
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "shellpgp-keycard-signed-test.eml";

      document.body.append(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 60000);

      status.textContent =
        "Verified signed test email exported — " +
        result.fingerprint;

      console.log("[ShellPGP] Signed PGP/MIME export: PASS");

    } catch (error) {
      status.textContent =
        "EXPORT FAILED: " + error.message;

      console.error("[ShellPGP] Export failed", error);
    } finally {
      exportButton.disabled = false;
    }
  });

  section.append(
    heading,
    description,
    input,
    button,
    exportButton,
    status
  );

  document.body.append(section);
})();

// ShellPGP v0.6 — Signing request from actual Thunderbird compose content.
// This stage generates the QR only; response verification/export comes next.

(function initializeComposeSigning() {
  const section = document.createElement("section");
  section.style.marginTop = "28px";

  const heading = document.createElement("h2");
  heading.textContent = "ShellPGP v0.7 — Approved Identity Signing";

  const description = document.createElement("p");
  description.textContent =
    "Generate a Keycard Shell signing QR from the current Thunderbird " +
    "plain-text draft. Experimental: ASCII only, no attachments, " +
    "104-byte signed MIME limit. This does not send email.";

  const warning = document.createElement("p");
  warning.textContent =
    "Only the MIME message body is signed. Email headers such as " +
    "Subject, From and To are not covered by this signature.";

  const payloadDisplay = document.createElement("pre");
  payloadDisplay.textContent = "No draft signing payload generated.";
  payloadDisplay.style.whiteSpace = "pre-wrap";
  payloadDisplay.style.overflowWrap = "anywhere";

  const identityNotice = document.createElement("p");
  identityNotice.textContent =
    "Select the Keycard public certificate and enter its " +
    "independently verified fingerprint. The certified email " +
    "must match the Thunderbird sender.";

  const certificateLabel = document.createElement("label");
  certificateLabel.textContent = "Keycard public certificate: ";
  certificateLabel.style.display = "block";

  const certificateInput = document.createElement("input");
  certificateInput.type = "file";
  certificateInput.accept = ".pgp,.gpg";
  certificateLabel.append(certificateInput);

  const fingerprintLabel = document.createElement("label");
  fingerprintLabel.textContent = "Approved Keycard fingerprint: ";
  fingerprintLabel.style.display = "block";

  const fingerprintInput = document.createElement("input");
  fingerprintInput.type = "text";
  fingerprintInput.placeholder = "40-character fingerprint";
  fingerprintInput.autocomplete = "off";
  fingerprintInput.spellcheck = false;
  fingerprintInput.style.width = "100%";
  fingerprintLabel.append(fingerprintInput);

  const generateButton = document.createElement("button");
  generateButton.textContent = "Generate Current Draft Signing QR";
  generateButton.style.padding = "12px 18px";

  const status = document.createElement("p");
  status.setAttribute("role", "status");
  status.textContent = "Waiting for a supported Thunderbird draft.";

  const canvas = document.createElement("canvas");
  canvas.style.maxWidth = "100%";
  canvas.style.display = "none";

  const params = new URLSearchParams(location.search);
  const tabId = Number(params.get("tabId"));

  // Session state stays within this preview.
  // A future response must be verified against these exact bytes,
  // followed by a fresh check of the Thunderbird draft.
  let pending = null;
  let identityRevision = 0;

  async function readCurrentDraft(protocol) {
    if (!Number.isSafeInteger(tabId) || tabId <= 0) {
      throw new Error("Invalid compose tab ID");
    }

    const details = await browser.compose.getComposeDetails(tabId);
    const attachments = await browser.compose.listAttachments(tabId);

    if (attachments.length !== 0) {
      throw new Error(
        "Attachment signing is not supported. Remove attachments first."
      );
    }

    const payload = protocol.createComposeSigningPayload(
      details,
      104
    );

    const snapshot = JSON.stringify({
      isPlainText: details.isPlainText,
      plainTextBody: details.plainTextBody,
      subject: details.subject ?? "",
      from: details.from ?? null,
      identityId: details.identityId ?? null,
      to: details.to ?? [],
      cc: details.cc ?? [],
      bcc: details.bcc ?? [],
      replyTo: details.replyTo ?? [],
      attachments
    });

    return { details, payload, snapshot };
  }

  generateButton.addEventListener("click", async () => {
    generateButton.disabled = true;
    canvas.style.display = "none";
    pending = null;
    exportButton.disabled = true;
    responseInput.value = "";
    status.textContent = "Reading current Thunderbird draft...";

    try {
      const protocol = await ShellPGPProtocol.loadProtocol();
      const { details, payload, snapshot } =
        await readCurrentDraft(protocol);

      const revision = identityRevision;
      const selectedFile = certificateInput.files?.[0];

      if (!selectedFile) {
        throw new Error("Select a Keycard public certificate");
      }

      if (selectedFile.size === 0 || selectedFile.size > 65536) {
        throw new Error("Unsupported public certificate size");
      }

      const requestedFingerprint = fingerprintInput.value
        .replace(/\s/g, "")
        .toUpperCase();

      const certificateBytes = new Uint8Array(
        await selectedFile.arrayBuffer()
      );

      const identity = await ShellPGPVerifier.validateSenderIdentity({
        certificateBytes,
        expectedFingerprint: requestedFingerprint,
        from: formatAddress(details.from, "From")
      });

      const keyCreationTime = identity.keyCreationTime;
      const signatureCreationTime = Math.floor(Date.now() / 1000);

      const request = protocol.createSignRequest(
        payload.messageText,
        keyCreationTime,
        signatureCreationTime,
        104
      );

      await ShellPGPQR.renderQRCode(canvas, request.urText);

      if (
        identityRevision !== revision ||
        certificateInput.files?.[0] !== selectedFile ||
        fingerprintInput.value.replace(/\s/g, "").toUpperCase() !==
          requestedFingerprint
      ) {
        throw new Error("Identity changed during QR generation");
      }

      pending = {
        snapshot,
        messageBytes: Uint8Array.from(payload.messageBytes),
        messageText: payload.messageText,
        signatureCreationTime,
        certificateBytes,
        expectedFingerprint: identity.fingerprint,
        identityRevision: revision
      };

      payloadDisplay.textContent =
        "Subject (unsigned): " + (details.subject || "(none)") +
        "\n\nEXACT SIGNED MIME PAYLOAD:\n" +
        pending.messageText;

      canvas.style.display = "block";
      exportButton.disabled = false;

      status.textContent =
        "Current draft QR ready — " +
        payload.byteLength +
        " signed MIME bytes. Review on Keycard Shell. " +
        "Changing the draft requires a new signing request.";

      console.log("[ShellPGP v0.7] Draft signing QR ready", {
        messageBytes: payload.byteLength,
        signatureCreationTime
      });

    } catch (error) {
      payloadDisplay.textContent =
        "No valid signing payload available.";

      status.textContent =
        "DRAFT SIGNING FAILED: " + error.message;

      console.error("[ShellPGP v0.7]", error.message);
    } finally {
      generateButton.disabled = false;
    }
  });


  // The response must match the exact draft signing request.
  const responseInput = document.createElement("textarea");
  responseInput.rows = 4;
  responseInput.placeholder = "Paste fresh Keycard Shell UR:BYTES response...";
  responseInput.style.width = "100%";
  responseInput.style.marginTop = "16px";

  const exportButton = document.createElement("button");
  exportButton.textContent = "Verify & Export Current Draft (.eml)";
  exportButton.style.padding = "12px 18px";
  exportButton.disabled = true;

  function invalidateIdentity() {
    identityRevision++;
    pending = null;
    exportButton.disabled = true;
    canvas.style.display = "none";
    responseInput.value = "";
    status.textContent =
      "Identity changed. Generate a new signing QR.";
  }

  certificateInput.addEventListener("change", invalidateIdentity);
  fingerprintInput.addEventListener("input", invalidateIdentity);

  function formatAddress(value, label) {
    if (typeof value === "string") {
      return value;
    }

    if (
      value &&
      typeof value === "object" &&
      (value.type === undefined || value.type === "address") &&
      typeof value.email === "string"
    ) {
      return value.name
        ? `${value.name} <${value.email}>`
        : value.email;
    }

    throw new Error(`Unsupported ${label} address format`);
  }

  async function assertDraftUnchanged(protocol, original) {
    const current = await readCurrentDraft(protocol);

    const sameBytes =
      current.payload.messageBytes.length ===
        original.messageBytes.length &&
      current.payload.messageBytes.every(
        (byte, index) => byte === original.messageBytes[index]
      );

    if (
      current.snapshot !== original.snapshot ||
      !sameBytes
    ) {
      pending = null;
      exportButton.disabled = true;

      throw new Error(
        "Thunderbird draft changed after QR generation. " +
        "Generate a new signing request."
      );
    }

    return current;
  }

  exportButton.addEventListener("click", async () => {
    if (!pending) {
      status.textContent = "Generate a draft signing QR first.";
      return;
    }

    const original = pending;

    generateButton.disabled = true;
    exportButton.disabled = true;
    status.textContent = "Checking draft and verifying hardware signature...";

    try {
      const protocol = await ShellPGPProtocol.loadProtocol();

      // First check: the current draft must match the QR request.
      const current = await assertDraftUnchanged(protocol, original);

      if (
        pending !== original ||
        identityRevision !== original.identityRevision
      ) {
        throw new Error("Signing identity changed after QR generation");
      }

      // Reject metadata that this prototype cannot preserve in
      // the exported message.
      for (const field of ["cc", "bcc", "replyTo"]) {
        if ((current.details[field] ?? []).length !== 0) {
          throw new Error(
            `${field} is not supported by v0.6 export`
          );
        }
      }

      const responseText = responseInput.value.trim();

      if (!responseText) {
        throw new Error("Paste the fresh hardware response first");
      }

      const decoded = protocol.decodeSignResponse(responseText);

      const certificateBytes = original.certificateBytes;

      const recipients = current.details.to ?? [];

      if (!Array.isArray(recipients)) {
        throw new Error("Unsupported To recipient format");
      }

      // The exporter independently verifies the signature
      // against the exact bytes used to generate the QR.
      const result = await ShellPGPVerifier.createSignedComposeEmail({
        messageBytes: original.messageBytes,
        signatureBytes: decoded.signatureBytes,
        certificateBytes,
        expectedFingerprint: original.expectedFingerprint,
        expectedSignatureCreationTime:
          original.signatureCreationTime,
        subject: current.details.subject ?? "",
        from: formatAddress(current.details.from, "From"),
        to: recipients.map(value =>
          formatAddress(value, "To")
        )
      });

      // Second check: reject edits made during async verification.
      await assertDraftUnchanged(protocol, original);

      if (
        pending !== original ||
        identityRevision !== original.identityRevision
      ) {
        throw new Error("Signing identity changed during verification");
      }

      const blob = new Blob([result.eml], {
        type: "message/rfc822"
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "shellpgp-v07-signed-compose.eml";

      document.body.append(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 60000);

      status.textContent =
        "SIGNED DRAFT EXPORT: PASS — " +
        result.messageBytes +
        " bytes, signer " +
        result.fingerprint;

      console.log(
        "[ShellPGP v0.7] Draft signature verified; EML exported"
      );

    } catch (error) {
      status.textContent =
        "DRAFT EXPORT FAILED: " + error.message;

      console.error(
        "[ShellPGP v0.7] Export failed:",
        error.message
      );
    } finally {
      generateButton.disabled = false;
      exportButton.disabled = !pending;
    }
  });

  section.append(
    heading,
    description,
    warning,
    payloadDisplay,
    identityNotice,
    certificateLabel,
    fingerprintLabel,
    generateButton,
    status,
    canvas,
    responseInput,
    exportButton
  );

  document.body.append(section);
})();
