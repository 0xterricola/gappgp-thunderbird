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
