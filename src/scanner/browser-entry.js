import jsQR from "jsqr";

export function decodeFrame(imageData) {
  const result = jsQR(
    imageData.data,
    imageData.width,
    imageData.height,
    { inversionAttempts: "attemptBoth" }
  );

  return result?.data ?? null;
}
