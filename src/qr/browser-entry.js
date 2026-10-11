import QRCode from "qrcode";

export async function renderQRCode(canvas, text) {
  if (!text.startsWith("ur:bytes/")) {
    throw new Error("Expected a UR:BYTES signing request");
  }

  await QRCode.toCanvas(canvas, text, {
    errorCorrectionLevel: "M",
    margin: 4,
    scale: 6,
  });
}
