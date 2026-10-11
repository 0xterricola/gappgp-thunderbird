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
