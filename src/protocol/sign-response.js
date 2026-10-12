import { URDecoder } from "@ngraveio/bc-ur";

function parseSignaturePacket(data) {
  if (data.length < 2) {
    throw new Error("Truncated OpenPGP packet");
  }

  let offset = 0;
  const ctb = data[offset++];

  if ((ctb & 0x80) === 0) {
    throw new Error("Invalid OpenPGP packet header");
  }

  let tag;
  let length;

  if (ctb & 0x40) {
    tag = ctb & 0x3f;
    const first = data[offset++];

    if (first === undefined) {
      throw new Error("Missing packet length");
    }

    if (first < 192) {
      length = first;
    } else if (first <= 223) {
      if (offset >= data.length) {
        throw new Error("Truncated packet length");
      }
      length = ((first - 192) << 8) + data[offset++] + 192;
    } else if (first === 255) {
      if (offset + 4 > data.length) {
        throw new Error("Truncated packet length");
      }

      length = new DataView(
        data.buffer,
        data.byteOffset + offset,
        4
      ).getUint32(0, false);

      offset += 4;
    } else {
      throw new Error("Partial packet lengths unsupported");
    }
  } else {
    tag = (ctb >> 2) & 0x0f;
    const lengthType = ctb & 3;

    if (lengthType === 0) {
      if (offset >= data.length) throw new Error("Truncated length");
      length = data[offset++];
    } else if (lengthType === 1) {
      if (offset + 2 > data.length) throw new Error("Truncated length");
      length = (data[offset] << 8) | data[offset + 1];
      offset += 2;
    } else if (lengthType === 2) {
      if (offset + 4 > data.length) throw new Error("Truncated length");
      length = new DataView(
        data.buffer,
        data.byteOffset + offset,
        4
      ).getUint32(0, false);
      offset += 4;
    } else {
      throw new Error("Indeterminate packet length unsupported");
    }
  }

  if (offset + length !== data.length) {
    throw new Error("Invalid OpenPGP packet length");
  }

  const body = data.subarray(offset);

  if (tag !== 2 || body.length < 6) {
    throw new Error("Expected an OpenPGP signature packet");
  }

  if (body[0] !== 4) {
    throw new Error("Expected OpenPGP v4 signature");
  }

  if (body[1] !== 0x01) {
    throw new Error("Expected canonical-text signature");
  }

  if (body[2] !== 19) {
    throw new Error("Expected ECDSA signature");
  }

  if (body[3] !== 8) {
    throw new Error("Expected SHA-256 signature");
  }

  return {
    tag,
    version: body[0],
    signatureType: body[1],
    publicKeyAlgorithm: body[2],
    hashAlgorithm: body[3]
  };
}

export function decodeSignResponse(input) {
  if (typeof input !== "string" || input.length > 65536) {
    throw new Error("Invalid or oversized UR input");
  }

  const parts = input.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0 || parts.length > 128) {
    throw new Error("Invalid number of UR fragments");
  }

  const decoder = new URDecoder();

  for (const part of parts) {
    if (!/^ur:bytes\//i.test(part)) {
      throw new Error("Expected UR:BYTES response");
    }

    decoder.receivePart(part);

    if (decoder.isComplete()) break;
  }

  if (!decoder.isComplete() || !decoder.isSuccess()) {
    throw new Error("Incomplete or invalid UR response");
  }

  const ur = decoder.resultUR();

  if (ur.type !== "bytes") {
    throw new Error("Unexpected UR type");
  }

  const signatureBytes = Uint8Array.from(ur.decodeCBOR());

  if (signatureBytes.length > 8192) {
    throw new Error("Oversized signature packet");
  }

  const packet = parseSignaturePacket(signatureBytes);

  return {
    signatureBytes,
    packet,
    receivedFragments: parts.length
  };
}
