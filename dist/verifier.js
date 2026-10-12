var ShellPGPVerifier = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to2, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to2, key) && key !== except)
          __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to2;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/verification/browser-entry.js
  var browser_entry_exports = {};
  __export(browser_entry_exports, {
    createSignedFixtureEmail: () => createSignedFixtureEmail,
    verifyHardwareSignature: () => verifyHardwareSignature
  });

  // node_modules/openpgp/dist/openpgp.min.mjs
  var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
  function t(e2, t2) {
    return t2.forEach((function(t3) {
      t3 && "string" != typeof t3 && !Array.isArray(t3) && Object.keys(t3).forEach((function(r2) {
        if ("default" !== r2 && !(r2 in e2)) {
          var n2 = Object.getOwnPropertyDescriptor(t3, r2);
          Object.defineProperty(e2, r2, n2.get ? n2 : { enumerable: true, get: function() {
            return t3[r2];
          } });
        }
      }));
    })), Object.freeze(e2);
  }
  var r = /* @__PURE__ */ Symbol("doneWritingPromise");
  var n = /* @__PURE__ */ Symbol("doneWritingResolve");
  var i = /* @__PURE__ */ Symbol("doneWritingReject");
  var s = /* @__PURE__ */ Symbol("readingIndex");
  var a = class _a2 extends Array {
    constructor() {
      super(), Object.setPrototypeOf(this, _a2.prototype), this[r] = new Promise(((e2, t2) => {
        this[n] = e2, this[i] = t2;
      })), this[r].catch((() => {
      }));
    }
  };
  function o(e2) {
    return e2 && e2.getReader && Array.isArray(e2);
  }
  function c(e2) {
    if (!o(e2)) {
      const t2 = e2.getWriter(), r2 = t2.releaseLock;
      return t2.releaseLock = () => {
        t2.closed.catch((function() {
        })), r2.call(t2);
      }, t2;
    }
    this.stream = e2;
  }
  function u(t2) {
    if (o(t2)) return "array";
    if (e.ReadableStream && e.ReadableStream.prototype.isPrototypeOf(t2)) return "web";
    if (t2 && !(e.ReadableStream && t2 instanceof e.ReadableStream) && "function" == typeof t2._read && "object" == typeof t2._readableState) throw Error("Native Node streams are no longer supported: please manually convert the stream to a WebStream, using e.g. `stream.Readable.toWeb`");
    return !(!t2 || !t2.getReader) && "web-like";
  }
  function h(e2) {
    return Uint8Array.prototype.isPrototypeOf(e2);
  }
  function f(e2) {
    if (1 === e2.length) return e2[0];
    let t2 = 0;
    for (let r3 = 0; r3 < e2.length; r3++) {
      if (!h(e2[r3])) throw Error("concatUint8Array: Data must be in the form of a Uint8Array");
      t2 += e2[r3].length;
    }
    const r2 = new Uint8Array(t2);
    let n2 = 0;
    return e2.forEach((function(e3) {
      r2.set(e3, n2), n2 += e3.length;
    })), r2;
  }
  a.prototype.getReader = function() {
    return void 0 === this[s] && (this[s] = 0), { read: async () => (await this[r], this[s] === this.length ? { value: void 0, done: true } : { value: this[this[s]++], done: false }) };
  }, a.prototype.readToEnd = async function(e2) {
    await this[r];
    const t2 = e2(this.slice(this[s]));
    return this.length = 0, t2;
  }, a.prototype.clone = function() {
    const e2 = new a();
    return e2[r] = this[r].then((() => {
      e2.push(...this);
    })), e2;
  }, c.prototype.write = async function(e2) {
    this.stream.push(e2);
  }, c.prototype.close = async function() {
    this.stream[n]();
  }, c.prototype.abort = async function(e2) {
    return this.stream[i](e2), e2;
  }, c.prototype.releaseLock = function() {
  }, "object" == typeof e.process && e.process.versions;
  var l = /* @__PURE__ */ new WeakSet();
  var y = /* @__PURE__ */ Symbol("externalBuffer");
  function g(e2) {
    if (this.stream = e2, e2[y] && (this[y] = e2[y].slice()), o(e2)) {
      const t3 = e2.getReader();
      return this._read = t3.read.bind(t3), this._releaseLock = () => {
      }, void (this._cancel = () => {
      });
    }
    if (u(e2)) {
      const t3 = e2.getReader();
      return this._read = t3.read.bind(t3), this._releaseLock = () => {
        t3.closed.catch((function() {
        })), t3.releaseLock();
      }, void (this._cancel = t3.cancel.bind(t3));
    }
    let t2 = false;
    this._read = async () => t2 || l.has(e2) ? { value: void 0, done: true } : (t2 = true, { value: e2, done: false }), this._releaseLock = () => {
      if (t2) try {
        l.add(e2);
      } catch {
      }
    };
  }
  function p(e2) {
    return u(e2) ? e2 : new ReadableStream({ start(t2) {
      t2.enqueue(e2), t2.close();
    } });
  }
  function d(e2) {
    const t2 = u(e2);
    if (t2) {
      if ("array" !== t2) throw Error("Can't convert Stream to ArrayStream here, call `readToEnd` first");
      return e2;
    }
    const r2 = new a();
    return (async () => {
      const t3 = Q(r2);
      await t3.write(e2), await t3.close();
    })(), r2;
  }
  function A(e2) {
    return e2.some(((e3) => u(e3) && !o(e3))) ? (function(e3) {
      const t2 = e3.map(p), r2 = m((async function(e4) {
        await Promise.all(i2.map(((t3) => U(t3, e4))));
      }));
      let n2 = Promise.resolve();
      const i2 = t2.map(((e4, i3) => v(e4, ((e5, s2) => (n2 = n2.then((() => w(e5, r2.writable, { preventClose: i3 !== t2.length - 1 }))), n2)))));
      return r2.readable;
    })(e2) : e2.some(((e3) => o(e3))) ? (function(e3) {
      const t2 = new a();
      let r2 = Promise.resolve();
      return e3.forEach(((n2, i2) => (r2 = r2.then((() => w(n2, t2, { preventClose: i2 !== e3.length - 1 }))), r2))), t2;
    })(e2) : "string" == typeof e2[0] ? e2.join("") : f(e2);
  }
  async function w(e2, t2, { preventClose: r2 = false, preventAbort: n2 = false, preventCancel: i2 = false } = {}) {
    if (u(e2) && !o(e2) && !o(t2)) {
      e2 = p(e2);
      try {
        if (e2[y]) {
          const r3 = Q(t2);
          for (let t3 = 0; t3 < e2[y].length; t3++) await r3.ready, await r3.write(e2[y][t3]);
          r3.releaseLock();
        }
        await e2.pipeTo(t2, { preventClose: r2, preventAbort: n2, preventCancel: i2 });
      } catch {
      }
      return;
    }
    u(e2) || (e2 = d(e2));
    const s2 = x(e2), a2 = Q(t2);
    try {
      for (; ; ) {
        await a2.ready;
        const { done: e3, value: t3 } = await s2.read();
        if (e3) {
          r2 || await a2.close();
          break;
        }
        await a2.write(t3);
      }
    } catch (e3) {
      n2 || await a2.abort(e3);
    } finally {
      s2.releaseLock(), a2.releaseLock();
    }
  }
  function m(e2) {
    let t2, r2, n2, i2 = false, s2 = false;
    return { readable: new ReadableStream({ start(e3) {
      n2 = e3;
    }, pull() {
      t2 ? t2() : i2 = true;
    }, async cancel(t3) {
      s2 = true, e2 && await e2(t3), r2 && r2(t3);
    } }, { highWaterMark: 0 }), writable: new WritableStream({ write: async function(e3) {
      if (s2) throw Error("Stream is cancelled");
      n2.enqueue(e3), i2 ? i2 = false : (await new Promise(((e4, n3) => {
        t2 = e4, r2 = n3;
      })), t2 = null, r2 = null);
    }, close: n2.close.bind(n2), abort: n2.error.bind(n2) }) };
  }
  function b(e2, t2 = () => {
  }, r2 = () => {
  }, n2 = { highWaterMark: 0 }) {
    if (u(e2)) return E(e2, t2, r2, n2);
    const i2 = t2(e2), s2 = r2();
    return void 0 !== i2 && void 0 !== s2 ? A([i2, s2]) : void 0 !== i2 ? i2 : s2;
  }
  async function k(e2, t2 = async () => {
  }, r2 = async () => {
  }, n2 = { highWaterMark: 1 }) {
    if (u(e2)) return E(e2, t2, r2, n2);
    const i2 = await t2(e2), s2 = await r2();
    return void 0 !== i2 && void 0 !== s2 ? A([i2, s2]) : void 0 !== i2 ? i2 : s2;
  }
  function E(e2, t2, r2, n2) {
    if (o(e2)) {
      const n3 = new a();
      return (async () => {
        const i2 = Q(n3);
        try {
          const n4 = await D(e2), s2 = await t2(n4), a2 = await r2();
          let o2;
          o2 = void 0 !== s2 && void 0 !== a2 ? A([s2, a2]) : void 0 !== s2 ? s2 : a2, await i2.write(o2), await i2.close();
        } catch (e3) {
          await i2.abort(e3);
        }
      })(), n3;
    }
    if (u(e2)) {
      let i2, s2 = false;
      return new ReadableStream({ start() {
        i2 = e2.getReader();
      }, async pull(n3) {
        if (s2) return n3.close(), void e2.releaseLock();
        try {
          for (; ; ) {
            const { value: a2, done: o2 } = await i2.read();
            s2 = o2;
            const c2 = await (o2 ? r2 : t2)(a2);
            if (void 0 !== c2) return void n3.enqueue(c2);
            if (o2) return n3.close(), void e2.releaseLock();
          }
        } catch (e3) {
          n3.error(e3);
        }
      }, async cancel(e3) {
        await i2.cancel(e3);
      } }, n2);
    }
    throw Error("Unreachable");
  }
  function v(e2, t2) {
    if (u(e2) && !o(e2)) {
      let r3;
      const n2 = new TransformStream({ start(e3) {
        r3 = e3;
      } }), i2 = w(e2, n2.writable), s2 = m((async function(e3) {
        r3.error(e3), await i2, await new Promise(((e4) => setTimeout(e4)));
      }));
      return t2(n2.readable, s2.writable), s2.readable;
    }
    e2 = d(e2);
    const r2 = new a();
    return t2(e2, r2), r2;
  }
  function I(e2, t2) {
    let r2;
    const n2 = v(e2, ((e3, i2) => {
      const s2 = x(e3);
      s2.remainder = () => (s2.releaseLock(), w(e3, i2), n2), r2 = t2(s2);
    }));
    return r2;
  }
  function B(e2) {
    if (o(e2)) return e2.clone();
    if (u(e2)) {
      const t2 = (function(e3) {
        if (o(e3)) throw Error("ArrayStream cannot be tee()d, use clone() instead");
        if (u(e3)) {
          const t3 = p(e3).tee();
          return t3[0][y] = t3[1][y] = e3[y], t3;
        }
        return [C(e3), C(e3)];
      })(e2);
      return K(e2, t2[0]), t2[1];
    }
    return C(e2);
  }
  function S(e2) {
    return o(e2) ? B(e2) : u(e2) ? new ReadableStream({ start(t2) {
      const r2 = v(e2, (async (e3, r3) => {
        const n2 = x(e3), i2 = Q(r3);
        try {
          for (; ; ) {
            await i2.ready;
            const { done: e4, value: r4 } = await n2.read();
            if (e4) {
              try {
                t2.close();
              } catch {
              }
              return void await i2.close();
            }
            try {
              t2.enqueue(r4);
            } catch {
            }
            await i2.write(r4);
          }
        } catch (e4) {
          t2.error(e4), await i2.abort(e4);
        }
      }));
      K(e2, r2);
    } }) : C(e2);
  }
  function K(e2, t2) {
    Object.entries(Object.getOwnPropertyDescriptors(e2.constructor.prototype)).forEach((([r2, n2]) => {
      "constructor" !== r2 && (n2.value ? n2.value = n2.value.bind(t2) : n2.get = n2.get.bind(t2), Object.defineProperty(e2, r2, n2));
    }));
  }
  function C(e2, t2 = 0, r2 = 1 / 0) {
    if (o(e2)) throw Error("Not implemented");
    if (u(e2)) {
      if (t2 >= 0 && r2 >= 0) {
        let n2, i2 = 0;
        return new ReadableStream({ start() {
          n2 = e2.getReader();
        }, async pull(s2) {
          try {
            for (; ; ) {
              if (!(i2 < r2)) return s2.close(), void e2.releaseLock();
              {
                const { value: a2, done: o2 } = await n2.read();
                if (o2) return s2.close(), void e2.releaseLock();
                let c2;
                if (i2 + a2.length >= t2 && (c2 = C(a2, Math.max(t2 - i2, 0), r2 - i2)), i2 += a2.length, c2) return void s2.enqueue(c2);
              }
            }
          } catch (e3) {
            s2.error(e3);
          }
        }, async cancel(e3) {
          await n2.cancel(e3);
        } }, { highWaterMark: 0 });
      }
      if (t2 < 0 && (r2 < 0 || r2 === 1 / 0)) {
        let n2 = [];
        return b(e2, ((e3) => {
          e3.length >= -t2 ? n2 = [e3] : n2.push(e3);
        }), (() => C(A(n2), t2, r2)));
      }
      if (0 === t2 && r2 < 0) {
        let n2;
        return b(e2, ((e3) => {
          const i2 = n2 ? A([n2, e3]) : e3;
          if (i2.length >= -r2) return n2 = C(i2, r2), C(i2, t2, r2);
          n2 = i2;
        }));
      }
      return console.warn(`stream.slice(input, ${t2}, ${r2}) not implemented efficiently.`), P((async () => C(await D(e2), t2, r2)));
    }
    return e2[y] && (e2 = A(e2[y].concat([e2]))), h(e2) ? e2.subarray(t2, r2 === 1 / 0 ? e2.length : r2) : e2.slice(t2, r2);
  }
  async function D(e2, t2 = A) {
    return o(e2) ? e2.readToEnd(t2) : u(e2) ? x(e2).readToEnd(t2) : e2;
  }
  async function U(e2, t2) {
    if (u(e2)) {
      if (e2.cancel) {
        const r2 = await e2.cancel(t2);
        return await new Promise(((e3) => setTimeout(e3))), r2;
      }
      if (e2.destroy) return e2.destroy(t2), await new Promise(((e3) => setTimeout(e3))), t2;
    }
  }
  function P(e2) {
    const t2 = new a();
    return (async () => {
      const r2 = Q(t2);
      try {
        await r2.write(await e2()), await r2.close();
      } catch (e3) {
        await r2.abort(e3);
      }
    })(), t2;
  }
  function x(e2) {
    return new g(e2);
  }
  function Q(e2) {
    return new c(e2);
  }
  g.prototype.read = async function() {
    if (this[y] && this[y].length) {
      return { done: false, value: this[y].shift() };
    }
    return this._read();
  }, g.prototype.releaseLock = function() {
    this[y] && (this.stream[y] = this[y]), this._releaseLock();
  }, g.prototype.cancel = function(e2) {
    return this._cancel(e2);
  }, g.prototype.readLine = async function() {
    let e2, t2 = [];
    for (; !e2; ) {
      let { done: r2, value: n2 } = await this.read();
      if (n2 += "", r2) return t2.length ? A(t2) : void 0;
      const i2 = n2.indexOf("\n") + 1;
      i2 && (e2 = A(t2.concat(n2.substr(0, i2))), t2 = []), i2 !== n2.length && t2.push(n2.substr(i2));
    }
    return this.unshift(...t2), e2;
  }, g.prototype.readByte = async function() {
    const { done: e2, value: t2 } = await this.read();
    if (e2) return;
    const r2 = t2[0];
    return this.unshift(C(t2, 1)), r2;
  }, g.prototype.readBytes = async function(e2) {
    const t2 = [];
    let r2 = 0;
    for (; ; ) {
      const { done: n2, value: i2 } = await this.read();
      if (n2) return t2.length ? A(t2) : void 0;
      if (t2.push(i2), r2 += i2.length, r2 >= e2) {
        const r3 = A(t2);
        return this.unshift(C(r3, e2)), C(r3, 0, e2);
      }
    }
  }, g.prototype.peekBytes = async function(e2) {
    const t2 = await this.readBytes(e2);
    return this.unshift(t2), t2;
  }, g.prototype.unshift = function(...e2) {
    this[y] || (this[y] = []), 1 === e2.length && h(e2[0]) && this[y].length && e2[0].length && this[y][0].byteOffset >= e2[0].length ? this[y][0] = new Uint8Array(this[y][0].buffer, this[y][0].byteOffset - e2[0].length, this[y][0].byteLength + e2[0].length) : this[y].unshift(...e2.filter(((e3) => e3 && e3.length)));
  }, g.prototype.readToEnd = async function(e2 = A) {
    const t2 = [];
    for (; ; ) {
      const { done: e3, value: r2 } = await this.read();
      if (e3) break;
      t2.push(r2);
    }
    return e2(t2);
  };
  var M = /* @__PURE__ */ Symbol("byValue");
  var R = { curve: { nistP256: "nistP256", p256: "nistP256", nistP384: "nistP384", p384: "nistP384", nistP521: "nistP521", p521: "nistP521", secp256k1: "secp256k1", ed25519Legacy: "ed25519Legacy", ed25519: "ed25519Legacy", curve25519Legacy: "curve25519Legacy", curve25519: "curve25519Legacy", brainpoolP256r1: "brainpoolP256r1", brainpoolP384r1: "brainpoolP384r1", brainpoolP512r1: "brainpoolP512r1" }, s2k: { simple: 0, salted: 1, iterated: 3, argon2: 4, gnu: 101 }, publicKey: { rsaEncryptSign: 1, rsaEncrypt: 2, rsaSign: 3, elgamal: 16, dsa: 17, ecdh: 18, ecdsa: 19, eddsaLegacy: 22, aedh: 23, aedsa: 24, x25519: 25, x448: 26, ed25519: 27, ed448: 28 }, symmetric: { idea: 1, tripledes: 2, cast5: 3, blowfish: 4, aes128: 7, aes192: 8, aes256: 9, twofish: 10 }, compression: { uncompressed: 0, zip: 1, zlib: 2, bzip2: 3 }, hash: { md5: 1, sha1: 2, ripemd: 3, sha256: 8, sha384: 9, sha512: 10, sha224: 11, sha3_256: 12, sha3_512: 14 }, webHash: { "SHA-1": 2, "SHA-256": 8, "SHA-384": 9, "SHA-512": 10 }, aead: { eax: 1, ocb: 2, gcm: 3, experimentalGCM: 100 }, packet: { publicKeyEncryptedSessionKey: 1, signature: 2, symEncryptedSessionKey: 3, onePassSignature: 4, secretKey: 5, publicKey: 6, secretSubkey: 7, compressedData: 8, symmetricallyEncryptedData: 9, marker: 10, literalData: 11, trust: 12, userID: 13, publicSubkey: 14, userAttribute: 17, symEncryptedIntegrityProtectedData: 18, modificationDetectionCode: 19, aeadEncryptedData: 20, padding: 21 }, literal: { binary: 98, text: 116, utf8: 117, mime: 109 }, signature: { binary: 0, text: 1, standalone: 2, certGeneric: 16, certPersona: 17, certCasual: 18, certPositive: 19, certRevocation: 48, subkeyBinding: 24, keyBinding: 25, key: 31, keyRevocation: 32, subkeyRevocation: 40, timestamp: 64, thirdParty: 80 }, signatureSubpacket: { signatureCreationTime: 2, signatureExpirationTime: 3, exportableCertification: 4, trustSignature: 5, regularExpression: 6, revocable: 7, keyExpirationTime: 9, placeholderBackwardsCompatibility: 10, preferredSymmetricAlgorithms: 11, revocationKey: 12, issuerKeyID: 16, notationData: 20, preferredHashAlgorithms: 21, preferredCompressionAlgorithms: 22, keyServerPreferences: 23, preferredKeyServer: 24, primaryUserID: 25, policyURI: 26, keyFlags: 27, signersUserID: 28, reasonForRevocation: 29, features: 30, signatureTarget: 31, embeddedSignature: 32, issuerFingerprint: 33, preferredAEADAlgorithms: 34, preferredCipherSuites: 39 }, keyFlags: { certifyKeys: 1, signData: 2, encryptCommunication: 4, encryptStorage: 8, splitPrivateKey: 16, authentication: 32, sharedPrivateKey: 128 }, armor: { multipartSection: 0, multipartLast: 1, signed: 2, message: 3, publicKey: 4, privateKey: 5, signature: 6 }, reasonForRevocation: { noReason: 0, keySuperseded: 1, keyCompromised: 2, keyRetired: 3, userIDInvalid: 32 }, features: { modificationDetection: 1, aead: 2, v5Keys: 4, seipdv2: 8 }, write: function(e2, t2) {
    if ("number" == typeof t2 && (t2 = this.read(e2, t2)), void 0 !== e2[t2]) return e2[t2];
    throw Error("Invalid enum value.");
  }, read: function(e2, t2) {
    if (e2[M] || (e2[M] = [], Object.entries(e2).forEach((([t3, r2]) => {
      e2[M][r2] = t3;
    }))), void 0 !== e2[M][t2]) return e2[M][t2];
    throw Error("Invalid enum value.");
  } };
  var F = { preferredHashAlgorithm: R.hash.sha512, preferredSymmetricAlgorithm: R.symmetric.aes256, preferredCompressionAlgorithm: R.compression.uncompressed, aeadProtect: false, parseAEADEncryptedV4KeysAsLegacy: false, preferredAEADAlgorithm: R.aead.gcm, aeadChunkSizeByte: 12, v6Keys: false, enableParsingV5Entities: false, s2kType: R.s2k.iterated, s2kIterationCountByte: 224, s2kArgon2Params: { passes: 3, parallelism: 4, memoryExponent: 16 }, maxArgon2MemoryExponent: 30, allowUnauthenticatedMessages: false, allowUnauthenticatedStream: false, minRSABits: 2047, passwordCollisionCheck: false, allowInsecureDecryptionWithSigningKeys: false, allowInsecureVerificationWithReformattedKeys: false, allowMissingKeyFlags: false, constantTimePKCS1Decryption: false, constantTimePKCS1DecryptionSupportedSymmetricAlgorithms: /* @__PURE__ */ new Set([R.symmetric.aes128, R.symmetric.aes192, R.symmetric.aes256]), ignoreUnsupportedPackets: true, ignoreMalformedPackets: false, enforceGrammar: true, additionalAllowedPackets: [], showVersion: false, showComment: false, versionString: "OpenPGP.js 6.3.2", commentString: "https://openpgpjs.org", maxUserIDLength: 5120, maxDecompressedMessageSize: 1 / 0, knownNotations: [], nonDeterministicSignaturesViaNotation: true, useEllipticFallback: true, rejectHashAlgorithms: /* @__PURE__ */ new Set([R.hash.md5, R.hash.ripemd]), rejectMessageHashAlgorithms: /* @__PURE__ */ new Set([R.hash.md5, R.hash.ripemd, R.hash.sha1]), rejectPublicKeyAlgorithms: /* @__PURE__ */ new Set([R.publicKey.elgamal, R.publicKey.dsa]), rejectCurves: /* @__PURE__ */ new Set([R.curve.secp256k1]) };
  var T = (() => {
    try {
      return true;
    } catch {
    }
    return false;
  })();
  var N = { isString: function(e2) {
    return "string" == typeof e2 || e2 instanceof String;
  }, nodeRequire: () => {
  }, isArray: function(e2) {
    return e2 instanceof Array;
  }, isUint8Array: h, isStream: u, getNobleCurve: async (e2, t2) => {
    if (!F.useEllipticFallback) throw Error("This curve is only supported in the full build of OpenPGP.js");
    const { nobleCurves: r2 } = await Promise.resolve().then((function() {
      return Lf;
    }));
    switch (e2) {
      case R.publicKey.ecdh:
      case R.publicKey.ecdsa: {
        const e3 = r2.get(t2);
        if (!e3) throw Error("Unsupported curve");
        return e3;
      }
      case R.publicKey.x448:
        return r2.get("x448");
      case R.publicKey.ed448:
        return r2.get("ed448");
      default:
        throw Error("Unsupported curve");
    }
  }, readNumber: function(e2) {
    let t2 = 0;
    for (let r2 = 0; r2 < e2.length; r2++) t2 += 256 ** r2 * e2[e2.length - 1 - r2];
    return t2;
  }, writeNumber: function(e2, t2) {
    const r2 = new Uint8Array(t2);
    for (let n2 = 0; n2 < t2; n2++) r2[n2] = e2 >> 8 * (t2 - n2 - 1) & 255;
    return r2;
  }, readDate: function(e2) {
    const t2 = N.readNumber(e2);
    return new Date(1e3 * t2);
  }, writeDate: function(e2) {
    const t2 = Math.floor(e2.getTime() / 1e3);
    return N.writeNumber(t2, 4);
  }, normalizeDate: function(e2 = Date.now()) {
    return null === e2 || e2 === 1 / 0 ? e2 : new Date(1e3 * Math.floor(+e2 / 1e3));
  }, readMPI: function(e2) {
    const t2 = (e2[0] << 8 | e2[1]) + 7 >>> 3;
    return N.readExactSubarray(e2, 2, 2 + t2);
  }, readExactSubarray: function(e2, t2, r2) {
    if (e2.length < r2) throw Error("Input array too short");
    return e2.subarray(t2, r2);
  }, leftPad(e2, t2) {
    if (e2.length > t2) throw Error("Input array too long");
    const r2 = new Uint8Array(t2), n2 = t2 - e2.length;
    return r2.set(e2, n2), r2;
  }, uint8ArrayToMPI: function(e2) {
    const t2 = N.uint8ArrayBitLength(e2);
    if (0 === t2) throw Error("Zero MPI");
    const r2 = e2.subarray(e2.length - Math.ceil(t2 / 8)), n2 = new Uint8Array([(65280 & t2) >> 8, 255 & t2]);
    return N.concatUint8Array([n2, r2]);
  }, uint8ArrayBitLength: function(e2) {
    let t2;
    for (t2 = 0; t2 < e2.length && 0 === e2[t2]; t2++) ;
    if (t2 === e2.length) return 0;
    const r2 = e2.subarray(t2);
    return 8 * (r2.length - 1) + N.nbits(r2[0]);
  }, hexToUint8Array: function(e2) {
    const t2 = new Uint8Array(e2.length >> 1);
    for (let r2 = 0; r2 < e2.length >> 1; r2++) t2[r2] = parseInt(e2.substr(r2 << 1, 2), 16);
    return t2;
  }, uint8ArrayToHex: function(e2) {
    const t2 = "0123456789abcdef";
    let r2 = "";
    return e2.forEach(((e3) => {
      r2 += t2[e3 >> 4] + t2[15 & e3];
    })), r2;
  }, stringToUint8Array: function(e2) {
    return b(e2, ((e3) => {
      if (!N.isString(e3)) throw Error("stringToUint8Array: Data must be in the form of a string");
      const t2 = new Uint8Array(e3.length);
      for (let r2 = 0; r2 < e3.length; r2++) t2[r2] = e3.charCodeAt(r2);
      return t2;
    }));
  }, uint8ArrayToString: function(e2) {
    const t2 = [], r2 = 16384, n2 = (e2 = new Uint8Array(e2)).length;
    for (let i2 = 0; i2 < n2; i2 += r2) t2.push(String.fromCharCode.apply(String, e2.subarray(i2, i2 + r2 < n2 ? i2 + r2 : n2)));
    return t2.join("");
  }, encodeUTF8: function(e2) {
    const t2 = new TextEncoder("utf-8");
    function r2(e3, r3 = false) {
      return t2.encode(e3, { stream: !r3 });
    }
    return b(e2, r2, (() => r2("", true)));
  }, decodeUTF8: function(e2) {
    const t2 = new TextDecoder("utf-8");
    function r2(e3, r3 = false) {
      return t2.decode(e3, { stream: !r3 });
    }
    return b(e2, r2, (() => r2(new Uint8Array(), true)));
  }, concat: A, concatUint8Array: f, equalsUint8Array: function(e2, t2) {
    if (!N.isUint8Array(e2) || !N.isUint8Array(t2)) throw Error("Data must be in the form of a Uint8Array");
    if (e2.length !== t2.length) return false;
    for (let r2 = 0; r2 < e2.length; r2++) if (e2[r2] !== t2[r2]) return false;
    return true;
  }, findLastIndex: function(e2, t2) {
    for (let r2 = e2.length; r2 >= 0; r2--) if (t2(e2[r2], r2, e2)) return r2;
    return -1;
  }, timingSafeEqualsUint8Array: function(e2, t2) {
    if (e2.length !== t2.length) throw Error("Equal input arrays expected");
    let r2 = 1;
    for (let n2 = 0; n2 < e2.length; n2++) r2 &= e2[n2] === t2[n2];
    return !!r2;
  }, writeChecksum: function(e2) {
    let t2 = 0;
    for (let r2 = 0; r2 < e2.length; r2++) t2 = t2 + e2[r2] & 65535;
    return N.writeNumber(t2, 2);
  }, printDebug: function(e2) {
    T && console.log("[OpenPGP.js debug]", e2);
  }, printDebugError: function(e2) {
    T && console.error("[OpenPGP.js debug]", e2);
  }, nbits: function(e2) {
    let t2 = 1, r2 = e2 >>> 16;
    return 0 !== r2 && (e2 = r2, t2 += 16), r2 = e2 >> 8, 0 !== r2 && (e2 = r2, t2 += 8), r2 = e2 >> 4, 0 !== r2 && (e2 = r2, t2 += 4), r2 = e2 >> 2, 0 !== r2 && (e2 = r2, t2 += 2), r2 = e2 >> 1, 0 !== r2 && (e2 = r2, t2 += 1), t2;
  }, double: function(e2) {
    const t2 = new Uint8Array(e2.length), r2 = e2.length - 1;
    for (let n2 = 0; n2 < r2; n2++) t2[n2] = e2[n2] << 1 ^ e2[n2 + 1] >> 7;
    return t2[r2] = e2[r2] << 1 ^ 135 * (e2[0] >> 7), t2;
  }, shiftRight: function(e2, t2) {
    if (t2) for (let r2 = e2.length - 1; r2 >= 0; r2--) e2[r2] >>= t2, r2 > 0 && (e2[r2] |= e2[r2 - 1] << 8 - t2);
    return e2;
  }, getWebCrypto: function() {
    const t2 = void 0 !== e && e.crypto && e.crypto.subtle || this.getNodeCrypto()?.webcrypto.subtle;
    if (!t2) throw Error("The WebCrypto API is not available");
    return t2;
  }, getNodeCrypto: function() {
    return this.nodeRequire("crypto");
  }, getNodeZlib: function() {
    return this.nodeRequire("zlib");
  }, getNodeBuffer: function() {
    return (this.nodeRequire("buffer") || {}).Buffer;
  }, getHardwareConcurrency: function() {
    if ("undefined" != typeof navigator) return navigator.hardwareConcurrency || 1;
    return this.nodeRequire("os").cpus().length;
  }, isEmailAddress: function(e2) {
    if (!N.isString(e2)) return false;
    return /^[^\p{C}\p{Z}@<>\\]+@[^\p{C}\p{Z}@<>\\]+[^\p{C}\p{Z}\p{P}]$/u.test(e2);
  }, canonicalizeEOL: function(e2) {
    let t2 = false;
    return b(e2, ((e3) => {
      let r2;
      t2 && (e3 = N.concatUint8Array([new Uint8Array([13]), e3])), 13 === e3[e3.length - 1] ? (t2 = true, e3 = e3.subarray(0, -1)) : t2 = false;
      const n2 = [];
      for (let t3 = 0; r2 = e3.indexOf(10, t3) + 1, r2; t3 = r2) 13 !== e3[r2 - 2] && n2.push(r2);
      if (!n2.length) return e3;
      const i2 = new Uint8Array(e3.length + n2.length);
      let s2 = 0;
      for (let t3 = 0; t3 < n2.length; t3++) {
        const r3 = e3.subarray(n2[t3 - 1] || 0, n2[t3]);
        i2.set(r3, s2), s2 += r3.length, i2[s2 - 1] = 13, i2[s2] = 10, s2++;
      }
      return i2.set(e3.subarray(n2[n2.length - 1] || 0), s2), i2;
    }), (() => t2 ? new Uint8Array([13]) : void 0));
  }, nativeEOL: function(e2) {
    let t2 = false;
    return b(e2, ((e3) => {
      let r2;
      13 === (e3 = t2 && 10 !== e3[0] ? N.concatUint8Array([new Uint8Array([13]), e3]) : new Uint8Array(e3))[e3.length - 1] ? (t2 = true, e3 = e3.subarray(0, -1)) : t2 = false;
      let n2 = 0;
      for (let t3 = 0; t3 !== e3.length; t3 = r2) {
        r2 = e3.indexOf(13, t3) + 1, r2 || (r2 = e3.length);
        const i2 = r2 - (10 === e3[r2] ? 1 : 0);
        t3 && e3.copyWithin(n2, t3, i2), n2 += i2 - t3;
      }
      return e3.subarray(0, n2);
    }), (() => t2 ? new Uint8Array([13]) : void 0));
  }, removeTrailingSpaces: function(e2) {
    return e2.split("\n").map(((e3) => {
      let t2 = e3.length - 1;
      for (; t2 >= 0 && (" " === e3[t2] || "	" === e3[t2] || "\r" === e3[t2]); t2--) ;
      return e3.substr(0, t2 + 1);
    })).join("\n");
  }, wrapError: function(e2, t2) {
    if (!t2) return e2 instanceof Error ? e2 : Error(e2);
    if (e2 instanceof Error) {
      try {
        e2.message += ": " + t2.message, e2.cause = t2;
      } catch {
      }
      return e2;
    }
    return Error(e2 + ": " + t2.message, { cause: t2 });
  }, constructAllowedPackets: function(e2) {
    const t2 = {};
    return e2.forEach(((e3) => {
      if (!e3.tag) throw Error("Invalid input: expected a packet class");
      t2[e3.tag] = e3;
    })), t2;
  }, anyPromise: function(e2) {
    return new Promise(((t2, r2) => {
      let n2;
      Promise.all(e2.map((async (e3) => {
        try {
          t2(await e3);
        } catch (e4) {
          n2 = e4;
        }
      }))).then((() => {
        r2(n2);
      }));
    }));
  }, selectUint8Array: function(e2, t2, r2) {
    const n2 = Math.max(t2.length, r2.length), i2 = new Uint8Array(n2);
    let s2 = 0;
    for (let n3 = 0; n3 < i2.length; n3++) i2[n3] = t2[n3] & 256 - e2 | r2[n3] & 255 + e2, s2 += e2 & n3 < t2.length | 1 - e2 & n3 < r2.length;
    return i2.subarray(0, s2);
  }, selectUint8: function(e2, t2, r2) {
    return t2 & 256 - e2 | r2 & 255 + e2;
  }, isAES: function(e2) {
    return e2 === R.symmetric.aes128 || e2 === R.symmetric.aes192 || e2 === R.symmetric.aes256;
  } };
  var L = N.getNodeBuffer();
  var O;
  var H;
  function z(e2) {
    let t2 = new Uint8Array();
    return b(e2, ((e3) => {
      t2 = N.concatUint8Array([t2, e3]);
      const r2 = [], n2 = Math.floor(t2.length / 45), i2 = 45 * n2, s2 = O(t2.subarray(0, i2));
      for (let e4 = 0; e4 < n2; e4++) r2.push(s2.substr(60 * e4, 60)), r2.push("\n");
      return t2 = t2.subarray(i2), r2.join("");
    }), (() => t2.length ? O(t2) + "\n" : ""));
  }
  function G(e2) {
    let t2 = "";
    return b(e2, ((e3) => {
      t2 += e3;
      let r2 = 0;
      const n2 = [" ", "	", "\r", "\n"];
      for (let e4 = 0; e4 < n2.length; e4++) {
        const i3 = n2[e4];
        for (let e5 = t2.indexOf(i3); -1 !== e5; e5 = t2.indexOf(i3, e5 + 1)) r2++;
      }
      let i2 = t2.length;
      for (; i2 > 0 && (i2 - r2) % 4 != 0; i2--) n2.includes(t2[i2]) && r2--;
      const s2 = H(t2.substr(0, i2));
      return t2 = t2.substr(i2), s2;
    }), (() => H(t2)));
  }
  function j(e2) {
    return G(e2.replace(/-/g, "+").replace(/_/g, "/"));
  }
  function V(e2, t2) {
    let r2 = z(e2).replace(/[\r\n]/g, "");
    return r2 = r2.replace(/[+]/g, "-").replace(/[/]/g, "_").replace(/[=]/g, ""), r2;
  }
  function q(e2) {
    const t2 = e2.match(/^-----BEGIN PGP (MESSAGE, PART \d+\/\d+|MESSAGE, PART \d+|SIGNED MESSAGE|MESSAGE|PUBLIC KEY BLOCK|PRIVATE KEY BLOCK|SIGNATURE)-----$/m);
    if (!t2) throw Error("Unknown ASCII armor type");
    return /MESSAGE, PART \d+\/\d+/.test(t2[1]) ? R.armor.multipartSection : /MESSAGE, PART \d+/.test(t2[1]) ? R.armor.multipartLast : /SIGNED MESSAGE/.test(t2[1]) ? R.armor.signed : /MESSAGE/.test(t2[1]) ? R.armor.message : /PUBLIC KEY BLOCK/.test(t2[1]) ? R.armor.publicKey : /PRIVATE KEY BLOCK/.test(t2[1]) ? R.armor.privateKey : /SIGNATURE/.test(t2[1]) ? R.armor.signature : void 0;
  }
  function _(e2, t2) {
    let r2 = "";
    return t2.showVersion && (r2 += "Version: " + t2.versionString + "\n"), t2.showComment && (r2 += "Comment: " + t2.commentString + "\n"), e2 && (r2 += "Comment: " + e2 + "\n"), r2 += "\n", r2;
  }
  function Y(e2) {
    const t2 = (function(e3) {
      let t3 = 13501623;
      return b(e3, ((e4) => {
        const r2 = J ? Math.floor(e4.length / 4) : 0, n2 = new Uint32Array(e4.buffer, e4.byteOffset, r2);
        for (let e5 = 0; e5 < r2; e5++) t3 ^= n2[e5], t3 = Z[0][t3 >> 24 & 255] ^ Z[1][t3 >> 16 & 255] ^ Z[2][t3 >> 8 & 255] ^ Z[3][255 & t3];
        for (let n3 = 4 * r2; n3 < e4.length; n3++) t3 = t3 >> 8 ^ Z[0][255 & t3 ^ e4[n3]];
      }), (() => new Uint8Array([t3, t3 >> 8, t3 >> 16])));
    })(e2);
    return z(t2);
  }
  L ? (O = (e2) => L.from(e2).toString("base64"), H = (e2) => {
    const t2 = L.from(e2, "base64");
    return new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength);
  }) : (O = (e2) => btoa(N.uint8ArrayToString(e2)), H = (e2) => N.stringToUint8Array(atob(e2)));
  var Z = [Array(255), Array(255), Array(255), Array(255)];
  for (let e2 = 0; e2 <= 255; e2++) {
    let t2 = e2 << 16;
    for (let e3 = 0; e3 < 8; e3++) t2 = t2 << 1 ^ (8388608 & t2 ? 8801531 : 0);
    Z[0][e2] = (16711680 & t2) >> 16 | 65280 & t2 | (255 & t2) << 16;
  }
  for (let e2 = 0; e2 <= 255; e2++) Z[1][e2] = Z[0][e2] >> 8 ^ Z[0][255 & Z[0][e2]];
  for (let e2 = 0; e2 <= 255; e2++) Z[2][e2] = Z[1][e2] >> 8 ^ Z[0][255 & Z[1][e2]];
  for (let e2 = 0; e2 <= 255; e2++) Z[3][e2] = Z[2][e2] >> 8 ^ Z[0][255 & Z[2][e2]];
  var J = (function() {
    const e2 = new ArrayBuffer(2);
    return new DataView(e2).setInt16(0, 255, true), 255 === new Int16Array(e2)[0];
  })();
  function W(e2) {
    for (let t2 = 0; t2 < e2.length; t2++) /^([^\s:]|[^\s:][^:]*[^\s:]): .+$/.test(e2[t2]) || N.printDebugError(Error("Improperly formatted armor header: " + e2[t2])), /^(Version|Comment|MessageID|Hash|Charset): .+$/.test(e2[t2]) || N.printDebugError(Error("Unknown header: " + e2[t2]));
  }
  function X(e2) {
    let t2 = e2;
    const r2 = e2.lastIndexOf("=");
    return r2 >= 0 && r2 !== e2.length - 1 && (t2 = e2.slice(0, r2)), t2;
  }
  function $(e2) {
    return new Promise(((t2, r2) => {
      try {
        const n2 = /^-----[^-]+-----$/m, i2 = /^[ \f\r\t\u00a0\u2000-\u200a\u202f\u205f\u3000]*$/;
        let s2;
        const a2 = [];
        let o2, c2, u2 = a2, h2 = [];
        const f2 = G(v(e2, (async (e3, l2) => {
          const y2 = x(e3);
          try {
            for (; ; ) {
              let e4 = await y2.readLine();
              if (void 0 === e4) throw Error("Misformed armored text");
              if (e4 = N.removeTrailingSpaces(e4.replace(/[\r\n]/g, "")), s2) if (o2) c2 || s2 !== R.armor.signed || (n2.test(e4) ? (h2 = h2.join("\r\n"), c2 = true, W(u2), u2 = [], o2 = false) : h2.push(e4.replace(/^- /, "")));
              else if (n2.test(e4) && r2(Error("Mandatory blank line missing between armor headers and armor data")), i2.test(e4)) {
                if (W(u2), o2 = true, c2 || s2 !== R.armor.signed) {
                  t2({ text: h2, data: f2, headers: a2, type: s2 });
                  break;
                }
              } else u2.push(e4);
              else n2.test(e4) && (s2 = q(e4));
            }
          } catch (e4) {
            return void r2(e4);
          }
          const g2 = Q(l2);
          try {
            for (; ; ) {
              await g2.ready;
              const { done: e4, value: t3 } = await y2.read();
              if (e4) throw Error("Misformed armored text");
              const r3 = t3 + "";
              if (-1 !== r3.indexOf("=") || -1 !== r3.indexOf("-")) {
                let e5 = await y2.readToEnd();
                e5.length || (e5 = ""), e5 = r3 + e5, e5 = N.removeTrailingSpaces(e5.replace(/\r/g, ""));
                const t4 = e5.split(n2);
                if (1 === t4.length) throw Error("Misformed armored text");
                const i3 = X(t4[0].slice(0, -1));
                await g2.write(i3);
                break;
              }
              await g2.write(r3);
            }
            await g2.ready, await g2.close();
          } catch (e4) {
            await g2.abort(e4);
          }
        })));
      } catch (e3) {
        r2(e3);
      }
    })).then((async (e3) => (o(e3.data) && (e3.data = await D(e3.data)), e3)));
  }
  function ee(e2, t2, r2, n2, i2, s2 = false, a2 = F) {
    let o2, c2;
    e2 === R.armor.signed && (o2 = t2.text, c2 = t2.hash, t2 = t2.data);
    const u2 = s2 && S(t2), h2 = [];
    switch (e2) {
      case R.armor.multipartSection:
        h2.push("-----BEGIN PGP MESSAGE, PART " + r2 + "/" + n2 + "-----\n"), h2.push(_(i2, a2)), h2.push(z(t2)), u2 && h2.push("=", Y(u2)), h2.push("-----END PGP MESSAGE, PART " + r2 + "/" + n2 + "-----\n");
        break;
      case R.armor.multipartLast:
        h2.push("-----BEGIN PGP MESSAGE, PART " + r2 + "-----\n"), h2.push(_(i2, a2)), h2.push(z(t2)), u2 && h2.push("=", Y(u2)), h2.push("-----END PGP MESSAGE, PART " + r2 + "-----\n");
        break;
      case R.armor.signed:
        h2.push("-----BEGIN PGP SIGNED MESSAGE-----\n"), h2.push(c2 ? `Hash: ${c2}

` : "\n"), h2.push(o2.replace(/^-/gm, "- -")), h2.push("\n-----BEGIN PGP SIGNATURE-----\n"), h2.push(_(i2, a2)), h2.push(z(t2)), u2 && h2.push("=", Y(u2)), h2.push("-----END PGP SIGNATURE-----\n");
        break;
      case R.armor.message:
        h2.push("-----BEGIN PGP MESSAGE-----\n"), h2.push(_(i2, a2)), h2.push(z(t2)), u2 && h2.push("=", Y(u2)), h2.push("-----END PGP MESSAGE-----\n");
        break;
      case R.armor.publicKey:
        h2.push("-----BEGIN PGP PUBLIC KEY BLOCK-----\n"), h2.push(_(i2, a2)), h2.push(z(t2)), u2 && h2.push("=", Y(u2)), h2.push("-----END PGP PUBLIC KEY BLOCK-----\n");
        break;
      case R.armor.privateKey:
        h2.push("-----BEGIN PGP PRIVATE KEY BLOCK-----\n"), h2.push(_(i2, a2)), h2.push(z(t2)), u2 && h2.push("=", Y(u2)), h2.push("-----END PGP PRIVATE KEY BLOCK-----\n");
        break;
      case R.armor.signature:
        h2.push("-----BEGIN PGP SIGNATURE-----\n"), h2.push(_(i2, a2)), h2.push(z(t2)), u2 && h2.push("=", Y(u2)), h2.push("-----END PGP SIGNATURE-----\n");
    }
    return N.concat(h2);
  }
  var te = BigInt(0);
  var re = BigInt(1);
  function ne(e2) {
    const t2 = "0123456789ABCDEF";
    let r2 = "";
    return e2.forEach(((e3) => {
      r2 += t2[e3 >> 4] + t2[15 & e3];
    })), BigInt("0x0" + r2);
  }
  function ie(e2, t2) {
    const r2 = e2 % t2;
    return r2 < te ? r2 + t2 : r2;
  }
  function se(e2, t2, r2) {
    const n2 = -e2;
    return t2 & n2 | r2 & ~n2;
  }
  function ae(e2, t2, r2) {
    if (r2 === te) throw Error("Modulo cannot be zero");
    if (r2 === re) return BigInt(0);
    if (t2 < te) throw Error("Unsopported negative exponent");
    let n2 = t2, i2 = e2;
    i2 %= r2;
    let s2 = BigInt(1);
    for (; n2 > te; ) {
      const e3 = n2 & re;
      n2 >>= re;
      s2 = se(e3, s2 * i2 % r2, s2), i2 = i2 * i2 % r2;
    }
    return s2;
  }
  function oe(e2) {
    return e2 >= te ? e2 : -e2;
  }
  function ce(e2, t2) {
    const { gcd: r2, x: n2 } = (function(e3, t3) {
      let r3 = BigInt(0), n3 = BigInt(1), i2 = BigInt(1), s2 = BigInt(0), a2 = oe(e3), o2 = oe(t3);
      const c2 = e3 < te, u2 = t3 < te;
      for (; o2 !== te; ) {
        const e4 = a2 / o2;
        let t4 = r3;
        r3 = i2 - e4 * r3, i2 = t4, t4 = n3, n3 = s2 - e4 * n3, s2 = t4, t4 = o2, o2 = a2 % o2, a2 = t4;
      }
      return { x: c2 ? -i2 : i2, y: u2 ? -s2 : s2, gcd: a2 };
    })(e2, t2);
    if (r2 !== re) throw Error("Inverse does not exist");
    return ie(n2 + t2, t2);
  }
  function ue(e2) {
    const t2 = Number(e2);
    if (t2 > Number.MAX_SAFE_INTEGER) throw Error("Number can only safely store up to 53 bits");
    return t2;
  }
  function he(e2, t2) {
    return (e2 >> BigInt(t2) & re) === te ? 0 : 1;
  }
  function fe(e2) {
    const t2 = e2 < te ? BigInt(-1) : te;
    let r2 = 1, n2 = e2;
    for (; (n2 >>= re) !== t2; ) r2++;
    return r2;
  }
  function le(e2) {
    const t2 = e2 < te ? BigInt(-1) : te, r2 = BigInt(8);
    let n2 = 1, i2 = e2;
    for (; (i2 >>= r2) !== t2; ) n2++;
    return n2;
  }
  function ye(e2, t2 = "be", r2) {
    let n2 = e2.toString(16);
    n2.length % 2 == 1 && (n2 = "0" + n2);
    const i2 = n2.length / 2, s2 = new Uint8Array(r2 || i2), a2 = r2 ? r2 - i2 : 0;
    let o2 = 0;
    for (; o2 < i2; ) s2[o2 + a2] = parseInt(n2.slice(2 * o2, 2 * o2 + 2), 16), o2++;
    return "be" !== t2 && s2.reverse(), s2;
  }
  var ge = N.getNodeCrypto();
  function pe(e2) {
    const t2 = "undefined" != typeof crypto ? crypto : ge?.webcrypto;
    if (t2?.getRandomValues) {
      const r2 = new Uint8Array(e2);
      return t2.getRandomValues(r2);
    }
    throw Error("No secure random number generator available.");
  }
  function de(e2, t2) {
    if (t2 < e2) throw Error("Illegal parameter value: max <= min");
    const r2 = t2 - e2;
    return ie(ne(pe(le(r2) + 8)), r2) + e2;
  }
  var Ae = BigInt(1);
  function we(e2, t2, r2) {
    const n2 = BigInt(30), i2 = Ae << BigInt(e2 - 1), s2 = [1, 6, 5, 4, 3, 2, 1, 4, 3, 2, 1, 2, 1, 4, 3, 2, 1, 2, 1, 4, 3, 2, 1, 6, 5, 4, 3, 2, 1, 2];
    let a2 = de(i2, i2 << Ae), o2 = ue(ie(a2, n2));
    do {
      a2 += BigInt(s2[o2]), o2 = (o2 + s2[o2]) % s2.length, fe(a2) > e2 && (a2 = ie(a2, i2 << Ae), a2 += i2, o2 = ue(ie(a2, n2)));
    } while (!me(a2, t2, r2));
    return a2;
  }
  function me(e2, t2, r2) {
    return (!t2 || (function(e3, t3) {
      let r3 = e3, n2 = t3;
      for (; n2 !== te; ) {
        const e4 = n2;
        n2 = r3 % n2, r3 = e4;
      }
      return r3;
    })(e2 - Ae, t2) === Ae) && (!!(function(e3) {
      const t3 = BigInt(0);
      return be.every(((r3) => ie(e3, r3) !== t3));
    })(e2) && (!!(function(e3, t3 = BigInt(2)) {
      return ae(t3, e3 - Ae, e3) === Ae;
    })(e2) && !!(function(e3, t3) {
      const r3 = fe(e3);
      t3 || (t3 = Math.max(1, r3 / 48 | 0));
      const n2 = e3 - Ae;
      let i2 = 0;
      for (; !he(n2, i2); ) i2++;
      const s2 = e3 >> BigInt(i2);
      for (; t3 > 0; t3--) {
        let t4, r4 = ae(de(BigInt(2), n2), s2, e3);
        if (r4 !== Ae && r4 !== n2) {
          for (t4 = 1; t4 < i2; t4++) {
            if (r4 = ie(r4 * r4, e3), r4 === Ae) return false;
            if (r4 === n2) break;
          }
          if (t4 === i2) return false;
        }
      }
      return true;
    })(e2, r2)));
  }
  var be = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999].map(((e2) => BigInt(e2)));
  var ke = N.getWebCrypto();
  var Ee = N.getNodeCrypto();
  var ve = Ee && Ee.getHashes();
  function Ie(e2) {
    if (Ee && ve.includes(e2)) return async function(t2) {
      const r2 = Ee.createHash(e2);
      return b(t2, ((e3) => {
        r2.update(e3);
      }), (() => new Uint8Array(r2.digest())));
    };
  }
  function Be(e2, t2) {
    const r2 = async () => {
      const { nobleHashes: t3 } = await Promise.resolve().then((function() {
        return ll;
      })), r3 = t3.get(e2);
      if (!r3) throw Error("Unsupported hash");
      return r3;
    };
    return async function(e3) {
      if (o(e3) && (e3 = await D(e3)), N.isStream(e3)) {
        const t3 = (await r2()).create();
        return b(e3, ((e4) => {
          t3.update(e4);
        }), (() => t3.digest()));
      }
      if (ke && t2) return new Uint8Array(await ke.digest(t2, e3));
      return (await r2())(e3);
    };
  }
  var Se = Ie("md5") || Be("md5");
  var Ke = Ie("sha1") || Be("sha1", "SHA-1");
  var Ce = Ie("sha224") || Be("sha224");
  var De = Ie("sha256") || Be("sha256", "SHA-256");
  var Ue = Ie("sha384") || Be("sha384", "SHA-384");
  var Pe = Ie("sha512") || Be("sha512", "SHA-512");
  var xe = Ie("ripemd160") || Be("ripemd160");
  var Qe = Ie("sha3-256") || Be("sha3_256");
  var Me = Ie("sha3-512") || Be("sha3_512");
  function Re(e2, t2) {
    switch (e2) {
      case R.hash.md5:
        return Se(t2);
      case R.hash.sha1:
        return Ke(t2);
      case R.hash.ripemd:
        return xe(t2);
      case R.hash.sha256:
        return De(t2);
      case R.hash.sha384:
        return Ue(t2);
      case R.hash.sha512:
        return Pe(t2);
      case R.hash.sha224:
        return Ce(t2);
      case R.hash.sha3_256:
        return Qe(t2);
      case R.hash.sha3_512:
        return Me(t2);
      default:
        throw Error("Unsupported hash function");
    }
  }
  function Fe(e2) {
    switch (e2) {
      case R.hash.md5:
        return 16;
      case R.hash.sha1:
      case R.hash.ripemd:
        return 20;
      case R.hash.sha256:
        return 32;
      case R.hash.sha384:
        return 48;
      case R.hash.sha512:
        return 64;
      case R.hash.sha224:
        return 28;
      case R.hash.sha3_256:
        return 32;
      case R.hash.sha3_512:
        return 64;
      default:
        throw Error("Invalid hash algorithm.");
    }
  }
  var Te = [];
  function Ne(e2, t2) {
    const r2 = e2.length;
    if (r2 > t2 - 11) throw Error("Message too long");
    const n2 = (function(e3) {
      const t3 = new Uint8Array(e3);
      let r3 = 0;
      for (; r3 < e3; ) {
        const n3 = pe(e3 - r3);
        for (let e4 = 0; e4 < n3.length; e4++) 0 !== n3[e4] && (t3[r3++] = n3[e4]);
      }
      return t3;
    })(t2 - r2 - 3), i2 = new Uint8Array(t2);
    return i2[1] = 2, i2.set(n2, 2), i2.set(e2, t2 - r2), i2;
  }
  function Le(e2, t2) {
    let r2 = 2, n2 = 1;
    for (let t3 = r2; t3 < e2.length; t3++) n2 &= 0 !== e2[t3], r2 += n2;
    const i2 = r2 - 2, s2 = e2.subarray(r2 + 1), a2 = 0 === e2[0] & 2 === e2[1] & i2 >= 8 & !n2;
    if (t2) return N.selectUint8Array(a2, s2, t2);
    if (a2) return s2;
    throw Error("Decryption error");
  }
  function Oe(e2, t2, r2) {
    let n2;
    if (t2.length !== Fe(e2)) throw Error("Invalid hash length");
    const i2 = new Uint8Array(Te[e2].length);
    for (n2 = 0; n2 < Te[e2].length; n2++) i2[n2] = Te[e2][n2];
    const s2 = i2.length + t2.length;
    if (r2 < s2 + 11) throw Error("Intended encoded message length too short");
    const a2 = new Uint8Array(r2 - s2 - 3).fill(255), o2 = new Uint8Array(r2);
    return o2[1] = 1, o2.set(a2, 2), o2.set(i2, r2 - s2), o2.set(t2, r2 - t2.length), o2;
  }
  Te[1] = [48, 32, 48, 12, 6, 8, 42, 134, 72, 134, 247, 13, 2, 5, 5, 0, 4, 16], Te[2] = [48, 33, 48, 9, 6, 5, 43, 14, 3, 2, 26, 5, 0, 4, 20], Te[3] = [48, 33, 48, 9, 6, 5, 43, 36, 3, 2, 1, 5, 0, 4, 20], Te[8] = [48, 49, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 1, 5, 0, 4, 32], Te[9] = [48, 65, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 2, 5, 0, 4, 48], Te[10] = [48, 81, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 3, 5, 0, 4, 64], Te[11] = [48, 45, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 4, 5, 0, 4, 28], Te[12] = [48, 49, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 8, 5, 0, 4, 32], Te[14] = [48, 81, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 10, 5, 0, 4, 64];
  var He = N.getWebCrypto();
  var ze = N.getNodeCrypto();
  var Ge = BigInt(1);
  async function je(e2, t2, r2, n2, i2, s2, a2, o2, c2) {
    if (Fe(e2) >= r2.length) throw Error("Digest size cannot exceed key modulus size");
    if (t2 && !N.isStream(t2)) {
      if (N.getWebCrypto()) try {
        return await (async function(e3, t3, r3, n3, i3, s3, a3, o3) {
          const c3 = Ye(r3, n3, i3, s3, a3, o3), u2 = { name: "RSASSA-PKCS1-v1_5", hash: { name: e3 } }, h2 = await He.importKey("jwk", c3, u2, false, ["sign"]);
          return new Uint8Array(await He.sign("RSASSA-PKCS1-v1_5", h2, t3));
        })(R.read(R.webHash, e2), t2, r2, n2, i2, s2, a2, o2);
      } catch (e3) {
        N.printDebugError(e3);
      }
      else if (N.getNodeCrypto()) return (function(e3, t3, r3, n3, i3, s3, a3, o3) {
        const c3 = ze.createSign(R.read(R.hash, e3));
        c3.write(t3), c3.end();
        const u2 = Ye(r3, n3, i3, s3, a3, o3);
        return new Uint8Array(c3.sign({ key: u2, format: "jwk", type: "pkcs1" }));
      })(e2, t2, r2, n2, i2, s2, a2, o2);
    }
    return (function(e3, t3, r3, n3) {
      t3 = ne(t3);
      const i3 = ne(Oe(e3, n3, le(t3)));
      return r3 = ne(r3), ye(ae(i3, r3, t3), "be", le(t3));
    })(e2, r2, i2, c2);
  }
  async function Ve(e2, t2, r2, n2, i2, s2) {
    if (t2 && !N.isStream(t2)) {
      if (N.getWebCrypto()) try {
        return await (async function(e3, t3, r3, n3, i3) {
          const s3 = Ze(n3, i3), a2 = await He.importKey("jwk", s3, { name: "RSASSA-PKCS1-v1_5", hash: { name: e3 } }, false, ["verify"]);
          return He.verify("RSASSA-PKCS1-v1_5", a2, r3, t3);
        })(R.read(R.webHash, e2), t2, r2, n2, i2);
      } catch (e3) {
        N.printDebugError(e3);
      }
      else if (N.getNodeCrypto()) return (function(e3, t3, r3, n3, i3) {
        const s3 = Ze(n3, i3), a2 = { key: s3, format: "jwk", type: "pkcs1" }, o2 = ze.createVerify(R.read(R.hash, e3));
        o2.write(t3), o2.end();
        try {
          return o2.verify(a2, r3);
        } catch {
          return false;
        }
      })(e2, t2, r2, n2, i2);
    }
    return (function(e3, t3, r3, n3, i3) {
      if (r3 = ne(r3), t3 = ne(t3), n3 = ne(n3), t3 >= r3) throw Error("Signature size cannot exceed modulus size");
      const s3 = ye(ae(t3, n3, r3), "be", le(r3)), a2 = Oe(e3, i3, le(r3));
      return N.equalsUint8Array(s3, a2);
    })(e2, r2, n2, i2, s2);
  }
  async function qe(e2, t2, r2) {
    return N.getNodeCrypto() ? (function(e3, t3, r3) {
      const n2 = Ze(t3, r3), i2 = { key: n2, format: "jwk", type: "pkcs1", padding: ze.constants.RSA_PKCS1_PADDING };
      return new Uint8Array(ze.publicEncrypt(i2, e3));
    })(e2, t2, r2) : (function(e3, t3, r3) {
      if (t3 = ne(t3), e3 = ne(Ne(e3, le(t3))), r3 = ne(r3), e3 >= t3) throw Error("Message size cannot exceed modulus size");
      return ye(ae(e3, r3, t3), "be", le(t3));
    })(e2, t2, r2);
  }
  async function _e(e2, t2, r2, n2, i2, s2, a2, o2) {
    if (N.getNodeCrypto() && !o2) try {
      return (function(e3, t3, r3, n3, i3, s3, a3) {
        const o3 = Ye(t3, r3, n3, i3, s3, a3), c2 = { key: o3, format: "jwk", type: "pkcs1", padding: ze.constants.RSA_PKCS1_PADDING };
        try {
          return new Uint8Array(ze.privateDecrypt(c2, e3));
        } catch {
          throw Error("Decryption error");
        }
      })(e2, t2, r2, n2, i2, s2, a2);
    } catch (e3) {
      N.printDebugError(e3);
    }
    return (function(e3, t3, r3, n3, i3, s3, a3, o3) {
      if (e3 = ne(e3), t3 = ne(t3), r3 = ne(r3), n3 = ne(n3), i3 = ne(i3), s3 = ne(s3), a3 = ne(a3), e3 >= t3) throw Error("Data too large.");
      const c2 = ie(n3, s3 - Ge), u2 = ie(n3, i3 - Ge), h2 = de(BigInt(2), t3), f2 = ae(ce(h2, t3), r3, t3);
      e3 = ie(e3 * f2, t3);
      const l2 = ae(e3, u2, i3), y2 = ae(e3, c2, s3), g2 = ie(a3 * (y2 - l2), s3);
      let p2 = g2 * i3 + l2;
      return p2 = ie(p2 * h2, t3), Le(ye(p2, "be", le(t3)), o3);
    })(e2, t2, r2, n2, i2, s2, a2, o2);
  }
  function Ye(e2, t2, r2, n2, i2, s2) {
    const a2 = ne(n2), o2 = ne(i2), c2 = ne(r2);
    let u2 = ie(c2, o2 - Ge), h2 = ie(c2, a2 - Ge);
    return h2 = ye(h2), u2 = ye(u2), { kty: "RSA", n: V(e2), e: V(t2), d: V(r2), p: V(i2), q: V(n2), dp: V(u2), dq: V(h2), qi: V(s2), ext: true };
  }
  function Ze(e2, t2) {
    return { kty: "RSA", n: V(e2), e: V(t2), ext: true };
  }
  function Je(e2, t2) {
    return { n: j(e2.n), e: ye(t2), d: j(e2.d), p: j(e2.q), q: j(e2.p), u: j(e2.qi) };
  }
  var We = BigInt(1);
  var Xe = { "2a8648ce3d030107": R.curve.nistP256, "2b81040022": R.curve.nistP384, "2b81040023": R.curve.nistP521, "2b8104000a": R.curve.secp256k1, "2b06010401da470f01": R.curve.ed25519Legacy, "2b060104019755010501": R.curve.curve25519Legacy, "2b2403030208010107": R.curve.brainpoolP256r1, "2b240303020801010b": R.curve.brainpoolP384r1, "2b240303020801010d": R.curve.brainpoolP512r1 };
  var $e = class _$e {
    constructor(e2) {
      if (e2 instanceof _$e) this.oid = e2.oid;
      else if (N.isArray(e2) || N.isUint8Array(e2)) {
        if (6 === (e2 = new Uint8Array(e2))[0]) {
          if (e2[1] !== e2.length - 2) throw Error("Length mismatch in DER encoded oid");
          e2 = e2.subarray(2);
        }
        this.oid = e2;
      } else this.oid = "";
    }
    read(e2) {
      if (e2.length >= 1) {
        const t2 = e2[0];
        if (e2.length >= 1 + t2) return this.oid = e2.subarray(1, 1 + t2), 1 + this.oid.length;
      }
      throw Error("Invalid oid");
    }
    write() {
      return N.concatUint8Array([new Uint8Array([this.oid.length]), this.oid]);
    }
    toHex() {
      return N.uint8ArrayToHex(this.oid);
    }
    getName() {
      const e2 = Xe[this.toHex()];
      if (!e2) throw Error("Unknown curve object identifier.");
      return e2;
    }
  };
  function et(e2) {
    let t2, r2 = 0;
    const n2 = e2[0];
    return n2 < 192 ? ([r2] = e2, t2 = 1) : n2 < 255 ? (r2 = (e2[0] - 192 << 8) + e2[1] + 192, t2 = 2) : 255 === n2 && (r2 = N.readNumber(e2.subarray(1, 5)), t2 = 5), { len: r2, offset: t2 };
  }
  function tt(e2) {
    return e2 < 192 ? new Uint8Array([e2]) : e2 > 191 && e2 < 8384 ? new Uint8Array([192 + (e2 - 192 >> 8), e2 - 192 & 255]) : N.concatUint8Array([new Uint8Array([255]), N.writeNumber(e2, 4)]);
  }
  function rt(e2) {
    if (e2 < 0 || e2 > 30) throw Error("Partial Length power must be between 1 and 30");
    return new Uint8Array([224 + e2]);
  }
  function nt(e2) {
    return new Uint8Array([192 | e2]);
  }
  function it(e2, t2) {
    return N.concatUint8Array([nt(e2), tt(t2)]);
  }
  function st(e2) {
    return [R.packet.literalData, R.packet.compressedData, R.packet.symmetricallyEncryptedData, R.packet.symEncryptedIntegrityProtectedData, R.packet.aeadEncryptedData].includes(e2);
  }
  async function at(e2, t2, r2) {
    let n2, i2;
    try {
      const s2 = await e2.peekBytes(2);
      if (!s2 || s2.length < 2 || !(128 & s2[0])) throw Error("Error during parsing. This message / key probably does not conform to a valid OpenPGP format.");
      const o2 = await e2.readByte();
      let c2, u2, h2 = -1, f2 = -1;
      f2 = 0, 64 & o2 && (f2 = 1), f2 ? h2 = 63 & o2 : (h2 = (63 & o2) >> 2, u2 = 3 & o2);
      const l2 = st(h2);
      let y2, g2 = null;
      if (t2 && l2) {
        if ("array" === t2) {
          const e3 = new a();
          n2 = Q(e3), g2 = e3;
        } else {
          const e3 = new TransformStream();
          n2 = Q(e3.writable), g2 = e3.readable;
        }
        i2 = r2({ tag: h2, packet: g2 });
      } else g2 = [];
      do {
        if (f2) {
          const t3 = await e2.readByte();
          if (y2 = false, t3 < 192) c2 = t3;
          else if (t3 >= 192 && t3 < 224) c2 = (t3 - 192 << 8) + await e2.readByte() + 192;
          else if (t3 > 223 && t3 < 255) {
            if (c2 = 1 << (31 & t3), y2 = true, !l2) throw new TypeError("This packet type does not support partial lengths.");
          } else c2 = (await e2.readByte() << 24 | await e2.readByte() << 16 | await e2.readByte() << 8 | await e2.readByte()) >>> 0;
        } else switch (u2) {
          case 0:
            c2 = await e2.readByte();
            break;
          case 1:
            c2 = await e2.readByte() << 8 | await e2.readByte();
            break;
          case 2:
            c2 = (await e2.readByte() << 24 | await e2.readByte() << 16 | await e2.readByte() << 8 | await e2.readByte()) >>> 0;
            break;
          default:
            c2 = 1 / 0;
        }
        if (c2 > 0) {
          let t3 = 0;
          for (; ; ) {
            n2 && await n2.ready;
            const { done: r3, value: i3 } = await e2.read();
            if (r3) {
              if (c2 === 1 / 0) break;
              throw Error("Unexpected end of packet");
            }
            const s3 = c2 === 1 / 0 ? i3 : i3.subarray(0, c2 - t3);
            if (n2 ? await n2.write(s3) : g2.push(s3), t3 += i3.length, t3 >= c2) {
              e2.unshift(i3.subarray(c2 - t3 + i3.length));
              break;
            }
          }
        }
      } while (y2);
      n2 ? (await n2.ready, await n2.close()) : (g2 = N.concatUint8Array(g2), await r2({ tag: h2, packet: g2 }));
    } catch (e3) {
      if (n2) return await n2.abort(e3), true;
      throw e3;
    } finally {
      n2 && await i2;
    }
  }
  var ot = class _ot extends Error {
    constructor(...e2) {
      super(...e2), Error.captureStackTrace && Error.captureStackTrace(this, _ot), this.name = "UnsupportedError";
    }
  };
  var ct = class extends ot {
    constructor(...e2) {
      super(...e2), Error.captureStackTrace && Error.captureStackTrace(this, ot), this.name = "UnknownPacketError";
    }
  };
  var ut = class extends ot {
    constructor(...e2) {
      super(...e2), Error.captureStackTrace && Error.captureStackTrace(this, ot), this.name = "MalformedPacketError";
    }
  };
  var ht = class {
    constructor(e2, t2) {
      this.tag = e2, this.rawContent = t2;
    }
    write() {
      return this.rawContent;
    }
  };
  async function ft(e2) {
    switch (e2) {
      case R.publicKey.ed25519:
        try {
          const e3 = N.getWebCrypto(), t2 = await e3.generateKey("Ed25519", true, ["sign", "verify"]).catch(((e4) => {
            if ("OperationError" === e4.name) {
              const e5 = Error("Unexpected key generation issue");
              throw e5.name = "NotSupportedError", e5;
            }
            throw e4;
          })), r2 = await e3.exportKey("jwk", t2.privateKey), n2 = await e3.exportKey("jwk", t2.publicKey);
          return { A: new Uint8Array(j(n2.x)), seed: j(r2.d) };
        } catch (t2) {
          if ("NotSupportedError" !== t2.name) throw t2;
          const { default: r2 } = await Promise.resolve().then((function() {
            return ny;
          })), n2 = pe(pt(e2)), { publicKey: i2 } = r2.sign.keyPair.fromSeed(n2);
          return { A: i2, seed: n2 };
        }
      case R.publicKey.ed448: {
        const e3 = await N.getNobleCurve(R.publicKey.ed448), { secretKey: t2, publicKey: r2 } = e3.keygen();
        return { A: r2, seed: t2 };
      }
      default:
        throw Error("Unsupported EdDSA algorithm");
    }
  }
  async function lt(e2, t2, r2, n2, i2, s2) {
    if (Fe(t2) < Fe(dt(e2))) throw Error("Hash algorithm too weak for EdDSA.");
    switch (e2) {
      case R.publicKey.ed25519:
        try {
          const t3 = N.getWebCrypto(), r3 = wt(e2, n2, i2), a2 = await t3.importKey("jwk", r3, "Ed25519", false, ["sign"]);
          return { RS: new Uint8Array(await t3.sign("Ed25519", a2, s2)) };
        } catch (e3) {
          if ("NotSupportedError" !== e3.name) throw e3;
          const { default: t3 } = await Promise.resolve().then((function() {
            return ny;
          })), r3 = N.concatUint8Array([i2, n2]);
          return { RS: t3.sign.detached(s2, r3) };
        }
      case R.publicKey.ed448:
        return { RS: (await N.getNobleCurve(R.publicKey.ed448)).sign(s2, i2) };
      default:
        throw Error("Unsupported EdDSA algorithm");
    }
  }
  async function yt(e2, t2, { RS: r2 }, n2, i2, s2) {
    if (Fe(t2) < Fe(dt(e2))) throw Error("Hash algorithm too weak for EdDSA.");
    switch (e2) {
      case R.publicKey.ed25519:
        try {
          const t3 = N.getWebCrypto(), n3 = At(e2, i2), a2 = await t3.importKey("jwk", n3, "Ed25519", false, ["verify"]);
          return await t3.verify("Ed25519", a2, r2, s2);
        } catch (e3) {
          if ("NotSupportedError" !== e3.name) throw e3;
          const { default: t3 } = await Promise.resolve().then((function() {
            return ny;
          }));
          return t3.sign.detached.verify(s2, r2, i2);
        }
      case R.publicKey.ed448:
        return (await N.getNobleCurve(R.publicKey.ed448)).verify(r2, s2, i2);
      default:
        throw Error("Unsupported EdDSA algorithm");
    }
  }
  async function gt(e2, t2, r2) {
    switch (e2) {
      case R.publicKey.ed25519:
        try {
          const n2 = N.getWebCrypto(), i2 = wt(e2, t2, r2), s2 = At(e2, t2), a2 = await n2.importKey("jwk", i2, "Ed25519", false, ["sign"]), o2 = await n2.importKey("jwk", s2, "Ed25519", false, ["verify"]), c2 = pe(8), u2 = new Uint8Array(await n2.sign("Ed25519", a2, c2));
          return await n2.verify("Ed25519", o2, u2, c2);
        } catch (e3) {
          if ("NotSupportedError" !== e3.name) return false;
          const { default: n2 } = await Promise.resolve().then((function() {
            return ny;
          })), { publicKey: i2 } = n2.sign.keyPair.fromSeed(r2);
          return N.equalsUint8Array(t2, i2);
        }
      case R.publicKey.ed448: {
        const e3 = (await N.getNobleCurve(R.publicKey.ed448)).getPublicKey(r2);
        return N.equalsUint8Array(t2, e3);
      }
      default:
        return false;
    }
  }
  function pt(e2) {
    switch (e2) {
      case R.publicKey.ed25519:
        return 32;
      case R.publicKey.ed448:
        return 57;
      default:
        throw Error("Unsupported EdDSA algorithm");
    }
  }
  function dt(e2) {
    switch (e2) {
      case R.publicKey.ed25519:
        return R.hash.sha256;
      case R.publicKey.ed448:
        return R.hash.sha512;
      default:
        throw Error("Unknown EdDSA algo");
    }
  }
  var At = (e2, t2) => {
    if (e2 === R.publicKey.ed25519) {
      return { kty: "OKP", crv: "Ed25519", x: V(t2), ext: true };
    }
    throw Error("Unsupported EdDSA algorithm");
  };
  var wt = (e2, t2, r2) => {
    if (e2 === R.publicKey.ed25519) {
      const n2 = At(e2, t2);
      return n2.d = V(r2), n2;
    }
    throw Error("Unsupported EdDSA algorithm");
  };
  var mt = /* @__PURE__ */ Object.freeze({ __proto__: null, generate: ft, getPayloadSize: pt, getPreferredHashAlgo: dt, sign: lt, validateParams: gt, verify: yt });
  function bt(e2) {
    return e2 instanceof Uint8Array || ArrayBuffer.isView(e2) && "Uint8Array" === e2.constructor.name;
  }
  function kt(e2, ...t2) {
    if (!bt(e2)) throw Error("Uint8Array expected");
    if (t2.length > 0 && !t2.includes(e2.length)) throw Error("Uint8Array expected of length " + t2 + ", got length=" + e2.length);
  }
  function Et(e2, t2 = true) {
    if (e2.destroyed) throw Error("Hash instance has been destroyed");
    if (t2 && e2.finished) throw Error("Hash#digest() has already been called");
  }
  function vt(e2, t2) {
    kt(e2);
    const r2 = t2.outputLen;
    if (e2.length < r2) throw Error("digestInto() expects output buffer of length at least " + r2);
  }
  function It(e2) {
    return new Uint8Array(e2.buffer, e2.byteOffset, e2.byteLength);
  }
  function Bt(e2) {
    return new Uint32Array(e2.buffer, e2.byteOffset, Math.floor(e2.byteLength / 4));
  }
  function St(...e2) {
    for (let t2 = 0; t2 < e2.length; t2++) e2[t2].fill(0);
  }
  function Kt(e2) {
    return new DataView(e2.buffer, e2.byteOffset, e2.byteLength);
  }
  var Ct = /* @__PURE__ */ (() => 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])();
  function Dt(e2) {
    if ("string" == typeof e2) e2 = (function(e3) {
      if ("string" != typeof e3) throw Error("string expected");
      return new Uint8Array(new TextEncoder().encode(e3));
    })(e2);
    else {
      if (!bt(e2)) throw Error("Uint8Array expected, got " + typeof e2);
      e2 = Tt(e2);
    }
    return e2;
  }
  function Ut(e2, t2) {
    return e2.buffer === t2.buffer && e2.byteOffset < t2.byteOffset + t2.byteLength && t2.byteOffset < e2.byteOffset + e2.byteLength;
  }
  function Pt(e2, t2) {
    if (Ut(e2, t2) && e2.byteOffset < t2.byteOffset) throw Error("complex overlap of input and output is not supported");
  }
  function xt(e2, t2) {
    if (e2.length !== t2.length) return false;
    let r2 = 0;
    for (let n2 = 0; n2 < e2.length; n2++) r2 |= e2[n2] ^ t2[n2];
    return 0 === r2;
  }
  var Qt = (e2, t2) => {
    function r2(r3, ...n2) {
      if (kt(r3), !Ct) throw Error("Non little-endian hardware is not yet supported");
      if (void 0 !== e2.nonceLength) {
        const t3 = n2[0];
        if (!t3) throw Error("nonce / iv required");
        e2.varSizeNonce ? kt(t3) : kt(t3, e2.nonceLength);
      }
      const i2 = e2.tagLength;
      i2 && void 0 !== n2[1] && kt(n2[1]);
      const s2 = t2(r3, ...n2), a2 = (e3, t3) => {
        if (void 0 !== t3) {
          if (2 !== e3) throw Error("cipher output not supported");
          kt(t3);
        }
      };
      let o2 = false;
      return { encrypt(e3, t3) {
        if (o2) throw Error("cannot encrypt() twice with same key + nonce");
        return o2 = true, kt(e3), a2(s2.encrypt.length, t3), s2.encrypt(e3, t3);
      }, decrypt(e3, t3) {
        if (kt(e3), i2 && e3.length < i2) throw Error("invalid ciphertext length: smaller than tagLength=" + i2);
        return a2(s2.decrypt.length, t3), s2.decrypt(e3, t3);
      } };
    }
    return Object.assign(r2, e2), r2;
  };
  function Mt(e2, t2, r2 = true) {
    if (void 0 === t2) return new Uint8Array(e2);
    if (t2.length !== e2) throw Error("invalid output length, expected " + e2 + ", got: " + t2.length);
    if (r2 && !Ft(t2)) throw Error("invalid output, must be aligned");
    return t2;
  }
  function Rt(e2, t2, r2, n2) {
    if ("function" == typeof e2.setBigUint64) return e2.setBigUint64(t2, r2, n2);
    const i2 = BigInt(32), s2 = BigInt(4294967295), a2 = Number(r2 >> i2 & s2), o2 = Number(r2 & s2);
    e2.setUint32(t2 + 0, a2, n2), e2.setUint32(t2 + 4, o2, n2);
  }
  function Ft(e2) {
    return e2.byteOffset % 4 == 0;
  }
  function Tt(e2) {
    return Uint8Array.from(e2);
  }
  var Nt = 16;
  var Lt = /* @__PURE__ */ new Uint8Array(16);
  var Ot = Bt(Lt);
  var Ht = (e2) => (e2 >>> 0 & 255) << 24 | (e2 >>> 8 & 255) << 16 | (e2 >>> 16 & 255) << 8 | e2 >>> 24 & 255;
  var zt = class {
    constructor(e2, t2) {
      this.blockLen = Nt, this.outputLen = Nt, this.s0 = 0, this.s1 = 0, this.s2 = 0, this.s3 = 0, this.finished = false, kt(e2 = Dt(e2), 16);
      const r2 = Kt(e2);
      let n2 = r2.getUint32(0, false), i2 = r2.getUint32(4, false), s2 = r2.getUint32(8, false), a2 = r2.getUint32(12, false);
      const o2 = [];
      for (let e3 = 0; e3 < 128; e3++) o2.push({ s0: Ht(n2), s1: Ht(i2), s2: Ht(s2), s3: Ht(a2) }), { s0: n2, s1: i2, s2, s3: a2 } = { s3: (h2 = s2) << 31 | (f2 = a2) >>> 1, s2: (u2 = i2) << 31 | h2 >>> 1, s1: (c2 = n2) << 31 | u2 >>> 1, s0: c2 >>> 1 ^ 225 << 24 & -(1 & f2) };
      var c2, u2, h2, f2;
      const l2 = (y2 = t2 || 1024) > 65536 ? 8 : y2 > 1024 ? 4 : 2;
      var y2;
      if (![1, 2, 4, 8].includes(l2)) throw Error("ghash: invalid window size, expected 2, 4 or 8");
      this.W = l2;
      const g2 = 128 / l2, p2 = this.windowSize = 2 ** l2, d2 = [];
      for (let e3 = 0; e3 < g2; e3++) for (let t3 = 0; t3 < p2; t3++) {
        let r3 = 0, n3 = 0, i3 = 0, s3 = 0;
        for (let a3 = 0; a3 < l2; a3++) {
          if (!(t3 >>> l2 - a3 - 1 & 1)) continue;
          const { s0: c3, s1: u3, s2: h3, s3: f3 } = o2[l2 * e3 + a3];
          r3 ^= c3, n3 ^= u3, i3 ^= h3, s3 ^= f3;
        }
        d2.push({ s0: r3, s1: n3, s2: i3, s3 });
      }
      this.t = d2;
    }
    _updateBlock(e2, t2, r2, n2) {
      e2 ^= this.s0, t2 ^= this.s1, r2 ^= this.s2, n2 ^= this.s3;
      const { W: i2, t: s2, windowSize: a2 } = this;
      let o2 = 0, c2 = 0, u2 = 0, h2 = 0;
      const f2 = (1 << i2) - 1;
      let l2 = 0;
      for (const y2 of [e2, t2, r2, n2]) for (let e3 = 0; e3 < 4; e3++) {
        const t3 = y2 >>> 8 * e3 & 255;
        for (let e4 = 8 / i2 - 1; e4 >= 0; e4--) {
          const r3 = t3 >>> i2 * e4 & f2, { s0: n3, s1: y3, s2: g2, s3: p2 } = s2[l2 * a2 + r3];
          o2 ^= n3, c2 ^= y3, u2 ^= g2, h2 ^= p2, l2 += 1;
        }
      }
      this.s0 = o2, this.s1 = c2, this.s2 = u2, this.s3 = h2;
    }
    update(e2) {
      Et(this), kt(e2 = Dt(e2));
      const t2 = Bt(e2), r2 = Math.floor(e2.length / Nt), n2 = e2.length % Nt;
      for (let e3 = 0; e3 < r2; e3++) this._updateBlock(t2[4 * e3 + 0], t2[4 * e3 + 1], t2[4 * e3 + 2], t2[4 * e3 + 3]);
      return n2 && (Lt.set(e2.subarray(r2 * Nt)), this._updateBlock(Ot[0], Ot[1], Ot[2], Ot[3]), St(Ot)), this;
    }
    destroy() {
      const { t: e2 } = this;
      for (const t2 of e2) t2.s0 = 0, t2.s1 = 0, t2.s2 = 0, t2.s3 = 0;
    }
    digestInto(e2) {
      Et(this), vt(e2, this), this.finished = true;
      const { s0: t2, s1: r2, s2: n2, s3: i2 } = this, s2 = Bt(e2);
      return s2[0] = t2, s2[1] = r2, s2[2] = n2, s2[3] = i2, e2;
    }
    digest() {
      const e2 = new Uint8Array(Nt);
      return this.digestInto(e2), this.destroy(), e2;
    }
  };
  var Gt = class extends zt {
    constructor(e2, t2) {
      kt(e2 = Dt(e2));
      const r2 = (function(e3) {
        e3.reverse();
        const t3 = 1 & e3[15];
        let r3 = 0;
        for (let t4 = 0; t4 < e3.length; t4++) {
          const n2 = e3[t4];
          e3[t4] = n2 >>> 1 | r3, r3 = (1 & n2) << 7;
        }
        return e3[0] ^= 225 & -t3, e3;
      })(Tt(e2));
      super(r2, t2), St(r2);
    }
    update(e2) {
      e2 = Dt(e2), Et(this);
      const t2 = Bt(e2), r2 = e2.length % Nt, n2 = Math.floor(e2.length / Nt);
      for (let e3 = 0; e3 < n2; e3++) this._updateBlock(Ht(t2[4 * e3 + 3]), Ht(t2[4 * e3 + 2]), Ht(t2[4 * e3 + 1]), Ht(t2[4 * e3 + 0]));
      return r2 && (Lt.set(e2.subarray(n2 * Nt)), this._updateBlock(Ht(Ot[3]), Ht(Ot[2]), Ht(Ot[1]), Ht(Ot[0])), St(Ot)), this;
    }
    digestInto(e2) {
      Et(this), vt(e2, this), this.finished = true;
      const { s0: t2, s1: r2, s2: n2, s3: i2 } = this, s2 = Bt(e2);
      return s2[0] = t2, s2[1] = r2, s2[2] = n2, s2[3] = i2, e2.reverse();
    }
  };
  function jt(e2) {
    const t2 = (t3, r3) => e2(r3, t3.length).update(Dt(t3)).digest(), r2 = e2(new Uint8Array(16), 0);
    return t2.outputLen = r2.outputLen, t2.blockLen = r2.blockLen, t2.create = (t3, r3) => e2(t3, r3), t2;
  }
  var Vt = jt(((e2, t2) => new zt(e2, t2)));
  jt(((e2, t2) => new Gt(e2, t2)));
  var qt = 16;
  var _t = /* @__PURE__ */ new Uint8Array(qt);
  function Yt(e2) {
    return e2 << 1 ^ 283 & -(e2 >> 7);
  }
  function Zt(e2, t2) {
    let r2 = 0;
    for (; t2 > 0; t2 >>= 1) r2 ^= e2 & -(1 & t2), e2 = Yt(e2);
    return r2;
  }
  var Jt = /* @__PURE__ */ (() => {
    const e2 = new Uint8Array(256);
    for (let t3 = 0, r2 = 1; t3 < 256; t3++, r2 ^= Yt(r2)) e2[t3] = r2;
    const t2 = new Uint8Array(256);
    t2[0] = 99;
    for (let r2 = 0; r2 < 255; r2++) {
      let n2 = e2[255 - r2];
      n2 |= n2 << 8, t2[e2[r2]] = 255 & (n2 ^ n2 >> 4 ^ n2 >> 5 ^ n2 >> 6 ^ n2 >> 7 ^ 99);
    }
    return St(e2), t2;
  })();
  var Wt = /* @__PURE__ */ Jt.map(((e2, t2) => Jt.indexOf(t2)));
  var Xt = (e2) => e2 << 8 | e2 >>> 24;
  var $t = (e2) => e2 << 24 & 4278190080 | e2 << 8 & 16711680 | e2 >>> 8 & 65280 | e2 >>> 24 & 255;
  function er(e2, t2) {
    if (256 !== e2.length) throw Error("Wrong sbox length");
    const r2 = new Uint32Array(256).map(((r3, n3) => t2(e2[n3]))), n2 = r2.map(Xt), i2 = n2.map(Xt), s2 = i2.map(Xt), a2 = new Uint32Array(65536), o2 = new Uint32Array(65536), c2 = new Uint16Array(65536);
    for (let t3 = 0; t3 < 256; t3++) for (let u2 = 0; u2 < 256; u2++) {
      const h2 = 256 * t3 + u2;
      a2[h2] = r2[t3] ^ n2[u2], o2[h2] = i2[t3] ^ s2[u2], c2[h2] = e2[t3] << 8 | e2[u2];
    }
    return { sbox: e2, sbox2: c2, T0: r2, T1: n2, T2: i2, T3: s2, T01: a2, T23: o2 };
  }
  var tr = /* @__PURE__ */ er(Jt, ((e2) => Zt(e2, 3) << 24 | e2 << 16 | e2 << 8 | Zt(e2, 2)));
  var rr = /* @__PURE__ */ er(Wt, ((e2) => Zt(e2, 11) << 24 | Zt(e2, 13) << 16 | Zt(e2, 9) << 8 | Zt(e2, 14)));
  var nr = /* @__PURE__ */ (() => {
    const e2 = new Uint8Array(16);
    for (let t2 = 0, r2 = 1; t2 < 16; t2++, r2 = Yt(r2)) e2[t2] = r2;
    return e2;
  })();
  function ir(e2) {
    kt(e2);
    const t2 = e2.length;
    if (![16, 24, 32].includes(t2)) throw Error("aes: invalid key size, should be 16, 24 or 32, got " + t2);
    const { sbox2: r2 } = tr, n2 = [];
    Ft(e2) || n2.push(e2 = Tt(e2));
    const i2 = Bt(e2), s2 = i2.length, a2 = (e3) => or(r2, e3, e3, e3, e3), o2 = new Uint32Array(t2 + 28);
    o2.set(i2);
    for (let e3 = s2; e3 < o2.length; e3++) {
      let t3 = o2[e3 - 1];
      e3 % s2 == 0 ? t3 = a2((c2 = t3) << 24 | c2 >>> 8) ^ nr[e3 / s2 - 1] : s2 > 6 && e3 % s2 == 4 && (t3 = a2(t3)), o2[e3] = o2[e3 - s2] ^ t3;
    }
    var c2;
    return St(...n2), o2;
  }
  function sr(e2) {
    const t2 = ir(e2), r2 = t2.slice(), n2 = t2.length, { sbox2: i2 } = tr, { T0: s2, T1: a2, T2: o2, T3: c2 } = rr;
    for (let e3 = 0; e3 < n2; e3 += 4) for (let i3 = 0; i3 < 4; i3++) r2[e3 + i3] = t2[n2 - e3 - 4 + i3];
    St(t2);
    for (let e3 = 4; e3 < n2 - 4; e3++) {
      const t3 = r2[e3], n3 = or(i2, t3, t3, t3, t3);
      r2[e3] = s2[255 & n3] ^ a2[n3 >>> 8 & 255] ^ o2[n3 >>> 16 & 255] ^ c2[n3 >>> 24];
    }
    return r2;
  }
  function ar(e2, t2, r2, n2, i2, s2) {
    return e2[r2 << 8 & 65280 | n2 >>> 8 & 255] ^ t2[i2 >>> 8 & 65280 | s2 >>> 24 & 255];
  }
  function or(e2, t2, r2, n2, i2) {
    return e2[255 & t2 | 65280 & r2] | e2[n2 >>> 16 & 255 | i2 >>> 16 & 65280] << 16;
  }
  function cr(e2, t2, r2, n2, i2) {
    const { sbox2: s2, T01: a2, T23: o2 } = tr;
    let c2 = 0;
    t2 ^= e2[c2++], r2 ^= e2[c2++], n2 ^= e2[c2++], i2 ^= e2[c2++];
    const u2 = e2.length / 4 - 2;
    for (let s3 = 0; s3 < u2; s3++) {
      const s4 = e2[c2++] ^ ar(a2, o2, t2, r2, n2, i2), u3 = e2[c2++] ^ ar(a2, o2, r2, n2, i2, t2), h2 = e2[c2++] ^ ar(a2, o2, n2, i2, t2, r2), f2 = e2[c2++] ^ ar(a2, o2, i2, t2, r2, n2);
      t2 = s4, r2 = u3, n2 = h2, i2 = f2;
    }
    return { s0: e2[c2++] ^ or(s2, t2, r2, n2, i2), s1: e2[c2++] ^ or(s2, r2, n2, i2, t2), s2: e2[c2++] ^ or(s2, n2, i2, t2, r2), s3: e2[c2++] ^ or(s2, i2, t2, r2, n2) };
  }
  function ur(e2, t2, r2, n2, i2) {
    const { sbox2: s2, T01: a2, T23: o2 } = rr;
    let c2 = 0;
    t2 ^= e2[c2++], r2 ^= e2[c2++], n2 ^= e2[c2++], i2 ^= e2[c2++];
    const u2 = e2.length / 4 - 2;
    for (let s3 = 0; s3 < u2; s3++) {
      const s4 = e2[c2++] ^ ar(a2, o2, t2, i2, n2, r2), u3 = e2[c2++] ^ ar(a2, o2, r2, t2, i2, n2), h2 = e2[c2++] ^ ar(a2, o2, n2, r2, t2, i2), f2 = e2[c2++] ^ ar(a2, o2, i2, n2, r2, t2);
      t2 = s4, r2 = u3, n2 = h2, i2 = f2;
    }
    return { s0: e2[c2++] ^ or(s2, t2, i2, n2, r2), s1: e2[c2++] ^ or(s2, r2, t2, i2, n2), s2: e2[c2++] ^ or(s2, n2, r2, t2, i2), s3: e2[c2++] ^ or(s2, i2, n2, r2, t2) };
  }
  function hr(e2, t2, r2, n2) {
    kt(t2, qt), kt(r2);
    const i2 = r2.length;
    Pt(r2, n2 = Mt(i2, n2));
    const s2 = t2, a2 = Bt(s2);
    let { s0: o2, s1: c2, s2: u2, s3: h2 } = cr(e2, a2[0], a2[1], a2[2], a2[3]);
    const f2 = Bt(r2), l2 = Bt(n2);
    for (let t3 = 0; t3 + 4 <= f2.length; t3 += 4) {
      l2[t3 + 0] = f2[t3 + 0] ^ o2, l2[t3 + 1] = f2[t3 + 1] ^ c2, l2[t3 + 2] = f2[t3 + 2] ^ u2, l2[t3 + 3] = f2[t3 + 3] ^ h2;
      let r3 = 1;
      for (let e3 = s2.length - 1; e3 >= 0; e3--) r3 = r3 + (255 & s2[e3]) | 0, s2[e3] = 255 & r3, r3 >>>= 8;
      ({ s0: o2, s1: c2, s2: u2, s3: h2 } = cr(e2, a2[0], a2[1], a2[2], a2[3]));
    }
    const y2 = qt * Math.floor(f2.length / 4);
    if (y2 < i2) {
      const e3 = new Uint32Array([o2, c2, u2, h2]), t3 = It(e3);
      for (let e4 = y2, s3 = 0; e4 < i2; e4++, s3++) n2[e4] = r2[e4] ^ t3[s3];
      St(e3);
    }
    return n2;
  }
  function fr(e2, t2, r2, n2, i2) {
    kt(r2, qt), kt(n2), i2 = Mt(n2.length, i2);
    const s2 = r2, a2 = Bt(s2), o2 = Kt(s2), c2 = Bt(n2), u2 = Bt(i2), h2 = t2 ? 0 : 12, f2 = n2.length;
    let l2 = o2.getUint32(h2, t2), { s0: y2, s1: g2, s2: p2, s3: d2 } = cr(e2, a2[0], a2[1], a2[2], a2[3]);
    for (let r3 = 0; r3 + 4 <= c2.length; r3 += 4) u2[r3 + 0] = c2[r3 + 0] ^ y2, u2[r3 + 1] = c2[r3 + 1] ^ g2, u2[r3 + 2] = c2[r3 + 2] ^ p2, u2[r3 + 3] = c2[r3 + 3] ^ d2, l2 = l2 + 1 >>> 0, o2.setUint32(h2, l2, t2), { s0: y2, s1: g2, s2: p2, s3: d2 } = cr(e2, a2[0], a2[1], a2[2], a2[3]);
    const A2 = qt * Math.floor(c2.length / 4);
    if (A2 < f2) {
      const e3 = new Uint32Array([y2, g2, p2, d2]), t3 = It(e3);
      for (let e4 = A2, r3 = 0; e4 < f2; e4++, r3++) i2[e4] = n2[e4] ^ t3[r3];
      St(e3);
    }
    return i2;
  }
  var lr = /* @__PURE__ */ Qt({ blockSize: 16, nonceLength: 16 }, (function(e2, t2) {
    function r2(r3, n2) {
      if (kt(r3), void 0 !== n2 && (kt(n2), !Ft(n2))) throw Error("unaligned destination");
      const i2 = ir(e2), s2 = Tt(t2), a2 = [i2, s2];
      Ft(r3) || a2.push(r3 = Tt(r3));
      const o2 = hr(i2, s2, r3, n2);
      return St(...a2), o2;
    }
    return { encrypt: (e3, t3) => r2(e3, t3), decrypt: (e3, t3) => r2(e3, t3) };
  }));
  var yr = /* @__PURE__ */ Qt({ blockSize: 16, nonceLength: 16 }, (function(e2, t2, r2 = {}) {
    const n2 = !r2.disablePadding;
    return { encrypt(r3, i2) {
      const s2 = ir(e2), { b: a2, o: o2, out: c2 } = (function(e3, t3, r4) {
        kt(e3);
        let n3 = e3.length;
        const i3 = n3 % qt;
        if (!t3 && 0 !== i3) throw Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");
        Ft(e3) || (e3 = Tt(e3));
        const s3 = Bt(e3);
        if (t3) {
          let e4 = qt - i3;
          e4 || (e4 = qt), n3 += e4;
        }
        return Pt(e3, r4 = Mt(n3, r4)), { b: s3, o: Bt(r4), out: r4 };
      })(r3, n2, i2);
      let u2 = t2;
      const h2 = [s2];
      Ft(u2) || h2.push(u2 = Tt(u2));
      const f2 = Bt(u2);
      let l2 = f2[0], y2 = f2[1], g2 = f2[2], p2 = f2[3], d2 = 0;
      for (; d2 + 4 <= a2.length; ) l2 ^= a2[d2 + 0], y2 ^= a2[d2 + 1], g2 ^= a2[d2 + 2], p2 ^= a2[d2 + 3], { s0: l2, s1: y2, s2: g2, s3: p2 } = cr(s2, l2, y2, g2, p2), o2[d2++] = l2, o2[d2++] = y2, o2[d2++] = g2, o2[d2++] = p2;
      if (n2) {
        const e3 = (function(e4) {
          const t3 = new Uint8Array(16), r4 = Bt(t3);
          t3.set(e4);
          const n3 = qt - e4.length;
          for (let e5 = qt - n3; e5 < qt; e5++) t3[e5] = n3;
          return r4;
        })(r3.subarray(4 * d2));
        l2 ^= e3[0], y2 ^= e3[1], g2 ^= e3[2], p2 ^= e3[3], { s0: l2, s1: y2, s2: g2, s3: p2 } = cr(s2, l2, y2, g2, p2), o2[d2++] = l2, o2[d2++] = y2, o2[d2++] = g2, o2[d2++] = p2;
      }
      return St(...h2), c2;
    }, decrypt(r3, i2) {
      !(function(e3) {
        if (kt(e3), e3.length % qt != 0) throw Error("aes-(cbc/ecb).decrypt ciphertext should consist of blocks with size 16");
      })(r3);
      const s2 = sr(e2);
      let a2 = t2;
      const o2 = [s2];
      Ft(a2) || o2.push(a2 = Tt(a2));
      const c2 = Bt(a2);
      i2 = Mt(r3.length, i2), Ft(r3) || o2.push(r3 = Tt(r3)), Pt(r3, i2);
      const u2 = Bt(r3), h2 = Bt(i2);
      let f2 = c2[0], l2 = c2[1], y2 = c2[2], g2 = c2[3];
      for (let e3 = 0; e3 + 4 <= u2.length; ) {
        const t3 = f2, r4 = l2, n3 = y2, i3 = g2;
        f2 = u2[e3 + 0], l2 = u2[e3 + 1], y2 = u2[e3 + 2], g2 = u2[e3 + 3];
        const { s0: a3, s1: o3, s2: c3, s3: p2 } = ur(s2, f2, l2, y2, g2);
        h2[e3++] = a3 ^ t3, h2[e3++] = o3 ^ r4, h2[e3++] = c3 ^ n3, h2[e3++] = p2 ^ i3;
      }
      return St(...o2), (function(e3, t3) {
        if (!t3) return e3;
        const r4 = e3.length;
        if (!r4) throw Error("aes/pcks5: empty ciphertext not allowed");
        const n3 = e3[r4 - 1];
        if (n3 <= 0 || n3 > 16) throw Error("aes/pcks5: wrong padding");
        const i3 = e3.subarray(0, -n3);
        for (let t4 = 0; t4 < n3; t4++) if (e3[r4 - t4 - 1] !== n3) throw Error("aes/pcks5: wrong padding");
        return i3;
      })(i2, n2);
    } };
  }));
  var gr = /* @__PURE__ */ Qt({ blockSize: 16, nonceLength: 16 }, (function(e2, t2) {
    function r2(r3, n2, i2) {
      kt(r3);
      const s2 = r3.length;
      if (Ut(r3, i2 = Mt(s2, i2))) throw Error("overlapping src and dst not supported.");
      const a2 = ir(e2);
      let o2 = t2;
      const c2 = [a2];
      Ft(o2) || c2.push(o2 = Tt(o2)), Ft(r3) || c2.push(r3 = Tt(r3));
      const u2 = Bt(r3), h2 = Bt(i2), f2 = n2 ? h2 : u2, l2 = Bt(o2);
      let y2 = l2[0], g2 = l2[1], p2 = l2[2], d2 = l2[3];
      for (let e3 = 0; e3 + 4 <= u2.length; ) {
        const { s0: t3, s1: r4, s2: n3, s3: i3 } = cr(a2, y2, g2, p2, d2);
        h2[e3 + 0] = u2[e3 + 0] ^ t3, h2[e3 + 1] = u2[e3 + 1] ^ r4, h2[e3 + 2] = u2[e3 + 2] ^ n3, h2[e3 + 3] = u2[e3 + 3] ^ i3, y2 = f2[e3++], g2 = f2[e3++], p2 = f2[e3++], d2 = f2[e3++];
      }
      const A2 = qt * Math.floor(u2.length / 4);
      if (A2 < s2) {
        ({ s0: y2, s1: g2, s2: p2, s3: d2 } = cr(a2, y2, g2, p2, d2));
        const e3 = It(new Uint32Array([y2, g2, p2, d2]));
        for (let t3 = A2, n3 = 0; t3 < s2; t3++, n3++) i2[t3] = r3[t3] ^ e3[n3];
        St(e3);
      }
      return St(...c2), i2;
    }
    return { encrypt: (e3, t3) => r2(e3, true, t3), decrypt: (e3, t3) => r2(e3, false, t3) };
  }));
  function pr(e2, t2, r2, n2, i2) {
    const s2 = i2 ? i2.length : 0, a2 = e2.create(r2, n2.length + s2);
    i2 && a2.update(i2);
    const o2 = (function(e3, t3, r3) {
      const n3 = new Uint8Array(16), i3 = Kt(n3);
      return Rt(i3, 0, BigInt(t3), r3), Rt(i3, 8, BigInt(e3), r3), n3;
    })(8 * n2.length, 8 * s2, t2);
    a2.update(n2), a2.update(o2);
    const c2 = a2.digest();
    return St(o2), c2;
  }
  var dr = /* @__PURE__ */ Qt({ blockSize: 16, nonceLength: 12, tagLength: 16, varSizeNonce: true }, (function(e2, t2, r2) {
    if (t2.length < 8) throw Error("aes/gcm: invalid nonce length");
    function n2(e3, t3, n3) {
      const i3 = pr(Vt, false, e3, n3, r2);
      for (let e4 = 0; e4 < t3.length; e4++) i3[e4] ^= t3[e4];
      return i3;
    }
    function i2() {
      const r3 = ir(e2), n3 = _t.slice(), i3 = _t.slice();
      if (fr(r3, false, i3, i3, n3), 12 === t2.length) i3.set(t2);
      else {
        const e3 = _t.slice();
        Rt(Kt(e3), 8, BigInt(8 * t2.length), false);
        const r4 = Vt.create(n3).update(t2).update(e3);
        r4.digestInto(i3), r4.destroy();
      }
      return { xk: r3, authKey: n3, counter: i3, tagMask: fr(r3, false, i3, _t) };
    }
    return { encrypt(e3) {
      const { xk: t3, authKey: r3, counter: s2, tagMask: a2 } = i2(), o2 = new Uint8Array(e3.length + 16), c2 = [t3, r3, s2, a2];
      Ft(e3) || c2.push(e3 = Tt(e3)), fr(t3, false, s2, e3, o2.subarray(0, e3.length));
      const u2 = n2(r3, a2, o2.subarray(0, o2.length - 16));
      return c2.push(u2), o2.set(u2, e3.length), St(...c2), o2;
    }, decrypt(e3) {
      const { xk: t3, authKey: r3, counter: s2, tagMask: a2 } = i2(), o2 = [t3, r3, a2, s2];
      Ft(e3) || o2.push(e3 = Tt(e3));
      const c2 = e3.subarray(0, -16), u2 = e3.subarray(-16), h2 = n2(r3, a2, c2);
      if (o2.push(h2), !xt(h2, u2)) throw Error("aes/gcm: invalid ghash tag");
      const f2 = fr(t3, false, s2, c2);
      return St(...o2), f2;
    } };
  }));
  function Ar(e2) {
    return e2 instanceof Uint32Array || ArrayBuffer.isView(e2) && "Uint32Array" === e2.constructor.name;
  }
  function wr(e2, t2) {
    if (kt(t2, 16), !Ar(e2)) throw Error("_encryptBlock accepts result of expandKeyLE");
    const r2 = Bt(t2);
    let { s0: n2, s1: i2, s2, s3: a2 } = cr(e2, r2[0], r2[1], r2[2], r2[3]);
    return r2[0] = n2, r2[1] = i2, r2[2] = s2, r2[3] = a2, t2;
  }
  function mr(e2, t2) {
    if (kt(t2, 16), !Ar(e2)) throw Error("_decryptBlock accepts result of expandKeyLE");
    const r2 = Bt(t2);
    let { s0: n2, s1: i2, s2, s3: a2 } = ur(e2, r2[0], r2[1], r2[2], r2[3]);
    return r2[0] = n2, r2[1] = i2, r2[2] = s2, r2[3] = a2, t2;
  }
  var br = { encrypt(e2, t2) {
    if (t2.length >= 2 ** 32) throw Error("plaintext should be less than 4gb");
    const r2 = ir(e2);
    if (16 === t2.length) wr(r2, t2);
    else {
      const e3 = Bt(t2);
      let n2 = e3[0], i2 = e3[1];
      for (let t3 = 0, s2 = 1; t3 < 6; t3++) for (let t4 = 2; t4 < e3.length; t4 += 2, s2++) {
        const { s0: a2, s1: o2, s2: c2, s3: u2 } = cr(r2, n2, i2, e3[t4], e3[t4 + 1]);
        n2 = a2, i2 = o2 ^ $t(s2), e3[t4] = c2, e3[t4 + 1] = u2;
      }
      e3[0] = n2, e3[1] = i2;
    }
    r2.fill(0);
  }, decrypt(e2, t2) {
    if (t2.length - 8 >= 2 ** 32) throw Error("ciphertext should be less than 4gb");
    const r2 = sr(e2), n2 = t2.length / 8 - 1;
    if (1 === n2) mr(r2, t2);
    else {
      const e3 = Bt(t2);
      let i2 = e3[0], s2 = e3[1];
      for (let t3 = 0, a2 = 6 * n2; t3 < 6; t3++) for (let t4 = 2 * n2; t4 >= 1; t4 -= 2, a2--) {
        s2 ^= $t(a2);
        const { s0: n3, s1: o2, s2: c2, s3: u2 } = ur(r2, i2, s2, e3[t4], e3[t4 + 1]);
        i2 = n3, s2 = o2, e3[t4] = c2, e3[t4 + 1] = u2;
      }
      e3[0] = i2, e3[1] = s2;
    }
    r2.fill(0);
  } };
  var kr = /* @__PURE__ */ new Uint8Array(8).fill(166);
  var Er = /* @__PURE__ */ Qt({ blockSize: 8 }, ((e2) => ({ encrypt(t2) {
    if (!t2.length || t2.length % 8 != 0) throw Error("invalid plaintext length");
    if (8 === t2.length) throw Error("8-byte keys not allowed in AESKW, use AESKWP instead");
    const r2 = (function(...e3) {
      let t3 = 0;
      for (let r4 = 0; r4 < e3.length; r4++) {
        const n2 = e3[r4];
        kt(n2), t3 += n2.length;
      }
      const r3 = new Uint8Array(t3);
      for (let t4 = 0, n2 = 0; t4 < e3.length; t4++) {
        const i2 = e3[t4];
        r3.set(i2, n2), n2 += i2.length;
      }
      return r3;
    })(kr, t2);
    return br.encrypt(e2, r2), r2;
  }, decrypt(t2) {
    if (t2.length % 8 != 0 || t2.length < 24) throw Error("invalid ciphertext length");
    const r2 = Tt(t2);
    if (br.decrypt(e2, r2), !xt(r2.subarray(0, 8), kr)) throw Error("integrity check failed");
    return r2.subarray(0, 8).fill(0), r2.subarray(8);
  } })));
  var vr = { expandKeyLE: ir, expandKeyDecLE: sr, encrypt: cr, decrypt: ur, encryptBlock: wr, decryptBlock: mr, ctrCounter: hr, ctr32: fr };
  async function Ir(e2) {
    switch (e2) {
      case R.symmetric.aes128:
      case R.symmetric.aes192:
      case R.symmetric.aes256:
        throw Error("Not a legacy cipher");
      case R.symmetric.cast5:
      case R.symmetric.blowfish:
      case R.symmetric.twofish:
      case R.symmetric.tripledes: {
        const { legacyCiphers: t2 } = await Promise.resolve().then((function() {
          return wy;
        })), r2 = R.read(R.symmetric, e2), n2 = t2.get(r2);
        if (!n2) throw Error("Unsupported cipher algorithm");
        return n2;
      }
      default:
        throw Error("Unsupported cipher algorithm");
    }
  }
  function Br(e2) {
    switch (e2) {
      case R.symmetric.aes128:
      case R.symmetric.aes192:
      case R.symmetric.aes256:
      case R.symmetric.twofish:
        return 16;
      case R.symmetric.blowfish:
      case R.symmetric.cast5:
      case R.symmetric.tripledes:
        return 8;
      default:
        throw Error("Unsupported cipher");
    }
  }
  function Sr(e2) {
    switch (e2) {
      case R.symmetric.aes128:
      case R.symmetric.blowfish:
      case R.symmetric.cast5:
        return 16;
      case R.symmetric.aes192:
      case R.symmetric.tripledes:
        return 24;
      case R.symmetric.aes256:
      case R.symmetric.twofish:
        return 32;
      default:
        throw Error("Unsupported cipher");
    }
  }
  function Kr(e2) {
    return { keySize: Sr(e2), blockSize: Br(e2) };
  }
  var Cr = N.getWebCrypto();
  async function Dr(e2, t2, r2) {
    const { keySize: n2 } = Kr(e2);
    if (!N.isAES(e2) || t2.length !== n2) throw Error("Unexpected algorithm or key size");
    try {
      const e3 = await Cr.importKey("raw", t2, { name: "AES-KW" }, false, ["wrapKey"]), n3 = await Cr.importKey("raw", r2, { name: "HMAC", hash: "SHA-256" }, true, ["sign"]), i2 = await Cr.wrapKey("raw", n3, e3, { name: "AES-KW" });
      return new Uint8Array(i2);
    } catch (e3) {
      if ("NotSupportedError" !== e3.name && (24 !== t2.length || "OperationError" !== e3.name)) throw e3;
      N.printDebugError("Browser did not support operation: " + e3.message);
    }
    return Er(t2).encrypt(r2);
  }
  async function Ur(e2, t2, r2) {
    const { keySize: n2 } = Kr(e2);
    if (!N.isAES(e2) || t2.length !== n2) throw Error("Unexpected algorithm or key size");
    let i2;
    try {
      i2 = await Cr.importKey("raw", t2, { name: "AES-KW" }, false, ["unwrapKey"]);
    } catch (e3) {
      if ("NotSupportedError" !== e3.name && (24 !== t2.length || "OperationError" !== e3.name)) throw e3;
      return N.printDebugError("Browser did not support operation: " + e3.message), Er(t2).decrypt(r2);
    }
    try {
      const e3 = await Cr.unwrapKey("raw", r2, i2, { name: "AES-KW" }, { name: "HMAC", hash: "SHA-256" }, true, ["sign"]);
      return new Uint8Array(await Cr.exportKey("raw", e3));
    } catch (e3) {
      if ("OperationError" === e3.name) throw Error("Key Data Integrity failed");
      throw e3;
    }
  }
  async function Pr(e2, t2, r2, n2, i2) {
    const s2 = N.getWebCrypto(), a2 = R.read(R.webHash, e2);
    if (!a2) throw Error("Hash algo not supported with HKDF");
    const o2 = await s2.importKey("raw", t2, "HKDF", false, ["deriveBits"]), c2 = await s2.deriveBits({ name: "HKDF", hash: a2, salt: r2, info: n2 }, o2, 8 * i2);
    return new Uint8Array(c2);
  }
  var xr = { x25519: N.encodeUTF8("OpenPGP X25519"), x448: N.encodeUTF8("OpenPGP X448") };
  async function Qr(e2) {
    switch (e2) {
      case R.publicKey.x25519:
        try {
          const e3 = N.getWebCrypto(), t2 = await e3.generateKey("X25519", true, ["deriveKey", "deriveBits"]).catch(((e4) => {
            if ("OperationError" === e4.name) {
              const e5 = Error("Unexpected key generation issue");
              throw e5.name = "NotSupportedError", e5;
            }
            throw e4;
          })), r2 = await e3.exportKey("jwk", t2.privateKey), n2 = await e3.exportKey("jwk", t2.publicKey);
          if (r2.x !== n2.x) {
            const e4 = Error("Unexpected mismatching public point");
            throw e4.name = "NotSupportedError", e4;
          }
          return { A: new Uint8Array(j(n2.x)), k: j(r2.d) };
        } catch (e3) {
          if ("NotSupportedError" !== e3.name) throw e3;
          const { default: t2 } = await Promise.resolve().then((function() {
            return ny;
          })), { secretKey: r2, publicKey: n2 } = t2.box.keyPair();
          return { A: n2, k: r2 };
        }
      case R.publicKey.x448: {
        const e3 = await N.getNobleCurve(R.publicKey.x448), { secretKey: t2, publicKey: r2 } = e3.keygen();
        return { A: r2, k: t2 };
      }
      default:
        throw Error("Unsupported ECDH algorithm");
    }
  }
  async function Mr(e2, t2, r2) {
    switch (e2) {
      case R.publicKey.x25519:
        try {
          const { ephemeralPublicKey: n2, sharedSecret: i2 } = await Nr(e2, t2), s2 = await Lr(e2, n2, t2, r2);
          return N.equalsUint8Array(i2, s2);
        } catch {
          return false;
        }
      case R.publicKey.x448: {
        const e3 = (await N.getNobleCurve(R.publicKey.x448)).getPublicKey(r2);
        return N.equalsUint8Array(t2, e3);
      }
      default:
        return false;
    }
  }
  async function Rr(e2, t2, r2) {
    const { ephemeralPublicKey: n2, sharedSecret: i2 } = await Nr(e2, r2), s2 = N.concatUint8Array([n2, r2, i2]);
    switch (e2) {
      case R.publicKey.x25519: {
        const e3 = R.symmetric.aes128, { keySize: r3 } = Kr(e3), i3 = await Pr(R.hash.sha256, s2, new Uint8Array(), xr.x25519, r3);
        return { ephemeralPublicKey: n2, wrappedKey: await Dr(e3, i3, t2) };
      }
      case R.publicKey.x448: {
        const e3 = R.symmetric.aes256, { keySize: r3 } = Kr(R.symmetric.aes256), i3 = await Pr(R.hash.sha512, s2, new Uint8Array(), xr.x448, r3);
        return { ephemeralPublicKey: n2, wrappedKey: await Dr(e3, i3, t2) };
      }
      default:
        throw Error("Unsupported ECDH algorithm");
    }
  }
  async function Fr(e2, t2, r2, n2, i2) {
    const s2 = await Lr(e2, t2, n2, i2), a2 = N.concatUint8Array([t2, n2, s2]);
    switch (e2) {
      case R.publicKey.x25519: {
        const e3 = R.symmetric.aes128, { keySize: t3 } = Kr(e3);
        return Ur(e3, await Pr(R.hash.sha256, a2, new Uint8Array(), xr.x25519, t3), r2);
      }
      case R.publicKey.x448: {
        const e3 = R.symmetric.aes256, { keySize: t3 } = Kr(R.symmetric.aes256);
        return Ur(e3, await Pr(R.hash.sha512, a2, new Uint8Array(), xr.x448, t3), r2);
      }
      default:
        throw Error("Unsupported ECDH algorithm");
    }
  }
  function Tr(e2) {
    switch (e2) {
      case R.publicKey.x25519:
        return 32;
      case R.publicKey.x448:
        return 56;
      default:
        throw Error("Unsupported ECDH algorithm");
    }
  }
  async function Nr(e2, t2) {
    switch (e2) {
      case R.publicKey.x25519:
        try {
          const r2 = N.getWebCrypto(), n2 = await r2.generateKey("X25519", true, ["deriveKey", "deriveBits"]).catch(((e3) => {
            if ("OperationError" === e3.name) {
              const e4 = Error("Unexpected key generation issue");
              throw e4.name = "NotSupportedError", e4;
            }
            throw e3;
          })), i2 = await r2.exportKey("jwk", n2.publicKey);
          if ((await r2.exportKey("jwk", n2.privateKey)).x !== i2.x) {
            const e3 = Error("Unexpected mismatching public point");
            throw e3.name = "NotSupportedError", e3;
          }
          const s2 = Hr(e2, t2), a2 = await r2.importKey("jwk", s2, "X25519", false, []), o2 = await r2.deriveBits({ name: "X25519", public: a2 }, n2.privateKey, 8 * Tr(e2));
          return { sharedSecret: new Uint8Array(o2), ephemeralPublicKey: new Uint8Array(j(i2.x)) };
        } catch (e3) {
          if ("NotSupportedError" !== e3.name) throw e3;
          const { default: r2 } = await Promise.resolve().then((function() {
            return ny;
          })), { secretKey: n2, publicKey: i2 } = r2.box.keyPair(), s2 = r2.scalarMult(n2, t2);
          return Or(s2), { ephemeralPublicKey: i2, sharedSecret: s2 };
        }
      case R.publicKey.x448: {
        const e3 = await N.getNobleCurve(R.publicKey.x448), { secretKey: r2, publicKey: n2 } = e3.keygen(), i2 = e3.getSharedSecret(r2, t2);
        return Or(i2), { ephemeralPublicKey: n2, sharedSecret: i2 };
      }
      default:
        throw Error("Unsupported ECDH algorithm");
    }
  }
  async function Lr(e2, t2, r2, n2) {
    switch (e2) {
      case R.publicKey.x25519:
        try {
          const i2 = N.getWebCrypto(), s2 = (function(e3, t3, r3) {
            if (e3 === R.publicKey.x25519) {
              const n3 = Hr(e3, t3);
              return n3.d = V(r3), n3;
            }
            throw Error("Unsupported ECDH algorithm");
          })(e2, r2, n2), a2 = Hr(e2, t2), o2 = await i2.importKey("jwk", s2, "X25519", false, ["deriveKey", "deriveBits"]), c2 = await i2.importKey("jwk", a2, "X25519", false, []), u2 = await i2.deriveBits({ name: "X25519", public: c2 }, o2, 8 * Tr(e2));
          return new Uint8Array(u2);
        } catch (e3) {
          if ("NotSupportedError" !== e3.name) throw e3;
          const { default: r3 } = await Promise.resolve().then((function() {
            return ny;
          })), i2 = r3.scalarMult(n2, t2);
          return Or(i2), i2;
        }
      case R.publicKey.x448: {
        const e3 = (await N.getNobleCurve(R.publicKey.x448)).getSharedSecret(n2, t2);
        return Or(e3), e3;
      }
      default:
        throw Error("Unsupported ECDH algorithm");
    }
  }
  function Or(e2) {
    let t2 = 0;
    for (let r2 = 0; r2 < e2.length; r2++) t2 |= e2[r2];
    if (0 === t2) throw Error("Unexpected low order point");
  }
  function Hr(e2, t2) {
    if (e2 === R.publicKey.x25519) {
      return { kty: "OKP", crv: "X25519", x: V(t2), ext: true };
    }
    throw Error("Unsupported ECDH algorithm");
  }
  var zr = /* @__PURE__ */ Object.freeze({ __proto__: null, decrypt: Fr, encrypt: Rr, generate: Qr, generateEphemeralEncryptionMaterial: Nr, getPayloadSize: Tr, recomputeSharedSecret: Lr, validateParams: Mr });
  var Gr = N.getWebCrypto();
  var jr = N.getNodeCrypto();
  var Vr = { [R.curve.nistP256]: "P-256", [R.curve.nistP384]: "P-384", [R.curve.nistP521]: "P-521" };
  var qr = jr ? jr.getCurves() : [];
  var _r = jr ? { [R.curve.secp256k1]: qr.includes("secp256k1") ? "secp256k1" : void 0, [R.curve.nistP256]: qr.includes("prime256v1") ? "prime256v1" : void 0, [R.curve.nistP384]: qr.includes("secp384r1") ? "secp384r1" : void 0, [R.curve.nistP521]: qr.includes("secp521r1") ? "secp521r1" : void 0, [R.curve.ed25519Legacy]: qr.includes("ED25519") ? "ED25519" : void 0, [R.curve.curve25519Legacy]: qr.includes("X25519") ? "X25519" : void 0, [R.curve.brainpoolP256r1]: qr.includes("brainpoolP256r1") ? "brainpoolP256r1" : void 0, [R.curve.brainpoolP384r1]: qr.includes("brainpoolP384r1") ? "brainpoolP384r1" : void 0, [R.curve.brainpoolP512r1]: qr.includes("brainpoolP512r1") ? "brainpoolP512r1" : void 0 } : {};
  var Yr = { [R.curve.nistP256]: { oid: [6, 8, 42, 134, 72, 206, 61, 3, 1, 7], keyType: R.publicKey.ecdsa, hash: R.hash.sha256, cipher: R.symmetric.aes128, node: _r[R.curve.nistP256], web: Vr[R.curve.nistP256], payloadSize: 32, sharedSize: 256, wireFormatLeadingByte: 4 }, [R.curve.nistP384]: { oid: [6, 5, 43, 129, 4, 0, 34], keyType: R.publicKey.ecdsa, hash: R.hash.sha384, cipher: R.symmetric.aes192, node: _r[R.curve.nistP384], web: Vr[R.curve.nistP384], payloadSize: 48, sharedSize: 384, wireFormatLeadingByte: 4 }, [R.curve.nistP521]: { oid: [6, 5, 43, 129, 4, 0, 35], keyType: R.publicKey.ecdsa, hash: R.hash.sha512, cipher: R.symmetric.aes256, node: _r[R.curve.nistP521], web: Vr[R.curve.nistP521], payloadSize: 66, sharedSize: 528, wireFormatLeadingByte: 4 }, [R.curve.secp256k1]: { oid: [6, 5, 43, 129, 4, 0, 10], keyType: R.publicKey.ecdsa, hash: R.hash.sha256, cipher: R.symmetric.aes128, node: _r[R.curve.secp256k1], payloadSize: 32, wireFormatLeadingByte: 4 }, [R.curve.ed25519Legacy]: { oid: [6, 9, 43, 6, 1, 4, 1, 218, 71, 15, 1], keyType: R.publicKey.eddsaLegacy, hash: R.hash.sha512, node: false, payloadSize: 32, wireFormatLeadingByte: 64 }, [R.curve.curve25519Legacy]: { oid: [6, 10, 43, 6, 1, 4, 1, 151, 85, 1, 5, 1], keyType: R.publicKey.ecdh, hash: R.hash.sha256, cipher: R.symmetric.aes128, node: false, payloadSize: 32, wireFormatLeadingByte: 64 }, [R.curve.brainpoolP256r1]: { oid: [6, 9, 43, 36, 3, 3, 2, 8, 1, 1, 7], keyType: R.publicKey.ecdsa, hash: R.hash.sha256, cipher: R.symmetric.aes128, node: _r[R.curve.brainpoolP256r1], payloadSize: 32, wireFormatLeadingByte: 4 }, [R.curve.brainpoolP384r1]: { oid: [6, 9, 43, 36, 3, 3, 2, 8, 1, 1, 11], keyType: R.publicKey.ecdsa, hash: R.hash.sha384, cipher: R.symmetric.aes192, node: _r[R.curve.brainpoolP384r1], payloadSize: 48, wireFormatLeadingByte: 4 }, [R.curve.brainpoolP512r1]: { oid: [6, 9, 43, 36, 3, 3, 2, 8, 1, 1, 13], keyType: R.publicKey.ecdsa, hash: R.hash.sha512, cipher: R.symmetric.aes256, node: _r[R.curve.brainpoolP512r1], payloadSize: 64, wireFormatLeadingByte: 4 } };
  var Zr = class {
    constructor(e2) {
      try {
        this.name = e2 instanceof $e ? e2.getName() : R.write(R.curve, e2);
      } catch {
        throw new ot("Unknown curve");
      }
      const t2 = Yr[this.name];
      this.keyType = t2.keyType, this.oid = t2.oid, this.hash = t2.hash, this.cipher = t2.cipher, this.node = t2.node, this.web = t2.web, this.payloadSize = t2.payloadSize, this.sharedSize = t2.sharedSize, this.wireFormatLeadingByte = t2.wireFormatLeadingByte, this.web && N.getWebCrypto() ? this.type = "web" : this.node && N.getNodeCrypto() ? this.type = "node" : this.name === R.curve.curve25519Legacy ? this.type = "curve25519Legacy" : this.name === R.curve.ed25519Legacy && (this.type = "ed25519Legacy");
    }
    async genKeyPair() {
      switch (this.type) {
        case "web":
          try {
            return await (async function(e2, t2) {
              const r2 = await Gr.generateKey({ name: "ECDSA", namedCurve: Vr[e2] }, true, ["sign", "verify"]), n2 = await Gr.exportKey("jwk", r2.privateKey);
              return { publicKey: tn(await Gr.exportKey("jwk", r2.publicKey), t2), privateKey: j(n2.d) };
            })(this.name, this.wireFormatLeadingByte);
          } catch (e2) {
            return N.printDebugError("Browser did not support generating ec key " + e2.message), en(this.name);
          }
        case "node":
          return (function(e2) {
            const t2 = jr.createECDH(_r[e2]);
            return t2.generateKeys(), { publicKey: new Uint8Array(t2.getPublicKey()), privateKey: new Uint8Array(t2.getPrivateKey()) };
          })(this.name);
        case "curve25519Legacy": {
          const { k: e2, A: t2 } = await Qr(R.publicKey.x25519), r2 = e2.slice().reverse();
          r2[0] = 127 & r2[0] | 64, r2[31] &= 248;
          return { publicKey: N.concatUint8Array([new Uint8Array([this.wireFormatLeadingByte]), t2]), privateKey: r2 };
        }
        case "ed25519Legacy": {
          const { seed: e2, A: t2 } = await ft(R.publicKey.ed25519);
          return { publicKey: N.concatUint8Array([new Uint8Array([this.wireFormatLeadingByte]), t2]), privateKey: e2 };
        }
        default:
          return en(this.name);
      }
    }
  };
  async function Jr(e2) {
    const t2 = new Zr(e2), { oid: r2, hash: n2, cipher: i2 } = t2, s2 = await t2.genKeyPair();
    return { oid: r2, Q: s2.publicKey, secret: N.leftPad(s2.privateKey, t2.payloadSize), hash: n2, cipher: i2 };
  }
  function Wr(e2) {
    return Yr[e2.getName()].hash;
  }
  async function Xr(e2, t2, r2, n2) {
    const i2 = { [R.curve.nistP256]: true, [R.curve.nistP384]: true, [R.curve.nistP521]: true, [R.curve.secp256k1]: true, [R.curve.curve25519Legacy]: e2 === R.publicKey.ecdh, [R.curve.brainpoolP256r1]: true, [R.curve.brainpoolP384r1]: true, [R.curve.brainpoolP512r1]: true }, s2 = t2.getName();
    if (!i2[s2]) return false;
    if (s2 === R.curve.curve25519Legacy) {
      const e3 = n2.slice().reverse();
      return !(r2.length < 1 || 64 !== r2[0]) && Mr(R.publicKey.x25519, r2.subarray(1), e3);
    }
    const a2 = (await N.getNobleCurve(R.publicKey.ecdsa, s2)).getPublicKey(n2, false);
    return !!N.equalsUint8Array(a2, r2);
  }
  function $r(e2, t2) {
    const { payloadSize: r2, wireFormatLeadingByte: n2, name: i2 } = e2, s2 = i2 === R.curve.curve25519Legacy || i2 === R.curve.ed25519Legacy ? r2 : 2 * r2;
    if (t2[0] !== n2 || t2.length !== s2 + 1) throw Error("Invalid point encoding");
  }
  async function en(e2) {
    const t2 = await N.getNobleCurve(R.publicKey.ecdsa, e2), { secretKey: r2 } = t2.keygen();
    return { publicKey: t2.getPublicKey(r2, false), privateKey: r2 };
  }
  function tn(e2, t2) {
    const r2 = j(e2.x), n2 = j(e2.y), i2 = new Uint8Array(r2.length + n2.length + 1);
    return i2[0] = t2, i2.set(r2, 1), i2.set(n2, r2.length + 1), i2;
  }
  function rn(e2, t2, r2) {
    const n2 = e2, i2 = r2.slice(1, n2 + 1), s2 = r2.slice(n2 + 1, 2 * n2 + 1);
    return { kty: "EC", crv: t2, x: V(i2), y: V(s2), ext: true };
  }
  function nn(e2, t2, r2, n2) {
    const i2 = rn(e2, t2, r2);
    return i2.d = V(n2), i2;
  }
  var sn = N.getWebCrypto();
  var an = N.getNodeCrypto();
  async function on(e2, t2, r2, n2, i2, s2) {
    const a2 = new Zr(e2);
    if ($r(a2, n2), r2 && !N.isStream(r2)) {
      const e3 = { publicKey: n2, privateKey: i2 };
      switch (a2.type) {
        case "web":
          try {
            return await (async function(e4, t3, r3, n3) {
              const i3 = e4.payloadSize, s3 = nn(e4.payloadSize, Vr[e4.name], n3.publicKey, n3.privateKey), a3 = await sn.importKey("jwk", s3, { name: "ECDSA", namedCurve: Vr[e4.name], hash: { name: R.read(R.webHash, e4.hash) } }, false, ["sign"]), o3 = new Uint8Array(await sn.sign({ name: "ECDSA", namedCurve: Vr[e4.name], hash: { name: R.read(R.webHash, t3) } }, a3, r3));
              return { r: o3.slice(0, i3), s: o3.slice(i3, i3 << 1) };
            })(a2, t2, r2, e3);
          } catch (e4) {
            if ("nistP521" !== a2.name && ("DataError" === e4.name || "OperationError" === e4.name)) throw e4;
            N.printDebugError("Browser did not support signing: " + e4.message);
          }
          break;
        case "node":
          return (function(e4, t3, r3, n3) {
            const i3 = N.nodeRequire("eckey-utils"), s3 = N.getNodeBuffer(), { privateKey: a3 } = i3.generateDer({ curveName: _r[e4.name], privateKey: s3.from(n3) }), o3 = an.createSign(R.read(R.hash, t3));
            o3.write(r3), o3.end();
            const c2 = new Uint8Array(o3.sign({ key: a3, format: "der", type: "sec1", dsaEncoding: "ieee-p1363" })), u2 = e4.payloadSize;
            return { r: c2.subarray(0, u2), s: c2.subarray(u2, u2 << 1) };
          })(a2, t2, r2, i2);
      }
    }
    const o2 = (await N.getNobleCurve(R.publicKey.ecdsa, a2.name)).sign(s2, i2, { lowS: false });
    return { r: ye(o2.r, "be", a2.payloadSize), s: ye(o2.s, "be", a2.payloadSize) };
  }
  async function cn(e2, t2, r2, n2, i2, s2) {
    const a2 = new Zr(e2);
    $r(a2, i2);
    const o2 = async () => 0 === s2[0] && un(a2, r2, s2.subarray(1), i2);
    if (n2 && !N.isStream(n2)) switch (a2.type) {
      case "web":
        try {
          const e3 = await (async function(e4, t3, { r: r3, s: n3 }, i3, s3) {
            const a3 = rn(e4.payloadSize, Vr[e4.name], s3), o3 = await sn.importKey("jwk", a3, { name: "ECDSA", namedCurve: Vr[e4.name], hash: { name: R.read(R.webHash, e4.hash) } }, false, ["verify"]), c2 = N.concatUint8Array([r3, n3]).buffer;
            return sn.verify({ name: "ECDSA", namedCurve: Vr[e4.name], hash: { name: R.read(R.webHash, t3) } }, o3, c2, i3);
          })(a2, t2, r2, n2, i2);
          return e3 || o2();
        } catch (e3) {
          if ("nistP521" !== a2.name && ("DataError" === e3.name || "OperationError" === e3.name)) throw e3;
          N.printDebugError("Browser did not support verifying: " + e3.message);
        }
        break;
      case "node": {
        const e3 = (function(e4, t3, { r: r3, s: n3 }, i3, s3) {
          const a3 = N.nodeRequire("eckey-utils"), o3 = N.getNodeBuffer(), { publicKey: c2 } = a3.generateDer({ curveName: _r[e4.name], publicKey: o3.from(s3) }), u2 = an.createVerify(R.read(R.hash, t3));
          u2.write(i3), u2.end();
          const h2 = N.concatUint8Array([r3, n3]);
          try {
            return u2.verify({ key: c2, format: "der", type: "spki", dsaEncoding: "ieee-p1363" }, h2);
          } catch {
            return false;
          }
        })(a2, t2, r2, n2, i2);
        return e3 || o2();
      }
    }
    return await un(a2, r2, s2, i2) || o2();
  }
  async function un(e2, t2, r2, n2) {
    return (await N.getNobleCurve(R.publicKey.ecdsa, e2.name)).verify(N.concatUint8Array([t2.r, t2.s]), r2, n2, { lowS: false });
  }
  var hn = /* @__PURE__ */ Object.freeze({ __proto__: null, sign: on, validateParams: async function(e2, t2, r2) {
    const n2 = new Zr(e2);
    if (n2.keyType !== R.publicKey.ecdsa) return false;
    switch (n2.type) {
      case "web":
      case "node": {
        const n3 = pe(8), i2 = R.hash.sha256, s2 = await Re(i2, n3);
        try {
          const a2 = await on(e2, i2, n3, t2, r2, s2);
          return await cn(e2, i2, a2, n3, t2, s2);
        } catch {
          return false;
        }
      }
      default:
        return Xr(R.publicKey.ecdsa, e2, t2, r2);
    }
  }, verify: cn });
  async function fn(e2, t2, r2, n2, i2, s2) {
    if ($r(new Zr(e2), n2), Fe(t2) < Fe(R.hash.sha256)) throw Error("Hash algorithm too weak for EdDSA.");
    const { RS: a2 } = await lt(R.publicKey.ed25519, t2, 0, n2.subarray(1), i2, s2);
    return { r: a2.subarray(0, 32), s: a2.subarray(32) };
  }
  async function ln(e2, t2, { r: r2, s: n2 }, i2, s2, a2) {
    if ($r(new Zr(e2), s2), Fe(t2) < Fe(R.hash.sha256)) throw Error("Hash algorithm too weak for EdDSA.");
    const o2 = N.concatUint8Array([r2, n2]);
    return yt(R.publicKey.ed25519, t2, { RS: o2 }, 0, s2.subarray(1), a2);
  }
  async function yn(e2, t2, r2) {
    return e2.getName() === R.curve.ed25519Legacy && (!(t2.length < 1 || 64 !== t2[0]) && gt(R.publicKey.ed25519, t2.subarray(1), r2));
  }
  var gn = /* @__PURE__ */ Object.freeze({ __proto__: null, sign: fn, validateParams: yn, verify: ln });
  function pn(e2) {
    const t2 = e2.length;
    if (t2 > 0) {
      const r2 = e2[t2 - 1];
      if (r2 >= 1) {
        const n2 = e2.subarray(t2 - r2), i2 = new Uint8Array(r2).fill(r2);
        if (N.equalsUint8Array(n2, i2)) return e2.subarray(0, t2 - r2);
      }
    }
    throw Error("Invalid padding");
  }
  function dn(e2, t2, r2, n2) {
    return N.concatUint8Array([t2.write(), new Uint8Array([e2]), r2.write(), N.stringToUint8Array("Anonymous Sender    "), n2]);
  }
  async function An(e2, t2, r2, n2, i2 = false, s2 = false) {
    let a2;
    if (i2) {
      for (a2 = 0; a2 < t2.length && 0 === t2[a2]; a2++) ;
      t2 = t2.subarray(a2);
    }
    if (s2) {
      for (a2 = t2.length - 1; a2 >= 0 && 0 === t2[a2]; a2--) ;
      t2 = t2.subarray(0, a2 + 1);
    }
    return (await Re(e2, N.concatUint8Array([new Uint8Array([0, 0, 0, 1]), t2, n2]))).subarray(0, r2);
  }
  async function wn(e2, t2) {
    switch (e2.type) {
      case "curve25519Legacy": {
        const { sharedSecret: r2, ephemeralPublicKey: n2 } = await Nr(R.publicKey.x25519, t2.subarray(1));
        return { publicKey: N.concatUint8Array([new Uint8Array([e2.wireFormatLeadingByte]), n2]), sharedKey: r2 };
      }
      case "web":
        if (e2.web && N.getWebCrypto()) try {
          return await (async function(e3, t3) {
            const r2 = N.getWebCrypto(), n2 = rn(e3.payloadSize, e3.web, t3);
            let i2 = r2.generateKey({ name: "ECDH", namedCurve: e3.web }, true, ["deriveKey", "deriveBits"]), s2 = r2.importKey("jwk", n2, { name: "ECDH", namedCurve: e3.web }, false, []);
            [i2, s2] = await Promise.all([i2, s2]);
            let a2 = r2.deriveBits({ name: "ECDH", namedCurve: e3.web, public: s2 }, i2.privateKey, e3.sharedSize), o2 = r2.exportKey("jwk", i2.publicKey);
            [a2, o2] = await Promise.all([a2, o2]);
            const c2 = new Uint8Array(a2), u2 = new Uint8Array(tn(o2, e3.wireFormatLeadingByte));
            return { publicKey: u2, sharedKey: c2 };
          })(e2, t2);
        } catch (r2) {
          return N.printDebugError(r2), vn(e2, t2);
        }
        break;
      case "node":
        return (function(e3, t3) {
          const r2 = N.getNodeCrypto(), n2 = r2.createECDH(e3.node);
          n2.generateKeys();
          const i2 = new Uint8Array(n2.computeSecret(t3));
          return { publicKey: new Uint8Array(n2.getPublicKey()), sharedKey: i2 };
        })(e2, t2);
      default:
        return vn(e2, t2);
    }
  }
  async function mn(e2, t2, r2, n2, i2) {
    const s2 = (function(e3) {
      const t3 = 8 - e3.length % 8, r3 = new Uint8Array(e3.length + t3).fill(t3);
      return r3.set(e3), r3;
    })(r2), a2 = new Zr(e2);
    $r(a2, n2);
    const { publicKey: o2, sharedKey: c2 } = await wn(a2, n2), u2 = dn(R.publicKey.ecdh, e2, t2, i2), { keySize: h2 } = Kr(t2.cipher), f2 = await An(t2.hash, c2, h2, u2);
    return { publicKey: o2, wrappedKey: await Dr(t2.cipher, f2, s2) };
  }
  async function bn(e2, t2, r2, n2) {
    if (n2.length !== e2.payloadSize) {
      const t3 = new Uint8Array(e2.payloadSize);
      t3.set(n2, e2.payloadSize - n2.length), n2 = t3;
    }
    switch (e2.type) {
      case "curve25519Legacy": {
        const e3 = n2.slice().reverse();
        return { secretKey: e3, sharedKey: await Lr(R.publicKey.x25519, t2.subarray(1), r2.subarray(1), e3) };
      }
      case "web":
        if (e2.web && N.getWebCrypto()) try {
          return await (async function(e3, t3, r3, n3) {
            const i2 = N.getWebCrypto(), s2 = nn(e3.payloadSize, e3.web, r3, n3);
            let a2 = i2.importKey("jwk", s2, { name: "ECDH", namedCurve: e3.web }, true, ["deriveKey", "deriveBits"]);
            const o2 = rn(e3.payloadSize, e3.web, t3);
            let c2 = i2.importKey("jwk", o2, { name: "ECDH", namedCurve: e3.web }, true, []);
            [a2, c2] = await Promise.all([a2, c2]);
            let u2 = i2.deriveBits({ name: "ECDH", namedCurve: e3.web, public: c2 }, a2, e3.sharedSize), h2 = i2.exportKey("jwk", a2);
            [u2, h2] = await Promise.all([u2, h2]);
            const f2 = new Uint8Array(u2);
            return { secretKey: j(h2.d), sharedKey: f2 };
          })(e2, t2, r2, n2);
        } catch (r3) {
          return N.printDebugError(r3), En(e2, t2, n2);
        }
        break;
      case "node":
        return (function(e3, t3, r3) {
          const n3 = N.getNodeCrypto(), i2 = n3.createECDH(e3.node);
          i2.setPrivateKey(r3);
          const s2 = new Uint8Array(i2.computeSecret(t3));
          return { secretKey: new Uint8Array(i2.getPrivateKey()), sharedKey: s2 };
        })(e2, t2, n2);
      default:
        return En(e2, t2, n2);
    }
  }
  async function kn(e2, t2, r2, n2, i2, s2, a2) {
    const o2 = new Zr(e2);
    $r(o2, i2), $r(o2, r2);
    const { sharedKey: c2 } = await bn(o2, r2, i2, s2), u2 = dn(R.publicKey.ecdh, e2, t2, a2), { keySize: h2 } = Kr(t2.cipher);
    let f2;
    for (let e3 = 0; e3 < 3; e3++) try {
      const r3 = await An(t2.hash, c2, h2, u2, 1 === e3, 2 === e3);
      return pn(await Ur(t2.cipher, r3, n2));
    } catch (e4) {
      f2 = e4;
    }
    throw f2;
  }
  async function En(e2, t2, r2) {
    return { secretKey: r2, sharedKey: (await N.getNobleCurve(R.publicKey.ecdh, e2.name)).getSharedSecret(r2, t2).subarray(1) };
  }
  async function vn(e2, t2) {
    const r2 = await N.getNobleCurve(R.publicKey.ecdh, e2.name), { publicKey: n2, privateKey: i2 } = await e2.genKeyPair();
    return { publicKey: n2, sharedKey: r2.getSharedSecret(i2, t2).subarray(1) };
  }
  var In = /* @__PURE__ */ Object.freeze({ __proto__: null, CurveWithOID: Zr, ecdh: /* @__PURE__ */ Object.freeze({ __proto__: null, decrypt: kn, encrypt: mn, validateParams: async function(e2, t2, r2) {
    return Xr(R.publicKey.ecdh, e2, t2, r2);
  } }), ecdhX: zr, ecdsa: hn, eddsa: mt, eddsaLegacy: gn, generate: Jr, getPreferredHashAlgo: Wr });
  var Bn = BigInt(0);
  var Sn = BigInt(1);
  var Kn = class {
    constructor(e2) {
      e2 && (this.data = e2);
    }
    read(e2) {
      if (e2.length >= 1) {
        const t2 = e2[0];
        if (e2.length >= 1 + t2) return this.data = e2.subarray(1, 1 + t2), 1 + this.data.length;
      }
      throw Error("Invalid symmetric key");
    }
    write() {
      return N.concatUint8Array([new Uint8Array([this.data.length]), this.data]);
    }
  };
  var Cn = class {
    constructor(e2) {
      if (e2) {
        const { hash: t2, cipher: r2 } = e2;
        this.hash = t2, this.cipher = r2;
      } else this.hash = null, this.cipher = null;
    }
    read(e2) {
      if (e2.length < 4 || 3 !== e2[0] || 1 !== e2[1]) throw new ot("Cannot read KDFParams");
      return this.hash = e2[2], this.cipher = e2[3], 4;
    }
    write() {
      return new Uint8Array([3, 1, this.hash, this.cipher]);
    }
  };
  var Dn = class _Dn {
    static fromObject({ wrappedKey: e2, algorithm: t2 }) {
      const r2 = new _Dn();
      return r2.wrappedKey = e2, r2.algorithm = t2, r2;
    }
    read(e2) {
      let t2 = 0, r2 = e2[t2++];
      this.algorithm = r2 % 2 ? e2[t2++] : null, r2 -= r2 % 2, this.wrappedKey = N.readExactSubarray(e2, t2, t2 + r2), t2 += r2;
    }
    write() {
      return N.concatUint8Array([this.algorithm ? new Uint8Array([this.wrappedKey.length + 1, this.algorithm]) : new Uint8Array([this.wrappedKey.length]), this.wrappedKey]);
    }
  };
  async function Un(e2, t2, r2, n2, i2) {
    switch (e2) {
      case R.publicKey.rsaEncrypt:
      case R.publicKey.rsaEncryptSign: {
        const { n: e3, e: t3 } = r2;
        return { c: await qe(n2, e3, t3) };
      }
      case R.publicKey.elgamal: {
        const { p: e3, g: t3, y: i3 } = r2;
        return (async function(e4, t4, r3, n3) {
          t4 = ne(t4), r3 = ne(r3), n3 = ne(n3);
          const i4 = ne(Ne(e4, le(t4))), s2 = de(We, t4 - We);
          return { c1: ye(ae(r3, s2, t4)), c2: ye(ie(ae(n3, s2, t4) * i4, t4)) };
        })(n2, e3, t3, i3);
      }
      case R.publicKey.ecdh: {
        const { oid: e3, Q: t3, kdfParams: s2 } = r2, { publicKey: a2, wrappedKey: o2 } = await mn(e3, s2, n2, t3, i2);
        return { V: a2, C: new Kn(o2) };
      }
      case R.publicKey.x25519:
      case R.publicKey.x448: {
        if (t2 && !N.isAES(t2)) throw Error("X25519 and X448 keys can only encrypt AES session keys");
        const { A: i3 } = r2, { ephemeralPublicKey: s2, wrappedKey: a2 } = await Rr(e2, n2, i3);
        return { ephemeralPublicKey: s2, C: Dn.fromObject({ algorithm: t2, wrappedKey: a2 }) };
      }
      default:
        return [];
    }
  }
  async function Pn(e2, t2, r2, n2, i2, s2) {
    switch (e2) {
      case R.publicKey.rsaEncryptSign:
      case R.publicKey.rsaEncrypt: {
        const { c: e3 } = n2, { n: i3, e: a2 } = t2, { d: o2, p: c2, q: u2, u: h2 } = r2;
        return _e(e3, i3, a2, o2, c2, u2, h2, s2);
      }
      case R.publicKey.elgamal: {
        const { c1: e3, c2: i3 } = n2;
        return (async function(e4, t3, r3, n3, i4) {
          return e4 = ne(e4), t3 = ne(t3), r3 = ne(r3), Le(ye(ie(ce(ae(e4, n3 = ne(n3), r3), r3) * t3, r3), "be", le(r3)), i4);
        })(e3, i3, t2.p, r2.x, s2);
      }
      case R.publicKey.ecdh: {
        const { oid: e3, Q: s3, kdfParams: a2 } = t2, { d: o2 } = r2, { V: c2, C: u2 } = n2;
        return kn(e3, a2, c2, u2.data, s3, o2, i2);
      }
      case R.publicKey.x25519:
      case R.publicKey.x448: {
        const { A: i3 } = t2, { k: s3 } = r2, { ephemeralPublicKey: a2, C: o2 } = n2;
        if (null !== o2.algorithm && !N.isAES(o2.algorithm)) throw Error("AES session key expected");
        return Fr(e2, a2, o2.wrappedKey, i3, s3);
      }
      default:
        throw Error("Unknown public key encryption algorithm.");
    }
  }
  function xn(e2, t2, r2) {
    let n2 = 0;
    switch (e2) {
      case R.publicKey.rsaEncrypt:
      case R.publicKey.rsaEncryptSign:
      case R.publicKey.rsaSign: {
        const e3 = N.readMPI(t2.subarray(n2));
        n2 += e3.length + 2;
        const r3 = N.readMPI(t2.subarray(n2));
        n2 += r3.length + 2;
        const i2 = N.readMPI(t2.subarray(n2));
        n2 += i2.length + 2;
        const s2 = N.readMPI(t2.subarray(n2));
        return n2 += s2.length + 2, { read: n2, privateParams: { d: e3, p: r3, q: i2, u: s2 } };
      }
      case R.publicKey.dsa:
      case R.publicKey.elgamal: {
        const e3 = N.readMPI(t2.subarray(n2));
        return n2 += e3.length + 2, { read: n2, privateParams: { x: e3 } };
      }
      case R.publicKey.ecdsa:
      case R.publicKey.ecdh: {
        const i2 = Nn(e2, r2.oid);
        let s2 = N.readMPI(t2.subarray(n2));
        return n2 += s2.length + 2, s2 = N.leftPad(s2, i2), { read: n2, privateParams: { d: s2 } };
      }
      case R.publicKey.eddsaLegacy: {
        const i2 = Nn(e2, r2.oid);
        if (r2.oid.getName() !== R.curve.ed25519Legacy) throw Error("Unexpected OID for eddsaLegacy");
        let s2 = N.readMPI(t2.subarray(n2));
        return n2 += s2.length + 2, s2 = N.leftPad(s2, i2), { read: n2, privateParams: { seed: s2 } };
      }
      case R.publicKey.ed25519:
      case R.publicKey.ed448: {
        const r3 = Nn(e2), i2 = N.readExactSubarray(t2, n2, n2 + r3);
        return n2 += i2.length, { read: n2, privateParams: { seed: i2 } };
      }
      case R.publicKey.x25519:
      case R.publicKey.x448: {
        const r3 = Nn(e2), i2 = N.readExactSubarray(t2, n2, n2 + r3);
        return n2 += i2.length, { read: n2, privateParams: { k: i2 } };
      }
      default:
        throw new ot("Unknown public key encryption algorithm.");
    }
  }
  function Qn(e2, t2) {
    const r2 = /* @__PURE__ */ new Set([R.publicKey.ed25519, R.publicKey.x25519, R.publicKey.ed448, R.publicKey.x448]), n2 = Object.keys(t2).map(((n3) => {
      const i2 = t2[n3];
      return N.isUint8Array(i2) ? r2.has(e2) ? i2 : N.uint8ArrayToMPI(i2) : i2.write();
    }));
    return N.concatUint8Array(n2);
  }
  function Mn(e2, t2, r2) {
    switch (e2) {
      case R.publicKey.rsaEncrypt:
      case R.publicKey.rsaEncryptSign:
      case R.publicKey.rsaSign:
        return (async function(e3, t3) {
          if (t3 = BigInt(t3), N.getWebCrypto()) {
            const r4 = { name: "RSASSA-PKCS1-v1_5", modulusLength: e3, publicExponent: ye(t3), hash: { name: "SHA-1" } }, n3 = await He.generateKey(r4, true, ["sign", "verify"]);
            return Je(await He.exportKey("jwk", n3.privateKey), t3);
          }
          if (N.getNodeCrypto()) {
            const r4 = { modulusLength: e3, publicExponent: ue(t3), publicKeyEncoding: { type: "pkcs1", format: "jwk" }, privateKeyEncoding: { type: "pkcs1", format: "jwk" } }, n3 = await new Promise(((e4, t4) => {
              ze.generateKeyPair("rsa", r4, ((r5, n4, i3) => {
                r5 ? t4(r5) : e4(i3);
              }));
            }));
            return Je(n3, t3);
          }
          let r3, n2, i2;
          do {
            n2 = we(e3 - (e3 >> 1), t3, 40), r3 = we(e3 >> 1, t3, 40), i2 = r3 * n2;
          } while (fe(i2) !== e3);
          const s2 = (r3 - Ge) * (n2 - Ge);
          return n2 < r3 && ([r3, n2] = [n2, r3]), { n: ye(i2), e: ye(t3), d: ye(ce(t3, s2)), p: ye(r3), q: ye(n2), u: ye(ce(r3, n2)) };
        })(t2, 65537).then((({ n: e3, e: t3, d: r3, p: n2, q: i2, u: s2 }) => ({ privateParams: { d: r3, p: n2, q: i2, u: s2 }, publicParams: { n: e3, e: t3 } })));
      case R.publicKey.ecdsa:
        return Jr(r2).then((({ oid: e3, Q: t3, secret: r3 }) => ({ privateParams: { d: r3 }, publicParams: { oid: new $e(e3), Q: t3 } })));
      case R.publicKey.eddsaLegacy:
        return Jr(r2).then((({ oid: e3, Q: t3, secret: r3 }) => ({ privateParams: { seed: r3 }, publicParams: { oid: new $e(e3), Q: t3 } })));
      case R.publicKey.ecdh:
        return Jr(r2).then((({ oid: e3, Q: t3, secret: r3, hash: n2, cipher: i2 }) => ({ privateParams: { d: r3 }, publicParams: { oid: new $e(e3), Q: t3, kdfParams: new Cn({ hash: n2, cipher: i2 }) } })));
      case R.publicKey.ed25519:
      case R.publicKey.ed448:
        return ft(e2).then((({ A: e3, seed: t3 }) => ({ privateParams: { seed: t3 }, publicParams: { A: e3 } })));
      case R.publicKey.x25519:
      case R.publicKey.x448:
        return Qr(e2).then((({ A: e3, k: t3 }) => ({ privateParams: { k: t3 }, publicParams: { A: e3 } })));
      case R.publicKey.dsa:
      case R.publicKey.elgamal:
        throw Error("Unsupported algorithm for key generation.");
      default:
        throw Error("Unknown public key algorithm.");
    }
  }
  async function Rn(e2, t2, r2) {
    if (!t2 || !r2) throw Error("Missing key parameters");
    switch (e2) {
      case R.publicKey.rsaEncrypt:
      case R.publicKey.rsaEncryptSign:
      case R.publicKey.rsaSign: {
        const { n: e3, e: n2 } = t2, { d: i2, p: s2, q: a2, u: o2 } = r2;
        return (async function(e4, t3, r3, n3, i3, s3) {
          if (e4 = ne(e4), (n3 = ne(n3)) * (i3 = ne(i3)) !== e4) return false;
          const a3 = BigInt(2);
          if (ie(n3 * (s3 = ne(s3)), i3) !== BigInt(1)) return false;
          t3 = ne(t3), r3 = ne(r3);
          const o3 = de(a3, a3 << BigInt(Math.floor(fe(e4) / 3))), c2 = o3 * r3 * t3;
          return !(ie(c2, n3 - Ge) !== o3 || ie(c2, i3 - Ge) !== o3);
        })(e3, n2, i2, s2, a2, o2);
      }
      case R.publicKey.dsa: {
        const { p: e3, q: n2, g: i2, y: s2 } = t2, { x: a2 } = r2;
        return (async function(e4, t3, r3, n3, i3) {
          const s3 = ne(e4), a3 = ne(t3), o2 = ne(r3), c2 = ne(n3);
          if (o2 <= Sn || o2 >= s3) return false;
          if (ie(s3 - Sn, a3) !== Bn) return false;
          if (ae(o2, a3, s3) !== Sn) return false;
          const u2 = BigInt(fe(a3));
          if (u2 < BigInt(150) || !me(a3, null, 32)) return false;
          const h2 = ne(i3), f2 = BigInt(2);
          return c2 === ae(o2, a3 * de(f2 << u2 - Sn, f2 << u2) + h2, s3);
        })(e3, n2, i2, s2, a2);
      }
      case R.publicKey.elgamal: {
        const { p: e3, g: n2, y: i2 } = t2, { x: s2 } = r2;
        return (async function(e4, t3, r3, n3) {
          const i3 = ne(e4), s3 = ne(t3), a2 = ne(r3);
          if (s3 <= We || s3 >= i3) return false;
          const o2 = BigInt(fe(i3));
          if (o2 < BigInt(1023)) return false;
          if (ae(s3, i3 - We, i3) !== We) return false;
          let c2 = s3, u2 = BigInt(1);
          const h2 = BigInt(2), f2 = h2 << BigInt(17);
          for (; u2 < f2; ) {
            if (c2 = ie(c2 * s3, i3), c2 === We) return false;
            u2++;
          }
          const l2 = ne(n3), y2 = de(h2 << o2 - We, h2 << o2);
          return a2 === ae(s3, (i3 - We) * y2 + l2, i3);
        })(e3, n2, i2, s2);
      }
      case R.publicKey.ecdsa:
      case R.publicKey.ecdh: {
        const n2 = In[R.read(R.publicKey, e2)], { oid: i2, Q: s2 } = t2, { d: a2 } = r2;
        return n2.validateParams(i2, s2, a2);
      }
      case R.publicKey.eddsaLegacy: {
        const { Q: e3, oid: n2 } = t2, { seed: i2 } = r2;
        return yn(n2, e3, i2);
      }
      case R.publicKey.ed25519:
      case R.publicKey.ed448: {
        const { A: n2 } = t2, { seed: i2 } = r2;
        return gt(e2, n2, i2);
      }
      case R.publicKey.x25519:
      case R.publicKey.x448: {
        const { A: n2 } = t2, { k: i2 } = r2;
        return Mr(e2, n2, i2);
      }
      default:
        throw Error("Unknown public key algorithm.");
    }
  }
  function Fn(e2) {
    const { keySize: t2 } = Kr(e2);
    return pe(t2);
  }
  function Tn(e2) {
    try {
      e2.getName();
    } catch {
      throw new ot("Unknown curve OID");
    }
  }
  function Nn(e2, t2) {
    switch (e2) {
      case R.publicKey.ecdsa:
      case R.publicKey.ecdh:
      case R.publicKey.eddsaLegacy:
        return new Zr(t2).payloadSize;
      case R.publicKey.ed25519:
      case R.publicKey.ed448:
        return pt(e2);
      case R.publicKey.x25519:
      case R.publicKey.x448:
        return Tr(e2);
      default:
        throw Error("Unknown elliptic algo");
    }
  }
  var Ln = N.getWebCrypto();
  var On = N.getNodeCrypto();
  var Hn = On ? On.getCiphers() : [];
  var zn = { idea: Hn.includes("idea-cfb") ? "idea-cfb" : void 0, tripledes: Hn.includes("des-ede3-cfb") ? "des-ede3-cfb" : void 0, cast5: Hn.includes("cast5-cfb") ? "cast5-cfb" : void 0, blowfish: Hn.includes("bf-cfb") ? "bf-cfb" : void 0, aes128: Hn.includes("aes-128-cfb") ? "aes-128-cfb" : void 0, aes192: Hn.includes("aes-192-cfb") ? "aes-192-cfb" : void 0, aes256: Hn.includes("aes-256-cfb") ? "aes-256-cfb" : void 0 };
  function Gn(e2) {
    const { blockSize: t2 } = Kr(e2), r2 = pe(t2), n2 = new Uint8Array([r2[r2.length - 2], r2[r2.length - 1]]);
    return N.concat([r2, n2]);
  }
  async function jn(e2, t2, r2, n2, i2) {
    const s2 = R.read(R.symmetric, e2);
    if (N.getNodeCrypto() && zn[s2]) return (function(e3, t3, r3, n3) {
      const i3 = R.read(R.symmetric, e3), s3 = new On.createCipheriv(zn[i3], t3, n3);
      return b(r3, ((e4) => new Uint8Array(s3.update(e4))));
    })(e2, t2, r2, n2);
    if (N.isAES(e2)) return (async function(e3, t3, r3, n3) {
      if (Ln && await qn.isSupported(e3)) {
        const i3 = new qn(e3, t3, n3);
        return N.isStream(r3) ? k(r3, ((e4) => i3.encryptChunk(e4)), (() => i3.finish())) : i3.encrypt(r3);
      }
      if (N.isStream(r3)) {
        const i3 = new _n(true, e3, t3, n3);
        return k(r3, ((e4) => i3.processChunk(e4)), (() => i3.finish()));
      }
      return gr(t3, n3).encrypt(r3);
    })(e2, t2, r2, n2);
    const a2 = new (await Ir(e2))(t2), o2 = a2.blockSize, c2 = n2.slice();
    let u2 = new Uint8Array();
    const h2 = (e3) => {
      e3 && (u2 = N.concatUint8Array([u2, e3]));
      const t3 = new Uint8Array(u2.length);
      let r3, n3 = 0;
      for (; e3 ? u2.length >= o2 : u2.length; ) {
        const e4 = a2.encrypt(c2);
        for (r3 = 0; r3 < o2; r3++) c2[r3] = u2[r3] ^ e4[r3], t3[n3++] = c2[r3];
        u2 = u2.subarray(o2);
      }
      return t3.subarray(0, n3);
    };
    return b(r2, h2, h2);
  }
  async function Vn(e2, t2, r2, n2) {
    const i2 = R.read(R.symmetric, e2);
    if (On && zn[i2]) return (function(e3, t3, r3, n3) {
      const i3 = R.read(R.symmetric, e3), s3 = new On.createDecipheriv(zn[i3], t3, n3);
      return b(r3, ((e4) => new Uint8Array(s3.update(e4))));
    })(e2, t2, r2, n2);
    if (N.isAES(e2)) return (function(e3, t3, r3, n3) {
      if (N.isStream(r3)) {
        const i3 = new _n(false, e3, t3, n3);
        return k(r3, ((e4) => i3.processChunk(e4)), (() => i3.finish()));
      }
      return gr(t3, n3).decrypt(r3);
    })(e2, t2, r2, n2);
    const s2 = new (await Ir(e2))(t2), a2 = s2.blockSize;
    let o2 = n2, c2 = new Uint8Array();
    const u2 = (e3) => {
      e3 && (c2 = N.concatUint8Array([c2, e3]));
      const t3 = new Uint8Array(c2.length);
      let r3, n3 = 0;
      for (; e3 ? c2.length >= a2 : c2.length; ) {
        const e4 = s2.encrypt(o2);
        for (o2 = c2.subarray(0, a2), r3 = 0; r3 < a2; r3++) t3[n3++] = o2[r3] ^ e4[r3];
        c2 = c2.subarray(a2);
      }
      return t3.subarray(0, n3);
    };
    return b(r2, u2, u2);
  }
  var qn = class {
    constructor(e2, t2, r2) {
      const { blockSize: n2 } = Kr(e2);
      this.key = t2, this.iv = r2, this.prevBlock = r2.slice(), this.nextBlock = new Uint8Array(n2), this.i = 0, this.blockSize = n2, this.zeroBlock = new Uint8Array(this.blockSize);
    }
    static isSupported(e2) {
      const { keySize: t2 } = Kr(e2);
      return Ln.importKey("raw", new Uint8Array(t2), "aes-cbc", false, ["encrypt"]).then((() => true), (() => false));
    }
    async _runCBC(e2, t2) {
      const r2 = "AES-CBC";
      this.keyRef = this.keyRef || await Ln.importKey("raw", this.key, r2, false, ["encrypt"]);
      const n2 = await Ln.encrypt({ name: r2, iv: t2 || this.zeroBlock }, this.keyRef, e2);
      return new Uint8Array(n2).subarray(0, e2.length);
    }
    async encryptChunk(e2) {
      const t2 = this.nextBlock.length - this.i, r2 = e2.subarray(0, t2);
      if (this.nextBlock.set(r2, this.i), this.i + e2.length >= 2 * this.blockSize) {
        const r3 = (e2.length - t2) % this.blockSize, n3 = N.concatUint8Array([this.nextBlock, e2.subarray(t2, e2.length - r3)]), i2 = N.concatUint8Array([this.prevBlock, n3.subarray(0, n3.length - this.blockSize)]), s2 = await this._runCBC(i2);
        return Yn(s2, n3), this.prevBlock = s2.slice(-this.blockSize), r3 > 0 && this.nextBlock.set(e2.subarray(-r3)), this.i = r3, s2;
      }
      let n2;
      if (this.i += r2.length, this.i === this.nextBlock.length) {
        const t3 = this.nextBlock;
        n2 = await this._runCBC(this.prevBlock), Yn(n2, t3), this.prevBlock = n2.slice(), this.i = 0;
        const i2 = e2.subarray(r2.length);
        this.nextBlock.set(i2, this.i), this.i += i2.length;
      } else n2 = new Uint8Array();
      return n2;
    }
    async finish() {
      let e2;
      if (0 === this.i) e2 = new Uint8Array();
      else {
        this.nextBlock = this.nextBlock.subarray(0, this.i);
        const t2 = this.nextBlock, r2 = await this._runCBC(this.prevBlock);
        Yn(r2, t2), e2 = r2.subarray(0, t2.length);
      }
      return this.clearSensitiveData(), e2;
    }
    clearSensitiveData() {
      this.nextBlock.fill(0), this.prevBlock.fill(0), this.keyRef = null, this.key = null;
    }
    async encrypt(e2) {
      const t2 = (await this._runCBC(N.concatUint8Array([new Uint8Array(this.blockSize), e2]), this.iv)).subarray(0, e2.length);
      return Yn(t2, e2), this.clearSensitiveData(), t2;
    }
  };
  var _n = class {
    constructor(e2, t2, r2, n2) {
      this.forEncryption = e2;
      const { blockSize: i2 } = Kr(t2);
      this.key = vr.expandKeyLE(r2), n2.byteOffset % 4 != 0 && (n2 = n2.slice()), this.prevBlock = Zn(n2), this.nextBlock = new Uint8Array(i2), this.i = 0, this.blockSize = i2;
    }
    _runCFB(e2) {
      const t2 = Zn(e2), r2 = new Uint8Array(e2.length), n2 = Zn(r2);
      for (let e3 = 0; e3 + 4 <= n2.length; e3 += 4) {
        const { s0: r3, s1: i2, s2, s3: a2 } = vr.encrypt(this.key, this.prevBlock[0], this.prevBlock[1], this.prevBlock[2], this.prevBlock[3]);
        n2[e3 + 0] = t2[e3 + 0] ^ r3, n2[e3 + 1] = t2[e3 + 1] ^ i2, n2[e3 + 2] = t2[e3 + 2] ^ s2, n2[e3 + 3] = t2[e3 + 3] ^ a2, this.prevBlock = (this.forEncryption ? n2 : t2).slice(e3, e3 + 4);
      }
      return r2;
    }
    async processChunk(e2) {
      const t2 = this.nextBlock.length - this.i, r2 = e2.subarray(0, t2);
      if (this.nextBlock.set(r2, this.i), this.i + e2.length >= 2 * this.blockSize) {
        const r3 = (e2.length - t2) % this.blockSize, n3 = N.concatUint8Array([this.nextBlock, e2.subarray(t2, e2.length - r3)]), i2 = this._runCFB(n3);
        return r3 > 0 && this.nextBlock.set(e2.subarray(-r3)), this.i = r3, i2;
      }
      let n2;
      if (this.i += r2.length, this.i === this.nextBlock.length) {
        n2 = this._runCFB(this.nextBlock), this.i = 0;
        const t3 = e2.subarray(r2.length);
        this.nextBlock.set(t3, this.i), this.i += t3.length;
      } else n2 = new Uint8Array();
      return n2;
    }
    async finish() {
      let e2;
      if (0 === this.i) e2 = new Uint8Array();
      else {
        e2 = this._runCFB(this.nextBlock).subarray(0, this.i);
      }
      return this.clearSensitiveData(), e2;
    }
    clearSensitiveData() {
      this.nextBlock.fill(0), this.prevBlock.fill(0), this.key.fill(0);
    }
  };
  function Yn(e2, t2) {
    const r2 = Math.min(e2.length, t2.length);
    for (let n2 = 0; n2 < r2; n2++) e2[n2] = e2[n2] ^ t2[n2];
  }
  var Zn = (e2) => new Uint32Array(e2.buffer, e2.byteOffset, Math.floor(e2.byteLength / 4));
  var Jn = N.getWebCrypto();
  var Wn = N.getNodeCrypto();
  var Xn = 16;
  function $n(e2, t2) {
    const r2 = e2.length - Xn;
    for (let n2 = 0; n2 < Xn; n2++) e2[n2 + r2] ^= t2[n2];
    return e2;
  }
  var ei = new Uint8Array(Xn);
  async function ti(e2) {
    const t2 = await ri(e2), r2 = N.double(await t2(ei)), n2 = N.double(r2);
    return async function(e3) {
      return (await t2((function(e4, t3, r3) {
        if (e4.length && e4.length % Xn == 0) return $n(e4, t3);
        const n3 = new Uint8Array(e4.length + (Xn - e4.length % Xn));
        return n3.set(e4), n3[e4.length] = 128, $n(n3, r3);
      })(e3, r2, n2))).subarray(-16);
    };
  }
  async function ri(e2) {
    if (N.getNodeCrypto()) return async function(t2) {
      const r2 = new Wn.createCipheriv("aes-" + 8 * e2.length + "-cbc", e2, ei).update(t2);
      return new Uint8Array(r2);
    };
    if (N.getWebCrypto()) try {
      return e2 = await Jn.importKey("raw", e2, { name: "AES-CBC", length: 8 * e2.length }, false, ["encrypt"]), async function(t2) {
        const r2 = await Jn.encrypt({ name: "AES-CBC", iv: ei, length: 128 }, e2, t2);
        return new Uint8Array(r2).subarray(0, r2.byteLength - Xn);
      };
    } catch (t2) {
      if ("NotSupportedError" !== t2.name && (24 !== e2.length || "OperationError" !== t2.name)) throw t2;
      N.printDebugError("Browser did not support operation: " + t2.message);
    }
    return async function(t2) {
      return yr(e2, ei, { disablePadding: true }).encrypt(t2);
    };
  }
  var ni = N.getWebCrypto();
  var ii = N.getNodeCrypto();
  var si = N.getNodeBuffer();
  var ai = 16;
  var oi = ai;
  var ci = new Uint8Array(ai);
  var ui = new Uint8Array(ai);
  ui[15] = 1;
  var hi = new Uint8Array(ai);
  async function fi(e2) {
    const t2 = await ti(e2);
    return function(e3, r2) {
      return t2(N.concatUint8Array([e3, r2]));
    };
  }
  async function li(e2) {
    if (N.getNodeCrypto()) return async function(t2, r2) {
      const n2 = new ii.createCipheriv("aes-" + 8 * e2.length + "-ctr", e2, r2), i2 = si.concat([n2.update(t2), n2.final()]);
      return new Uint8Array(i2);
    };
    if (N.getWebCrypto()) try {
      const t2 = await ni.importKey("raw", e2, { name: "AES-CTR", length: 8 * e2.length }, false, ["encrypt"]);
      return async function(e3, r2) {
        const n2 = await ni.encrypt({ name: "AES-CTR", counter: r2, length: 128 }, t2, e3);
        return new Uint8Array(n2);
      };
    } catch (t2) {
      if ("NotSupportedError" !== t2.name && (24 !== e2.length || "OperationError" !== t2.name)) throw t2;
      N.printDebugError("Browser did not support operation: " + t2.message);
    }
    return async function(t2, r2) {
      return lr(e2, r2).encrypt(t2);
    };
  }
  async function yi(e2, t2) {
    if (e2 !== R.symmetric.aes128 && e2 !== R.symmetric.aes192 && e2 !== R.symmetric.aes256) throw Error("EAX mode supports only AES cipher");
    const [r2, n2] = await Promise.all([fi(t2), li(t2)]);
    return { encrypt: async function(e3, t3, i2) {
      const [s2, a2] = await Promise.all([r2(ci, t3), r2(ui, i2)]), o2 = await n2(e3, s2), c2 = await r2(hi, o2);
      for (let e4 = 0; e4 < oi; e4++) c2[e4] ^= a2[e4] ^ s2[e4];
      return N.concatUint8Array([o2, c2]);
    }, decrypt: async function(e3, t3, i2) {
      if (e3.length < oi) throw Error("Invalid EAX ciphertext");
      const s2 = e3.subarray(0, -16), a2 = e3.subarray(-16), [o2, c2, u2] = await Promise.all([r2(ci, t3), r2(ui, i2), r2(hi, s2)]), h2 = u2;
      for (let e4 = 0; e4 < oi; e4++) h2[e4] ^= c2[e4] ^ o2[e4];
      if (!N.timingSafeEqualsUint8Array(a2, h2)) throw Error("Authentication tag mismatch");
      return await n2(s2, o2);
    } };
  }
  hi[15] = 2, yi.getNonce = function(e2, t2) {
    const r2 = e2.slice();
    for (let e3 = 0; e3 < t2.length; e3++) r2[8 + e3] ^= t2[e3];
    return r2;
  }, yi.blockLength = ai, yi.ivLength = 16, yi.tagLength = oi;
  var gi = 16;
  var pi = 16;
  function di(e2) {
    let t2 = 0;
    for (let r2 = 1; !(e2 & r2); r2 <<= 1) t2++;
    return t2;
  }
  function Ai(e2, t2) {
    for (let r2 = 0; r2 < e2.length; r2++) e2[r2] ^= t2[r2];
    return e2;
  }
  function wi(e2, t2) {
    return Ai(e2.slice(), t2);
  }
  var mi = new Uint8Array(gi);
  var bi = new Uint8Array([1]);
  async function ki(e2, t2) {
    const { keySize: r2 } = Kr(e2);
    if (!N.isAES(e2) || t2.length !== r2) throw Error("Unexpected algorithm or key size");
    let n2 = 0;
    const i2 = (e3) => yr(t2, mi, { disablePadding: true }).encrypt(e3), s2 = (e3) => yr(t2, mi, { disablePadding: true }).decrypt(e3);
    let a2;
    function o2(e3, t3, r3, s3) {
      const o3 = t3.length / gi | 0;
      !(function(e4, t4) {
        const r4 = N.nbits(Math.max(e4.length, t4.length) / gi | 0) - 1;
        for (let e5 = n2 + 1; e5 <= r4; e5++) a2[e5] = N.double(a2[e5 - 1]);
        n2 = r4;
      })(t3, s3);
      const c2 = N.concatUint8Array([mi.subarray(0, 15 - r3.length), bi, r3]), u2 = 63 & c2[15];
      c2[15] &= 192;
      const h2 = i2(c2), f2 = N.concatUint8Array([h2, wi(h2.subarray(0, 8), h2.subarray(1, 9))]), l2 = N.shiftRight(f2.subarray(0 + (u2 >> 3), 17 + (u2 >> 3)), 8 - (7 & u2)).subarray(1), y2 = new Uint8Array(gi), g2 = new Uint8Array(t3.length + pi);
      let p2, d2 = 0;
      for (p2 = 0; p2 < o3; p2++) Ai(l2, a2[di(p2 + 1)]), g2.set(Ai(e3(wi(l2, t3)), l2), d2), Ai(y2, e3 === i2 ? t3 : g2.subarray(d2)), t3 = t3.subarray(gi), d2 += gi;
      if (t3.length) {
        Ai(l2, a2.x);
        const r4 = i2(l2);
        g2.set(wi(t3, r4), d2);
        const n3 = new Uint8Array(gi);
        n3.set(e3 === i2 ? t3 : g2.subarray(d2, -16), 0), n3[t3.length] = 128, Ai(y2, n3), d2 += t3.length;
      }
      const A2 = Ai(i2(Ai(Ai(y2, l2), a2.$)), (function(e4) {
        if (!e4.length) return mi;
        const t4 = e4.length / gi | 0, r4 = new Uint8Array(gi), n3 = new Uint8Array(gi);
        for (let s4 = 0; s4 < t4; s4++) Ai(r4, a2[di(s4 + 1)]), Ai(n3, i2(wi(r4, e4))), e4 = e4.subarray(gi);
        if (e4.length) {
          Ai(r4, a2.x);
          const t5 = new Uint8Array(gi);
          t5.set(e4, 0), t5[e4.length] = 128, Ai(t5, r4), Ai(n3, i2(t5));
        }
        return n3;
      })(s3));
      return g2.set(A2, d2), g2;
    }
    return (function() {
      const e3 = i2(mi), t3 = N.double(e3);
      a2 = [], a2[0] = N.double(t3), a2.x = e3, a2.$ = t3;
    })(), { encrypt: async function(e3, t3, r3) {
      return o2(i2, e3, t3, r3);
    }, decrypt: async function(e3, t3, r3) {
      if (e3.length < pi) throw Error("Invalid OCB ciphertext");
      const n3 = e3.subarray(-16);
      e3 = e3.subarray(0, -16);
      const i3 = o2(s2, e3, t3, r3);
      if (N.timingSafeEqualsUint8Array(n3, i3.subarray(-16))) return i3.subarray(0, -16);
      throw Error("Authentication tag mismatch");
    } };
  }
  ki.getNonce = function(e2, t2) {
    const r2 = e2.slice();
    for (let e3 = 0; e3 < t2.length; e3++) r2[7 + e3] ^= t2[e3];
    return r2;
  }, ki.blockLength = gi, ki.ivLength = 15, ki.tagLength = pi;
  var Ei = N.getWebCrypto();
  var vi = N.getNodeCrypto();
  var Ii = N.getNodeBuffer();
  var Bi = 16;
  var Si = "AES-GCM";
  async function Ki(e2, t2) {
    if (e2 !== R.symmetric.aes128 && e2 !== R.symmetric.aes192 && e2 !== R.symmetric.aes256) throw Error("GCM mode supports only AES cipher");
    if (N.getNodeCrypto()) return { encrypt: async function(e3, r2, n2 = new Uint8Array()) {
      const i2 = new vi.createCipheriv("aes-" + 8 * t2.length + "-gcm", t2, r2);
      i2.setAAD(n2);
      const s2 = Ii.concat([i2.update(e3), i2.final(), i2.getAuthTag()]);
      return new Uint8Array(s2);
    }, decrypt: async function(e3, r2, n2 = new Uint8Array()) {
      const i2 = new vi.createDecipheriv("aes-" + 8 * t2.length + "-gcm", t2, r2);
      i2.setAAD(n2), i2.setAuthTag(e3.slice(e3.length - Bi, e3.length));
      const s2 = Ii.concat([i2.update(e3.slice(0, e3.length - Bi)), i2.final()]);
      return new Uint8Array(s2);
    } };
    if (N.getWebCrypto()) try {
      const e3 = await Ei.importKey("raw", t2, { name: Si }, false, ["encrypt", "decrypt"]), r2 = navigator.userAgent.match(/Version\/13\.\d(\.\d)* Safari/) || navigator.userAgent.match(/Version\/(13|14)\.\d(\.\d)* Mobile\/\S* Safari/);
      return { encrypt: async function(n2, i2, s2 = new Uint8Array()) {
        if (r2 && !n2.length) return dr(t2, i2, s2).encrypt(n2);
        const a2 = await Ei.encrypt({ name: Si, iv: i2, additionalData: s2, tagLength: 128 }, e3, n2);
        return new Uint8Array(a2);
      }, decrypt: async function(n2, i2, s2 = new Uint8Array()) {
        if (r2 && n2.length === Bi) return dr(t2, i2, s2).decrypt(n2);
        try {
          const t3 = await Ei.decrypt({ name: Si, iv: i2, additionalData: s2, tagLength: 128 }, e3, n2);
          return new Uint8Array(t3);
        } catch (e4) {
          if ("OperationError" === e4.name) throw Error("Authentication tag mismatch");
        }
      } };
    } catch (e3) {
      if ("NotSupportedError" !== e3.name && (24 !== t2.length || "OperationError" !== e3.name)) throw e3;
      N.printDebugError("Browser did not support operation: " + e3.message);
    }
    return { encrypt: async function(e3, r2, n2) {
      return dr(t2, r2, n2).encrypt(e3);
    }, decrypt: async function(e3, r2, n2) {
      return dr(t2, r2, n2).decrypt(e3);
    } };
  }
  function Ci(e2, t2 = false) {
    switch (e2) {
      case R.aead.eax:
        return yi;
      case R.aead.ocb:
        return ki;
      case R.aead.gcm:
        return Ki;
      case R.aead.experimentalGCM:
        if (!t2) throw Error("Unexpected non-standard `experimentalGCM` AEAD algorithm provided in `config.preferredAEADAlgorithm`: use `gcm` instead");
        return Ki;
      default:
        throw Error("Unsupported AEAD mode");
    }
  }
  async function Di(e2, t2, r2, n2, i2, s2) {
    switch (e2) {
      case R.publicKey.rsaEncryptSign:
      case R.publicKey.rsaEncrypt:
      case R.publicKey.rsaSign: {
        const { n: e3, e: a2 } = n2;
        return Ve(t2, i2, N.leftPad(r2.s, e3.length), e3, a2, s2);
      }
      case R.publicKey.dsa: {
        const { g: e3, p: t3, q: i3, y: a2 } = n2, { r: o2, s: c2 } = r2;
        return (async function(e4, t4, r3, n3, i4, s3, a3, o3) {
          if (t4 = ne(t4), r3 = ne(r3), s3 = ne(s3), a3 = ne(a3), i4 = ne(i4), o3 = ne(o3), t4 <= Bn || t4 >= a3 || r3 <= Bn || r3 >= a3) return N.printDebug("invalid DSA Signature"), false;
          const c3 = ie(ne(n3.subarray(0, le(a3))), a3), u2 = ce(r3, a3);
          if (u2 === Bn) return N.printDebug("invalid DSA Signature"), false;
          i4 = ie(i4, s3), o3 = ie(o3, s3);
          const h2 = ie(c3 * u2, a3), f2 = ie(t4 * u2, a3);
          return ie(ie(ae(i4, h2, s3) * ae(o3, f2, s3), s3), a3) === t4;
        })(0, o2, c2, s2, e3, t3, i3, a2);
      }
      case R.publicKey.ecdsa: {
        const { oid: e3, Q: a2 } = n2, o2 = new Zr(e3).payloadSize;
        return cn(e3, t2, { r: N.leftPad(r2.r, o2), s: N.leftPad(r2.s, o2) }, i2, a2, s2);
      }
      case R.publicKey.eddsaLegacy: {
        const { oid: e3, Q: i3 } = n2, a2 = new Zr(e3).payloadSize;
        return ln(e3, t2, { r: N.leftPad(r2.r, a2), s: N.leftPad(r2.s, a2) }, 0, i3, s2);
      }
      case R.publicKey.ed25519:
      case R.publicKey.ed448: {
        const { A: i3 } = n2;
        return yt(e2, t2, r2, 0, i3, s2);
      }
      default:
        throw Error("Unknown signature algorithm.");
    }
  }
  async function Ui(e2, t2, r2, n2, i2, s2) {
    if (!r2 || !n2) throw Error("Missing key parameters");
    switch (e2) {
      case R.publicKey.rsaEncryptSign:
      case R.publicKey.rsaEncrypt:
      case R.publicKey.rsaSign: {
        const { n: e3, e: a2 } = r2, { d: o2, p: c2, q: u2, u: h2 } = n2;
        return { s: await je(t2, i2, e3, a2, o2, c2, u2, h2, s2) };
      }
      case R.publicKey.dsa: {
        const { g: e3, p: t3, q: i3 } = r2, { x: a2 } = n2;
        return (async function(e4, t4, r3, n3, i4, s3) {
          const a3 = BigInt(0);
          let o2, c2, u2, h2;
          n3 = ne(n3), i4 = ne(i4), r3 = ne(r3), s3 = ne(s3), r3 = ie(r3, n3), s3 = ie(s3, i4);
          const f2 = ie(ne(t4.subarray(0, le(i4))), i4);
          for (; ; ) {
            if (o2 = de(Sn, i4), c2 = ie(ae(r3, o2, n3), i4), c2 === a3) continue;
            const e5 = ie(s3 * c2, i4);
            if (h2 = ie(f2 + e5, i4), u2 = ie(ce(o2, i4) * h2, i4), u2 !== a3) break;
          }
          return { r: ye(c2, "be", le(n3)), s: ye(u2, "be", le(n3)) };
        })(0, s2, e3, t3, i3, a2);
      }
      case R.publicKey.elgamal:
        throw Error("Signing with Elgamal is not defined in the OpenPGP standard.");
      case R.publicKey.ecdsa: {
        const { oid: e3, Q: a2 } = r2, { d: o2 } = n2;
        return on(e3, t2, i2, a2, o2, s2);
      }
      case R.publicKey.eddsaLegacy: {
        const { oid: e3, Q: i3 } = r2, { seed: a2 } = n2;
        return fn(e3, t2, 0, i3, a2, s2);
      }
      case R.publicKey.ed25519:
      case R.publicKey.ed448: {
        const { A: i3 } = r2, { seed: a2 } = n2;
        return lt(e2, t2, 0, i3, a2, s2);
      }
      default:
        throw Error("Unknown signature algorithm.");
    }
  }
  Ki.getNonce = function(e2, t2) {
    const r2 = e2.slice();
    for (let e3 = 0; e3 < t2.length; e3++) r2[4 + e3] ^= t2[e3];
    return r2;
  }, Ki.blockLength = 16, Ki.ivLength = 12, Ki.tagLength = Bi;
  var Pi = class _Pi extends Error {
    constructor(...e2) {
      super(...e2), Error.captureStackTrace && Error.captureStackTrace(this, _Pi), this.name = "Argon2OutOfMemoryError";
    }
  };
  var xi;
  var Qi;
  var Mi = class {
    constructor(e2 = F) {
      const { passes: t2, parallelism: r2, memoryExponent: n2 } = e2.s2kArgon2Params;
      this.type = "argon2", this.salt = null, this.t = t2, this.p = r2, this.encodedM = n2;
    }
    generateSalt() {
      this.salt = pe(16);
    }
    read(e2) {
      let t2 = 0;
      return this.salt = e2.subarray(t2, t2 + 16), t2 += 16, this.t = e2[t2++], this.p = e2[t2++], this.encodedM = e2[t2++], t2;
    }
    write() {
      const e2 = [new Uint8Array([R.write(R.s2k, this.type)]), this.salt, new Uint8Array([this.t, this.p, this.encodedM])];
      return N.concatUint8Array(e2);
    }
    async produceKey(e2, t2, r2) {
      if (r2.maxArgon2MemoryExponent > 30) throw new Pi("'config.maxArgon2MemoryExponent' exceeds the max allowed value of 30");
      if (this.encodedM > r2.maxArgon2MemoryExponent) throw new Pi("Argon2 required memory exceeds `config.maxArgon2MemoryExponent`");
      const n2 = 1 << this.encodedM;
      try {
        xi = xi || (await Promise.resolve().then((function() {
          return Yy;
        }))).default, Qi = Qi || xi();
        const r3 = await Qi, i2 = r3({ version: 19, type: 2, password: N.encodeUTF8(e2), salt: this.salt, tagLength: t2, memorySize: n2, parallelism: this.p, passes: this.t });
        return n2 > 1048576 && (Qi = xi(), Qi.catch((() => {
        }))), i2;
      } catch (e3) {
        throw e3.message && (e3.message.includes("Unable to grow instance memory") || e3.message.includes("failed to grow memory") || e3.message.includes("WebAssembly.Memory.grow") || e3.message.includes("Out of memory")) ? new Pi("Could not allocate required memory for Argon2") : e3;
      }
    }
  };
  var Ri = class {
    constructor(e2, t2 = F) {
      this.algorithm = R.hash.sha256, this.type = R.read(R.s2k, e2), this.c = t2.s2kIterationCountByte, this.salt = null;
    }
    generateSalt() {
      switch (this.type) {
        case "salted":
        case "iterated":
          this.salt = pe(8);
      }
    }
    getCount() {
      return 16 + (15 & this.c) << 6 + (this.c >> 4);
    }
    read(e2) {
      let t2 = 0;
      switch (this.algorithm = e2[t2++], this.type) {
        case "simple":
          break;
        case "salted":
          this.salt = e2.subarray(t2, t2 + 8), t2 += 8;
          break;
        case "iterated":
          this.salt = e2.subarray(t2, t2 + 8), t2 += 8, this.c = e2[t2++];
          break;
        case "gnu":
          if ("GNU" !== N.uint8ArrayToString(e2.subarray(t2, t2 + 3))) throw new ot("Unknown s2k type.");
          t2 += 3;
          if (1001 !== 1e3 + e2[t2++]) throw new ot("Unknown s2k gnu protection mode.");
          this.type = "gnu-dummy";
          break;
        default:
          throw new ot("Unknown s2k type.");
      }
      return t2;
    }
    write() {
      if ("gnu-dummy" === this.type) return new Uint8Array([101, 0, ...N.stringToUint8Array("GNU"), 1]);
      const e2 = [new Uint8Array([R.write(R.s2k, this.type), this.algorithm])];
      switch (this.type) {
        case "simple":
          break;
        case "salted":
          e2.push(this.salt);
          break;
        case "iterated":
          e2.push(this.salt), e2.push(new Uint8Array([this.c]));
          break;
        case "gnu":
          throw Error("GNU s2k type not supported.");
        default:
          throw Error("Unknown s2k type.");
      }
      return N.concatUint8Array(e2);
    }
    async produceKey(e2, t2, r2) {
      e2 = N.encodeUTF8(e2);
      const n2 = [];
      let i2 = 0, s2 = 0;
      for (; i2 < t2; ) {
        let t3;
        switch (this.type) {
          case "simple":
            t3 = N.concatUint8Array([new Uint8Array(s2), e2]);
            break;
          case "salted":
            t3 = N.concatUint8Array([new Uint8Array(s2), this.salt, e2]);
            break;
          case "iterated": {
            const r4 = N.concatUint8Array([this.salt, e2]);
            let n3 = r4.length;
            const i3 = Math.max(this.getCount(), n3);
            t3 = new Uint8Array(s2 + i3), t3.set(r4, s2);
            for (let e3 = s2 + n3; e3 < i3; e3 += n3, n3 *= 2) t3.copyWithin(e3, s2, e3);
            break;
          }
          case "gnu":
            throw Error("GNU s2k type not supported.");
          default:
            throw Error("Unknown s2k type.");
        }
        const r3 = await Re(this.algorithm, t3);
        n2.push(r3), i2 += r3.length, s2++;
      }
      return N.concatUint8Array(n2).subarray(0, t2);
    }
  };
  var Fi = /* @__PURE__ */ new Set([R.s2k.argon2, R.s2k.iterated]);
  function Ti(e2, t2 = F) {
    switch (e2) {
      case R.s2k.argon2:
        return new Mi(t2);
      case R.s2k.iterated:
      case R.s2k.gnu:
      case R.s2k.salted:
      case R.s2k.simple:
        return new Ri(e2, t2);
      default:
        throw new ot("Unsupported S2K type");
    }
  }
  function Ni(e2) {
    const { s2kType: t2 } = e2;
    if (!Fi.has(t2)) throw Error("The provided `config.s2kType` value is not allowed");
    return Ti(t2, e2);
  }
  var Li = Uint8Array;
  var Oi = Uint16Array;
  var Hi = Int32Array;
  var zi = new Li([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
  var Gi = new Li([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
  var ji = new Li([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var Vi = function(e2, t2) {
    for (var r2 = new Oi(31), n2 = 0; n2 < 31; ++n2) r2[n2] = t2 += 1 << e2[n2 - 1];
    var i2 = new Hi(r2[30]);
    for (n2 = 1; n2 < 30; ++n2) for (var s2 = r2[n2]; s2 < r2[n2 + 1]; ++s2) i2[s2] = s2 - r2[n2] << 5 | n2;
    return { b: r2, r: i2 };
  };
  var qi = Vi(zi, 2);
  var _i = qi.b;
  var Yi = qi.r;
  _i[28] = 258, Yi[258] = 28;
  for (Zi = Vi(Gi, 0), Ji = Zi.b, Wi = Zi.r, Xi = new Oi(32768), $i = 0; $i < 32768; ++$i) {
    es = (43690 & $i) >> 1 | (21845 & $i) << 1;
    es = (61680 & (es = (52428 & es) >> 2 | (13107 & es) << 2)) >> 4 | (3855 & es) << 4, Xi[$i] = ((65280 & es) >> 8 | (255 & es) << 8) >> 1;
  }
  var es;
  var Zi;
  var Ji;
  var Wi;
  var Xi;
  var $i;
  var ts = function(e2, t2, r2) {
    for (var n2 = e2.length, i2 = 0, s2 = new Oi(t2); i2 < n2; ++i2) e2[i2] && ++s2[e2[i2] - 1];
    var a2, o2 = new Oi(t2);
    for (i2 = 1; i2 < t2; ++i2) o2[i2] = o2[i2 - 1] + s2[i2 - 1] << 1;
    if (r2) {
      a2 = new Oi(1 << t2);
      var c2 = 15 - t2;
      for (i2 = 0; i2 < n2; ++i2) if (e2[i2]) for (var u2 = i2 << 4 | e2[i2], h2 = t2 - e2[i2], f2 = o2[e2[i2] - 1]++ << h2, l2 = f2 | (1 << h2) - 1; f2 <= l2; ++f2) a2[Xi[f2] >> c2] = u2;
    } else for (a2 = new Oi(n2), i2 = 0; i2 < n2; ++i2) e2[i2] && (a2[i2] = Xi[o2[e2[i2] - 1]++] >> 15 - e2[i2]);
    return a2;
  };
  var rs = new Li(288);
  for ($i = 0; $i < 144; ++$i) rs[$i] = 8;
  for ($i = 144; $i < 256; ++$i) rs[$i] = 9;
  for ($i = 256; $i < 280; ++$i) rs[$i] = 7;
  for ($i = 280; $i < 288; ++$i) rs[$i] = 8;
  var ns = new Li(32);
  for ($i = 0; $i < 32; ++$i) ns[$i] = 5;
  var is = /* @__PURE__ */ ts(rs, 9, 0);
  var ss = /* @__PURE__ */ ts(rs, 9, 1);
  var as = /* @__PURE__ */ ts(ns, 5, 0);
  var os = /* @__PURE__ */ ts(ns, 5, 1);
  var cs = function(e2) {
    for (var t2 = e2[0], r2 = 1; r2 < e2.length; ++r2) e2[r2] > t2 && (t2 = e2[r2]);
    return t2;
  };
  var us = function(e2, t2, r2) {
    var n2 = t2 / 8 | 0;
    return (e2[n2] | e2[n2 + 1] << 8) >> (7 & t2) & r2;
  };
  var hs = function(e2, t2) {
    var r2 = t2 / 8 | 0;
    return (e2[r2] | e2[r2 + 1] << 8 | e2[r2 + 2] << 16) >> (7 & t2);
  };
  var fs = function(e2) {
    return (e2 + 7) / 8 | 0;
  };
  var ls = function(e2, t2, r2) {
    return (null == t2 || t2 < 0) && (t2 = 0), (null == r2 || r2 > e2.length) && (r2 = e2.length), new Li(e2.subarray(t2, r2));
  };
  var ys = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"];
  var gs = function(e2, t2, r2) {
    var n2 = Error(t2 || ys[e2]);
    if (n2.code = e2, Error.captureStackTrace && Error.captureStackTrace(n2, gs), !r2) throw n2;
    return n2;
  };
  var ps = function(e2, t2, r2) {
    r2 <<= 7 & t2;
    var n2 = t2 / 8 | 0;
    e2[n2] |= r2, e2[n2 + 1] |= r2 >> 8;
  };
  var ds = function(e2, t2, r2) {
    r2 <<= 7 & t2;
    var n2 = t2 / 8 | 0;
    e2[n2] |= r2, e2[n2 + 1] |= r2 >> 8, e2[n2 + 2] |= r2 >> 16;
  };
  var As = function(e2, t2) {
    for (var r2 = [], n2 = 0; n2 < e2.length; ++n2) e2[n2] && r2.push({ s: n2, f: e2[n2] });
    var i2 = r2.length, s2 = r2.slice();
    if (!i2) return { t: Is, l: 0 };
    if (1 == i2) {
      var a2 = new Li(r2[0].s + 1);
      return a2[r2[0].s] = 1, { t: a2, l: 1 };
    }
    r2.sort((function(e3, t3) {
      return e3.f - t3.f;
    })), r2.push({ s: -1, f: 25001 });
    var o2 = r2[0], c2 = r2[1], u2 = 0, h2 = 1, f2 = 2;
    for (r2[0] = { s: -1, f: o2.f + c2.f, l: o2, r: c2 }; h2 != i2 - 1; ) o2 = r2[r2[u2].f < r2[f2].f ? u2++ : f2++], c2 = r2[u2 != h2 && r2[u2].f < r2[f2].f ? u2++ : f2++], r2[h2++] = { s: -1, f: o2.f + c2.f, l: o2, r: c2 };
    var l2 = s2[0].s;
    for (n2 = 1; n2 < i2; ++n2) s2[n2].s > l2 && (l2 = s2[n2].s);
    var y2 = new Oi(l2 + 1), g2 = ws(r2[h2 - 1], y2, 0);
    if (g2 > t2) {
      n2 = 0;
      var p2 = 0, d2 = g2 - t2, A2 = 1 << d2;
      for (s2.sort((function(e3, t3) {
        return y2[t3.s] - y2[e3.s] || e3.f - t3.f;
      })); n2 < i2; ++n2) {
        var w2 = s2[n2].s;
        if (!(y2[w2] > t2)) break;
        p2 += A2 - (1 << g2 - y2[w2]), y2[w2] = t2;
      }
      for (p2 >>= d2; p2 > 0; ) {
        var m2 = s2[n2].s;
        y2[m2] < t2 ? p2 -= 1 << t2 - y2[m2]++ - 1 : ++n2;
      }
      for (; n2 >= 0 && p2; --n2) {
        var b2 = s2[n2].s;
        y2[b2] == t2 && (--y2[b2], ++p2);
      }
      g2 = t2;
    }
    return { t: new Li(y2), l: g2 };
  };
  var ws = function(e2, t2, r2) {
    return -1 == e2.s ? Math.max(ws(e2.l, t2, r2 + 1), ws(e2.r, t2, r2 + 1)) : t2[e2.s] = r2;
  };
  var ms = function(e2) {
    for (var t2 = e2.length; t2 && !e2[--t2]; ) ;
    for (var r2 = new Oi(++t2), n2 = 0, i2 = e2[0], s2 = 1, a2 = function(e3) {
      r2[n2++] = e3;
    }, o2 = 1; o2 <= t2; ++o2) if (e2[o2] == i2 && o2 != t2) ++s2;
    else {
      if (!i2 && s2 > 2) {
        for (; s2 > 138; s2 -= 138) a2(32754);
        s2 > 2 && (a2(s2 > 10 ? s2 - 11 << 5 | 28690 : s2 - 3 << 5 | 12305), s2 = 0);
      } else if (s2 > 3) {
        for (a2(i2), --s2; s2 > 6; s2 -= 6) a2(8304);
        s2 > 2 && (a2(s2 - 3 << 5 | 8208), s2 = 0);
      }
      for (; s2--; ) a2(i2);
      s2 = 1, i2 = e2[o2];
    }
    return { c: r2.subarray(0, n2), n: t2 };
  };
  var bs = function(e2, t2) {
    for (var r2 = 0, n2 = 0; n2 < t2.length; ++n2) r2 += e2[n2] * t2[n2];
    return r2;
  };
  var ks = function(e2, t2, r2) {
    var n2 = r2.length, i2 = fs(t2 + 2);
    e2[i2] = 255 & n2, e2[i2 + 1] = n2 >> 8, e2[i2 + 2] = 255 ^ e2[i2], e2[i2 + 3] = 255 ^ e2[i2 + 1];
    for (var s2 = 0; s2 < n2; ++s2) e2[i2 + s2 + 4] = r2[s2];
    return 8 * (i2 + 4 + n2);
  };
  var Es = function(e2, t2, r2, n2, i2, s2, a2, o2, c2, u2, h2) {
    ps(t2, h2++, r2), ++i2[256];
    for (var f2 = As(i2, 15), l2 = f2.t, y2 = f2.l, g2 = As(s2, 15), p2 = g2.t, d2 = g2.l, A2 = ms(l2), w2 = A2.c, m2 = A2.n, b2 = ms(p2), k2 = b2.c, E2 = b2.n, v2 = new Oi(19), I2 = 0; I2 < w2.length; ++I2) ++v2[31 & w2[I2]];
    for (I2 = 0; I2 < k2.length; ++I2) ++v2[31 & k2[I2]];
    for (var B2 = As(v2, 7), S2 = B2.t, K2 = B2.l, C2 = 19; C2 > 4 && !S2[ji[C2 - 1]]; --C2) ;
    var D2, U2, P2, x2, Q2 = u2 + 5 << 3, M2 = bs(i2, rs) + bs(s2, ns) + a2, R2 = bs(i2, l2) + bs(s2, p2) + a2 + 14 + 3 * C2 + bs(v2, S2) + 2 * v2[16] + 3 * v2[17] + 7 * v2[18];
    if (c2 >= 0 && Q2 <= M2 && Q2 <= R2) return ks(t2, h2, e2.subarray(c2, c2 + u2));
    if (ps(t2, h2, 1 + (R2 < M2)), h2 += 2, R2 < M2) {
      D2 = ts(l2, y2, 0), U2 = l2, P2 = ts(p2, d2, 0), x2 = p2;
      var F2 = ts(S2, K2, 0);
      ps(t2, h2, m2 - 257), ps(t2, h2 + 5, E2 - 1), ps(t2, h2 + 10, C2 - 4), h2 += 14;
      for (I2 = 0; I2 < C2; ++I2) ps(t2, h2 + 3 * I2, S2[ji[I2]]);
      h2 += 3 * C2;
      for (var T2 = [w2, k2], N2 = 0; N2 < 2; ++N2) {
        var L2 = T2[N2];
        for (I2 = 0; I2 < L2.length; ++I2) {
          var O2 = 31 & L2[I2];
          ps(t2, h2, F2[O2]), h2 += S2[O2], O2 > 15 && (ps(t2, h2, L2[I2] >> 5 & 127), h2 += L2[I2] >> 12);
        }
      }
    } else D2 = is, U2 = rs, P2 = as, x2 = ns;
    for (I2 = 0; I2 < o2; ++I2) {
      var H2 = n2[I2];
      if (H2 > 255) {
        ds(t2, h2, D2[(O2 = H2 >> 18 & 31) + 257]), h2 += U2[O2 + 257], O2 > 7 && (ps(t2, h2, H2 >> 23 & 31), h2 += zi[O2]);
        var z2 = 31 & H2;
        ds(t2, h2, P2[z2]), h2 += x2[z2], z2 > 3 && (ds(t2, h2, H2 >> 5 & 8191), h2 += Gi[z2]);
      } else ds(t2, h2, D2[H2]), h2 += U2[H2];
    }
    return ds(t2, h2, D2[256]), h2 + U2[256];
  };
  var vs = /* @__PURE__ */ new Hi([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
  var Is = /* @__PURE__ */ new Li(0);
  var Bs = function() {
    var e2 = 1, t2 = 0;
    return { p: function(r2) {
      for (var n2 = e2, i2 = t2, s2 = 0 | r2.length, a2 = 0; a2 != s2; ) {
        for (var o2 = Math.min(a2 + 2655, s2); a2 < o2; ++a2) i2 += n2 += r2[a2];
        n2 = (65535 & n2) + 15 * (n2 >> 16), i2 = (65535 & i2) + 15 * (i2 >> 16);
      }
      e2 = n2, t2 = i2;
    }, d: function() {
      return (255 & (e2 %= 65521)) << 24 | (65280 & e2) << 8 | (255 & (t2 %= 65521)) << 8 | t2 >> 8;
    } };
  };
  var Ss = function(e2, t2, r2, n2, i2) {
    if (!i2 && (i2 = { l: 1 }, t2.dictionary)) {
      var s2 = t2.dictionary.subarray(-32768), a2 = new Li(s2.length + e2.length);
      a2.set(s2), a2.set(e2, s2.length), e2 = a2, i2.w = s2.length;
    }
    return (function(e3, t3, r3, n3, i3, s3) {
      var a3 = s3.z || e3.length, o2 = new Li(n3 + a3 + 5 * (1 + Math.ceil(a3 / 7e3)) + i3), c2 = o2.subarray(n3, o2.length - i3), u2 = s3.l, h2 = 7 & (s3.r || 0);
      if (t3) {
        h2 && (c2[0] = s3.r >> 3);
        for (var f2 = vs[t3 - 1], l2 = f2 >> 13, y2 = 8191 & f2, g2 = (1 << r3) - 1, p2 = s3.p || new Oi(32768), d2 = s3.h || new Oi(g2 + 1), A2 = Math.ceil(r3 / 3), w2 = 2 * A2, m2 = function(t4) {
          return (e3[t4] ^ e3[t4 + 1] << A2 ^ e3[t4 + 2] << w2) & g2;
        }, b2 = new Hi(25e3), k2 = new Oi(288), E2 = new Oi(32), v2 = 0, I2 = 0, B2 = s3.i || 0, S2 = 0, K2 = s3.w || 0, C2 = 0; B2 + 2 < a3; ++B2) {
          var D2 = m2(B2), U2 = 32767 & B2, P2 = d2[D2];
          if (p2[U2] = P2, d2[D2] = U2, K2 <= B2) {
            var x2 = a3 - B2;
            if ((v2 > 7e3 || S2 > 24576) && (x2 > 423 || !u2)) {
              h2 = Es(e3, c2, 0, b2, k2, E2, I2, S2, C2, B2 - C2, h2), S2 = v2 = I2 = 0, C2 = B2;
              for (var Q2 = 0; Q2 < 286; ++Q2) k2[Q2] = 0;
              for (Q2 = 0; Q2 < 30; ++Q2) E2[Q2] = 0;
            }
            var M2 = 2, R2 = 0, F2 = y2, T2 = U2 - P2 & 32767;
            if (x2 > 2 && D2 == m2(B2 - T2)) for (var N2 = Math.min(l2, x2) - 1, L2 = Math.min(32767, B2), O2 = Math.min(258, x2); T2 <= L2 && --F2 && U2 != P2; ) {
              if (e3[B2 + M2] == e3[B2 + M2 - T2]) {
                for (var H2 = 0; H2 < O2 && e3[B2 + H2] == e3[B2 + H2 - T2]; ++H2) ;
                if (H2 > M2) {
                  if (M2 = H2, R2 = T2, H2 > N2) break;
                  var z2 = Math.min(T2, H2 - 2), G2 = 0;
                  for (Q2 = 0; Q2 < z2; ++Q2) {
                    var j2 = B2 - T2 + Q2 & 32767, V2 = j2 - p2[j2] & 32767;
                    V2 > G2 && (G2 = V2, P2 = j2);
                  }
                }
              }
              T2 += (U2 = P2) - (P2 = p2[U2]) & 32767;
            }
            if (R2) {
              b2[S2++] = 268435456 | Yi[M2] << 18 | Wi[R2];
              var q2 = 31 & Yi[M2], _2 = 31 & Wi[R2];
              I2 += zi[q2] + Gi[_2], ++k2[257 + q2], ++E2[_2], K2 = B2 + M2, ++v2;
            } else b2[S2++] = e3[B2], ++k2[e3[B2]];
          }
        }
        for (B2 = Math.max(B2, K2); B2 < a3; ++B2) b2[S2++] = e3[B2], ++k2[e3[B2]];
        h2 = Es(e3, c2, u2, b2, k2, E2, I2, S2, C2, B2 - C2, h2), u2 || (s3.r = 7 & h2 | c2[h2 / 8 | 0] << 3, h2 -= 7, s3.h = d2, s3.p = p2, s3.i = B2, s3.w = K2);
      } else {
        for (B2 = s3.w || 0; B2 < a3 + u2; B2 += 65535) {
          var Y2 = B2 + 65535;
          Y2 >= a3 && (c2[h2 / 8 | 0] = u2, Y2 = a3), h2 = ks(c2, h2 + 1, e3.subarray(B2, Y2));
        }
        s3.i = a3;
      }
      return ls(o2, 0, n3 + fs(h2) + i3);
    })(e2, null == t2.level ? 6 : t2.level, null == t2.mem ? i2.l ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e2.length)))) : 20 : 12 + t2.mem, r2, n2, i2);
  };
  var Ks = function(e2, t2, r2) {
    for (; r2; ++t2) e2[t2] = r2, r2 >>>= 8;
  };
  var Cs = /* @__PURE__ */ (function() {
    function e2(e3, t2) {
      if ("function" == typeof e3 && (t2 = e3, e3 = {}), this.ondata = t2, this.o = e3 || {}, this.s = { l: 0, i: 32768, w: 32768, z: 32768 }, this.b = new Li(98304), this.o.dictionary) {
        var r2 = this.o.dictionary.subarray(-32768);
        this.b.set(r2, 32768 - r2.length), this.s.i = 32768 - r2.length;
      }
    }
    return e2.prototype.p = function(e3, t2) {
      this.ondata(Ss(e3, this.o, 0, 0, this.s), t2);
    }, e2.prototype.push = function(e3, t2) {
      this.ondata || gs(5), this.s.l && gs(4);
      var r2 = e3.length + this.s.z;
      if (r2 > this.b.length) {
        if (r2 > 2 * this.b.length - 32768) {
          var n2 = new Li(-32768 & r2);
          n2.set(this.b.subarray(0, this.s.z)), this.b = n2;
        }
        var i2 = this.b.length - this.s.z;
        this.b.set(e3.subarray(0, i2), this.s.z), this.s.z = this.b.length, this.p(this.b, false), this.b.set(this.b.subarray(-32768)), this.b.set(e3.subarray(i2), 32768), this.s.z = e3.length - i2 + 32768, this.s.i = 32766, this.s.w = 32768;
      } else this.b.set(e3, this.s.z), this.s.z += e3.length;
      this.s.l = 1 & t2, (this.s.z > this.s.w + 8191 || t2) && (this.p(this.b, t2 || false), this.s.w = this.s.i, this.s.i -= 2), t2 && (this.s = this.o = {}, this.b = Is);
    }, e2.prototype.flush = function(e3) {
      if (this.ondata || gs(5), this.s.l && gs(4), this.p(this.b, false), this.s.w = this.s.i, this.s.i -= 2, e3) {
        var t2 = new Li(6);
        t2[0] = this.s.r >> 3;
        var r2 = ks(t2, this.s.r, Is);
        this.s.r = 0, this.ondata(t2.subarray(0, r2 >> 3), false);
      }
    }, e2;
  })();
  var Ds = /* @__PURE__ */ (function() {
    function e2(e3, t2) {
      "function" == typeof e3 && (t2 = e3, e3 = {}), this.ondata = t2;
      var r2 = e3 && e3.dictionary && e3.dictionary.subarray(-32768);
      this.s = { i: 0, b: r2 ? r2.length : 0 }, this.o = new Li(32768), this.p = new Li(0), r2 && this.o.set(r2);
    }
    return e2.prototype.e = function(e3) {
      if (this.ondata || gs(5), this.d && gs(4), this.p.length) {
        if (e3.length) {
          var t2 = new Li(this.p.length + e3.length);
          t2.set(this.p), t2.set(e3, this.p.length), this.p = t2;
        }
      } else this.p = e3;
    }, e2.prototype.c = function(e3) {
      this.s.i = +(this.d = e3 || false);
      var t2 = this.s.b, r2 = (function(e4, t3, r3, n2) {
        var i2 = e4.length;
        if (!i2 || t3.f && !t3.l) return r3 || new Li(0);
        var s2 = !r3, a2 = s2 || 2 != t3.i, o2 = t3.i;
        s2 && (r3 = new Li(3 * i2));
        var c2 = function(e5) {
          var t4 = r3.length;
          if (e5 > t4) {
            var n3 = new Li(Math.max(2 * t4, e5));
            n3.set(r3), r3 = n3;
          }
        }, u2 = t3.f || 0, h2 = t3.p || 0, f2 = t3.b || 0, l2 = t3.l, y2 = t3.d, g2 = t3.m, p2 = t3.n, d2 = 8 * i2;
        do {
          if (!l2) {
            u2 = us(e4, h2, 1);
            var A2 = us(e4, h2 + 1, 3);
            if (h2 += 3, !A2) {
              var w2 = e4[(D2 = fs(h2) + 4) - 4] | e4[D2 - 3] << 8, m2 = D2 + w2;
              if (m2 > i2) {
                o2 && gs(0);
                break;
              }
              a2 && c2(f2 + w2), r3.set(e4.subarray(D2, m2), f2), t3.b = f2 += w2, t3.p = h2 = 8 * m2, t3.f = u2;
              continue;
            }
            if (1 == A2) l2 = ss, y2 = os, g2 = 9, p2 = 5;
            else if (2 == A2) {
              var b2 = us(e4, h2, 31) + 257, k2 = us(e4, h2 + 10, 15) + 4, E2 = b2 + us(e4, h2 + 5, 31) + 1;
              h2 += 14;
              for (var v2 = new Li(E2), I2 = new Li(19), B2 = 0; B2 < k2; ++B2) I2[ji[B2]] = us(e4, h2 + 3 * B2, 7);
              h2 += 3 * k2;
              var S2 = cs(I2), K2 = (1 << S2) - 1, C2 = ts(I2, S2, 1);
              for (B2 = 0; B2 < E2; ) {
                var D2, U2 = C2[us(e4, h2, K2)];
                if (h2 += 15 & U2, (D2 = U2 >> 4) < 16) v2[B2++] = D2;
                else {
                  var P2 = 0, x2 = 0;
                  for (16 == D2 ? (x2 = 3 + us(e4, h2, 3), h2 += 2, P2 = v2[B2 - 1]) : 17 == D2 ? (x2 = 3 + us(e4, h2, 7), h2 += 3) : 18 == D2 && (x2 = 11 + us(e4, h2, 127), h2 += 7); x2--; ) v2[B2++] = P2;
                }
              }
              var Q2 = v2.subarray(0, b2), M2 = v2.subarray(b2);
              g2 = cs(Q2), p2 = cs(M2), l2 = ts(Q2, g2, 1), y2 = ts(M2, p2, 1);
            } else gs(1);
            if (h2 > d2) {
              o2 && gs(0);
              break;
            }
          }
          a2 && c2(f2 + 131072);
          for (var R2 = (1 << g2) - 1, F2 = (1 << p2) - 1, T2 = h2; ; T2 = h2) {
            var N2 = (P2 = l2[hs(e4, h2) & R2]) >> 4;
            if ((h2 += 15 & P2) > d2) {
              o2 && gs(0);
              break;
            }
            if (P2 || gs(2), N2 < 256) r3[f2++] = N2;
            else {
              if (256 == N2) {
                T2 = h2, l2 = null;
                break;
              }
              var L2 = N2 - 254;
              if (N2 > 264) {
                var O2 = zi[B2 = N2 - 257];
                L2 = us(e4, h2, (1 << O2) - 1) + _i[B2], h2 += O2;
              }
              var H2 = y2[hs(e4, h2) & F2], z2 = H2 >> 4;
              if (H2 || gs(3), h2 += 15 & H2, M2 = Ji[z2], z2 > 3 && (O2 = Gi[z2], M2 += hs(e4, h2) & (1 << O2) - 1, h2 += O2), h2 > d2) {
                o2 && gs(0);
                break;
              }
              a2 && c2(f2 + 131072);
              var G2 = f2 + L2;
              if (f2 < M2) {
                var j2 = 0 - M2, V2 = Math.min(M2, G2);
                for (j2 + f2 < 0 && gs(3); f2 < V2; ++f2) r3[f2] = n2[j2 + f2];
              }
              for (; f2 < G2; ++f2) r3[f2] = r3[f2 - M2];
            }
          }
          t3.l = l2, t3.p = T2, t3.b = f2, t3.f = u2, l2 && (u2 = 1, t3.m = g2, t3.d = y2, t3.n = p2);
        } while (!u2);
        return f2 != r3.length && s2 ? ls(r3, 0, f2) : r3.subarray(0, f2);
      })(this.p, this.s, this.o);
      this.ondata(ls(r2, t2, this.s.b), this.d), this.o = ls(r2, this.s.b - 32768), this.s.b = this.o.length, this.p = ls(this.p, this.s.p / 8 | 0), this.s.p &= 7;
    }, e2.prototype.push = function(e3, t2) {
      this.e(e3), this.c(t2);
    }, e2;
  })();
  var Us = /* @__PURE__ */ (function() {
    function e2(e3, t2) {
      this.c = Bs(), this.v = 1, Cs.call(this, e3, t2);
    }
    return e2.prototype.push = function(e3, t2) {
      this.c.p(e3), Cs.prototype.push.call(this, e3, t2);
    }, e2.prototype.p = function(e3, t2) {
      var r2 = Ss(e3, this.o, this.v && (this.o.dictionary ? 6 : 2), t2 && 4, this.s);
      this.v && ((function(e4, t3) {
        var r3 = t3.level, n2 = 0 == r3 ? 0 : r3 < 6 ? 1 : 9 == r3 ? 3 : 2;
        if (e4[0] = 120, e4[1] = n2 << 6 | (t3.dictionary && 32), e4[1] |= 31 - (e4[0] << 8 | e4[1]) % 31, t3.dictionary) {
          var i2 = Bs();
          i2.p(t3.dictionary), Ks(e4, 2, i2.d());
        }
      })(r2, this.o), this.v = 0), t2 && Ks(r2, r2.length - 4, this.c.d()), this.ondata(r2, t2);
    }, e2.prototype.flush = function(e3) {
      Cs.prototype.flush.call(this, e3);
    }, e2;
  })();
  var Ps = /* @__PURE__ */ (function() {
    function e2(e3, t2) {
      Ds.call(this, e3, t2), this.v = e3 && e3.dictionary ? 2 : 1;
    }
    return e2.prototype.push = function(e3, t2) {
      if (Ds.prototype.e.call(this, e3), this.v) {
        if (this.p.length < 6 && !t2) return;
        this.p = this.p.subarray((r2 = this.p, n2 = this.v - 1, (8 != (15 & r2[0]) || r2[0] >> 4 > 7 || (r2[0] << 8 | r2[1]) % 31) && gs(6, "invalid zlib data"), (r2[1] >> 5 & 1) == +!n2 && gs(6, "invalid zlib data: " + (32 & r2[1] ? "need" : "unexpected") + " dictionary"), 2 + (r2[1] >> 3 & 4))), this.v = 0;
      }
      var r2, n2;
      t2 && (this.p.length < 4 && gs(6, "invalid zlib data"), this.p = this.p.subarray(0, -4)), Ds.prototype.c.call(this, t2);
    }, e2;
  })();
  var xs = "undefined" != typeof TextDecoder && /* @__PURE__ */ new TextDecoder();
  try {
    xs.decode(Is, { stream: true });
  } catch (e2) {
  }
  var Qs = class {
    static get tag() {
      return R.packet.literalData;
    }
    constructor(e2 = /* @__PURE__ */ new Date()) {
      this.format = R.literal.utf8, this.date = N.normalizeDate(e2), this.text = null, this.data = null, this.filename = "";
    }
    setText(e2, t2 = R.literal.utf8) {
      this.format = t2, this.text = e2, this.data = null;
    }
    getText(e2 = false) {
      return (null === this.text || N.isStream(this.text)) && (this.text = N.decodeUTF8(N.nativeEOL(this.getBytes(e2)))), this.text;
    }
    setBytes(e2, t2) {
      this.format = t2, this.data = e2, this.text = null;
    }
    getBytes(e2 = false) {
      return null === this.data && (this.data = N.canonicalizeEOL(N.encodeUTF8(this.text))), e2 ? S(this.data) : this.data;
    }
    setFilename(e2) {
      this.filename = e2;
    }
    getFilename() {
      return this.filename;
    }
    async read(e2) {
      await I(e2, (async (e3) => {
        const t2 = await e3.readByte(), r2 = await e3.readByte();
        this.filename = N.decodeUTF8(await e3.readBytes(r2)), this.date = N.readDate(await e3.readBytes(4));
        let n2 = e3.remainder();
        o(n2) && (n2 = await D(n2)), this.setBytes(n2, t2);
      }));
    }
    writeHeader() {
      const e2 = N.encodeUTF8(this.filename), t2 = new Uint8Array([e2.length]), r2 = new Uint8Array([this.format]), n2 = N.writeDate(this.date);
      return N.concatUint8Array([r2, t2, e2, n2]);
    }
    write() {
      const e2 = this.writeHeader(), t2 = this.getBytes();
      return N.concat([e2, t2]);
    }
  };
  var Ms = class _Ms {
    constructor() {
      this.bytes = "";
    }
    read(e2) {
      return this.bytes = N.uint8ArrayToString(e2.subarray(0, 8)), this.bytes.length;
    }
    write() {
      return N.stringToUint8Array(this.bytes);
    }
    toHex() {
      return N.uint8ArrayToHex(N.stringToUint8Array(this.bytes));
    }
    equals(e2, t2 = false) {
      return t2 && (e2.isWildcard() || this.isWildcard()) || this.bytes === e2.bytes;
    }
    isNull() {
      return "" === this.bytes;
    }
    isWildcard() {
      return /^0+$/.test(this.toHex());
    }
    static mapToHex(e2) {
      return e2.toHex();
    }
    static fromID(e2) {
      const t2 = new _Ms();
      return t2.read(N.hexToUint8Array(e2)), t2;
    }
    static wildcard() {
      const e2 = new _Ms();
      return e2.read(new Uint8Array(8)), e2;
    }
  };
  var Rs = /* @__PURE__ */ Symbol("verified");
  var Fs = "salt@notations.openpgpjs.org";
  var Ts = /* @__PURE__ */ new Set([R.signatureSubpacket.issuerKeyID, R.signatureSubpacket.issuerFingerprint, R.signatureSubpacket.embeddedSignature]);
  var Ns = class _Ns {
    static get tag() {
      return R.packet.signature;
    }
    constructor() {
      this.version = null, this.signatureType = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.signatureData = null, this.unhashedSubpackets = [], this.unknownSubpackets = [], this.signedHashValue = null, this.salt = null, this.created = null, this.signatureExpirationTime = null, this.signatureNeverExpires = true, this.exportable = null, this.trustLevel = null, this.trustAmount = null, this.regularExpression = null, this.revocable = null, this.keyExpirationTime = null, this.keyNeverExpires = null, this.preferredSymmetricAlgorithms = null, this.revocationKeyClass = null, this.revocationKeyAlgorithm = null, this.revocationKeyFingerprint = null, this.issuerKeyID = new Ms(), this.rawNotations = [], this.notations = {}, this.preferredHashAlgorithms = null, this.preferredCompressionAlgorithms = null, this.keyServerPreferences = null, this.preferredKeyServer = null, this.isPrimaryUserID = null, this.policyURI = null, this.keyFlags = null, this.signersUserID = null, this.reasonForRevocationFlag = null, this.reasonForRevocationString = null, this.features = null, this.signatureTargetPublicKeyAlgorithm = null, this.signatureTargetHashAlgorithm = null, this.signatureTargetHash = null, this.embeddedSignature = null, this.issuerKeyVersion = null, this.issuerFingerprint = null, this.preferredAEADAlgorithms = null, this.preferredCipherSuites = null, this.revoked = null, this[Rs] = null;
    }
    read(e2, t2 = F) {
      let r2 = 0;
      if (this.version = e2[r2++], 5 === this.version && !t2.enableParsingV5Entities) throw new ot("Support for v5 entities is disabled; turn on `config.enableParsingV5Entities` if needed");
      if (4 !== this.version && 5 !== this.version && 6 !== this.version) throw new ot(`Version ${this.version} of the signature packet is unsupported.`);
      if (this.signatureType = e2[r2++], this.publicKeyAlgorithm = e2[r2++], this.hashAlgorithm = e2[r2++], r2 += this.readSubPackets(e2.subarray(r2, e2.length), true), !this.created) throw Error("Missing signature creation time subpacket.");
      if (this.signatureData = e2.subarray(0, r2), r2 += this.readSubPackets(e2.subarray(r2, e2.length), false), this.signedHashValue = e2.subarray(r2, r2 + 2), r2 += 2, 6 === this.version) {
        const t3 = e2[r2++];
        this.salt = e2.subarray(r2, r2 + t3), r2 += t3;
      }
      const n2 = e2.subarray(r2, e2.length), { read: i2, signatureParams: s2 } = (function(e3, t3) {
        let r3 = 0;
        switch (e3) {
          case R.publicKey.rsaEncryptSign:
          case R.publicKey.rsaEncrypt:
          case R.publicKey.rsaSign: {
            const e4 = N.readMPI(t3.subarray(r3));
            return r3 += e4.length + 2, { read: r3, signatureParams: { s: e4 } };
          }
          case R.publicKey.dsa:
          case R.publicKey.ecdsa: {
            const e4 = N.readMPI(t3.subarray(r3));
            r3 += e4.length + 2;
            const n3 = N.readMPI(t3.subarray(r3));
            return r3 += n3.length + 2, { read: r3, signatureParams: { r: e4, s: n3 } };
          }
          case R.publicKey.eddsaLegacy: {
            const e4 = N.readMPI(t3.subarray(r3));
            r3 += e4.length + 2;
            const n3 = N.readMPI(t3.subarray(r3));
            return r3 += n3.length + 2, { read: r3, signatureParams: { r: e4, s: n3 } };
          }
          case R.publicKey.ed25519:
          case R.publicKey.ed448: {
            const n3 = 2 * pt(e3), i3 = N.readExactSubarray(t3, r3, r3 + n3);
            return r3 += i3.length, { read: r3, signatureParams: { RS: i3 } };
          }
          default:
            throw new ot("Unknown signature algorithm.");
        }
      })(this.publicKeyAlgorithm, n2);
      if (i2 < n2.length) throw Error("Error reading MPIs");
      this.params = s2;
    }
    writeParams() {
      return this.params instanceof Promise ? P((async () => Qn(this.publicKeyAlgorithm, await this.params))) : Qn(this.publicKeyAlgorithm, this.params);
    }
    write() {
      const e2 = [];
      return e2.push(this.signatureData), e2.push(this.writeUnhashedSubPackets()), e2.push(this.signedHashValue), 6 === this.version && (e2.push(new Uint8Array([this.salt.length])), e2.push(this.salt)), e2.push(this.writeParams()), N.concat(e2);
    }
    async sign(e2, t2, r2 = /* @__PURE__ */ new Date(), n2 = false, i2) {
      this.version = e2.version, this.created = N.normalizeDate(r2), this.issuerKeyVersion = e2.version, this.issuerFingerprint = e2.getFingerprintBytes(), this.issuerKeyID = e2.getKeyID();
      const s2 = [new Uint8Array([this.version, this.signatureType, this.publicKeyAlgorithm, this.hashAlgorithm])];
      if (6 === this.version) {
        const e3 = Os(this.hashAlgorithm);
        if (null === this.salt) this.salt = pe(e3);
        else if (e3 !== this.salt.length) throw Error("Provided salt does not have the required length");
      } else if (i2.nonDeterministicSignaturesViaNotation) {
        if (0 !== this.rawNotations.filter((({ name: e3 }) => e3 === Fs)).length) throw Error("Unexpected existing salt notation");
        {
          const e3 = pe(Os(this.hashAlgorithm));
          this.rawNotations.push({ name: Fs, value: e3, humanReadable: false, critical: false });
        }
      }
      s2.push(this.writeHashedSubPackets()), this.unhashedSubpackets = [], this.signatureData = N.concat(s2);
      const a2 = this.toHash(this.signatureType, t2, n2), o2 = await this.hash(this.signatureType, t2, a2, n2);
      this.signedHashValue = C(B(o2), 0, 2);
      const c2 = async () => Ui(this.publicKeyAlgorithm, this.hashAlgorithm, e2.publicParams, e2.privateParams, a2, await D(o2));
      N.isStream(o2) ? this.params = c2() : (this.params = await c2(), this[Rs] = true);
    }
    writeHashedSubPackets() {
      const e2 = R.signatureSubpacket, t2 = [];
      let r2;
      if (null === this.created) throw Error("Missing signature creation time");
      t2.push(Ls(e2.signatureCreationTime, true, N.writeDate(this.created))), null !== this.signatureExpirationTime && t2.push(Ls(e2.signatureExpirationTime, true, N.writeNumber(this.signatureExpirationTime, 4))), null !== this.exportable && t2.push(Ls(e2.exportableCertification, true, new Uint8Array([this.exportable ? 1 : 0]))), null !== this.trustLevel && (r2 = new Uint8Array([this.trustLevel, this.trustAmount]), t2.push(Ls(e2.trustSignature, true, r2))), null !== this.regularExpression && t2.push(Ls(e2.regularExpression, true, this.regularExpression)), null !== this.revocable && t2.push(Ls(e2.revocable, true, new Uint8Array([this.revocable ? 1 : 0]))), null !== this.keyExpirationTime && t2.push(Ls(e2.keyExpirationTime, true, N.writeNumber(this.keyExpirationTime, 4))), null !== this.preferredSymmetricAlgorithms && (r2 = N.stringToUint8Array(N.uint8ArrayToString(this.preferredSymmetricAlgorithms)), t2.push(Ls(e2.preferredSymmetricAlgorithms, false, r2))), null !== this.revocationKeyClass && (r2 = new Uint8Array([this.revocationKeyClass, this.revocationKeyAlgorithm]), r2 = N.concat([r2, this.revocationKeyFingerprint]), t2.push(Ls(e2.revocationKey, false, r2))), !this.issuerKeyID.isNull() && this.issuerKeyVersion < 5 && t2.push(Ls(e2.issuerKeyID, false, this.issuerKeyID.write())), this.rawNotations.forEach((({ name: n3, value: i3, humanReadable: s2, critical: a2 }) => {
        r2 = [new Uint8Array([s2 ? 128 : 0, 0, 0, 0])];
        const o2 = N.encodeUTF8(n3);
        r2.push(N.writeNumber(o2.length, 2)), r2.push(N.writeNumber(i3.length, 2)), r2.push(o2), r2.push(i3), r2 = N.concat(r2), t2.push(Ls(e2.notationData, a2, r2));
      })), null !== this.preferredHashAlgorithms && (r2 = N.stringToUint8Array(N.uint8ArrayToString(this.preferredHashAlgorithms)), t2.push(Ls(e2.preferredHashAlgorithms, false, r2))), null !== this.preferredCompressionAlgorithms && (r2 = N.stringToUint8Array(N.uint8ArrayToString(this.preferredCompressionAlgorithms)), t2.push(Ls(e2.preferredCompressionAlgorithms, false, r2))), null !== this.keyServerPreferences && (r2 = N.stringToUint8Array(N.uint8ArrayToString(this.keyServerPreferences)), t2.push(Ls(e2.keyServerPreferences, false, r2))), null !== this.preferredKeyServer && t2.push(Ls(e2.preferredKeyServer, false, N.encodeUTF8(this.preferredKeyServer))), null !== this.isPrimaryUserID && t2.push(Ls(e2.primaryUserID, false, new Uint8Array([this.isPrimaryUserID ? 1 : 0]))), null !== this.policyURI && t2.push(Ls(e2.policyURI, false, N.encodeUTF8(this.policyURI))), null !== this.keyFlags && (r2 = N.stringToUint8Array(N.uint8ArrayToString(this.keyFlags)), t2.push(Ls(e2.keyFlags, true, r2))), null !== this.signersUserID && t2.push(Ls(e2.signersUserID, false, N.encodeUTF8(this.signersUserID))), null !== this.reasonForRevocationFlag && (r2 = N.stringToUint8Array(String.fromCharCode(this.reasonForRevocationFlag) + this.reasonForRevocationString), t2.push(Ls(e2.reasonForRevocation, true, r2))), null !== this.features && (r2 = N.stringToUint8Array(N.uint8ArrayToString(this.features)), t2.push(Ls(e2.features, false, r2))), null !== this.signatureTargetPublicKeyAlgorithm && (r2 = [new Uint8Array([this.signatureTargetPublicKeyAlgorithm, this.signatureTargetHashAlgorithm])], r2.push(N.stringToUint8Array(this.signatureTargetHash)), r2 = N.concat(r2), t2.push(Ls(e2.signatureTarget, true, r2))), null !== this.embeddedSignature && t2.push(Ls(e2.embeddedSignature, true, this.embeddedSignature.write())), null !== this.issuerFingerprint && (r2 = [new Uint8Array([this.issuerKeyVersion]), this.issuerFingerprint], r2 = N.concat(r2), t2.push(Ls(e2.issuerFingerprint, this.version >= 5, r2))), null !== this.preferredAEADAlgorithms && (r2 = N.stringToUint8Array(N.uint8ArrayToString(this.preferredAEADAlgorithms)), t2.push(Ls(e2.preferredAEADAlgorithms, false, r2))), null !== this.preferredCipherSuites && (r2 = new Uint8Array([].concat(...this.preferredCipherSuites)), t2.push(Ls(e2.preferredCipherSuites, false, r2)));
      const n2 = N.concat(t2), i2 = N.writeNumber(n2.length, 6 === this.version ? 4 : 2);
      return N.concat([i2, n2]);
    }
    writeUnhashedSubPackets() {
      const e2 = this.unhashedSubpackets.map((({ type: e3, critical: t3, body: r3 }) => Ls(e3, t3, r3))), t2 = N.concat(e2), r2 = N.writeNumber(t2.length, 6 === this.version ? 4 : 2);
      return N.concat([r2, t2]);
    }
    readSubPacket(e2, t2 = true) {
      let r2 = 0;
      const n2 = !!(128 & e2[r2]), i2 = 127 & e2[r2];
      if (r2++, t2 || (this.unhashedSubpackets.push({ type: i2, critical: n2, body: e2.subarray(r2, e2.length) }), Ts.has(i2))) switch (i2) {
        case R.signatureSubpacket.signatureCreationTime:
          this.created = N.readDate(e2.subarray(r2, e2.length));
          break;
        case R.signatureSubpacket.signatureExpirationTime: {
          const t3 = N.readNumber(e2.subarray(r2, e2.length));
          this.signatureNeverExpires = 0 === t3, this.signatureExpirationTime = t3;
          break;
        }
        case R.signatureSubpacket.exportableCertification:
          this.exportable = 1 === e2[r2++];
          break;
        case R.signatureSubpacket.trustSignature:
          this.trustLevel = e2[r2++], this.trustAmount = e2[r2++];
          break;
        case R.signatureSubpacket.regularExpression:
          this.regularExpression = e2[r2];
          break;
        case R.signatureSubpacket.revocable:
          this.revocable = 1 === e2[r2++];
          break;
        case R.signatureSubpacket.keyExpirationTime: {
          const t3 = N.readNumber(e2.subarray(r2, e2.length));
          this.keyExpirationTime = t3, this.keyNeverExpires = 0 === t3;
          break;
        }
        case R.signatureSubpacket.preferredSymmetricAlgorithms:
          this.preferredSymmetricAlgorithms = [...e2.subarray(r2, e2.length)];
          break;
        case R.signatureSubpacket.revocationKey:
          this.revocationKeyClass = e2[r2++], this.revocationKeyAlgorithm = e2[r2++], this.revocationKeyFingerprint = e2.subarray(r2, r2 + 20);
          break;
        case R.signatureSubpacket.issuerKeyID:
          if (4 === this.version) this.issuerKeyID.read(e2.subarray(r2, e2.length));
          else if (t2) throw Error("Unexpected Issuer Key ID subpacket");
          break;
        case R.signatureSubpacket.notationData: {
          const t3 = !!(128 & e2[r2]);
          r2 += 4;
          const i3 = N.readNumber(e2.subarray(r2, r2 + 2));
          r2 += 2;
          const s2 = N.readNumber(e2.subarray(r2, r2 + 2));
          r2 += 2;
          const a2 = N.decodeUTF8(e2.subarray(r2, r2 + i3)), o2 = e2.subarray(r2 + i3, r2 + i3 + s2);
          this.rawNotations.push({ name: a2, humanReadable: t3, value: o2, critical: n2 }), t3 && (this.notations[a2] = N.decodeUTF8(o2));
          break;
        }
        case R.signatureSubpacket.preferredHashAlgorithms:
          this.preferredHashAlgorithms = [...e2.subarray(r2, e2.length)];
          break;
        case R.signatureSubpacket.preferredCompressionAlgorithms:
          this.preferredCompressionAlgorithms = [...e2.subarray(r2, e2.length)];
          break;
        case R.signatureSubpacket.keyServerPreferences:
          this.keyServerPreferences = [...e2.subarray(r2, e2.length)];
          break;
        case R.signatureSubpacket.preferredKeyServer:
          this.preferredKeyServer = N.decodeUTF8(e2.subarray(r2, e2.length));
          break;
        case R.signatureSubpacket.primaryUserID:
          this.isPrimaryUserID = 0 !== e2[r2++];
          break;
        case R.signatureSubpacket.policyURI:
          this.policyURI = N.decodeUTF8(e2.subarray(r2, e2.length));
          break;
        case R.signatureSubpacket.keyFlags:
          this.keyFlags = [...e2.subarray(r2, e2.length)];
          break;
        case R.signatureSubpacket.signersUserID:
          this.signersUserID = N.decodeUTF8(e2.subarray(r2, e2.length));
          break;
        case R.signatureSubpacket.reasonForRevocation:
          this.reasonForRevocationFlag = e2[r2++], this.reasonForRevocationString = N.decodeUTF8(e2.subarray(r2, e2.length));
          break;
        case R.signatureSubpacket.features:
          this.features = [...e2.subarray(r2, e2.length)];
          break;
        case R.signatureSubpacket.signatureTarget: {
          this.signatureTargetPublicKeyAlgorithm = e2[r2++], this.signatureTargetHashAlgorithm = e2[r2++];
          const t3 = Fe(this.signatureTargetHashAlgorithm);
          this.signatureTargetHash = N.uint8ArrayToString(e2.subarray(r2, r2 + t3));
          break;
        }
        case R.signatureSubpacket.embeddedSignature:
          this.embeddedSignature = new _Ns(), this.embeddedSignature.read(e2.subarray(r2, e2.length));
          break;
        case R.signatureSubpacket.issuerFingerprint:
          this.issuerKeyVersion = e2[r2++], this.issuerFingerprint = e2.subarray(r2, e2.length), this.issuerKeyVersion >= 5 ? this.issuerKeyID.read(this.issuerFingerprint) : this.issuerKeyID.read(this.issuerFingerprint.subarray(-8));
          break;
        case R.signatureSubpacket.preferredAEADAlgorithms:
          this.preferredAEADAlgorithms = [...e2.subarray(r2, e2.length)];
          break;
        case R.signatureSubpacket.preferredCipherSuites:
          this.preferredCipherSuites = [];
          for (let t3 = r2; t3 < e2.length; t3 += 2) this.preferredCipherSuites.push([e2[t3], e2[t3 + 1]]);
          break;
        default:
          this.unknownSubpackets.push({ type: i2, critical: n2, body: e2.subarray(r2, e2.length) });
      }
    }
    readSubPackets(e2, t2 = true, r2) {
      const n2 = 6 === this.version ? 4 : 2, i2 = N.readNumber(e2.subarray(0, n2));
      let s2 = n2;
      for (; s2 < n2 + i2; ) {
        const n3 = et(e2.subarray(s2, e2.length));
        s2 += n3.offset, this.readSubPacket(e2.subarray(s2, s2 + n3.len), t2, r2), s2 += n3.len;
      }
      return s2;
    }
    toSign(e2, t2) {
      const r2 = R.signature;
      switch (e2) {
        case r2.binary:
          return null !== t2.text ? N.encodeUTF8(t2.getText(true)) : t2.getBytes(true);
        case r2.text: {
          const e3 = t2.getBytes(true);
          return N.canonicalizeEOL(e3);
        }
        case r2.standalone:
          return new Uint8Array(0);
        case r2.certGeneric:
        case r2.certPersona:
        case r2.certCasual:
        case r2.certPositive:
        case r2.certRevocation: {
          let e3, n2;
          if (t2.userID) n2 = 180, e3 = t2.userID;
          else {
            if (!t2.userAttribute) throw Error("Either a userID or userAttribute packet needs to be supplied for certification.");
            n2 = 209, e3 = t2.userAttribute;
          }
          const i2 = e3.write();
          return N.concat([this.toSign(r2.key, t2), new Uint8Array([n2]), N.writeNumber(i2.length, 4), i2]);
        }
        case r2.subkeyBinding:
        case r2.subkeyRevocation:
        case r2.keyBinding:
          return N.concat([this.toSign(r2.key, t2), this.toSign(r2.key, { key: t2.bind })]);
        case r2.key:
          if (void 0 === t2.key) throw Error("Key packet is required for this signature.");
          return t2.key.writeForHash(this.version);
        case r2.keyRevocation:
          return this.toSign(r2.key, t2);
        case r2.timestamp:
          return new Uint8Array(0);
        case r2.thirdParty:
          throw Error("Not implemented");
        default:
          throw Error("Unknown signature type.");
      }
    }
    calculateTrailer(e2, t2) {
      let r2 = 0;
      return b(B(this.signatureData), ((e3) => {
        r2 += e3.length;
      }), (() => {
        const n2 = [];
        return 5 !== this.version || this.signatureType !== R.signature.binary && this.signatureType !== R.signature.text || (t2 ? n2.push(new Uint8Array(6)) : n2.push(e2.writeHeader())), n2.push(new Uint8Array([this.version, 255])), 5 === this.version && n2.push(new Uint8Array(4)), n2.push(N.writeNumber(r2, 4)), N.concat(n2);
      }));
    }
    toHash(e2, t2, r2 = false) {
      const n2 = this.toSign(e2, t2);
      return N.concat([this.salt || new Uint8Array(), n2, this.signatureData, this.calculateTrailer(t2, r2)]);
    }
    async hash(e2, t2, r2, n2 = false) {
      if (6 === this.version && this.salt.length !== Os(this.hashAlgorithm)) throw Error("Signature salt does not have the expected length");
      return r2 || (r2 = this.toHash(e2, t2, n2)), Re(this.hashAlgorithm, r2);
    }
    async verify(e2, t2, r2, n2 = /* @__PURE__ */ new Date(), i2 = false, s2 = F) {
      if (!this.issuerKeyID.equals(e2.getKeyID())) throw Error("Signature was not issued by the given public key");
      if (this.publicKeyAlgorithm !== e2.algorithm) throw Error("Public key algorithm used to sign signature does not match issuer key algorithm.");
      const a2 = t2 === R.signature.binary || t2 === R.signature.text;
      if (!(this[Rs] && !a2)) {
        let n3, s3;
        if (this.hashed ? s3 = await this.hashed : (n3 = this.toHash(t2, r2, i2), s3 = await this.hash(t2, r2, n3)), s3 = await D(s3), this.signedHashValue[0] !== s3[0] || this.signedHashValue[1] !== s3[1]) throw Error("Signed digest did not match");
        if (this.params = await this.params, this[Rs] = await Di(this.publicKeyAlgorithm, this.hashAlgorithm, this.params, e2.publicParams, n3, s3), !this[Rs]) throw Error("Signature verification failed");
      }
      const o2 = N.normalizeDate(n2);
      if (o2 && this.created > o2) throw Error("Signature creation time is in the future");
      if (o2 && o2 >= this.getExpirationTime()) throw Error("Signature is expired");
      if (s2.rejectHashAlgorithms.has(this.hashAlgorithm)) throw Error("Insecure hash algorithm: " + R.read(R.hash, this.hashAlgorithm).toUpperCase());
      if (s2.rejectMessageHashAlgorithms.has(this.hashAlgorithm) && [R.signature.binary, R.signature.text].includes(this.signatureType)) throw Error("Insecure message hash algorithm: " + R.read(R.hash, this.hashAlgorithm).toUpperCase());
      if (this.unknownSubpackets.forEach((({ type: e3, critical: t3 }) => {
        if (t3) throw Error("Unknown critical signature subpacket type " + e3);
      })), this.rawNotations.forEach((({ name: e3, critical: t3 }) => {
        if (t3 && s2.knownNotations.indexOf(e3) < 0) throw Error("Unknown critical notation: " + e3);
      })), null !== this.revocationKeyClass) throw Error("This key is intended to be revoked with an authorized key, which OpenPGP.js does not support.");
    }
    isExpired(e2 = /* @__PURE__ */ new Date()) {
      const t2 = N.normalizeDate(e2);
      return null !== t2 && !(this.created <= t2 && t2 < this.getExpirationTime());
    }
    getExpirationTime() {
      return this.signatureNeverExpires ? 1 / 0 : new Date(this.created.getTime() + 1e3 * this.signatureExpirationTime);
    }
  };
  function Ls(e2, t2, r2) {
    const n2 = [];
    return n2.push(tt(r2.length + 1)), n2.push(new Uint8Array([(t2 ? 128 : 0) | e2])), n2.push(r2), N.concat(n2);
  }
  function Os(e2) {
    switch (e2) {
      case R.hash.sha256:
        return 16;
      case R.hash.sha384:
        return 24;
      case R.hash.sha512:
        return 32;
      case R.hash.sha224:
      case R.hash.sha3_256:
        return 16;
      case R.hash.sha3_512:
        return 32;
      default:
        throw Error("Unsupported hash function");
    }
  }
  var Hs = class _Hs {
    static get tag() {
      return R.packet.onePassSignature;
    }
    static fromSignaturePacket(e2, t2) {
      const r2 = new _Hs();
      return r2.version = 6 === e2.version ? 6 : 3, r2.signatureType = e2.signatureType, r2.hashAlgorithm = e2.hashAlgorithm, r2.publicKeyAlgorithm = e2.publicKeyAlgorithm, r2.issuerKeyID = e2.issuerKeyID, r2.salt = e2.salt, r2.issuerFingerprint = e2.issuerFingerprint, r2.flags = t2 ? 1 : 0, r2;
    }
    constructor() {
      this.version = null, this.signatureType = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.salt = null, this.issuerKeyID = null, this.issuerFingerprint = null, this.flags = null;
    }
    read(e2) {
      let t2 = 0;
      if (this.version = e2[t2++], 3 !== this.version && 6 !== this.version) throw new ot(`Version ${this.version} of the one-pass signature packet is unsupported.`);
      if (this.signatureType = e2[t2++], this.hashAlgorithm = e2[t2++], this.publicKeyAlgorithm = e2[t2++], 6 === this.version) {
        const r2 = e2[t2++];
        this.salt = e2.subarray(t2, t2 + r2), t2 += r2, this.issuerFingerprint = e2.subarray(t2, t2 + 32), t2 += 32, this.issuerKeyID = new Ms(), this.issuerKeyID.read(this.issuerFingerprint);
      } else this.issuerKeyID = new Ms(), this.issuerKeyID.read(e2.subarray(t2, t2 + 8)), t2 += 8;
      return this.flags = e2[t2++], this;
    }
    write() {
      const e2 = [new Uint8Array([this.version, this.signatureType, this.hashAlgorithm, this.publicKeyAlgorithm])];
      return 6 === this.version ? e2.push(new Uint8Array([this.salt.length]), this.salt, this.issuerFingerprint) : e2.push(this.issuerKeyID.write()), e2.push(new Uint8Array([this.flags])), N.concatUint8Array(e2);
    }
    calculateTrailer(...e2) {
      return P((async () => Ns.prototype.calculateTrailer.apply(await this.correspondingSig, e2)));
    }
    async verify() {
      const e2 = await this.correspondingSig;
      if (!e2 || e2.constructor.tag !== R.packet.signature) throw Error("Corresponding signature packet missing");
      if (e2.signatureType !== this.signatureType || e2.hashAlgorithm !== this.hashAlgorithm || e2.publicKeyAlgorithm !== this.publicKeyAlgorithm || !e2.issuerKeyID.equals(this.issuerKeyID) || 3 === this.version && 6 === e2.version || 6 === this.version && 6 !== e2.version || 6 === this.version && !N.equalsUint8Array(e2.issuerFingerprint, this.issuerFingerprint) || 6 === this.version && !N.equalsUint8Array(e2.salt, this.salt)) throw Error("Corresponding signature packet does not match one-pass signature packet");
      return e2.hashed = this.hashed, e2.verify.apply(e2, arguments);
    }
  };
  function zs(e2, t2) {
    if (!t2[e2]) {
      let t3;
      try {
        t3 = R.read(R.packet, e2);
      } catch {
        throw new ct("Unknown packet type with tag: " + e2);
      }
      throw Error("Packet not allowed in this context: " + t3);
    }
    return new t2[e2]();
  }
  Hs.prototype.hash = Ns.prototype.hash, Hs.prototype.toHash = Ns.prototype.toHash, Hs.prototype.toSign = Ns.prototype.toSign;
  var Gs = class _Gs extends Array {
    static async fromBinary(e2, t2, r2 = F, n2 = null, i2 = false) {
      const s2 = new _Gs();
      return await s2.read(e2, t2, r2, n2, i2), s2;
    }
    async read(e2, t2, r2 = F, n2 = null, i2 = false) {
      let s2;
      r2.additionalAllowedPackets.length && (s2 = N.constructAllowedPackets(r2.additionalAllowedPackets), t2 = { ...t2, ...s2 }), this.stream = v(e2, (async (e3, a3) => {
        const o2 = x(e3), c2 = Q(a3);
        try {
          let a4 = N.isStream(e3);
          for (; ; ) {
            let e4, u2;
            if (await c2.ready, await at(o2, a4, (async (a5) => {
              try {
                if (a5.tag === R.packet.marker || a5.tag === R.packet.trust || a5.tag === R.packet.padding) return;
                const e5 = zs(a5.tag, t2);
                try {
                  n2?.recordPacket(a5.tag, s2);
                } catch (e6) {
                  if (r2.enforceGrammar) throw e6;
                  N.printDebugError(e6);
                }
                e5.packets = new _Gs(), e5.fromStream = N.isStream(a5.packet), u2 = e5.fromStream;
                try {
                  await e5.read(a5.packet, r2);
                } catch (t3) {
                  if (!(t3 instanceof ot)) throw N.wrapError(new ut(`Parsing ${e5.constructor.name} failed`), t3);
                  throw t3;
                }
                await c2.write(e5);
              } catch (t3) {
                const n3 = t3 instanceof ct && a5.tag <= 39, s3 = t3 instanceof ot && !(t3 instanceof ct) && !r2.ignoreUnsupportedPackets, o3 = t3 instanceof ut && !r2.ignoreMalformedPackets, u3 = st(a5.tag);
                if (n3 || s3 || o3 || u3 || !(t3 instanceof ct || t3 instanceof ot || t3 instanceof ut)) i2 ? e4 = t3 : await c2.abort(t3);
                else {
                  const e5 = new ht(a5.tag, a5.packet);
                  await c2.write(e5);
                }
                N.printDebugError(t3);
              }
            })), u2 && (a4 = null), e4) throw await o2.readToEnd(), e4;
            const h2 = await o2.peekBytes(2);
            if (!h2 || !h2.length) {
              try {
                n2?.recordEnd();
              } catch (e5) {
                if (r2.enforceGrammar) throw e5;
                N.printDebugError(e5);
              }
              return await c2.ready, void await c2.close();
            }
          }
        } catch (e4) {
          await c2.abort(e4);
        }
      }));
      const a2 = x(this.stream);
      for (; ; ) {
        const { done: e3, value: t3 } = await a2.read();
        if (e3 ? this.stream = null : this.push(t3), e3 || st(t3.constructor.tag)) break;
      }
      a2.releaseLock();
    }
    write() {
      const e2 = [];
      for (let t2 = 0; t2 < this.length; t2++) {
        const r2 = this[t2] instanceof ht ? this[t2].tag : this[t2].constructor.tag, n2 = this[t2].write();
        if (N.isStream(n2) && st(this[t2].constructor.tag)) {
          let t3 = [], i2 = 0;
          const s2 = 512;
          e2.push(nt(r2)), e2.push(b(n2, ((e3) => {
            if (t3.push(e3), i2 += e3.length, i2 >= s2) {
              const e4 = Math.min(Math.log(i2) / Math.LN2 | 0, 30), r3 = 2 ** e4, n3 = N.concat([rt(e4)].concat(t3));
              return t3 = [n3.subarray(1 + r3)], i2 = t3[0].length, n3.subarray(0, 1 + r3);
            }
          }), (() => N.concat([tt(i2)].concat(t3)))));
        } else {
          if (N.isStream(n2)) {
            let t3 = 0;
            e2.push(b(B(n2), ((e3) => {
              t3 += e3.length;
            }), (() => it(r2, t3))));
          } else e2.push(it(r2, n2.length));
          e2.push(n2);
        }
      }
      return N.concat(e2);
    }
    filterByTag(...e2) {
      const t2 = new _Gs(), r2 = (e3) => (t3) => e3 === t3;
      for (let n2 = 0; n2 < this.length; n2++) e2.some(r2(this[n2].constructor.tag)) && t2.push(this[n2]);
      return t2;
    }
    findPacket(e2) {
      return this.find(((t2) => t2.constructor.tag === e2));
    }
    indexOfTag(...e2) {
      const t2 = [], r2 = this, n2 = (e3) => (t3) => e3 === t3;
      for (let i2 = 0; i2 < this.length; i2++) e2.some(n2(r2[i2].constructor.tag)) && t2.push(i2);
      return t2;
    }
  };
  var js = class _js extends Error {
    constructor(...e2) {
      super(...e2), Error.captureStackTrace && Error.captureStackTrace(this, _js), this.name = "GrammarError";
    }
  };
  var Vs;
  !(function(e2) {
    e2[e2.EmptyMessage = 0] = "EmptyMessage", e2[e2.PlaintextOrEncryptedData = 1] = "PlaintextOrEncryptedData", e2[e2.EncryptedSessionKeys = 2] = "EncryptedSessionKeys", e2[e2.StandaloneAdditionalAllowedData = 3] = "StandaloneAdditionalAllowedData";
  })(Vs || (Vs = {}));
  var qs = class {
    constructor() {
      this.state = Vs.EmptyMessage, this.leadingOnePassSignatureCounter = 0;
    }
    recordPacket(e2, t2) {
      switch (this.state) {
        case Vs.EmptyMessage:
        case Vs.StandaloneAdditionalAllowedData:
          switch (e2) {
            case R.packet.literalData:
            case R.packet.compressedData:
            case R.packet.aeadEncryptedData:
            case R.packet.symEncryptedIntegrityProtectedData:
            case R.packet.symmetricallyEncryptedData:
              return void (this.state = Vs.PlaintextOrEncryptedData);
            case R.packet.signature:
              if (this.state === Vs.StandaloneAdditionalAllowedData && --this.leadingOnePassSignatureCounter < 0) throw new js("Trailing signature packet without OPS");
              return;
            case R.packet.onePassSignature:
              if (this.state === Vs.StandaloneAdditionalAllowedData) throw new js("OPS following StandaloneAdditionalAllowedData");
              return void this.leadingOnePassSignatureCounter++;
            case R.packet.publicKeyEncryptedSessionKey:
            case R.packet.symEncryptedSessionKey:
              return void (this.state = Vs.EncryptedSessionKeys);
            default:
              if (!t2?.[e2]) throw new js(`Unexpected packet ${e2} in state ${this.state}`);
              return void (this.state = Vs.StandaloneAdditionalAllowedData);
          }
        case Vs.PlaintextOrEncryptedData:
          if (e2 === R.packet.signature) {
            if (--this.leadingOnePassSignatureCounter < 0) throw new js("Trailing signature packet without OPS");
            return void (this.state = Vs.PlaintextOrEncryptedData);
          }
          if (!t2?.[e2]) throw new js(`Unexpected packet ${e2} in state ${this.state}`);
          return void (this.state = Vs.PlaintextOrEncryptedData);
        case Vs.EncryptedSessionKeys:
          switch (e2) {
            case R.packet.publicKeyEncryptedSessionKey:
            case R.packet.symEncryptedSessionKey:
              return void (this.state = Vs.EncryptedSessionKeys);
            case R.packet.symEncryptedIntegrityProtectedData:
            case R.packet.aeadEncryptedData:
            case R.packet.symmetricallyEncryptedData:
              return void (this.state = Vs.PlaintextOrEncryptedData);
            case R.packet.signature:
              if (--this.leadingOnePassSignatureCounter < 0) throw new js("Trailing signature packet without OPS");
              return void (this.state = Vs.PlaintextOrEncryptedData);
            default:
              if (!t2?.[e2]) throw new js(`Unexpected packet ${e2} in state ${this.state}`);
              this.state = Vs.EncryptedSessionKeys;
          }
      }
    }
    recordEnd() {
      switch (this.state) {
        case Vs.EmptyMessage:
        case Vs.PlaintextOrEncryptedData:
        case Vs.EncryptedSessionKeys:
        case Vs.StandaloneAdditionalAllowedData:
          if (this.leadingOnePassSignatureCounter > 0) throw new js("Missing trailing signature packets");
      }
    }
  };
  var _s = /* @__PURE__ */ N.constructAllowedPackets([Qs, Hs, Ns]);
  var Ys = class {
    static get tag() {
      return R.packet.compressedData;
    }
    constructor(e2 = F) {
      this.packets = null, this.algorithm = e2.preferredCompressionAlgorithm, this.compressed = null;
    }
    async read(e2, t2 = F) {
      await I(e2, (async (e3) => {
        this.algorithm = await e3.readByte(), this.compressed = e3.remainder(), await this.decompress(t2);
      }));
    }
    write() {
      return null === this.compressed && this.compress(), N.concat([new Uint8Array([this.algorithm]), this.compressed]);
    }
    async decompress(e2 = F) {
      const t2 = R.read(R.compression, this.algorithm), r2 = $s[t2];
      if (!r2) throw Error(t2 + " decompression not supported");
      let n2 = await r2(this.compressed, e2);
      if (e2.maxDecompressedMessageSize !== 1 / 0) {
        let t3 = 0;
        n2 = b(n2, ((r3) => {
          if (t3 += r3.length, t3 > e2.maxDecompressedMessageSize) throw Error("Maximum decompressed message size exceeded");
          return r3;
        }));
      }
      u(this.compressed) && !o(this.compressed) || (n2 = await D(n2)), this.packets = await Gs.fromBinary(n2, _s, e2, new qs());
    }
    compress() {
      const e2 = R.read(R.compression, this.algorithm), t2 = Xs[e2];
      if (!t2) throw Error(e2 + " compression not supported");
      const r2 = this.packets.write();
      let n2 = t2(r2);
      u(r2) && !o(r2) || (n2 = P((() => D(n2)))), this.compressed = n2;
    }
  };
  function Zs(e2, t2) {
    return (r2, n2) => {
      let i2;
      if (i2 = o(r2) ? new ReadableStream({ async start(e3) {
        try {
          e3.enqueue(await D(r2)), e3.close();
        } catch (t3) {
          e3.error(t3);
        }
      } }) : u(r2) ? r2 : p(r2), i2 = (function(e3) {
        const t3 = x(e3);
        return new ReadableStream({ async pull(e4) {
          try {
            const { value: r3, done: n3 } = await t3.read();
            if (n3) return void e4.close();
            for (let t4 = 0; t4 <= r3.length; t4 += 65536) (!t4 || t4 < r3.length) && e4.enqueue(r3.subarray(t4, t4 + 65536));
          } catch (t4) {
            e4.error(t4);
          }
        } }, { highWaterMark: 0 });
      })(i2), e2) try {
        const t3 = e2();
        return i2.pipeThrough(t3);
      } catch (e3) {
        if ("TypeError" !== e3.name) throw e3;
      }
      const s2 = x(i2), a2 = new t2();
      let c2 = false, h2 = false;
      return new ReadableStream({ start(e3) {
        a2.ondata = (t3, r3) => {
          e3.enqueue(t3), c2 = true, r3 && (e3.close(), h2 = true);
        };
      }, async pull() {
        for (c2 = false; !c2 && !h2; ) {
          const { done: e3, value: t3 } = await s2.read();
          if (e3) return void a2.push(new Uint8Array(), true);
          t3.length && a2.push(t3);
        }
      } }, { highWaterMark: 0 });
    };
  }
  function Js() {
    return async function(e2, t2) {
      const { default: r2 } = await Promise.resolve().then((function() {
        return Wy;
      }));
      return r2(p(e2), t2.maxDecompressedMessageSize);
    };
  }
  var Ws = (e2) => ({ compressor: "undefined" != typeof CompressionStream && (() => new CompressionStream(e2)), decompressor: "undefined" != typeof DecompressionStream && (() => new DecompressionStream(e2)) });
  var Xs = { zip: /* @__PURE__ */ Zs(Ws("deflate-raw").compressor, Cs), zlib: /* @__PURE__ */ Zs(Ws("deflate").compressor, Us) };
  var $s = { uncompressed: (e2, t2) => e2, zip: /* @__PURE__ */ Zs(Ws("deflate-raw").decompressor, Ds), zlib: /* @__PURE__ */ Zs(Ws("deflate").decompressor, Ps), bzip2: /* @__PURE__ */ Js() };
  function ea(e2, t2, r2) {
    if ("function" == typeof e2.setBigUint64) return e2.setBigUint64(t2, BigInt(r2));
    if (r2 <= 4294967295) e2.setUint32(t2, 0), e2.setUint32(t2 + 4, r2);
    else {
      const n2 = BigInt(r2);
      e2.setUint32(t2, Number(n2 >> BigInt(32))), e2.setUint32(t2 + 4, Number(n2 & BigInt(4294967295)));
    }
  }
  var ta = /* @__PURE__ */ N.constructAllowedPackets([Qs, Ys, Hs, Ns]);
  var ra = class _ra {
    static get tag() {
      return R.packet.symEncryptedIntegrityProtectedData;
    }
    static fromObject({ version: e2, aeadAlgorithm: t2 }) {
      if (1 !== e2 && 2 !== e2) throw Error("Unsupported SEIPD version");
      const r2 = new _ra();
      return r2.version = e2, 2 === e2 && (r2.aeadAlgorithm = t2), r2;
    }
    constructor() {
      this.version = null, this.cipherAlgorithm = null, this.aeadAlgorithm = null, this.chunkSizeByte = null, this.salt = null, this.encrypted = null, this.packets = null;
    }
    async read(e2) {
      await I(e2, (async (e3) => {
        if (this.version = await e3.readByte(), 1 !== this.version && 2 !== this.version) throw new ot(`Version ${this.version} of the SEIP packet is unsupported.`);
        2 === this.version && (this.cipherAlgorithm = await e3.readByte(), this.aeadAlgorithm = await e3.readByte(), this.chunkSizeByte = await e3.readByte(), this.salt = await e3.readBytes(32)), this.encrypted = e3.remainder();
      }));
    }
    write() {
      return 2 === this.version ? N.concat([new Uint8Array([this.version, this.cipherAlgorithm, this.aeadAlgorithm, this.chunkSizeByte]), this.salt, this.encrypted]) : N.concat([new Uint8Array([this.version]), this.encrypted]);
    }
    async encrypt(e2, t2, r2 = F) {
      const { blockSize: n2, keySize: i2 } = Kr(e2);
      if (t2.length !== i2) throw Error("Unexpected session key size");
      let s2 = this.packets.write();
      if (o(s2) && (s2 = await D(s2)), 2 === this.version) this.cipherAlgorithm = e2, this.salt = pe(32), this.chunkSizeByte = r2.aeadChunkSizeByte, this.encrypted = await na(this, "encrypt", t2, s2);
      else {
        const r3 = await Gn(e2), i3 = new Uint8Array([211, 20]), a2 = N.concat([r3, s2, i3]), o2 = await Re(R.hash.sha1, S(a2)), c2 = N.concat([a2, o2]);
        this.encrypted = await jn(e2, t2, c2, new Uint8Array(n2));
      }
      return true;
    }
    async decrypt(e2, t2, r2 = F) {
      if (t2.length !== Kr(e2).keySize) throw Error("Unexpected session key size");
      let n2, i2 = B(this.encrypted);
      o(i2) && (i2 = await D(i2));
      let s2 = false;
      if (2 === this.version) {
        if (this.cipherAlgorithm !== e2) throw Error("Unexpected session key algorithm");
        n2 = await na(this, "decrypt", t2, i2);
      } else {
        const { blockSize: a2 } = Kr(e2), o2 = await Vn(e2, t2, i2, new Uint8Array(a2)), c2 = C(S(o2), -20), u2 = C(o2, 0, -20), h2 = Promise.all([D(await Re(R.hash.sha1, S(u2))), D(c2)]).then((([e3, t3]) => {
          if (!N.equalsUint8Array(e3, t3)) throw Error("Modification detected.");
          return new Uint8Array();
        })), f2 = C(u2, a2 + 2);
        n2 = C(f2, 0, -2), n2 = A([n2, P((() => h2))]), N.isStream(i2) && r2.allowUnauthenticatedStream ? s2 = true : n2 = await D(n2);
      }
      return this.packets = await Gs.fromBinary(n2, ta, r2, new qs(), s2), true;
    }
  };
  async function na(e2, t2, r2, n2) {
    const i2 = e2 instanceof ra && 2 === e2.version, s2 = !i2 && e2.constructor.tag === R.packet.aeadEncryptedData;
    if (!i2 && !s2) throw Error("Unexpected packet type");
    const a2 = Ci(e2.aeadAlgorithm, s2), o2 = "decrypt" === t2 ? a2.tagLength : 0, c2 = "encrypt" === t2 ? a2.tagLength : 0, u2 = 2 ** (e2.chunkSizeByte + 6) + o2, h2 = s2 ? 8 : 0, f2 = new ArrayBuffer(13 + h2), l2 = new Uint8Array(f2, 0, 5 + h2), y2 = new Uint8Array(f2), g2 = new DataView(f2), p2 = new Uint8Array(f2, 5, 8);
    l2.set([192 | e2.constructor.tag, e2.version, e2.cipherAlgorithm, e2.aeadAlgorithm, e2.chunkSizeByte], 0);
    let d2, A2, m2 = 0, b2 = Promise.resolve(), k2 = 0, E2 = 0;
    if (i2) {
      const { keySize: t3 } = Kr(e2.cipherAlgorithm), { ivLength: n3 } = a2, i3 = new Uint8Array(f2, 0, 5), s3 = await Pr(R.hash.sha256, r2, e2.salt, i3, t3 + n3);
      r2 = s3.subarray(0, t3), d2 = s3.subarray(t3), d2.fill(0, d2.length - 8), A2 = new DataView(d2.buffer, d2.byteOffset, d2.byteLength);
    } else d2 = e2.iv;
    const I2 = await a2(e2.cipherAlgorithm, r2);
    return v(n2, (async (r3, n3) => {
      if ("array" !== N.isStream(r3)) {
        const t3 = new TransformStream({}, { highWaterMark: N.getHardwareConcurrency() * 2 ** (e2.chunkSizeByte + 6), size: (e3) => e3.length });
        w(t3.readable, n3), n3 = t3.writable;
      }
      const s3 = x(r3), a3 = Q(n3);
      try {
        for (; ; ) {
          let e3 = await s3.readBytes(u2 + o2) || new Uint8Array();
          const r4 = e3.subarray(e3.length - o2);
          let n4, f3, w2;
          if (e3 = e3.subarray(0, e3.length - o2), i2) w2 = d2;
          else {
            w2 = d2.slice();
            for (let e4 = 0; e4 < 8; e4++) w2[d2.length - 8 + e4] ^= p2[e4];
          }
          if (!m2 || e3.length ? (s3.unshift(r4), n4 = I2[t2](e3, w2, l2), n4.catch((() => {
          })), E2 += e3.length - o2 + c2) : (ea(g2, 5 + h2, k2), n4 = I2[t2](r4, w2, y2), n4.catch((() => {
          })), E2 += c2, f3 = true), k2 += e3.length - o2, b2 = b2.then((() => n4)).then((async (e4) => {
            await a3.ready, await a3.write(e4), E2 -= e4.length;
          })).catch(((e4) => a3.abort(e4))), (f3 || E2 > a3.desiredSize) && await b2, f3) {
            await a3.close();
            break;
          }
          i2 ? ea(A2, d2.length - 8, ++m2) : ea(g2, 5, ++m2);
        }
      } catch (e3) {
        await a3.ready.catch((() => {
        })), await a3.abort(e3);
      }
    }));
  }
  var aa = class _aa {
    static get tag() {
      return R.packet.publicKeyEncryptedSessionKey;
    }
    constructor() {
      this.version = null, this.publicKeyID = new Ms(), this.publicKeyVersion = null, this.publicKeyFingerprint = null, this.publicKeyAlgorithm = null, this.sessionKey = null, this.sessionKeyAlgorithm = null, this.encrypted = {};
    }
    static fromObject({ version: e2, encryptionKeyPacket: t2, anonymousRecipient: r2, sessionKey: n2, sessionKeyAlgorithm: i2 }) {
      const s2 = new _aa();
      if (3 !== e2 && 6 !== e2) throw Error("Unsupported PKESK version");
      return s2.version = e2, 6 === e2 && (s2.publicKeyVersion = r2 ? null : t2.version, s2.publicKeyFingerprint = r2 ? null : t2.getFingerprintBytes()), s2.publicKeyID = r2 ? Ms.wildcard() : t2.getKeyID(), s2.publicKeyAlgorithm = t2.algorithm, s2.sessionKey = n2, s2.sessionKeyAlgorithm = i2, s2;
    }
    read(e2) {
      let t2 = 0;
      if (this.version = e2[t2++], 3 !== this.version && 6 !== this.version) throw new ot(`Version ${this.version} of the PKESK packet is unsupported.`);
      if (6 === this.version) {
        const r2 = e2[t2++];
        if (r2) {
          this.publicKeyVersion = e2[t2++];
          const n2 = r2 - 1;
          this.publicKeyFingerprint = e2.subarray(t2, t2 + n2), t2 += n2, this.publicKeyVersion >= 5 ? this.publicKeyID.read(this.publicKeyFingerprint) : this.publicKeyID.read(this.publicKeyFingerprint.subarray(-8));
        } else this.publicKeyID = Ms.wildcard();
      } else t2 += this.publicKeyID.read(e2.subarray(t2, t2 + 8));
      if (this.publicKeyAlgorithm = e2[t2++], this.encrypted = (function(e3, t3) {
        let r2 = 0;
        switch (e3) {
          case R.publicKey.rsaEncrypt:
          case R.publicKey.rsaEncryptSign:
            return { c: N.readMPI(t3.subarray(r2)) };
          case R.publicKey.elgamal: {
            const e4 = N.readMPI(t3.subarray(r2));
            return r2 += e4.length + 2, { c1: e4, c2: N.readMPI(t3.subarray(r2)) };
          }
          case R.publicKey.ecdh: {
            const e4 = N.readMPI(t3.subarray(r2));
            r2 += e4.length + 2;
            const n2 = new Kn();
            return n2.read(t3.subarray(r2)), { V: e4, C: n2 };
          }
          case R.publicKey.x25519:
          case R.publicKey.x448: {
            const n2 = Nn(e3), i2 = N.readExactSubarray(t3, r2, r2 + n2);
            r2 += i2.length;
            const s2 = new Dn();
            return s2.read(t3.subarray(r2)), { ephemeralPublicKey: i2, C: s2 };
          }
          default:
            throw new ot("Unknown public key encryption algorithm.");
        }
      })(this.publicKeyAlgorithm, e2.subarray(t2)), this.publicKeyAlgorithm === R.publicKey.x25519 || this.publicKeyAlgorithm === R.publicKey.x448) {
        if (3 === this.version) this.sessionKeyAlgorithm = R.write(R.symmetric, this.encrypted.C.algorithm);
        else if (null !== this.encrypted.C.algorithm) throw Error("Unexpected cleartext symmetric algorithm");
      }
    }
    write() {
      const e2 = [new Uint8Array([this.version])];
      return 6 === this.version ? null !== this.publicKeyFingerprint ? (e2.push(new Uint8Array([this.publicKeyFingerprint.length + 1, this.publicKeyVersion])), e2.push(this.publicKeyFingerprint)) : e2.push(new Uint8Array([0])) : e2.push(this.publicKeyID.write()), e2.push(new Uint8Array([this.publicKeyAlgorithm]), Qn(this.publicKeyAlgorithm, this.encrypted)), N.concatUint8Array(e2);
    }
    async encrypt(e2) {
      const t2 = R.write(R.publicKey, this.publicKeyAlgorithm), r2 = 3 === this.version ? this.sessionKeyAlgorithm : null, n2 = 5 === e2.version ? e2.getFingerprintBytes().subarray(0, 20) : e2.getFingerprintBytes(), i2 = oa(this.version, t2, r2, this.sessionKey);
      this.encrypted = await Un(t2, r2, e2.publicParams, i2, n2);
    }
    async decrypt(e2, t2) {
      if (this.publicKeyAlgorithm !== e2.algorithm) throw Error("Decryption error");
      const r2 = t2 ? oa(this.version, this.publicKeyAlgorithm, t2.sessionKeyAlgorithm, t2.sessionKey) : null, n2 = 5 === e2.version ? e2.getFingerprintBytes().subarray(0, 20) : e2.getFingerprintBytes(), i2 = await Pn(this.publicKeyAlgorithm, e2.publicParams, e2.privateParams, this.encrypted, n2, r2), { sessionKey: s2, sessionKeyAlgorithm: a2 } = (function(e3, t3, r3, n3) {
        switch (t3) {
          case R.publicKey.rsaEncrypt:
          case R.publicKey.rsaEncryptSign:
          case R.publicKey.elgamal:
          case R.publicKey.ecdh: {
            const t4 = r3.subarray(0, r3.length - 2), i3 = r3.subarray(r3.length - 2), s3 = N.writeChecksum(t4.subarray(t4.length % 8)), a3 = s3[0] === i3[0] & s3[1] === i3[1], o2 = 6 === e3 ? { sessionKeyAlgorithm: null, sessionKey: t4 } : { sessionKeyAlgorithm: t4[0], sessionKey: t4.subarray(1) };
            if (n3) {
              const t5 = a3 & o2.sessionKeyAlgorithm === n3.sessionKeyAlgorithm & o2.sessionKey.length === n3.sessionKey.length;
              return { sessionKey: N.selectUint8Array(t5, o2.sessionKey, n3.sessionKey), sessionKeyAlgorithm: 6 === e3 ? null : N.selectUint8(t5, o2.sessionKeyAlgorithm, n3.sessionKeyAlgorithm) };
            }
            if (a3 && (6 === e3 || R.read(R.symmetric, o2.sessionKeyAlgorithm))) return o2;
            throw Error("Decryption error");
          }
          case R.publicKey.x25519:
          case R.publicKey.x448:
            return { sessionKeyAlgorithm: null, sessionKey: r3 };
          default:
            throw Error("Unsupported public key algorithm");
        }
      })(this.version, this.publicKeyAlgorithm, i2, t2);
      if (3 === this.version) {
        const e3 = this.publicKeyAlgorithm !== R.publicKey.x25519 && this.publicKeyAlgorithm !== R.publicKey.x448;
        if (this.sessionKeyAlgorithm = e3 ? a2 : this.sessionKeyAlgorithm, s2.length !== Kr(this.sessionKeyAlgorithm).keySize) throw Error("Unexpected session key size");
      }
      this.sessionKey = s2;
    }
  };
  function oa(e2, t2, r2, n2) {
    switch (t2) {
      case R.publicKey.rsaEncrypt:
      case R.publicKey.rsaEncryptSign:
      case R.publicKey.elgamal:
      case R.publicKey.ecdh:
        return N.concatUint8Array([new Uint8Array(6 === e2 ? [] : [r2]), n2, N.writeChecksum(n2.subarray(n2.length % 8))]);
      case R.publicKey.x25519:
      case R.publicKey.x448:
        return n2;
      default:
        throw Error("Unsupported public key algorithm");
    }
  }
  var ca = class _ca {
    static get tag() {
      return R.packet.symEncryptedSessionKey;
    }
    constructor(e2 = F) {
      this.version = e2.aeadProtect ? 6 : 4, this.sessionKey = null, this.sessionKeyEncryptionAlgorithm = null, this.sessionKeyAlgorithm = null, this.aeadAlgorithm = R.write(R.aead, e2.preferredAEADAlgorithm), this.encrypted = null, this.s2k = null, this.iv = null;
    }
    read(e2) {
      let t2 = 0;
      if (this.version = e2[t2++], 4 !== this.version && 5 !== this.version && 6 !== this.version) throw new ot(`Version ${this.version} of the SKESK packet is unsupported.`);
      6 === this.version && t2++;
      const r2 = e2[t2++];
      this.version >= 5 && (this.aeadAlgorithm = e2[t2++], 6 === this.version && t2++);
      const n2 = e2[t2++];
      if (this.s2k = Ti(n2), t2 += this.s2k.read(e2.subarray(t2, e2.length)), this.version >= 5) {
        const r3 = Ci(this.aeadAlgorithm, true);
        this.iv = e2.subarray(t2, t2 += r3.ivLength);
      }
      this.version >= 5 || t2 < e2.length ? (this.encrypted = e2.subarray(t2, e2.length), this.sessionKeyEncryptionAlgorithm = r2) : this.sessionKeyAlgorithm = r2;
    }
    write() {
      const e2 = null === this.encrypted ? this.sessionKeyAlgorithm : this.sessionKeyEncryptionAlgorithm;
      let t2;
      const r2 = this.s2k.write();
      if (6 === this.version) {
        const n2 = r2.length, i2 = 3 + n2 + this.iv.length;
        t2 = N.concatUint8Array([new Uint8Array([this.version, i2, e2, this.aeadAlgorithm, n2]), r2, this.iv, this.encrypted]);
      } else 5 === this.version ? t2 = N.concatUint8Array([new Uint8Array([this.version, e2, this.aeadAlgorithm]), r2, this.iv, this.encrypted]) : (t2 = N.concatUint8Array([new Uint8Array([this.version, e2]), r2]), null !== this.encrypted && (t2 = N.concatUint8Array([t2, this.encrypted])));
      return t2;
    }
    async decrypt(e2, t2 = F) {
      const r2 = null !== this.sessionKeyEncryptionAlgorithm ? this.sessionKeyEncryptionAlgorithm : this.sessionKeyAlgorithm, { blockSize: n2, keySize: i2 } = Kr(r2), s2 = await this.s2k.produceKey(e2, i2, t2);
      if (this.version >= 5) {
        const e3 = Ci(this.aeadAlgorithm, true), t3 = new Uint8Array([192 | _ca.tag, this.version, this.sessionKeyEncryptionAlgorithm, this.aeadAlgorithm]), n3 = 6 === this.version ? await Pr(R.hash.sha256, s2, new Uint8Array(), t3, i2) : s2, a2 = await e3(r2, n3);
        this.sessionKey = await a2.decrypt(this.encrypted, this.iv, t3);
      } else if (null !== this.encrypted) {
        const e3 = await Vn(r2, s2, this.encrypted, new Uint8Array(n2));
        if (this.sessionKeyAlgorithm = R.write(R.symmetric, e3[0]), this.sessionKey = e3.subarray(1, e3.length), this.sessionKey.length !== Kr(this.sessionKeyAlgorithm).keySize) throw Error("Unexpected session key size");
      } else this.sessionKey = s2;
    }
    async encrypt(e2, t2 = F) {
      const r2 = null !== this.sessionKeyEncryptionAlgorithm ? this.sessionKeyEncryptionAlgorithm : this.sessionKeyAlgorithm;
      this.sessionKeyEncryptionAlgorithm = r2, this.s2k = Ni(t2), this.s2k.generateSalt();
      const { blockSize: n2, keySize: i2 } = Kr(r2), s2 = await this.s2k.produceKey(e2, i2, t2);
      if (null === this.sessionKey && (this.sessionKey = Fn(this.sessionKeyAlgorithm)), this.version >= 5) {
        const e3 = Ci(this.aeadAlgorithm);
        this.iv = pe(e3.ivLength);
        const t3 = new Uint8Array([192 | _ca.tag, this.version, this.sessionKeyEncryptionAlgorithm, this.aeadAlgorithm]), n3 = 6 === this.version ? await Pr(R.hash.sha256, s2, new Uint8Array(), t3, i2) : s2, a2 = await e3(r2, n3);
        this.encrypted = await a2.encrypt(this.sessionKey, this.iv, t3);
      } else {
        const e3 = N.concatUint8Array([new Uint8Array([this.sessionKeyAlgorithm]), this.sessionKey]);
        this.encrypted = await jn(r2, s2, e3, new Uint8Array(n2));
      }
    }
  };
  var ua = class _ua {
    static get tag() {
      return R.packet.publicKey;
    }
    constructor(e2 = /* @__PURE__ */ new Date(), t2 = F) {
      this.version = t2.v6Keys ? 6 : 4, this.created = N.normalizeDate(e2), this.algorithm = null, this.publicParams = null, this.expirationTimeV3 = 0, this.fingerprint = null, this.keyID = null;
    }
    static fromSecretKeyPacket(e2) {
      const t2 = new _ua(), { version: r2, created: n2, algorithm: i2, publicParams: s2, keyID: a2, fingerprint: o2 } = e2;
      return t2.version = r2, t2.created = n2, t2.algorithm = i2, t2.publicParams = s2, t2.keyID = a2, t2.fingerprint = o2, t2;
    }
    async read(e2, t2 = F) {
      let r2 = 0;
      if (this.version = e2[r2++], 5 === this.version && !t2.enableParsingV5Entities) throw new ot("Support for parsing v5 entities is disabled; turn on `config.enableParsingV5Entities` if needed");
      if (4 === this.version || 5 === this.version || 6 === this.version) {
        this.created = N.readDate(e2.subarray(r2, r2 + 4)), r2 += 4, this.algorithm = e2[r2++], this.version >= 5 && (r2 += 4);
        const { read: t3, publicParams: n2 } = (function(e3, t4) {
          let r3 = 0;
          switch (e3) {
            case R.publicKey.rsaEncrypt:
            case R.publicKey.rsaEncryptSign:
            case R.publicKey.rsaSign: {
              const e4 = N.readMPI(t4.subarray(r3));
              r3 += e4.length + 2;
              const n3 = N.readMPI(t4.subarray(r3));
              return r3 += n3.length + 2, { read: r3, publicParams: { n: e4, e: n3 } };
            }
            case R.publicKey.dsa: {
              const e4 = N.readMPI(t4.subarray(r3));
              r3 += e4.length + 2;
              const n3 = N.readMPI(t4.subarray(r3));
              r3 += n3.length + 2;
              const i2 = N.readMPI(t4.subarray(r3));
              r3 += i2.length + 2;
              const s2 = N.readMPI(t4.subarray(r3));
              return r3 += s2.length + 2, { read: r3, publicParams: { p: e4, q: n3, g: i2, y: s2 } };
            }
            case R.publicKey.elgamal: {
              const e4 = N.readMPI(t4.subarray(r3));
              r3 += e4.length + 2;
              const n3 = N.readMPI(t4.subarray(r3));
              r3 += n3.length + 2;
              const i2 = N.readMPI(t4.subarray(r3));
              return r3 += i2.length + 2, { read: r3, publicParams: { p: e4, g: n3, y: i2 } };
            }
            case R.publicKey.ecdsa: {
              const e4 = new $e();
              r3 += e4.read(t4), Tn(e4);
              const n3 = N.readMPI(t4.subarray(r3));
              return r3 += n3.length + 2, { read: r3, publicParams: { oid: e4, Q: n3 } };
            }
            case R.publicKey.eddsaLegacy: {
              const e4 = new $e();
              if (r3 += e4.read(t4), Tn(e4), e4.getName() !== R.curve.ed25519Legacy) throw Error("Unexpected OID for eddsaLegacy");
              let n3 = N.readMPI(t4.subarray(r3));
              return r3 += n3.length + 2, n3 = N.leftPad(n3, 33), { read: r3, publicParams: { oid: e4, Q: n3 } };
            }
            case R.publicKey.ecdh: {
              const e4 = new $e();
              r3 += e4.read(t4), Tn(e4);
              const n3 = N.readMPI(t4.subarray(r3));
              r3 += n3.length + 2;
              const i2 = new Cn();
              return r3 += i2.read(t4.subarray(r3)), { read: r3, publicParams: { oid: e4, Q: n3, kdfParams: i2 } };
            }
            case R.publicKey.ed25519:
            case R.publicKey.ed448:
            case R.publicKey.x25519:
            case R.publicKey.x448: {
              const n3 = N.readExactSubarray(t4, r3, r3 + Nn(e3));
              return r3 += n3.length, { read: r3, publicParams: { A: n3 } };
            }
            default:
              throw new ot("Unknown public key encryption algorithm.");
          }
        })(this.algorithm, e2.subarray(r2));
        if (6 === this.version && n2.oid && (n2.oid.getName() === R.curve.curve25519Legacy || n2.oid.getName() === R.curve.ed25519Legacy)) throw Error("Legacy curve25519 cannot be used with v6 keys");
        return this.publicParams = n2, r2 += t3, await this.computeFingerprintAndKeyID(), r2;
      }
      throw new ot(`Version ${this.version} of the key packet is unsupported.`);
    }
    write() {
      const e2 = [];
      e2.push(new Uint8Array([this.version])), e2.push(N.writeDate(this.created)), e2.push(new Uint8Array([this.algorithm]));
      const t2 = Qn(this.algorithm, this.publicParams);
      return this.version >= 5 && e2.push(N.writeNumber(t2.length, 4)), e2.push(t2), N.concatUint8Array(e2);
    }
    writeForHash(e2) {
      const t2 = this.writePublicKey(), r2 = 149 + e2, n2 = e2 >= 5 ? 4 : 2;
      return N.concatUint8Array([new Uint8Array([r2]), N.writeNumber(t2.length, n2), t2]);
    }
    isDecrypted() {
      return null;
    }
    getCreationTime() {
      return this.created;
    }
    getKeyID() {
      return this.keyID;
    }
    async computeFingerprintAndKeyID() {
      if (await this.computeFingerprint(), this.keyID = new Ms(), this.version >= 5) this.keyID.read(this.fingerprint.subarray(0, 8));
      else {
        if (4 !== this.version) throw Error("Unsupported key version");
        this.keyID.read(this.fingerprint.subarray(12, 20));
      }
    }
    async computeFingerprint() {
      const e2 = this.writeForHash(this.version);
      if (this.version >= 5) this.fingerprint = await Re(R.hash.sha256, e2);
      else {
        if (4 !== this.version) throw Error("Unsupported key version");
        this.fingerprint = await Re(R.hash.sha1, e2);
      }
    }
    getFingerprintBytes() {
      return this.fingerprint;
    }
    getFingerprint() {
      return N.uint8ArrayToHex(this.getFingerprintBytes());
    }
    hasSameFingerprintAs(e2) {
      return this.version === e2.version && N.equalsUint8Array(this.writePublicKey(), e2.writePublicKey());
    }
    getAlgorithmInfo() {
      const e2 = {};
      e2.algorithm = R.read(R.publicKey, this.algorithm);
      const t2 = this.publicParams.n || this.publicParams.p;
      return t2 ? e2.bits = N.uint8ArrayBitLength(t2) : this.publicParams.oid && (e2.curve = this.publicParams.oid.getName()), e2;
    }
  };
  ua.prototype.readPublicKey = ua.prototype.read, ua.prototype.writePublicKey = ua.prototype.write;
  var ya = class _ya extends ua {
    static get tag() {
      return R.packet.publicSubkey;
    }
    constructor(e2, t2) {
      super(e2, t2);
    }
    static fromSecretSubkeyPacket(e2) {
      const t2 = new _ya(), { version: r2, created: n2, algorithm: i2, publicParams: s2, keyID: a2, fingerprint: o2 } = e2;
      return t2.version = r2, t2.created = n2, t2.algorithm = i2, t2.publicParams = s2, t2.keyID = a2, t2.fingerprint = o2, t2;
    }
  };
  var ga = class _ga {
    static get tag() {
      return R.packet.userAttribute;
    }
    constructor() {
      this.attributes = [];
    }
    read(e2) {
      let t2 = 0;
      for (; t2 < e2.length; ) {
        const r2 = et(e2.subarray(t2, e2.length));
        t2 += r2.offset, this.attributes.push(N.uint8ArrayToString(e2.subarray(t2, t2 + r2.len))), t2 += r2.len;
      }
    }
    write() {
      const e2 = [];
      for (let t2 = 0; t2 < this.attributes.length; t2++) e2.push(tt(this.attributes[t2].length)), e2.push(N.stringToUint8Array(this.attributes[t2]));
      return N.concatUint8Array(e2);
    }
    equals(e2) {
      return !!(e2 && e2 instanceof _ga) && this.attributes.every((function(t2, r2) {
        return t2 === e2.attributes[r2];
      }));
    }
  };
  var pa = class extends ua {
    static get tag() {
      return R.packet.secretKey;
    }
    constructor(e2 = /* @__PURE__ */ new Date(), t2 = F) {
      super(e2, t2), this.keyMaterial = null, this.isEncrypted = null, this.s2kUsage = 0, this.s2k = null, this.symmetric = null, this.aead = null, this.isLegacyAEAD = null, this.privateParams = null, this.usedModernAEAD = null;
    }
    async read(e2, t2 = F) {
      let r2 = await this.readPublicKey(e2, t2);
      const n2 = r2;
      this.s2kUsage = e2[r2++], 5 === this.version && r2++, 6 === this.version && this.s2kUsage && r2++;
      try {
        if (255 === this.s2kUsage || 254 === this.s2kUsage || 253 === this.s2kUsage) {
          this.symmetric = e2[r2++], 253 === this.s2kUsage && (this.aead = e2[r2++]), 6 === this.version && r2++;
          const t3 = e2[r2++];
          if (this.s2k = Ti(t3), r2 += this.s2k.read(e2.subarray(r2, e2.length)), "gnu-dummy" === this.s2k.type) return;
        } else this.s2kUsage && (this.symmetric = this.s2kUsage);
        this.s2kUsage && (this.isLegacyAEAD = 253 === this.s2kUsage && (5 === this.version || 4 === this.version && t2.parseAEADEncryptedV4KeysAsLegacy), 253 !== this.s2kUsage || this.isLegacyAEAD ? (this.iv = e2.subarray(r2, r2 + Kr(this.symmetric).blockSize), this.usedModernAEAD = false) : (this.iv = e2.subarray(r2, r2 + Ci(this.aead).ivLength), this.usedModernAEAD = true), r2 += this.iv.length);
      } catch (t3) {
        if (!this.s2kUsage) throw t3;
        this.unparseableKeyMaterial = e2.subarray(n2), this.isEncrypted = true;
      }
      if (5 === this.version && (r2 += 4), this.keyMaterial = e2.subarray(r2), this.isEncrypted = !!this.s2kUsage, !this.isEncrypted) {
        let e3;
        if (6 === this.version) e3 = this.keyMaterial;
        else if (e3 = this.keyMaterial.subarray(0, -2), !N.equalsUint8Array(N.writeChecksum(e3), this.keyMaterial.subarray(-2))) throw Error("Key checksum mismatch");
        try {
          const { read: t3, privateParams: r3 } = xn(this.algorithm, e3, this.publicParams);
          if (t3 < e3.length) throw Error("Error reading MPIs");
          this.privateParams = r3;
        } catch (e4) {
          if (e4 instanceof ot) throw e4;
          throw Error("Error reading MPIs");
        }
      }
    }
    write() {
      const e2 = this.writePublicKey();
      if (this.unparseableKeyMaterial) return N.concatUint8Array([e2, this.unparseableKeyMaterial]);
      const t2 = [e2];
      t2.push(new Uint8Array([this.s2kUsage]));
      const r2 = [];
      if (255 === this.s2kUsage || 254 === this.s2kUsage || 253 === this.s2kUsage) {
        r2.push(this.symmetric), 253 === this.s2kUsage && r2.push(this.aead);
        const e3 = this.s2k.write();
        6 === this.version && r2.push(e3.length), r2.push(...e3);
      }
      return this.s2kUsage && "gnu-dummy" !== this.s2k.type && r2.push(...this.iv), (5 === this.version || 6 === this.version && this.s2kUsage) && t2.push(new Uint8Array([r2.length])), t2.push(new Uint8Array(r2)), this.isDummy() || (this.s2kUsage || (this.keyMaterial = Qn(this.algorithm, this.privateParams)), 5 === this.version && t2.push(N.writeNumber(this.keyMaterial.length, 4)), t2.push(this.keyMaterial), this.s2kUsage || 6 === this.version || t2.push(N.writeChecksum(this.keyMaterial))), N.concatUint8Array(t2);
    }
    isDecrypted() {
      return false === this.isEncrypted;
    }
    isMissingSecretKeyMaterial() {
      return void 0 !== this.unparseableKeyMaterial || this.isDummy();
    }
    isDummy() {
      return !(!this.s2k || "gnu-dummy" !== this.s2k.type);
    }
    makeDummy(e2 = F) {
      this.isDummy() || (this.isDecrypted() && this.clearPrivateParams(), delete this.unparseableKeyMaterial, this.isEncrypted = null, this.keyMaterial = null, this.s2k = Ti(R.s2k.gnu, e2), this.s2k.algorithm = 0, this.s2k.c = 0, this.s2k.type = "gnu-dummy", this.s2kUsage = 254, this.symmetric = R.symmetric.aes256, this.isLegacyAEAD = null, this.usedModernAEAD = null);
    }
    async encrypt(e2, t2 = F) {
      if (this.isDummy()) return;
      if (!this.isDecrypted()) throw Error("Key packet is already encrypted");
      if (!e2) throw Error("A non-empty passphrase is required for key encryption.");
      this.s2k = Ni(t2), this.s2k.generateSalt();
      const r2 = Qn(this.algorithm, this.privateParams);
      this.symmetric = R.symmetric.aes256;
      const { blockSize: n2 } = Kr(this.symmetric);
      if (t2.aeadProtect) {
        this.s2kUsage = 253, this.aead = t2.preferredAEADAlgorithm;
        const i2 = Ci(this.aead);
        this.isLegacyAEAD = 5 === this.version, this.usedModernAEAD = !this.isLegacyAEAD;
        const s2 = nt(this.constructor.tag), a2 = await da(this.version, this.s2k, e2, this.symmetric, this.aead, s2, this.isLegacyAEAD, t2), o2 = await i2(this.symmetric, a2);
        this.iv = this.isLegacyAEAD ? pe(n2) : pe(i2.ivLength);
        const c2 = this.isLegacyAEAD ? new Uint8Array() : N.concatUint8Array([s2, this.writePublicKey()]);
        this.keyMaterial = await o2.encrypt(r2, this.iv.subarray(0, i2.ivLength), c2);
      } else {
        this.s2kUsage = 254, this.usedModernAEAD = false;
        const i2 = await da(this.version, this.s2k, e2, this.symmetric, void 0, void 0, void 0, t2);
        this.iv = pe(n2), this.keyMaterial = await jn(this.symmetric, i2, N.concatUint8Array([r2, await Re(R.hash.sha1, r2)]), this.iv);
      }
    }
    async decrypt(e2, t2 = F) {
      if (this.isDummy()) return false;
      if (this.unparseableKeyMaterial) throw Error("Key packet cannot be decrypted: unsupported S2K or cipher algo");
      if (this.isDecrypted()) throw Error("Key packet is already decrypted.");
      let r2;
      const n2 = nt(this.constructor.tag);
      if (254 !== this.s2kUsage && 253 !== this.s2kUsage) throw 255 === this.s2kUsage ? Error("Encrypted private key is authenticated using an insecure two-byte hash") : Error("Private key is encrypted using an insecure S2K function: unsalted MD5");
      let i2;
      if (r2 = await da(this.version, this.s2k, e2, this.symmetric, this.aead, n2, this.isLegacyAEAD, t2), 253 === this.s2kUsage) {
        const e3 = Ci(this.aead, true), t3 = await e3(this.symmetric, r2);
        try {
          const r3 = this.isLegacyAEAD ? new Uint8Array() : N.concatUint8Array([n2, this.writePublicKey()]);
          i2 = await t3.decrypt(this.keyMaterial, this.iv.subarray(0, e3.ivLength), r3);
        } catch (e4) {
          if ("Authentication tag mismatch" === e4.message) throw Error("Incorrect key passphrase: " + e4.message);
          throw e4;
        }
      } else {
        const e3 = await Vn(this.symmetric, r2, this.keyMaterial, this.iv);
        i2 = e3.subarray(0, -20);
        const t3 = await Re(R.hash.sha1, i2);
        if (!N.equalsUint8Array(t3, e3.subarray(-20))) throw Error("Incorrect key passphrase");
      }
      try {
        const { privateParams: e3 } = xn(this.algorithm, i2, this.publicParams);
        this.privateParams = e3;
      } catch {
        throw Error("Error reading MPIs");
      }
      this.isEncrypted = false, this.keyMaterial = null, this.s2kUsage = 0, this.aead = null, this.symmetric = null, this.isLegacyAEAD = null;
    }
    async validate() {
      if (this.isDummy()) return;
      if (!this.isDecrypted()) throw Error("Key is not decrypted");
      if (this.usedModernAEAD) return;
      let e2;
      try {
        e2 = await Rn(this.algorithm, this.publicParams, this.privateParams);
      } catch {
        e2 = false;
      }
      if (!e2) throw Error("Key is invalid");
    }
    async generate(e2, t2) {
      if (6 === this.version && (this.algorithm === R.publicKey.ecdh && t2 === R.curve.curve25519Legacy || this.algorithm === R.publicKey.eddsaLegacy)) throw Error(`Cannot generate v6 keys of type 'ecc' with curve ${t2}. Generate a key of type 'curve25519' instead`);
      const { privateParams: r2, publicParams: n2 } = await Mn(this.algorithm, e2, t2);
      this.privateParams = r2, this.publicParams = n2, this.isEncrypted = false;
    }
    clearPrivateParams() {
      this.isMissingSecretKeyMaterial() || (Object.keys(this.privateParams).forEach(((e2) => {
        this.privateParams[e2].fill(0), delete this.privateParams[e2];
      })), this.privateParams = null, this.isEncrypted = true);
    }
  };
  async function da(e2, t2, r2, n2, i2, s2, a2, o2) {
    if ("argon2" === t2.type && !i2) throw Error("Using Argon2 S2K without AEAD is not allowed");
    if ("simple" === t2.type && 6 === e2) throw Error("Using Simple S2K with version 6 keys is not allowed");
    const { keySize: c2 } = Kr(n2), u2 = await t2.produceKey(r2, c2, o2);
    if (!i2 || 5 === e2 || a2) return u2;
    const h2 = N.concatUint8Array([s2, new Uint8Array([e2, n2, i2])]);
    return Pr(R.hash.sha256, u2, new Uint8Array(), h2, c2);
  }
  var Aa = class _Aa {
    static get tag() {
      return R.packet.userID;
    }
    constructor() {
      this.userID = "", this.name = "", this.email = "", this.comment = "";
    }
    static fromObject(e2) {
      if (N.isString(e2) || e2.name && !N.isString(e2.name) || e2.email && !N.isEmailAddress(e2.email) || e2.comment && !N.isString(e2.comment)) throw Error("Invalid user ID format");
      const t2 = new _Aa();
      Object.assign(t2, e2);
      const r2 = [];
      return t2.name && r2.push(t2.name), t2.comment && r2.push(`(${t2.comment})`), t2.email && r2.push(`<${t2.email}>`), t2.userID = r2.join(" "), t2;
    }
    read(e2, t2 = F) {
      const r2 = N.decodeUTF8(e2);
      if (r2.length > t2.maxUserIDLength) throw Error("User ID string is too long");
      const n2 = (e3) => /^[^\s@]+@[^\s@]+$/.test(e3), i2 = r2.indexOf("<"), s2 = r2.lastIndexOf(">");
      if (-1 !== i2 && -1 !== s2 && s2 > i2) {
        const e3 = r2.substring(i2 + 1, s2);
        if (n2(e3)) {
          this.email = e3;
          const t3 = r2.substring(0, i2).trim(), n3 = t3.indexOf("("), s3 = t3.lastIndexOf(")");
          -1 !== n3 && -1 !== s3 && s3 > n3 ? (this.comment = t3.substring(n3 + 1, s3).trim(), this.name = t3.substring(0, n3).trim()) : (this.name = t3, this.comment = "");
        }
      } else n2(r2.trim()) && (this.email = r2.trim(), this.name = "", this.comment = "");
      this.userID = r2;
    }
    write() {
      return N.encodeUTF8(this.userID);
    }
    equals(e2) {
      return e2 && e2.userID === this.userID;
    }
  };
  var wa = class extends pa {
    static get tag() {
      return R.packet.secretSubkey;
    }
    constructor(e2 = /* @__PURE__ */ new Date(), t2 = F) {
      super(e2, t2);
    }
  };
  var ka = /* @__PURE__ */ N.constructAllowedPackets([Ns]);
  var Ea = class {
    constructor(e2) {
      this.packets = e2 || new Gs();
    }
    write() {
      return this.packets.write();
    }
    armor(e2 = F) {
      const t2 = this.packets.some(((e3) => e3.constructor.tag === Ns.tag && 6 !== e3.version));
      return ee(R.armor.signature, this.write(), void 0, void 0, void 0, t2, e2);
    }
    getSigningKeyIDs() {
      return this.packets.map(((e2) => e2.issuerKeyID));
    }
  };
  async function va({ armoredSignature: e2, binarySignature: t2, config: r2, ...n2 }) {
    r2 = { ...F, ...r2 };
    let i2 = e2 || t2;
    if (!i2) throw Error("readSignature: must pass options object containing `armoredSignature` or `binarySignature`");
    if (e2 && !N.isString(e2)) throw Error("readSignature: options.armoredSignature must be a string");
    if (t2 && !N.isUint8Array(t2)) throw Error("readSignature: options.binarySignature must be a Uint8Array");
    const s2 = Object.keys(n2);
    if (s2.length > 0) throw Error("Unknown option: " + s2.join(", "));
    if (e2) {
      const { type: e3, data: t3 } = await $(i2);
      if (e3 !== R.armor.signature) throw Error("Armored text not of type signature");
      i2 = t3;
    }
    const a2 = await Gs.fromBinary(i2, ka, r2);
    return new Ea(a2);
  }
  async function Ia(e2, t2) {
    const r2 = new wa(e2.date, t2);
    return r2.packets = null, r2.algorithm = R.write(R.publicKey, e2.algorithm), await r2.generate(e2.rsaBits, e2.curve), await r2.computeFingerprintAndKeyID(), r2;
  }
  async function Sa(e2, t2, r2, n2, i2 = /* @__PURE__ */ new Date(), s2) {
    let a2, o2;
    for (let c2 = e2.length - 1; c2 >= 0; c2--) try {
      (!a2 || e2[c2].created >= a2.created) && (await e2[c2].verify(t2, r2, n2, i2, void 0, s2), a2 = e2[c2]);
    } catch (e3) {
      o2 = e3;
    }
    if (!a2) throw N.wrapError(`Could not find valid ${R.read(R.signature, r2)} signature in key ${t2.getKeyID().toHex()}`.replace("certGeneric ", "self-").replace(/([a-z])([A-Z])/g, ((e3, t3, r3) => t3 + " " + r3.toLowerCase())), o2);
    return a2;
  }
  function Ka(e2, t2, r2 = /* @__PURE__ */ new Date()) {
    const n2 = N.normalizeDate(r2);
    if (null !== n2) {
      const r3 = Qa(e2, t2);
      return !(e2.created <= n2 && n2 < r3);
    }
    return false;
  }
  async function Ca(e2, t2, r2, n2) {
    const i2 = {};
    i2.key = t2, i2.bind = e2;
    const s2 = { signatureType: R.signature.subkeyBinding };
    r2.sign ? (s2.keyFlags = [R.keyFlags.signData], s2.embeddedSignature = await Ua(i2, [], e2, { signatureType: R.signature.keyBinding }, r2.date, void 0, void 0, void 0, n2)) : s2.keyFlags = [R.keyFlags.encryptCommunication | R.keyFlags.encryptStorage], r2.keyExpirationTime > 0 && (s2.keyExpirationTime = r2.keyExpirationTime, s2.keyNeverExpires = false);
    return await Ua(i2, [], t2, s2, r2.date, void 0, void 0, void 0, n2);
  }
  async function Da(e2, t2, r2 = /* @__PURE__ */ new Date(), n2 = [], i2) {
    const s2 = R.hash.sha256, a2 = i2.preferredHashAlgorithm, o2 = await Promise.all(e2.map((async (e3, t3) => (await e3.getPrimarySelfSignature(r2, n2[t3], i2)).preferredHashAlgorithms || []))), c2 = /* @__PURE__ */ new Map();
    for (const e3 of o2) for (const t3 of e3) try {
      const e4 = R.write(R.hash, t3);
      c2.set(e4, c2.has(e4) ? c2.get(e4) + 1 : 1);
    } catch {
    }
    const u2 = (t3) => 0 === e2.length || c2.get(t3) === e2.length || t3 === s2, h2 = () => {
      if (0 === c2.size) return s2;
      const e3 = Array.from(c2.keys()).filter(((e4) => u2(e4))).sort(((e4, t3) => Fe(e4) - Fe(t3)))[0];
      return Fe(e3) >= Fe(s2) ? e3 : s2;
    };
    if ((/* @__PURE__ */ new Set([R.publicKey.ecdsa, R.publicKey.eddsaLegacy, R.publicKey.ed25519, R.publicKey.ed448])).has(t2.algorithm)) {
      const e3 = (function(e4, t3) {
        switch (e4) {
          case R.publicKey.ecdsa:
          case R.publicKey.eddsaLegacy:
            return Wr(t3);
          case R.publicKey.ed25519:
          case R.publicKey.ed448:
            return dt(e4);
          default:
            throw Error("Unknown elliptic signing algo");
        }
      })(t2.algorithm, t2.publicParams.oid), r3 = u2(a2), n3 = Fe(a2) >= Fe(e3);
      if (r3 && n3) return a2;
      {
        const t3 = h2();
        return Fe(t3) >= Fe(e3) ? t3 : e3;
      }
    }
    return u2(a2) ? a2 : h2();
  }
  async function Ua(e2, t2, r2, n2, i2, s2, a2 = [], o2 = false, c2) {
    if (r2.isDummy()) throw Error("Cannot sign with a gnu-dummy key.");
    if (!r2.isDecrypted()) throw Error("Signing key is not decrypted.");
    const u2 = new Ns();
    return Object.assign(u2, n2), u2.publicKeyAlgorithm = r2.algorithm, u2.hashAlgorithm = await Da(t2, r2, i2, s2, c2), u2.rawNotations = [...a2], await u2.sign(r2, e2, i2, o2, c2), u2;
  }
  async function Pa(e2, t2, r2, n2 = /* @__PURE__ */ new Date(), i2) {
    (e2 = e2[r2]) && (t2[r2].length ? await Promise.all(e2.map((async function(e3) {
      e3.isExpired(n2) || i2 && !await i2(e3) || t2[r2].some((function(t3) {
        return N.equalsUint8Array(t3.writeParams(), e3.writeParams());
      })) || t2[r2].push(e3);
    }))) : t2[r2] = e2);
  }
  async function xa(e2, t2, r2, n2, i2, s2, a2 = /* @__PURE__ */ new Date(), o2) {
    s2 = s2 || e2;
    const c2 = [];
    return await Promise.all(n2.map((async function(e3) {
      try {
        if (!i2 || e3.issuerKeyID.equals(i2.issuerKeyID)) {
          const n3 = ![R.reasonForRevocation.keyRetired, R.reasonForRevocation.keySuperseded, R.reasonForRevocation.userIDInvalid].includes(e3.reasonForRevocationFlag);
          await e3.verify(s2, t2, r2, n3 ? null : a2, false, o2), c2.push(e3.issuerKeyID);
        }
      } catch {
      }
    }))), i2 ? (i2.revoked = !!c2.some(((e3) => e3.equals(i2.issuerKeyID))) || (i2.revoked || false), i2.revoked) : c2.length > 0;
  }
  function Qa(e2, t2) {
    let r2;
    return false === t2.keyNeverExpires && (r2 = e2.created.getTime() + 1e3 * t2.keyExpirationTime), r2 ? new Date(r2) : 1 / 0;
  }
  function Ma(e2, t2 = {}) {
    switch (e2.type = e2.type || t2.type, e2.curve = e2.curve || t2.curve, e2.rsaBits = e2.rsaBits || t2.rsaBits, e2.keyExpirationTime = void 0 !== e2.keyExpirationTime ? e2.keyExpirationTime : t2.keyExpirationTime, e2.passphrase = N.isString(e2.passphrase) ? e2.passphrase : t2.passphrase, e2.date = e2.date || t2.date, e2.sign = e2.sign || false, e2.type) {
      case "ecc":
        try {
          e2.curve = R.write(R.curve, e2.curve);
        } catch {
          throw Error("Unknown curve");
        }
        e2.curve !== R.curve.ed25519Legacy && e2.curve !== R.curve.curve25519Legacy && "ed25519" !== e2.curve && "curve25519" !== e2.curve || (e2.curve = e2.sign ? R.curve.ed25519Legacy : R.curve.curve25519Legacy), e2.sign ? e2.algorithm = e2.curve === R.curve.ed25519Legacy ? R.publicKey.eddsaLegacy : R.publicKey.ecdsa : e2.algorithm = R.publicKey.ecdh;
        break;
      case "curve25519":
        e2.algorithm = e2.sign ? R.publicKey.ed25519 : R.publicKey.x25519;
        break;
      case "curve448":
        e2.algorithm = e2.sign ? R.publicKey.ed448 : R.publicKey.x448;
        break;
      case "rsa":
        e2.algorithm = R.publicKey.rsaEncryptSign;
        break;
      default:
        throw Error("Unsupported key type " + e2.type);
    }
    return e2;
  }
  function Ra(e2, t2, r2) {
    switch (e2.algorithm) {
      case R.publicKey.rsaEncryptSign:
      case R.publicKey.rsaSign:
      case R.publicKey.dsa:
      case R.publicKey.ecdsa:
      case R.publicKey.eddsaLegacy:
      case R.publicKey.ed25519:
      case R.publicKey.ed448:
        if (!t2.keyFlags && !r2.allowMissingKeyFlags) throw Error("None of the key flags is set: consider passing `config.allowMissingKeyFlags`");
        return !t2.keyFlags || !!(t2.keyFlags[0] & R.keyFlags.signData);
      default:
        return false;
    }
  }
  function Fa(e2, t2, r2) {
    switch (e2.algorithm) {
      case R.publicKey.rsaEncryptSign:
      case R.publicKey.rsaEncrypt:
      case R.publicKey.elgamal:
      case R.publicKey.ecdh:
      case R.publicKey.x25519:
      case R.publicKey.x448:
        if (!t2.keyFlags && !r2.allowMissingKeyFlags) throw Error("None of the key flags is set: consider passing `config.allowMissingKeyFlags`");
        return !t2.keyFlags || !!(t2.keyFlags[0] & R.keyFlags.encryptCommunication) || !!(t2.keyFlags[0] & R.keyFlags.encryptStorage);
      default:
        return false;
    }
  }
  function Ta(e2, t2, r2) {
    if (!t2.keyFlags && !r2.allowMissingKeyFlags) throw Error("None of the key flags is set: consider passing `config.allowMissingKeyFlags`");
    switch (e2.algorithm) {
      case R.publicKey.rsaEncryptSign:
      case R.publicKey.rsaEncrypt:
      case R.publicKey.elgamal:
      case R.publicKey.ecdh:
      case R.publicKey.x25519:
      case R.publicKey.x448:
        return !(!(!t2.keyFlags || !!(t2.keyFlags[0] & R.keyFlags.signData)) || !r2.allowInsecureDecryptionWithSigningKeys) || (!t2.keyFlags || !!(t2.keyFlags[0] & R.keyFlags.encryptCommunication) || !!(t2.keyFlags[0] & R.keyFlags.encryptStorage));
      default:
        return false;
    }
  }
  function Na(e2, t2) {
    const r2 = R.write(R.publicKey, e2.algorithm), n2 = e2.getAlgorithmInfo();
    if (t2.rejectPublicKeyAlgorithms.has(r2)) throw Error(n2.algorithm + " keys are considered too weak.");
    switch (r2) {
      case R.publicKey.rsaEncryptSign:
      case R.publicKey.rsaSign:
      case R.publicKey.rsaEncrypt:
        if (n2.bits < t2.minRSABits) throw Error(`RSA keys shorter than ${t2.minRSABits} bits are considered too weak.`);
        break;
      case R.publicKey.ecdsa:
      case R.publicKey.eddsaLegacy:
      case R.publicKey.ecdh:
        if (t2.rejectCurves.has(n2.curve)) throw Error(`Support for ${n2.algorithm} keys using curve ${n2.curve} is disabled.`);
    }
  }
  var La = class _La {
    constructor(e2, t2) {
      this.userID = e2.constructor.tag === R.packet.userID ? e2 : null, this.userAttribute = e2.constructor.tag === R.packet.userAttribute ? e2 : null, this.selfCertifications = [], this.otherCertifications = [], this.revocationSignatures = [], this.mainKey = t2;
    }
    toPacketList() {
      const e2 = new Gs();
      return e2.push(this.userID || this.userAttribute), e2.push(...this.revocationSignatures), e2.push(...this.selfCertifications), e2.push(...this.otherCertifications), e2;
    }
    clone() {
      const e2 = new _La(this.userID || this.userAttribute, this.mainKey);
      return e2.selfCertifications = [...this.selfCertifications], e2.otherCertifications = [...this.otherCertifications], e2.revocationSignatures = [...this.revocationSignatures], e2;
    }
    async certify(e2, t2, r2) {
      const n2 = this.mainKey.keyPacket, i2 = { userID: this.userID, userAttribute: this.userAttribute, key: n2 }, s2 = new _La(i2.userID || i2.userAttribute, this.mainKey);
      return s2.otherCertifications = await Promise.all(e2.map((async function(e3) {
        if (!e3.isPrivate()) throw Error("Need private key for signing");
        if (e3.hasSameFingerprintAs(n2)) throw Error("The user's own key can only be used for self-certifications");
        const s3 = await e3.getSigningKey(void 0, t2, void 0, r2);
        return Ua(i2, [e3], s3.keyPacket, { signatureType: R.signature.certGeneric, keyFlags: [R.keyFlags.certifyKeys | R.keyFlags.signData] }, t2, void 0, void 0, void 0, r2);
      }))), await s2.update(this, t2, r2), s2;
    }
    async isRevoked(e2, t2, r2 = /* @__PURE__ */ new Date(), n2 = F) {
      const i2 = this.mainKey.keyPacket;
      return xa(i2, R.signature.certRevocation, { key: i2, userID: this.userID, userAttribute: this.userAttribute }, this.revocationSignatures, e2, t2, r2, n2);
    }
    async verifyCertificate(e2, t2, r2 = /* @__PURE__ */ new Date(), n2) {
      const i2 = this, s2 = this.mainKey.keyPacket, a2 = { userID: this.userID, userAttribute: this.userAttribute, key: s2 }, { issuerKeyID: o2 } = e2, c2 = t2.filter(((e3) => e3.getKeys(o2).length > 0));
      return 0 === c2.length ? null : (await Promise.all(c2.map((async (t3) => {
        const s3 = await t3.getSigningKey(o2, e2.created, void 0, n2);
        if (e2.revoked || await i2.isRevoked(e2, s3.keyPacket, r2, n2)) throw Error("User certificate is revoked");
        try {
          await e2.verify(s3.keyPacket, R.signature.certGeneric, a2, r2, void 0, n2);
        } catch (e3) {
          throw N.wrapError("User certificate is invalid", e3);
        }
      }))), true);
    }
    async verifyAllCertifications(e2, t2 = /* @__PURE__ */ new Date(), r2) {
      const n2 = this, i2 = this.selfCertifications.concat(this.otherCertifications);
      return Promise.all(i2.map((async (i3) => ({ keyID: i3.issuerKeyID, valid: await n2.verifyCertificate(i3, e2, t2, r2).catch((() => false)) }))));
    }
    async verify(e2 = /* @__PURE__ */ new Date(), t2) {
      if (!this.selfCertifications.length) throw Error("No self-certifications found");
      const r2 = this, n2 = this.mainKey.keyPacket, i2 = { userID: this.userID, userAttribute: this.userAttribute, key: n2 };
      let s2;
      for (let a2 = this.selfCertifications.length - 1; a2 >= 0; a2--) try {
        const s3 = this.selfCertifications[a2];
        if (s3.revoked || await r2.isRevoked(s3, void 0, e2, t2)) throw Error("Self-certification is revoked");
        try {
          await s3.verify(n2, R.signature.certGeneric, i2, e2, void 0, t2);
        } catch (e3) {
          throw N.wrapError("Self-certification is invalid", e3);
        }
        return true;
      } catch (e3) {
        s2 = e3;
      }
      throw s2;
    }
    async update(e2, t2, r2) {
      const n2 = this.mainKey.keyPacket, i2 = { userID: this.userID, userAttribute: this.userAttribute, key: n2 };
      await Pa(e2, this, "selfCertifications", t2, (async function(e3) {
        try {
          return await e3.verify(n2, R.signature.certGeneric, i2, t2, false, r2), true;
        } catch {
          return false;
        }
      })), await Pa(e2, this, "otherCertifications", t2), await Pa(e2, this, "revocationSignatures", t2, (function(e3) {
        return xa(n2, R.signature.certRevocation, i2, [e3], void 0, void 0, t2, r2);
      }));
    }
    async revoke(e2, { flag: t2 = R.reasonForRevocation.noReason, string: r2 = "" } = {}, n2 = /* @__PURE__ */ new Date(), i2 = F) {
      const s2 = { userID: this.userID, userAttribute: this.userAttribute, key: e2 }, a2 = new _La(s2.userID || s2.userAttribute, this.mainKey);
      return a2.revocationSignatures.push(await Ua(s2, [], e2, { signatureType: R.signature.certRevocation, reasonForRevocationFlag: R.write(R.reasonForRevocation, t2), reasonForRevocationString: r2 }, n2, void 0, void 0, false, i2)), await a2.update(this), a2;
    }
  };
  var Oa = class _Oa {
    constructor(e2, t2) {
      this.keyPacket = e2, this.bindingSignatures = [], this.revocationSignatures = [], this.mainKey = t2;
    }
    toPacketList() {
      const e2 = new Gs();
      return e2.push(this.keyPacket), e2.push(...this.revocationSignatures), e2.push(...this.bindingSignatures), e2;
    }
    clone() {
      const e2 = new _Oa(this.keyPacket, this.mainKey);
      return e2.bindingSignatures = [...this.bindingSignatures], e2.revocationSignatures = [...this.revocationSignatures], e2;
    }
    async isRevoked(e2, t2, r2 = /* @__PURE__ */ new Date(), n2 = F) {
      const i2 = this.mainKey.keyPacket;
      return xa(i2, R.signature.subkeyRevocation, { key: i2, bind: this.keyPacket }, this.revocationSignatures, e2, t2, r2, n2);
    }
    async verify(e2 = /* @__PURE__ */ new Date(), t2 = F) {
      const r2 = this.mainKey.keyPacket, n2 = { key: r2, bind: this.keyPacket }, i2 = await Sa(this.bindingSignatures, r2, R.signature.subkeyBinding, n2, e2, t2);
      if (i2.revoked || await this.isRevoked(i2, null, e2, t2)) throw Error("Subkey is revoked");
      if (Ka(this.keyPacket, i2, e2)) throw Error("Subkey is expired");
      return i2;
    }
    async getExpirationTime(e2 = /* @__PURE__ */ new Date(), t2 = F) {
      const r2 = this.mainKey.keyPacket, n2 = { key: r2, bind: this.keyPacket };
      let i2;
      try {
        i2 = await Sa(this.bindingSignatures, r2, R.signature.subkeyBinding, n2, e2, t2);
      } catch {
        return null;
      }
      const s2 = Qa(this.keyPacket, i2), a2 = i2.getExpirationTime();
      return s2 < a2 ? s2 : a2;
    }
    async update(e2, t2 = /* @__PURE__ */ new Date(), r2 = F) {
      const n2 = this.mainKey.keyPacket;
      if (!this.hasSameFingerprintAs(e2)) throw Error("Subkey update method: fingerprints of subkeys not equal");
      this.keyPacket.constructor.tag === R.packet.publicSubkey && e2.keyPacket.constructor.tag === R.packet.secretSubkey && (this.keyPacket = e2.keyPacket);
      const i2 = this, s2 = { key: n2, bind: i2.keyPacket };
      await Pa(e2, this, "bindingSignatures", t2, (async function(e3) {
        for (let t3 = 0; t3 < i2.bindingSignatures.length; t3++) if (i2.bindingSignatures[t3].issuerKeyID.equals(e3.issuerKeyID)) return e3.created > i2.bindingSignatures[t3].created && (i2.bindingSignatures[t3] = e3), false;
        try {
          return await e3.verify(n2, R.signature.subkeyBinding, s2, t2, void 0, r2), true;
        } catch {
          return false;
        }
      })), await Pa(e2, this, "revocationSignatures", t2, (function(e3) {
        return xa(n2, R.signature.subkeyRevocation, s2, [e3], void 0, void 0, t2, r2);
      }));
    }
    async revoke(e2, { flag: t2 = R.reasonForRevocation.noReason, string: r2 = "" } = {}, n2 = /* @__PURE__ */ new Date(), i2 = F) {
      const s2 = { key: e2, bind: this.keyPacket }, a2 = new _Oa(this.keyPacket, this.mainKey);
      return a2.revocationSignatures.push(await Ua(s2, [], e2, { signatureType: R.signature.subkeyRevocation, reasonForRevocationFlag: R.write(R.reasonForRevocation, t2), reasonForRevocationString: r2 }, n2, void 0, void 0, false, i2)), await a2.update(this), a2;
    }
    hasSameFingerprintAs(e2) {
      return this.keyPacket.hasSameFingerprintAs(e2.keyPacket || e2);
    }
  };
  ["getKeyID", "getFingerprint", "getAlgorithmInfo", "getCreationTime", "isDecrypted"].forEach(((e2) => {
    Oa.prototype[e2] = function() {
      return this.keyPacket[e2]();
    };
  }));
  var Ha = /* @__PURE__ */ N.constructAllowedPackets([Ns]);
  var za = /* @__PURE__ */ new Set([R.packet.publicKey, R.packet.secretKey]);
  var Ga = /* @__PURE__ */ new Set([R.packet.publicKey, R.packet.secretKey, R.packet.publicSubkey, R.packet.secretSubkey]);
  var ja = class {
    packetListToStructure(e2, t2 = /* @__PURE__ */ new Set()) {
      let r2, n2, i2, s2;
      for (const a2 of e2) {
        if (a2 instanceof ht) {
          Ga.has(a2.tag) && !s2 && (s2 = za.has(a2.tag) ? za : Ga);
          continue;
        }
        const e3 = a2.constructor.tag;
        if (s2) {
          if (!s2.has(e3)) continue;
          s2 = null;
        }
        if (t2.has(e3)) throw Error("Unexpected packet type: " + e3);
        switch (e3) {
          case R.packet.publicKey:
          case R.packet.secretKey:
            if (this.keyPacket) throw Error("Key block contains multiple keys");
            if (this.keyPacket = a2, n2 = this.getKeyID(), !n2) throw Error("Missing Key ID");
            break;
          case R.packet.userID:
          case R.packet.userAttribute:
            r2 = new La(a2, this), this.users.push(r2);
            break;
          case R.packet.publicSubkey:
          case R.packet.secretSubkey:
            r2 = null, i2 = new Oa(a2, this), this.subkeys.push(i2);
            break;
          case R.packet.signature:
            switch (a2.signatureType) {
              case R.signature.certGeneric:
              case R.signature.certPersona:
              case R.signature.certCasual:
              case R.signature.certPositive:
                if (!r2) {
                  N.printDebug("Dropping certification signatures without preceding user packet");
                  continue;
                }
                a2.issuerKeyID.equals(n2) ? r2.selfCertifications.push(a2) : r2.otherCertifications.push(a2);
                break;
              case R.signature.certRevocation:
                r2 ? r2.revocationSignatures.push(a2) : this.directSignatures.push(a2);
                break;
              case R.signature.key:
                this.directSignatures.push(a2);
                break;
              case R.signature.subkeyBinding:
                if (!i2) {
                  N.printDebug("Dropping subkey binding signature without preceding subkey packet");
                  continue;
                }
                i2.bindingSignatures.push(a2);
                break;
              case R.signature.keyRevocation:
                this.revocationSignatures.push(a2);
                break;
              case R.signature.subkeyRevocation:
                if (!i2) {
                  N.printDebug("Dropping subkey revocation signature without preceding subkey packet");
                  continue;
                }
                i2.revocationSignatures.push(a2);
            }
        }
      }
    }
    toPacketList() {
      const e2 = new Gs();
      return e2.push(this.keyPacket), e2.push(...this.revocationSignatures), e2.push(...this.directSignatures), this.users.map(((t2) => e2.push(...t2.toPacketList()))), this.subkeys.map(((t2) => e2.push(...t2.toPacketList()))), e2;
    }
    clone(e2 = false) {
      const t2 = new this.constructor(this.toPacketList());
      return e2 && t2.getKeys().forEach(((e3) => {
        if (e3.keyPacket = Object.create(Object.getPrototypeOf(e3.keyPacket), Object.getOwnPropertyDescriptors(e3.keyPacket)), !e3.keyPacket.isDecrypted()) return;
        const t3 = {};
        Object.keys(e3.keyPacket.privateParams).forEach(((r2) => {
          t3[r2] = new Uint8Array(e3.keyPacket.privateParams[r2]);
        })), e3.keyPacket.privateParams = t3;
      })), t2;
    }
    getSubkeys(e2 = null) {
      return this.subkeys.filter(((t2) => !e2 || t2.getKeyID().equals(e2, true)));
    }
    getKeys(e2 = null) {
      const t2 = [];
      return e2 && !this.getKeyID().equals(e2, true) || t2.push(this), t2.concat(this.getSubkeys(e2));
    }
    getKeyIDs() {
      return this.getKeys().map(((e2) => e2.getKeyID()));
    }
    getUserIDs() {
      return this.users.map(((e2) => e2.userID ? e2.userID.userID : null)).filter(((e2) => null !== e2));
    }
    write() {
      return this.toPacketList().write();
    }
    async getSigningKey(e2 = null, t2 = /* @__PURE__ */ new Date(), r2 = {}, n2 = F) {
      await this.verifyPrimaryKey(t2, r2, n2);
      const i2 = this.keyPacket;
      try {
        Na(i2, n2);
      } catch (e3) {
        throw N.wrapError("Could not verify primary key", e3);
      }
      const s2 = this.subkeys.slice().sort(((e3, t3) => t3.keyPacket.created - e3.keyPacket.created || t3.keyPacket.algorithm - e3.keyPacket.algorithm));
      let a2;
      for (const r3 of s2) if (!e2 || r3.getKeyID().equals(e2)) try {
        await r3.verify(t2, n2);
        const e3 = { key: i2, bind: r3.keyPacket }, s3 = await Sa(r3.bindingSignatures, i2, R.signature.subkeyBinding, e3, t2, n2);
        if (!Ra(r3.keyPacket, s3, n2)) continue;
        if (!s3.embeddedSignature) throw Error("Missing embedded signature");
        return await Sa([s3.embeddedSignature], r3.keyPacket, R.signature.keyBinding, e3, t2, n2), Na(r3.keyPacket, n2), r3;
      } catch (e3) {
        a2 = e3;
      }
      try {
        const s3 = await this.getPrimarySelfSignature(t2, r2, n2);
        if ((!e2 || i2.getKeyID().equals(e2)) && Ra(i2, s3, n2)) return Na(i2, n2), this;
      } catch (e3) {
        a2 = e3;
      }
      throw N.wrapError("Could not find valid signing key packet in key " + this.getKeyID().toHex(), a2);
    }
    async getEncryptionKey(e2, t2 = /* @__PURE__ */ new Date(), r2 = {}, n2 = F) {
      await this.verifyPrimaryKey(t2, r2, n2);
      const i2 = this.keyPacket;
      try {
        Na(i2, n2);
      } catch (e3) {
        throw N.wrapError("Could not verify primary key", e3);
      }
      const s2 = this.subkeys.slice().sort(((e3, t3) => t3.keyPacket.created - e3.keyPacket.created || t3.keyPacket.algorithm - e3.keyPacket.algorithm));
      let a2;
      for (const r3 of s2) if (!e2 || r3.getKeyID().equals(e2)) try {
        await r3.verify(t2, n2);
        const e3 = { key: i2, bind: r3.keyPacket }, s3 = await Sa(r3.bindingSignatures, i2, R.signature.subkeyBinding, e3, t2, n2);
        if (Fa(r3.keyPacket, s3, n2)) return Na(r3.keyPacket, n2), r3;
      } catch (e3) {
        a2 = e3;
      }
      try {
        const s3 = await this.getPrimarySelfSignature(t2, r2, n2);
        if ((!e2 || i2.getKeyID().equals(e2)) && Fa(i2, s3, n2)) return Na(i2, n2), this;
      } catch (e3) {
        a2 = e3;
      }
      throw N.wrapError("Could not find valid encryption key packet in key " + this.getKeyID().toHex(), a2);
    }
    async isRevoked(e2, t2, r2 = /* @__PURE__ */ new Date(), n2 = F) {
      return xa(this.keyPacket, R.signature.keyRevocation, { key: this.keyPacket }, this.revocationSignatures, e2, t2, r2, n2);
    }
    async verifyPrimaryKey(e2 = /* @__PURE__ */ new Date(), t2 = {}, r2 = F) {
      const n2 = this.keyPacket;
      if (await this.isRevoked(null, null, e2, r2)) throw Error("Primary key is revoked");
      if (Ka(n2, await this.getPrimarySelfSignature(e2, t2, r2), e2)) throw Error("Primary key is expired");
      if (6 !== n2.version) {
        const t3 = await Sa(this.directSignatures, n2, R.signature.key, { key: n2 }, e2, r2).catch((() => {
        }));
        if (t3 && Ka(n2, t3, e2)) throw Error("Primary key is expired");
      }
    }
    async getExpirationTime(e2, t2 = F) {
      let r2;
      try {
        const n2 = await this.getPrimarySelfSignature(null, e2, t2), i2 = Qa(this.keyPacket, n2), s2 = n2.getExpirationTime(), a2 = 6 !== this.keyPacket.version && await Sa(this.directSignatures, this.keyPacket, R.signature.key, { key: this.keyPacket }, null, t2).catch((() => {
        }));
        if (a2) {
          const e3 = Qa(this.keyPacket, a2);
          r2 = Math.min(i2, s2, e3);
        } else r2 = i2 < s2 ? i2 : s2;
      } catch {
        r2 = null;
      }
      return N.normalizeDate(r2);
    }
    async getPrimarySelfSignature(e2 = /* @__PURE__ */ new Date(), t2 = {}, r2 = F) {
      const n2 = this.keyPacket;
      if (6 === n2.version) return Sa(this.directSignatures, n2, R.signature.key, { key: n2 }, e2, r2);
      const { selfCertification: i2 } = await this.getPrimaryUser(e2, t2, r2);
      return i2;
    }
    async getPrimaryUser(e2 = /* @__PURE__ */ new Date(), t2 = {}, r2 = F) {
      const n2 = this.keyPacket, i2 = [];
      let s2;
      for (let a3 = 0; a3 < this.users.length; a3++) try {
        const s3 = this.users[a3];
        if (!s3.userID) continue;
        if (void 0 !== t2.name && s3.userID.name !== t2.name || void 0 !== t2.email && s3.userID.email !== t2.email || void 0 !== t2.comment && s3.userID.comment !== t2.comment) throw Error("Could not find user that matches that user ID");
        const o3 = { userID: s3.userID, key: n2 }, c3 = await Sa(s3.selfCertifications, n2, R.signature.certGeneric, o3, e2, r2);
        i2.push({ index: a3, user: s3, selfCertification: c3 });
      } catch (e3) {
        s2 = e3;
      }
      if (!i2.length) throw s2 || Error("Could not find primary user");
      await Promise.all(i2.map((async (t3) => {
        t3.selfCertification.revoked || await t3.user.isRevoked(t3.selfCertification, null, e2, r2);
      })));
      const a2 = i2.sort((function(e3, t3) {
        const r3 = e3.selfCertification, n3 = t3.selfCertification;
        return n3.revoked - r3.revoked || r3.isPrimaryUserID - n3.isPrimaryUserID || r3.created - n3.created;
      })).pop(), { user: o2, selfCertification: c2 } = a2;
      if (c2.revoked || await o2.isRevoked(c2, null, e2, r2)) throw Error("Primary user is revoked");
      return a2;
    }
    async update(e2, t2 = /* @__PURE__ */ new Date(), r2 = F) {
      if (!this.hasSameFingerprintAs(e2)) throw Error("Primary key fingerprints must be equal to update the key");
      if (!this.isPrivate() && e2.isPrivate()) {
        if (!(this.subkeys.length === e2.subkeys.length && this.subkeys.every(((t3) => e2.subkeys.some(((e3) => t3.hasSameFingerprintAs(e3))))))) throw Error("Cannot update public key with private key if subkeys mismatch");
        return e2.update(this, r2);
      }
      const n2 = this.clone();
      return await Pa(e2, n2, "revocationSignatures", t2, ((i2) => xa(n2.keyPacket, R.signature.keyRevocation, n2, [i2], null, e2.keyPacket, t2, r2))), await Pa(e2, n2, "directSignatures", t2), await Promise.all(e2.users.map((async (e3) => {
        const i2 = n2.users.filter(((t3) => e3.userID && e3.userID.equals(t3.userID) || e3.userAttribute && e3.userAttribute.equals(t3.userAttribute)));
        if (i2.length > 0) await Promise.all(i2.map(((n3) => n3.update(e3, t2, r2))));
        else {
          const t3 = e3.clone();
          t3.mainKey = n2, n2.users.push(t3);
        }
      }))), await Promise.all(e2.subkeys.map((async (e3) => {
        const i2 = n2.subkeys.filter(((t3) => t3.hasSameFingerprintAs(e3)));
        if (i2.length > 0) await Promise.all(i2.map(((n3) => n3.update(e3, t2, r2))));
        else {
          const t3 = e3.clone();
          t3.mainKey = n2, n2.subkeys.push(t3);
        }
      }))), n2;
    }
    async getRevocationCertificate(e2 = /* @__PURE__ */ new Date(), t2 = F) {
      const r2 = { key: this.keyPacket }, n2 = await Sa(this.revocationSignatures, this.keyPacket, R.signature.keyRevocation, r2, e2, t2), i2 = new Gs();
      i2.push(n2);
      const s2 = 6 !== this.keyPacket.version;
      return ee(R.armor.publicKey, i2.write(), null, null, "This is a revocation certificate", s2, t2);
    }
    async applyRevocationCertificate(e2, t2 = /* @__PURE__ */ new Date(), r2 = F) {
      const n2 = await $(e2), i2 = (await Gs.fromBinary(n2.data, Ha, r2)).findPacket(R.packet.signature);
      if (!i2 || i2.signatureType !== R.signature.keyRevocation) throw Error("Could not find revocation signature packet");
      if (!i2.issuerKeyID.equals(this.getKeyID())) throw Error("Revocation signature does not match key");
      try {
        await i2.verify(this.keyPacket, R.signature.keyRevocation, { key: this.keyPacket }, t2, void 0, r2);
      } catch (e3) {
        throw N.wrapError("Could not verify revocation signature", e3);
      }
      const s2 = this.clone();
      return s2.revocationSignatures.push(i2), s2;
    }
    async signPrimaryUser(e2, t2, r2, n2 = F) {
      const { index: i2, user: s2 } = await this.getPrimaryUser(t2, r2, n2), a2 = await s2.certify(e2, t2, n2), o2 = this.clone();
      return o2.users[i2] = a2, o2;
    }
    async signAllUsers(e2, t2 = /* @__PURE__ */ new Date(), r2 = F) {
      const n2 = this.clone();
      return n2.users = await Promise.all(this.users.map((function(n3) {
        return n3.certify(e2, t2, r2);
      }))), n2;
    }
    async verifyPrimaryUser(e2, t2 = /* @__PURE__ */ new Date(), r2, n2 = F) {
      const i2 = this.keyPacket, { user: s2 } = await this.getPrimaryUser(t2, r2, n2);
      return e2 ? await s2.verifyAllCertifications(e2, t2, n2) : [{ keyID: i2.getKeyID(), valid: await s2.verify(t2, n2).catch((() => false)) }];
    }
    async verifyAllUsers(e2, t2 = /* @__PURE__ */ new Date(), r2 = F) {
      const n2 = this.keyPacket, i2 = [];
      return await Promise.all(this.users.map((async (s2) => {
        const a2 = e2 ? await s2.verifyAllCertifications(e2, t2, r2) : [{ keyID: n2.getKeyID(), valid: await s2.verify(t2, r2).catch((() => false)) }];
        i2.push(...a2.map(((e3) => ({ userID: s2.userID ? s2.userID.userID : null, userAttribute: s2.userAttribute, keyID: e3.keyID, valid: e3.valid }))));
      }))), i2;
    }
  };
  ["getKeyID", "getFingerprint", "getAlgorithmInfo", "getCreationTime", "hasSameFingerprintAs"].forEach(((e2) => {
    ja.prototype[e2] = Oa.prototype[e2];
  }));
  var Va = class extends ja {
    constructor(e2) {
      if (super(), this.keyPacket = null, this.revocationSignatures = [], this.directSignatures = [], this.users = [], this.subkeys = [], e2 && (this.packetListToStructure(e2, /* @__PURE__ */ new Set([R.packet.secretKey, R.packet.secretSubkey])), !this.keyPacket)) throw Error("Invalid key: missing public-key packet");
    }
    isPrivate() {
      return false;
    }
    toPublic() {
      return this;
    }
    armor(e2 = F) {
      const t2 = 6 !== this.keyPacket.version;
      return ee(R.armor.publicKey, this.toPacketList().write(), void 0, void 0, void 0, t2, e2);
    }
  };
  var qa = class _qa extends Va {
    constructor(e2) {
      if (super(), this.packetListToStructure(e2, /* @__PURE__ */ new Set([R.packet.publicKey, R.packet.publicSubkey])), !this.keyPacket) throw Error("Invalid key: missing private-key packet");
    }
    isPrivate() {
      return true;
    }
    toPublic() {
      const e2 = new Gs(), t2 = this.toPacketList();
      for (const r2 of t2) switch (r2.constructor.tag) {
        case R.packet.secretKey: {
          const t3 = ua.fromSecretKeyPacket(r2);
          e2.push(t3);
          break;
        }
        case R.packet.secretSubkey: {
          const t3 = ya.fromSecretSubkeyPacket(r2);
          e2.push(t3);
          break;
        }
        default:
          e2.push(r2);
      }
      return new Va(e2);
    }
    armor(e2 = F) {
      const t2 = 6 !== this.keyPacket.version;
      return ee(R.armor.privateKey, this.toPacketList().write(), void 0, void 0, void 0, t2, e2);
    }
    async getDecryptionKeys(e2, t2 = /* @__PURE__ */ new Date(), r2 = {}, n2 = F) {
      const i2 = this.keyPacket, s2 = [];
      let a2 = null;
      for (let r3 = 0; r3 < this.subkeys.length; r3++) if (!e2 || this.subkeys[r3].getKeyID().equals(e2, true)) {
        if (this.subkeys[r3].keyPacket.isDummy()) {
          a2 = a2 || Error("Gnu-dummy key packets cannot be used for decryption");
          continue;
        }
        try {
          const e3 = { key: i2, bind: this.subkeys[r3].keyPacket }, a3 = await Sa(this.subkeys[r3].bindingSignatures, i2, R.signature.subkeyBinding, e3, t2, n2);
          Ta(this.subkeys[r3].keyPacket, a3, n2) && s2.push(this.subkeys[r3]);
        } catch (e3) {
          a2 = e3;
        }
      }
      const o2 = await this.getPrimarySelfSignature(t2, r2, n2);
      if (e2 && !i2.getKeyID().equals(e2, true) || !Ta(i2, o2, n2) || (i2.isDummy() ? a2 = a2 || Error("Gnu-dummy key packets cannot be used for decryption") : s2.push(this)), 0 === s2.length) throw a2 || Error("No decryption key packets found");
      return s2;
    }
    isDecrypted() {
      return this.getKeys().some((({ keyPacket: e2 }) => e2.isDecrypted()));
    }
    async validate(e2 = F) {
      if (!this.isPrivate()) throw Error("Cannot validate a public key");
      let t2;
      if (this.keyPacket.isDummy()) {
        const r2 = await this.getSigningKey(null, null, void 0, { ...e2, rejectPublicKeyAlgorithms: /* @__PURE__ */ new Set(), minRSABits: 0 });
        r2 && !r2.keyPacket.isDummy() && (t2 = r2.keyPacket);
      } else t2 = this.keyPacket;
      if (t2) return t2.validate();
      {
        const e3 = this.getKeys();
        if (e3.map(((e4) => e4.keyPacket.isDummy())).every(Boolean)) throw Error("Cannot validate an all-gnu-dummy key");
        return Promise.all(e3.map(((e4) => e4.keyPacket.validate())));
      }
    }
    clearPrivateParams() {
      this.getKeys().forEach((({ keyPacket: e2 }) => {
        e2.isDecrypted() && e2.clearPrivateParams();
      }));
    }
    async revoke({ flag: e2 = R.reasonForRevocation.noReason, string: t2 = "" } = {}, r2 = /* @__PURE__ */ new Date(), n2 = F) {
      if (!this.isPrivate()) throw Error("Need private key for revoking");
      const i2 = { key: this.keyPacket }, s2 = this.clone();
      return s2.revocationSignatures.push(await Ua(i2, [], this.keyPacket, { signatureType: R.signature.keyRevocation, reasonForRevocationFlag: R.write(R.reasonForRevocation, e2), reasonForRevocationString: t2 }, r2, void 0, void 0, void 0, n2)), s2;
    }
    async addSubkey(e2 = {}) {
      const t2 = { ...F, ...e2.config };
      if (e2.passphrase) throw Error("Subkey could not be encrypted here, please encrypt whole key");
      if (e2.rsaBits < t2.minRSABits) throw Error(`rsaBits should be at least ${t2.minRSABits}, got: ${e2.rsaBits}`);
      const r2 = this.keyPacket;
      if (r2.isDummy()) throw Error("Cannot add subkey to gnu-dummy primary key");
      if (!r2.isDecrypted()) throw Error("Key is not decrypted");
      const n2 = r2.getAlgorithmInfo();
      n2.type = (function(e3) {
        switch (R.write(R.publicKey, e3)) {
          case R.publicKey.rsaEncrypt:
          case R.publicKey.rsaEncryptSign:
          case R.publicKey.rsaSign:
          case R.publicKey.dsa:
            return "rsa";
          case R.publicKey.ecdsa:
          case R.publicKey.eddsaLegacy:
            return "ecc";
          case R.publicKey.ed25519:
            return "curve25519";
          case R.publicKey.ed448:
            return "curve448";
          default:
            throw Error("Unsupported algorithm");
        }
      })(n2.algorithm), n2.rsaBits = n2.bits || 4096, n2.curve = n2.curve || "curve25519Legacy", e2 = Ma(e2, n2);
      const i2 = await Ia(e2, { ...t2, v6Keys: 6 === this.keyPacket.version });
      Na(i2, t2);
      const s2 = await Ca(i2, r2, e2, t2), a2 = this.toPacketList();
      return a2.push(i2, s2), new _qa(a2);
    }
  };
  var _a = /* @__PURE__ */ N.constructAllowedPackets([ua, ya, pa, wa, Aa, ga, Ns]);
  function Ya(e2) {
    for (const t2 of e2) switch (t2.constructor.tag) {
      case R.packet.secretKey:
        return new qa(e2);
      case R.packet.publicKey:
        return new Va(e2);
    }
    throw Error("No key packet found");
  }
  async function Ja({ armoredKey: e2, binaryKey: t2, config: r2, ...n2 }) {
    if (r2 = { ...F, ...r2 }, !e2 && !t2) throw Error("readKey: must pass options object containing `armoredKey` or `binaryKey`");
    if (e2 && !N.isString(e2)) throw Error("readKey: options.armoredKey must be a string");
    if (t2 && !N.isUint8Array(t2)) throw Error("readKey: options.binaryKey must be a Uint8Array");
    const i2 = Object.keys(n2);
    if (i2.length > 0) throw Error("Unknown option: " + i2.join(", "));
    let s2;
    if (e2) {
      const { type: t3, data: r3 } = await $(e2);
      if (t3 !== R.armor.publicKey && t3 !== R.armor.privateKey) throw Error("Armored text not of type key");
      s2 = r3;
    } else s2 = t2;
    const a2 = await Gs.fromBinary(s2, _a, r2), o2 = a2.indexOfTag(R.packet.publicKey, R.packet.secretKey);
    if (0 === o2.length) throw Error("No key packet found");
    return Ya(a2.slice(o2[0], o2[1]));
  }
  var to = /* @__PURE__ */ N.constructAllowedPackets([ca]);
  var ro = /* @__PURE__ */ N.constructAllowedPackets([Ns]);
  var no = class _no {
    constructor(e2) {
      this.packets = e2 || new Gs();
    }
    getEncryptionKeyIDs() {
      const e2 = [];
      return this.packets.filterByTag(R.packet.publicKeyEncryptedSessionKey).forEach((function(t2) {
        e2.push(t2.publicKeyID);
      })), e2;
    }
    getSigningKeyIDs() {
      const e2 = this.unwrapCompressed(), t2 = e2.packets.filterByTag(R.packet.onePassSignature);
      if (t2.length > 0) return t2.map(((e3) => e3.issuerKeyID));
      return e2.packets.filterByTag(R.packet.signature).map(((e3) => e3.issuerKeyID));
    }
    async decrypt(e2, t2, r2, n2 = /* @__PURE__ */ new Date(), i2 = F) {
      const s2 = this.packets.filterByTag(R.packet.symmetricallyEncryptedData, R.packet.symEncryptedIntegrityProtectedData, R.packet.aeadEncryptedData);
      if (0 === s2.length) throw Error("No encrypted data found");
      const a2 = s2[0], o2 = a2.cipherAlgorithm, c2 = r2 || await this.decryptSessionKeys(e2, t2, o2, n2, i2);
      let u2 = null;
      const h2 = Promise.all(c2.map((async ({ algorithm: e3, data: t3 }) => {
        if (!N.isUint8Array(t3) || !a2.cipherAlgorithm && !N.isString(e3)) throw Error("Invalid session key for decryption.");
        try {
          const r3 = a2.cipherAlgorithm || R.write(R.symmetric, e3);
          await a2.decrypt(r3, t3, i2);
        } catch (e4) {
          N.printDebugError(e4), u2 = e4;
        }
      })));
      if (U(a2.encrypted), a2.encrypted = null, await h2, !a2.packets || !a2.packets.length) throw u2 || Error("Decryption failed.");
      const f2 = new _no(a2.packets);
      return a2.packets = new Gs(), f2;
    }
    async decryptSessionKeys(e2, t2, r2, n2 = /* @__PURE__ */ new Date(), i2 = F) {
      let s2, a2 = [];
      if (t2) {
        const e3 = this.packets.filterByTag(R.packet.symEncryptedSessionKey);
        if (0 === e3.length) throw Error("No symmetrically encrypted session key packet found.");
        await Promise.all(t2.map((async function(t3, r3) {
          let n3;
          n3 = r3 ? await Gs.fromBinary(e3.write(), to, i2) : e3, await Promise.all(n3.map((async function(e4) {
            try {
              await e4.decrypt(t3, i2), a2.push(e4);
            } catch (e5) {
              N.printDebugError(e5), e5 instanceof Pi && (s2 = e5);
            }
          })));
        })));
      } else {
        if (!e2) throw Error("No key or password specified.");
        {
          const t3 = this.packets.filterByTag(R.packet.publicKeyEncryptedSessionKey);
          if (0 === t3.length) throw Error("No public key encrypted session key packet found.");
          await Promise.all(t3.map((async function(t4) {
            await Promise.all(e2.map((async function(e3) {
              let o2;
              try {
                o2 = (await e3.getDecryptionKeys(t4.publicKeyID, null, void 0, i2)).map(((e4) => e4.keyPacket));
              } catch (e4) {
                return void (s2 = e4);
              }
              let c2 = [R.symmetric.aes256, R.symmetric.aes128, R.symmetric.tripledes, R.symmetric.cast5];
              try {
                const t5 = await e3.getPrimarySelfSignature(n2, void 0, i2);
                t5.preferredSymmetricAlgorithms && (c2 = c2.concat(t5.preferredSymmetricAlgorithms));
              } catch {
              }
              await Promise.all(o2.map((async function(e4) {
                if (!e4.isDecrypted()) throw Error("Decryption key is not decrypted.");
                if (i2.constantTimePKCS1Decryption && (t4.publicKeyAlgorithm === R.publicKey.rsaEncrypt || t4.publicKeyAlgorithm === R.publicKey.rsaEncryptSign || t4.publicKeyAlgorithm === R.publicKey.rsaSign || t4.publicKeyAlgorithm === R.publicKey.elgamal)) {
                  const n3 = t4.write();
                  await Promise.all((r2 ? [r2] : Array.from(i2.constantTimePKCS1DecryptionSupportedSymmetricAlgorithms)).map((async (t5) => {
                    const r3 = new aa();
                    r3.read(n3);
                    const i3 = { sessionKeyAlgorithm: t5, sessionKey: Fn(t5) };
                    try {
                      await r3.decrypt(e4, i3), a2.push(r3);
                    } catch (e5) {
                      N.printDebugError(e5), s2 = e5;
                    }
                  })));
                } else try {
                  await t4.decrypt(e4);
                  const n3 = r2 || t4.sessionKeyAlgorithm;
                  if (n3 && !c2.includes(R.write(R.symmetric, n3))) throw Error("A non-preferred symmetric algorithm was used.");
                  a2.push(t4);
                } catch (e5) {
                  N.printDebugError(e5), s2 = e5;
                }
              })));
            }))), U(t4.encrypted), t4.encrypted = null;
          })));
        }
      }
      if (a2.length > 0) {
        if (a2.length > 1) {
          const e3 = /* @__PURE__ */ new Set();
          a2 = a2.filter(((t3) => {
            const r3 = t3.sessionKeyAlgorithm + N.uint8ArrayToString(t3.sessionKey);
            return !e3.has(r3) && (e3.add(r3), true);
          }));
        }
        return a2.map(((e3) => ({ data: e3.sessionKey, algorithm: e3.sessionKeyAlgorithm && R.read(R.symmetric, e3.sessionKeyAlgorithm) })));
      }
      throw s2 || Error("Session key decryption failed.");
    }
    getLiteralData() {
      const e2 = this.unwrapCompressed().packets.findPacket(R.packet.literalData);
      return e2 && e2.getBytes() || null;
    }
    getFilename() {
      const e2 = this.unwrapCompressed().packets.findPacket(R.packet.literalData);
      return e2 && e2.getFilename() || null;
    }
    getText() {
      const e2 = this.unwrapCompressed().packets.findPacket(R.packet.literalData);
      return e2 ? e2.getText() : null;
    }
    static async generateSessionKey(e2 = [], t2 = /* @__PURE__ */ new Date(), r2 = [], n2 = F) {
      const { symmetricAlgo: i2, aeadAlgo: s2 } = await (async function(e3 = [], t3 = /* @__PURE__ */ new Date(), r3 = [], n3 = F) {
        const i3 = await Promise.all(e3.map(((e4, i4) => e4.getPrimarySelfSignature(t3, r3[i4], n3))));
        if (e3.length ? i3.every(((e4) => e4.features && e4.features[0] & R.features.seipdv2)) : n3.aeadProtect) {
          const e4 = { symmetricAlgo: R.symmetric.aes128, aeadAlgo: R.aead.ocb }, t4 = [{ symmetricAlgo: n3.preferredSymmetricAlgorithm, aeadAlgo: n3.preferredAEADAlgorithm }, { symmetricAlgo: n3.preferredSymmetricAlgorithm, aeadAlgo: R.aead.ocb }, { symmetricAlgo: R.symmetric.aes128, aeadAlgo: n3.preferredAEADAlgorithm }];
          for (const e5 of t4) if (i3.every(((t5) => t5.preferredCipherSuites && t5.preferredCipherSuites.some(((t6) => t6[0] === e5.symmetricAlgo && t6[1] === e5.aeadAlgo))))) return e5;
          return e4;
        }
        const s3 = R.symmetric.aes128, a3 = n3.preferredSymmetricAlgorithm;
        return { symmetricAlgo: i3.every(((e4) => e4.preferredSymmetricAlgorithms && e4.preferredSymmetricAlgorithms.includes(a3))) ? a3 : s3, aeadAlgo: void 0 };
      })(e2, t2, r2, n2), a2 = R.read(R.symmetric, i2), o2 = s2 ? R.read(R.aead, s2) : void 0;
      await Promise.all(e2.map(((e3) => e3.getEncryptionKey().catch((() => null)).then(((e4) => {
        if (e4 && (e4.keyPacket.algorithm === R.publicKey.x25519 || e4.keyPacket.algorithm === R.publicKey.x448) && !o2 && !N.isAES(i2)) throw Error("Could not generate a session key compatible with the given `encryptionKeys`: X22519 and X448 keys can only be used to encrypt AES session keys; change `config.preferredSymmetricAlgorithm` accordingly.");
      })))));
      return { data: Fn(i2), algorithm: a2, aeadAlgorithm: o2 };
    }
    async encrypt(e2, t2, r2, n2 = false, i2 = [], s2 = /* @__PURE__ */ new Date(), a2 = [], o2 = F) {
      if (r2) {
        if (!N.isUint8Array(r2.data) || !N.isString(r2.algorithm)) throw Error("Invalid session key for encryption.");
      } else if (e2 && e2.length) r2 = await _no.generateSessionKey(e2, s2, a2, o2);
      else {
        if (!t2 || !t2.length) throw Error("No keys, passwords, or session key provided.");
        r2 = await _no.generateSessionKey(void 0, void 0, void 0, o2);
      }
      const { data: c2, algorithm: u2, aeadAlgorithm: h2 } = r2, f2 = await _no.encryptSessionKey(c2, u2, h2, e2, t2, n2, i2, s2, a2, o2), l2 = ra.fromObject({ version: h2 ? 2 : 1, aeadAlgorithm: h2 ? R.write(R.aead, h2) : null });
      l2.packets = this.packets;
      const y2 = R.write(R.symmetric, u2);
      return await l2.encrypt(y2, c2, o2), f2.packets.push(l2), l2.packets = new Gs(), f2;
    }
    static async encryptSessionKey(e2, t2, r2, n2, i2, s2 = false, a2 = [], o2 = /* @__PURE__ */ new Date(), c2 = [], u2 = F) {
      const h2 = new Gs(), f2 = R.write(R.symmetric, t2), l2 = r2 && R.write(R.aead, r2);
      if (n2) {
        const t3 = await Promise.all(n2.map((async function(t4, r3) {
          const n3 = await t4.getEncryptionKey(a2[r3], o2, c2, u2), i3 = aa.fromObject({ version: l2 ? 6 : 3, encryptionKeyPacket: n3.keyPacket, anonymousRecipient: s2, sessionKey: e2, sessionKeyAlgorithm: f2 });
          return await i3.encrypt(n3.keyPacket), delete i3.sessionKey, i3;
        })));
        h2.push(...t3);
      }
      if (i2) {
        const t3 = async function(e3, t4) {
          try {
            return await e3.decrypt(t4, u2), 1;
          } catch {
            return 0;
          }
        }, r3 = (e3, t4) => e3 + t4, n3 = async function(e3, s4, a3, o3) {
          const c3 = new ca(u2);
          if (c3.sessionKey = e3, c3.sessionKeyAlgorithm = s4, a3 && (c3.aeadAlgorithm = a3), await c3.encrypt(o3, u2), u2.passwordCollisionCheck) {
            if (1 !== (await Promise.all(i2.map(((e4) => t3(c3, e4))))).reduce(r3)) return n3(e3, s4, o3);
          }
          return delete c3.sessionKey, c3;
        }, s3 = await Promise.all(i2.map(((t4) => n3(e2, f2, l2, t4))));
        h2.push(...s3);
      }
      return new _no(h2);
    }
    async sign(e2 = [], t2 = [], r2 = null, n2 = [], i2 = /* @__PURE__ */ new Date(), s2 = [], a2 = [], o2 = [], c2 = F) {
      const u2 = new Gs(), h2 = this.packets.findPacket(R.packet.literalData);
      if (!h2) throw Error("No literal data packet to sign.");
      const f2 = await io(h2, e2, t2, r2, n2, i2, s2, a2, o2, false, c2), l2 = f2.map(((e3, t3) => Hs.fromSignaturePacket(e3, 0 === t3))).reverse();
      return u2.push(...l2), u2.push(h2), u2.push(...f2), new _no(u2);
    }
    compress(e2, t2 = F) {
      if (e2 === R.compression.uncompressed) return this;
      const r2 = new Ys(t2);
      r2.algorithm = e2, r2.packets = this.packets;
      const n2 = new Gs();
      return n2.push(r2), new _no(n2);
    }
    async signDetached(e2 = [], t2 = [], r2 = null, n2 = [], i2 = /* @__PURE__ */ new Date(), s2 = [], a2 = [], o2 = [], c2 = F) {
      const u2 = this.packets.findPacket(R.packet.literalData);
      if (!u2) throw Error("No literal data packet to sign.");
      return new Ea(await io(u2, e2, t2, r2, n2, i2, s2, a2, o2, true, c2));
    }
    async verify(e2, t2 = /* @__PURE__ */ new Date(), r2 = F) {
      const n2 = this.unwrapCompressed(), i2 = n2.packets.filterByTag(R.packet.literalData);
      if (1 !== i2.length) throw Error("Can only verify message with one literal data packet.");
      let s2 = n2.packets;
      o(s2.stream) && (s2 = s2.concat(await D(s2.stream, ((e3) => e3 || []))));
      const a2 = s2.filterByTag(R.packet.onePassSignature).reverse(), c2 = s2.filterByTag(R.packet.signature);
      return a2.length && !c2.length && N.isStream(s2.stream) && !o(s2.stream) ? (await Promise.all(a2.map((async (e3) => {
        e3.correspondingSig = new Promise(((t3, r3) => {
          e3.correspondingSigResolve = t3, e3.correspondingSigReject = r3;
        })), e3.signatureData = P((async () => (await e3.correspondingSig).signatureData)), e3.hashed = D(await e3.hash(e3.signatureType, i2[0], void 0, false)), e3.hashed.catch((() => {
        }));
      }))), s2.stream = v(s2.stream, (async (e3, t3) => {
        const r3 = x(e3), n3 = Q(t3);
        try {
          for (let e4 = 0; e4 < a2.length; e4++) {
            const { value: t4 } = await r3.read();
            a2[e4].correspondingSigResolve(t4);
          }
          await r3.readToEnd(), await n3.ready, await n3.close();
        } catch (e4) {
          a2.forEach(((t4) => {
            t4.correspondingSigReject(e4);
          })), await n3.abort(e4);
        }
      })), so(a2, i2, e2, t2, false, r2)) : so(c2, i2, e2, t2, false, r2);
    }
    async verifyDetached(e2, t2, r2 = /* @__PURE__ */ new Date(), n2 = F) {
      const i2 = this.unwrapCompressed().packets.filterByTag(R.packet.literalData);
      if (1 !== i2.length) throw Error("Can only verify message with one literal data packet.");
      return so(e2.packets.filterByTag(R.packet.signature), i2, t2, r2, true, n2);
    }
    unwrapCompressed() {
      const e2 = this.packets.filterByTag(R.packet.compressedData);
      return e2.length ? new _no(e2[0].packets) : this;
    }
    async appendSignature(e2, t2 = F) {
      await this.packets.read(N.isUint8Array(e2) ? e2 : (await $(e2)).data, ro, t2);
    }
    write() {
      return this.packets.write();
    }
    armor(e2 = F) {
      const t2 = this.packets[this.packets.length - 1], r2 = t2.constructor.tag === ra.tag ? 2 !== t2.version : this.packets.some(((e3) => e3.constructor.tag === Ns.tag && 6 !== e3.version));
      return ee(R.armor.message, this.write(), null, null, null, r2, e2);
    }
  };
  async function io(e2, t2, r2 = [], n2 = null, i2 = [], s2 = /* @__PURE__ */ new Date(), a2 = [], o2 = [], c2 = [], u2 = false, h2 = F) {
    const f2 = new Gs(), l2 = null === e2.text ? R.signature.binary : R.signature.text;
    if (await Promise.all(t2.map((async (t3, n3) => {
      const f3 = a2[n3];
      if (!t3.isPrivate()) throw Error("Need private key for signing");
      const y2 = await t3.getSigningKey(i2[n3], s2, f3, h2);
      return Ua(e2, r2.length ? r2 : [t3], y2.keyPacket, { signatureType: l2 }, s2, o2, c2, u2, h2);
    }))).then(((e3) => {
      f2.push(...e3);
    })), n2) {
      const e3 = n2.packets.filterByTag(R.packet.signature);
      f2.push(...e3);
    }
    return f2;
  }
  function so(e2, t2, r2, n2 = /* @__PURE__ */ new Date(), i2 = false, s2 = F) {
    return e2.filter(((e3) => ["text", "binary"].includes(R.read(R.signature, e3.signatureType)))).map(((e3) => (function(e4, t3, r3, n3 = /* @__PURE__ */ new Date(), i3 = false, s3 = F) {
      let a2, o2;
      for (const t4 of r3) {
        const r4 = t4.getKeys(e4.issuerKeyID);
        if (r4.length > 0) {
          a2 = t4, o2 = r4[0];
          break;
        }
      }
      const c2 = e4 instanceof Hs ? e4.correspondingSig : e4, u2 = { keyID: e4.issuerKeyID, verified: (async () => {
        if (!o2) throw Error("Could not find signing key with key ID " + e4.issuerKeyID.toHex());
        await e4.verify(o2.keyPacket, e4.signatureType, t3[0], n3, i3, s3);
        const r4 = await c2;
        if (o2.getCreationTime() > r4.created) throw Error("Key is newer than the signature");
        try {
          await a2.getSigningKey(o2.getKeyID(), r4.created, void 0, s3);
        } catch (e5) {
          if (!s3.allowInsecureVerificationWithReformattedKeys || !e5.message.match(/Signature creation time is in the future/)) throw e5;
          await a2.getSigningKey(o2.getKeyID(), n3, void 0, s3);
        }
        return true;
      })(), signature: (async () => {
        const e5 = await c2, t4 = new Gs();
        return e5 && t4.push(e5), new Ea(t4);
      })() };
      return u2.signature.catch((() => {
      })), u2.verified.catch((() => {
      })), u2;
    })(e3, t2, r2, n2, i2, s2)));
  }
  async function oo({ text: e2, binary: t2, filename: r2, date: n2 = /* @__PURE__ */ new Date(), format: i2 = void 0 !== e2 ? "utf8" : "binary", ...s2 }) {
    const a2 = void 0 !== e2 ? e2 : t2;
    if (void 0 === a2) throw Error("createMessage: must pass options object containing `text` or `binary`");
    if (e2 && !N.isString(e2) && !N.isStream(e2)) throw Error("createMessage: options.text must be a string or stream");
    if (t2 && !N.isUint8Array(t2) && !N.isStream(t2)) throw Error("createMessage: options.binary must be a Uint8Array or stream");
    const o2 = Object.keys(s2);
    if (o2.length > 0) throw Error("Unknown option: " + o2.join(", "));
    const c2 = N.isStream(a2), u2 = new Qs(n2);
    void 0 !== e2 ? u2.setText(a2, R.write(R.literal, i2)) : u2.setBytes(a2, R.write(R.literal, i2)), void 0 !== r2 && u2.setFilename(r2);
    const h2 = new Gs();
    h2.push(u2);
    const f2 = new no(h2);
    return f2.fromStream = c2, f2;
  }
  var uo = class _uo {
    constructor(e2, t2) {
      if (this.text = N.removeTrailingSpaces(e2).replace(/\r?\n/g, "\r\n"), t2 && !(t2 instanceof Ea)) throw Error("Invalid signature input");
      this.signature = t2 || new Ea(new Gs());
    }
    getSigningKeyIDs() {
      const e2 = [];
      return this.signature.packets.forEach((function(t2) {
        e2.push(t2.issuerKeyID);
      })), e2;
    }
    async sign(e2, t2 = [], r2 = null, n2 = [], i2 = /* @__PURE__ */ new Date(), s2 = [], a2 = [], o2 = [], c2 = F) {
      const u2 = new Qs();
      u2.setText(this.text);
      const h2 = new Ea(await io(u2, e2, t2, r2, n2, i2, s2, a2, o2, true, c2));
      return new _uo(this.text, h2);
    }
    verify(e2, t2 = /* @__PURE__ */ new Date(), r2 = F) {
      const n2 = this.signature.packets.filterByTag(R.packet.signature), i2 = new Qs();
      return i2.setText(this.text), so(n2, [i2], e2, t2, true, r2);
    }
    getText() {
      return this.text.replace(/\r\n/g, "\n");
    }
    armor(e2 = F) {
      const t2 = this.signature.packets.some(((e3) => 6 !== e3.version)), r2 = { hash: t2 ? Array.from(new Set(this.signature.packets.map(((e3) => R.read(R.hash, e3.hashAlgorithm).toUpperCase())))).join() : null, text: this.text, data: this.signature.packets.write() };
      return ee(R.armor.signed, r2, void 0, void 0, void 0, t2, e2);
    }
  };
  async function ko({ message: e2, verificationKeys: t2, expectSigned: r2 = false, format: n2 = "utf8", signature: i2 = null, date: s2 = /* @__PURE__ */ new Date(), config: a2, ...o2 }) {
    if (Do(a2 = { ...F, ...a2 }), So(e2), t2 = Uo(t2), o2.publicKeys) throw Error("The `publicKeys` option has been removed from openpgp.verify, pass `verificationKeys` instead");
    const c2 = Object.keys(o2);
    if (c2.length > 0) throw Error("Unknown option: " + c2.join(", "));
    if (e2 instanceof uo && "binary" === n2) throw Error("Can't return cleartext message data as binary");
    if (e2 instanceof uo && i2) throw Error("Can't verify detached cleartext signature");
    try {
      const o3 = {};
      if (o3.signatures = i2 ? await e2.verifyDetached(i2, t2, s2, a2) : await e2.verify(t2, s2, a2), o3.data = "binary" === n2 ? e2.getLiteralData() : e2.getText(), e2.fromStream && !i2 && xo(o3, .../* @__PURE__ */ new Set([e2, e2.unwrapCompressed()])), r2) {
        if (0 === o3.signatures.length) throw Error("Message is not signed");
        o3.data = A([o3.data, P((async () => (await N.anyPromise(o3.signatures.map(((e3) => e3.verified))), "binary" === n2 ? new Uint8Array() : "")))]);
      }
      return o3.data = await Po(o3.data), o3;
    } catch (e3) {
      throw N.wrapError("Error verifying signed message", e3);
    }
  }
  function So(e2) {
    if (!(e2 instanceof uo || e2 instanceof no)) throw Error("Parameter [message] needs to be of type Message or CleartextMessage");
  }
  var Co = Object.keys(F).length;
  function Do(e2) {
    const t2 = Object.keys(e2);
    if (t2.length !== Co) {
      for (const e3 of t2) if (void 0 === F[e3]) throw Error("Unknown config property: " + e3);
    }
  }
  function Uo(e2) {
    return e2 && !N.isArray(e2) && (e2 = [e2]), e2;
  }
  async function Po(e2) {
    return "array" === N.isStream(e2) ? D(e2) : e2;
  }
  function xo(e2, t2, ...r2) {
    e2.data = v(t2.packets.stream, (async (t3, n2) => {
      await w(e2.data, n2, { preventClose: true });
      const i2 = Q(n2);
      try {
        await D(t3, ((e3) => e3)), await Promise.all(r2.map(((e3) => D(e3.packets.stream, ((e4) => e4))))), await i2.close();
      } catch (e3) {
        await i2.abort(e3);
      }
    }));
  }
  var Mo = "object" == typeof e && "crypto" in e ? e.crypto : void 0;
  function Ro(e2) {
    return e2 instanceof Uint8Array || ArrayBuffer.isView(e2) && "Uint8Array" === e2.constructor.name;
  }
  function Fo(e2) {
    if (!Number.isSafeInteger(e2) || e2 < 0) throw Error("positive integer expected, got " + e2);
  }
  function To(e2, ...t2) {
    if (!Ro(e2)) throw Error("Uint8Array expected");
    if (t2.length > 0 && !t2.includes(e2.length)) throw Error("Uint8Array expected of length " + t2 + ", got length=" + e2.length);
  }
  function No(e2) {
    if ("function" != typeof e2 || "function" != typeof e2.create) throw Error("Hash should be wrapped by utils.createHasher");
    Fo(e2.outputLen), Fo(e2.blockLen);
  }
  function Lo(e2, t2 = true) {
    if (e2.destroyed) throw Error("Hash instance has been destroyed");
    if (t2 && e2.finished) throw Error("Hash#digest() has already been called");
  }
  function Oo(e2, t2) {
    To(e2);
    const r2 = t2.outputLen;
    if (e2.length < r2) throw Error("digestInto() expects output buffer of length at least " + r2);
  }
  function Ho(...e2) {
    for (let t2 = 0; t2 < e2.length; t2++) e2[t2].fill(0);
  }
  function zo(e2) {
    return new DataView(e2.buffer, e2.byteOffset, e2.byteLength);
  }
  function Go(e2, t2) {
    return e2 << 32 - t2 | e2 >>> t2;
  }
  function jo(e2, t2) {
    return e2 << t2 | e2 >>> 32 - t2 >>> 0;
  }
  var Vo = /* @__PURE__ */ (() => 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])() ? (e2) => e2 : function(e2) {
    for (let r2 = 0; r2 < e2.length; r2++) e2[r2] = (t2 = e2[r2]) << 24 & 4278190080 | t2 << 8 & 16711680 | t2 >>> 8 & 65280 | t2 >>> 24 & 255;
    var t2;
    return e2;
  };
  var qo = /* @__PURE__ */ (() => "function" == typeof Uint8Array.from([]).toHex && "function" == typeof Uint8Array.fromHex)();
  var _o = /* @__PURE__ */ Array.from({ length: 256 }, ((e2, t2) => t2.toString(16).padStart(2, "0")));
  function Yo(e2) {
    if (To(e2), qo) return e2.toHex();
    let t2 = "";
    for (let r2 = 0; r2 < e2.length; r2++) t2 += _o[e2[r2]];
    return t2;
  }
  var Zo = 48;
  var Jo = 57;
  var Wo = 65;
  var Xo = 70;
  var $o = 97;
  var ec = 102;
  function tc(e2) {
    return e2 >= Zo && e2 <= Jo ? e2 - Zo : e2 >= Wo && e2 <= Xo ? e2 - (Wo - 10) : e2 >= $o && e2 <= ec ? e2 - ($o - 10) : void 0;
  }
  function rc(e2) {
    if ("string" != typeof e2) throw Error("hex string expected, got " + typeof e2);
    if (qo) return Uint8Array.fromHex(e2);
    const t2 = e2.length, r2 = t2 / 2;
    if (t2 % 2) throw Error("hex string expected, got unpadded hex of length " + t2);
    const n2 = new Uint8Array(r2);
    for (let t3 = 0, i2 = 0; t3 < r2; t3++, i2 += 2) {
      const r3 = tc(e2.charCodeAt(i2)), s2 = tc(e2.charCodeAt(i2 + 1));
      if (void 0 === r3 || void 0 === s2) {
        const t4 = e2[i2] + e2[i2 + 1];
        throw Error('hex string expected, got non-hex character "' + t4 + '" at index ' + i2);
      }
      n2[t3] = 16 * r3 + s2;
    }
    return n2;
  }
  function nc(e2) {
    return "string" == typeof e2 && (e2 = (function(e3) {
      if ("string" != typeof e3) throw Error("string expected");
      return new Uint8Array(new TextEncoder().encode(e3));
    })(e2)), To(e2), e2;
  }
  function ic(...e2) {
    let t2 = 0;
    for (let r3 = 0; r3 < e2.length; r3++) {
      const n2 = e2[r3];
      To(n2), t2 += n2.length;
    }
    const r2 = new Uint8Array(t2);
    for (let t3 = 0, n2 = 0; t3 < e2.length; t3++) {
      const i2 = e2[t3];
      r2.set(i2, n2), n2 += i2.length;
    }
    return r2;
  }
  var sc = class {
  };
  function ac(e2) {
    const t2 = (t3) => e2().update(nc(t3)).digest(), r2 = e2();
    return t2.outputLen = r2.outputLen, t2.blockLen = r2.blockLen, t2.create = () => e2(), t2;
  }
  var oc = ac;
  function cc(e2 = 32) {
    if (Mo && "function" == typeof Mo.getRandomValues) return Mo.getRandomValues(new Uint8Array(e2));
    if (Mo && "function" == typeof Mo.randomBytes) return Uint8Array.from(Mo.randomBytes(e2));
    throw Error("crypto.getRandomValues must be defined");
  }
  var uc = /* @__PURE__ */ BigInt(0);
  var hc = /* @__PURE__ */ BigInt(1);
  function fc(e2, t2 = "") {
    if ("boolean" != typeof e2) {
      throw Error((t2 && `"${t2}"`) + "expected boolean, got type=" + typeof e2);
    }
    return e2;
  }
  function lc(e2, t2, r2 = "") {
    const n2 = Ro(e2), i2 = e2?.length, s2 = void 0 !== t2;
    if (!n2 || s2 && i2 !== t2) {
      throw Error((r2 && `"${r2}" `) + "expected Uint8Array" + (s2 ? " of length " + t2 : "") + ", got " + (n2 ? "length=" + i2 : "type=" + typeof e2));
    }
    return e2;
  }
  function yc(e2) {
    const t2 = e2.toString(16);
    return 1 & t2.length ? "0" + t2 : t2;
  }
  function gc(e2) {
    if ("string" != typeof e2) throw Error("hex string expected, got " + typeof e2);
    return "" === e2 ? uc : BigInt("0x" + e2);
  }
  function pc(e2) {
    return gc(Yo(e2));
  }
  function dc(e2) {
    return To(e2), gc(Yo(Uint8Array.from(e2).reverse()));
  }
  function Ac(e2, t2) {
    return rc(e2.toString(16).padStart(2 * t2, "0"));
  }
  function wc(e2, t2) {
    return Ac(e2, t2).reverse();
  }
  function mc(e2, t2, r2) {
    let n2;
    if ("string" == typeof t2) try {
      n2 = rc(t2);
    } catch (t3) {
      throw Error(e2 + " must be hex string or Uint8Array, cause: " + t3);
    }
    else {
      if (!Ro(t2)) throw Error(e2 + " must be hex string or Uint8Array");
      n2 = Uint8Array.from(t2);
    }
    const i2 = n2.length;
    if ("number" == typeof r2 && i2 !== r2) throw Error(e2 + " of length " + r2 + " expected, got " + i2);
    return n2;
  }
  function bc(e2) {
    return Uint8Array.from(e2);
  }
  var kc = (e2) => "bigint" == typeof e2 && uc <= e2;
  function Ec(e2, t2, r2, n2) {
    if (!(function(e3, t3, r3) {
      return kc(e3) && kc(t3) && kc(r3) && t3 <= e3 && e3 < r3;
    })(t2, r2, n2)) throw Error("expected valid " + e2 + ": " + r2 + " <= n < " + n2 + ", got " + t2);
  }
  function vc(e2) {
    let t2;
    for (t2 = 0; e2 > uc; e2 >>= hc, t2 += 1) ;
    return t2;
  }
  var Ic = (e2) => (hc << BigInt(e2)) - hc;
  function Bc(e2, t2, r2 = {}) {
    if (!e2 || "object" != typeof e2) throw Error("expected valid options object");
    function n2(t3, r3, n3) {
      const i2 = e2[t3];
      if (n3 && void 0 === i2) return;
      const s2 = typeof i2;
      if (s2 !== r3 || null === i2) throw Error(`param "${t3}" is invalid: expected ${r3}, got ${s2}`);
    }
    Object.entries(t2).forEach((([e3, t3]) => n2(e3, t3, false))), Object.entries(r2).forEach((([e3, t3]) => n2(e3, t3, true)));
  }
  function Sc(e2) {
    const t2 = /* @__PURE__ */ new WeakMap();
    return (r2, ...n2) => {
      const i2 = t2.get(r2);
      if (void 0 !== i2) return i2;
      const s2 = e2(r2, ...n2);
      return t2.set(r2, s2), s2;
    };
  }
  var Kc = BigInt(0);
  var Cc = BigInt(1);
  var Dc = /* @__PURE__ */ BigInt(2);
  var Uc = /* @__PURE__ */ BigInt(3);
  var Pc = /* @__PURE__ */ BigInt(4);
  var xc = /* @__PURE__ */ BigInt(5);
  var Qc = /* @__PURE__ */ BigInt(7);
  var Mc = /* @__PURE__ */ BigInt(8);
  var Rc = /* @__PURE__ */ BigInt(9);
  var Fc = /* @__PURE__ */ BigInt(16);
  function Tc(e2, t2) {
    const r2 = e2 % t2;
    return r2 >= Kc ? r2 : t2 + r2;
  }
  function Nc(e2, t2, r2) {
    let n2 = e2;
    for (; t2-- > Kc; ) n2 *= n2, n2 %= r2;
    return n2;
  }
  function Lc(e2, t2) {
    if (e2 === Kc) throw Error("invert: expected non-zero number");
    if (t2 <= Kc) throw Error("invert: expected positive modulus, got " + t2);
    let r2 = Tc(e2, t2), n2 = t2, i2 = Kc, s2 = Cc;
    for (; r2 !== Kc; ) {
      const e3 = n2 % r2, t3 = i2 - s2 * (n2 / r2);
      n2 = r2, r2 = e3, i2 = s2, s2 = t3;
    }
    if (n2 !== Cc) throw Error("invert: does not exist");
    return Tc(i2, t2);
  }
  function Oc(e2, t2, r2) {
    if (!e2.eql(e2.sqr(t2), r2)) throw Error("Cannot find square root");
  }
  function Hc(e2, t2) {
    const r2 = (e2.ORDER + Cc) / Pc, n2 = e2.pow(t2, r2);
    return Oc(e2, n2, t2), n2;
  }
  function zc(e2, t2) {
    const r2 = (e2.ORDER - xc) / Mc, n2 = e2.mul(t2, Dc), i2 = e2.pow(n2, r2), s2 = e2.mul(t2, i2), a2 = e2.mul(e2.mul(s2, Dc), i2), o2 = e2.mul(s2, e2.sub(a2, e2.ONE));
    return Oc(e2, o2, t2), o2;
  }
  function Gc(e2) {
    if (e2 < Uc) throw Error("sqrt is not defined for small field");
    let t2 = e2 - Cc, r2 = 0;
    for (; t2 % Dc === Kc; ) t2 /= Dc, r2++;
    let n2 = Dc;
    const i2 = Zc(e2);
    for (; 1 === _c(i2, n2); ) if (n2++ > 1e3) throw Error("Cannot find square root: probably non-prime P");
    if (1 === r2) return Hc;
    let s2 = i2.pow(n2, t2);
    const a2 = (t2 + Cc) / Dc;
    return function(e3, n3) {
      if (e3.is0(n3)) return n3;
      if (1 !== _c(e3, n3)) throw Error("Cannot find square root");
      let i3 = r2, o2 = e3.mul(e3.ONE, s2), c2 = e3.pow(n3, t2), u2 = e3.pow(n3, a2);
      for (; !e3.eql(c2, e3.ONE); ) {
        if (e3.is0(c2)) return e3.ZERO;
        let t3 = 1, r3 = e3.sqr(c2);
        for (; !e3.eql(r3, e3.ONE); ) if (t3++, r3 = e3.sqr(r3), t3 === i3) throw Error("Cannot find square root");
        const n4 = Cc << BigInt(i3 - t3 - 1), s3 = e3.pow(o2, n4);
        i3 = t3, o2 = e3.sqr(s3), c2 = e3.mul(c2, o2), u2 = e3.mul(u2, s3);
      }
      return u2;
    };
  }
  function jc(e2) {
    return e2 % Pc === Uc ? Hc : e2 % Mc === xc ? zc : e2 % Fc === Rc ? (function(e3) {
      const t2 = Zc(e3), r2 = Gc(e3), n2 = r2(t2, t2.neg(t2.ONE)), i2 = r2(t2, n2), s2 = r2(t2, t2.neg(n2)), a2 = (e3 + Qc) / Fc;
      return (e4, t3) => {
        let r3 = e4.pow(t3, a2), o2 = e4.mul(r3, n2);
        const c2 = e4.mul(r3, i2), u2 = e4.mul(r3, s2), h2 = e4.eql(e4.sqr(o2), t3), f2 = e4.eql(e4.sqr(c2), t3);
        r3 = e4.cmov(r3, o2, h2), o2 = e4.cmov(u2, c2, f2);
        const l2 = e4.eql(e4.sqr(o2), t3), y2 = e4.cmov(r3, o2, l2);
        return Oc(e4, y2, t3), y2;
      };
    })(e2) : Gc(e2);
  }
  var Vc = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
  function qc(e2, t2, r2 = false) {
    const n2 = Array(t2.length).fill(r2 ? e2.ZERO : void 0), i2 = t2.reduce(((t3, r3, i3) => e2.is0(r3) ? t3 : (n2[i3] = t3, e2.mul(t3, r3))), e2.ONE), s2 = e2.inv(i2);
    return t2.reduceRight(((t3, r3, i3) => e2.is0(r3) ? t3 : (n2[i3] = e2.mul(t3, n2[i3]), e2.mul(t3, r3))), s2), n2;
  }
  function _c(e2, t2) {
    const r2 = (e2.ORDER - Cc) / Dc, n2 = e2.pow(t2, r2), i2 = e2.eql(n2, e2.ONE), s2 = e2.eql(n2, e2.ZERO), a2 = e2.eql(n2, e2.neg(e2.ONE));
    if (!i2 && !s2 && !a2) throw Error("invalid Legendre symbol result");
    return i2 ? 1 : s2 ? 0 : -1;
  }
  function Yc(e2, t2) {
    void 0 !== t2 && Fo(t2);
    const r2 = void 0 !== t2 ? t2 : e2.toString(2).length;
    return { nBitLength: r2, nByteLength: Math.ceil(r2 / 8) };
  }
  function Zc(e2, t2, r2 = false, n2 = {}) {
    if (e2 <= Kc) throw Error("invalid field: expected ORDER > 0, got " + e2);
    let i2, s2, a2, o2 = false;
    if ("object" == typeof t2 && null != t2) {
      if (n2.sqrt || r2) throw Error("cannot specify opts in two arguments");
      const e3 = t2;
      e3.BITS && (i2 = e3.BITS), e3.sqrt && (s2 = e3.sqrt), "boolean" == typeof e3.isLE && (r2 = e3.isLE), "boolean" == typeof e3.modFromBytes && (o2 = e3.modFromBytes), a2 = e3.allowedLengths;
    } else "number" == typeof t2 && (i2 = t2), n2.sqrt && (s2 = n2.sqrt);
    const { nBitLength: c2, nByteLength: u2 } = Yc(e2, i2);
    if (u2 > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
    let h2;
    const f2 = Object.freeze({ ORDER: e2, isLE: r2, BITS: c2, BYTES: u2, MASK: Ic(c2), ZERO: Kc, ONE: Cc, allowedLengths: a2, create: (t3) => Tc(t3, e2), isValid: (t3) => {
      if ("bigint" != typeof t3) throw Error("invalid field element: expected bigint, got " + typeof t3);
      return Kc <= t3 && t3 < e2;
    }, is0: (e3) => e3 === Kc, isValidNot0: (e3) => !f2.is0(e3) && f2.isValid(e3), isOdd: (e3) => (e3 & Cc) === Cc, neg: (t3) => Tc(-t3, e2), eql: (e3, t3) => e3 === t3, sqr: (t3) => Tc(t3 * t3, e2), add: (t3, r3) => Tc(t3 + r3, e2), sub: (t3, r3) => Tc(t3 - r3, e2), mul: (t3, r3) => Tc(t3 * r3, e2), pow: (e3, t3) => (function(e4, t4, r3) {
      if (r3 < Kc) throw Error("invalid exponent, negatives unsupported");
      if (r3 === Kc) return e4.ONE;
      if (r3 === Cc) return t4;
      let n3 = e4.ONE, i3 = t4;
      for (; r3 > Kc; ) r3 & Cc && (n3 = e4.mul(n3, i3)), i3 = e4.sqr(i3), r3 >>= Cc;
      return n3;
    })(f2, e3, t3), div: (t3, r3) => Tc(t3 * Lc(r3, e2), e2), sqrN: (e3) => e3 * e3, addN: (e3, t3) => e3 + t3, subN: (e3, t3) => e3 - t3, mulN: (e3, t3) => e3 * t3, inv: (t3) => Lc(t3, e2), sqrt: s2 || ((t3) => (h2 || (h2 = jc(e2)), h2(f2, t3))), toBytes: (e3) => r2 ? wc(e3, u2) : Ac(e3, u2), fromBytes: (t3, n3 = true) => {
      if (a2) {
        if (!a2.includes(t3.length) || t3.length > u2) throw Error("Field.fromBytes: expected " + a2 + " bytes, got " + t3.length);
        const e3 = new Uint8Array(u2);
        e3.set(t3, r2 ? 0 : e3.length - t3.length), t3 = e3;
      }
      if (t3.length !== u2) throw Error("Field.fromBytes: expected " + u2 + " bytes, got " + t3.length);
      let i3 = r2 ? dc(t3) : pc(t3);
      if (o2 && (i3 = Tc(i3, e2)), !n3 && !f2.isValid(i3)) throw Error("invalid field element: outside of range 0..ORDER");
      return i3;
    }, invertBatch: (e3) => qc(f2, e3), cmov: (e3, t3, r3) => r3 ? t3 : e3 });
    return Object.freeze(f2);
  }
  function Jc(e2) {
    if ("bigint" != typeof e2) throw Error("field order must be bigint");
    const t2 = e2.toString(2).length;
    return Math.ceil(t2 / 8);
  }
  function Wc(e2) {
    const t2 = Jc(e2);
    return t2 + Math.ceil(t2 / 2);
  }
  function Xc(e2, t2, r2) {
    return e2 & t2 ^ ~e2 & r2;
  }
  function $c(e2, t2, r2) {
    return e2 & t2 ^ e2 & r2 ^ t2 & r2;
  }
  var eu = class extends sc {
    constructor(e2, t2, r2, n2) {
      super(), this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.blockLen = e2, this.outputLen = t2, this.padOffset = r2, this.isLE = n2, this.buffer = new Uint8Array(e2), this.view = zo(this.buffer);
    }
    update(e2) {
      Lo(this), To(e2 = nc(e2));
      const { view: t2, buffer: r2, blockLen: n2 } = this, i2 = e2.length;
      for (let s2 = 0; s2 < i2; ) {
        const a2 = Math.min(n2 - this.pos, i2 - s2);
        if (a2 !== n2) r2.set(e2.subarray(s2, s2 + a2), this.pos), this.pos += a2, s2 += a2, this.pos === n2 && (this.process(t2, 0), this.pos = 0);
        else {
          const t3 = zo(e2);
          for (; n2 <= i2 - s2; s2 += n2) this.process(t3, s2);
        }
      }
      return this.length += e2.length, this.roundClean(), this;
    }
    digestInto(e2) {
      Lo(this), Oo(e2, this), this.finished = true;
      const { buffer: t2, view: r2, blockLen: n2, isLE: i2 } = this;
      let { pos: s2 } = this;
      t2[s2++] = 128, Ho(this.buffer.subarray(s2)), this.padOffset > n2 - s2 && (this.process(r2, 0), s2 = 0);
      for (let e3 = s2; e3 < n2; e3++) t2[e3] = 0;
      !(function(e3, t3, r3, n3) {
        if ("function" == typeof e3.setBigUint64) return e3.setBigUint64(t3, r3, n3);
        const i3 = BigInt(32), s3 = BigInt(4294967295), a3 = Number(r3 >> i3 & s3), o3 = Number(r3 & s3), c3 = n3 ? 4 : 0, u3 = n3 ? 0 : 4;
        e3.setUint32(t3 + c3, a3, n3), e3.setUint32(t3 + u3, o3, n3);
      })(r2, n2 - 8, BigInt(8 * this.length), i2), this.process(r2, 0);
      const a2 = zo(e2), o2 = this.outputLen;
      if (o2 % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
      const c2 = o2 / 4, u2 = this.get();
      if (c2 > u2.length) throw Error("_sha2: outputLen bigger than state");
      for (let e3 = 0; e3 < c2; e3++) a2.setUint32(4 * e3, u2[e3], i2);
    }
    digest() {
      const { buffer: e2, outputLen: t2 } = this;
      this.digestInto(e2);
      const r2 = e2.slice(0, t2);
      return this.destroy(), r2;
    }
    _cloneInto(e2) {
      e2 || (e2 = new this.constructor()), e2.set(...this.get());
      const { blockLen: t2, buffer: r2, length: n2, finished: i2, destroyed: s2, pos: a2 } = this;
      return e2.destroyed = s2, e2.finished = i2, e2.length = n2, e2.pos = a2, n2 % t2 && e2.buffer.set(r2), e2;
    }
    clone() {
      return this._cloneInto();
    }
  };
  var tu = /* @__PURE__ */ Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
  var ru = /* @__PURE__ */ Uint32Array.from([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
  var nu = /* @__PURE__ */ Uint32Array.from([3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]);
  var iu = /* @__PURE__ */ Uint32Array.from([1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209]);
  var su = /* @__PURE__ */ BigInt(2 ** 32 - 1);
  var au = /* @__PURE__ */ BigInt(32);
  function ou(e2, t2 = false) {
    return t2 ? { h: Number(e2 & su), l: Number(e2 >> au & su) } : { h: 0 | Number(e2 >> au & su), l: 0 | Number(e2 & su) };
  }
  function cu(e2, t2 = false) {
    const r2 = e2.length;
    let n2 = new Uint32Array(r2), i2 = new Uint32Array(r2);
    for (let s2 = 0; s2 < r2; s2++) {
      const { h: r3, l: a2 } = ou(e2[s2], t2);
      [n2[s2], i2[s2]] = [r3, a2];
    }
    return [n2, i2];
  }
  var uu = (e2, t2, r2) => e2 >>> r2;
  var hu = (e2, t2, r2) => e2 << 32 - r2 | t2 >>> r2;
  var fu = (e2, t2, r2) => e2 >>> r2 | t2 << 32 - r2;
  var lu = (e2, t2, r2) => e2 << 32 - r2 | t2 >>> r2;
  var yu = (e2, t2, r2) => e2 << 64 - r2 | t2 >>> r2 - 32;
  var gu = (e2, t2, r2) => e2 >>> r2 - 32 | t2 << 64 - r2;
  function pu(e2, t2, r2, n2) {
    const i2 = (t2 >>> 0) + (n2 >>> 0);
    return { h: e2 + r2 + (i2 / 2 ** 32 | 0) | 0, l: 0 | i2 };
  }
  var du = (e2, t2, r2) => (e2 >>> 0) + (t2 >>> 0) + (r2 >>> 0);
  var Au = (e2, t2, r2, n2) => t2 + r2 + n2 + (e2 / 2 ** 32 | 0) | 0;
  var wu = (e2, t2, r2, n2) => (e2 >>> 0) + (t2 >>> 0) + (r2 >>> 0) + (n2 >>> 0);
  var mu = (e2, t2, r2, n2, i2) => t2 + r2 + n2 + i2 + (e2 / 2 ** 32 | 0) | 0;
  var bu = (e2, t2, r2, n2, i2) => (e2 >>> 0) + (t2 >>> 0) + (r2 >>> 0) + (n2 >>> 0) + (i2 >>> 0);
  var ku = (e2, t2, r2, n2, i2, s2) => t2 + r2 + n2 + i2 + s2 + (e2 / 2 ** 32 | 0) | 0;
  var Eu = /* @__PURE__ */ Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
  var vu = /* @__PURE__ */ new Uint32Array(64);
  var Iu = class extends eu {
    constructor(e2 = 32) {
      super(64, e2, 8, false), this.A = 0 | tu[0], this.B = 0 | tu[1], this.C = 0 | tu[2], this.D = 0 | tu[3], this.E = 0 | tu[4], this.F = 0 | tu[5], this.G = 0 | tu[6], this.H = 0 | tu[7];
    }
    get() {
      const { A: e2, B: t2, C: r2, D: n2, E: i2, F: s2, G: a2, H: o2 } = this;
      return [e2, t2, r2, n2, i2, s2, a2, o2];
    }
    set(e2, t2, r2, n2, i2, s2, a2, o2) {
      this.A = 0 | e2, this.B = 0 | t2, this.C = 0 | r2, this.D = 0 | n2, this.E = 0 | i2, this.F = 0 | s2, this.G = 0 | a2, this.H = 0 | o2;
    }
    process(e2, t2) {
      for (let r3 = 0; r3 < 16; r3++, t2 += 4) vu[r3] = e2.getUint32(t2, false);
      for (let e3 = 16; e3 < 64; e3++) {
        const t3 = vu[e3 - 15], r3 = vu[e3 - 2], n3 = Go(t3, 7) ^ Go(t3, 18) ^ t3 >>> 3, i3 = Go(r3, 17) ^ Go(r3, 19) ^ r3 >>> 10;
        vu[e3] = i3 + vu[e3 - 7] + n3 + vu[e3 - 16] | 0;
      }
      let { A: r2, B: n2, C: i2, D: s2, E: a2, F: o2, G: c2, H: u2 } = this;
      for (let e3 = 0; e3 < 64; e3++) {
        const t3 = u2 + (Go(a2, 6) ^ Go(a2, 11) ^ Go(a2, 25)) + Xc(a2, o2, c2) + Eu[e3] + vu[e3] | 0, h2 = (Go(r2, 2) ^ Go(r2, 13) ^ Go(r2, 22)) + $c(r2, n2, i2) | 0;
        u2 = c2, c2 = o2, o2 = a2, a2 = s2 + t3 | 0, s2 = i2, i2 = n2, n2 = r2, r2 = t3 + h2 | 0;
      }
      r2 = r2 + this.A | 0, n2 = n2 + this.B | 0, i2 = i2 + this.C | 0, s2 = s2 + this.D | 0, a2 = a2 + this.E | 0, o2 = o2 + this.F | 0, c2 = c2 + this.G | 0, u2 = u2 + this.H | 0, this.set(r2, n2, i2, s2, a2, o2, c2, u2);
    }
    roundClean() {
      Ho(vu);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0), Ho(this.buffer);
    }
  };
  var Bu = class extends Iu {
    constructor() {
      super(28), this.A = 0 | ru[0], this.B = 0 | ru[1], this.C = 0 | ru[2], this.D = 0 | ru[3], this.E = 0 | ru[4], this.F = 0 | ru[5], this.G = 0 | ru[6], this.H = 0 | ru[7];
    }
  };
  var Su = /* @__PURE__ */ (() => cu(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(((e2) => BigInt(e2)))))();
  var Ku = /* @__PURE__ */ (() => Su[0])();
  var Cu = /* @__PURE__ */ (() => Su[1])();
  var Du = /* @__PURE__ */ new Uint32Array(80);
  var Uu = /* @__PURE__ */ new Uint32Array(80);
  var Pu = class extends eu {
    constructor(e2 = 64) {
      super(128, e2, 16, false), this.Ah = 0 | iu[0], this.Al = 0 | iu[1], this.Bh = 0 | iu[2], this.Bl = 0 | iu[3], this.Ch = 0 | iu[4], this.Cl = 0 | iu[5], this.Dh = 0 | iu[6], this.Dl = 0 | iu[7], this.Eh = 0 | iu[8], this.El = 0 | iu[9], this.Fh = 0 | iu[10], this.Fl = 0 | iu[11], this.Gh = 0 | iu[12], this.Gl = 0 | iu[13], this.Hh = 0 | iu[14], this.Hl = 0 | iu[15];
    }
    get() {
      const { Ah: e2, Al: t2, Bh: r2, Bl: n2, Ch: i2, Cl: s2, Dh: a2, Dl: o2, Eh: c2, El: u2, Fh: h2, Fl: f2, Gh: l2, Gl: y2, Hh: g2, Hl: p2 } = this;
      return [e2, t2, r2, n2, i2, s2, a2, o2, c2, u2, h2, f2, l2, y2, g2, p2];
    }
    set(e2, t2, r2, n2, i2, s2, a2, o2, c2, u2, h2, f2, l2, y2, g2, p2) {
      this.Ah = 0 | e2, this.Al = 0 | t2, this.Bh = 0 | r2, this.Bl = 0 | n2, this.Ch = 0 | i2, this.Cl = 0 | s2, this.Dh = 0 | a2, this.Dl = 0 | o2, this.Eh = 0 | c2, this.El = 0 | u2, this.Fh = 0 | h2, this.Fl = 0 | f2, this.Gh = 0 | l2, this.Gl = 0 | y2, this.Hh = 0 | g2, this.Hl = 0 | p2;
    }
    process(e2, t2) {
      for (let r3 = 0; r3 < 16; r3++, t2 += 4) Du[r3] = e2.getUint32(t2), Uu[r3] = e2.getUint32(t2 += 4);
      for (let e3 = 16; e3 < 80; e3++) {
        const t3 = 0 | Du[e3 - 15], r3 = 0 | Uu[e3 - 15], n3 = fu(t3, r3, 1) ^ fu(t3, r3, 8) ^ uu(t3, 0, 7), i3 = lu(t3, r3, 1) ^ lu(t3, r3, 8) ^ hu(t3, r3, 7), s3 = 0 | Du[e3 - 2], a3 = 0 | Uu[e3 - 2], o3 = fu(s3, a3, 19) ^ yu(s3, a3, 61) ^ uu(s3, 0, 6), c3 = lu(s3, a3, 19) ^ gu(s3, a3, 61) ^ hu(s3, a3, 6), u3 = wu(i3, c3, Uu[e3 - 7], Uu[e3 - 16]), h3 = mu(u3, n3, o3, Du[e3 - 7], Du[e3 - 16]);
        Du[e3] = 0 | h3, Uu[e3] = 0 | u3;
      }
      let { Ah: r2, Al: n2, Bh: i2, Bl: s2, Ch: a2, Cl: o2, Dh: c2, Dl: u2, Eh: h2, El: f2, Fh: l2, Fl: y2, Gh: g2, Gl: p2, Hh: d2, Hl: A2 } = this;
      for (let e3 = 0; e3 < 80; e3++) {
        const t3 = fu(h2, f2, 14) ^ fu(h2, f2, 18) ^ yu(h2, f2, 41), w2 = lu(h2, f2, 14) ^ lu(h2, f2, 18) ^ gu(h2, f2, 41), m2 = h2 & l2 ^ ~h2 & g2, b2 = bu(A2, w2, f2 & y2 ^ ~f2 & p2, Cu[e3], Uu[e3]), k2 = ku(b2, d2, t3, m2, Ku[e3], Du[e3]), E2 = 0 | b2, v2 = fu(r2, n2, 28) ^ yu(r2, n2, 34) ^ yu(r2, n2, 39), I2 = lu(r2, n2, 28) ^ gu(r2, n2, 34) ^ gu(r2, n2, 39), B2 = r2 & i2 ^ r2 & a2 ^ i2 & a2, S2 = n2 & s2 ^ n2 & o2 ^ s2 & o2;
        d2 = 0 | g2, A2 = 0 | p2, g2 = 0 | l2, p2 = 0 | y2, l2 = 0 | h2, y2 = 0 | f2, { h: h2, l: f2 } = pu(0 | c2, 0 | u2, 0 | k2, 0 | E2), c2 = 0 | a2, u2 = 0 | o2, a2 = 0 | i2, o2 = 0 | s2, i2 = 0 | r2, s2 = 0 | n2;
        const K2 = du(E2, I2, S2);
        r2 = Au(K2, k2, v2, B2), n2 = 0 | K2;
      }
      ({ h: r2, l: n2 } = pu(0 | this.Ah, 0 | this.Al, 0 | r2, 0 | n2)), { h: i2, l: s2 } = pu(0 | this.Bh, 0 | this.Bl, 0 | i2, 0 | s2), { h: a2, l: o2 } = pu(0 | this.Ch, 0 | this.Cl, 0 | a2, 0 | o2), { h: c2, l: u2 } = pu(0 | this.Dh, 0 | this.Dl, 0 | c2, 0 | u2), { h: h2, l: f2 } = pu(0 | this.Eh, 0 | this.El, 0 | h2, 0 | f2), { h: l2, l: y2 } = pu(0 | this.Fh, 0 | this.Fl, 0 | l2, 0 | y2), { h: g2, l: p2 } = pu(0 | this.Gh, 0 | this.Gl, 0 | g2, 0 | p2), { h: d2, l: A2 } = pu(0 | this.Hh, 0 | this.Hl, 0 | d2, 0 | A2), this.set(r2, n2, i2, s2, a2, o2, c2, u2, h2, f2, l2, y2, g2, p2, d2, A2);
    }
    roundClean() {
      Ho(Du, Uu);
    }
    destroy() {
      Ho(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  };
  var xu = class extends Pu {
    constructor() {
      super(48), this.Ah = 0 | nu[0], this.Al = 0 | nu[1], this.Bh = 0 | nu[2], this.Bl = 0 | nu[3], this.Ch = 0 | nu[4], this.Cl = 0 | nu[5], this.Dh = 0 | nu[6], this.Dl = 0 | nu[7], this.Eh = 0 | nu[8], this.El = 0 | nu[9], this.Fh = 0 | nu[10], this.Fl = 0 | nu[11], this.Gh = 0 | nu[12], this.Gl = 0 | nu[13], this.Hh = 0 | nu[14], this.Hl = 0 | nu[15];
    }
  };
  var Qu = /* @__PURE__ */ ac((() => new Iu()));
  var Mu = /* @__PURE__ */ ac((() => new Bu()));
  var Ru = /* @__PURE__ */ ac((() => new Pu()));
  var Fu = /* @__PURE__ */ ac((() => new xu()));
  var Tu = class extends sc {
    constructor(e2, t2) {
      super(), this.finished = false, this.destroyed = false, No(e2);
      const r2 = nc(t2);
      if (this.iHash = e2.create(), "function" != typeof this.iHash.update) throw Error("Expected instance of class which extends utils.Hash");
      this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
      const n2 = this.blockLen, i2 = new Uint8Array(n2);
      i2.set(r2.length > n2 ? e2.create().update(r2).digest() : r2);
      for (let e3 = 0; e3 < i2.length; e3++) i2[e3] ^= 54;
      this.iHash.update(i2), this.oHash = e2.create();
      for (let e3 = 0; e3 < i2.length; e3++) i2[e3] ^= 106;
      this.oHash.update(i2), Ho(i2);
    }
    update(e2) {
      return Lo(this), this.iHash.update(e2), this;
    }
    digestInto(e2) {
      Lo(this), To(e2, this.outputLen), this.finished = true, this.iHash.digestInto(e2), this.oHash.update(e2), this.oHash.digestInto(e2), this.destroy();
    }
    digest() {
      const e2 = new Uint8Array(this.oHash.outputLen);
      return this.digestInto(e2), e2;
    }
    _cloneInto(e2) {
      e2 || (e2 = Object.create(Object.getPrototypeOf(this), {}));
      const { oHash: t2, iHash: r2, finished: n2, destroyed: i2, blockLen: s2, outputLen: a2 } = this;
      return e2.finished = n2, e2.destroyed = i2, e2.blockLen = s2, e2.outputLen = a2, e2.oHash = t2._cloneInto(e2.oHash), e2.iHash = r2._cloneInto(e2.iHash), e2;
    }
    clone() {
      return this._cloneInto();
    }
    destroy() {
      this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
    }
  };
  var Nu = (e2, t2, r2) => new Tu(e2, t2).update(r2).digest();
  Nu.create = (e2, t2) => new Tu(e2, t2);
  var Lu = BigInt(0);
  var Ou = BigInt(1);
  function Hu(e2, t2) {
    const r2 = t2.negate();
    return e2 ? r2 : t2;
  }
  function zu(e2, t2) {
    const r2 = qc(e2.Fp, t2.map(((e3) => e3.Z)));
    return t2.map(((t3, n2) => e2.fromAffine(t3.toAffine(r2[n2]))));
  }
  function Gu(e2, t2) {
    if (!Number.isSafeInteger(e2) || e2 <= 0 || e2 > t2) throw Error("invalid window size, expected [1.." + t2 + "], got W=" + e2);
  }
  function ju(e2, t2) {
    Gu(e2, t2);
    const r2 = 2 ** e2;
    return { windows: Math.ceil(t2 / e2) + 1, windowSize: 2 ** (e2 - 1), mask: Ic(e2), maxNumber: r2, shiftBy: BigInt(e2) };
  }
  function Vu(e2, t2, r2) {
    const { windowSize: n2, mask: i2, maxNumber: s2, shiftBy: a2 } = r2;
    let o2 = Number(e2 & i2), c2 = e2 >> a2;
    o2 > n2 && (o2 -= s2, c2 += Ou);
    const u2 = t2 * n2;
    return { nextN: c2, offset: u2 + Math.abs(o2) - 1, isZero: 0 === o2, isNeg: o2 < 0, isNegF: t2 % 2 != 0, offsetF: u2 };
  }
  var qu = /* @__PURE__ */ new WeakMap();
  var _u = /* @__PURE__ */ new WeakMap();
  function Yu(e2) {
    return _u.get(e2) || 1;
  }
  function Zu(e2) {
    if (e2 !== Lu) throw Error("invalid wNAF");
  }
  var Ju = class {
    constructor(e2, t2) {
      this.BASE = e2.BASE, this.ZERO = e2.ZERO, this.Fn = e2.Fn, this.bits = t2;
    }
    _unsafeLadder(e2, t2, r2 = this.ZERO) {
      let n2 = e2;
      for (; t2 > Lu; ) t2 & Ou && (r2 = r2.add(n2)), n2 = n2.double(), t2 >>= Ou;
      return r2;
    }
    precomputeWindow(e2, t2) {
      const { windows: r2, windowSize: n2 } = ju(t2, this.bits), i2 = [];
      let s2 = e2, a2 = s2;
      for (let e3 = 0; e3 < r2; e3++) {
        a2 = s2, i2.push(a2);
        for (let e4 = 1; e4 < n2; e4++) a2 = a2.add(s2), i2.push(a2);
        s2 = a2.double();
      }
      return i2;
    }
    wNAF(e2, t2, r2) {
      if (!this.Fn.isValid(r2)) throw Error("invalid scalar");
      let n2 = this.ZERO, i2 = this.BASE;
      const s2 = ju(e2, this.bits);
      for (let e3 = 0; e3 < s2.windows; e3++) {
        const { nextN: a2, offset: o2, isZero: c2, isNeg: u2, isNegF: h2, offsetF: f2 } = Vu(r2, e3, s2);
        r2 = a2, c2 ? i2 = i2.add(Hu(h2, t2[f2])) : n2 = n2.add(Hu(u2, t2[o2]));
      }
      return Zu(r2), { p: n2, f: i2 };
    }
    wNAFUnsafe(e2, t2, r2, n2 = this.ZERO) {
      const i2 = ju(e2, this.bits);
      for (let e3 = 0; e3 < i2.windows && r2 !== Lu; e3++) {
        const { nextN: s2, offset: a2, isZero: o2, isNeg: c2 } = Vu(r2, e3, i2);
        if (r2 = s2, !o2) {
          const e4 = t2[a2];
          n2 = n2.add(c2 ? e4.negate() : e4);
        }
      }
      return Zu(r2), n2;
    }
    getPrecomputes(e2, t2, r2) {
      let n2 = qu.get(t2);
      return n2 || (n2 = this.precomputeWindow(t2, e2), 1 !== e2 && ("function" == typeof r2 && (n2 = r2(n2)), qu.set(t2, n2))), n2;
    }
    cached(e2, t2, r2) {
      const n2 = Yu(e2);
      return this.wNAF(n2, this.getPrecomputes(n2, e2, r2), t2);
    }
    unsafe(e2, t2, r2, n2) {
      const i2 = Yu(e2);
      return 1 === i2 ? this._unsafeLadder(e2, t2, n2) : this.wNAFUnsafe(i2, this.getPrecomputes(i2, e2, r2), t2, n2);
    }
    createCache(e2, t2) {
      Gu(t2, this.bits), _u.set(e2, t2), qu.delete(e2);
    }
    hasCache(e2) {
      return 1 !== Yu(e2);
    }
  };
  function Wu(e2, t2, r2, n2) {
    !(function(e3, t3) {
      if (!Array.isArray(e3)) throw Error("array expected");
      e3.forEach(((e4, r3) => {
        if (!(e4 instanceof t3)) throw Error("invalid point at index " + r3);
      }));
    })(r2, e2), (function(e3, t3) {
      if (!Array.isArray(e3)) throw Error("array of scalars expected");
      e3.forEach(((e4, r3) => {
        if (!t3.isValid(e4)) throw Error("invalid scalar at index " + r3);
      }));
    })(n2, t2);
    const i2 = r2.length, s2 = n2.length;
    if (i2 !== s2) throw Error("arrays of points and scalars must have equal length");
    const a2 = e2.ZERO, o2 = vc(BigInt(i2));
    let c2 = 1;
    o2 > 12 ? c2 = o2 - 3 : o2 > 4 ? c2 = o2 - 2 : o2 > 0 && (c2 = 2);
    const u2 = Ic(c2), h2 = Array(Number(u2) + 1).fill(a2);
    let f2 = a2;
    for (let e3 = Math.floor((t2.BITS - 1) / c2) * c2; e3 >= 0; e3 -= c2) {
      h2.fill(a2);
      for (let t4 = 0; t4 < s2; t4++) {
        const i3 = n2[t4], s3 = Number(i3 >> BigInt(e3) & u2);
        h2[s3] = h2[s3].add(r2[t4]);
      }
      let t3 = a2;
      for (let e4 = h2.length - 1, r3 = a2; e4 > 0; e4--) r3 = r3.add(h2[e4]), t3 = t3.add(r3);
      if (f2 = f2.add(t3), 0 !== e3) for (let e4 = 0; e4 < c2; e4++) f2 = f2.double();
    }
    return f2;
  }
  function Xu(e2, t2, r2) {
    if (t2) {
      if (t2.ORDER !== e2) throw Error("Field.ORDER must match order: Fp == p, Fn == n");
      return (function(e3) {
        Bc(e3, Vc.reduce(((e4, t3) => (e4[t3] = "function", e4)), { ORDER: "bigint", MASK: "bigint", BYTES: "number", BITS: "number" }));
      })(t2), t2;
    }
    return Zc(e2, { isLE: r2 });
  }
  function $u(e2, t2, r2 = {}, n2) {
    if (void 0 === n2 && (n2 = "edwards" === e2), !t2 || "object" != typeof t2) throw Error(`expected valid ${e2} CURVE object`);
    for (const e3 of ["p", "n", "h"]) {
      const r3 = t2[e3];
      if (!("bigint" == typeof r3 && r3 > Lu)) throw Error(`CURVE.${e3} must be positive bigint`);
    }
    const i2 = Xu(t2.p, r2.Fp, n2), s2 = Xu(t2.n, r2.Fn, n2), a2 = ["Gx", "Gy", "a", "weierstrass" === e2 ? "b" : "d"];
    for (const e3 of a2) if (!i2.isValid(t2[e3])) throw Error(`CURVE.${e3} must be valid field element of CURVE.Fp`);
    return { CURVE: t2 = Object.freeze(Object.assign({}, t2)), Fp: i2, Fn: s2 };
  }
  var eh = (e2, t2) => (e2 + (e2 >= 0 ? t2 : -t2) / ah) / t2;
  function th(e2) {
    if (!["compact", "recovered", "der"].includes(e2)) throw Error('Signature format must be "compact", "recovered", or "der"');
    return e2;
  }
  function rh(e2, t2) {
    const r2 = {};
    for (let n2 of Object.keys(t2)) r2[n2] = void 0 === e2[n2] ? t2[n2] : e2[n2];
    return fc(r2.lowS, "lowS"), fc(r2.prehash, "prehash"), void 0 !== r2.format && th(r2.format), r2;
  }
  var nh = { Err: class extends Error {
    constructor(e2 = "") {
      super(e2);
    }
  }, _tlv: { encode: (e2, t2) => {
    const { Err: r2 } = nh;
    if (e2 < 0 || e2 > 256) throw new r2("tlv.encode: wrong tag");
    if (1 & t2.length) throw new r2("tlv.encode: unpadded data");
    const n2 = t2.length / 2, i2 = yc(n2);
    if (i2.length / 2 & 128) throw new r2("tlv.encode: long form length too big");
    const s2 = n2 > 127 ? yc(i2.length / 2 | 128) : "";
    return yc(e2) + s2 + i2 + t2;
  }, decode(e2, t2) {
    const { Err: r2 } = nh;
    let n2 = 0;
    if (e2 < 0 || e2 > 256) throw new r2("tlv.encode: wrong tag");
    if (t2.length < 2 || t2[n2++] !== e2) throw new r2("tlv.decode: wrong tlv");
    const i2 = t2[n2++];
    let s2 = 0;
    if (!!(128 & i2)) {
      const e3 = 127 & i2;
      if (!e3) throw new r2("tlv.decode(long): indefinite length not supported");
      if (e3 > 4) throw new r2("tlv.decode(long): byte length is too big");
      const a3 = t2.subarray(n2, n2 + e3);
      if (a3.length !== e3) throw new r2("tlv.decode: length bytes not complete");
      if (0 === a3[0]) throw new r2("tlv.decode(long): zero leftmost byte");
      for (const e4 of a3) s2 = s2 << 8 | e4;
      if (n2 += e3, s2 < 128) throw new r2("tlv.decode(long): not minimal encoding");
    } else s2 = i2;
    const a2 = t2.subarray(n2, n2 + s2);
    if (a2.length !== s2) throw new r2("tlv.decode: wrong value length");
    return { v: a2, l: t2.subarray(n2 + s2) };
  } }, _int: { encode(e2) {
    const { Err: t2 } = nh;
    if (e2 < ih) throw new t2("integer: negative integers are not allowed");
    let r2 = yc(e2);
    if (8 & Number.parseInt(r2[0], 16) && (r2 = "00" + r2), 1 & r2.length) throw new t2("unexpected DER parsing assertion: unpadded hex");
    return r2;
  }, decode(e2) {
    const { Err: t2 } = nh;
    if (128 & e2[0]) throw new t2("invalid signature integer: negative");
    if (0 === e2[0] && !(128 & e2[1])) throw new t2("invalid signature integer: unnecessary leading zero");
    return pc(e2);
  } }, toSig(e2) {
    const { Err: t2, _int: r2, _tlv: n2 } = nh, i2 = mc("signature", e2), { v: s2, l: a2 } = n2.decode(48, i2);
    if (a2.length) throw new t2("invalid signature: left bytes after parsing");
    const { v: o2, l: c2 } = n2.decode(2, s2), { v: u2, l: h2 } = n2.decode(2, c2);
    if (h2.length) throw new t2("invalid signature: left bytes after parsing");
    return { r: r2.decode(o2), s: r2.decode(u2) };
  }, hexFromSig(e2) {
    const { _tlv: t2, _int: r2 } = nh, n2 = t2.encode(2, r2.encode(e2.r)) + t2.encode(2, r2.encode(e2.s));
    return t2.encode(48, n2);
  } };
  var ih = BigInt(0);
  var sh = BigInt(1);
  var ah = BigInt(2);
  var oh = BigInt(3);
  var ch = BigInt(4);
  function uh(e2, t2) {
    const { BYTES: r2 } = e2;
    let n2;
    if ("bigint" == typeof t2) n2 = t2;
    else {
      let i2 = mc("private key", t2);
      try {
        n2 = e2.fromBytes(i2);
      } catch (e3) {
        throw Error(`invalid private key: expected ui8a of size ${r2}, got ${typeof t2}`);
      }
    }
    if (!e2.isValidNot0(n2)) throw Error("invalid private key: out of range [1..N-1]");
    return n2;
  }
  function hh(e2, t2 = {}) {
    const r2 = $u("weierstrass", e2, t2), { Fp: n2, Fn: i2 } = r2;
    let s2 = r2.CURVE;
    const { h: a2, n: o2 } = s2;
    Bc(t2, {}, { allowInfinityPoint: "boolean", clearCofactor: "function", isTorsionFree: "function", fromBytes: "function", toBytes: "function", endo: "object", wrapPrivateKey: "boolean" });
    const { endo: c2 } = t2;
    if (c2 && (!n2.is0(s2.a) || "bigint" != typeof c2.beta || !Array.isArray(c2.basises))) throw Error('invalid endo: expected "beta": bigint and "basises": array');
    const u2 = lh(n2, i2);
    function h2() {
      if (!n2.isOdd) throw Error("compression is not supported: Field does not have .isOdd()");
    }
    const f2 = t2.toBytes || function(e3, t3, r3) {
      const { x: i3, y: s3 } = t3.toAffine(), a3 = n2.toBytes(i3);
      if (fc(r3, "isCompressed"), r3) {
        h2();
        return ic(fh(!n2.isOdd(s3)), a3);
      }
      return ic(Uint8Array.of(4), a3, n2.toBytes(s3));
    }, l2 = t2.fromBytes || function(e3) {
      lc(e3, void 0, "Point");
      const { publicKey: t3, publicKeyUncompressed: r3 } = u2, i3 = e3.length, s3 = e3[0], a3 = e3.subarray(1);
      if (i3 !== t3 || 2 !== s3 && 3 !== s3) {
        if (i3 === r3 && 4 === s3) {
          const e4 = n2.BYTES, t4 = n2.fromBytes(a3.subarray(0, e4)), r4 = n2.fromBytes(a3.subarray(e4, 2 * e4));
          if (!g2(t4, r4)) throw Error("bad point: is not on curve");
          return { x: t4, y: r4 };
        }
        throw Error(`bad point: got length ${i3}, expected compressed=${t3} or uncompressed=${r3}`);
      }
      {
        const e4 = n2.fromBytes(a3);
        if (!n2.isValid(e4)) throw Error("bad point: is not on curve, wrong x");
        const t4 = y2(e4);
        let r4;
        try {
          r4 = n2.sqrt(t4);
        } catch (e5) {
          const t5 = e5 instanceof Error ? ": " + e5.message : "";
          throw Error("bad point: is not on curve, sqrt error" + t5);
        }
        h2();
        return !(1 & ~s3) !== n2.isOdd(r4) && (r4 = n2.neg(r4)), { x: e4, y: r4 };
      }
    };
    function y2(e3) {
      const t3 = n2.sqr(e3), r3 = n2.mul(t3, e3);
      return n2.add(n2.add(r3, n2.mul(e3, s2.a)), s2.b);
    }
    function g2(e3, t3) {
      const r3 = n2.sqr(t3), i3 = y2(e3);
      return n2.eql(r3, i3);
    }
    if (!g2(s2.Gx, s2.Gy)) throw Error("bad curve params: generator point");
    const p2 = n2.mul(n2.pow(s2.a, oh), ch), d2 = n2.mul(n2.sqr(s2.b), BigInt(27));
    if (n2.is0(n2.add(p2, d2))) throw Error("bad curve params: a or b");
    function A2(e3, t3, r3 = false) {
      if (!n2.isValid(t3) || r3 && n2.is0(t3)) throw Error("bad point coordinate " + e3);
      return t3;
    }
    function w2(e3) {
      if (!(e3 instanceof v2)) throw Error("ProjectivePoint expected");
    }
    function m2(e3) {
      if (!c2 || !c2.basises) throw Error("no endo");
      return (function(e4, t3, r3) {
        const [[n3, i3], [s3, a3]] = t3, o3 = eh(a3 * e4, r3), c3 = eh(-i3 * e4, r3);
        let u3 = e4 - o3 * n3 - c3 * s3, h3 = -o3 * i3 - c3 * a3;
        const f3 = u3 < ih, l3 = h3 < ih;
        f3 && (u3 = -u3), l3 && (h3 = -h3);
        const y3 = Ic(Math.ceil(vc(r3) / 2)) + sh;
        if (u3 < ih || u3 >= y3 || h3 < ih || h3 >= y3) throw Error("splitScalar (endomorphism): failed, k=" + e4);
        return { k1neg: f3, k1: u3, k2neg: l3, k2: h3 };
      })(e3, c2.basises, i2.ORDER);
    }
    const b2 = Sc(((e3, t3) => {
      const { X: r3, Y: i3, Z: s3 } = e3;
      if (n2.eql(s3, n2.ONE)) return { x: r3, y: i3 };
      const a3 = e3.is0();
      null == t3 && (t3 = a3 ? n2.ONE : n2.inv(s3));
      const o3 = n2.mul(r3, t3), c3 = n2.mul(i3, t3), u3 = n2.mul(s3, t3);
      if (a3) return { x: n2.ZERO, y: n2.ZERO };
      if (!n2.eql(u3, n2.ONE)) throw Error("invZ was invalid");
      return { x: o3, y: c3 };
    })), k2 = Sc(((e3) => {
      if (e3.is0()) {
        if (t2.allowInfinityPoint && !n2.is0(e3.Y)) return;
        throw Error("bad point: ZERO");
      }
      const { x: r3, y: i3 } = e3.toAffine();
      if (!n2.isValid(r3) || !n2.isValid(i3)) throw Error("bad point: x or y not field elements");
      if (!g2(r3, i3)) throw Error("bad point: equation left != right");
      if (!e3.isTorsionFree()) throw Error("bad point: not in prime-order subgroup");
      return true;
    }));
    function E2(e3, t3, r3, i3, s3) {
      return r3 = new v2(n2.mul(r3.X, e3), r3.Y, r3.Z), t3 = Hu(i3, t3), r3 = Hu(s3, r3), t3.add(r3);
    }
    class v2 {
      constructor(e3, t3, r3) {
        this.X = A2("x", e3), this.Y = A2("y", t3, true), this.Z = A2("z", r3), Object.freeze(this);
      }
      static CURVE() {
        return s2;
      }
      static fromAffine(e3) {
        const { x: t3, y: r3 } = e3 || {};
        if (!e3 || !n2.isValid(t3) || !n2.isValid(r3)) throw Error("invalid affine point");
        if (e3 instanceof v2) throw Error("projective point not allowed");
        return n2.is0(t3) && n2.is0(r3) ? v2.ZERO : new v2(t3, r3, n2.ONE);
      }
      static fromBytes(e3) {
        const t3 = v2.fromAffine(l2(lc(e3, void 0, "point")));
        return t3.assertValidity(), t3;
      }
      static fromHex(e3) {
        return v2.fromBytes(mc("pointHex", e3));
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      precompute(e3 = 8, t3 = true) {
        return B2.createCache(this, e3), t3 || this.multiply(oh), this;
      }
      assertValidity() {
        k2(this);
      }
      hasEvenY() {
        const { y: e3 } = this.toAffine();
        if (!n2.isOdd) throw Error("Field doesn't support isOdd");
        return !n2.isOdd(e3);
      }
      equals(e3) {
        w2(e3);
        const { X: t3, Y: r3, Z: i3 } = this, { X: s3, Y: a3, Z: o3 } = e3, c3 = n2.eql(n2.mul(t3, o3), n2.mul(s3, i3)), u3 = n2.eql(n2.mul(r3, o3), n2.mul(a3, i3));
        return c3 && u3;
      }
      negate() {
        return new v2(this.X, n2.neg(this.Y), this.Z);
      }
      double() {
        const { a: e3, b: t3 } = s2, r3 = n2.mul(t3, oh), { X: i3, Y: a3, Z: o3 } = this;
        let c3 = n2.ZERO, u3 = n2.ZERO, h3 = n2.ZERO, f3 = n2.mul(i3, i3), l3 = n2.mul(a3, a3), y3 = n2.mul(o3, o3), g3 = n2.mul(i3, a3);
        return g3 = n2.add(g3, g3), h3 = n2.mul(i3, o3), h3 = n2.add(h3, h3), c3 = n2.mul(e3, h3), u3 = n2.mul(r3, y3), u3 = n2.add(c3, u3), c3 = n2.sub(l3, u3), u3 = n2.add(l3, u3), u3 = n2.mul(c3, u3), c3 = n2.mul(g3, c3), h3 = n2.mul(r3, h3), y3 = n2.mul(e3, y3), g3 = n2.sub(f3, y3), g3 = n2.mul(e3, g3), g3 = n2.add(g3, h3), h3 = n2.add(f3, f3), f3 = n2.add(h3, f3), f3 = n2.add(f3, y3), f3 = n2.mul(f3, g3), u3 = n2.add(u3, f3), y3 = n2.mul(a3, o3), y3 = n2.add(y3, y3), f3 = n2.mul(y3, g3), c3 = n2.sub(c3, f3), h3 = n2.mul(y3, l3), h3 = n2.add(h3, h3), h3 = n2.add(h3, h3), new v2(c3, u3, h3);
      }
      add(e3) {
        w2(e3);
        const { X: t3, Y: r3, Z: i3 } = this, { X: a3, Y: o3, Z: c3 } = e3;
        let u3 = n2.ZERO, h3 = n2.ZERO, f3 = n2.ZERO;
        const l3 = s2.a, y3 = n2.mul(s2.b, oh);
        let g3 = n2.mul(t3, a3), p3 = n2.mul(r3, o3), d3 = n2.mul(i3, c3), A3 = n2.add(t3, r3), m3 = n2.add(a3, o3);
        A3 = n2.mul(A3, m3), m3 = n2.add(g3, p3), A3 = n2.sub(A3, m3), m3 = n2.add(t3, i3);
        let b3 = n2.add(a3, c3);
        return m3 = n2.mul(m3, b3), b3 = n2.add(g3, d3), m3 = n2.sub(m3, b3), b3 = n2.add(r3, i3), u3 = n2.add(o3, c3), b3 = n2.mul(b3, u3), u3 = n2.add(p3, d3), b3 = n2.sub(b3, u3), f3 = n2.mul(l3, m3), u3 = n2.mul(y3, d3), f3 = n2.add(u3, f3), u3 = n2.sub(p3, f3), f3 = n2.add(p3, f3), h3 = n2.mul(u3, f3), p3 = n2.add(g3, g3), p3 = n2.add(p3, g3), d3 = n2.mul(l3, d3), m3 = n2.mul(y3, m3), p3 = n2.add(p3, d3), d3 = n2.sub(g3, d3), d3 = n2.mul(l3, d3), m3 = n2.add(m3, d3), g3 = n2.mul(p3, m3), h3 = n2.add(h3, g3), g3 = n2.mul(b3, m3), u3 = n2.mul(A3, u3), u3 = n2.sub(u3, g3), g3 = n2.mul(A3, p3), f3 = n2.mul(b3, f3), f3 = n2.add(f3, g3), new v2(u3, h3, f3);
      }
      subtract(e3) {
        return this.add(e3.negate());
      }
      is0() {
        return this.equals(v2.ZERO);
      }
      multiply(e3) {
        const { endo: r3 } = t2;
        if (!i2.isValidNot0(e3)) throw Error("invalid scalar: out of range");
        let n3, s3;
        const a3 = (e4) => B2.cached(this, e4, ((e5) => zu(v2, e5)));
        if (r3) {
          const { k1neg: t3, k1: i3, k2neg: o3, k2: c3 } = m2(e3), { p: u3, f: h3 } = a3(i3), { p: f3, f: l3 } = a3(c3);
          s3 = h3.add(l3), n3 = E2(r3.beta, u3, f3, t3, o3);
        } else {
          const { p: t3, f: r4 } = a3(e3);
          n3 = t3, s3 = r4;
        }
        return zu(v2, [n3, s3])[0];
      }
      multiplyUnsafe(e3) {
        const { endo: r3 } = t2, n3 = this;
        if (!i2.isValid(e3)) throw Error("invalid scalar: out of range");
        if (e3 === ih || n3.is0()) return v2.ZERO;
        if (e3 === sh) return n3;
        if (B2.hasCache(this)) return this.multiply(e3);
        if (r3) {
          const { k1neg: t3, k1: i3, k2neg: s3, k2: a3 } = m2(e3), { p1: o3, p2: c3 } = (function(e4, t4, r4, n4) {
            let i4 = t4, s4 = e4.ZERO, a4 = e4.ZERO;
            for (; r4 > Lu || n4 > Lu; ) r4 & Ou && (s4 = s4.add(i4)), n4 & Ou && (a4 = a4.add(i4)), i4 = i4.double(), r4 >>= Ou, n4 >>= Ou;
            return { p1: s4, p2: a4 };
          })(v2, n3, i3, a3);
          return E2(r3.beta, o3, c3, t3, s3);
        }
        return B2.unsafe(n3, e3);
      }
      multiplyAndAddUnsafe(e3, t3, r3) {
        const n3 = this.multiplyUnsafe(t3).add(e3.multiplyUnsafe(r3));
        return n3.is0() ? void 0 : n3;
      }
      toAffine(e3) {
        return b2(this, e3);
      }
      isTorsionFree() {
        const { isTorsionFree: e3 } = t2;
        return a2 === sh || (e3 ? e3(v2, this) : B2.unsafe(this, o2).is0());
      }
      clearCofactor() {
        const { clearCofactor: e3 } = t2;
        return a2 === sh ? this : e3 ? e3(v2, this) : this.multiplyUnsafe(a2);
      }
      isSmallOrder() {
        return this.multiplyUnsafe(a2).is0();
      }
      toBytes(e3 = true) {
        return fc(e3, "isCompressed"), this.assertValidity(), f2(v2, this, e3);
      }
      toHex(e3 = true) {
        return Yo(this.toBytes(e3));
      }
      toString() {
        return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
      }
      get px() {
        return this.X;
      }
      get py() {
        return this.X;
      }
      get pz() {
        return this.Z;
      }
      toRawBytes(e3 = true) {
        return this.toBytes(e3);
      }
      _setWindowSize(e3) {
        this.precompute(e3);
      }
      static normalizeZ(e3) {
        return zu(v2, e3);
      }
      static msm(e3, t3) {
        return Wu(v2, i2, e3, t3);
      }
      static fromPrivateKey(e3) {
        return v2.BASE.multiply(uh(i2, e3));
      }
    }
    v2.BASE = new v2(s2.Gx, s2.Gy, n2.ONE), v2.ZERO = new v2(n2.ZERO, n2.ONE, n2.ZERO), v2.Fp = n2, v2.Fn = i2;
    const I2 = i2.BITS, B2 = new Ju(v2, t2.endo ? Math.ceil(I2 / 2) : I2);
    return v2.BASE.precompute(8), v2;
  }
  function fh(e2) {
    return Uint8Array.of(e2 ? 2 : 3);
  }
  function lh(e2, t2) {
    return { secretKey: t2.BYTES, publicKey: 1 + e2.BYTES, publicKeyUncompressed: 1 + 2 * e2.BYTES, publicKeyHasPrefix: true, signature: 2 * t2.BYTES };
  }
  function yh(e2, t2 = {}) {
    const { Fn: r2 } = e2, n2 = t2.randomBytes || cc, i2 = Object.assign(lh(e2.Fp, r2), { seed: Wc(r2.ORDER) });
    function s2(e3) {
      try {
        return !!uh(r2, e3);
      } catch (e4) {
        return false;
      }
    }
    function a2(e3 = n2(i2.seed)) {
      return (function(e4, t3, r3 = false) {
        const n3 = e4.length, i3 = Jc(t3), s3 = Wc(t3);
        if (n3 < 16 || n3 < s3 || n3 > 1024) throw Error("expected " + s3 + "-1024 bytes of input, got " + n3);
        const a3 = Tc(r3 ? dc(e4) : pc(e4), t3 - Cc) + Cc;
        return r3 ? wc(a3, i3) : Ac(a3, i3);
      })(lc(e3, i2.seed, "seed"), r2.ORDER);
    }
    function o2(t3, n3 = true) {
      return e2.BASE.multiply(uh(r2, t3)).toBytes(n3);
    }
    function c2(t3) {
      if ("bigint" == typeof t3) return false;
      if (t3 instanceof e2) return true;
      const { secretKey: n3, publicKey: s3, publicKeyUncompressed: a3 } = i2;
      if (r2.allowedLengths || n3 === s3) return;
      const o3 = mc("key", t3).length;
      return o3 === s3 || o3 === a3;
    }
    const u2 = { isValidSecretKey: s2, isValidPublicKey: function(t3, r3) {
      const { publicKey: n3, publicKeyUncompressed: s3 } = i2;
      try {
        const i3 = t3.length;
        return (true !== r3 || i3 === n3) && ((false !== r3 || i3 === s3) && !!e2.fromBytes(t3));
      } catch (e3) {
        return false;
      }
    }, randomSecretKey: a2, isValidPrivateKey: s2, randomPrivateKey: a2, normPrivateKeyToScalar: (e3) => uh(r2, e3), precompute: (t3 = 8, r3 = e2.BASE) => r3.precompute(t3, false) };
    return Object.freeze({ getPublicKey: o2, getSharedSecret: function(t3, n3, i3 = true) {
      if (true === c2(t3)) throw Error("first arg must be private key");
      if (false === c2(n3)) throw Error("second arg must be public key");
      const s3 = uh(r2, t3);
      return e2.fromHex(n3).multiply(s3).toBytes(i3);
    }, keygen: function(e3) {
      const t3 = a2(e3);
      return { secretKey: t3, publicKey: o2(t3) };
    }, Point: e2, utils: u2, lengths: i2 });
  }
  function gh(e2, t2, r2 = {}) {
    No(t2), Bc(r2, {}, { hmac: "function", lowS: "boolean", randomBytes: "function", bits2int: "function", bits2int_modN: "function" });
    const n2 = r2.randomBytes || cc, i2 = r2.hmac || ((e3, ...r3) => Nu(t2, e3, ic(...r3))), { Fp: s2, Fn: a2 } = e2, { ORDER: o2, BITS: c2 } = a2, { keygen: u2, getPublicKey: h2, getSharedSecret: f2, utils: l2, lengths: y2 } = yh(e2, r2), g2 = { prehash: false, lowS: "boolean" == typeof r2.lowS && r2.lowS, format: void 0, extraEntropy: false }, p2 = "compact";
    function d2(e3) {
      return e3 > o2 >> sh;
    }
    function A2(e3, t3) {
      if (!a2.isValidNot0(t3)) throw Error(`invalid signature ${e3}: out of range 1..Point.Fn.ORDER`);
      return t3;
    }
    class w2 {
      constructor(e3, t3, r3) {
        this.r = A2("r", e3), this.s = A2("s", t3), null != r3 && (this.recovery = r3), Object.freeze(this);
      }
      static fromBytes(e3, t3 = p2) {
        let r3;
        if ((function(e4, t4) {
          th(t4);
          const r4 = y2.signature;
          lc(e4, "compact" === t4 ? r4 : "recovered" === t4 ? r4 + 1 : void 0, t4 + " signature");
        })(e3, t3), "der" === t3) {
          const { r: t4, s: r4 } = nh.toSig(lc(e3));
          return new w2(t4, r4);
        }
        "recovered" === t3 && (r3 = e3[0], t3 = "compact", e3 = e3.subarray(1));
        const n3 = a2.BYTES, i3 = e3.subarray(0, n3), s3 = e3.subarray(n3, 2 * n3);
        return new w2(a2.fromBytes(i3), a2.fromBytes(s3), r3);
      }
      static fromHex(e3, t3) {
        return this.fromBytes(rc(e3), t3);
      }
      addRecoveryBit(e3) {
        return new w2(this.r, this.s, e3);
      }
      recoverPublicKey(t3) {
        const r3 = s2.ORDER, { r: n3, s: i3, recovery: c3 } = this;
        if (null == c3 || ![0, 1, 2, 3].includes(c3)) throw Error("recovery id invalid");
        if (o2 * ah < r3 && c3 > 1) throw Error("recovery id is ambiguous for h>1 curve");
        const u3 = 2 === c3 || 3 === c3 ? n3 + o2 : n3;
        if (!s2.isValid(u3)) throw Error("recovery id 2 or 3 invalid");
        const h3 = s2.toBytes(u3), f3 = e2.fromBytes(ic(fh(!(1 & c3)), h3)), l3 = a2.inv(u3), y3 = b2(mc("msgHash", t3)), g3 = a2.create(-y3 * l3), p3 = a2.create(i3 * l3), d3 = e2.BASE.multiplyUnsafe(g3).add(f3.multiplyUnsafe(p3));
        if (d3.is0()) throw Error("point at infinify");
        return d3.assertValidity(), d3;
      }
      hasHighS() {
        return d2(this.s);
      }
      toBytes(e3 = p2) {
        if (th(e3), "der" === e3) return rc(nh.hexFromSig(this));
        const t3 = a2.toBytes(this.r), r3 = a2.toBytes(this.s);
        if ("recovered" === e3) {
          if (null == this.recovery) throw Error("recovery bit must be present");
          return ic(Uint8Array.of(this.recovery), t3, r3);
        }
        return ic(t3, r3);
      }
      toHex(e3) {
        return Yo(this.toBytes(e3));
      }
      assertValidity() {
      }
      static fromCompact(e3) {
        return w2.fromBytes(mc("sig", e3), "compact");
      }
      static fromDER(e3) {
        return w2.fromBytes(mc("sig", e3), "der");
      }
      normalizeS() {
        return this.hasHighS() ? new w2(this.r, a2.neg(this.s), this.recovery) : this;
      }
      toDERRawBytes() {
        return this.toBytes("der");
      }
      toDERHex() {
        return Yo(this.toBytes("der"));
      }
      toCompactRawBytes() {
        return this.toBytes("compact");
      }
      toCompactHex() {
        return Yo(this.toBytes("compact"));
      }
    }
    const m2 = r2.bits2int || function(e3) {
      if (e3.length > 8192) throw Error("input is too large");
      const t3 = pc(e3), r3 = 8 * e3.length - c2;
      return r3 > 0 ? t3 >> BigInt(r3) : t3;
    }, b2 = r2.bits2int_modN || function(e3) {
      return a2.create(m2(e3));
    }, k2 = Ic(c2);
    function E2(e3) {
      return Ec("num < 2^" + c2, e3, ih, k2), a2.toBytes(e3);
    }
    function v2(e3, r3) {
      return lc(e3, void 0, "message"), r3 ? lc(t2(e3), void 0, "prehashed message") : e3;
    }
    return Object.freeze({ keygen: u2, getPublicKey: h2, getSharedSecret: f2, utils: l2, lengths: y2, Point: e2, sign: function(r3, s3, o3 = {}) {
      r3 = mc("message", r3);
      const { seed: c3, k2sig: u3 } = (function(t3, r4, i3) {
        if (["recovered", "canonical"].some(((e3) => e3 in i3))) throw Error("sign() legacy options not supported");
        const { lowS: s4, prehash: o4, extraEntropy: c4 } = rh(i3, g2);
        t3 = v2(t3, o4);
        const u4 = b2(t3), h4 = uh(a2, r4), f3 = [E2(h4), E2(u4)];
        if (null != c4 && false !== c4) {
          const e3 = true === c4 ? n2(y2.secretKey) : c4;
          f3.push(mc("extraEntropy", e3));
        }
        const l3 = ic(...f3), p3 = u4;
        return { seed: l3, k2sig: function(t4) {
          const r5 = m2(t4);
          if (!a2.isValidNot0(r5)) return;
          const n3 = a2.inv(r5), i4 = e2.BASE.multiply(r5).toAffine(), o5 = a2.create(i4.x);
          if (o5 === ih) return;
          const c5 = a2.create(n3 * a2.create(p3 + o5 * h4));
          if (c5 === ih) return;
          let u5 = (i4.x === o5 ? 0 : 2) | Number(i4.y & sh), f4 = c5;
          return s4 && d2(c5) && (f4 = a2.neg(c5), u5 ^= 1), new w2(o5, f4, u5);
        } };
      })(r3, s3, o3), h3 = (function(e3, t3, r4) {
        if ("number" != typeof e3 || e3 < 2) throw Error("hashLen must be a number");
        if ("number" != typeof t3 || t3 < 2) throw Error("qByteLen must be a number");
        if ("function" != typeof r4) throw Error("hmacFn must be a function");
        const n3 = (e4) => new Uint8Array(e4), i3 = (e4) => Uint8Array.of(e4);
        let s4 = n3(e3), a3 = n3(e3), o4 = 0;
        const c4 = () => {
          s4.fill(1), a3.fill(0), o4 = 0;
        }, u4 = (...e4) => r4(a3, s4, ...e4), h4 = (e4 = n3(0)) => {
          a3 = u4(i3(0), e4), s4 = u4(), 0 !== e4.length && (a3 = u4(i3(1), e4), s4 = u4());
        }, f3 = () => {
          if (o4++ >= 1e3) throw Error("drbg: tried 1000 values");
          let e4 = 0;
          const r5 = [];
          for (; e4 < t3; ) {
            s4 = u4();
            const t4 = s4.slice();
            r5.push(t4), e4 += s4.length;
          }
          return ic(...r5);
        };
        return (e4, t4) => {
          let r5;
          for (c4(), h4(e4); !(r5 = t4(f3())); ) h4();
          return c4(), r5;
        };
      })(t2.outputLen, a2.BYTES, i2);
      return h3(c3, u3);
    }, verify: function(t3, r3, n3, i3 = {}) {
      const { lowS: s3, prehash: o3, format: c3 } = rh(i3, g2);
      if (n3 = mc("publicKey", n3), r3 = v2(mc("message", r3), o3), "strict" in i3) throw Error("options.strict was renamed to lowS");
      const u3 = void 0 === c3 ? (function(e3) {
        let t4;
        const r4 = "string" == typeof e3 || Ro(e3), n4 = !r4 && null !== e3 && "object" == typeof e3 && "bigint" == typeof e3.r && "bigint" == typeof e3.s;
        if (!r4 && !n4) throw Error("invalid signature, expected Uint8Array, hex string or Signature instance");
        if (n4) t4 = new w2(e3.r, e3.s);
        else if (r4) {
          try {
            t4 = w2.fromBytes(mc("sig", e3), "der");
          } catch (e4) {
            if (!(e4 instanceof nh.Err)) throw e4;
          }
          if (!t4) try {
            t4 = w2.fromBytes(mc("sig", e3), "compact");
          } catch (e4) {
            return false;
          }
        }
        return t4 || false;
      })(t3) : w2.fromBytes(mc("sig", t3), c3);
      if (false === u3) return false;
      try {
        const t4 = e2.fromBytes(n3);
        if (s3 && u3.hasHighS()) return false;
        const { r: i4, s: o4 } = u3, c4 = b2(r3), h3 = a2.inv(o4), f3 = a2.create(c4 * h3), l3 = a2.create(i4 * h3), y3 = e2.BASE.multiplyUnsafe(f3).add(t4.multiplyUnsafe(l3));
        if (y3.is0()) return false;
        return a2.create(y3.x) === i4;
      } catch (e3) {
        return false;
      }
    }, recoverPublicKey: function(e3, t3, r3 = {}) {
      const { prehash: n3 } = rh(r3, g2);
      return t3 = v2(t3, n3), w2.fromBytes(e3, "recovered").recoverPublicKey(t3).toBytes();
    }, Signature: w2, hash: t2 });
  }
  function ph(e2) {
    const { CURVE: t2, curveOpts: r2 } = (function(e3) {
      const t3 = { a: e3.a, b: e3.b, p: e3.Fp.ORDER, n: e3.n, h: e3.h, Gx: e3.Gx, Gy: e3.Gy }, r3 = e3.Fp;
      let n3 = e3.allowedPrivateKeyLengths ? Array.from(new Set(e3.allowedPrivateKeyLengths.map(((e4) => Math.ceil(e4 / 2))))) : void 0;
      return { CURVE: t3, curveOpts: { Fp: r3, Fn: Zc(t3.n, { BITS: e3.nBitLength, allowedLengths: n3, modFromBytes: e3.wrapPrivateKey }), allowInfinityPoint: e3.allowInfinityPoint, endo: e3.endo, isTorsionFree: e3.isTorsionFree, clearCofactor: e3.clearCofactor, fromBytes: e3.fromBytes, toBytes: e3.toBytes } };
    })(e2), n2 = { hmac: e2.hmac, randomBytes: e2.randomBytes, lowS: e2.lowS, bits2int: e2.bits2int, bits2int_modN: e2.bits2int_modN };
    return { CURVE: t2, curveOpts: r2, hash: e2.hash, ecdsaOpts: n2 };
  }
  function dh(e2) {
    const { CURVE: t2, curveOpts: r2, hash: n2, ecdsaOpts: i2 } = ph(e2);
    return (function(e3, t3) {
      const r3 = t3.Point;
      return Object.assign({}, t3, { ProjectivePoint: r3, CURVE: Object.assign({}, e3, Yc(r3.Fn.ORDER, r3.Fn.BITS)) });
    })(e2, gh(hh(t2, r2), n2, i2));
  }
  function Ah(e2, t2) {
    const r2 = (t3) => dh({ ...e2, hash: t3 });
    return { ...r2(t2), create: r2 };
  }
  var wh = { p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"), n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"), h: BigInt(1), a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"), b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"), Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5") };
  var mh = { p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"), n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"), h: BigInt(1), a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"), b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"), Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"), Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f") };
  var bh = { p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"), h: BigInt(1), a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"), b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"), Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"), Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650") };
  var kh = Zc(wh.p);
  var Eh = Zc(mh.p);
  var vh = Zc(bh.p);
  var Ih = Ah({ ...wh, Fp: kh, lowS: false }, Qu);
  var Bh = Ah({ ...mh, Fp: Eh, lowS: false }, Fu);
  var Sh = Ah({ ...bh, Fp: vh, lowS: false, allowedPrivateKeyLengths: [130, 131, 132] }, Ru);
  var Kh = BigInt(0);
  var Ch = BigInt(1);
  var Dh = BigInt(2);
  var Uh = BigInt(7);
  var Ph = BigInt(256);
  var xh = BigInt(113);
  var Qh = [];
  var Mh = [];
  var Rh = [];
  for (let e2 = 0, t2 = Ch, r2 = 1, n2 = 0; e2 < 24; e2++) {
    [r2, n2] = [n2, (2 * r2 + 3 * n2) % 5], Qh.push(2 * (5 * n2 + r2)), Mh.push((e2 + 1) * (e2 + 2) / 2 % 64);
    let i2 = Kh;
    for (let e3 = 0; e3 < 7; e3++) t2 = (t2 << Ch ^ (t2 >> Uh) * xh) % Ph, t2 & Dh && (i2 ^= Ch << (Ch << /* @__PURE__ */ BigInt(e3)) - Ch);
    Rh.push(i2);
  }
  var Fh = cu(Rh, true);
  var Th = Fh[0];
  var Nh = Fh[1];
  var Lh = (e2, t2, r2) => r2 > 32 ? ((e3, t3, r3) => t3 << r3 - 32 | e3 >>> 64 - r3)(e2, t2, r2) : ((e3, t3, r3) => e3 << r3 | t3 >>> 32 - r3)(e2, t2, r2);
  var Oh = (e2, t2, r2) => r2 > 32 ? ((e3, t3, r3) => e3 << r3 - 32 | t3 >>> 64 - r3)(e2, t2, r2) : ((e3, t3, r3) => t3 << r3 | e3 >>> 32 - r3)(e2, t2, r2);
  var Hh = class _Hh extends sc {
    constructor(e2, t2, r2, n2 = false, i2 = 24) {
      if (super(), this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, this.enableXOF = false, this.blockLen = e2, this.suffix = t2, this.outputLen = r2, this.enableXOF = n2, this.rounds = i2, Fo(r2), !(0 < e2 && e2 < 200)) throw Error("only keccak-f1600 function is supported");
      var s2;
      this.state = new Uint8Array(200), this.state32 = (s2 = this.state, new Uint32Array(s2.buffer, s2.byteOffset, Math.floor(s2.byteLength / 4)));
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      Vo(this.state32), (function(e2, t2 = 24) {
        const r2 = new Uint32Array(10);
        for (let n2 = 24 - t2; n2 < 24; n2++) {
          for (let t4 = 0; t4 < 10; t4++) r2[t4] = e2[t4] ^ e2[t4 + 10] ^ e2[t4 + 20] ^ e2[t4 + 30] ^ e2[t4 + 40];
          for (let t4 = 0; t4 < 10; t4 += 2) {
            const n3 = (t4 + 8) % 10, i3 = (t4 + 2) % 10, s2 = r2[i3], a2 = r2[i3 + 1], o2 = Lh(s2, a2, 1) ^ r2[n3], c2 = Oh(s2, a2, 1) ^ r2[n3 + 1];
            for (let r3 = 0; r3 < 50; r3 += 10) e2[t4 + r3] ^= o2, e2[t4 + r3 + 1] ^= c2;
          }
          let t3 = e2[2], i2 = e2[3];
          for (let r3 = 0; r3 < 24; r3++) {
            const n3 = Mh[r3], s2 = Lh(t3, i2, n3), a2 = Oh(t3, i2, n3), o2 = Qh[r3];
            t3 = e2[o2], i2 = e2[o2 + 1], e2[o2] = s2, e2[o2 + 1] = a2;
          }
          for (let t4 = 0; t4 < 50; t4 += 10) {
            for (let n3 = 0; n3 < 10; n3++) r2[n3] = e2[t4 + n3];
            for (let n3 = 0; n3 < 10; n3++) e2[t4 + n3] ^= ~r2[(n3 + 2) % 10] & r2[(n3 + 4) % 10];
          }
          e2[0] ^= Th[n2], e2[1] ^= Nh[n2];
        }
        Ho(r2);
      })(this.state32, this.rounds), Vo(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(e2) {
      Lo(this), To(e2 = nc(e2));
      const { blockLen: t2, state: r2 } = this, n2 = e2.length;
      for (let i2 = 0; i2 < n2; ) {
        const s2 = Math.min(t2 - this.pos, n2 - i2);
        for (let t3 = 0; t3 < s2; t3++) r2[this.pos++] ^= e2[i2++];
        this.pos === t2 && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished) return;
      this.finished = true;
      const { state: e2, suffix: t2, pos: r2, blockLen: n2 } = this;
      e2[r2] ^= t2, 128 & t2 && r2 === n2 - 1 && this.keccak(), e2[n2 - 1] ^= 128, this.keccak();
    }
    writeInto(e2) {
      Lo(this, false), To(e2), this.finish();
      const t2 = this.state, { blockLen: r2 } = this;
      for (let n2 = 0, i2 = e2.length; n2 < i2; ) {
        this.posOut >= r2 && this.keccak();
        const s2 = Math.min(r2 - this.posOut, i2 - n2);
        e2.set(t2.subarray(this.posOut, this.posOut + s2), n2), this.posOut += s2, n2 += s2;
      }
      return e2;
    }
    xofInto(e2) {
      if (!this.enableXOF) throw Error("XOF is not possible for this instance");
      return this.writeInto(e2);
    }
    xof(e2) {
      return Fo(e2), this.xofInto(new Uint8Array(e2));
    }
    digestInto(e2) {
      if (Oo(e2, this), this.finished) throw Error("digest() was already called");
      return this.writeInto(e2), this.destroy(), e2;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = true, Ho(this.state);
    }
    _cloneInto(e2) {
      const { blockLen: t2, suffix: r2, outputLen: n2, rounds: i2, enableXOF: s2 } = this;
      return e2 || (e2 = new _Hh(t2, r2, n2, s2, i2)), e2.state32.set(this.state32), e2.pos = this.pos, e2.posOut = this.posOut, e2.finished = this.finished, e2.rounds = i2, e2.suffix = r2, e2.outputLen = n2, e2.enableXOF = s2, e2.destroyed = this.destroyed, e2;
    }
  };
  var zh = (e2, t2, r2) => ac((() => new Hh(t2, e2, r2)));
  var Gh = /* @__PURE__ */ (() => zh(6, 136, 32))();
  var jh = /* @__PURE__ */ (() => zh(6, 72, 64))();
  var Vh = (e2, t2, r2) => (function(e3) {
    const t3 = (t4, r4) => e3(r4).update(nc(t4)).digest(), r3 = e3({});
    return t3.outputLen = r3.outputLen, t3.blockLen = r3.blockLen, t3.create = (t4) => e3(t4), t3;
  })(((n2 = {}) => new Hh(t2, e2, void 0 === n2.dkLen ? r2 : n2.dkLen, true)));
  var qh = /* @__PURE__ */ (() => Vh(31, 136, 32))();
  var _h = BigInt(0);
  var Yh = BigInt(1);
  var Zh = BigInt(2);
  var Jh = BigInt(8);
  function Wh(e2, t2 = {}) {
    const r2 = $u("edwards", e2, t2, t2.FpFnLE), { Fp: n2, Fn: i2 } = r2;
    let s2 = r2.CURVE;
    const { h: a2 } = s2;
    Bc(t2, {}, { uvRatio: "function" });
    const o2 = Zh << BigInt(8 * i2.BYTES) - Yh, c2 = (e3) => n2.create(e3), u2 = t2.uvRatio || ((e3, t3) => {
      try {
        return { isValid: true, value: n2.sqrt(n2.div(e3, t3)) };
      } catch (e4) {
        return { isValid: false, value: _h };
      }
    });
    if (!(function(e3, t3, r3, n3) {
      const i3 = e3.sqr(r3), s3 = e3.sqr(n3), a3 = e3.add(e3.mul(t3.a, i3), s3), o3 = e3.add(e3.ONE, e3.mul(t3.d, e3.mul(i3, s3)));
      return e3.eql(a3, o3);
    })(n2, s2, s2.Gx, s2.Gy)) throw Error("bad curve params: generator point");
    function h2(e3, t3, r3 = false) {
      return Ec("coordinate " + e3, t3, r3 ? Yh : _h, o2), t3;
    }
    function f2(e3) {
      if (!(e3 instanceof g2)) throw Error("ExtendedPoint expected");
    }
    const l2 = Sc(((e3, t3) => {
      const { X: r3, Y: i3, Z: s3 } = e3, a3 = e3.is0();
      null == t3 && (t3 = a3 ? Jh : n2.inv(s3));
      const o3 = c2(r3 * t3), u3 = c2(i3 * t3), h3 = n2.mul(s3, t3);
      if (a3) return { x: _h, y: Yh };
      if (h3 !== Yh) throw Error("invZ was invalid");
      return { x: o3, y: u3 };
    })), y2 = Sc(((e3) => {
      const { a: t3, d: r3 } = s2;
      if (e3.is0()) throw Error("bad point: ZERO");
      const { X: n3, Y: i3, Z: a3, T: o3 } = e3, u3 = c2(n3 * n3), h3 = c2(i3 * i3), f3 = c2(a3 * a3), l3 = c2(f3 * f3), y3 = c2(u3 * t3);
      if (c2(f3 * c2(y3 + h3)) !== c2(l3 + c2(r3 * c2(u3 * h3)))) throw Error("bad point: equation left != right (1)");
      if (c2(n3 * i3) !== c2(a3 * o3)) throw Error("bad point: equation left != right (2)");
      return true;
    }));
    class g2 {
      constructor(e3, t3, r3, n3) {
        this.X = h2("x", e3), this.Y = h2("y", t3), this.Z = h2("z", r3, true), this.T = h2("t", n3), Object.freeze(this);
      }
      static CURVE() {
        return s2;
      }
      static fromAffine(e3) {
        if (e3 instanceof g2) throw Error("extended point not allowed");
        const { x: t3, y: r3 } = e3 || {};
        return h2("x", t3), h2("y", r3), new g2(t3, r3, Yh, c2(t3 * r3));
      }
      static fromBytes(e3, t3 = false) {
        const r3 = n2.BYTES, { a: i3, d: a3 } = s2;
        e3 = bc(lc(e3, r3, "point")), fc(t3, "zip215");
        const h3 = bc(e3), f3 = e3[r3 - 1];
        h3[r3 - 1] = -129 & f3;
        const l3 = dc(h3), y3 = t3 ? o2 : n2.ORDER;
        Ec("point.y", l3, _h, y3);
        const p3 = c2(l3 * l3), d2 = c2(p3 - Yh), A2 = c2(a3 * p3 - i3);
        let { isValid: w2, value: m2 } = u2(d2, A2);
        if (!w2) throw Error("bad point: invalid y coordinate");
        const b2 = (m2 & Yh) === Yh, k2 = !!(128 & f3);
        if (!t3 && m2 === _h && k2) throw Error("bad point: x=0 and x_0=1");
        return k2 !== b2 && (m2 = c2(-m2)), g2.fromAffine({ x: m2, y: l3 });
      }
      static fromHex(e3, t3 = false) {
        return g2.fromBytes(mc("point", e3), t3);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      precompute(e3 = 8, t3 = true) {
        return p2.createCache(this, e3), t3 || this.multiply(Zh), this;
      }
      assertValidity() {
        y2(this);
      }
      equals(e3) {
        f2(e3);
        const { X: t3, Y: r3, Z: n3 } = this, { X: i3, Y: s3, Z: a3 } = e3, o3 = c2(t3 * a3), u3 = c2(i3 * n3), h3 = c2(r3 * a3), l3 = c2(s3 * n3);
        return o3 === u3 && h3 === l3;
      }
      is0() {
        return this.equals(g2.ZERO);
      }
      negate() {
        return new g2(c2(-this.X), this.Y, this.Z, c2(-this.T));
      }
      double() {
        const { a: e3 } = s2, { X: t3, Y: r3, Z: n3 } = this, i3 = c2(t3 * t3), a3 = c2(r3 * r3), o3 = c2(Zh * c2(n3 * n3)), u3 = c2(e3 * i3), h3 = t3 + r3, f3 = c2(c2(h3 * h3) - i3 - a3), l3 = u3 + a3, y3 = l3 - o3, p3 = u3 - a3, d2 = c2(f3 * y3), A2 = c2(l3 * p3), w2 = c2(f3 * p3), m2 = c2(y3 * l3);
        return new g2(d2, A2, m2, w2);
      }
      add(e3) {
        f2(e3);
        const { a: t3, d: r3 } = s2, { X: n3, Y: i3, Z: a3, T: o3 } = this, { X: u3, Y: h3, Z: l3, T: y3 } = e3, p3 = c2(n3 * u3), d2 = c2(i3 * h3), A2 = c2(o3 * r3 * y3), w2 = c2(a3 * l3), m2 = c2((n3 + i3) * (u3 + h3) - p3 - d2), b2 = w2 - A2, k2 = w2 + A2, E2 = c2(d2 - t3 * p3), v2 = c2(m2 * b2), I2 = c2(k2 * E2), B2 = c2(m2 * E2), S2 = c2(b2 * k2);
        return new g2(v2, I2, S2, B2);
      }
      subtract(e3) {
        return this.add(e3.negate());
      }
      multiply(e3) {
        if (!i2.isValidNot0(e3)) throw Error("invalid scalar: expected 1 <= sc < curve.n");
        const { p: t3, f: r3 } = p2.cached(this, e3, ((e4) => zu(g2, e4)));
        return zu(g2, [t3, r3])[0];
      }
      multiplyUnsafe(e3, t3 = g2.ZERO) {
        if (!i2.isValid(e3)) throw Error("invalid scalar: expected 0 <= sc < curve.n");
        return e3 === _h ? g2.ZERO : this.is0() || e3 === Yh ? this : p2.unsafe(this, e3, ((e4) => zu(g2, e4)), t3);
      }
      isSmallOrder() {
        return this.multiplyUnsafe(a2).is0();
      }
      isTorsionFree() {
        return p2.unsafe(this, s2.n).is0();
      }
      toAffine(e3) {
        return l2(this, e3);
      }
      clearCofactor() {
        return a2 === Yh ? this : this.multiplyUnsafe(a2);
      }
      toBytes() {
        const { x: e3, y: t3 } = this.toAffine(), r3 = n2.toBytes(t3);
        return r3[r3.length - 1] |= e3 & Yh ? 128 : 0, r3;
      }
      toHex() {
        return Yo(this.toBytes());
      }
      toString() {
        return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
      }
      get ex() {
        return this.X;
      }
      get ey() {
        return this.Y;
      }
      get ez() {
        return this.Z;
      }
      get et() {
        return this.T;
      }
      static normalizeZ(e3) {
        return zu(g2, e3);
      }
      static msm(e3, t3) {
        return Wu(g2, i2, e3, t3);
      }
      _setWindowSize(e3) {
        this.precompute(e3);
      }
      toRawBytes() {
        return this.toBytes();
      }
    }
    g2.BASE = new g2(s2.Gx, s2.Gy, Yh, c2(s2.Gx * s2.Gy)), g2.ZERO = new g2(_h, Yh, Yh, _h), g2.Fp = n2, g2.Fn = i2;
    const p2 = new Ju(g2, i2.BITS);
    return g2.BASE.precompute(8), g2;
  }
  function Xh(e2, t2, r2 = {}) {
    if ("function" != typeof t2) throw Error('"hash" function param is required');
    Bc(r2, {}, { adjustScalarBytes: "function", randomBytes: "function", domain: "function", prehash: "function", mapToCurve: "function" });
    const { prehash: n2 } = r2, { BASE: i2, Fp: s2, Fn: a2 } = e2, o2 = r2.randomBytes || cc, c2 = r2.adjustScalarBytes || ((e3) => e3), u2 = r2.domain || ((e3, t3, r3) => {
      if (fc(r3, "phflag"), t3.length || r3) throw Error("Contexts/pre-hash are not supported");
      return e3;
    });
    function h2(e3) {
      return a2.create(dc(e3));
    }
    function f2(e3) {
      const { head: r3, prefix: n3, scalar: s3 } = (function(e4) {
        const r4 = d2.secretKey;
        e4 = mc("private key", e4, r4);
        const n4 = mc("hashed private key", t2(e4), 2 * r4), i3 = c2(n4.slice(0, r4));
        return { head: i3, prefix: n4.slice(r4, 2 * r4), scalar: h2(i3) };
      })(e3), a3 = i2.multiply(s3), o3 = a3.toBytes();
      return { head: r3, prefix: n3, scalar: s3, point: a3, pointBytes: o3 };
    }
    function l2(e3) {
      return f2(e3).pointBytes;
    }
    function y2(e3 = Uint8Array.of(), ...r3) {
      const i3 = ic(...r3);
      return h2(t2(u2(i3, mc("context", e3), !!n2)));
    }
    const g2 = { zip215: true };
    const p2 = s2.BYTES, d2 = { secretKey: p2, publicKey: p2, signature: 2 * p2, seed: p2 };
    function A2(e3 = o2(d2.seed)) {
      return lc(e3, d2.seed, "seed");
    }
    const w2 = { getExtendedPublicKey: f2, randomSecretKey: A2, isValidSecretKey: function(e3) {
      return Ro(e3) && e3.length === a2.BYTES;
    }, isValidPublicKey: function(t3, r3) {
      try {
        return !!e2.fromBytes(t3, r3);
      } catch (e3) {
        return false;
      }
    }, toMontgomery(t3) {
      const { y: r3 } = e2.fromBytes(t3), n3 = d2.publicKey, i3 = 32 === n3;
      if (!i3 && 57 !== n3) throw Error("only defined for 25519 and 448");
      const a3 = i3 ? s2.div(Yh + r3, Yh - r3) : s2.div(r3 - Yh, r3 + Yh);
      return s2.toBytes(a3);
    }, toMontgomerySecret(e3) {
      const r3 = d2.secretKey;
      lc(e3, r3);
      const n3 = t2(e3.subarray(0, r3));
      return c2(n3).subarray(0, r3);
    }, randomPrivateKey: A2, precompute: (t3 = 8, r3 = e2.BASE) => r3.precompute(t3, false) };
    return Object.freeze({ keygen: function(e3) {
      const t3 = w2.randomSecretKey(e3);
      return { secretKey: t3, publicKey: l2(t3) };
    }, getPublicKey: l2, sign: function(e3, t3, r3 = {}) {
      e3 = mc("message", e3), n2 && (e3 = n2(e3));
      const { prefix: s3, scalar: o3, pointBytes: c3 } = f2(t3), u3 = y2(r3.context, s3, e3), h3 = i2.multiply(u3).toBytes(), l3 = y2(r3.context, h3, c3, e3), g3 = a2.create(u3 + l3 * o3);
      if (!a2.isValid(g3)) throw Error("sign failed: invalid s");
      return lc(ic(h3, a2.toBytes(g3)), d2.signature, "result");
    }, verify: function(t3, r3, s3, a3 = g2) {
      const { context: o3, zip215: c3 } = a3, u3 = d2.signature;
      t3 = mc("signature", t3, u3), r3 = mc("message", r3), s3 = mc("publicKey", s3, d2.publicKey), void 0 !== c3 && fc(c3, "zip215"), n2 && (r3 = n2(r3));
      const h3 = u3 / 2, f3 = t3.subarray(0, h3), l3 = dc(t3.subarray(h3, u3));
      let p3, A3, w3;
      try {
        p3 = e2.fromBytes(s3, c3), A3 = e2.fromBytes(f3, c3), w3 = i2.multiplyUnsafe(l3);
      } catch (e3) {
        return false;
      }
      if (!c3 && p3.isSmallOrder()) return false;
      const m2 = y2(o3, A3.toBytes(), p3.toBytes(), r3);
      return A3.add(p3.multiplyUnsafe(m2)).subtract(w3).clearCofactor().is0();
    }, utils: w2, Point: e2, lengths: d2 });
  }
  var $h = BigInt(0);
  var ef = BigInt(1);
  var tf = BigInt(2);
  function rf(e2) {
    const t2 = (Bc(r2 = e2, { adjustScalarBytes: "function", powPminus2: "function" }), Object.freeze({ ...r2 }));
    var r2;
    const { P: n2, type: i2, adjustScalarBytes: s2, powPminus2: a2, randomBytes: o2 } = t2, c2 = "x25519" === i2;
    if (!c2 && "x448" !== i2) throw Error("invalid type");
    const u2 = o2 || cc, h2 = c2 ? 255 : 448, f2 = c2 ? 32 : 56, l2 = c2 ? BigInt(9) : BigInt(5), y2 = c2 ? BigInt(121665) : BigInt(39081), g2 = c2 ? tf ** BigInt(254) : tf ** BigInt(447), p2 = c2 ? BigInt(8) * tf ** BigInt(251) - ef : BigInt(4) * tf ** BigInt(445) - ef, d2 = g2 + p2 + ef, A2 = (e3) => Tc(e3, n2), w2 = m2(l2);
    function m2(e3) {
      return wc(A2(e3), f2);
    }
    function b2(e3, t3) {
      const r3 = (function(e4, t4) {
        Ec("u", e4, $h, n2), Ec("scalar", t4, g2, d2);
        const r4 = t4, i3 = e4;
        let s3 = ef, o3 = $h, c3 = e4, u3 = ef, f3 = $h;
        for (let e5 = BigInt(h2 - 1); e5 >= $h; e5--) {
          const t5 = r4 >> e5 & ef;
          f3 ^= t5, { x_2: s3, x_3: c3 } = E2(f3, s3, c3), { x_2: o3, x_3: u3 } = E2(f3, o3, u3), f3 = t5;
          const n3 = s3 + o3, a3 = A2(n3 * n3), h3 = s3 - o3, l4 = A2(h3 * h3), g3 = a3 - l4, p3 = c3 + u3, d3 = A2((c3 - u3) * n3), w3 = A2(p3 * h3), m3 = d3 + w3, b3 = d3 - w3;
          c3 = A2(m3 * m3), u3 = A2(i3 * A2(b3 * b3)), s3 = A2(a3 * l4), o3 = A2(g3 * (a3 + A2(y2 * g3)));
        }
        ({ x_2: s3, x_3: c3 } = E2(f3, s3, c3)), { x_2: o3, x_3: u3 } = E2(f3, o3, u3);
        const l3 = a2(o3);
        return A2(s3 * l3);
      })((function(e4) {
        const t4 = mc("u coordinate", e4, f2);
        return c2 && (t4[31] &= 127), A2(dc(t4));
      })(t3), (function(e4) {
        return dc(s2(mc("scalar", e4, f2)));
      })(e3));
      if (r3 === $h) throw Error("invalid private or public key received");
      return m2(r3);
    }
    function k2(e3) {
      return b2(e3, w2);
    }
    function E2(e3, t3, r3) {
      const n3 = A2(e3 * (t3 - r3));
      return { x_2: t3 = A2(t3 - n3), x_3: r3 = A2(r3 + n3) };
    }
    const v2 = { secretKey: f2, publicKey: f2, seed: f2 }, I2 = (e3 = u2(f2)) => (To(e3, v2.seed), e3);
    return { keygen: function(e3) {
      const t3 = I2(e3);
      return { secretKey: t3, publicKey: k2(t3) };
    }, getSharedSecret: (e3, t3) => b2(e3, t3), getPublicKey: (e3) => k2(e3), scalarMult: b2, scalarMultBase: k2, utils: { randomSecretKey: I2, randomPrivateKey: I2 }, GuBytes: w2.slice(), lengths: v2 };
  }
  var nf = { p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), n: BigInt("0x3fffffffffffffffffffffffffffffffffffffffffffffffffffffff7cca23e9c44edb49aed63690216cc2728dc58f552378c292ab5844f3"), h: BigInt(4), a: BigInt(1), d: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffff6756"), Gx: BigInt("0x4f1970c66bed0ded221d15a622bf36da9e146570470f1767ea6de324a3d3a46412ae1af72ab66511433b80e18b00938e2626a82bc70cc05e"), Gy: BigInt("0x693f46716eb6bc248876203756c9c7624bea73736ca3984087789c1e05a0c2d73ad3ff1ce67c39c4fdbd132c4ed7c8ad9808795bf230fa14") };
  var sf = Object.assign({}, nf, { d: BigInt("0xd78b4bdc7f0daf19f24f38c29373a2ccad46157242a50f37809b1da3412a12e79ccc9c81264cfe9ad080997058fb61c4243cc32dbaa156b9"), Gx: BigInt("0x79a70b2b70400553ae7c9df416c792c61128751ac92969240c25a07d728bdc93e21f7787ed6972249de732f38496cd11698713093e9c04fc"), Gy: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000000000000000000000000000000000000000000000000001") });
  var af = /* @__PURE__ */ ac((() => qh.create({ dkLen: 114 })));
  var of = BigInt(1);
  var cf = BigInt(2);
  var uf = BigInt(3);
  BigInt(4);
  var hf = BigInt(11);
  var ff = BigInt(22);
  var lf = BigInt(44);
  var yf = BigInt(88);
  var gf = BigInt(223);
  function pf(e2) {
    const t2 = nf.p, r2 = e2 * e2 * e2 % t2, n2 = r2 * r2 * e2 % t2, i2 = Nc(n2, uf, t2) * n2 % t2, s2 = Nc(i2, uf, t2) * n2 % t2, a2 = Nc(s2, cf, t2) * r2 % t2, o2 = Nc(a2, hf, t2) * a2 % t2, c2 = Nc(o2, ff, t2) * o2 % t2, u2 = Nc(c2, lf, t2) * c2 % t2, h2 = Nc(u2, yf, t2) * u2 % t2, f2 = Nc(h2, lf, t2) * c2 % t2, l2 = Nc(f2, cf, t2) * r2 % t2, y2 = Nc(l2, of, t2) * e2 % t2;
    return Nc(y2, gf, t2) * l2 % t2;
  }
  function df(e2) {
    return e2[0] &= 252, e2[55] |= 128, e2[56] = 0, e2;
  }
  function Af(e2, t2) {
    const r2 = nf.p, n2 = Tc(e2 * e2 * t2, r2), i2 = Tc(n2 * e2, r2), s2 = Tc(i2 * n2 * t2, r2), a2 = Tc(i2 * pf(s2), r2), o2 = Tc(a2 * a2, r2);
    return { isValid: Tc(o2 * t2, r2) === e2, value: a2 };
  }
  var wf = /* @__PURE__ */ (() => Zc(nf.p, { BITS: 456, isLE: true }))();
  var mf = /* @__PURE__ */ (() => Zc(nf.n, { BITS: 456, isLE: true }))();
  function bf(e2, t2, r2) {
    if (t2.length > 255) throw Error("context must be smaller than 255, got: " + t2.length);
    return ic((n2 = "SigEd448", Uint8Array.from(n2, ((e3, t3) => {
      const r3 = e3.charCodeAt(0);
      if (1 !== e3.length || r3 > 127) throw Error(`string contains non-ASCII character "${n2[t3]}" with code ${r3} at position ${t3}`);
      return r3;
    }))), new Uint8Array([r2 ? 1 : 0, t2.length]), t2, e2);
    var n2;
  }
  var kf = (function(e2) {
    const { CURVE: t2, curveOpts: r2, hash: n2, eddsaOpts: i2 } = (function(e3) {
      const t3 = { a: e3.a, d: e3.d, p: e3.Fp.ORDER, n: e3.n, h: e3.h, Gx: e3.Gx, Gy: e3.Gy }, r3 = { Fp: e3.Fp, Fn: Zc(t3.n, e3.nBitLength, true), uvRatio: e3.uvRatio }, n3 = { randomBytes: e3.randomBytes, adjustScalarBytes: e3.adjustScalarBytes, domain: e3.domain, prehash: e3.prehash, mapToCurve: e3.mapToCurve };
      return { CURVE: t3, curveOpts: r3, hash: e3.hash, eddsaOpts: n3 };
    })(e2);
    return (function(e3, t3) {
      const r3 = t3.Point;
      return Object.assign({}, t3, { ExtendedPoint: r3, CURVE: e3, nBitLength: r3.Fn.BITS, nByteLength: r3.Fn.BYTES });
    })(e2, Xh(Wh(t2, r2), n2, i2));
  })(/* @__PURE__ */ (() => ({ ...nf, Fp: wf, Fn: mf, nBitLength: mf.BITS, hash: af, adjustScalarBytes: df, domain: bf, uvRatio: Af }))());
  Wh(sf);
  var Ef = /* @__PURE__ */ (() => {
    const e2 = nf.p;
    return rf({ P: e2, type: "x448", powPminus2: (t2) => Tc(Nc(pf(t2), cf, e2) * t2, e2), adjustScalarBytes: df });
  })();
  var vf = { p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), h: BigInt(1), a: BigInt(0), b: BigInt(7), Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"), Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8") };
  var If = { beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"), basises: [[BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")], [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]] };
  var Bf = /* @__PURE__ */ BigInt(2);
  var Sf = Zc(vf.p, { sqrt: function(e2) {
    const t2 = vf.p, r2 = BigInt(3), n2 = BigInt(6), i2 = BigInt(11), s2 = BigInt(22), a2 = BigInt(23), o2 = BigInt(44), c2 = BigInt(88), u2 = e2 * e2 * e2 % t2, h2 = u2 * u2 * e2 % t2, f2 = Nc(h2, r2, t2) * h2 % t2, l2 = Nc(f2, r2, t2) * h2 % t2, y2 = Nc(l2, Bf, t2) * u2 % t2, g2 = Nc(y2, i2, t2) * y2 % t2, p2 = Nc(g2, s2, t2) * g2 % t2, d2 = Nc(p2, o2, t2) * p2 % t2, A2 = Nc(d2, c2, t2) * d2 % t2, w2 = Nc(A2, o2, t2) * p2 % t2, m2 = Nc(w2, r2, t2) * h2 % t2, b2 = Nc(m2, a2, t2) * g2 % t2, k2 = Nc(b2, n2, t2) * u2 % t2, E2 = Nc(k2, Bf, t2);
    if (!Sf.eql(Sf.sqr(E2), e2)) throw Error("Cannot find square root");
    return E2;
  } });
  var Kf = Ah({ ...vf, Fp: Sf, lowS: true, endo: If }, Qu);
  var Cf = Qu;
  var Df = Mu;
  var Uf = Zc(BigInt("0xa9fb57dba1eea9bc3e660a909d838d726e3bf623d52620282013481d1f6e5377"));
  var Pf = Ah({ a: Uf.create(BigInt("0x7d5a0975fc2c3057eef67530417affe7fb8055c126dc5c6ce94a4b44f330b5d9")), b: BigInt("0x26dc5c6ce94a4b44f330b5d9bbd77cbf958416295cf7e1ce6bccdc18ff8c07b6"), Fp: Uf, n: BigInt("0xa9fb57dba1eea9bc3e660a909d838d718c397aa3b561a6f7901e0e82974856a7"), Gx: BigInt("0x8bd2aeb9cb7e57cb2c4b482ffc81b7afb9de27e1e3bd23c23a4453bd9ace3262"), Gy: BigInt("0x547ef835c3dac4fd97f8461a14611dc9c27745132ded8e545c1d54c72f046997"), h: BigInt(1), lowS: false }, Cf);
  var xf = Ru;
  var Qf = Fu;
  var Mf = Zc(BigInt("0x8cb91e82a3386d280f5d6f7e50e641df152f7109ed5456b412b1da197fb71123acd3a729901d1a71874700133107ec53"));
  var Rf = Ah({ a: Mf.create(BigInt("0x7bc382c63d8c150c3c72080ace05afa0c2bea28e4fb22787139165efba91f90f8aa5814a503ad4eb04a8c7dd22ce2826")), b: BigInt("0x04a8c7dd22ce28268b39b55416f0447c2fb77de107dcd2a62e880ea53eeb62d57cb4390295dbc9943ab78696fa504c11"), Fp: Mf, n: BigInt("0x8cb91e82a3386d280f5d6f7e50e641df152f7109ed5456b31f166e6cac0425a7cf3ab6af6b7fc3103b883202e9046565"), Gx: BigInt("0x1d1c64f068cf45ffa2a63a81b7c13f6b8847a3e77ef14fe3db7fcafe0cbd10e8e826e03436d646aaef87b2e247d4af1e"), Gy: BigInt("0x8abe1d7520f9c2a45cb1eb8e95cfd55262b70b29feec5864e19c054ff99129280e4646217791811142820341263c5315"), h: BigInt(1), lowS: false }, Qf);
  var Ff = Zc(BigInt("0xaadd9db8dbe9c48b3fd4e6ae33c9fc07cb308db3b3c9d20ed6639cca703308717d4d9b009bc66842aecda12ae6a380e62881ff2f2d82c68528aa6056583a48f3"));
  var Tf = Ah({ a: Ff.create(BigInt("0x7830a3318b603b89e2327145ac234cc594cbdd8d3df91610a83441caea9863bc2ded5d5aa8253aa10a2ef1c98b9ac8b57f1117a72bf2c7b9e7c1ac4d77fc94ca")), b: BigInt("0x3df91610a83441caea9863bc2ded5d5aa8253aa10a2ef1c98b9ac8b57f1117a72bf2c7b9e7c1ac4d77fc94cadc083e67984050b75ebae5dd2809bd638016f723"), Fp: Ff, n: BigInt("0xaadd9db8dbe9c48b3fd4e6ae33c9fc07cb308db3b3c9d20ed6639cca70330870553e5c414ca92619418661197fac10471db1d381085ddaddb58796829ca90069"), Gx: BigInt("0x81aee4bdd82ed9645a21322e9c4c6a9385ed9f70b5d916c1b43b62eef4d0098eff3b1f78e2d0d48d50d1687b93b97d5f7c6d5047406a5e688b352209bcb9f822"), Gy: BigInt("0x7dde385d566332ecc0eabfa9cf7822fdf209f70024a57b1aa000c55b881f8111b2dcde494a5f485e5bca4bd88a2763aed1ca2b2fa8f0540678cd1e0f3ad80892"), h: BigInt(1), lowS: false }, xf);
  var Nf = new Map(Object.entries({ nistP256: Ih, nistP384: Bh, nistP521: Sh, brainpoolP256r1: Pf, brainpoolP384r1: Rf, brainpoolP512r1: Tf, secp256k1: Kf, x448: Ef, ed448: kf }));
  var Lf = /* @__PURE__ */ Object.freeze({ __proto__: null, nobleCurves: Nf });
  var Of = /* @__PURE__ */ Uint32Array.from([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
  var Hf = /* @__PURE__ */ new Uint32Array(80);
  var zf = class extends eu {
    constructor() {
      super(64, 20, 8, false), this.A = 0 | Of[0], this.B = 0 | Of[1], this.C = 0 | Of[2], this.D = 0 | Of[3], this.E = 0 | Of[4];
    }
    get() {
      const { A: e2, B: t2, C: r2, D: n2, E: i2 } = this;
      return [e2, t2, r2, n2, i2];
    }
    set(e2, t2, r2, n2, i2) {
      this.A = 0 | e2, this.B = 0 | t2, this.C = 0 | r2, this.D = 0 | n2, this.E = 0 | i2;
    }
    process(e2, t2) {
      for (let r3 = 0; r3 < 16; r3++, t2 += 4) Hf[r3] = e2.getUint32(t2, false);
      for (let e3 = 16; e3 < 80; e3++) Hf[e3] = jo(Hf[e3 - 3] ^ Hf[e3 - 8] ^ Hf[e3 - 14] ^ Hf[e3 - 16], 1);
      let { A: r2, B: n2, C: i2, D: s2, E: a2 } = this;
      for (let e3 = 0; e3 < 80; e3++) {
        let t3, o2;
        e3 < 20 ? (t3 = Xc(n2, i2, s2), o2 = 1518500249) : e3 < 40 ? (t3 = n2 ^ i2 ^ s2, o2 = 1859775393) : e3 < 60 ? (t3 = $c(n2, i2, s2), o2 = 2400959708) : (t3 = n2 ^ i2 ^ s2, o2 = 3395469782);
        const c2 = jo(r2, 5) + t3 + a2 + o2 + Hf[e3] | 0;
        a2 = s2, s2 = i2, i2 = jo(n2, 30), n2 = r2, r2 = c2;
      }
      r2 = r2 + this.A | 0, n2 = n2 + this.B | 0, i2 = i2 + this.C | 0, s2 = s2 + this.D | 0, a2 = a2 + this.E | 0, this.set(r2, n2, i2, s2, a2);
    }
    roundClean() {
      Ho(Hf);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0), Ho(this.buffer);
    }
  };
  var Gf = /* @__PURE__ */ ac((() => new zf()));
  var jf = /* @__PURE__ */ Uint8Array.from([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]);
  var Vf = /* @__PURE__ */ (() => Uint8Array.from(Array(16).fill(0).map(((e2, t2) => t2))))();
  var qf = /* @__PURE__ */ (() => Vf.map(((e2) => (9 * e2 + 5) % 16)))();
  var _f = /* @__PURE__ */ (() => {
    const e2 = [[Vf], [qf]];
    for (let t2 = 0; t2 < 4; t2++) for (let r2 of e2) r2.push(r2[t2].map(((e3) => jf[e3])));
    return e2;
  })();
  var Yf = /* @__PURE__ */ (() => _f[0])();
  var Zf = /* @__PURE__ */ (() => _f[1])();
  var Jf = /* @__PURE__ */ [[11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8], [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7], [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9], [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6], [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]].map(((e2) => Uint8Array.from(e2)));
  var Wf = /* @__PURE__ */ Yf.map(((e2, t2) => e2.map(((e3) => Jf[t2][e3]))));
  var Xf = /* @__PURE__ */ Zf.map(((e2, t2) => e2.map(((e3) => Jf[t2][e3]))));
  var $f = /* @__PURE__ */ Uint32Array.from([0, 1518500249, 1859775393, 2400959708, 2840853838]);
  var el = /* @__PURE__ */ Uint32Array.from([1352829926, 1548603684, 1836072691, 2053994217, 0]);
  function tl(e2, t2, r2, n2) {
    return 0 === e2 ? t2 ^ r2 ^ n2 : 1 === e2 ? t2 & r2 | ~t2 & n2 : 2 === e2 ? (t2 | ~r2) ^ n2 : 3 === e2 ? t2 & n2 | r2 & ~n2 : t2 ^ (r2 | ~n2);
  }
  var rl = /* @__PURE__ */ new Uint32Array(16);
  var nl = class extends eu {
    constructor() {
      super(64, 20, 8, true), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
    }
    get() {
      const { h0: e2, h1: t2, h2: r2, h3: n2, h4: i2 } = this;
      return [e2, t2, r2, n2, i2];
    }
    set(e2, t2, r2, n2, i2) {
      this.h0 = 0 | e2, this.h1 = 0 | t2, this.h2 = 0 | r2, this.h3 = 0 | n2, this.h4 = 0 | i2;
    }
    process(e2, t2) {
      for (let r3 = 0; r3 < 16; r3++, t2 += 4) rl[r3] = e2.getUint32(t2, true);
      let r2 = 0 | this.h0, n2 = r2, i2 = 0 | this.h1, s2 = i2, a2 = 0 | this.h2, o2 = a2, c2 = 0 | this.h3, u2 = c2, h2 = 0 | this.h4, f2 = h2;
      for (let e3 = 0; e3 < 5; e3++) {
        const t3 = 4 - e3, l2 = $f[e3], y2 = el[e3], g2 = Yf[e3], p2 = Zf[e3], d2 = Wf[e3], A2 = Xf[e3];
        for (let t4 = 0; t4 < 16; t4++) {
          const n3 = jo(r2 + tl(e3, i2, a2, c2) + rl[g2[t4]] + l2, d2[t4]) + h2 | 0;
          r2 = h2, h2 = c2, c2 = 0 | jo(a2, 10), a2 = i2, i2 = n3;
        }
        for (let e4 = 0; e4 < 16; e4++) {
          const r3 = jo(n2 + tl(t3, s2, o2, u2) + rl[p2[e4]] + y2, A2[e4]) + f2 | 0;
          n2 = f2, f2 = u2, u2 = 0 | jo(o2, 10), o2 = s2, s2 = r3;
        }
      }
      this.set(this.h1 + a2 + u2 | 0, this.h2 + c2 + f2 | 0, this.h3 + h2 + n2 | 0, this.h4 + r2 + s2 | 0, this.h0 + i2 + o2 | 0);
    }
    roundClean() {
      Ho(rl);
    }
    destroy() {
      this.destroyed = true, Ho(this.buffer), this.set(0, 0, 0, 0, 0);
    }
  };
  var il = Gf;
  var sl = /* @__PURE__ */ ac((() => new nl()));
  var al = Array.from({ length: 64 }, ((e2, t2) => Math.floor(2 ** 32 * Math.abs(Math.sin(t2 + 1)))));
  var ol = (e2, t2, r2) => e2 & t2 ^ ~e2 & r2;
  var cl = /* @__PURE__ */ new Uint32Array([1732584193, 4023233417, 2562383102, 271733878]);
  var ul = /* @__PURE__ */ new Uint32Array(16);
  var hl = class extends eu {
    constructor() {
      super(64, 16, 8, true), this.A = 0 | cl[0], this.B = 0 | cl[1], this.C = 0 | cl[2], this.D = 0 | cl[3];
    }
    get() {
      const { A: e2, B: t2, C: r2, D: n2 } = this;
      return [e2, t2, r2, n2];
    }
    set(e2, t2, r2, n2) {
      this.A = 0 | e2, this.B = 0 | t2, this.C = 0 | r2, this.D = 0 | n2;
    }
    process(e2, t2) {
      for (let r3 = 0; r3 < 16; r3++, t2 += 4) ul[r3] = e2.getUint32(t2, true);
      let { A: r2, B: n2, C: i2, D: s2 } = this;
      for (let e3 = 0; e3 < 64; e3++) {
        let t3, a2, o2;
        e3 < 16 ? (t3 = ol(n2, i2, s2), a2 = e3, o2 = [7, 12, 17, 22]) : e3 < 32 ? (t3 = ol(s2, n2, i2), a2 = (5 * e3 + 1) % 16, o2 = [5, 9, 14, 20]) : e3 < 48 ? (t3 = n2 ^ i2 ^ s2, a2 = (3 * e3 + 5) % 16, o2 = [4, 11, 16, 23]) : (t3 = i2 ^ (n2 | ~s2), a2 = 7 * e3 % 16, o2 = [6, 10, 15, 21]), t3 = t3 + r2 + al[e3] + ul[a2], r2 = s2, s2 = i2, i2 = n2, n2 += jo(t3, o2[e3 % 4]);
      }
      r2 = r2 + this.A | 0, n2 = n2 + this.B | 0, i2 = i2 + this.C | 0, s2 = s2 + this.D | 0, this.set(r2, n2, i2, s2);
    }
    roundClean() {
      ul.fill(0);
    }
    destroy() {
      this.set(0, 0, 0, 0), this.buffer.fill(0);
    }
  };
  var fl = new Map(Object.entries({ md5: /* @__PURE__ */ oc((() => new hl())), sha1: il, sha224: Df, sha256: Cf, sha384: Qf, sha512: xf, sha3_256: Gh, sha3_512: jh, ripemd160: sl }));
  var ll = /* @__PURE__ */ Object.freeze({ __proto__: null, nobleHashes: fl });
  var yl = "object" == typeof e && "crypto" in e ? e.crypto : void 0;
  var gl = {};
  var pl = function(e2) {
    var t2, r2 = new Float64Array(16);
    if (e2) for (t2 = 0; t2 < e2.length; t2++) r2[t2] = e2[t2];
    return r2;
  };
  var dl = function() {
    throw Error("no PRNG");
  };
  var Al = new Uint8Array(32);
  Al[0] = 9;
  var wl = pl();
  var ml = pl([1]);
  var bl = pl([56129, 1]);
  var kl = pl([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]);
  var El = pl([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]);
  var vl = pl([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]);
  var Il = pl([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]);
  var Bl = pl([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
  function Sl(e2, t2, r2, n2) {
    e2[t2] = r2 >> 24 & 255, e2[t2 + 1] = r2 >> 16 & 255, e2[t2 + 2] = r2 >> 8 & 255, e2[t2 + 3] = 255 & r2, e2[t2 + 4] = n2 >> 24 & 255, e2[t2 + 5] = n2 >> 16 & 255, e2[t2 + 6] = n2 >> 8 & 255, e2[t2 + 7] = 255 & n2;
  }
  function Kl(e2, t2, r2, n2) {
    return (function(e3, t3, r3, n3, i2) {
      var s2, a2 = 0;
      for (s2 = 0; s2 < i2; s2++) a2 |= e3[t3 + s2] ^ r3[n3 + s2];
      return (1 & a2 - 1 >>> 8) - 1;
    })(e2, t2, r2, n2, 32);
  }
  function Cl(e2, t2) {
    var r2;
    for (r2 = 0; r2 < 16; r2++) e2[r2] = 0 | t2[r2];
  }
  function Dl(e2) {
    var t2, r2, n2 = 1;
    for (t2 = 0; t2 < 16; t2++) r2 = e2[t2] + n2 + 65535, n2 = Math.floor(r2 / 65536), e2[t2] = r2 - 65536 * n2;
    e2[0] += n2 - 1 + 37 * (n2 - 1);
  }
  function Ul(e2, t2, r2) {
    for (var n2, i2 = ~(r2 - 1), s2 = 0; s2 < 16; s2++) n2 = i2 & (e2[s2] ^ t2[s2]), e2[s2] ^= n2, t2[s2] ^= n2;
  }
  function Pl(e2, t2) {
    var r2, n2, i2, s2 = pl(), a2 = pl();
    for (r2 = 0; r2 < 16; r2++) a2[r2] = t2[r2];
    for (Dl(a2), Dl(a2), Dl(a2), n2 = 0; n2 < 2; n2++) {
      for (s2[0] = a2[0] - 65517, r2 = 1; r2 < 15; r2++) s2[r2] = a2[r2] - 65535 - (s2[r2 - 1] >> 16 & 1), s2[r2 - 1] &= 65535;
      s2[15] = a2[15] - 32767 - (s2[14] >> 16 & 1), i2 = s2[15] >> 16 & 1, s2[14] &= 65535, Ul(a2, s2, 1 - i2);
    }
    for (r2 = 0; r2 < 16; r2++) e2[2 * r2] = 255 & a2[r2], e2[2 * r2 + 1] = a2[r2] >> 8;
  }
  function xl(e2, t2) {
    var r2 = new Uint8Array(32), n2 = new Uint8Array(32);
    return Pl(r2, e2), Pl(n2, t2), Kl(r2, 0, n2, 0);
  }
  function Ql(e2) {
    var t2 = new Uint8Array(32);
    return Pl(t2, e2), 1 & t2[0];
  }
  function Ml(e2, t2) {
    var r2;
    for (r2 = 0; r2 < 16; r2++) e2[r2] = t2[2 * r2] + (t2[2 * r2 + 1] << 8);
    e2[15] &= 32767;
  }
  function Rl(e2, t2, r2) {
    for (var n2 = 0; n2 < 16; n2++) e2[n2] = t2[n2] + r2[n2];
  }
  function Fl(e2, t2, r2) {
    for (var n2 = 0; n2 < 16; n2++) e2[n2] = t2[n2] - r2[n2];
  }
  function Tl(e2, t2, r2) {
    var n2, i2, s2 = 0, a2 = 0, o2 = 0, c2 = 0, u2 = 0, h2 = 0, f2 = 0, l2 = 0, y2 = 0, g2 = 0, p2 = 0, d2 = 0, A2 = 0, w2 = 0, m2 = 0, b2 = 0, k2 = 0, E2 = 0, v2 = 0, I2 = 0, B2 = 0, S2 = 0, K2 = 0, C2 = 0, D2 = 0, U2 = 0, P2 = 0, x2 = 0, Q2 = 0, M2 = 0, R2 = 0, F2 = r2[0], T2 = r2[1], N2 = r2[2], L2 = r2[3], O2 = r2[4], H2 = r2[5], z2 = r2[6], G2 = r2[7], j2 = r2[8], V2 = r2[9], q2 = r2[10], _2 = r2[11], Y2 = r2[12], Z2 = r2[13], J2 = r2[14], W2 = r2[15];
    s2 += (n2 = t2[0]) * F2, a2 += n2 * T2, o2 += n2 * N2, c2 += n2 * L2, u2 += n2 * O2, h2 += n2 * H2, f2 += n2 * z2, l2 += n2 * G2, y2 += n2 * j2, g2 += n2 * V2, p2 += n2 * q2, d2 += n2 * _2, A2 += n2 * Y2, w2 += n2 * Z2, m2 += n2 * J2, b2 += n2 * W2, a2 += (n2 = t2[1]) * F2, o2 += n2 * T2, c2 += n2 * N2, u2 += n2 * L2, h2 += n2 * O2, f2 += n2 * H2, l2 += n2 * z2, y2 += n2 * G2, g2 += n2 * j2, p2 += n2 * V2, d2 += n2 * q2, A2 += n2 * _2, w2 += n2 * Y2, m2 += n2 * Z2, b2 += n2 * J2, k2 += n2 * W2, o2 += (n2 = t2[2]) * F2, c2 += n2 * T2, u2 += n2 * N2, h2 += n2 * L2, f2 += n2 * O2, l2 += n2 * H2, y2 += n2 * z2, g2 += n2 * G2, p2 += n2 * j2, d2 += n2 * V2, A2 += n2 * q2, w2 += n2 * _2, m2 += n2 * Y2, b2 += n2 * Z2, k2 += n2 * J2, E2 += n2 * W2, c2 += (n2 = t2[3]) * F2, u2 += n2 * T2, h2 += n2 * N2, f2 += n2 * L2, l2 += n2 * O2, y2 += n2 * H2, g2 += n2 * z2, p2 += n2 * G2, d2 += n2 * j2, A2 += n2 * V2, w2 += n2 * q2, m2 += n2 * _2, b2 += n2 * Y2, k2 += n2 * Z2, E2 += n2 * J2, v2 += n2 * W2, u2 += (n2 = t2[4]) * F2, h2 += n2 * T2, f2 += n2 * N2, l2 += n2 * L2, y2 += n2 * O2, g2 += n2 * H2, p2 += n2 * z2, d2 += n2 * G2, A2 += n2 * j2, w2 += n2 * V2, m2 += n2 * q2, b2 += n2 * _2, k2 += n2 * Y2, E2 += n2 * Z2, v2 += n2 * J2, I2 += n2 * W2, h2 += (n2 = t2[5]) * F2, f2 += n2 * T2, l2 += n2 * N2, y2 += n2 * L2, g2 += n2 * O2, p2 += n2 * H2, d2 += n2 * z2, A2 += n2 * G2, w2 += n2 * j2, m2 += n2 * V2, b2 += n2 * q2, k2 += n2 * _2, E2 += n2 * Y2, v2 += n2 * Z2, I2 += n2 * J2, B2 += n2 * W2, f2 += (n2 = t2[6]) * F2, l2 += n2 * T2, y2 += n2 * N2, g2 += n2 * L2, p2 += n2 * O2, d2 += n2 * H2, A2 += n2 * z2, w2 += n2 * G2, m2 += n2 * j2, b2 += n2 * V2, k2 += n2 * q2, E2 += n2 * _2, v2 += n2 * Y2, I2 += n2 * Z2, B2 += n2 * J2, S2 += n2 * W2, l2 += (n2 = t2[7]) * F2, y2 += n2 * T2, g2 += n2 * N2, p2 += n2 * L2, d2 += n2 * O2, A2 += n2 * H2, w2 += n2 * z2, m2 += n2 * G2, b2 += n2 * j2, k2 += n2 * V2, E2 += n2 * q2, v2 += n2 * _2, I2 += n2 * Y2, B2 += n2 * Z2, S2 += n2 * J2, K2 += n2 * W2, y2 += (n2 = t2[8]) * F2, g2 += n2 * T2, p2 += n2 * N2, d2 += n2 * L2, A2 += n2 * O2, w2 += n2 * H2, m2 += n2 * z2, b2 += n2 * G2, k2 += n2 * j2, E2 += n2 * V2, v2 += n2 * q2, I2 += n2 * _2, B2 += n2 * Y2, S2 += n2 * Z2, K2 += n2 * J2, C2 += n2 * W2, g2 += (n2 = t2[9]) * F2, p2 += n2 * T2, d2 += n2 * N2, A2 += n2 * L2, w2 += n2 * O2, m2 += n2 * H2, b2 += n2 * z2, k2 += n2 * G2, E2 += n2 * j2, v2 += n2 * V2, I2 += n2 * q2, B2 += n2 * _2, S2 += n2 * Y2, K2 += n2 * Z2, C2 += n2 * J2, D2 += n2 * W2, p2 += (n2 = t2[10]) * F2, d2 += n2 * T2, A2 += n2 * N2, w2 += n2 * L2, m2 += n2 * O2, b2 += n2 * H2, k2 += n2 * z2, E2 += n2 * G2, v2 += n2 * j2, I2 += n2 * V2, B2 += n2 * q2, S2 += n2 * _2, K2 += n2 * Y2, C2 += n2 * Z2, D2 += n2 * J2, U2 += n2 * W2, d2 += (n2 = t2[11]) * F2, A2 += n2 * T2, w2 += n2 * N2, m2 += n2 * L2, b2 += n2 * O2, k2 += n2 * H2, E2 += n2 * z2, v2 += n2 * G2, I2 += n2 * j2, B2 += n2 * V2, S2 += n2 * q2, K2 += n2 * _2, C2 += n2 * Y2, D2 += n2 * Z2, U2 += n2 * J2, P2 += n2 * W2, A2 += (n2 = t2[12]) * F2, w2 += n2 * T2, m2 += n2 * N2, b2 += n2 * L2, k2 += n2 * O2, E2 += n2 * H2, v2 += n2 * z2, I2 += n2 * G2, B2 += n2 * j2, S2 += n2 * V2, K2 += n2 * q2, C2 += n2 * _2, D2 += n2 * Y2, U2 += n2 * Z2, P2 += n2 * J2, x2 += n2 * W2, w2 += (n2 = t2[13]) * F2, m2 += n2 * T2, b2 += n2 * N2, k2 += n2 * L2, E2 += n2 * O2, v2 += n2 * H2, I2 += n2 * z2, B2 += n2 * G2, S2 += n2 * j2, K2 += n2 * V2, C2 += n2 * q2, D2 += n2 * _2, U2 += n2 * Y2, P2 += n2 * Z2, x2 += n2 * J2, Q2 += n2 * W2, m2 += (n2 = t2[14]) * F2, b2 += n2 * T2, k2 += n2 * N2, E2 += n2 * L2, v2 += n2 * O2, I2 += n2 * H2, B2 += n2 * z2, S2 += n2 * G2, K2 += n2 * j2, C2 += n2 * V2, D2 += n2 * q2, U2 += n2 * _2, P2 += n2 * Y2, x2 += n2 * Z2, Q2 += n2 * J2, M2 += n2 * W2, b2 += (n2 = t2[15]) * F2, a2 += 38 * (E2 += n2 * N2), o2 += 38 * (v2 += n2 * L2), c2 += 38 * (I2 += n2 * O2), u2 += 38 * (B2 += n2 * H2), h2 += 38 * (S2 += n2 * z2), f2 += 38 * (K2 += n2 * G2), l2 += 38 * (C2 += n2 * j2), y2 += 38 * (D2 += n2 * V2), g2 += 38 * (U2 += n2 * q2), p2 += 38 * (P2 += n2 * _2), d2 += 38 * (x2 += n2 * Y2), A2 += 38 * (Q2 += n2 * Z2), w2 += 38 * (M2 += n2 * J2), m2 += 38 * (R2 += n2 * W2), s2 = (n2 = (s2 += 38 * (k2 += n2 * T2)) + (i2 = 1) + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), a2 = (n2 = a2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), o2 = (n2 = o2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), c2 = (n2 = c2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), u2 = (n2 = u2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), h2 = (n2 = h2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), f2 = (n2 = f2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), l2 = (n2 = l2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), y2 = (n2 = y2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), g2 = (n2 = g2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), p2 = (n2 = p2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), d2 = (n2 = d2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), A2 = (n2 = A2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), w2 = (n2 = w2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), m2 = (n2 = m2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), b2 = (n2 = b2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), s2 = (n2 = (s2 += i2 - 1 + 37 * (i2 - 1)) + (i2 = 1) + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), a2 = (n2 = a2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), o2 = (n2 = o2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), c2 = (n2 = c2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), u2 = (n2 = u2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), h2 = (n2 = h2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), f2 = (n2 = f2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), l2 = (n2 = l2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), y2 = (n2 = y2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), g2 = (n2 = g2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), p2 = (n2 = p2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), d2 = (n2 = d2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), A2 = (n2 = A2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), w2 = (n2 = w2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), m2 = (n2 = m2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), b2 = (n2 = b2 + i2 + 65535) - 65536 * (i2 = Math.floor(n2 / 65536)), s2 += i2 - 1 + 37 * (i2 - 1), e2[0] = s2, e2[1] = a2, e2[2] = o2, e2[3] = c2, e2[4] = u2, e2[5] = h2, e2[6] = f2, e2[7] = l2, e2[8] = y2, e2[9] = g2, e2[10] = p2, e2[11] = d2, e2[12] = A2, e2[13] = w2, e2[14] = m2, e2[15] = b2;
  }
  function Nl(e2, t2) {
    Tl(e2, t2, t2);
  }
  function Ll(e2, t2) {
    var r2, n2 = pl();
    for (r2 = 0; r2 < 16; r2++) n2[r2] = t2[r2];
    for (r2 = 253; r2 >= 0; r2--) Nl(n2, n2), 2 !== r2 && 4 !== r2 && Tl(n2, n2, t2);
    for (r2 = 0; r2 < 16; r2++) e2[r2] = n2[r2];
  }
  function Ol(e2, t2, r2) {
    var n2, i2, s2 = new Uint8Array(32), a2 = new Float64Array(80), o2 = pl(), c2 = pl(), u2 = pl(), h2 = pl(), f2 = pl(), l2 = pl();
    for (i2 = 0; i2 < 31; i2++) s2[i2] = t2[i2];
    for (s2[31] = 127 & t2[31] | 64, s2[0] &= 248, Ml(a2, r2), i2 = 0; i2 < 16; i2++) c2[i2] = a2[i2], h2[i2] = o2[i2] = u2[i2] = 0;
    for (o2[0] = h2[0] = 1, i2 = 254; i2 >= 0; --i2) Ul(o2, c2, n2 = s2[i2 >>> 3] >>> (7 & i2) & 1), Ul(u2, h2, n2), Rl(f2, o2, u2), Fl(o2, o2, u2), Rl(u2, c2, h2), Fl(c2, c2, h2), Nl(h2, f2), Nl(l2, o2), Tl(o2, u2, o2), Tl(u2, c2, f2), Rl(f2, o2, u2), Fl(o2, o2, u2), Nl(c2, o2), Fl(u2, h2, l2), Tl(o2, u2, bl), Rl(o2, o2, h2), Tl(u2, u2, o2), Tl(o2, h2, l2), Tl(h2, c2, a2), Nl(c2, f2), Ul(o2, c2, n2), Ul(u2, h2, n2);
    for (i2 = 0; i2 < 16; i2++) a2[i2 + 16] = o2[i2], a2[i2 + 32] = u2[i2], a2[i2 + 48] = c2[i2], a2[i2 + 64] = h2[i2];
    var y2 = a2.subarray(32), g2 = a2.subarray(16);
    return Ll(y2, y2), Tl(g2, g2, y2), Pl(e2, g2), 0;
  }
  function Hl(e2, t2) {
    return Ol(e2, t2, Al);
  }
  var zl = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
  function Gl(e2, t2, r2, n2) {
    for (var i2, s2, a2, o2, c2, u2, h2, f2, l2, y2, g2, p2, d2, A2, w2, m2, b2, k2, E2, v2, I2, B2, S2, K2, C2, D2, U2 = new Int32Array(16), P2 = new Int32Array(16), x2 = e2[0], Q2 = e2[1], M2 = e2[2], R2 = e2[3], F2 = e2[4], T2 = e2[5], N2 = e2[6], L2 = e2[7], O2 = t2[0], H2 = t2[1], z2 = t2[2], G2 = t2[3], j2 = t2[4], V2 = t2[5], q2 = t2[6], _2 = t2[7], Y2 = 0; n2 >= 128; ) {
      for (E2 = 0; E2 < 16; E2++) v2 = 8 * E2 + Y2, U2[E2] = r2[v2 + 0] << 24 | r2[v2 + 1] << 16 | r2[v2 + 2] << 8 | r2[v2 + 3], P2[E2] = r2[v2 + 4] << 24 | r2[v2 + 5] << 16 | r2[v2 + 6] << 8 | r2[v2 + 7];
      for (E2 = 0; E2 < 80; E2++) if (i2 = x2, s2 = Q2, a2 = M2, o2 = R2, c2 = F2, u2 = T2, h2 = N2, L2, l2 = O2, y2 = H2, g2 = z2, p2 = G2, d2 = j2, A2 = V2, w2 = q2, _2, S2 = 65535 & (B2 = _2), K2 = B2 >>> 16, C2 = 65535 & (I2 = L2), D2 = I2 >>> 16, S2 += 65535 & (B2 = (j2 >>> 14 | F2 << 18) ^ (j2 >>> 18 | F2 << 14) ^ (F2 >>> 9 | j2 << 23)), K2 += B2 >>> 16, C2 += 65535 & (I2 = (F2 >>> 14 | j2 << 18) ^ (F2 >>> 18 | j2 << 14) ^ (j2 >>> 9 | F2 << 23)), D2 += I2 >>> 16, S2 += 65535 & (B2 = j2 & V2 ^ ~j2 & q2), K2 += B2 >>> 16, C2 += 65535 & (I2 = F2 & T2 ^ ~F2 & N2), D2 += I2 >>> 16, S2 += 65535 & (B2 = zl[2 * E2 + 1]), K2 += B2 >>> 16, C2 += 65535 & (I2 = zl[2 * E2]), D2 += I2 >>> 16, I2 = U2[E2 % 16], K2 += (B2 = P2[E2 % 16]) >>> 16, C2 += 65535 & I2, D2 += I2 >>> 16, C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16, S2 = 65535 & (B2 = k2 = 65535 & S2 | K2 << 16), K2 = B2 >>> 16, C2 = 65535 & (I2 = b2 = 65535 & C2 | (D2 += C2 >>> 16) << 16), D2 = I2 >>> 16, S2 += 65535 & (B2 = (O2 >>> 28 | x2 << 4) ^ (x2 >>> 2 | O2 << 30) ^ (x2 >>> 7 | O2 << 25)), K2 += B2 >>> 16, C2 += 65535 & (I2 = (x2 >>> 28 | O2 << 4) ^ (O2 >>> 2 | x2 << 30) ^ (O2 >>> 7 | x2 << 25)), D2 += I2 >>> 16, K2 += (B2 = O2 & H2 ^ O2 & z2 ^ H2 & z2) >>> 16, C2 += 65535 & (I2 = x2 & Q2 ^ x2 & M2 ^ Q2 & M2), D2 += I2 >>> 16, f2 = 65535 & (C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16) | (D2 += C2 >>> 16) << 16, m2 = 65535 & S2 | K2 << 16, S2 = 65535 & (B2 = p2), K2 = B2 >>> 16, C2 = 65535 & (I2 = o2), D2 = I2 >>> 16, K2 += (B2 = k2) >>> 16, C2 += 65535 & (I2 = b2), D2 += I2 >>> 16, Q2 = i2, M2 = s2, R2 = a2, F2 = o2 = 65535 & (C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16) | (D2 += C2 >>> 16) << 16, T2 = c2, N2 = u2, L2 = h2, x2 = f2, H2 = l2, z2 = y2, G2 = g2, j2 = p2 = 65535 & S2 | K2 << 16, V2 = d2, q2 = A2, _2 = w2, O2 = m2, E2 % 16 == 15) for (v2 = 0; v2 < 16; v2++) I2 = U2[v2], S2 = 65535 & (B2 = P2[v2]), K2 = B2 >>> 16, C2 = 65535 & I2, D2 = I2 >>> 16, I2 = U2[(v2 + 9) % 16], S2 += 65535 & (B2 = P2[(v2 + 9) % 16]), K2 += B2 >>> 16, C2 += 65535 & I2, D2 += I2 >>> 16, b2 = U2[(v2 + 1) % 16], S2 += 65535 & (B2 = ((k2 = P2[(v2 + 1) % 16]) >>> 1 | b2 << 31) ^ (k2 >>> 8 | b2 << 24) ^ (k2 >>> 7 | b2 << 25)), K2 += B2 >>> 16, C2 += 65535 & (I2 = (b2 >>> 1 | k2 << 31) ^ (b2 >>> 8 | k2 << 24) ^ b2 >>> 7), D2 += I2 >>> 16, b2 = U2[(v2 + 14) % 16], K2 += (B2 = ((k2 = P2[(v2 + 14) % 16]) >>> 19 | b2 << 13) ^ (b2 >>> 29 | k2 << 3) ^ (k2 >>> 6 | b2 << 26)) >>> 16, C2 += 65535 & (I2 = (b2 >>> 19 | k2 << 13) ^ (k2 >>> 29 | b2 << 3) ^ b2 >>> 6), D2 += I2 >>> 16, D2 += (C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16) >>> 16, U2[v2] = 65535 & C2 | D2 << 16, P2[v2] = 65535 & S2 | K2 << 16;
      S2 = 65535 & (B2 = O2), K2 = B2 >>> 16, C2 = 65535 & (I2 = x2), D2 = I2 >>> 16, I2 = e2[0], K2 += (B2 = t2[0]) >>> 16, C2 += 65535 & I2, D2 += I2 >>> 16, D2 += (C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16) >>> 16, e2[0] = x2 = 65535 & C2 | D2 << 16, t2[0] = O2 = 65535 & S2 | K2 << 16, S2 = 65535 & (B2 = H2), K2 = B2 >>> 16, C2 = 65535 & (I2 = Q2), D2 = I2 >>> 16, I2 = e2[1], K2 += (B2 = t2[1]) >>> 16, C2 += 65535 & I2, D2 += I2 >>> 16, D2 += (C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16) >>> 16, e2[1] = Q2 = 65535 & C2 | D2 << 16, t2[1] = H2 = 65535 & S2 | K2 << 16, S2 = 65535 & (B2 = z2), K2 = B2 >>> 16, C2 = 65535 & (I2 = M2), D2 = I2 >>> 16, I2 = e2[2], K2 += (B2 = t2[2]) >>> 16, C2 += 65535 & I2, D2 += I2 >>> 16, D2 += (C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16) >>> 16, e2[2] = M2 = 65535 & C2 | D2 << 16, t2[2] = z2 = 65535 & S2 | K2 << 16, S2 = 65535 & (B2 = G2), K2 = B2 >>> 16, C2 = 65535 & (I2 = R2), D2 = I2 >>> 16, I2 = e2[3], K2 += (B2 = t2[3]) >>> 16, C2 += 65535 & I2, D2 += I2 >>> 16, D2 += (C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16) >>> 16, e2[3] = R2 = 65535 & C2 | D2 << 16, t2[3] = G2 = 65535 & S2 | K2 << 16, S2 = 65535 & (B2 = j2), K2 = B2 >>> 16, C2 = 65535 & (I2 = F2), D2 = I2 >>> 16, I2 = e2[4], K2 += (B2 = t2[4]) >>> 16, C2 += 65535 & I2, D2 += I2 >>> 16, D2 += (C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16) >>> 16, e2[4] = F2 = 65535 & C2 | D2 << 16, t2[4] = j2 = 65535 & S2 | K2 << 16, S2 = 65535 & (B2 = V2), K2 = B2 >>> 16, C2 = 65535 & (I2 = T2), D2 = I2 >>> 16, I2 = e2[5], K2 += (B2 = t2[5]) >>> 16, C2 += 65535 & I2, D2 += I2 >>> 16, D2 += (C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16) >>> 16, e2[5] = T2 = 65535 & C2 | D2 << 16, t2[5] = V2 = 65535 & S2 | K2 << 16, S2 = 65535 & (B2 = q2), K2 = B2 >>> 16, C2 = 65535 & (I2 = N2), D2 = I2 >>> 16, I2 = e2[6], K2 += (B2 = t2[6]) >>> 16, C2 += 65535 & I2, D2 += I2 >>> 16, D2 += (C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16) >>> 16, e2[6] = N2 = 65535 & C2 | D2 << 16, t2[6] = q2 = 65535 & S2 | K2 << 16, S2 = 65535 & (B2 = _2), K2 = B2 >>> 16, C2 = 65535 & (I2 = L2), D2 = I2 >>> 16, I2 = e2[7], K2 += (B2 = t2[7]) >>> 16, C2 += 65535 & I2, D2 += I2 >>> 16, D2 += (C2 += (K2 += (S2 += 65535 & B2) >>> 16) >>> 16) >>> 16, e2[7] = L2 = 65535 & C2 | D2 << 16, t2[7] = _2 = 65535 & S2 | K2 << 16, Y2 += 128, n2 -= 128;
    }
    return n2;
  }
  function jl(e2, t2, r2) {
    var n2, i2 = new Int32Array(8), s2 = new Int32Array(8), a2 = new Uint8Array(256), o2 = r2;
    for (i2[0] = 1779033703, i2[1] = 3144134277, i2[2] = 1013904242, i2[3] = 2773480762, i2[4] = 1359893119, i2[5] = 2600822924, i2[6] = 528734635, i2[7] = 1541459225, s2[0] = 4089235720, s2[1] = 2227873595, s2[2] = 4271175723, s2[3] = 1595750129, s2[4] = 2917565137, s2[5] = 725511199, s2[6] = 4215389547, s2[7] = 327033209, Gl(i2, s2, t2, r2), r2 %= 128, n2 = 0; n2 < r2; n2++) a2[n2] = t2[o2 - r2 + n2];
    for (a2[r2] = 128, a2[(r2 = 256 - 128 * (r2 < 112 ? 1 : 0)) - 9] = 0, Sl(a2, r2 - 8, o2 / 536870912 | 0, o2 << 3), Gl(i2, s2, a2, r2), n2 = 0; n2 < 8; n2++) Sl(e2, 8 * n2, i2[n2], s2[n2]);
    return 0;
  }
  function Vl(e2, t2) {
    var r2 = pl(), n2 = pl(), i2 = pl(), s2 = pl(), a2 = pl(), o2 = pl(), c2 = pl(), u2 = pl(), h2 = pl();
    Fl(r2, e2[1], e2[0]), Fl(h2, t2[1], t2[0]), Tl(r2, r2, h2), Rl(n2, e2[0], e2[1]), Rl(h2, t2[0], t2[1]), Tl(n2, n2, h2), Tl(i2, e2[3], t2[3]), Tl(i2, i2, El), Tl(s2, e2[2], t2[2]), Rl(s2, s2, s2), Fl(a2, n2, r2), Fl(o2, s2, i2), Rl(c2, s2, i2), Rl(u2, n2, r2), Tl(e2[0], a2, o2), Tl(e2[1], u2, c2), Tl(e2[2], c2, o2), Tl(e2[3], a2, u2);
  }
  function ql(e2, t2, r2) {
    var n2;
    for (n2 = 0; n2 < 4; n2++) Ul(e2[n2], t2[n2], r2);
  }
  function _l(e2, t2) {
    var r2 = pl(), n2 = pl(), i2 = pl();
    Ll(i2, t2[2]), Tl(r2, t2[0], i2), Tl(n2, t2[1], i2), Pl(e2, n2), e2[31] ^= Ql(r2) << 7;
  }
  function Yl(e2, t2, r2) {
    var n2, i2;
    for (Cl(e2[0], wl), Cl(e2[1], ml), Cl(e2[2], ml), Cl(e2[3], wl), i2 = 255; i2 >= 0; --i2) ql(e2, t2, n2 = r2[i2 / 8 | 0] >> (7 & i2) & 1), Vl(t2, e2), Vl(e2, e2), ql(e2, t2, n2);
  }
  function Zl(e2, t2) {
    var r2 = [pl(), pl(), pl(), pl()];
    Cl(r2[0], vl), Cl(r2[1], Il), Cl(r2[2], ml), Tl(r2[3], vl, Il), Yl(e2, r2, t2);
  }
  function Jl(e2, t2, r2) {
    var n2, i2 = new Uint8Array(64), s2 = [pl(), pl(), pl(), pl()];
    for (r2 || dl(t2, 32), jl(i2, t2, 32), i2[0] &= 248, i2[31] &= 127, i2[31] |= 64, Zl(s2, i2), _l(e2, s2), n2 = 0; n2 < 32; n2++) t2[n2 + 32] = e2[n2];
    return 0;
  }
  var Wl = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
  function Xl(e2, t2) {
    var r2, n2, i2, s2;
    for (n2 = 63; n2 >= 32; --n2) {
      for (r2 = 0, i2 = n2 - 32, s2 = n2 - 12; i2 < s2; ++i2) t2[i2] += r2 - 16 * t2[n2] * Wl[i2 - (n2 - 32)], r2 = Math.floor((t2[i2] + 128) / 256), t2[i2] -= 256 * r2;
      t2[i2] += r2, t2[n2] = 0;
    }
    for (r2 = 0, i2 = 0; i2 < 32; i2++) t2[i2] += r2 - (t2[31] >> 4) * Wl[i2], r2 = t2[i2] >> 8, t2[i2] &= 255;
    for (i2 = 0; i2 < 32; i2++) t2[i2] -= r2 * Wl[i2];
    for (n2 = 0; n2 < 32; n2++) t2[n2 + 1] += t2[n2] >> 8, e2[n2] = 255 & t2[n2];
  }
  function $l(e2) {
    var t2, r2 = new Float64Array(64);
    for (t2 = 0; t2 < 64; t2++) r2[t2] = e2[t2];
    for (t2 = 0; t2 < 64; t2++) e2[t2] = 0;
    Xl(e2, r2);
  }
  function ey(e2, t2) {
    var r2 = pl(), n2 = pl(), i2 = pl(), s2 = pl(), a2 = pl(), o2 = pl(), c2 = pl();
    return Cl(e2[2], ml), Ml(e2[1], t2), Nl(i2, e2[1]), Tl(s2, i2, kl), Fl(i2, i2, e2[2]), Rl(s2, e2[2], s2), Nl(a2, s2), Nl(o2, a2), Tl(c2, o2, a2), Tl(r2, c2, i2), Tl(r2, r2, s2), (function(e3, t3) {
      var r3, n3 = pl();
      for (r3 = 0; r3 < 16; r3++) n3[r3] = t3[r3];
      for (r3 = 250; r3 >= 0; r3--) Nl(n3, n3), 1 !== r3 && Tl(n3, n3, t3);
      for (r3 = 0; r3 < 16; r3++) e3[r3] = n3[r3];
    })(r2, r2), Tl(r2, r2, i2), Tl(r2, r2, s2), Tl(r2, r2, s2), Tl(e2[0], r2, s2), Nl(n2, e2[0]), Tl(n2, n2, s2), xl(n2, i2) && Tl(e2[0], e2[0], Bl), Nl(n2, e2[0]), Tl(n2, n2, s2), xl(n2, i2) ? -1 : (Ql(e2[0]) === t2[31] >> 7 && Fl(e2[0], wl, e2[0]), Tl(e2[3], e2[0], e2[1]), 0);
  }
  var ty = 64;
  function ry() {
    for (var e2 = 0; e2 < arguments.length; e2++) if (!(arguments[e2] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array");
  }
  gl.scalarMult = function(e2, t2) {
    if (ry(e2, t2), 32 !== e2.length) throw Error("bad n size");
    if (32 !== t2.length) throw Error("bad p size");
    var r2 = new Uint8Array(32);
    return Ol(r2, e2, t2), r2;
  }, gl.box = {}, gl.box.keyPair = function() {
    var e2 = new Uint8Array(32), t2 = new Uint8Array(32);
    return (function(e3, t3) {
      dl(t3, 32), Hl(e3, t3);
    })(e2, t2), { publicKey: e2, secretKey: t2 };
  }, gl.box.keyPair.fromSecretKey = function(e2) {
    if (ry(e2), 32 !== e2.length) throw Error("bad secret key size");
    var t2 = new Uint8Array(32);
    return Hl(t2, e2), { publicKey: t2, secretKey: new Uint8Array(e2) };
  }, gl.sign = function(e2, t2) {
    if (ry(e2, t2), 64 !== t2.length) throw Error("bad secret key size");
    var r2 = new Uint8Array(ty + e2.length);
    return (function(e3, t3, r3, n2) {
      var i2, s2, a2 = new Uint8Array(64), o2 = new Uint8Array(64), c2 = new Uint8Array(64), u2 = new Float64Array(64), h2 = [pl(), pl(), pl(), pl()];
      jl(a2, n2, 32), a2[0] &= 248, a2[31] &= 127, a2[31] |= 64;
      var f2 = r3 + 64;
      for (i2 = 0; i2 < r3; i2++) e3[64 + i2] = t3[i2];
      for (i2 = 0; i2 < 32; i2++) e3[32 + i2] = a2[32 + i2];
      for (jl(c2, e3.subarray(32), r3 + 32), $l(c2), Zl(h2, c2), _l(e3, h2), i2 = 32; i2 < 64; i2++) e3[i2] = n2[i2];
      for (jl(o2, e3, r3 + 64), $l(o2), i2 = 0; i2 < 64; i2++) u2[i2] = 0;
      for (i2 = 0; i2 < 32; i2++) u2[i2] = c2[i2];
      for (i2 = 0; i2 < 32; i2++) for (s2 = 0; s2 < 32; s2++) u2[i2 + s2] += o2[i2] * a2[s2];
      Xl(e3.subarray(32), u2);
    })(r2, e2, e2.length, t2), r2;
  }, gl.sign.detached = function(e2, t2) {
    for (var r2 = gl.sign(e2, t2), n2 = new Uint8Array(ty), i2 = 0; i2 < n2.length; i2++) n2[i2] = r2[i2];
    return n2;
  }, gl.sign.detached.verify = function(e2, t2, r2) {
    if (ry(e2, t2, r2), t2.length !== ty) throw Error("bad signature size");
    if (32 !== r2.length) throw Error("bad public key size");
    var n2, i2 = new Uint8Array(ty + e2.length), s2 = new Uint8Array(ty + e2.length);
    for (n2 = 0; n2 < ty; n2++) i2[n2] = t2[n2];
    for (n2 = 0; n2 < e2.length; n2++) i2[n2 + ty] = e2[n2];
    return (function(e3, t3, r3, n3) {
      var i3, s3 = new Uint8Array(32), a2 = new Uint8Array(64), o2 = [pl(), pl(), pl(), pl()], c2 = [pl(), pl(), pl(), pl()];
      if (r3 < 64) return -1;
      if (ey(c2, n3)) return -1;
      for (i3 = 0; i3 < r3; i3++) e3[i3] = t3[i3];
      for (i3 = 0; i3 < 32; i3++) e3[i3 + 32] = n3[i3];
      if (jl(a2, e3, r3), $l(a2), Yl(o2, c2, a2), Zl(c2, t3.subarray(32)), Vl(o2, c2), _l(s3, o2), r3 -= 64, Kl(t3, 0, s3, 0)) {
        for (i3 = 0; i3 < r3; i3++) e3[i3] = 0;
        return -1;
      }
      for (i3 = 0; i3 < r3; i3++) e3[i3] = t3[i3 + 64];
      return r3;
    })(s2, i2, i2.length, r2) >= 0;
  }, gl.sign.keyPair = function() {
    var e2 = new Uint8Array(32), t2 = new Uint8Array(64);
    return Jl(e2, t2), { publicKey: e2, secretKey: t2 };
  }, gl.sign.keyPair.fromSecretKey = function(e2) {
    if (ry(e2), 64 !== e2.length) throw Error("bad secret key size");
    for (var t2 = new Uint8Array(32), r2 = 0; r2 < t2.length; r2++) t2[r2] = e2[32 + r2];
    return { publicKey: t2, secretKey: new Uint8Array(e2) };
  }, gl.sign.keyPair.fromSeed = function(e2) {
    if (ry(e2), 32 !== e2.length) throw Error("bad seed size");
    for (var t2 = new Uint8Array(32), r2 = new Uint8Array(64), n2 = 0; n2 < 32; n2++) r2[n2] = e2[n2];
    return Jl(t2, r2, true), { publicKey: t2, secretKey: r2 };
  }, gl.setPRNG = function(e2) {
    dl = e2;
  }, (function() {
    if (yl && yl.getRandomValues) {
      gl.setPRNG((function(e2, t2) {
        var r2, n2 = new Uint8Array(t2);
        for (r2 = 0; r2 < t2; r2 += 65536) yl.getRandomValues(n2.subarray(r2, r2 + Math.min(t2 - r2, 65536)));
        for (r2 = 0; r2 < t2; r2++) e2[r2] = n2[r2];
        !(function(e3) {
          for (var t3 = 0; t3 < e3.length; t3++) e3[t3] = 0;
        })(n2);
      }));
    }
  })();
  var ny = /* @__PURE__ */ Object.freeze({ __proto__: null, default: gl });
  function iy(e2, t2, r2, n2, i2, s2) {
    const a2 = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756], o2 = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344], c2 = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584], u2 = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928], h2 = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080], f2 = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312], l2 = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154], y2 = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696];
    let g2, p2, d2, A2, w2, m2, b2, k2, E2, v2, I2 = 0, B2 = t2.length;
    const S2 = 32 === e2.length ? 3 : 9;
    k2 = 3 === S2 ? r2 ? [0, 32, 2] : [30, -2, -2] : r2 ? [0, 32, 2, 62, 30, -2, 64, 96, 2] : [94, 62, -2, 32, 64, 2, 30, -2, -2], r2 && (t2 = (function(e3) {
      const t3 = 8 - e3.length % 8;
      let r3;
      if (!(t3 < 8)) {
        if (8 === t3) return e3;
        throw Error("des: invalid padding");
      }
      r3 = 0;
      const n3 = new Uint8Array(e3.length + t3);
      for (let t4 = 0; t4 < e3.length; t4++) n3[t4] = e3[t4];
      for (let i3 = 0; i3 < t3; i3++) n3[e3.length + i3] = r3;
      return n3;
    })(t2), B2 = t2.length);
    let K2 = new Uint8Array(B2), C2 = 0;
    for (; I2 < B2; ) {
      for (m2 = t2[I2++] << 24 | t2[I2++] << 16 | t2[I2++] << 8 | t2[I2++], b2 = t2[I2++] << 24 | t2[I2++] << 16 | t2[I2++] << 8 | t2[I2++], d2 = 252645135 & (m2 >>> 4 ^ b2), b2 ^= d2, m2 ^= d2 << 4, d2 = 65535 & (m2 >>> 16 ^ b2), b2 ^= d2, m2 ^= d2 << 16, d2 = 858993459 & (b2 >>> 2 ^ m2), m2 ^= d2, b2 ^= d2 << 2, d2 = 16711935 & (b2 >>> 8 ^ m2), m2 ^= d2, b2 ^= d2 << 8, d2 = 1431655765 & (m2 >>> 1 ^ b2), b2 ^= d2, m2 ^= d2 << 1, m2 = m2 << 1 | m2 >>> 31, b2 = b2 << 1 | b2 >>> 31, p2 = 0; p2 < S2; p2 += 3) {
        for (E2 = k2[p2 + 1], v2 = k2[p2 + 2], g2 = k2[p2]; g2 !== E2; g2 += v2) A2 = b2 ^ e2[g2], w2 = (b2 >>> 4 | b2 << 28) ^ e2[g2 + 1], d2 = m2, m2 = b2, b2 = d2 ^ (o2[A2 >>> 24 & 63] | u2[A2 >>> 16 & 63] | f2[A2 >>> 8 & 63] | y2[63 & A2] | a2[w2 >>> 24 & 63] | c2[w2 >>> 16 & 63] | h2[w2 >>> 8 & 63] | l2[63 & w2]);
        d2 = m2, m2 = b2, b2 = d2;
      }
      m2 = m2 >>> 1 | m2 << 31, b2 = b2 >>> 1 | b2 << 31, d2 = 1431655765 & (m2 >>> 1 ^ b2), b2 ^= d2, m2 ^= d2 << 1, d2 = 16711935 & (b2 >>> 8 ^ m2), m2 ^= d2, b2 ^= d2 << 8, d2 = 858993459 & (b2 >>> 2 ^ m2), m2 ^= d2, b2 ^= d2 << 2, d2 = 65535 & (m2 >>> 16 ^ b2), b2 ^= d2, m2 ^= d2 << 16, d2 = 252645135 & (m2 >>> 4 ^ b2), b2 ^= d2, m2 ^= d2 << 4, K2[C2++] = m2 >>> 24, K2[C2++] = m2 >>> 16 & 255, K2[C2++] = m2 >>> 8 & 255, K2[C2++] = 255 & m2, K2[C2++] = b2 >>> 24, K2[C2++] = b2 >>> 16 & 255, K2[C2++] = b2 >>> 8 & 255, K2[C2++] = 255 & b2;
    }
    return r2 || (K2 = (function(e3) {
      let t3, r3 = null;
      if (t3 = 0, !r3) {
        for (r3 = 1; e3[e3.length - r3] === t3; ) r3++;
        r3--;
      }
      return e3.subarray(0, e3.length - r3);
    })(K2)), K2;
  }
  function sy(e2) {
    const t2 = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964], r2 = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697], n2 = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272], i2 = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144], s2 = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256], a2 = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488], o2 = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746], c2 = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568], u2 = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578], h2 = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488], f2 = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800], l2 = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744], y2 = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128], g2 = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261], p2 = e2.length > 8 ? 3 : 1, d2 = Array(32 * p2), A2 = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0];
    let w2, m2, b2, k2 = 0, E2 = 0;
    for (let v2 = 0; v2 < p2; v2++) {
      let p3 = e2[k2++] << 24 | e2[k2++] << 16 | e2[k2++] << 8 | e2[k2++], v3 = e2[k2++] << 24 | e2[k2++] << 16 | e2[k2++] << 8 | e2[k2++];
      b2 = 252645135 & (p3 >>> 4 ^ v3), v3 ^= b2, p3 ^= b2 << 4, b2 = 65535 & (v3 >>> -16 ^ p3), p3 ^= b2, v3 ^= b2 << -16, b2 = 858993459 & (p3 >>> 2 ^ v3), v3 ^= b2, p3 ^= b2 << 2, b2 = 65535 & (v3 >>> -16 ^ p3), p3 ^= b2, v3 ^= b2 << -16, b2 = 1431655765 & (p3 >>> 1 ^ v3), v3 ^= b2, p3 ^= b2 << 1, b2 = 16711935 & (v3 >>> 8 ^ p3), p3 ^= b2, v3 ^= b2 << 8, b2 = 1431655765 & (p3 >>> 1 ^ v3), v3 ^= b2, p3 ^= b2 << 1, b2 = p3 << 8 | v3 >>> 20 & 240, p3 = v3 << 24 | v3 << 8 & 16711680 | v3 >>> 8 & 65280 | v3 >>> 24 & 240, v3 = b2;
      for (let e3 = 0; e3 < 16; e3++) A2[e3] ? (p3 = p3 << 2 | p3 >>> 26, v3 = v3 << 2 | v3 >>> 26) : (p3 = p3 << 1 | p3 >>> 27, v3 = v3 << 1 | v3 >>> 27), p3 &= -15, v3 &= -15, w2 = t2[p3 >>> 28] | r2[p3 >>> 24 & 15] | n2[p3 >>> 20 & 15] | i2[p3 >>> 16 & 15] | s2[p3 >>> 12 & 15] | a2[p3 >>> 8 & 15] | o2[p3 >>> 4 & 15], m2 = c2[v3 >>> 28] | u2[v3 >>> 24 & 15] | h2[v3 >>> 20 & 15] | f2[v3 >>> 16 & 15] | l2[v3 >>> 12 & 15] | y2[v3 >>> 8 & 15] | g2[v3 >>> 4 & 15], b2 = 65535 & (m2 >>> 16 ^ w2), d2[E2++] = w2 ^ b2, d2[E2++] = m2 ^ b2 << 16;
    }
    return d2;
  }
  function ay(e2) {
    this.key = [];
    for (let t2 = 0; t2 < 3; t2++) this.key.push(new Uint8Array(e2.subarray(8 * t2, 8 * t2 + 8)));
    this.encrypt = function(e3) {
      return iy(sy(this.key[2]), iy(sy(this.key[1]), iy(sy(this.key[0]), e3, true), false), true);
    };
  }
  function oy() {
    this.BlockSize = 8, this.KeySize = 16, this.setKey = function(e3) {
      if (this.masking = Array(16), this.rotate = Array(16), this.reset(), e3.length !== this.KeySize) throw Error("CAST-128: keys must be 16 bytes");
      return this.keySchedule(e3), true;
    }, this.reset = function() {
      for (let e3 = 0; e3 < 16; e3++) this.masking[e3] = 0, this.rotate[e3] = 0;
    }, this.getBlockSize = function() {
      return this.BlockSize;
    }, this.encrypt = function(e3) {
      const t3 = Array(e3.length);
      for (let s3 = 0; s3 < e3.length; s3 += 8) {
        let a2, o2 = e3[s3] << 24 | e3[s3 + 1] << 16 | e3[s3 + 2] << 8 | e3[s3 + 3], c2 = e3[s3 + 4] << 24 | e3[s3 + 5] << 16 | e3[s3 + 6] << 8 | e3[s3 + 7];
        a2 = c2, c2 = o2 ^ r2(c2, this.masking[0], this.rotate[0]), o2 = a2, a2 = c2, c2 = o2 ^ n2(c2, this.masking[1], this.rotate[1]), o2 = a2, a2 = c2, c2 = o2 ^ i2(c2, this.masking[2], this.rotate[2]), o2 = a2, a2 = c2, c2 = o2 ^ r2(c2, this.masking[3], this.rotate[3]), o2 = a2, a2 = c2, c2 = o2 ^ n2(c2, this.masking[4], this.rotate[4]), o2 = a2, a2 = c2, c2 = o2 ^ i2(c2, this.masking[5], this.rotate[5]), o2 = a2, a2 = c2, c2 = o2 ^ r2(c2, this.masking[6], this.rotate[6]), o2 = a2, a2 = c2, c2 = o2 ^ n2(c2, this.masking[7], this.rotate[7]), o2 = a2, a2 = c2, c2 = o2 ^ i2(c2, this.masking[8], this.rotate[8]), o2 = a2, a2 = c2, c2 = o2 ^ r2(c2, this.masking[9], this.rotate[9]), o2 = a2, a2 = c2, c2 = o2 ^ n2(c2, this.masking[10], this.rotate[10]), o2 = a2, a2 = c2, c2 = o2 ^ i2(c2, this.masking[11], this.rotate[11]), o2 = a2, a2 = c2, c2 = o2 ^ r2(c2, this.masking[12], this.rotate[12]), o2 = a2, a2 = c2, c2 = o2 ^ n2(c2, this.masking[13], this.rotate[13]), o2 = a2, a2 = c2, c2 = o2 ^ i2(c2, this.masking[14], this.rotate[14]), o2 = a2, a2 = c2, c2 = o2 ^ r2(c2, this.masking[15], this.rotate[15]), o2 = a2, t3[s3] = c2 >>> 24 & 255, t3[s3 + 1] = c2 >>> 16 & 255, t3[s3 + 2] = c2 >>> 8 & 255, t3[s3 + 3] = 255 & c2, t3[s3 + 4] = o2 >>> 24 & 255, t3[s3 + 5] = o2 >>> 16 & 255, t3[s3 + 6] = o2 >>> 8 & 255, t3[s3 + 7] = 255 & o2;
      }
      return t3;
    }, this.decrypt = function(e3) {
      const t3 = Array(e3.length);
      for (let s3 = 0; s3 < e3.length; s3 += 8) {
        let a2, o2 = e3[s3] << 24 | e3[s3 + 1] << 16 | e3[s3 + 2] << 8 | e3[s3 + 3], c2 = e3[s3 + 4] << 24 | e3[s3 + 5] << 16 | e3[s3 + 6] << 8 | e3[s3 + 7];
        a2 = c2, c2 = o2 ^ r2(c2, this.masking[15], this.rotate[15]), o2 = a2, a2 = c2, c2 = o2 ^ i2(c2, this.masking[14], this.rotate[14]), o2 = a2, a2 = c2, c2 = o2 ^ n2(c2, this.masking[13], this.rotate[13]), o2 = a2, a2 = c2, c2 = o2 ^ r2(c2, this.masking[12], this.rotate[12]), o2 = a2, a2 = c2, c2 = o2 ^ i2(c2, this.masking[11], this.rotate[11]), o2 = a2, a2 = c2, c2 = o2 ^ n2(c2, this.masking[10], this.rotate[10]), o2 = a2, a2 = c2, c2 = o2 ^ r2(c2, this.masking[9], this.rotate[9]), o2 = a2, a2 = c2, c2 = o2 ^ i2(c2, this.masking[8], this.rotate[8]), o2 = a2, a2 = c2, c2 = o2 ^ n2(c2, this.masking[7], this.rotate[7]), o2 = a2, a2 = c2, c2 = o2 ^ r2(c2, this.masking[6], this.rotate[6]), o2 = a2, a2 = c2, c2 = o2 ^ i2(c2, this.masking[5], this.rotate[5]), o2 = a2, a2 = c2, c2 = o2 ^ n2(c2, this.masking[4], this.rotate[4]), o2 = a2, a2 = c2, c2 = o2 ^ r2(c2, this.masking[3], this.rotate[3]), o2 = a2, a2 = c2, c2 = o2 ^ i2(c2, this.masking[2], this.rotate[2]), o2 = a2, a2 = c2, c2 = o2 ^ n2(c2, this.masking[1], this.rotate[1]), o2 = a2, a2 = c2, c2 = o2 ^ r2(c2, this.masking[0], this.rotate[0]), o2 = a2, t3[s3] = c2 >>> 24 & 255, t3[s3 + 1] = c2 >>> 16 & 255, t3[s3 + 2] = c2 >>> 8 & 255, t3[s3 + 3] = 255 & c2, t3[s3 + 4] = o2 >>> 24 & 255, t3[s3 + 5] = o2 >> 16 & 255, t3[s3 + 6] = o2 >> 8 & 255, t3[s3 + 7] = 255 & o2;
      }
      return t3;
    };
    const e2 = [, , , ,];
    e2[0] = [, , , ,], e2[0][0] = [4, 0, 13, 15, 12, 14, 8], e2[0][1] = [5, 2, 16, 18, 17, 19, 10], e2[0][2] = [6, 3, 23, 22, 21, 20, 9], e2[0][3] = [7, 1, 26, 25, 27, 24, 11], e2[1] = [, , , ,], e2[1][0] = [0, 6, 21, 23, 20, 22, 16], e2[1][1] = [1, 4, 0, 2, 1, 3, 18], e2[1][2] = [2, 5, 7, 6, 5, 4, 17], e2[1][3] = [3, 7, 10, 9, 11, 8, 19], e2[2] = [, , , ,], e2[2][0] = [4, 0, 13, 15, 12, 14, 8], e2[2][1] = [5, 2, 16, 18, 17, 19, 10], e2[2][2] = [6, 3, 23, 22, 21, 20, 9], e2[2][3] = [7, 1, 26, 25, 27, 24, 11], e2[3] = [, , , ,], e2[3][0] = [0, 6, 21, 23, 20, 22, 16], e2[3][1] = [1, 4, 0, 2, 1, 3, 18], e2[3][2] = [2, 5, 7, 6, 5, 4, 17], e2[3][3] = [3, 7, 10, 9, 11, 8, 19];
    const t2 = [, , , ,];
    function r2(e3, t3, r3) {
      const n3 = t3 + e3, i3 = n3 << r3 | n3 >>> 32 - r3;
      return (s2[0][i3 >>> 24] ^ s2[1][i3 >>> 16 & 255]) - s2[2][i3 >>> 8 & 255] + s2[3][255 & i3];
    }
    function n2(e3, t3, r3) {
      const n3 = t3 ^ e3, i3 = n3 << r3 | n3 >>> 32 - r3;
      return s2[0][i3 >>> 24] - s2[1][i3 >>> 16 & 255] + s2[2][i3 >>> 8 & 255] ^ s2[3][255 & i3];
    }
    function i2(e3, t3, r3) {
      const n3 = t3 - e3, i3 = n3 << r3 | n3 >>> 32 - r3;
      return (s2[0][i3 >>> 24] + s2[1][i3 >>> 16 & 255] ^ s2[2][i3 >>> 8 & 255]) - s2[3][255 & i3];
    }
    t2[0] = [, , , ,], t2[0][0] = [24, 25, 23, 22, 18], t2[0][1] = [26, 27, 21, 20, 22], t2[0][2] = [28, 29, 19, 18, 25], t2[0][3] = [30, 31, 17, 16, 28], t2[1] = [, , , ,], t2[1][0] = [3, 2, 12, 13, 8], t2[1][1] = [1, 0, 14, 15, 13], t2[1][2] = [7, 6, 8, 9, 3], t2[1][3] = [5, 4, 10, 11, 7], t2[2] = [, , , ,], t2[2][0] = [19, 18, 28, 29, 25], t2[2][1] = [17, 16, 30, 31, 28], t2[2][2] = [23, 22, 24, 25, 18], t2[2][3] = [21, 20, 26, 27, 22], t2[3] = [, , , ,], t2[3][0] = [8, 9, 7, 6, 3], t2[3][1] = [10, 11, 5, 4, 7], t2[3][2] = [12, 13, 3, 2, 8], t2[3][3] = [14, 15, 1, 0, 13], this.keySchedule = function(r3) {
      const n3 = [, , , , , , , ,], i3 = Array(32);
      let a2;
      for (let e3 = 0; e3 < 4; e3++) a2 = 4 * e3, n3[e3] = r3[a2] << 24 | r3[a2 + 1] << 16 | r3[a2 + 2] << 8 | r3[a2 + 3];
      const o2 = [6, 7, 4, 5];
      let c2, u2 = 0;
      for (let r4 = 0; r4 < 2; r4++) for (let r5 = 0; r5 < 4; r5++) {
        for (a2 = 0; a2 < 4; a2++) {
          const t3 = e2[r5][a2];
          c2 = n3[t3[1]], c2 ^= s2[4][n3[t3[2] >>> 2] >>> 24 - 8 * (3 & t3[2]) & 255], c2 ^= s2[5][n3[t3[3] >>> 2] >>> 24 - 8 * (3 & t3[3]) & 255], c2 ^= s2[6][n3[t3[4] >>> 2] >>> 24 - 8 * (3 & t3[4]) & 255], c2 ^= s2[7][n3[t3[5] >>> 2] >>> 24 - 8 * (3 & t3[5]) & 255], c2 ^= s2[o2[a2]][n3[t3[6] >>> 2] >>> 24 - 8 * (3 & t3[6]) & 255], n3[t3[0]] = c2;
        }
        for (a2 = 0; a2 < 4; a2++) {
          const e3 = t2[r5][a2];
          c2 = s2[4][n3[e3[0] >>> 2] >>> 24 - 8 * (3 & e3[0]) & 255], c2 ^= s2[5][n3[e3[1] >>> 2] >>> 24 - 8 * (3 & e3[1]) & 255], c2 ^= s2[6][n3[e3[2] >>> 2] >>> 24 - 8 * (3 & e3[2]) & 255], c2 ^= s2[7][n3[e3[3] >>> 2] >>> 24 - 8 * (3 & e3[3]) & 255], c2 ^= s2[4 + a2][n3[e3[4] >>> 2] >>> 24 - 8 * (3 & e3[4]) & 255], i3[u2] = c2, u2++;
        }
      }
      for (let e3 = 0; e3 < 16; e3++) this.masking[e3] = i3[e3], this.rotate[e3] = 31 & i3[16 + e3];
    };
    const s2 = [, , , , , , , ,];
    s2[0] = [821772500, 2678128395, 1810681135, 1059425402, 505495343, 2617265619, 1610868032, 3483355465, 3218386727, 2294005173, 3791863952, 2563806837, 1852023008, 365126098, 3269944861, 584384398, 677919599, 3229601881, 4280515016, 2002735330, 1136869587, 3744433750, 2289869850, 2731719981, 2714362070, 879511577, 1639411079, 575934255, 717107937, 2857637483, 576097850, 2731753936, 1725645e3, 2810460463, 5111599, 767152862, 2543075244, 1251459544, 1383482551, 3052681127, 3089939183, 3612463449, 1878520045, 1510570527, 2189125840, 2431448366, 582008916, 3163445557, 1265446783, 1354458274, 3529918736, 3202711853, 3073581712, 3912963487, 3029263377, 1275016285, 4249207360, 2905708351, 3304509486, 1442611557, 3585198765, 2712415662, 2731849581, 3248163920, 2283946226, 208555832, 2766454743, 1331405426, 1447828783, 3315356441, 3108627284, 2957404670, 2981538698, 3339933917, 1669711173, 286233437, 1465092821, 1782121619, 3862771680, 710211251, 980974943, 1651941557, 430374111, 2051154026, 704238805, 4128970897, 3144820574, 2857402727, 948965521, 3333752299, 2227686284, 718756367, 2269778983, 2731643755, 718440111, 2857816721, 3616097120, 1113355533, 2478022182, 410092745, 1811985197, 1944238868, 2696854588, 1415722873, 1682284203, 1060277122, 1998114690, 1503841958, 82706478, 2315155686, 1068173648, 845149890, 2167947013, 1768146376, 1993038550, 3566826697, 3390574031, 940016341, 3355073782, 2328040721, 904371731, 1205506512, 4094660742, 2816623006, 825647681, 85914773, 2857843460, 1249926541, 1417871568, 3287612, 3211054559, 3126306446, 1975924523, 1353700161, 2814456437, 2438597621, 1800716203, 722146342, 2873936343, 1151126914, 4160483941, 2877670899, 458611604, 2866078500, 3483680063, 770352098, 2652916994, 3367839148, 3940505011, 3585973912, 3809620402, 718646636, 2504206814, 2914927912, 3631288169, 2857486607, 2860018678, 575749918, 2857478043, 718488780, 2069512688, 3548183469, 453416197, 1106044049, 3032691430, 52586708, 3378514636, 3459808877, 3211506028, 1785789304, 218356169, 3571399134, 3759170522, 1194783844, 1523787992, 3007827094, 1975193539, 2555452411, 1341901877, 3045838698, 3776907964, 3217423946, 2802510864, 2889438986, 1057244207, 1636348243, 3761863214, 1462225785, 2632663439, 481089165, 718503062, 24497053, 3332243209, 3344655856, 3655024856, 3960371065, 1195698900, 2971415156, 3710176158, 2115785917, 4027663609, 3525578417, 2524296189, 2745972565, 3564906415, 1372086093, 1452307862, 2780501478, 1476592880, 3389271281, 18495466, 2378148571, 901398090, 891748256, 3279637769, 3157290713, 2560960102, 1447622437, 4284372637, 216884176, 2086908623, 1879786977, 3588903153, 2242455666, 2938092967, 3559082096, 2810645491, 758861177, 1121993112, 215018983, 642190776, 4169236812, 1196255959, 2081185372, 3508738393, 941322904, 4124243163, 2877523539, 1848581667, 2205260958, 3180453958, 2589345134, 3694731276, 550028657, 2519456284, 3789985535, 2973870856, 2093648313, 443148163, 46942275, 2734146937, 1117713533, 1115362972, 1523183689, 3717140224, 1551984063], s2[1] = [522195092, 4010518363, 1776537470, 960447360, 4267822970, 4005896314, 1435016340, 1929119313, 2913464185, 1310552629, 3579470798, 3724818106, 2579771631, 1594623892, 417127293, 2715217907, 2696228731, 1508390405, 3994398868, 3925858569, 3695444102, 4019471449, 3129199795, 3770928635, 3520741761, 990456497, 4187484609, 2783367035, 21106139, 3840405339, 631373633, 3783325702, 532942976, 396095098, 3548038825, 4267192484, 2564721535, 2011709262, 2039648873, 620404603, 3776170075, 2898526339, 3612357925, 4159332703, 1645490516, 223693667, 1567101217, 3362177881, 1029951347, 3470931136, 3570957959, 1550265121, 119497089, 972513919, 907948164, 3840628539, 1613718692, 3594177948, 465323573, 2659255085, 654439692, 2575596212, 2699288441, 3127702412, 277098644, 624404830, 4100943870, 2717858591, 546110314, 2403699828, 3655377447, 1321679412, 4236791657, 1045293279, 4010672264, 895050893, 2319792268, 494945126, 1914543101, 2777056443, 3894764339, 2219737618, 311263384, 4275257268, 3458730721, 669096869, 3584475730, 3835122877, 3319158237, 3949359204, 2005142349, 2713102337, 2228954793, 3769984788, 569394103, 3855636576, 1425027204, 108000370, 2736431443, 3671869269, 3043122623, 1750473702, 2211081108, 762237499, 3972989403, 2798899386, 3061857628, 2943854345, 867476300, 964413654, 1591880597, 1594774276, 2179821409, 552026980, 3026064248, 3726140315, 2283577634, 3110545105, 2152310760, 582474363, 1582640421, 1383256631, 2043843868, 3322775884, 1217180674, 463797851, 2763038571, 480777679, 2718707717, 2289164131, 3118346187, 214354409, 200212307, 3810608407, 3025414197, 2674075964, 3997296425, 1847405948, 1342460550, 510035443, 4080271814, 815934613, 833030224, 1620250387, 1945732119, 2703661145, 3966000196, 1388869545, 3456054182, 2687178561, 2092620194, 562037615, 1356438536, 3409922145, 3261847397, 1688467115, 2150901366, 631725691, 3840332284, 549916902, 3455104640, 394546491, 837744717, 2114462948, 751520235, 2221554606, 2415360136, 3999097078, 2063029875, 803036379, 2702586305, 821456707, 3019566164, 360699898, 4018502092, 3511869016, 3677355358, 2402471449, 812317050, 49299192, 2570164949, 3259169295, 2816732080, 3331213574, 3101303564, 2156015656, 3705598920, 3546263921, 143268808, 3200304480, 1638124008, 3165189453, 3341807610, 578956953, 2193977524, 3638120073, 2333881532, 807278310, 658237817, 2969561766, 1641658566, 11683945, 3086995007, 148645947, 1138423386, 4158756760, 1981396783, 2401016740, 3699783584, 380097457, 2680394679, 2803068651, 3334260286, 441530178, 4016580796, 1375954390, 761952171, 891809099, 2183123478, 157052462, 3683840763, 1592404427, 341349109, 2438483839, 1417898363, 644327628, 2233032776, 2353769706, 2201510100, 220455161, 1815641738, 182899273, 2995019788, 3627381533, 3702638151, 2890684138, 1052606899, 588164016, 1681439879, 4038439418, 2405343923, 4229449282, 167996282, 1336969661, 1688053129, 2739224926, 1543734051, 1046297529, 1138201970, 2121126012, 115334942, 1819067631, 1902159161, 1941945968, 2206692869, 1159982321], s2[2] = [2381300288, 637164959, 3952098751, 3893414151, 1197506559, 916448331, 2350892612, 2932787856, 3199334847, 4009478890, 3905886544, 1373570990, 2450425862, 4037870920, 3778841987, 2456817877, 286293407, 124026297, 3001279700, 1028597854, 3115296800, 4208886496, 2691114635, 2188540206, 1430237888, 1218109995, 3572471700, 308166588, 570424558, 2187009021, 2455094765, 307733056, 1310360322, 3135275007, 1384269543, 2388071438, 863238079, 2359263624, 2801553128, 3380786597, 2831162807, 1470087780, 1728663345, 4072488799, 1090516929, 532123132, 2389430977, 1132193179, 2578464191, 3051079243, 1670234342, 1434557849, 2711078940, 1241591150, 3314043432, 3435360113, 3091448339, 1812415473, 2198440252, 267246943, 796911696, 3619716990, 38830015, 1526438404, 2806502096, 374413614, 2943401790, 1489179520, 1603809326, 1920779204, 168801282, 260042626, 2358705581, 1563175598, 2397674057, 1356499128, 2217211040, 514611088, 2037363785, 2186468373, 4022173083, 2792511869, 2913485016, 1173701892, 4200428547, 3896427269, 1334932762, 2455136706, 602925377, 2835607854, 1613172210, 41346230, 2499634548, 2457437618, 2188827595, 41386358, 4172255629, 1313404830, 2405527007, 3801973774, 2217704835, 873260488, 2528884354, 2478092616, 4012915883, 2555359016, 2006953883, 2463913485, 575479328, 2218240648, 2099895446, 660001756, 2341502190, 3038761536, 3888151779, 3848713377, 3286851934, 1022894237, 1620365795, 3449594689, 1551255054, 15374395, 3570825345, 4249311020, 4151111129, 3181912732, 310226346, 1133119310, 530038928, 136043402, 2476768958, 3107506709, 2544909567, 1036173560, 2367337196, 1681395281, 1758231547, 3641649032, 306774401, 1575354324, 3716085866, 1990386196, 3114533736, 2455606671, 1262092282, 3124342505, 2768229131, 4210529083, 1833535011, 423410938, 660763973, 2187129978, 1639812e3, 3508421329, 3467445492, 310289298, 272797111, 2188552562, 2456863912, 310240523, 677093832, 1013118031, 901835429, 3892695601, 1116285435, 3036471170, 1337354835, 243122523, 520626091, 277223598, 4244441197, 4194248841, 1766575121, 594173102, 316590669, 742362309, 3536858622, 4176435350, 3838792410, 2501204839, 1229605004, 3115755532, 1552908988, 2312334149, 979407927, 3959474601, 1148277331, 176638793, 3614686272, 2083809052, 40992502, 1340822838, 2731552767, 3535757508, 3560899520, 1354035053, 122129617, 7215240, 2732932949, 3118912700, 2718203926, 2539075635, 3609230695, 3725561661, 1928887091, 2882293555, 1988674909, 2063640240, 2491088897, 1459647954, 4189817080, 2302804382, 1113892351, 2237858528, 1927010603, 4002880361, 1856122846, 1594404395, 2944033133, 3855189863, 3474975698, 1643104450, 4054590833, 3431086530, 1730235576, 2984608721, 3084664418, 2131803598, 4178205752, 267404349, 1617849798, 1616132681, 1462223176, 736725533, 2327058232, 551665188, 2945899023, 1749386277, 2575514597, 1611482493, 674206544, 2201269090, 3642560800, 728599968, 1680547377, 2620414464, 1388111496, 453204106, 4156223445, 1094905244, 2754698257, 2201108165, 3757000246, 2704524545, 3922940700, 3996465027], s2[3] = [2645754912, 532081118, 2814278639, 3530793624, 1246723035, 1689095255, 2236679235, 4194438865, 2116582143, 3859789411, 157234593, 2045505824, 4245003587, 1687664561, 4083425123, 605965023, 672431967, 1336064205, 3376611392, 214114848, 4258466608, 3232053071, 489488601, 605322005, 3998028058, 264917351, 1912574028, 756637694, 436560991, 202637054, 135989450, 85393697, 2152923392, 3896401662, 2895836408, 2145855233, 3535335007, 115294817, 3147733898, 1922296357, 3464822751, 4117858305, 1037454084, 2725193275, 2127856640, 1417604070, 1148013728, 1827919605, 642362335, 2929772533, 909348033, 1346338451, 3547799649, 297154785, 1917849091, 4161712827, 2883604526, 3968694238, 1469521537, 3780077382, 3375584256, 1763717519, 136166297, 4290970789, 1295325189, 2134727907, 2798151366, 1566297257, 3672928234, 2677174161, 2672173615, 965822077, 2780786062, 289653839, 1133871874, 3491843819, 35685304, 1068898316, 418943774, 672553190, 642281022, 2346158704, 1954014401, 3037126780, 4079815205, 2030668546, 3840588673, 672283427, 1776201016, 359975446, 3750173538, 555499703, 2769985273, 1324923, 69110472, 152125443, 3176785106, 3822147285, 1340634837, 798073664, 1434183902, 15393959, 216384236, 1303690150, 3881221631, 3711134124, 3960975413, 106373927, 2578434224, 1455997841, 1801814300, 1578393881, 1854262133, 3188178946, 3258078583, 2302670060, 1539295533, 3505142565, 3078625975, 2372746020, 549938159, 3278284284, 2620926080, 181285381, 2865321098, 3970029511, 68876850, 488006234, 1728155692, 2608167508, 836007927, 2435231793, 919367643, 3339422534, 3655756360, 1457871481, 40520939, 1380155135, 797931188, 234455205, 2255801827, 3990488299, 397000196, 739833055, 3077865373, 2871719860, 4022553888, 772369276, 390177364, 3853951029, 557662966, 740064294, 1640166671, 1699928825, 3535942136, 622006121, 3625353122, 68743880, 1742502, 219489963, 1664179233, 1577743084, 1236991741, 410585305, 2366487942, 823226535, 1050371084, 3426619607, 3586839478, 212779912, 4147118561, 1819446015, 1911218849, 530248558, 3486241071, 3252585495, 2886188651, 3410272728, 2342195030, 20547779, 2982490058, 3032363469, 3631753222, 312714466, 1870521650, 1493008054, 3491686656, 615382978, 4103671749, 2534517445, 1932181, 2196105170, 278426614, 6369430, 3274544417, 2913018367, 697336853, 2143000447, 2946413531, 701099306, 1558357093, 2805003052, 3500818408, 2321334417, 3567135975, 216290473, 3591032198, 23009561, 1996984579, 3735042806, 2024298078, 3739440863, 569400510, 2339758983, 3016033873, 3097871343, 3639523026, 3844324983, 3256173865, 795471839, 2951117563, 4101031090, 4091603803, 3603732598, 971261452, 534414648, 428311343, 3389027175, 2844869880, 694888862, 1227866773, 2456207019, 3043454569, 2614353370, 3749578031, 3676663836, 459166190, 4132644070, 1794958188, 51825668, 2252611902, 3084671440, 2036672799, 3436641603, 1099053433, 2469121526, 3059204941, 1323291266, 2061838604, 1018778475, 2233344254, 2553501054, 334295216, 3556750194, 1065731521, 183467730], s2[4] = [2127105028, 745436345, 2601412319, 2788391185, 3093987327, 500390133, 1155374404, 389092991, 150729210, 3891597772, 3523549952, 1935325696, 716645080, 946045387, 2901812282, 1774124410, 3869435775, 4039581901, 3293136918, 3438657920, 948246080, 363898952, 3867875531, 1286266623, 1598556673, 68334250, 630723836, 1104211938, 1312863373, 613332731, 2377784574, 1101634306, 441780740, 3129959883, 1917973735, 2510624549, 3238456535, 2544211978, 3308894634, 1299840618, 4076074851, 1756332096, 3977027158, 297047435, 3790297736, 2265573040, 3621810518, 1311375015, 1667687725, 47300608, 3299642885, 2474112369, 201668394, 1468347890, 576830978, 3594690761, 3742605952, 1958042578, 1747032512, 3558991340, 1408974056, 3366841779, 682131401, 1033214337, 1545599232, 4265137049, 206503691, 103024618, 2855227313, 1337551222, 2428998917, 2963842932, 4015366655, 3852247746, 2796956967, 3865723491, 3747938335, 247794022, 3755824572, 702416469, 2434691994, 397379957, 851939612, 2314769512, 218229120, 1380406772, 62274761, 214451378, 3170103466, 2276210409, 3845813286, 28563499, 446592073, 1693330814, 3453727194, 29968656, 3093872512, 220656637, 2470637031, 77972100, 1667708854, 1358280214, 4064765667, 2395616961, 325977563, 4277240721, 4220025399, 3605526484, 3355147721, 811859167, 3069544926, 3962126810, 652502677, 3075892249, 4132761541, 3498924215, 1217549313, 3250244479, 3858715919, 3053989961, 1538642152, 2279026266, 2875879137, 574252750, 3324769229, 2651358713, 1758150215, 141295887, 2719868960, 3515574750, 4093007735, 4194485238, 1082055363, 3417560400, 395511885, 2966884026, 179534037, 3646028556, 3738688086, 1092926436, 2496269142, 257381841, 3772900718, 1636087230, 1477059743, 2499234752, 3811018894, 2675660129, 3285975680, 90732309, 1684827095, 1150307763, 1723134115, 3237045386, 1769919919, 1240018934, 815675215, 750138730, 2239792499, 1234303040, 1995484674, 138143821, 675421338, 1145607174, 1936608440, 3238603024, 2345230278, 2105974004, 323969391, 779555213, 3004902369, 2861610098, 1017501463, 2098600890, 2628620304, 2940611490, 2682542546, 1171473753, 3656571411, 3687208071, 4091869518, 393037935, 159126506, 1662887367, 1147106178, 391545844, 3452332695, 1891500680, 3016609650, 1851642611, 546529401, 1167818917, 3194020571, 2848076033, 3953471836, 575554290, 475796850, 4134673196, 450035699, 2351251534, 844027695, 1080539133, 86184846, 1554234488, 3692025454, 1972511363, 2018339607, 1491841390, 1141460869, 1061690759, 4244549243, 2008416118, 2351104703, 2868147542, 1598468138, 722020353, 1027143159, 212344630, 1387219594, 1725294528, 3745187956, 2500153616, 458938280, 4129215917, 1828119673, 544571780, 3503225445, 2297937496, 1241802790, 267843827, 2694610800, 1397140384, 1558801448, 3782667683, 1806446719, 929573330, 2234912681, 400817706, 616011623, 4121520928, 3603768725, 1761550015, 1968522284, 4053731006, 4192232858, 4005120285, 872482584, 3140537016, 3894607381, 2287405443, 1963876937, 3663887957, 1584857e3, 2975024454, 1833426440, 4025083860], s2[5] = [4143615901, 749497569, 1285769319, 3795025788, 2514159847, 23610292, 3974978748, 844452780, 3214870880, 3751928557, 2213566365, 1676510905, 448177848, 3730751033, 4086298418, 2307502392, 871450977, 3222878141, 4110862042, 3831651966, 2735270553, 1310974780, 2043402188, 1218528103, 2736035353, 4274605013, 2702448458, 3936360550, 2693061421, 162023535, 2827510090, 687910808, 23484817, 3784910947, 3371371616, 779677500, 3503626546, 3473927188, 4157212626, 3500679282, 4248902014, 2466621104, 3899384794, 1958663117, 925738300, 1283408968, 3669349440, 1840910019, 137959847, 2679828185, 1239142320, 1315376211, 1547541505, 1690155329, 739140458, 3128809933, 3933172616, 3876308834, 905091803, 1548541325, 4040461708, 3095483362, 144808038, 451078856, 676114313, 2861728291, 2469707347, 993665471, 373509091, 2599041286, 4025009006, 4170239449, 2149739950, 3275793571, 3749616649, 2794760199, 1534877388, 572371878, 2590613551, 1753320020, 3467782511, 1405125690, 4270405205, 633333386, 3026356924, 3475123903, 632057672, 2846462855, 1404951397, 3882875879, 3915906424, 195638627, 2385783745, 3902872553, 1233155085, 3355999740, 2380578713, 2702246304, 2144565621, 3663341248, 3894384975, 2502479241, 4248018925, 3094885567, 1594115437, 572884632, 3385116731, 767645374, 1331858858, 1475698373, 3793881790, 3532746431, 1321687957, 619889600, 1121017241, 3440213920, 2070816767, 2833025776, 1933951238, 4095615791, 890643334, 3874130214, 859025556, 360630002, 925594799, 1764062180, 3920222280, 4078305929, 979562269, 2810700344, 4087740022, 1949714515, 546639971, 1165388173, 3069891591, 1495988560, 922170659, 1291546247, 2107952832, 1813327274, 3406010024, 3306028637, 4241950635, 153207855, 2313154747, 1608695416, 1150242611, 1967526857, 721801357, 1220138373, 3691287617, 3356069787, 2112743302, 3281662835, 1111556101, 1778980689, 250857638, 2298507990, 673216130, 2846488510, 3207751581, 3562756981, 3008625920, 3417367384, 2198807050, 529510932, 3547516680, 3426503187, 2364944742, 102533054, 2294910856, 1617093527, 1204784762, 3066581635, 1019391227, 1069574518, 1317995090, 1691889997, 3661132003, 510022745, 3238594800, 1362108837, 1817929911, 2184153760, 805817662, 1953603311, 3699844737, 120799444, 2118332377, 207536705, 2282301548, 4120041617, 145305846, 2508124933, 3086745533, 3261524335, 1877257368, 2977164480, 3160454186, 2503252186, 4221677074, 759945014, 254147243, 2767453419, 3801518371, 629083197, 2471014217, 907280572, 3900796746, 940896768, 2751021123, 2625262786, 3161476951, 3661752313, 3260732218, 1425318020, 2977912069, 1496677566, 3988592072, 2140652971, 3126511541, 3069632175, 977771578, 1392695845, 1698528874, 1411812681, 1369733098, 1343739227, 3620887944, 1142123638, 67414216, 3102056737, 3088749194, 1626167401, 2546293654, 3941374235, 697522451, 33404913, 143560186, 2595682037, 994885535, 1247667115, 3859094837, 2699155541, 3547024625, 4114935275, 2968073508, 3199963069, 2732024527, 1237921620, 951448369, 1898488916, 1211705605, 2790989240, 2233243581, 3598044975], s2[6] = [2246066201, 858518887, 1714274303, 3485882003, 713916271, 2879113490, 3730835617, 539548191, 36158695, 1298409750, 419087104, 1358007170, 749914897, 2989680476, 1261868530, 2995193822, 2690628854, 3443622377, 3780124940, 3796824509, 2976433025, 4259637129, 1551479e3, 512490819, 1296650241, 951993153, 2436689437, 2460458047, 144139966, 3136204276, 310820559, 3068840729, 643875328, 1969602020, 1680088954, 2185813161, 3283332454, 672358534, 198762408, 896343282, 276269502, 3014846926, 84060815, 197145886, 376173866, 3943890818, 3813173521, 3545068822, 1316698879, 1598252827, 2633424951, 1233235075, 859989710, 2358460855, 3503838400, 3409603720, 1203513385, 1193654839, 2792018475, 2060853022, 207403770, 1144516871, 3068631394, 1121114134, 177607304, 3785736302, 326409831, 1929119770, 2983279095, 4183308101, 3474579288, 3200513878, 3228482096, 119610148, 1170376745, 3378393471, 3163473169, 951863017, 3337026068, 3135789130, 2907618374, 1183797387, 2015970143, 4045674555, 2182986399, 2952138740, 3928772205, 384012900, 2454997643, 10178499, 2879818989, 2596892536, 111523738, 2995089006, 451689641, 3196290696, 235406569, 1441906262, 3890558523, 3013735005, 4158569349, 1644036924, 376726067, 1006849064, 3664579700, 2041234796, 1021632941, 1374734338, 2566452058, 371631263, 4007144233, 490221539, 206551450, 3140638584, 1053219195, 1853335209, 3412429660, 3562156231, 735133835, 1623211703, 3104214392, 2738312436, 4096837757, 3366392578, 3110964274, 3956598718, 3196820781, 2038037254, 3877786376, 2339753847, 300912036, 3766732888, 2372630639, 1516443558, 4200396704, 1574567987, 4069441456, 4122592016, 2699739776, 146372218, 2748961456, 2043888151, 35287437, 2596680554, 655490400, 1132482787, 110692520, 1031794116, 2188192751, 1324057718, 1217253157, 919197030, 686247489, 3261139658, 1028237775, 3135486431, 3059715558, 2460921700, 986174950, 2661811465, 4062904701, 2752986992, 3709736643, 367056889, 1353824391, 731860949, 1650113154, 1778481506, 784341916, 357075625, 3608602432, 1074092588, 2480052770, 3811426202, 92751289, 877911070, 3600361838, 1231880047, 480201094, 3756190983, 3094495953, 434011822, 87971354, 363687820, 1717726236, 1901380172, 3926403882, 2481662265, 400339184, 1490350766, 2661455099, 1389319756, 2558787174, 784598401, 1983468483, 30828846, 3550527752, 2716276238, 3841122214, 1765724805, 1955612312, 1277890269, 1333098070, 1564029816, 2704417615, 1026694237, 3287671188, 1260819201, 3349086767, 1016692350, 1582273796, 1073413053, 1995943182, 694588404, 1025494639, 3323872702, 3551898420, 4146854327, 453260480, 1316140391, 1435673405, 3038941953, 3486689407, 1622062951, 403978347, 817677117, 950059133, 4246079218, 3278066075, 1486738320, 1417279718, 481875527, 2549965225, 3933690356, 760697757, 1452955855, 3897451437, 1177426808, 1702951038, 4085348628, 2447005172, 1084371187, 3516436277, 3068336338, 1073369276, 1027665953, 3284188590, 1230553676, 1368340146, 2226246512, 267243139, 2274220762, 4070734279, 2497715176, 2423353163, 2504755875], s2[7] = [3793104909, 3151888380, 2817252029, 895778965, 2005530807, 3871412763, 237245952, 86829237, 296341424, 3851759377, 3974600970, 2475086196, 709006108, 1994621201, 2972577594, 937287164, 3734691505, 168608556, 3189338153, 2225080640, 3139713551, 3033610191, 3025041904, 77524477, 185966941, 1208824168, 2344345178, 1721625922, 3354191921, 1066374631, 1927223579, 1971335949, 2483503697, 1551748602, 2881383779, 2856329572, 3003241482, 48746954, 1398218158, 2050065058, 313056748, 4255789917, 393167848, 1912293076, 940740642, 3465845460, 3091687853, 2522601570, 2197016661, 1727764327, 364383054, 492521376, 1291706479, 3264136376, 1474851438, 1685747964, 2575719748, 1619776915, 1814040067, 970743798, 1561002147, 2925768690, 2123093554, 1880132620, 3151188041, 697884420, 2550985770, 2607674513, 2659114323, 110200136, 1489731079, 997519150, 1378877361, 3527870668, 478029773, 2766872923, 1022481122, 431258168, 1112503832, 897933369, 2635587303, 669726182, 3383752315, 918222264, 163866573, 3246985393, 3776823163, 114105080, 1903216136, 761148244, 3571337562, 1690750982, 3166750252, 1037045171, 1888456500, 2010454850, 642736655, 616092351, 365016990, 1185228132, 4174898510, 1043824992, 2023083429, 2241598885, 3863320456, 3279669087, 3674716684, 108438443, 2132974366, 830746235, 606445527, 4173263986, 2204105912, 1844756978, 2532684181, 4245352700, 2969441100, 3796921661, 1335562986, 4061524517, 2720232303, 2679424040, 634407289, 885462008, 3294724487, 3933892248, 2094100220, 339117932, 4048830727, 3202280980, 1458155303, 2689246273, 1022871705, 2464987878, 3714515309, 353796843, 2822958815, 4256850100, 4052777845, 551748367, 618185374, 3778635579, 4020649912, 1904685140, 3069366075, 2670879810, 3407193292, 2954511620, 4058283405, 2219449317, 3135758300, 1120655984, 3447565834, 1474845562, 3577699062, 550456716, 3466908712, 2043752612, 881257467, 869518812, 2005220179, 938474677, 3305539448, 3850417126, 1315485940, 3318264702, 226533026, 965733244, 321539988, 1136104718, 804158748, 573969341, 3708209826, 937399083, 3290727049, 2901666755, 1461057207, 4013193437, 4066861423, 3242773476, 2421326174, 1581322155, 3028952165, 786071460, 3900391652, 3918438532, 1485433313, 4023619836, 3708277595, 3678951060, 953673138, 1467089153, 1930354364, 1533292819, 2492563023, 1346121658, 1685000834, 1965281866, 3765933717, 4190206607, 2052792609, 3515332758, 690371149, 3125873887, 2180283551, 2903598061, 3933952357, 436236910, 289419410, 14314871, 1242357089, 2904507907, 1616633776, 2666382180, 585885352, 3471299210, 2699507360, 1432659641, 277164553, 3354103607, 770115018, 2303809295, 3741942315, 3177781868, 2853364978, 2269453327, 3774259834, 987383833, 1290892879, 225909803, 1741533526, 890078084, 1496906255, 1111072499, 916028167, 243534141, 1252605537, 2204162171, 531204876, 290011180, 3916834213, 102027703, 237315147, 209093447, 1486785922, 220223953, 2758195998, 4175039106, 82940208, 3127791296, 2569425252, 518464269, 1353887104, 3941492737, 2377294467, 3935040926];
  }
  function cy(e2) {
    this.cast5 = new oy(), this.cast5.setKey(e2), this.encrypt = function(e3) {
      return this.cast5.encrypt(e3);
    };
  }
  ay.keySize = ay.prototype.keySize = 24, ay.blockSize = ay.prototype.blockSize = 8, cy.blockSize = cy.prototype.blockSize = 8, cy.keySize = cy.prototype.keySize = 16;
  var uy = 4294967295;
  function hy(e2, t2) {
    return (e2 << t2 | e2 >>> 32 - t2) & uy;
  }
  function fy(e2, t2) {
    return e2[t2] | e2[t2 + 1] << 8 | e2[t2 + 2] << 16 | e2[t2 + 3] << 24;
  }
  function ly(e2, t2, r2) {
    e2.splice(t2, 4, 255 & r2, r2 >>> 8 & 255, r2 >>> 16 & 255, r2 >>> 24 & 255);
  }
  function yy(e2, t2) {
    return e2 >>> 8 * t2 & 255;
  }
  function gy(e2) {
    this.tf = /* @__PURE__ */ (function() {
      let e3 = null, t2 = null, r2 = -1, n2 = [], i2 = [[], [], [], []];
      function s2(e4) {
        return i2[0][yy(e4, 0)] ^ i2[1][yy(e4, 1)] ^ i2[2][yy(e4, 2)] ^ i2[3][yy(e4, 3)];
      }
      function a2(e4) {
        return i2[0][yy(e4, 3)] ^ i2[1][yy(e4, 0)] ^ i2[2][yy(e4, 1)] ^ i2[3][yy(e4, 2)];
      }
      function o2(e4, t3) {
        let r3 = s2(t3[0]), i3 = a2(t3[1]);
        t3[2] = hy(t3[2] ^ r3 + i3 + n2[4 * e4 + 8] & uy, 31), t3[3] = hy(t3[3], 1) ^ r3 + 2 * i3 + n2[4 * e4 + 9] & uy, r3 = s2(t3[2]), i3 = a2(t3[3]), t3[0] = hy(t3[0] ^ r3 + i3 + n2[4 * e4 + 10] & uy, 31), t3[1] = hy(t3[1], 1) ^ r3 + 2 * i3 + n2[4 * e4 + 11] & uy;
      }
      function c2(e4, t3) {
        let r3 = s2(t3[0]), i3 = a2(t3[1]);
        t3[2] = hy(t3[2], 1) ^ r3 + i3 + n2[4 * e4 + 10] & uy, t3[3] = hy(t3[3] ^ r3 + 2 * i3 + n2[4 * e4 + 11] & uy, 31), r3 = s2(t3[2]), i3 = a2(t3[3]), t3[0] = hy(t3[0], 1) ^ r3 + i3 + n2[4 * e4 + 8] & uy, t3[1] = hy(t3[1] ^ r3 + 2 * i3 + n2[4 * e4 + 9] & uy, 31);
      }
      return { name: "twofish", blocksize: 16, open: function(t3) {
        let r3, s3, a3, o3, c3;
        e3 = t3;
        const u2 = [], h2 = [], f2 = [];
        let l2;
        const y2 = [];
        let g2, p2, d2;
        const A2 = [[8, 1, 7, 13, 6, 15, 3, 2, 0, 11, 5, 9, 14, 12, 10, 4], [2, 8, 11, 13, 15, 7, 6, 14, 3, 1, 9, 4, 0, 10, 12, 5]], w2 = [[14, 12, 11, 8, 1, 2, 3, 5, 15, 4, 10, 6, 7, 0, 9, 13], [1, 14, 2, 11, 4, 12, 3, 7, 6, 13, 10, 5, 15, 9, 0, 8]], m2 = [[11, 10, 5, 14, 6, 13, 9, 0, 12, 8, 15, 3, 2, 4, 7, 1], [4, 12, 7, 5, 1, 6, 9, 10, 0, 14, 13, 8, 2, 11, 3, 15]], b2 = [[13, 7, 15, 4, 1, 2, 6, 14, 9, 11, 3, 0, 8, 5, 12, 10], [11, 9, 5, 1, 12, 3, 13, 14, 6, 4, 7, 15, 2, 0, 8, 10]], k2 = [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15], E2 = [0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 5, 14, 7], v2 = [[], []], I2 = [[], [], [], []];
        function B2(e4) {
          return e4 ^ e4 >> 2 ^ [0, 90, 180, 238][3 & e4];
        }
        function S2(e4) {
          return e4 ^ e4 >> 1 ^ e4 >> 2 ^ [0, 238, 180, 90][3 & e4];
        }
        function K2(e4, t4) {
          let r4, n3, i3;
          for (r4 = 0; r4 < 8; r4++) n3 = t4 >>> 24, t4 = t4 << 8 & uy | e4 >>> 24, e4 = e4 << 8 & uy, i3 = n3 << 1, 128 & n3 && (i3 ^= 333), t4 ^= n3 ^ i3 << 16, i3 ^= n3 >>> 1, 1 & n3 && (i3 ^= 166), t4 ^= i3 << 24 | i3 << 8;
          return t4;
        }
        function C2(e4, t4) {
          const r4 = t4 >> 4, n3 = 15 & t4, i3 = A2[e4][r4 ^ n3], s4 = w2[e4][k2[n3] ^ E2[r4]];
          return b2[e4][k2[s4] ^ E2[i3]] << 4 | m2[e4][i3 ^ s4];
        }
        function D2(e4, t4) {
          let r4 = yy(e4, 0), n3 = yy(e4, 1), i3 = yy(e4, 2), s4 = yy(e4, 3);
          switch (l2) {
            case 4:
              r4 = v2[1][r4] ^ yy(t4[3], 0), n3 = v2[0][n3] ^ yy(t4[3], 1), i3 = v2[0][i3] ^ yy(t4[3], 2), s4 = v2[1][s4] ^ yy(t4[3], 3);
            case 3:
              r4 = v2[1][r4] ^ yy(t4[2], 0), n3 = v2[1][n3] ^ yy(t4[2], 1), i3 = v2[0][i3] ^ yy(t4[2], 2), s4 = v2[0][s4] ^ yy(t4[2], 3);
            case 2:
              r4 = v2[0][v2[0][r4] ^ yy(t4[1], 0)] ^ yy(t4[0], 0), n3 = v2[0][v2[1][n3] ^ yy(t4[1], 1)] ^ yy(t4[0], 1), i3 = v2[1][v2[0][i3] ^ yy(t4[1], 2)] ^ yy(t4[0], 2), s4 = v2[1][v2[1][s4] ^ yy(t4[1], 3)] ^ yy(t4[0], 3);
          }
          return I2[0][r4] ^ I2[1][n3] ^ I2[2][i3] ^ I2[3][s4];
        }
        for (e3 = e3.slice(0, 32), r3 = e3.length; 16 !== r3 && 24 !== r3 && 32 !== r3; ) e3[r3++] = 0;
        for (r3 = 0; r3 < e3.length; r3 += 4) f2[r3 >> 2] = fy(e3, r3);
        for (r3 = 0; r3 < 256; r3++) v2[0][r3] = C2(0, r3), v2[1][r3] = C2(1, r3);
        for (r3 = 0; r3 < 256; r3++) g2 = v2[1][r3], p2 = B2(g2), d2 = S2(g2), I2[0][r3] = g2 + (p2 << 8) + (d2 << 16) + (d2 << 24), I2[2][r3] = p2 + (d2 << 8) + (g2 << 16) + (d2 << 24), g2 = v2[0][r3], p2 = B2(g2), d2 = S2(g2), I2[1][r3] = d2 + (d2 << 8) + (p2 << 16) + (g2 << 24), I2[3][r3] = p2 + (g2 << 8) + (d2 << 16) + (p2 << 24);
        for (l2 = f2.length / 2, r3 = 0; r3 < l2; r3++) s3 = f2[r3 + r3], u2[r3] = s3, a3 = f2[r3 + r3 + 1], h2[r3] = a3, y2[l2 - r3 - 1] = K2(s3, a3);
        for (r3 = 0; r3 < 40; r3 += 2) s3 = 16843009 * r3, a3 = s3 + 16843009, s3 = D2(s3, u2), a3 = hy(D2(a3, h2), 8), n2[r3] = s3 + a3 & uy, n2[r3 + 1] = hy(s3 + 2 * a3, 9);
        for (r3 = 0; r3 < 256; r3++) switch (s3 = a3 = o3 = c3 = r3, l2) {
          case 4:
            s3 = v2[1][s3] ^ yy(y2[3], 0), a3 = v2[0][a3] ^ yy(y2[3], 1), o3 = v2[0][o3] ^ yy(y2[3], 2), c3 = v2[1][c3] ^ yy(y2[3], 3);
          case 3:
            s3 = v2[1][s3] ^ yy(y2[2], 0), a3 = v2[1][a3] ^ yy(y2[2], 1), o3 = v2[0][o3] ^ yy(y2[2], 2), c3 = v2[0][c3] ^ yy(y2[2], 3);
          case 2:
            i2[0][r3] = I2[0][v2[0][v2[0][s3] ^ yy(y2[1], 0)] ^ yy(y2[0], 0)], i2[1][r3] = I2[1][v2[0][v2[1][a3] ^ yy(y2[1], 1)] ^ yy(y2[0], 1)], i2[2][r3] = I2[2][v2[1][v2[0][o3] ^ yy(y2[1], 2)] ^ yy(y2[0], 2)], i2[3][r3] = I2[3][v2[1][v2[1][c3] ^ yy(y2[1], 3)] ^ yy(y2[0], 3)];
        }
      }, close: function() {
        n2 = [], i2 = [[], [], [], []];
      }, encrypt: function(e4, i3) {
        t2 = e4, r2 = i3;
        const s3 = [fy(t2, r2) ^ n2[0], fy(t2, r2 + 4) ^ n2[1], fy(t2, r2 + 8) ^ n2[2], fy(t2, r2 + 12) ^ n2[3]];
        for (let e5 = 0; e5 < 8; e5++) o2(e5, s3);
        return ly(t2, r2, s3[2] ^ n2[4]), ly(t2, r2 + 4, s3[3] ^ n2[5]), ly(t2, r2 + 8, s3[0] ^ n2[6]), ly(t2, r2 + 12, s3[1] ^ n2[7]), r2 += 16, t2;
      }, decrypt: function(e4, i3) {
        t2 = e4, r2 = i3;
        const s3 = [fy(t2, r2) ^ n2[4], fy(t2, r2 + 4) ^ n2[5], fy(t2, r2 + 8) ^ n2[6], fy(t2, r2 + 12) ^ n2[7]];
        for (let e5 = 7; e5 >= 0; e5--) c2(e5, s3);
        ly(t2, r2, s3[2] ^ n2[0]), ly(t2, r2 + 4, s3[3] ^ n2[1]), ly(t2, r2 + 8, s3[0] ^ n2[2]), ly(t2, r2 + 12, s3[1] ^ n2[3]), r2 += 16;
      }, finalize: function() {
        return t2;
      } };
    })(), this.tf.open(Array.from(e2), 0), this.encrypt = function(e3) {
      return this.tf.encrypt(Array.from(e3), 0);
    };
  }
  function py() {
  }
  function dy(e2) {
    this.bf = new py(), this.bf.init(e2), this.encrypt = function(e3) {
      return this.bf.encryptBlock(e3);
    };
  }
  gy.keySize = gy.prototype.keySize = 32, gy.blockSize = gy.prototype.blockSize = 16, py.prototype.BLOCKSIZE = 8, py.prototype.SBOXES = [[3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946], [1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055], [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504], [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462]], py.prototype.PARRAY = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731], py.prototype.NN = 16, py.prototype._clean = function(e2) {
    if (e2 < 0) {
      e2 = (2147483647 & e2) + 2147483648;
    }
    return e2;
  }, py.prototype._F = function(e2) {
    let t2;
    const r2 = 255 & e2, n2 = 255 & (e2 >>>= 8), i2 = 255 & (e2 >>>= 8), s2 = 255 & (e2 >>>= 8);
    return t2 = this.sboxes[0][s2] + this.sboxes[1][i2], t2 ^= this.sboxes[2][n2], t2 += this.sboxes[3][r2], t2;
  }, py.prototype._encryptBlock = function(e2) {
    let t2, r2 = e2[0], n2 = e2[1];
    for (t2 = 0; t2 < this.NN; ++t2) {
      r2 ^= this.parray[t2], n2 = this._F(r2) ^ n2;
      const e3 = r2;
      r2 = n2, n2 = e3;
    }
    r2 ^= this.parray[this.NN + 0], n2 ^= this.parray[this.NN + 1], e2[0] = this._clean(n2), e2[1] = this._clean(r2);
  }, py.prototype.encryptBlock = function(e2) {
    let t2;
    const r2 = [0, 0], n2 = this.BLOCKSIZE / 2;
    for (t2 = 0; t2 < this.BLOCKSIZE / 2; ++t2) r2[0] = r2[0] << 8 | 255 & e2[t2 + 0], r2[1] = r2[1] << 8 | 255 & e2[t2 + n2];
    this._encryptBlock(r2);
    const i2 = [];
    for (t2 = 0; t2 < this.BLOCKSIZE / 2; ++t2) i2[t2 + 0] = r2[0] >>> 24 - 8 * t2 & 255, i2[t2 + n2] = r2[1] >>> 24 - 8 * t2 & 255;
    return i2;
  }, py.prototype._decryptBlock = function(e2) {
    let t2, r2 = e2[0], n2 = e2[1];
    for (t2 = this.NN + 1; t2 > 1; --t2) {
      r2 ^= this.parray[t2], n2 = this._F(r2) ^ n2;
      const e3 = r2;
      r2 = n2, n2 = e3;
    }
    r2 ^= this.parray[1], n2 ^= this.parray[0], e2[0] = this._clean(n2), e2[1] = this._clean(r2);
  }, py.prototype.init = function(e2) {
    let t2, r2 = 0;
    for (this.parray = [], t2 = 0; t2 < this.NN + 2; ++t2) {
      let n3 = 0;
      for (let t3 = 0; t3 < 4; ++t3) n3 = n3 << 8 | 255 & e2[r2], ++r2 >= e2.length && (r2 = 0);
      this.parray[t2] = this.PARRAY[t2] ^ n3;
    }
    for (this.sboxes = [], t2 = 0; t2 < 4; ++t2) for (this.sboxes[t2] = [], r2 = 0; r2 < 256; ++r2) this.sboxes[t2][r2] = this.SBOXES[t2][r2];
    const n2 = [0, 0];
    for (t2 = 0; t2 < this.NN + 2; t2 += 2) this._encryptBlock(n2), this.parray[t2 + 0] = n2[0], this.parray[t2 + 1] = n2[1];
    for (t2 = 0; t2 < 4; ++t2) for (r2 = 0; r2 < 256; r2 += 2) this._encryptBlock(n2), this.sboxes[t2][r2 + 0] = n2[0], this.sboxes[t2][r2 + 1] = n2[1];
  }, dy.keySize = dy.prototype.keySize = 16, dy.blockSize = dy.prototype.blockSize = 8;
  var Ay = new Map(Object.entries({ tripledes: ay, cast5: cy, twofish: gy, blowfish: dy }));
  var wy = /* @__PURE__ */ Object.freeze({ __proto__: null, legacyCiphers: Ay });
  function my(e2, t2, r2, n2) {
    e2[t2] += r2[n2], e2[t2 + 1] += r2[n2 + 1] + (e2[t2] < r2[n2]);
  }
  function by(e2, t2) {
    e2[0] += t2, e2[1] += e2[0] < t2;
  }
  function ky(e2, t2, r2, n2, i2, s2, a2, o2) {
    my(e2, r2, e2, n2), my(e2, r2, t2, a2);
    let c2 = e2[s2] ^ e2[r2], u2 = e2[s2 + 1] ^ e2[r2 + 1];
    e2[s2] = u2, e2[s2 + 1] = c2, my(e2, i2, e2, s2), c2 = e2[n2] ^ e2[i2], u2 = e2[n2 + 1] ^ e2[i2 + 1], e2[n2] = c2 >>> 24 ^ u2 << 8, e2[n2 + 1] = u2 >>> 24 ^ c2 << 8, my(e2, r2, e2, n2), my(e2, r2, t2, o2), c2 = e2[s2] ^ e2[r2], u2 = e2[s2 + 1] ^ e2[r2 + 1], e2[s2] = c2 >>> 16 ^ u2 << 16, e2[s2 + 1] = u2 >>> 16 ^ c2 << 16, my(e2, i2, e2, s2), c2 = e2[n2] ^ e2[i2], u2 = e2[n2 + 1] ^ e2[i2 + 1], e2[n2] = u2 >>> 31 ^ c2 << 1, e2[n2 + 1] = c2 >>> 31 ^ u2 << 1;
  }
  var Ey = new Uint32Array([4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225]);
  var vy = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3].map(((e2) => 2 * e2)));
  function Iy(e2, t2) {
    const r2 = new Uint32Array(32), n2 = new Uint32Array(e2.b.buffer, e2.b.byteOffset, 32);
    for (let t3 = 0; t3 < 16; t3++) r2[t3] = e2.h[t3], r2[t3 + 16] = Ey[t3];
    r2[24] ^= e2.t0[0], r2[25] ^= e2.t0[1];
    const i2 = t2 ? 4294967295 : 0;
    r2[28] ^= i2, r2[29] ^= i2;
    for (let e3 = 0; e3 < 12; e3++) {
      const t3 = e3 << 4;
      ky(r2, n2, 0, 8, 16, 24, vy[t3 + 0], vy[t3 + 1]), ky(r2, n2, 2, 10, 18, 26, vy[t3 + 2], vy[t3 + 3]), ky(r2, n2, 4, 12, 20, 28, vy[t3 + 4], vy[t3 + 5]), ky(r2, n2, 6, 14, 22, 30, vy[t3 + 6], vy[t3 + 7]), ky(r2, n2, 0, 10, 20, 30, vy[t3 + 8], vy[t3 + 9]), ky(r2, n2, 2, 12, 22, 24, vy[t3 + 10], vy[t3 + 11]), ky(r2, n2, 4, 14, 16, 26, vy[t3 + 12], vy[t3 + 13]), ky(r2, n2, 6, 8, 18, 28, vy[t3 + 14], vy[t3 + 15]);
    }
    for (let t3 = 0; t3 < 16; t3++) e2.h[t3] ^= r2[t3] ^ r2[t3 + 16];
  }
  var By = class {
    constructor(e2, t2, r2, n2) {
      const i2 = new Uint8Array(64);
      this.S = { b: new Uint8Array(Cy), h: new Uint32Array(Ky / 4), t0: new Uint32Array(2), c: 0, outlen: e2 }, i2[0] = e2, t2 && (i2[1] = t2.length), i2[2] = 1, i2[3] = 1, r2 && i2.set(r2, 32), n2 && i2.set(n2, 48);
      const s2 = new Uint32Array(i2.buffer, i2.byteOffset, i2.length / Uint32Array.BYTES_PER_ELEMENT);
      for (let e3 = 0; e3 < 16; e3++) this.S.h[e3] = Ey[e3] ^ s2[e3];
      if (t2) {
        const e3 = new Uint8Array(Cy);
        e3.set(t2), this.update(e3);
      }
    }
    update(e2) {
      if (!(e2 instanceof Uint8Array)) throw Error("Input must be Uint8Array or Buffer");
      let t2 = 0;
      for (; t2 < e2.length; ) {
        this.S.c === Cy && (by(this.S.t0, this.S.c), Iy(this.S, false), this.S.c = 0);
        let r2 = Cy - this.S.c;
        this.S.b.set(e2.subarray(t2, t2 + r2), this.S.c);
        const n2 = Math.min(r2, e2.length - t2);
        this.S.c += n2, t2 += n2;
      }
      return this;
    }
    digest(e2) {
      by(this.S.t0, this.S.c), this.S.b.fill(0, this.S.c), this.S.c = Cy, Iy(this.S, true);
      const t2 = e2 || new Uint8Array(this.S.outlen);
      for (let e3 = 0; e3 < this.S.outlen; e3++) t2[e3] = this.S.h[e3 >> 2] >> 8 * (3 & e3);
      return this.S.h = null, t2.buffer;
    }
  };
  function Sy(e2, t2, r2, n2) {
    if (e2 > Ky) throw Error(`outlen must be at most ${Ky} (given: ${e2})`);
    return new By(e2, t2, r2, n2);
  }
  var Ky = 64;
  var Cy = 128;
  var Dy = 1024;
  var Uy = 205 === new Uint8Array(new Uint16Array([43981]).buffer)[0];
  function Py(e2, t2, r2) {
    return e2[r2 + 0] = t2, e2[r2 + 1] = t2 >> 8, e2[r2 + 2] = t2 >> 16, e2[r2 + 3] = t2 >> 24, e2;
  }
  function xy(e2, t2, r2) {
    if (t2 > Number.MAX_SAFE_INTEGER) throw Error("LE64: large numbers unsupported");
    let n2 = t2;
    for (let t3 = r2; t3 < r2 + 7; t3++) e2[t3] = n2, n2 = (n2 - e2[t3]) / 256;
    return e2;
  }
  function Qy(e2, t2, r2) {
    const n2 = new Uint8Array(64), i2 = new Uint8Array(4 + t2.length);
    if (Py(i2, e2, 0), i2.set(t2, 4), e2 <= 64) return Sy(e2).update(i2).digest(r2), r2;
    const s2 = Math.ceil(e2 / 32) - 2;
    for (let e3 = 0; e3 < s2; e3++) Sy(64).update(0 === e3 ? i2 : n2).digest(n2), r2.set(n2.subarray(0, 32), 32 * e3);
    const a2 = new Uint8Array(Sy(e2 - 32 * s2).update(n2).digest());
    return r2.set(a2, 32 * s2), r2;
  }
  function My(e2, t2, r2, n2) {
    return e2.fn.XOR(t2.byteOffset, r2.byteOffset, n2.byteOffset), t2;
  }
  function Ry(e2, t2, r2, n2) {
    return e2.fn.G(t2.byteOffset, r2.byteOffset, n2.byteOffset, e2.refs.gZ.byteOffset), n2;
  }
  function Fy(e2, t2, r2, n2) {
    return e2.fn.G2(t2.byteOffset, r2.byteOffset, n2.byteOffset, e2.refs.gZ.byteOffset), n2;
  }
  function* Ty(e2, t2, r2, n2, i2, s2, a2, o2) {
    e2.refs.prngTmp.fill(0);
    const c2 = e2.refs.prngTmp.subarray(0, 48);
    xy(c2, t2, 0), xy(c2, r2, 8), xy(c2, n2, 16), xy(c2, i2, 24), xy(c2, s2, 32), xy(c2, 2, 40);
    for (let t3 = 1; t3 <= a2; t3++) {
      xy(e2.refs.prngTmp, t3, c2.length);
      const r3 = Fy(e2, e2.refs.ZERO1024, e2.refs.prngTmp, e2.refs.prngR);
      for (let e3 = 1 === t3 ? 8 * o2 : 0; e3 < r3.length; e3 += 8) yield r3.subarray(e3, e3 + 8);
    }
    return [];
  }
  function Ny(e2, { memory: t2, instance: r2 }) {
    if (!Uy) throw Error("BigEndian system not supported");
    const n2 = (function({ type: e3, version: t3, tagLength: r3, password: n3, salt: i3, ad: s3, secret: a3, parallelism: o3, memorySize: c3, passes: u3 }) {
      const h3 = (e4, t4, r4, n4) => {
        if (t4 < r4 || t4 > n4) throw Error(`${e4} size should be between ${r4} and ${n4} bytes`);
      };
      if (2 !== e3 || 19 !== t3) throw Error("Unsupported type or version");
      return h3("password", n3, 8, 4294967295), h3("salt", i3, 8, 4294967295), h3("tag", r3, 4, 4294967295), h3("memory", c3, 8 * o3, 4294967295), s3 && h3("associated data", s3, 0, 4294967295), a3 && h3("secret", a3, 0, 32), { type: e3, version: t3, tagLength: r3, password: n3, salt: i3, ad: s3, secret: a3, lanes: o3, memorySize: c3, passes: u3 };
    })({ type: 2, version: 19, ...e2 }), { G: i2, G2: s2, xor: a2, getLZ: o2 } = r2.exports, c2 = {}, u2 = {};
    u2.G = i2, u2.G2 = s2, u2.XOR = a2;
    const h2 = 4 * n2.lanes * Math.floor(n2.memorySize / (4 * n2.lanes)), f2 = h2 * Dy + 10240;
    if (t2.buffer.byteLength < f2) {
      const e3 = Math.ceil((f2 - t2.buffer.byteLength) / 65536);
      t2.grow(e3);
    }
    let l2 = 0;
    c2.gZ = new Uint8Array(t2.buffer, l2, Dy), l2 += c2.gZ.length, c2.prngR = new Uint8Array(t2.buffer, l2, Dy), l2 += c2.prngR.length, c2.prngTmp = new Uint8Array(t2.buffer, l2, Dy), l2 += c2.prngTmp.length, c2.ZERO1024 = new Uint8Array(t2.buffer, l2, 1024), l2 += c2.ZERO1024.length;
    const y2 = new Uint32Array(t2.buffer, l2, 2);
    l2 += y2.length * Uint32Array.BYTES_PER_ELEMENT;
    const g2 = { fn: u2, refs: c2 }, p2 = new Uint8Array(t2.buffer, l2, Dy);
    l2 += p2.length;
    const d2 = new Uint8Array(t2.buffer, l2, n2.memorySize * Dy), A2 = new Uint8Array(t2.buffer, 0, l2), w2 = (function(e3) {
      const t3 = Sy(64), r3 = new Uint8Array(4), n3 = new Uint8Array(24);
      Py(n3, e3.lanes, 0), Py(n3, e3.tagLength, 4), Py(n3, e3.memorySize, 8), Py(n3, e3.passes, 12), Py(n3, e3.version, 16), Py(n3, e3.type, 20);
      const i3 = [n3];
      e3.password ? (i3.push(Py(new Uint8Array(4), e3.password.length, 0)), i3.push(e3.password)) : i3.push(r3);
      e3.salt ? (i3.push(Py(new Uint8Array(4), e3.salt.length, 0)), i3.push(e3.salt)) : i3.push(r3);
      e3.secret ? (i3.push(Py(new Uint8Array(4), e3.secret.length, 0)), i3.push(e3.secret)) : i3.push(r3);
      e3.ad ? (i3.push(Py(new Uint8Array(4), e3.ad.length, 0)), i3.push(e3.ad)) : i3.push(r3);
      t3.update((function(e4) {
        if (1 === e4.length) return e4[0];
        let t4 = 0;
        for (let r5 = 0; r5 < e4.length; r5++) {
          if (!(e4[r5] instanceof Uint8Array)) throw Error("concatArrays: Data must be in the form of a Uint8Array");
          t4 += e4[r5].length;
        }
        const r4 = new Uint8Array(t4);
        let n4 = 0;
        return e4.forEach(((e5) => {
          r4.set(e5, n4), n4 += e5.length;
        })), r4;
      })(i3));
      const s3 = t3.digest();
      return new Uint8Array(s3);
    })(n2), m2 = h2 / n2.lanes, b2 = Array(n2.lanes).fill(null).map((() => Array(m2))), k2 = (e3, t3) => (b2[e3][t3] = d2.subarray(e3 * m2 * 1024 + 1024 * t3, e3 * m2 * 1024 + 1024 * t3 + Dy), b2[e3][t3]);
    for (let e3 = 0; e3 < n2.lanes; e3++) {
      const t3 = new Uint8Array(w2.length + 8);
      t3.set(w2), Py(t3, 0, w2.length), Py(t3, e3, w2.length + 4), Qy(Dy, t3, k2(e3, 0)), Py(t3, 1, w2.length), Qy(Dy, t3, k2(e3, 1));
    }
    const E2 = m2 / 4;
    for (let e3 = 0; e3 < n2.passes; e3++) for (let t3 = 0; t3 < 4; t3++) {
      const r3 = 0 === e3 && t3 <= 1;
      for (let i3 = 0; i3 < n2.lanes; i3++) {
        let s3 = 0 === t3 && 0 === e3 ? 2 : 0;
        const a3 = r3 ? Ty(g2, e3, i3, t3, h2, n2.passes, E2, s3) : null;
        for (; s3 < E2; s3++) {
          const c3 = t3 * E2 + s3, u3 = c3 > 0 ? b2[i3][c3 - 1] : b2[i3][m2 - 1], h3 = r3 ? a3.next().value : u3;
          o2(y2.byteOffset, h3.byteOffset, i3, n2.lanes, e3, t3, s3, 4, E2);
          const f3 = y2[0], l3 = y2[1];
          0 === e3 && k2(i3, c3), Ry(g2, u3, b2[f3][l3], e3 > 0 ? p2 : b2[i3][c3]), e3 > 0 && My(g2, b2[i3][c3], p2, b2[i3][c3]);
        }
      }
    }
    const v2 = b2[0][m2 - 1];
    for (let e3 = 1; e3 < n2.lanes; e3++) My(g2, v2, v2, b2[e3][m2 - 1]);
    const I2 = Qy(n2.tagLength, v2, new Uint8Array(n2.tagLength));
    return A2.fill(0), t2.grow(0), I2;
  }
  var Ly;
  async function Oy(e2, t2) {
    const r2 = new WebAssembly.Memory({ initial: 1040, maximum: 65536 }), n2 = await (async function(e3, t3, r3) {
      const n3 = { env: { memory: e3 } };
      if (void 0 === Ly) try {
        const e4 = await t3(n3);
        return Ly = true, e4;
      } catch (e4) {
        Ly = false;
      }
      return (Ly ? t3 : r3)(n3);
    })(r2, e2, t2);
    return (e3) => Ny(e3, { instance: n2.instance, memory: r2 });
  }
  function Hy(t2, r2, n2, i2) {
    var s2 = null, a2 = e.atob(n2), o2 = a2.length;
    s2 = new Uint8Array(new ArrayBuffer(o2));
    for (var c2 = 0; c2 < o2; c2++) s2[c2] = a2.charCodeAt(c2);
    return (function(e2, t3, r3) {
      var n3 = r3 ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, i3 = r3 ? WebAssembly.compileStreaming : WebAssembly.compile;
      return t3 ? n3(e2, t3) : i3(e2);
    })(s2, i2, false);
  }
  var zy;
  var Gy;
  var jy;
  var Vy;
  var qy;
  var _y;
  var Yy = /* @__PURE__ */ Object.freeze({ __proto__: null, default: async () => Oy(((e2) => Hy(0, 0, "AGFzbQEAAAABKwdgBH9/f38AYAABf2AAAGADf39/AGAJf39/f39/f39/AX9gAX8AYAF/AX8CEwEDZW52Bm1lbW9yeQIBkAiAgAQDCgkCAwAABAEFBgEEBQFwAQICBgkBfwFBkIjAAgsHfQoDeG9yAAEBRwACAkcyAAMFZ2V0TFoABBlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALX2luaXRpYWxpemUAABBfX2Vycm5vX2xvY2F0aW9uAAgJc3RhY2tTYXZlAAUMc3RhY2tSZXN0b3JlAAYKc3RhY2tBbGxvYwAHCQcBAEEBCwEACs0gCQMAAQtYAQJ/A0AgACAEQQR0IgNqIAIgA2r9AAQAIAEgA2r9AAQA/VH9CwQAIAAgA0EQciIDaiACIANq/QAEACABIANq/QAEAP1R/QsEACAEQQJqIgRBwABHDQALC7ceAgt7A38DQCADIBFBBHQiD2ogASAPav0ABAAgACAPav0ABAD9USIF/QsEACACIA9qIAX9CwQAIAMgD0EQciIPaiABIA9q/QAEACAAIA9q/QAEAP1RIgX9CwQAIAIgD2ogBf0LBAAgEUECaiIRQcAARw0ACwNAIAMgEEEHdGoiAEEQaiAA/QAEcCAA/QAEMCIFIAD9AAQQIgT9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAQgBP0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgT9USIJQSD9ywEgCUEg/c0B/VAiCSAA/QAEUCIG/c4BIAkgCf0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIGIAX9USIFQSj9ywEgBUEY/c0B/VAiCCAE/c4BIAggCP0NAAECAwgJCgsAAQIDCAkKCyAEIAT9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIKIAogCf1RIgVBMP3LASAFQRD9zQH9UCIFIAb9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAYgBv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgkgCP1RIgRBAf3LASAEQT/9zQH9UCIMIAD9AARgIAD9AAQgIgQgAP0ABAAiBv3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBv1RIghBIP3LASAIQSD9zQH9UCIIIABBQGsiAf0ABAAiB/3OASAIIAj9DQABAgMICQoLAAECAwgJCgsgByAH/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiByAE/VEiBEEo/csBIARBGP3NAf1QIgsgBv3OASALIAv9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBiAI/VEiBEEw/csBIARBEP3NAf1QIgQgB/3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgByAH/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCCAL/VEiB0EB/csBIAdBP/3NAf1QIg0gDf0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eHyIH/c4BIAcgB/0NAAECAwgJCgsAAQIDCAkKCyAKIAr9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIKIAQgBSAF/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/VEiC0Eg/csBIAtBIP3NAf1QIgsgCP3OASALIAv9DQABAgMICQoLAAECAwgJCgsgCCAI/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCCAH/VEiB0Eo/csBIAdBGP3NAf1QIgcgCv3OASAHIAf9DQABAgMICQoLAAECAwgJCgsgCiAK/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiDv0LBAAgACAGIA0gDCAM/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4fIgr9zgEgCiAK/Q0AAQIDCAkKCwABAgMICQoLIAYgBv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgYgBSAEIAT9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9USIFQSD9ywEgBUEg/c0B/VAiBSAJ/c4BIAUgBf0NAAECAwgJCgsAAQIDCAkKCyAJIAn9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIJIAr9USIEQSj9ywEgBEEY/c0B/VAiCiAG/c4BIAogCv0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIE/QsEACAAIAQgBf1RIgVBMP3LASAFQRD9zQH9UCIFIA4gC/1RIgRBMP3LASAEQRD9zQH9UCIEIAT9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9CwRgIAAgBCAFIAX9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9CwRwIAEgBCAI/c4BIAQgBP0NAAECAwgJCgsAAQIDCAkKCyAIIAj9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIE/QsEACAAIAUgCf3OASAFIAX9DQABAgMICQoLAAECAwgJCgsgCSAJ/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCf0LBFAgACAEIAf9USIFQQH9ywEgBUE//c0B/VAiBSAJIAr9USIEQQH9ywEgBEE//c0B/VAiBCAE/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/QsEICAAIAQgBSAF/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/QsEMCAQQQFqIhBBCEcNAAtBACEQA0AgAyAQQQR0aiIAQYABaiAA/QAEgAcgAP0ABIADIgUgAP0ABIABIgT9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAQgBP0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgT9USIJQSD9ywEgCUEg/c0B/VAiCSAA/QAEgAUiBv3OASAJIAn9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBiAF/VEiBUEo/csBIAVBGP3NAf1QIgggBP3OASAIIAj9DQABAgMICQoLAAECAwgJCgsgBCAE/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCiAKIAn9USIFQTD9ywEgBUEQ/c0B/VAiBSAG/c4BIAUgBf0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIJIAj9USIEQQH9ywEgBEE//c0B/VAiDCAA/QAEgAYgAP0ABIACIgQgAP0ABAAiBv3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBv1RIghBIP3LASAIQSD9zQH9UCIIIAD9AASABCIH/c4BIAggCP0NAAECAwgJCgsAAQIDCAkKCyAHIAf9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIHIAT9USIEQSj9ywEgBEEY/c0B/VAiCyAG/c4BIAsgC/0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIGIAj9USIEQTD9ywEgBEEQ/c0B/VAiBCAH/c4BIAQgBP0NAAECAwgJCgsAAQIDCAkKCyAHIAf9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIIIAv9USIHQQH9ywEgB0E//c0B/VAiDSAN/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4fIgf9zgEgByAH/Q0AAQIDCAkKCwABAgMICQoLIAogCv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgogBCAFIAX9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9USILQSD9ywEgC0Eg/c0B/VAiCyAI/c4BIAsgC/0NAAECAwgJCgsAAQIDCAkKCyAIIAj9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIIIAf9USIHQSj9ywEgB0EY/c0B/VAiByAK/c4BIAcgB/0NAAECAwgJCgsAAQIDCAkKCyAKIAr9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIO/QsEACAAIAYgDSAMIAz9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh8iCv3OASAKIAr9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBiAFIAQgBP0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eH/1RIgVBIP3LASAFQSD9zQH9UCIFIAn9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAkgCf0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgkgCv1RIgRBKP3LASAEQRj9zQH9UCIKIAb9zgEgCiAK/Q0AAQIDCAkKCwABAgMICQoLIAYgBv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgT9CwQAIAAgBCAF/VEiBUEw/csBIAVBEP3NAf1QIgUgDiAL/VEiBEEw/csBIARBEP3NAf1QIgQgBP0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eH/0LBIAGIAAgBCAFIAX9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9CwSAByAAIAQgCP3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgCCAI/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBP0LBIAEIAAgBSAJ/c4BIAUgBf0NAAECAwgJCgsAAQIDCAkKCyAJIAn9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIJ/QsEgAUgACAEIAf9USIFQQH9ywEgBUE//c0B/VAiBSAJIAr9USIEQQH9ywEgBEE//c0B/VAiBCAE/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/QsEgAIgACAEIAUgBf0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eH/0LBIADIBBBAWoiEEEIRw0AC0EAIRADQCACIBBBBHQiAGoiASAAIANq/QAEACAB/QAEAP1R/QsEACACIABBEHIiAWoiDyABIANq/QAEACAP/QAEAP1R/QsEACACIABBIHIiAWoiDyABIANq/QAEACAP/QAEAP1R/QsEACACIABBMHIiAGoiASAAIANq/QAEACAB/QAEAP1R/QsEACAQQQRqIhBBwABHDQALCxYAIAAgASACIAMQAiAAIAIgAiADEAILewIBfwF+IAIhCSABNQIAIQogBCAFcgRAIAEoAgQgA3AhCQsgACAJNgIAIAAgB0EBayAFIAQbIAhsIAZBAWtBAEF/IAYbIAIgCUYbaiIBIAVBAWogCGxBACAEG2ogAa0gCiAKfkIgiH5CIIinQX9zaiAHIAhscDYCBCAACwQAIwALBgAgACQACxAAIwAgAGtBcHEiACQAIAALBQBBgAgL", e2)), ((e2) => Hy(0, 0, "AGFzbQEAAAABPwhgBH9/f38AYAABf2AAAGADf39/AGARf39/f39/f39/f39/f39/f38AYAl/f39/f39/f38Bf2ABfwBgAX8BfwITAQNlbnYGbWVtb3J5AgGQCICABAMLCgIDBAAABQEGBwEEBQFwAQICBgkBfwFBkIjAAgsHfQoDeG9yAAEBRwADAkcyAAQFZ2V0TFoABRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALX2luaXRpYWxpemUAABBfX2Vycm5vX2xvY2F0aW9uAAkJc3RhY2tTYXZlAAYMc3RhY2tSZXN0b3JlAAcKc3RhY2tBbGxvYwAICQcBAEEBCwEACssaCgMAAQtQAQJ/A0AgACAEQQN0IgNqIAIgA2opAwAgASADaikDAIU3AwAgACADQQhyIgNqIAIgA2opAwAgASADaikDAIU3AwAgBEECaiIEQYABRw0ACwveDwICfgF/IAAgAUEDdGoiEyATKQMAIhEgACAFQQN0aiIBKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIA1BA3RqIgUgESAFKQMAhUIgiSIRNwMAIAAgCUEDdGoiCSARIAkpAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAEgESABKQMAhUIoiSIRNwMAIBMgESATKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAFIBEgBSkDAIVCMIkiETcDACAJIBEgCSkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgASARIAEpAwCFQgGJNwMAIAAgAkEDdGoiDSANKQMAIhEgACAGQQN0aiICKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIA5BA3RqIgYgESAGKQMAhUIgiSIRNwMAIAAgCkEDdGoiCiARIAopAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAIgESACKQMAhUIoiSIRNwMAIA0gESANKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAGIBEgBikDAIVCMIkiETcDACAKIBEgCikDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgAiARIAIpAwCFQgGJNwMAIAAgA0EDdGoiDiAOKQMAIhEgACAHQQN0aiIDKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIA9BA3RqIgcgESAHKQMAhUIgiSIRNwMAIAAgC0EDdGoiCyARIAspAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAMgESADKQMAhUIoiSIRNwMAIA4gESAOKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAHIBEgBykDAIVCMIkiETcDACALIBEgCykDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgAyARIAMpAwCFQgGJNwMAIAAgBEEDdGoiDyAPKQMAIhEgACAIQQN0aiIEKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIBBBA3RqIgggESAIKQMAhUIgiSIRNwMAIAAgDEEDdGoiACARIAApAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAQgESAEKQMAhUIoiSIRNwMAIA8gESAPKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAIIBEgCCkDAIVCMIkiETcDACAAIBEgACkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgBCARIAQpAwCFQgGJNwMAIBMgEykDACIRIAIpAwAiEnwgEUIBhkL+////H4MgEkL/////D4N+fCIRNwMAIAggESAIKQMAhUIgiSIRNwMAIAsgESALKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACACIBEgAikDAIVCKIkiETcDACATIBEgEykDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgCCARIAgpAwCFQjCJIhE3AwAgCyARIAspAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAIgESACKQMAhUIBiTcDACANIA0pAwAiESADKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAFIBEgBSkDAIVCIIkiETcDACAAIBEgACkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgAyARIAMpAwCFQiiJIhE3AwAgDSARIA0pAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAUgESAFKQMAhUIwiSIRNwMAIAAgESAAKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACADIBEgAykDAIVCAYk3AwAgDiAOKQMAIhEgBCkDACISfCARQgGGQv7///8fgyASQv////8Pg358IhE3AwAgBiARIAYpAwCFQiCJIhE3AwAgCSARIAkpAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAQgESAEKQMAhUIoiSIRNwMAIA4gESAOKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAGIBEgBikDAIVCMIkiETcDACAJIBEgCSkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgBCARIAQpAwCFQgGJNwMAIA8gDykDACIRIAEpAwAiEnwgEUIBhkL+////H4MgEkL/////D4N+fCIRNwMAIAcgESAHKQMAhUIgiSIRNwMAIAogESAKKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACABIBEgASkDAIVCKIkiETcDACAPIBEgDykDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgByARIAcpAwCFQjCJIhE3AwAgCiARIAopAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAEgESABKQMAhUIBiTcDAAvdCAEPfwNAIAIgBUEDdCIGaiABIAZqKQMAIAAgBmopAwCFNwMAIAIgBkEIciIGaiABIAZqKQMAIAAgBmopAwCFNwMAIAVBAmoiBUGAAUcNAAsDQCADIARBA3QiAGogACACaikDADcDACADIARBAXIiAEEDdCIBaiABIAJqKQMANwMAIAMgBEECciIBQQN0IgVqIAIgBWopAwA3AwAgAyAEQQNyIgVBA3QiBmogAiAGaikDADcDACADIARBBHIiBkEDdCIHaiACIAdqKQMANwMAIAMgBEEFciIHQQN0IghqIAIgCGopAwA3AwAgAyAEQQZyIghBA3QiCWogAiAJaikDADcDACADIARBB3IiCUEDdCIKaiACIApqKQMANwMAIAMgBEEIciIKQQN0IgtqIAIgC2opAwA3AwAgAyAEQQlyIgtBA3QiDGogAiAMaikDADcDACADIARBCnIiDEEDdCINaiACIA1qKQMANwMAIAMgBEELciINQQN0Ig5qIAIgDmopAwA3AwAgAyAEQQxyIg5BA3QiD2ogAiAPaikDADcDACADIARBDXIiD0EDdCIQaiACIBBqKQMANwMAIAMgBEEOciIQQQN0IhFqIAIgEWopAwA3AwAgAyAEQQ9yIhFBA3QiEmogAiASaikDADcDACADIARB//8DcSAAQf//A3EgAUH//wNxIAVB//8DcSAGQf//A3EgB0H//wNxIAhB//8DcSAJQf//A3EgCkH//wNxIAtB//8DcSAMQf//A3EgDUH//wNxIA5B//8DcSAPQf//A3EgEEH//wNxIBFB//8DcRACIARB8ABJIQAgBEEQaiEEIAANAAtBACEBIANBAEEBQRBBEUEgQSFBMEExQcAAQcEAQdAAQdEAQeAAQeEAQfAAQfEAEAIgA0ECQQNBEkETQSJBI0EyQTNBwgBBwwBB0gBB0wBB4gBB4wBB8gBB8wAQAiADQQRBBUEUQRVBJEElQTRBNUHEAEHFAEHUAEHVAEHkAEHlAEH0AEH1ABACIANBBkEHQRZBF0EmQSdBNkE3QcYAQccAQdYAQdcAQeYAQecAQfYAQfcAEAIgA0EIQQlBGEEZQShBKUE4QTlByABByQBB2ABB2QBB6ABB6QBB+ABB+QAQAiADQQpBC0EaQRtBKkErQTpBO0HKAEHLAEHaAEHbAEHqAEHrAEH6AEH7ABACIANBDEENQRxBHUEsQS1BPEE9QcwAQc0AQdwAQd0AQewAQe0AQfwAQf0AEAIgA0EOQQ9BHkEfQS5BL0E+QT9BzgBBzwBB3gBB3wBB7gBB7wBB/gBB/wAQAgNAIAIgAUEDdCIAaiIEIAAgA2opAwAgBCkDAIU3AwAgAiAAQQhyIgRqIgUgAyAEaikDACAFKQMAhTcDACACIABBEHIiBGoiBSADIARqKQMAIAUpAwCFNwMAIAIgAEEYciIAaiIEIAAgA2opAwAgBCkDAIU3AwAgAUEEaiIBQYABRw0ACwsWACAAIAEgAiADEAMgACACIAIgAxADC3sCAX8BfiACIQkgATUCACEKIAQgBXIEQCABKAIEIANwIQkLIAAgCTYCACAAIAdBAWsgBSAEGyAIbCAGQQFrQQBBfyAGGyACIAlGG2oiASAFQQFqIAhsQQAgBBtqIAGtIAogCn5CIIh+QiCIp0F/c2ogByAIbHA2AgQgAAsEACMACwYAIAAkAAsQACMAIABrQXBxIgAkACAACwUAQYAICw==", e2))) });
  function Zy(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  var Jy = (function() {
    if (_y) return qy;
    _y = 1;
    const e2 = (function() {
      if (Gy) return zy;
      function e3(e4) {
        this.name = "Bzip2Error", this.message = e4, this.stack = Error().stack;
      }
      Gy = 1, e3.prototype = Error();
      var t3 = function(t4) {
        throw new e3(t4);
      }, r2 = {};
      return r2.Bzip2Error = e3, r2.crcTable = [0, 79764919, 159529838, 222504665, 319059676, 398814059, 445009330, 507990021, 638119352, 583659535, 797628118, 726387553, 890018660, 835552979, 1015980042, 944750013, 1276238704, 1221641927, 1167319070, 1095957929, 1595256236, 1540665371, 1452775106, 1381403509, 1780037320, 1859660671, 1671105958, 1733955601, 2031960084, 2111593891, 1889500026, 1952343757, 2552477408, 2632100695, 2443283854, 2506133561, 2334638140, 2414271883, 2191915858, 2254759653, 3190512472, 3135915759, 3081330742, 3009969537, 2905550212, 2850959411, 2762807018, 2691435357, 3560074640, 3505614887, 3719321342, 3648080713, 3342211916, 3287746299, 3467911202, 3396681109, 4063920168, 4143685023, 4223187782, 4286162673, 3779000052, 3858754371, 3904687514, 3967668269, 881225847, 809987520, 1023691545, 969234094, 662832811, 591600412, 771767749, 717299826, 311336399, 374308984, 453813921, 533576470, 25881363, 88864420, 134795389, 214552010, 2023205639, 2086057648, 1897238633, 1976864222, 1804852699, 1867694188, 1645340341, 1724971778, 1587496639, 1516133128, 1461550545, 1406951526, 1302016099, 1230646740, 1142491917, 1087903418, 2896545431, 2825181984, 2770861561, 2716262478, 3215044683, 3143675388, 3055782693, 3001194130, 2326604591, 2389456536, 2200899649, 2280525302, 2578013683, 2640855108, 2418763421, 2498394922, 3769900519, 3832873040, 3912640137, 3992402750, 4088425275, 4151408268, 4197601365, 4277358050, 3334271071, 3263032808, 3476998961, 3422541446, 3585640067, 3514407732, 3694837229, 3640369242, 1762451694, 1842216281, 1619975040, 1682949687, 2047383090, 2127137669, 1938468188, 2001449195, 1325665622, 1271206113, 1183200824, 1111960463, 1543535498, 1489069629, 1434599652, 1363369299, 622672798, 568075817, 748617968, 677256519, 907627842, 853037301, 1067152940, 995781531, 51762726, 131386257, 177728840, 240578815, 269590778, 349224269, 429104020, 491947555, 4046411278, 4126034873, 4172115296, 4234965207, 3794477266, 3874110821, 3953728444, 4016571915, 3609705398, 3555108353, 3735388376, 3664026991, 3290680682, 3236090077, 3449943556, 3378572211, 3174993278, 3120533705, 3032266256, 2961025959, 2923101090, 2868635157, 2813903052, 2742672763, 2604032198, 2683796849, 2461293480, 2524268063, 2284983834, 2364738477, 2175806836, 2238787779, 1569362073, 1498123566, 1409854455, 1355396672, 1317987909, 1246755826, 1192025387, 1137557660, 2072149281, 2135122070, 1912620623, 1992383480, 1753615357, 1816598090, 1627664531, 1707420964, 295390185, 358241886, 404320391, 483945776, 43990325, 106832002, 186451547, 266083308, 932423249, 861060070, 1041341759, 986742920, 613929101, 542559546, 756411363, 701822548, 3316196985, 3244833742, 3425377559, 3370778784, 3601682597, 3530312978, 3744426955, 3689838204, 3819031489, 3881883254, 3928223919, 4007849240, 4037393693, 4100235434, 4180117107, 4259748804, 2310601993, 2373574846, 2151335527, 2231098320, 2596047829, 2659030626, 2470359227, 2550115596, 2947551409, 2876312838, 2788305887, 2733848168, 3165939309, 3094707162, 3040238851, 2985771188], r2.array = function(e4) {
        var t4 = 0, r3 = 0, n2 = [0, 1, 3, 7, 15, 31, 63, 127, 255];
        return function(i2) {
          for (var s2 = 0; i2 > 0; ) {
            var a2 = 8 - t4;
            i2 >= a2 ? (s2 <<= a2, s2 |= n2[a2] & e4[r3++], t4 = 0, i2 -= a2) : (s2 <<= i2, s2 |= (e4[r3] & n2[i2] << 8 - i2 - t4) >> 8 - i2 - t4, t4 += i2, i2 = 0);
          }
          return s2;
        };
      }, r2.simple = function(e4, t4) {
        var n2 = r2.array(e4), i2 = false, s2 = 1e5 * r2.header(n2), a2 = new Int32Array(s2);
        do {
          i2 = r2.decompress(n2, t4, a2, s2);
        } while (!i2);
      }, r2.header = function(e4) {
        this.byteCount = new Int32Array(256), this.symToByte = new Uint8Array(256), this.mtfSymbol = new Int32Array(256), this.selectors = new Uint8Array(32768), 4348520 != e4(24) && t3("No magic number found");
        var r3 = e4(8) - 48;
        return (r3 < 1 || r3 > 9) && t3("Not a BZIP archive"), r3;
      }, r2.decompress = function(e4, r3, n2, i2, s2) {
        for (var a2 = -1, o2 = "", c2 = 0; c2 < 6; c2++) o2 += e4(8).toString(16);
        if ("177245385090" == o2) return (0 | e4(32)) !== s2 && t3("Error in bzip2: crc32 do not match"), e4(null), null;
        "314159265359" != o2 && t3("Invalid bzip data");
        var u2 = 0 | e4(32);
        e4(1) && t3("unsupported obsolete version");
        var h2 = e4(24);
        h2 > i2 && t3("Initial position larger than buffer size");
        var f2 = e4(16), l2 = 0;
        for (c2 = 0; c2 < 16; c2++) if (f2 & 1 << 15 - c2) {
          var y2 = e4(16);
          for (d2 = 0; d2 < 16; d2++) y2 & 1 << 15 - d2 && (this.symToByte[l2++] = 16 * c2 + d2);
        }
        var g2 = e4(3);
        (g2 < 2 || g2 > 6) && t3("Invalid bzip data");
        var p2 = e4(15);
        for (0 == p2 && t3("Invalid bzip data"), c2 = 0; c2 < g2; c2++) this.mtfSymbol[c2] = c2;
        for (c2 = 0; c2 < p2; c2++) {
          for (var d2 = 0; e4(1); d2++) d2 >= g2 && t3("Invalid bzip data");
          var A2 = this.mtfSymbol[d2];
          for (y2 = d2 - 1; y2 >= 0; y2--) this.mtfSymbol[y2 + 1] = this.mtfSymbol[y2];
          this.mtfSymbol[0] = A2, this.selectors[c2] = A2;
        }
        var w2, m2, b2, k2, E2 = l2 + 2, v2 = [], I2 = new Uint8Array(258), B2 = new Uint16Array(21);
        for (d2 = 0; d2 < g2; d2++) {
          for (f2 = e4(5), c2 = 0; c2 < E2; c2++) {
            for (; (f2 < 1 || f2 > 20) && t3("Invalid bzip data"), e4(1); ) e4(1) ? f2-- : f2++;
            I2[c2] = f2;
          }
          var S2, K2;
          for (S2 = K2 = I2[0], c2 = 1; c2 < E2; c2++) I2[c2] > K2 ? K2 = I2[c2] : I2[c2] < S2 && (S2 = I2[c2]);
          (w2 = v2[d2] = {}).permute = new Int32Array(258), w2.limit = new Int32Array(21), w2.base = new Int32Array(21), w2.minLen = S2, w2.maxLen = K2;
          var C2 = w2.base, D2 = w2.limit, U2 = 0;
          for (c2 = S2; c2 <= K2; c2++) for (f2 = 0; f2 < E2; f2++) I2[f2] == c2 && (w2.permute[U2++] = f2);
          for (c2 = S2; c2 <= K2; c2++) B2[c2] = D2[c2] = 0;
          for (c2 = 0; c2 < E2; c2++) B2[I2[c2]]++;
          for (U2 = f2 = 0, c2 = S2; c2 < K2; c2++) U2 += B2[c2], D2[c2] = U2 - 1, U2 <<= 1, C2[c2 + 1] = U2 - (f2 += B2[c2]);
          D2[K2] = U2 + B2[K2] - 1, C2[S2] = 0;
        }
        for (c2 = 0; c2 < 256; c2++) this.mtfSymbol[c2] = c2, this.byteCount[c2] = 0;
        for (m2 = b2 = E2 = k2 = 0; ; ) {
          for (E2-- || (E2 = 49, k2 >= p2 && t3("Invalid bzip data"), C2 = (w2 = v2[this.selectors[k2++]]).base, D2 = w2.limit), d2 = e4(c2 = w2.minLen); c2 > w2.maxLen && t3("Invalid bzip data"), !(d2 <= D2[c2]); ) c2++, d2 = d2 << 1 | e4(1);
          ((d2 -= C2[c2]) < 0 || d2 >= 258) && t3("Invalid bzip data");
          var P2 = w2.permute[d2];
          if (0 != P2 && 1 != P2) {
            if (m2) for (m2 = 0, b2 + f2 > i2 && t3("Invalid bzip data"), A2 = this.symToByte[this.mtfSymbol[0]], this.byteCount[A2] += f2; f2--; ) n2[b2++] = A2;
            if (P2 > l2) break;
            for (b2 >= i2 && t3("Invalid bzip data"), c2 = P2 - 1, A2 = this.mtfSymbol[c2], y2 = c2 - 1; y2 >= 0; y2--) this.mtfSymbol[y2 + 1] = this.mtfSymbol[y2];
            this.mtfSymbol[0] = A2, A2 = this.symToByte[A2], this.byteCount[A2]++, n2[b2++] = A2;
          } else m2 || (m2 = 1, f2 = 0), f2 += 0 == P2 ? m2 : 2 * m2, m2 <<= 1;
        }
        for ((h2 < 0 || h2 >= b2) && t3("Invalid bzip data"), d2 = 0, c2 = 0; c2 < 256; c2++) y2 = d2 + this.byteCount[c2], this.byteCount[c2] = d2, d2 = y2;
        for (c2 = 0; c2 < b2; c2++) A2 = 255 & n2[c2], n2[this.byteCount[A2]] |= c2 << 8, this.byteCount[A2]++;
        var x2, Q2, M2, R2 = 0, F2 = 0, T2 = 0;
        for (b2 && (F2 = 255 & (R2 = n2[h2]), R2 >>= 8, T2 = -1); b2; ) {
          for (b2--, Q2 = F2, F2 = 255 & (R2 = n2[R2]), R2 >>= 8, 3 == T2++ ? (x2 = F2, M2 = Q2, F2 = -1) : (x2 = 1, M2 = F2); x2--; ) a2 = 4294967295 & (a2 << 8 ^ this.crcTable[255 & (a2 >> 24 ^ M2)]), r3(M2);
          F2 != Q2 && (T2 = 0);
        }
        return (0 | (a2 = ~a2 >>> 0)) != (0 | u2) && t3("Error in bzip2: crc32 do not match"), 4294967295 & (a2 ^ (s2 << 1 | s2 >>> 31));
      }, zy = r2;
    })(), t2 = (function() {
      if (Vy) return jy;
      Vy = 1;
      var e3 = [0, 1, 3, 7, 15, 31, 63, 127, 255];
      return jy = function(t3) {
        var r2 = 0, n2 = 0, i2 = t3(), s2 = function(a2) {
          if (null === a2 && 0 != r2) return r2 = 0, void n2++;
          for (var o2 = 0; a2 > 0; ) {
            n2 >= i2.length && (n2 = 0, i2 = t3());
            var c2 = 8 - r2;
            0 === r2 && a2 > 0 && s2.bytesRead++, a2 >= c2 ? (o2 <<= c2, o2 |= e3[c2] & i2[n2++], r2 = 0, a2 -= c2) : (o2 <<= a2, o2 |= (i2[n2] & e3[a2] << 8 - a2 - r2) >> 8 - a2 - r2, r2 += a2, a2 = 0);
          }
          return o2;
        };
        return s2.bytesRead = 0, s2;
      };
    })();
    return qy = function(r2, n2 = 1 / 0) {
      const i2 = [];
      let s2 = 0, a2 = 0, o2 = false, c2 = false, u2 = null, h2 = null, f2 = 0;
      let l2, y2 = 0;
      function g2(t3) {
        if (!o2) try {
          return (function(t4) {
            if (a2) {
              const r3 = 1e5 * a2, i3 = new Int32Array(r3);
              let s3 = new Uint8Array(32768), o3 = 0;
              const c3 = function(e3) {
                if (++f2 > n2) throw Error("Maximum decompressed size exceeded");
                if (o3 === s3.length) {
                  const e4 = Math.min(2 * s3.length, o3 + (n2 - f2) + 1), t5 = new Uint8Array(e4);
                  t5.set(s3), s3 = t5;
                }
                s3[o3++] = e3;
              };
              return h2 = e2.decompress(u2, c3, i3, r3, h2), null === h2 ? (a2 = 0, false) : (t4(s3.subarray(0, o3)), true);
            }
            return a2 = e2.header(u2), h2 = 0, false;
          })((function(e3) {
            t3.enqueue(e3), null !== e3 && (y2 += e3.length);
          }));
        } catch (e3) {
          return t3.error(e3), o2 = true, true;
        }
      }
      return new ReadableStream({ start() {
        l2 = r2.getReader();
      }, async pull(e3) {
        try {
          for (; ; ) {
            for (; !(c2 || u2 && s2 - u2.bytesRead + 1 >= 25e3 + 1e5 * (a2 || 4)); ) {
              const { value: e4, done: r3 } = await l2.read();
              r3 ? c2 = true : (i2.push(e4), s2 += e4.length, null === u2 && (u2 = t2((function() {
                return i2.shift();
              }))));
            }
            for (; c2 ? u2 && s2 > u2.bytesRead : u2 && s2 - u2.bytesRead + 1 >= 25e3 + 1e5 * (a2 || 4); ) if (g2(e3)) return;
            if (c2 && !o2 && (!u2 || s2 <= u2.bytesRead)) return void (null === h2 ? e3.close() : e3.error(Error("input stream ended prematurely")));
          }
        } catch (t3) {
          e3.error(t3);
        }
      }, async cancel(e3) {
        await l2.abort(e3);
      } }, { highWaterMark: 0 });
    };
  })();
  var Wy = /* @__PURE__ */ t({ __proto__: null, default: /* @__PURE__ */ Zy(Jy) }, [Jy]);

  // src/verification/browser-entry.js
  var EXPECTED_FINGERPRINT = "07D8539F269583C160E333151763E15ED3E9286C";
  async function verifyHardwareSignature({
    messageBytes,
    signatureBytes,
    certificateBytes
  }) {
    if (!(messageBytes instanceof Uint8Array) || !(signatureBytes instanceof Uint8Array) || !(certificateBytes instanceof Uint8Array)) {
      throw new Error("Expected binary message, signature and certificate");
    }
    if (messageBytes.length === 0 || messageBytes.length > 104 || signatureBytes.length === 0 || signatureBytes.length > 8192) {
      throw new Error("Invalid input length");
    }
    if (messageBytes.some((byte) => byte > 127)) {
      throw new Error("Non-ASCII message unsupported");
    }
    const publicKey = await Ja({
      binaryKey: certificateBytes
    });
    const fingerprint = publicKey.getFingerprint().toUpperCase();
    if (fingerprint !== EXPECTED_FINGERPRINT) {
      throw new Error("Unexpected signing certificate");
    }
    const signature = await va({
      binarySignature: signatureBytes
    });
    const messageText = new TextDecoder().decode(messageBytes);
    const message = await oo({
      text: messageText
    });
    const config = {
      rejectCurves: new Set(
        [...F.rejectCurves].filter(
          (curve) => curve !== R.curve.secp256k1
        )
      )
    };
    const result = await ko({
      message,
      signature,
      verificationKeys: publicKey,
      config
    });
    if (result.signatures.length !== 1) {
      throw new Error("Expected exactly one signature");
    }
    const verification = result.signatures[0];
    await verification.verified;
    const keyID = verification.keyID.toHex();
    if (keyID !== publicKey.getKeyID().toHex()) {
      throw new Error("Unexpected signing key ID");
    }
    return {
      verified: true,
      fingerprint,
      keyID,
      messageBytes: messageBytes.length
    };
  }
  async function createSignedFixtureEmail({
    messageBytes,
    signatureBytes,
    certificateBytes
  }) {
    const expectedFixture = "Content-Type: text/plain; charset=us-ascii\r\n\r\nHello from Keycard Shell.\r\n";
    const expectedBytes = new TextEncoder().encode(expectedFixture);
    if (messageBytes.length !== expectedBytes.length || !messageBytes.every((byte, index) => byte === expectedBytes[index])) {
      throw new Error("Only the verified MIME test fixture can be exported");
    }
    const verification = await verifyHardwareSignature({
      messageBytes,
      signatureBytes,
      certificateBytes
    });
    if (!verification.verified) {
      throw new Error("Hardware signature verification failed");
    }
    const signature = await va({
      binarySignature: signatureBytes
    });
    const signatureCreationTime = signature.packets?.[0]?.created;
    if (!(signatureCreationTime instanceof Date) || !Number.isFinite(signatureCreationTime.getTime())) {
      throw new Error("Invalid OpenPGP signature creation time");
    }
    const armor = signature.armor().replace(/\r?\n/g, "\r\n").replace(/\r\n*$/, "\r\n");
    const boundary = "shellpgp-keycard-hardware-test-v05";
    const headers = [
      "From: Keycard Test <keycard@example.com>",
      "To: Keycard Test <keycard@example.com>",
      "Subject: ShellPGP Hardware Signing Test",
      `Date: ${signatureCreationTime.toUTCString()}`,
      "MIME-Version: 1.0",
      "X-ShellPGP-Prototype: fixture-only",
      `Content-Type: multipart/signed; protocol="application/pgp-signature"; micalg=pgp-sha256; boundary="${boundary}"`
    ];
    const eml = headers.join("\r\n") + `\r
\r
--${boundary}\r
` + expectedFixture + // Extra CRLF: the delimiter's CRLF is not part of the signed entity.
    `\r
--${boundary}\r
Content-Type: application/pgp-signature; name="signature.asc"\r
Content-Description: OpenPGP digital signature\r
Content-Disposition: attachment; filename="signature.asc"\r
Content-Transfer-Encoding: 7bit\r
\r
` + armor + `--${boundary}--\r
`;
    return {
      eml,
      fingerprint: verification.fingerprint,
      keyID: verification.keyID
    };
  }
  return __toCommonJS(browser_entry_exports);
})();
/*! Bundled license information:

openpgp/dist/openpgp.min.mjs:
  (*! OpenPGP.js v6.3.2 - 2026-09-24 - this is LGPL licensed code, see LICENSE/our website https://openpgpjs.org/ for more information. *)
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)

openpgp/dist/openpgp.min.mjs:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
