const MIME_HEADER =
  "Content-Type: text/plain; charset=us-ascii\r\n\r\n";

export function createComposeSigningPayload(
  details,
  maxBytes = 104
) {
  if (!details || details.isPlainText !== true) {
    throw new Error("Only plain-text compose messages are supported");
  }

  const input = details.plainTextBody;

  if (typeof input !== "string" || input.trim().length === 0) {
    throw new Error("Compose message is empty");
  }

  if (/\r(?!\n)/.test(input)) {
    throw new Error("Bare carriage return is unsupported");
  }

  let body = input
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "\r\n");

  if (!body.endsWith("\r\n")) {
    body += "\r\n";
  }

  for (let i = 0; i < body.length; i++) {
    const char = body.charCodeAt(i);

    if (char === 13 && body.charCodeAt(i + 1) === 10) {
      i++;
      continue;
    }

    if (char < 32 || char > 126) {
      throw new Error(
        "Only printable ASCII and standard line endings are supported"
      );
    }
  }

  const messageText = MIME_HEADER + body;
  const messageBytes = new TextEncoder().encode(messageText);

  if (messageBytes.length > maxBytes) {
    throw new Error(
      `Signing payload is ${messageBytes.length} bytes; ` +
      `hardware limit is ${maxBytes} bytes`
    );
  }

  return {
    messageText,
    messageBytes,
    byteLength: messageBytes.length,
    maxBytes
  };
}
