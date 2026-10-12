import { Buffer } from "buffer";
import { encode, decode } from "cbor2";
import { UR, UREncoder, URDecoder } from "@ngraveio/bc-ur";

const VERSION = 1;
const SIGN_MESSAGE = 2;

export function createSignRequest(
  messageText,
  keyCreationTime,
  signatureCreationTime,
  maxBytes = 104
) {
  const message = new TextEncoder().encode(messageText);

  if (message.length === 0 || message.length > maxBytes) {
    throw new Error(`Message must be 1..${maxBytes} bytes`);
  }

  for (let i = 0; i < message.length; i++) {
    const b = message[i];

    if (b === 0x0d) {
      if (message[i + 1] !== 0x0a) {
        throw new Error("Bare CR is not allowed");
      }
      i++;
      continue;
    }

    if (b === 0x0a) continue;

    if (b < 0x20 || b > 0x7e) {
      throw new Error("Only printable ASCII and CRLF/LF are supported");
    }
  }

  for (const [label, value] of [
    ["Key creation time", keyCreationTime],
    ["Signature creation time", signatureCreationTime],
  ]) {
    if (!Number.isInteger(value) || value <= 0 || value > 0xffffffff) {
      throw new Error(`${label} must be a valid uint32 timestamp`);
    }
  }

  if (signatureCreationTime < keyCreationTime) {
    throw new Error("Signature time precedes key creation");
  }

  const innerCbor = encode(new Map([
    [1, VERSION],
    [2, SIGN_MESSAGE],
    [3, message],
    [4, keyCreationTime],
    [5, signatureCreationTime],
  ]));

  const ur = UR.fromBuffer(Buffer.from(innerCbor));
  const encoder = new UREncoder(ur, 400, 0);
  const urText = encoder.nextPart();

  const decoder = new URDecoder();
  decoder.receivePart(urText);

  if (!decoder.isComplete() || !decoder.isSuccess()) {
    throw new Error("UR round-trip validation failed");
  }

  const recovered = decoder.resultUR().decodeCBOR();

  if (
    recovered.length !== innerCbor.length ||
    !recovered.every((b, i) => b === innerCbor[i])
  ) {
    throw new Error("UR round trip changed the CBOR payload");
  }

  const parsed = decode(innerCbor);

  if (
    !(parsed instanceof Map) ||
    parsed.get(1) !== VERSION ||
    parsed.get(2) !== SIGN_MESSAGE
  ) {
    throw new Error("CBOR round-trip validation failed");
  }

  return {
    urText,
    messageBytes: message.length,
    keyCreationTime,
    signatureCreationTime,
  };
}

export { decodeSignResponse } from "./sign-response.js";
