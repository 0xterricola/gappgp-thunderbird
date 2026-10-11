import { Buffer } from "buffer";

globalThis.Buffer = Buffer;

export async function loadProtocol() {
  return import("./sign-request.js");
}
