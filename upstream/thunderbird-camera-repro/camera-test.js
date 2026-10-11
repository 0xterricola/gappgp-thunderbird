document.getElementById("test").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const video = document.getElementById("video");

  status.textContent = "Requesting camera...";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });

    video.srcObject = stream;
    status.textContent = "CAMERA ACCESS: PASS";
  } catch (error) {
    status.textContent =
      `CAMERA ACCESS FAILED: ${error.name}: ${error.message}`;
  }
});

window.addEventListener("pagehide", () => {
  const stream = document.getElementById("video").srcObject;
  stream?.getTracks().forEach(track => track.stop());
});
