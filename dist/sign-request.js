var ShellPGPProtocol = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e2) {
      throw err = [e2], e2;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e2) {
      throw mod = 0, e2;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e2, m4;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d6 = isLE ? -1 : 1;
        var s3 = buffer[offset + i];
        i += d6;
        e2 = s3 & (1 << -nBits) - 1;
        s3 >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e2 = e2 * 256 + buffer[offset + i], i += d6, nBits -= 8) {
        }
        m4 = e2 & (1 << -nBits) - 1;
        e2 >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m4 = m4 * 256 + buffer[offset + i], i += d6, nBits -= 8) {
        }
        if (e2 === 0) {
          e2 = 1 - eBias;
        } else if (e2 === eMax) {
          return m4 ? NaN : (s3 ? -1 : 1) * Infinity;
        } else {
          m4 = m4 + Math.pow(2, mLen);
          e2 = e2 - eBias;
        }
        return (s3 ? -1 : 1) * m4 * Math.pow(2, e2 - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e2, m4, c5;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d6 = isLE ? 1 : -1;
        var s3 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m4 = isNaN(value) ? 1 : 0;
          e2 = eMax;
        } else {
          e2 = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c5 = Math.pow(2, -e2)) < 1) {
            e2--;
            c5 *= 2;
          }
          if (e2 + eBias >= 1) {
            value += rt / c5;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c5 >= 2) {
            e2++;
            c5 /= 2;
          }
          if (e2 + eBias >= eMax) {
            m4 = 0;
            e2 = eMax;
          } else if (e2 + eBias >= 1) {
            m4 = (value * c5 - 1) * Math.pow(2, mLen);
            e2 = e2 + eBias;
          } else {
            m4 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e2 = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m4 & 255, i += d6, m4 /= 256, mLen -= 8) {
        }
        e2 = e2 << mLen | m4;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e2 & 255, i += d6, e2 /= 256, eLen -= 8) {
        }
        buffer[offset + i - d6] |= s3 * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer4;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer4.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer4.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e2) {
          return false;
        }
      }
      Object.defineProperty(Buffer4.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer4.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer4.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer4.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer4.prototype);
        return buf;
      }
      function Buffer4(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer4.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer4.from(valueOf, encodingOrOffset, length);
        }
        const b5 = fromObject(value);
        if (b5) return b5;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer4.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer4.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer4.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer4, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer4.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer4.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer4.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer4.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer4.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer4.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer4.alloc(+length);
      }
      Buffer4.isBuffer = function isBuffer(b5) {
        return b5 != null && b5._isBuffer === true && b5 !== Buffer4.prototype;
      };
      Buffer4.compare = function compare(a4, b5) {
        if (isInstance(a4, Uint8Array)) a4 = Buffer4.from(a4, a4.offset, a4.byteLength);
        if (isInstance(b5, Uint8Array)) b5 = Buffer4.from(b5, b5.offset, b5.byteLength);
        if (!Buffer4.isBuffer(a4) || !Buffer4.isBuffer(b5)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a4 === b5) return 0;
        let x5 = a4.length;
        let y7 = b5.length;
        for (let i = 0, len = Math.min(x5, y7); i < len; ++i) {
          if (a4[i] !== b5[i]) {
            x5 = a4[i];
            y7 = b5[i];
            break;
          }
        }
        if (x5 < y7) return -1;
        if (y7 < x5) return 1;
        return 0;
      };
      Buffer4.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer4.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer4.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer4.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer4.isBuffer(buf)) buf = Buffer4.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer4.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer4.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer4.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer4.prototype._isBuffer = true;
      function swap(b5, n2, m4) {
        const i = b5[n2];
        b5[n2] = b5[m4];
        b5[m4] = i;
      }
      Buffer4.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer4.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer4.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer4.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer4.prototype.toLocaleString = Buffer4.prototype.toString;
      Buffer4.prototype.equals = function equals(b5) {
        if (!Buffer4.isBuffer(b5)) throw new TypeError("Argument must be a Buffer");
        if (this === b5) return true;
        return Buffer4.compare(this, b5) === 0;
      };
      Buffer4.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer4.prototype[customInspectSymbol] = Buffer4.prototype.inspect;
      }
      Buffer4.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer4.from(target, target.offset, target.byteLength);
        }
        if (!Buffer4.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x5 = thisEnd - thisStart;
        let y7 = end - start;
        const len = Math.min(x5, y7);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x5 = thisCopy[i];
            y7 = targetCopy[i];
            break;
          }
        }
        if (x5 < y7) return -1;
        if (y7 < x5) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer4.from(val, encoding);
        }
        if (Buffer4.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j2 = 0; j2 < valLength; j2++) {
              if (read(arr, i + j2) !== read(val, j2)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer4.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer4.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer4.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer4.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer4.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer4.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer4.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer4.prototype.readUintLE = Buffer4.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer4.prototype.readUintBE = Buffer4.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer4.prototype.readUint8 = Buffer4.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer4.prototype.readUint16LE = Buffer4.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer4.prototype.readUint16BE = Buffer4.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer4.prototype.readUint32LE = Buffer4.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer4.prototype.readUint32BE = Buffer4.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer4.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer4.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer4.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer4.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer4.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer4.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer4.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer4.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer4.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer4.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer4.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer4.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer4.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer4.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer4.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer4.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer4.prototype.writeUintLE = Buffer4.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeUintBE = Buffer4.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeUint8 = Buffer4.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer4.prototype.writeUint16LE = Buffer4.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer4.prototype.writeUint16BE = Buffer4.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer4.prototype.writeUint32LE = Buffer4.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer4.prototype.writeUint32BE = Buffer4.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer4.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer4.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer4.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer4.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer4.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer4.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer4.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer4.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer4.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer4.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer4.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer4.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer4.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer4.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer4.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer4.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer4.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer4.isBuffer(val) ? val : Buffer4.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E3(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E3(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E3(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E3(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n2 = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n2} and < 2${n2} ** ${(byteLength2 + 1) * 8}${n2}`;
            } else {
              range = `>= -(2${n2} ** ${(byteLength2 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n2}`;
            }
          } else {
            range = `>= ${min}${n2} and <= ${max}${n2}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c5, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c5 = str.charCodeAt(i);
          hi = c5 >> 8;
          lo = c5 % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j2 = 0; j2 < 16; ++j2) {
            table[i16 + j2] = alphabet[i] + alphabet[j2];
          }
        }
        return table;
      })();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/cbor2/lib/constants.js
  var f, T, I, o, A, S;
  var init_constants = __esm({
    "node_modules/cbor2/lib/constants.js"() {
      f = { POS_INT: 0, NEG_INT: 1, BYTE_STRING: 2, UTF8_STRING: 3, ARRAY: 4, MAP: 5, TAG: 6, SIMPLE_FLOAT: 7 };
      T = { DATE_STRING: 0, DATE_EPOCH: 1, POS_BIGINT: 2, NEG_BIGINT: 3, DECIMAL_FRAC: 4, BIGFLOAT: 5, BASE64URL_EXPECTED: 21, BASE64_EXPECTED: 22, BASE16_EXPECTED: 23, CBOR: 24, URI: 32, BASE64URL: 33, BASE64: 34, MIME: 36, DATE_EPOCH_DAYS: 100, SET: 258, JSON: 262, WTF8: 273, SYMBOL: 280, DATE_FULL: 1004, REGEXP: 21066, SELF_DESCRIBED: 55799, INVALID_16: 65535, INVALID_32: 4294967295, INVALID_64: 0xffffffffffffffffn };
      I = { ZERO: 0, ONE: 24, TWO: 25, FOUR: 26, EIGHT: 27, INDEFINITE: 31 };
      o = { FALSE: 20, TRUE: 21, NULL: 22, UNDEFINED: 23 };
      A = class {
        static BREAK = /* @__PURE__ */ Symbol.for("github.com/hildjj/cbor2/break");
        static ENCODED = /* @__PURE__ */ Symbol.for("github.com/hildjj/cbor2/cbor-encoded");
        static LENGTH = /* @__PURE__ */ Symbol.for("github.com/hildjj/cbor2/length");
      };
      S = { MIN: -(2n ** 63n), MAX: 2n ** 64n - 1n };
    }
  });

  // node_modules/cbor2/lib/tag.js
  var o2;
  var init_tag = __esm({
    "node_modules/cbor2/lib/tag.js"() {
      o2 = class _o {
        static #e = /* @__PURE__ */ new Map();
        tag;
        contents;
        constructor(e2, t3 = void 0) {
          this.tag = e2, this.contents = t3;
        }
        get noChildren() {
          return !!_o.#e.get(this.tag)?.noChildren;
        }
        static registerDecoder(e2, t3, n2) {
          const i = this.#e.get(e2);
          return this.#e.set(e2, t3), i && ("comment" in t3 || (t3.comment = i.comment), "noChildren" in t3 || (t3.noChildren = i.noChildren)), n2 && !t3.comment && (t3.comment = () => `(${n2})`), i;
        }
        static clearDecoder(e2) {
          const t3 = this.#e.get(e2);
          return this.#e.delete(e2), t3;
        }
        static getDecoder(e2) {
          return this.#e.get(e2);
        }
        static getAllDecoders() {
          return new Map(this.#e);
        }
        *[Symbol.iterator]() {
          yield this.contents;
        }
        push(e2) {
          return this.contents = e2, 1;
        }
        decode(e2) {
          const t3 = e2?.tags?.get(this.tag) ?? (e2?.ignoreGlobalTags ? void 0 : _o.#e.get(this.tag));
          return t3 ? t3(this, e2) : this;
        }
        comment(e2, t3) {
          const n2 = e2?.tags?.get(this.tag) ?? (e2?.ignoreGlobalTags ? void 0 : _o.#e.get(this.tag));
          if (n2?.comment) return n2.comment(this, e2, t3);
        }
        toCBOR() {
          return [this.tag, this.contents];
        }
        [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](e2, t3, n2) {
          return `${this.tag}(${n2(this.contents, t3)})`;
        }
      };
    }
  });

  // node_modules/cbor2/lib/box.js
  function f2(n2) {
    if (n2 != null && typeof n2 == "object") return n2[A.ENCODED];
  }
  function s(n2) {
    if (n2 != null && typeof n2 == "object") return n2[A.LENGTH];
  }
  function u(n2, e2) {
    Object.defineProperty(n2, A.ENCODED, { configurable: true, enumerable: false, value: e2 });
  }
  function d(n2, e2) {
    const r2 = Object(n2);
    return u(r2, e2), r2;
  }
  var init_box = __esm({
    "node_modules/cbor2/lib/box.js"() {
      init_constants();
      init_tag();
    }
  });

  // node_modules/cbor2/lib/utils.js
  function c(r2, n2) {
    Object.defineProperty(r2, g, { configurable: false, enumerable: false, writable: false, value: n2 });
  }
  function f3(r2) {
    return r2[g];
  }
  function l(r2) {
    return f3(r2) !== void 0;
  }
  function R(r2, n2 = 0, t3 = r2.length - 1) {
    const o5 = r2.subarray(n2, t3), a4 = f3(r2);
    if (a4) {
      const s3 = [];
      for (const e2 of a4) if (e2[0] >= n2 && e2[0] + e2[1] <= t3) {
        const i = [...e2];
        i[0] -= n2, s3.push(i);
      }
      s3.length && c(o5, s3);
    }
    return o5;
  }
  function b(r2) {
    let n2 = Math.ceil(r2.length / 2);
    const t3 = new Uint8Array(n2);
    n2--;
    for (let o5 = r2.length, a4 = o5 - 2; o5 >= 0; o5 = a4, a4 -= 2, n2--) t3[n2] = parseInt(r2.substring(a4, o5), 16);
    return t3;
  }
  function A2(r2) {
    return r2.reduce((n2, t3) => n2 + t3.toString(16).padStart(2, "0"), "");
  }
  function d2(r2) {
    const n2 = r2.reduce((e2, i) => e2 + i.length, 0), t3 = r2.some((e2) => l(e2)), o5 = [], a4 = new Uint8Array(n2);
    let s3 = 0;
    for (const e2 of r2) {
      if (!(e2 instanceof Uint8Array)) throw new TypeError(`Invalid array: ${e2}`);
      if (a4.set(e2, s3), t3) {
        const i = e2[g] ?? [[0, e2.length]];
        for (const u3 of i) u3[0] += s3;
        o5.push(...i);
      }
      s3 += e2.length;
    }
    return t3 && c(a4, o5), a4;
  }
  function y(r2) {
    const n2 = atob(r2);
    return Uint8Array.from(n2, (t3) => t3.codePointAt(0));
  }
  function x(r2) {
    const n2 = r2.replace(/[_-]/g, (t3) => p[t3]);
    return y(n2.padEnd(Math.ceil(n2.length / 4) * 4, "="));
  }
  function h() {
    const r2 = new Uint8Array(4), n2 = new Uint32Array(r2.buffer);
    return !((n2[0] = 1) & r2[0]);
  }
  function U(r2) {
    let n2 = "";
    for (const t3 of r2) {
      const o5 = t3.codePointAt(0)?.toString(16).padStart(4, "0");
      n2 && (n2 += ", "), n2 += `U+${o5}`;
    }
    return n2;
  }
  var g, p;
  var init_utils = __esm({
    "node_modules/cbor2/lib/utils.js"() {
      g = /* @__PURE__ */ Symbol("CBOR_RANGES");
      p = { "-": "+", _: "/" };
    }
  });

  // node_modules/cbor2/lib/typeEncoderMap.js
  var s2;
  var init_typeEncoderMap = __esm({
    "node_modules/cbor2/lib/typeEncoderMap.js"() {
      s2 = class {
        #e = /* @__PURE__ */ new Map();
        registerEncoder(e2, t3) {
          const n2 = this.#e.get(e2);
          return this.#e.set(e2, t3), n2;
        }
        get(e2) {
          return this.#e.get(e2);
        }
        delete(e2) {
          return this.#e.delete(e2);
        }
        clear() {
          this.#e.clear();
        }
      };
    }
  });

  // node_modules/cbor2/lib/sorts.js
  function f4(c5, d6) {
    const [u3, a4, n2] = c5, [l6, s3, t3] = d6, r2 = Math.min(n2.length, t3.length);
    for (let o5 = 0; o5 < r2; o5++) {
      const e2 = n2[o5] - t3[o5];
      if (e2 !== 0) return e2;
    }
    return 0;
  }
  var init_sorts = __esm({
    "node_modules/cbor2/lib/sorts.js"() {
    }
  });

  // node_modules/cbor2/lib/writer.js
  var e;
  var init_writer = __esm({
    "node_modules/cbor2/lib/writer.js"() {
      e = class _e {
        static defaultOptions = { chunkSize: 4096 };
        #r;
        #i = [];
        #s = null;
        #t = 0;
        #a = 0;
        constructor(t3 = {}) {
          if (this.#r = { ..._e.defaultOptions, ...t3 }, this.#r.chunkSize < 8) throw new RangeError(`Expected size >= 8, got ${this.#r.chunkSize}`);
          this.#n();
        }
        get length() {
          return this.#a;
        }
        read() {
          this.#o();
          const t3 = new Uint8Array(this.#a);
          let i = 0;
          for (const s3 of this.#i) t3.set(s3, i), i += s3.length;
          return this.#n(), t3;
        }
        write(t3) {
          const i = t3.length;
          i > this.#l() ? (this.#o(), i > this.#r.chunkSize ? (this.#i.push(t3), this.#n()) : (this.#n(), this.#i[this.#i.length - 1].set(t3), this.#t = i)) : (this.#i[this.#i.length - 1].set(t3, this.#t), this.#t += i), this.#a += i;
        }
        writeUint8(t3) {
          this.#e(1), this.#s.setUint8(this.#t, t3), this.#h(1);
        }
        writeUint16(t3, i = false) {
          this.#e(2), this.#s.setUint16(this.#t, t3, i), this.#h(2);
        }
        writeUint32(t3, i = false) {
          this.#e(4), this.#s.setUint32(this.#t, t3, i), this.#h(4);
        }
        writeBigUint64(t3, i = false) {
          this.#e(8), this.#s.setBigUint64(this.#t, t3, i), this.#h(8);
        }
        writeInt16(t3, i = false) {
          this.#e(2), this.#s.setInt16(this.#t, t3, i), this.#h(2);
        }
        writeInt32(t3, i = false) {
          this.#e(4), this.#s.setInt32(this.#t, t3, i), this.#h(4);
        }
        writeBigInt64(t3, i = false) {
          this.#e(8), this.#s.setBigInt64(this.#t, t3, i), this.#h(8);
        }
        writeFloat32(t3, i = false) {
          this.#e(4), this.#s.setFloat32(this.#t, t3, i), this.#h(4);
        }
        writeFloat64(t3, i = false) {
          this.#e(8), this.#s.setFloat64(this.#t, t3, i), this.#h(8);
        }
        clear() {
          this.#a = 0, this.#i = [], this.#n();
        }
        #n() {
          const t3 = new Uint8Array(this.#r.chunkSize);
          this.#i.push(t3), this.#t = 0, this.#s = new DataView(t3.buffer, t3.byteOffset, t3.byteLength);
        }
        #o() {
          if (this.#t === 0) {
            this.#i.pop();
            return;
          }
          const t3 = this.#i.length - 1;
          this.#i[t3] = this.#i[t3].subarray(0, this.#t), this.#t = 0, this.#s = null;
        }
        #l() {
          const t3 = this.#i.length - 1;
          return this.#i[t3].length - this.#t;
        }
        #e(t3) {
          this.#l() < t3 && (this.#o(), this.#n());
        }
        #h(t3) {
          this.#t += t3, this.#a += t3;
        }
      };
    }
  });

  // node_modules/cbor2/lib/float.js
  function U2(i, n2, e2, r2) {
    let o5 = "nan'";
    return i.quiet || (o5 += "!"), i.sign === -1 && (o5 += "-"), o5 += r2(Math.abs(i.payload), e2), o5 += "'", o5 += i.encodingIndicator, o5;
  }
  function v(i, n2 = 0, e2 = false) {
    const r2 = i[n2] & 128 ? -1 : 1, o5 = (i[n2] & 124) >> 2, t3 = (i[n2] & 3) << 8 | i[n2 + 1];
    if (o5 === 0) {
      if (e2 && t3 !== 0) throw new Error(`Unwanted subnormal: ${r2 * 5960464477539063e-23 * t3}`);
      return r2 * 5960464477539063e-23 * t3;
    } else if (o5 === 31) return t3 ? NaN : r2 * (1 / 0);
    return r2 * 2 ** (o5 - 25) * (1024 + t3);
  }
  function Z(i) {
    const n2 = new DataView(new ArrayBuffer(4));
    n2.setFloat32(0, i, false);
    const e2 = n2.getUint32(0, false);
    if ((e2 & 8191) !== 0) return null;
    let r2 = e2 >> 16 & 32768;
    const o5 = e2 >> 23 & 255, t3 = e2 & 8388607;
    if (!(o5 === 0 && t3 === 0)) if (o5 >= 113 && o5 <= 142) r2 += (o5 - 112 << 10) + (t3 >> 13);
    else if (o5 >= 103 && o5 < 113) {
      if (t3 & (1 << 126 - o5) - 1) return null;
      r2 += t3 + 8388608 >> 126 - o5;
    } else if (o5 === 255) r2 |= 31744, r2 |= t3 >> 13;
    else return null;
    return r2;
  }
  function k(i) {
    if (i !== 0) {
      const n2 = new ArrayBuffer(8), e2 = new DataView(n2);
      e2.setFloat64(0, i, false);
      const r2 = e2.getBigUint64(0, false);
      if ((r2 & 0x7ff0000000000000n) === 0n) return r2 & 0x8000000000000000n ? -0 : 0;
    }
    return i;
  }
  function B(i) {
    switch (i.length) {
      case 2:
        v(i, 0, true);
        break;
      case 4: {
        const n2 = new DataView(i.buffer, i.byteOffset, i.byteLength), e2 = n2.getUint32(0, false);
        if ((e2 & 2139095040) === 0 && e2 & 8388607) throw new Error(`Unwanted subnormal: ${n2.getFloat32(0, false)}`);
        break;
      }
      case 8: {
        const n2 = new DataView(i.buffer, i.byteOffset, i.byteLength), e2 = n2.getBigUint64(0, false);
        if ((e2 & 0x7ff0000000000000n) === 0n && e2 & 0x000fffffffffffn) throw new Error(`Unwanted subnormal: ${n2.getFloat64(0, false)}`);
        break;
      }
      default:
        throw new TypeError(`Bad input to isSubnormal: ${i}`);
    }
  }
  var w, f5, b2, d3, I2, g2, l2, A3, E, p2, N, a, c2, u2, F, _, S2, m, x2, O;
  var init_float = __esm({
    "node_modules/cbor2/lib/float.js"() {
      w = 1n << 15n;
      f5 = 0b11111n << 10n;
      b2 = 1n << 9n;
      d3 = b2 - 1n;
      I2 = b2 | d3;
      g2 = 1n << 31n;
      l2 = 0b11111111n << 23n;
      A3 = 1n << 22n;
      E = A3 - 1n;
      p2 = A3 | E;
      N = 1n << 63n;
      a = 0b11111111111n << 52n;
      c2 = 1n << 51n;
      u2 = c2 - 1n;
      F = c2 | u2;
      _ = u2 - (d3 << 42n);
      S2 = u2 - (E << 29n);
      m = { 2: "0b", 8: "0o", 16: "0x" };
      x2 = ((t3) => (t3[t3.NATURAL = -2] = "NATURAL", t3[t3.UNKNOWN = -1] = "UNKNOWN", t3[t3.F16 = 2] = "F16", t3[t3.F32 = 4] = "F32", t3[t3.F64 = 8] = "F64", t3))(x2 || {});
      O = class extends Number {
        #n;
        #t = -1;
        constructor(n2, e2 = true, r2 = -1) {
          super(NaN);
          const o5 = n2;
          if (typeof n2 == "number") {
            if (!Number.isSafeInteger(n2)) throw new Error(`Invalid NAN payload: ${n2}`);
            n2 = BigInt(n2);
            let t3 = 0n;
            if (n2 < 0 && (t3 = N, n2 = -n2), n2 >= c2) throw new Error(`Payload too large: ${o5}`);
            const s3 = e2 ? c2 : 0n;
            switch (this.#n = t3 | a | s3 | n2, r2) {
              case -2:
                throw new Error("NAN_SIZE.NATURAL only valid for bigint constructor");
              case -1:
                r2 = this.preferredSize;
                break;
              case 2:
                if (this.#n & _) throw new Error("Invalid size for payload");
                break;
              case 4:
                if (this.#n & S2) throw new Error("Invalid size for payload");
                break;
              case 8:
                break;
              default:
                throw new Error(`Invalid size: ${r2}`);
            }
            this.#t = r2;
          } else if (typeof n2 == "bigint") {
            let t3 = -1;
            if ((n2 & a) === a) this.#n = n2, t3 = 8;
            else if ((n2 & l2) === l2) {
              const s3 = (n2 & g2) << 32n;
              this.#n = s3 | a | (n2 & p2) << 29n, t3 = 4;
            } else if ((n2 & f5) === f5) {
              const s3 = (n2 & w) << 48n;
              this.#n = s3 | a | (n2 & I2) << 42n, t3 = 2;
            } else throw new Error(`Invalid raw NaN value: ${n2}`);
            if (r2 === -1) this.#t = this.preferredSize;
            else if (r2 === -2) this.#t = t3;
            else {
              if (r2 < t3) throw new Error("Invalid bigint NaN size");
              this.#t = r2;
            }
          } else {
            const t3 = new DataView(n2.buffer, n2.byteOffset, n2.byteLength);
            switch (n2.length) {
              case 3: {
                if (n2[0] !== 249) throw new Error("Invalid CBOR encoding for half float");
                const s3 = BigInt(t3.getUint16(1, false));
                if ((s3 & f5) !== f5) throw new Error("Not a NaN");
                const h4 = (s3 & w) << 48n;
                this.#n = h4 | a | (s3 & I2) << 42n, this.#t = 2;
                break;
              }
              case 5: {
                if (n2[0] !== 250) throw new Error("Invalid CBOR encoding for single float");
                const s3 = BigInt(t3.getUint32(1, false));
                if ((s3 & l2) !== l2) throw new Error("Not a NaN");
                const h4 = (s3 & g2) << 32n;
                this.#n = h4 | a | (s3 & p2) << 29n, this.#t = 4;
                break;
              }
              case 9: {
                if (n2[0] !== 251) throw new Error("Invalid CBOR encoding for double float");
                if (this.#n = t3.getBigUint64(1, false), (this.#n & a) !== a) throw new Error("Not a NaN (NaNaN)");
                this.#t = 8;
                break;
              }
              default:
                throw new RangeError(`Invalid NAN size (should be 2, 4, or 8): ${n2.length - 1}`);
            }
          }
          if (!this.payload && !this.quiet) throw new Error("Signalling NaN with zero payload");
        }
        get bytes() {
          const n2 = new ArrayBuffer(this.#t + 1), e2 = new DataView(n2);
          switch (this.#t) {
            case 2: {
              e2.setUint8(0, 249);
              const o5 = (this.#n & N ? w : 0n) | f5 | (this.#n & F) >> 42n;
              e2.setUint16(1, Number(o5), false);
              break;
            }
            case 4: {
              e2.setUint8(0, 250);
              const o5 = (this.#n & N ? g2 : 0n) | l2 | (this.#n & F) >> 29n;
              e2.setUint32(1, Number(o5), false);
              break;
            }
            case 8:
              e2.setUint8(0, 251), e2.setBigUint64(1, this.#n);
              break;
          }
          return new Uint8Array(n2);
        }
        get quiet() {
          return !!(this.#n & c2);
        }
        get sign() {
          return this.#n & N ? -1 : 1;
        }
        get payload() {
          return Number(this.#n & u2) * this.sign;
        }
        get raw() {
          return this.#n;
        }
        get encodingIndicator() {
          switch (this.#t) {
            case 2:
              return "_1";
            case 4:
              return "_2";
          }
          return "_3";
        }
        get size() {
          return this.#t;
        }
        get preferredSize() {
          return (this.#n & _) === 0n ? 2 : (this.#n & S2) === 0n ? 4 : 8;
        }
        get isShortestEncoding() {
          return this.preferredSize === this.#t;
        }
        toCBOR(n2) {
          n2.write(this.bytes);
        }
        toString(n2 = 10) {
          return U2(this, 1, {}, (e2) => (m[n2] ?? "") + e2.toString(n2));
        }
        [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](n2, e2, r2) {
          return U2(this, n2, e2, r2);
        }
      };
    }
  });

  // node_modules/@cto.af/wtf8/lib/errors.js
  var DecodeError, InvalidEncodingError;
  var init_errors = __esm({
    "node_modules/@cto.af/wtf8/lib/errors.js"() {
      DecodeError = class extends TypeError {
        code = "ERR_ENCODING_INVALID_ENCODED_DATA";
        constructor() {
          super("The encoded data was not valid for encoding wtf-8");
        }
      };
      InvalidEncodingError = class extends RangeError {
        code = "ERR_ENCODING_NOT_SUPPORTED";
        constructor(label) {
          super(`Invalid encoding: "${label}"`);
        }
      };
    }
  });

  // node_modules/@cto.af/wtf8/lib/const.js
  var BOM, EMPTY, MIN_HIGH_SURROGATE, MIN_LOW_SURROGATE, REPLACEMENT, WTF8;
  var init_const = __esm({
    "node_modules/@cto.af/wtf8/lib/const.js"() {
      BOM = 65279;
      EMPTY = new Uint8Array(0);
      MIN_HIGH_SURROGATE = 55296;
      MIN_LOW_SURROGATE = 56320;
      REPLACEMENT = 65533;
      WTF8 = "wtf-8";
    }
  });

  // node_modules/@cto.af/wtf8/lib/decode.js
  function isArrayBufferView(input) {
    return input && typeof input === "object" && !(input instanceof ArrayBuffer) && !(input instanceof SharedArrayBuffer) && input.buffer instanceof ArrayBuffer;
  }
  function getUint8(input) {
    if (!input) {
      return EMPTY;
    }
    if (input instanceof Uint8Array) {
      return input;
    }
    if (isArrayBufferView(input)) {
      return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    }
    return new Uint8Array(input);
  }
  var REMAINDER, Wtf8Decoder;
  var init_decode = __esm({
    "node_modules/@cto.af/wtf8/lib/decode.js"() {
      init_const();
      init_errors();
      REMAINDER = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -1,
        -1,
        -1,
        -1,
        1,
        1,
        2,
        3
      ];
      Wtf8Decoder = class _Wtf8Decoder {
        static DEFAULT_BUFFERSIZE = 4096;
        encoding = WTF8;
        fatal;
        ignoreBOM;
        bufferSize;
        #left = 0;
        #cur = 0;
        #pending = 0;
        #first = true;
        #buf;
        constructor(label = "wtf8", options = void 0) {
          if (label.toLowerCase().replace("-", "") !== "wtf8") {
            throw new InvalidEncodingError(label);
          }
          this.fatal = Boolean(options?.fatal);
          this.ignoreBOM = Boolean(options?.ignoreBOM);
          this.bufferSize = Math.floor(options?.bufferSize ?? _Wtf8Decoder.DEFAULT_BUFFERSIZE);
          if (isNaN(this.bufferSize) || this.bufferSize < 1) {
            throw new RangeError(`Invalid buffer size: ${options?.bufferSize}`);
          }
          this.#buf = new Uint16Array(this.bufferSize);
        }
        decode(input, options) {
          const streaming = Boolean(options?.stream);
          const bytes = getUint8(input);
          const res = [];
          const out = this.#buf;
          const maxSize = this.bufferSize - 3;
          let pos = 0;
          const fatal = () => {
            this.#cur = 0;
            this.#left = 0;
            this.#pending = 0;
            if (this.fatal) {
              throw new DecodeError();
            }
            out[pos++] = REPLACEMENT;
          };
          const fatals = () => {
            const p5 = this.#pending;
            for (let i = 0; i < p5; i++) {
              fatal();
            }
          };
          const oneByte = (b5) => {
            if (this.#left === 0) {
              const n2 = REMAINDER[b5 >> 4];
              switch (n2) {
                case -1:
                  fatal();
                  break;
                case 0:
                  out[pos++] = b5;
                  break;
                case 1:
                  this.#cur = b5 & 31;
                  if ((this.#cur & 30) === 0) {
                    fatal();
                  } else {
                    this.#left = 1;
                    this.#pending = 1;
                  }
                  break;
                case 2:
                  this.#cur = b5 & 15;
                  this.#left = 2;
                  this.#pending = 1;
                  break;
                case 3:
                  if (b5 & 8) {
                    fatal();
                  } else {
                    this.#cur = b5 & 7;
                    this.#left = 3;
                    this.#pending = 1;
                  }
                  break;
              }
            } else {
              if ((b5 & 192) !== 128) {
                fatals();
                return oneByte(b5);
              }
              if (this.#pending === 1 && this.#left === 2 && this.#cur === 0 && (b5 & 32) === 0) {
                fatals();
                return oneByte(b5);
              }
              if (this.#left === 3 && this.#cur === 0 && (b5 & 48) === 0) {
                fatals();
                return oneByte(b5);
              }
              this.#cur = this.#cur << 6 | b5 & 63;
              this.#pending++;
              if (--this.#left === 0) {
                if (this.ignoreBOM || !this.#first || this.#cur !== BOM) {
                  if (this.#cur < 65536) {
                    out[pos++] = this.#cur;
                  } else {
                    const cp = this.#cur - 65536;
                    out[pos++] = cp >>> 10 & 1023 | MIN_HIGH_SURROGATE;
                    out[pos++] = cp & 1023 | MIN_LOW_SURROGATE;
                  }
                }
                this.#cur = 0;
                this.#pending = 0;
                this.#first = false;
              }
            }
          };
          for (const b5 of bytes) {
            if (pos >= maxSize) {
              res.push(String.fromCharCode.apply(null, out.subarray(0, pos)));
              pos = 0;
            }
            oneByte(b5);
          }
          if (!streaming) {
            this.#first = true;
            if (this.#cur || this.#left) {
              fatals();
            }
          }
          if (pos > 0) {
            res.push(String.fromCharCode.apply(null, out.subarray(0, pos)));
          }
          return res.join("");
        }
      };
    }
  });

  // node_modules/@cto.af/wtf8/lib/encode.js
  function utf8length(str) {
    let len = 0;
    for (const s3 of str) {
      const cp = s3.codePointAt(0);
      if (cp < 128) {
        len++;
      } else if (cp < 2048) {
        len += 2;
      } else if (cp < 65536) {
        len += 3;
      } else {
        len += 4;
      }
    }
    return len;
  }
  var Wtf8Encoder;
  var init_encode = __esm({
    "node_modules/@cto.af/wtf8/lib/encode.js"() {
      init_const();
      Wtf8Encoder = class {
        encoding = WTF8;
        encode(input) {
          if (!input) {
            return EMPTY;
          }
          const buf = new Uint8Array(utf8length(String(input)));
          this.encodeInto(input, buf);
          return buf;
        }
        encodeInto(source, destination) {
          const str = String(source);
          const len = str.length;
          const outLen = destination.length;
          let written = 0;
          let read = 0;
          for (read = 0; read < len; read++) {
            const c5 = str.codePointAt(read);
            if (c5 < 128) {
              if (written >= outLen) {
                break;
              }
              destination[written++] = c5;
            } else if (c5 < 2048) {
              if (written >= outLen - 1) {
                break;
              }
              destination[written++] = 192 | c5 >> 6;
              destination[written++] = 128 | c5 & 63;
            } else if (c5 < 65536) {
              if (written >= outLen - 2) {
                break;
              }
              destination[written++] = 224 | c5 >> 12;
              destination[written++] = 128 | c5 >> 6 & 63;
              destination[written++] = 128 | c5 & 63;
            } else {
              if (written >= outLen - 3) {
                break;
              }
              destination[written++] = 240 | c5 >> 18;
              destination[written++] = 128 | c5 >> 12 & 63;
              destination[written++] = 128 | c5 >> 6 & 63;
              destination[written++] = 128 | c5 & 63;
              read++;
            }
          }
          return {
            read,
            written
          };
        }
      };
    }
  });

  // node_modules/@cto.af/wtf8/lib/decodeStream.js
  var init_decodeStream = __esm({
    "node_modules/@cto.af/wtf8/lib/decodeStream.js"() {
      init_decode();
    }
  });

  // node_modules/@cto.af/wtf8/lib/encodeStream.js
  var init_encodeStream = __esm({
    "node_modules/@cto.af/wtf8/lib/encodeStream.js"() {
      init_const();
      init_encode();
    }
  });

  // node_modules/@cto.af/wtf8/lib/index.js
  var init_lib = __esm({
    "node_modules/@cto.af/wtf8/lib/index.js"() {
      init_errors();
      init_decode();
      init_encode();
      init_decodeStream();
      init_encodeStream();
    }
  });

  // node_modules/cbor2/lib/encoder.js
  function y2(e2) {
    const n2 = e2 < 0;
    return typeof e2 == "bigint" ? [n2 ? -e2 - 1n : e2, n2] : [n2 ? -e2 - 1 : e2, n2];
  }
  function N2(e2, n2, i) {
    if (i.rejectFloats) throw new Error(`Attempt to encode an unwanted floating point number: ${e2}`);
    if (isNaN(e2)) n2.writeUint8(U3), n2.writeUint16(32256);
    else if (!i.float64 && Math.fround(e2) === e2) {
      const r2 = Z(e2);
      r2 === null ? (n2.writeUint8(h2), n2.writeFloat32(e2)) : (n2.writeUint8(U3), n2.writeUint16(r2));
    } else n2.writeUint8(B2), n2.writeFloat64(e2);
  }
  function a2(e2, n2, i) {
    const [r2, t3] = y2(e2);
    if (t3 && i) throw new TypeError(`Negative size: ${e2}`);
    i ??= t3 ? f.NEG_INT : f.POS_INT, i <<= 5, r2 < 24 ? n2.writeUint8(i | r2) : r2 <= 255 ? (n2.writeUint8(i | I.ONE), n2.writeUint8(r2)) : r2 <= 65535 ? (n2.writeUint8(i | I.TWO), n2.writeUint16(r2)) : r2 <= 4294967295 ? (n2.writeUint8(i | I.FOUR), n2.writeUint32(r2)) : (n2.writeUint8(i | I.EIGHT), n2.writeBigUint64(BigInt(r2)));
  }
  function m2(e2, n2, i) {
    typeof e2 == "number" ? a2(e2, n2, f.TAG) : typeof e2 == "object" && !i.ignoreOriginalEncoding && A.ENCODED in e2 ? n2.write(e2[A.ENCODED]) : e2 <= Number.MAX_SAFE_INTEGER ? a2(Number(e2), n2, f.TAG) : (n2.writeUint8(f.TAG << 5 | I.EIGHT), n2.writeBigUint64(BigInt(e2)));
  }
  function O2(e2, n2, i) {
    const [r2, t3] = y2(e2);
    if (i.collapseBigInts && (!i.largeNegativeAsBigInt || e2 >= -0x8000000000000000n)) {
      if (r2 <= 0xffffffffn) {
        a2(Number(e2), n2);
        return;
      }
      if (r2 <= 0xffffffffffffffffn) {
        const l6 = (t3 ? f.NEG_INT : f.POS_INT) << 5;
        n2.writeUint8(l6 | I.EIGHT), n2.writeBigUint64(r2);
        return;
      }
    }
    if (i.rejectBigInts) throw new Error(`Attempt to encode unwanted bigint: ${e2}`);
    const o5 = t3 ? T.NEG_BIGINT : T.POS_BIGINT, c5 = r2.toString(16), s3 = c5.length % 2 ? "0" : "";
    m2(o5, n2, i);
    const u3 = b(s3 + c5);
    a2(u3.length, n2, f.BYTE_STRING), n2.write(u3);
  }
  function Z2(e2, n2, i) {
    i.flushToZero && (e2 = k(e2)), Object.is(e2, -0) ? i.simplifyNegativeZero ? i.avoidInts ? N2(0, n2, i) : a2(0, n2) : N2(e2, n2, i) : !i.avoidInts && Number.isSafeInteger(e2) ? a2(e2, n2) : i.reduceUnsafeNumbers && Math.floor(e2) === e2 && e2 >= S.MIN && e2 <= S.MAX ? O2(BigInt(e2), n2, i) : N2(e2, n2, i);
  }
  function R2(e2, n2, i) {
    const r2 = i.stringNormalization ? e2.normalize(i.stringNormalization) : e2;
    if (i.wtf8 && !e2.isWellFormed()) {
      const t3 = K.encode(r2);
      m2(T.WTF8, n2, i), a2(t3.length, n2, f.BYTE_STRING), n2.write(t3);
    } else {
      const t3 = H.encode(r2);
      a2(t3.length, n2, f.UTF8_STRING), n2.write(t3);
    }
  }
  function J(e2, n2, i) {
    const r2 = e2;
    L(r2, r2.length, f.ARRAY, n2, i);
    for (const t3 of r2) g3(t3, n2, i);
  }
  function V(e2, n2) {
    a2(e2.length, n2, f.BYTE_STRING), n2.write(e2);
  }
  function ue(e2, n2) {
    return b3.registerEncoder(e2, n2);
  }
  function L(e2, n2, i, r2, t3) {
    const o5 = s(e2);
    o5 && !t3.ignoreOriginalEncoding ? r2.write(o5) : a2(n2, r2, i);
  }
  function X(e2, n2, i) {
    if (e2 === null) {
      n2.writeUint8(z);
      return;
    }
    if (!i.ignoreOriginalEncoding && A.ENCODED in e2) {
      n2.write(e2[A.ENCODED]);
      return;
    }
    const r2 = e2.constructor;
    if (r2) {
      const o5 = i.types?.get(r2) ?? (i.ignoreGlobalTags ? void 0 : b3.get(r2));
      if (o5) {
        const c5 = o5(e2, n2, i);
        if (c5 !== void 0) {
          if (!Array.isArray(c5) || c5.length !== 2) throw new Error("Invalid encoder return value");
          (typeof c5[0] == "bigint" || isFinite(Number(c5[0]))) && m2(c5[0], n2, i), g3(c5[1], n2, i);
        }
        return;
      }
    }
    if (typeof e2.toCBOR == "function") {
      const o5 = e2.toCBOR(n2, i);
      o5 && ((typeof o5[0] == "bigint" || isFinite(Number(o5[0]))) && m2(o5[0], n2, i), g3(o5[1], n2, i));
      return;
    }
    if (typeof e2.toJSON == "function") {
      g3(e2.toJSON(), n2, i);
      return;
    }
    const t3 = Object.entries(e2).map((o5) => [o5[0], o5[1], v2(o5[0], i)]);
    i.sortKeys && t3.sort(i.sortKeys), L(e2, t3.length, f.MAP, n2, i);
    for (const [o5, c5, s3] of t3) n2.write(s3), g3(c5, n2, i);
  }
  function Q(e2, n2, i) {
    if (!e2.description || e2 !== Symbol.for(e2.description)) throw new TypeError(`Private or empty symbol: ${e2.toString()}`);
    m2(280, n2, i), R2(e2.description, n2, i);
  }
  function g3(e2, n2, i) {
    switch (typeof e2) {
      case "number":
        Z2(e2, n2, i);
        break;
      case "bigint":
        O2(e2, n2, i);
        break;
      case "string":
        R2(e2, n2, i);
        break;
      case "boolean":
        n2.writeUint8(e2 ? j : q);
        break;
      case "undefined":
        if (i.rejectUndefined) throw new Error("Attempt to encode unwanted undefined.");
        n2.writeUint8($);
        break;
      case "object":
        X(e2, n2, i);
        break;
      case "symbol":
        Q(e2, n2, i);
        break;
      default:
        throw new TypeError(`Unknown type: ${typeof e2}, ${String(e2)}`);
    }
  }
  function v2(e2, n2 = {}) {
    const i = { ...k2 };
    n2.dcbor ? Object.assign(i, Y) : n2.cde && Object.assign(i, F2), Object.assign(i, n2);
    const r2 = new e(i);
    return g3(e2, r2, i), r2.read();
  }
  var ce, U3, h2, B2, j, q, $, z, H, K, k2, F2, Y, b3;
  var init_encoder = __esm({
    "node_modules/cbor2/lib/encoder.js"() {
      init_typeEncoderMap();
      init_constants();
      init_sorts();
      init_writer();
      init_box();
      init_float();
      init_lib();
      init_utils();
      ({ ENCODED: ce } = A);
      U3 = f.SIMPLE_FLOAT << 5 | I.TWO;
      h2 = f.SIMPLE_FLOAT << 5 | I.FOUR;
      B2 = f.SIMPLE_FLOAT << 5 | I.EIGHT;
      j = f.SIMPLE_FLOAT << 5 | o.TRUE;
      q = f.SIMPLE_FLOAT << 5 | o.FALSE;
      $ = f.SIMPLE_FLOAT << 5 | o.UNDEFINED;
      z = f.SIMPLE_FLOAT << 5 | o.NULL;
      H = new TextEncoder();
      K = new Wtf8Encoder();
      k2 = { ...e.defaultOptions, avoidInts: false, cde: false, collapseBigInts: true, dateTag: T.DATE_EPOCH, dcbor: false, float64: false, flushToZero: false, forceEndian: null, ignoreOriginalEncoding: false, largeNegativeAsBigInt: false, reduceUnsafeNumbers: false, rejectBigInts: false, rejectCustomSimples: false, rejectDuplicateKeys: false, rejectFloats: false, rejectUndefined: false, simplifyNegativeZero: false, sortKeys: null, stringNormalization: null, types: null, wtf8: false, ignoreGlobalTags: false };
      F2 = { cde: true, ignoreOriginalEncoding: true, sortKeys: f4 };
      Y = { ...F2, dcbor: true, largeNegativeAsBigInt: true, reduceUnsafeNumbers: true, rejectCustomSimples: true, rejectDuplicateKeys: true, rejectUndefined: true, simplifyNegativeZero: true, stringNormalization: "NFC" };
      b3 = new s2();
      b3.registerEncoder(Array, J), b3.registerEncoder(Uint8Array, V);
    }
  });

  // node_modules/cbor2/lib/options.js
  var o3;
  var init_options = __esm({
    "node_modules/cbor2/lib/options.js"() {
      o3 = ((e2) => (e2[e2.NEVER = -1] = "NEVER", e2[e2.PREFERRED = 0] = "PREFERRED", e2[e2.ALWAYS = 1] = "ALWAYS", e2))(o3 || {});
    }
  });

  // node_modules/cbor2/lib/simple.js
  var t;
  var init_simple = __esm({
    "node_modules/cbor2/lib/simple.js"() {
      init_constants();
      init_encoder();
      t = class _t {
        static KnownSimple = /* @__PURE__ */ new Map([[o.FALSE, false], [o.TRUE, true], [o.NULL, null], [o.UNDEFINED, void 0]]);
        value;
        constructor(e2) {
          this.value = e2;
        }
        static create(e2) {
          return _t.KnownSimple.has(e2) ? _t.KnownSimple.get(e2) : new _t(e2);
        }
        toCBOR(e2, i) {
          if (i.rejectCustomSimples) throw new Error(`Cannot encode non-standard Simple value: ${this.value}`);
          a2(this.value, e2, f.SIMPLE_FLOAT);
        }
        toString() {
          return `simple(${this.value})`;
        }
        decode() {
          return _t.KnownSimple.has(this.value) ? _t.KnownSimple.get(this.value) : this;
        }
        [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](e2, i, r2) {
          return `simple(${r2(this.value, i)})`;
        }
      };
    }
  });

  // node_modules/cbor2/lib/decodeStream.js
  var p3, y3;
  var init_decodeStream2 = __esm({
    "node_modules/cbor2/lib/decodeStream.js"() {
      init_constants();
      init_utils();
      init_simple();
      init_float();
      p3 = new TextDecoder("utf8", { fatal: true, ignoreBOM: true });
      y3 = class _y {
        static defaultOptions = { maxDepth: 1024, encoding: "hex", requirePreferred: false };
        #t;
        #r;
        #e = 0;
        #i;
        constructor(t3, r2) {
          if (this.#i = { ..._y.defaultOptions, ...r2 }, typeof t3 == "string") switch (this.#i.encoding) {
            case "hex":
              this.#t = b(t3);
              break;
            case "base64":
              this.#t = y(t3);
              break;
            default:
              throw new TypeError(`Encoding not implemented: "${this.#i.encoding}"`);
          }
          else this.#t = t3;
          this.#r = new DataView(this.#t.buffer, this.#t.byteOffset, this.#t.byteLength);
        }
        toHere(t3) {
          return R(this.#t, t3, this.#e);
        }
        *[Symbol.iterator]() {
          if (yield* this.#n(0), this.#e !== this.#t.length) throw new Error("Extra data in input");
        }
        *seq() {
          for (; this.#e < this.#t.length; ) yield* this.#n(0);
        }
        *#n(t3) {
          if (t3++ > this.#i.maxDepth) throw new Error(`Maximum depth ${this.#i.maxDepth} exceeded`);
          const r2 = this.#e, c5 = this.#r.getUint8(this.#e++), i = c5 >> 5, n2 = c5 & 31;
          let e2 = n2, f7 = false, a4 = 0;
          switch (n2) {
            case I.ONE:
              if (a4 = 1, e2 = this.#r.getUint8(this.#e), i === f.SIMPLE_FLOAT) {
                if (e2 < 32) throw new Error(`Invalid simple encoding in extra byte: ${e2}`);
                f7 = true;
              } else if (this.#i.requirePreferred && e2 < 24) throw new Error(`Unexpectedly long integer encoding (1) for ${e2}`);
              break;
            case I.TWO:
              if (a4 = 2, i === f.SIMPLE_FLOAT) e2 = v(this.#t, this.#e);
              else if (e2 = this.#r.getUint16(this.#e, false), this.#i.requirePreferred && e2 <= 255) throw new Error(`Unexpectedly long integer encoding (2) for ${e2}`);
              break;
            case I.FOUR:
              if (a4 = 4, i === f.SIMPLE_FLOAT) e2 = this.#r.getFloat32(this.#e, false);
              else if (e2 = this.#r.getUint32(this.#e, false), this.#i.requirePreferred && e2 <= 65535) throw new Error(`Unexpectedly long integer encoding (4) for ${e2}`);
              break;
            case I.EIGHT: {
              if (a4 = 8, i === f.SIMPLE_FLOAT) e2 = this.#r.getFloat64(this.#e, false);
              else if (e2 = this.#r.getBigUint64(this.#e, false), e2 <= Number.MAX_SAFE_INTEGER && (e2 = Number(e2)), this.#i.requirePreferred && e2 <= 4294967295) throw new Error(`Unexpectedly long integer encoding (8) for ${e2}`);
              break;
            }
            case 28:
            case 29:
            case 30:
              throw new Error(`Additional info not implemented: ${n2}`);
            case I.INDEFINITE:
              switch (i) {
                case f.POS_INT:
                case f.NEG_INT:
                case f.TAG:
                  throw new Error(`Invalid indefinite encoding for MT ${i}`);
                case f.SIMPLE_FLOAT:
                  yield [i, n2, A.BREAK, r2, 0];
                  return;
              }
              e2 = 1 / 0;
              break;
            default:
              f7 = true;
          }
          switch (this.#e += a4, i) {
            case f.POS_INT:
              yield [i, n2, e2, r2, a4];
              break;
            case f.NEG_INT:
              yield [i, n2, typeof e2 == "bigint" ? -1n - e2 : -1 - Number(e2), r2, a4];
              break;
            case f.BYTE_STRING:
              e2 === 1 / 0 ? yield* this.#s(i, t3, r2) : yield [i, n2, this.#a(e2), r2, e2];
              break;
            case f.UTF8_STRING:
              e2 === 1 / 0 ? yield* this.#s(i, t3, r2) : yield [i, n2, p3.decode(this.#a(e2)), r2, e2];
              break;
            case f.ARRAY:
              if (e2 === 1 / 0) yield* this.#s(i, t3, r2, false);
              else {
                const o5 = Number(e2);
                yield [i, n2, o5, r2, a4];
                for (let h4 = 0; h4 < o5; h4++) yield* this.#n(t3 + 1);
              }
              break;
            case f.MAP:
              if (e2 === 1 / 0) yield* this.#s(i, t3, r2, false);
              else {
                const o5 = Number(e2);
                yield [i, n2, o5, r2, a4];
                for (let h4 = 0; h4 < o5; h4++) yield* this.#n(t3), yield* this.#n(t3);
              }
              break;
            case f.TAG:
              yield [i, n2, e2, r2, a4], yield* this.#n(t3);
              break;
            case f.SIMPLE_FLOAT: {
              const o5 = e2;
              f7 && (e2 = t.create(Number(e2))), yield [i, n2, e2, r2, o5];
              break;
            }
          }
        }
        #a(t3) {
          const r2 = R(this.#t, this.#e, this.#e += t3);
          if (r2.length !== t3) throw new Error(`Unexpected end of stream reading ${t3} bytes, got ${r2.length}`);
          return r2;
        }
        *#s(t3, r2, c5, i = true) {
          for (yield [t3, I.INDEFINITE, 1 / 0, c5, 1 / 0]; ; ) {
            const n2 = this.#n(r2), e2 = n2.next(), [f7, a4, o5] = e2.value;
            if (o5 === A.BREAK) {
              yield e2.value, n2.next();
              return;
            }
            if (i) {
              if (f7 !== t3) throw new Error(`Unmatched major type.  Expected ${t3}, got ${f7}.`);
              if (a4 === I.INDEFINITE) throw new Error("New stream started in typed stream");
            }
            yield e2.value, yield* n2;
          }
        }
      };
    }
  });

  // node_modules/cbor2/lib/container.js
  function F3(h4, r2) {
    return !r2.boxed && !r2.preferMap && h4.every(([i]) => typeof i == "string") ? Object.fromEntries(h4) : new Map(h4);
  }
  var A4, R3, y4;
  var init_container = __esm({
    "node_modules/cbor2/lib/container.js"() {
      init_constants();
      init_options();
      init_sorts();
      init_float();
      init_box();
      init_encoder();
      init_utils();
      init_decodeStream2();
      init_simple();
      init_tag();
      A4 = /* @__PURE__ */ new Map([[I.ZERO, 1], [I.ONE, 2], [I.TWO, 3], [I.FOUR, 5], [I.EIGHT, 9]]);
      R3 = new Uint8Array(0);
      y4 = class _y {
        static defaultDecodeOptions = { ...y3.defaultOptions, ParentType: _y, boxed: false, cde: false, dcbor: false, diagnosticSizes: o3.PREFERRED, collapseBigInts: false, convertUnsafeIntsToFloat: false, createObject: F3, keepNanPayloads: false, pretty: false, preferBigInt: false, preferMap: false, rejectLargeNegatives: false, rejectBigInts: false, rejectDuplicateKeys: false, rejectFloats: false, rejectInts: false, rejectLongLoundNaN: false, rejectLongFloats: false, rejectNegativeZero: false, rejectSimple: false, rejectStreaming: false, rejectStringsNotNormalizedAs: null, rejectSubnormals: false, rejectUndefined: false, rejectUnsafeFloatInts: false, saveOriginal: false, sortKeys: null, tags: null, ignoreGlobalTags: false };
        static cdeDecodeOptions = { cde: true, rejectStreaming: true, requirePreferred: true, sortKeys: f4 };
        static dcborDecodeOptions = { ...this.cdeDecodeOptions, dcbor: true, convertUnsafeIntsToFloat: true, rejectDuplicateKeys: true, rejectLargeNegatives: true, rejectLongLoundNaN: true, rejectLongFloats: true, rejectNegativeZero: true, rejectSimple: true, rejectUndefined: true, rejectUnsafeFloatInts: true, rejectStringsNotNormalizedAs: "NFC" };
        parent;
        mt;
        ai;
        left;
        offset;
        count = 0;
        children = [];
        depth = 0;
        #e;
        #t = null;
        constructor(r2, i, e2, t3) {
          if ([this.mt, this.ai, , this.offset] = r2, this.left = i, this.parent = e2, this.#e = t3, e2 && (this.depth = e2.depth + 1), this.mt === f.MAP && (this.#e.sortKeys || this.#e.rejectDuplicateKeys) && (this.#t = []), this.#e.rejectStreaming && this.ai === I.INDEFINITE) throw new Error("Streaming not supported");
        }
        get isStreaming() {
          return this.left === 1 / 0;
        }
        get done() {
          return this.left === 0;
        }
        static create(r2, i, e2, t3) {
          const [s3, u3, n2, c5] = r2;
          switch (s3) {
            case f.POS_INT:
            case f.NEG_INT: {
              if (e2.rejectInts) throw new Error(`Unexpected integer: ${n2}`);
              if (e2.rejectLargeNegatives && n2 < -0x8000000000000000n) throw new Error(`Invalid 65bit negative number: ${n2}`);
              let o5 = n2;
              return e2.preferBigInt ? o5 = BigInt(o5) : e2.convertUnsafeIntsToFloat && o5 >= S.MIN && o5 <= S.MAX && (o5 = Number(n2)), e2.boxed ? d(o5, t3.toHere(c5)) : o5;
            }
            case f.SIMPLE_FLOAT:
              if (u3 > I.ONE) {
                if (typeof n2 == "symbol") return n2;
                if (e2.rejectFloats) throw new Error(`Decoding unwanted floating point number: ${n2}`);
                if (e2.rejectNegativeZero && Object.is(n2, -0)) throw new Error("Decoding negative zero");
                if (isNaN(n2)) {
                  const o5 = t3.toHere(c5), f7 = new O(o5);
                  if (e2.rejectLongLoundNaN) {
                    if (f7.payload || o5.length > 3) throw new Error(`Invalid NaN encoding: "${A2(o5)}"`);
                  } else if (e2.keepNanPayloads && (f7.payload || f7.sign === -1)) {
                    if (e2.rejectLongFloats && !f7.isShortestEncoding) throw new Error(`NaN should have been encoded shorter: ${n2}`);
                    return f7;
                  }
                }
                if (e2.rejectSubnormals && B(t3.toHere(c5 + 1)), e2.rejectLongFloats) {
                  const o5 = v2(n2, { chunkSize: 9, reduceUnsafeNumbers: e2.rejectUnsafeFloatInts });
                  if (o5[0] >> 5 !== s3) throw new Error(`Should have been encoded as int, not float: ${n2}`);
                  if (o5.length < A4.get(u3)) throw new Error(`Number should have been encoded shorter: ${n2}`);
                }
                if (typeof n2 == "number" && e2.boxed) return d(n2, t3.toHere(c5));
              } else {
                if (e2.rejectSimple && n2 instanceof t) throw new Error(`Invalid simple value: ${n2}`);
                if (e2.rejectUndefined && n2 === void 0) throw new Error("Unexpected undefined");
              }
              return n2;
            case f.BYTE_STRING:
            case f.UTF8_STRING:
              if (n2 === 1 / 0) return new e2.ParentType(r2, 1 / 0, i, e2);
              if (e2.rejectStringsNotNormalizedAs && typeof n2 == "string") {
                const o5 = n2.normalize(e2.rejectStringsNotNormalizedAs);
                if (n2 !== o5) throw new Error(`String not normalized as "${e2.rejectStringsNotNormalizedAs}", got [${U(n2)}] instead of [${U(o5)}]`);
              }
              return e2.boxed ? d(n2, t3.toHere(c5)) : n2;
            case f.ARRAY:
              return new e2.ParentType(r2, n2, i, e2);
            case f.MAP:
              return new e2.ParentType(r2, n2 * 2, i, e2);
            case f.TAG: {
              const o5 = new e2.ParentType(r2, 1, i, e2);
              return o5.children = new o2(n2), o5;
            }
          }
          throw new TypeError(`Invalid major type: ${s3}`);
        }
        static decodeToEncodeOpts(r2) {
          return { ...k2, avoidInts: r2.rejectInts, float64: !r2.rejectLongFloats, flushToZero: r2.rejectSubnormals, largeNegativeAsBigInt: r2.rejectLargeNegatives, sortKeys: r2.sortKeys };
        }
        push(r2, i, e2) {
          if (this.children.push(r2), this.#t) {
            const t3 = f2(r2) || i.toHere(e2);
            this.#t.push(t3);
          }
          return --this.left;
        }
        replaceLast(r2, i, e2) {
          let t3, s3 = -1 / 0;
          if (this.children instanceof o2 ? (s3 = 0, t3 = this.children.contents, this.children.contents = r2) : (s3 = this.children.length - 1, t3 = this.children[s3], this.children[s3] = r2), this.#t) {
            const u3 = f2(r2) || e2.toHere(i.offset);
            this.#t[s3] = u3;
          }
          return t3;
        }
        convert(r2) {
          let i;
          switch (this.mt) {
            case f.ARRAY:
              i = this.children;
              break;
            case f.MAP: {
              const e2 = this.#r();
              if (this.#e.sortKeys) {
                let t3;
                for (const s3 of e2) {
                  if (t3 && this.#e.sortKeys(t3, s3) >= 0) throw new Error(`Duplicate or out of order key: "0x${s3[2]}"`);
                  t3 = s3;
                }
              } else if (this.#e.rejectDuplicateKeys) {
                const t3 = /* @__PURE__ */ new Set();
                for (const [s3, u3, n2] of e2) {
                  const c5 = A2(n2);
                  if (t3.has(c5)) throw new Error(`Duplicate key: "0x${c5}"`);
                  t3.add(c5);
                }
              }
              i = this.#e.createObject(e2, this.#e);
              break;
            }
            case f.BYTE_STRING:
              return d2(this.children);
            case f.UTF8_STRING: {
              const e2 = this.children.join("");
              i = this.#e.boxed ? d(e2, r2.toHere(this.offset)) : e2;
              break;
            }
            case f.TAG:
              i = this.children.decode(this.#e);
              break;
            default:
              throw new TypeError(`Invalid mt on convert: ${this.mt}`);
          }
          return this.#e.saveOriginal && i && typeof i == "object" && u(i, r2.toHere(this.offset)), i;
        }
        #r() {
          const r2 = this.children, i = r2.length;
          if (i % 2) throw new Error("Missing map value");
          const e2 = new Array(i / 2);
          if (this.#t) for (let t3 = 0; t3 < i; t3 += 2) e2[t3 >> 1] = [r2[t3], r2[t3 + 1], this.#t[t3]];
          else for (let t3 = 0; t3 < i; t3 += 2) e2[t3 >> 1] = [r2[t3], r2[t3 + 1], R3];
          return e2;
        }
      };
    }
  });

  // node_modules/cbor2/lib/diagnostic.js
  function a3(m4, l6, n2, p5) {
    let t3 = "";
    if (l6 === I.INDEFINITE) t3 += "_";
    else {
      if (p5.diagnosticSizes === o3.NEVER) return "";
      {
        let r2 = p5.diagnosticSizes === o3.ALWAYS;
        if (!r2) {
          let e2 = I.ZERO;
          if (Object.is(n2, -0)) e2 = I.TWO;
          else if (m4 === f.POS_INT || m4 === f.NEG_INT) {
            const T2 = n2 < 0, u3 = typeof n2 == "bigint" ? 1n : 1, o5 = T2 ? -n2 - u3 : n2;
            o5 <= 23 ? e2 = Number(o5) : o5 <= 255 ? e2 = I.ONE : o5 <= 65535 ? e2 = I.TWO : o5 <= 4294967295 ? e2 = I.FOUR : e2 = I.EIGHT;
          } else isFinite(n2) ? Math.fround(n2) === n2 ? Z(n2) == null ? e2 = I.FOUR : e2 = I.TWO : e2 = I.EIGHT : e2 = I.TWO;
          r2 = e2 !== l6;
        }
        r2 && (t3 += "_", l6 < I.ONE ? t3 += "i" : t3 += String(l6 - 24));
      }
    }
    return t3;
  }
  function M(m4, l6) {
    const n2 = { ...y4.defaultDecodeOptions, ...l6, ParentType: g4 }, p5 = new y3(m4, n2);
    let t3, r2, e2 = "";
    for (const T2 of p5) {
      const [u3, o5, i] = T2;
      switch (t3 && (t3.count > 0 && i !== A.BREAK && (t3.mt === f.MAP && t3.count % 2 ? e2 += ": " : (e2 += ",", n2.pretty || (e2 += " "))), n2.pretty && (t3.mt !== f.MAP || t3.count % 2 === 0) && (e2 += `
${O3.repeat(t3.depth + 1)}`)), r2 = y4.create(T2, t3, n2, p5), u3) {
        case f.POS_INT:
        case f.NEG_INT:
          e2 += String(i), e2 += a3(u3, o5, i, n2);
          break;
        case f.SIMPLE_FLOAT:
          if (i !== A.BREAK) if (typeof i == "number") {
            const c5 = Object.is(i, -0) ? "-0.0" : String(i);
            e2 += c5, isFinite(i) && !/[.e]/.test(c5) && (e2 += ".0"), e2 += a3(u3, o5, i, n2);
          } else i instanceof t ? (e2 += "simple(", e2 += String(i.value), e2 += a3(f.POS_INT, o5, i.value, n2), e2 += ")") : e2 += String(i);
          break;
        case f.BYTE_STRING:
          i === 1 / 0 ? (e2 += "(_ ", r2.close = ")", r2.quote = "'") : (e2 += "h'", e2 += A2(i), e2 += "'", e2 += a3(f.POS_INT, o5, i.length, n2));
          break;
        case f.UTF8_STRING:
          i === 1 / 0 ? (e2 += "(_ ", r2.close = ")") : (e2 += JSON.stringify(i), e2 += a3(f.POS_INT, o5, y5.encode(i).length, n2));
          break;
        case f.ARRAY: {
          e2 += "[";
          const c5 = a3(f.POS_INT, o5, i, n2);
          e2 += c5, c5 && (e2 += " "), n2.pretty && i ? r2.close = `
${O3.repeat(r2.depth)}]` : r2.close = "]";
          break;
        }
        case f.MAP: {
          e2 += "{";
          const c5 = a3(f.POS_INT, o5, i, n2);
          e2 += c5, c5 && (e2 += " "), n2.pretty && i ? r2.close = `
${O3.repeat(r2.depth)}}` : r2.close = "}";
          break;
        }
        case f.TAG:
          e2 += String(i), e2 += a3(f.POS_INT, o5, i, n2), e2 += "(", r2.close = ")";
          break;
      }
      if (r2 === A.BREAK) if (t3?.isStreaming) t3.left = 0;
      else throw new Error("Unexpected BREAK");
      else t3 && (t3.count++, t3.left--);
      for (r2 instanceof g4 && (t3 = r2); t3?.done; ) {
        if (t3.isEmptyStream) e2 = e2.slice(0, -3), e2 += `${t3.quote}${t3.quote}_`;
        else {
          if (t3.mt === f.MAP && t3.count % 2 !== 0) throw new Error(`Odd streaming map size: ${t3.count}`);
          e2 += t3.close;
        }
        t3 = t3.parent;
      }
    }
    return e2;
  }
  var O3, y5, g4;
  var init_diagnostic = __esm({
    "node_modules/cbor2/lib/diagnostic.js"() {
      init_options();
      init_constants();
      init_container();
      init_decodeStream2();
      init_simple();
      init_float();
      init_utils();
      O3 = "  ";
      y5 = new TextEncoder();
      g4 = class extends y4 {
        close = "";
        quote = '"';
        get isEmptyStream() {
          return (this.mt === f.UTF8_STRING || this.mt === f.BYTE_STRING) && this.count === 0;
        }
      };
    }
  });

  // node_modules/cbor2/lib/comment.js
  function k3(t3) {
    return t3 instanceof A5;
  }
  function O4(t3, a4) {
    return t3 === 1 / 0 ? "Indefinite" : a4 ? `${t3} ${a4}${t3 !== 1 && t3 !== 1n ? "s" : ""}` : String(t3);
  }
  function y6(t3) {
    return "".padStart(t3, " ");
  }
  function x3(t3, a4, f7) {
    let e2 = "";
    e2 += y6(t3.depth * 2);
    const n2 = f2(t3);
    e2 += A2(n2.subarray(0, 1));
    const r2 = t3.numBytes();
    r2 && (e2 += " ", e2 += A2(n2.subarray(1, r2 + 1))), e2 = e2.padEnd(a4.minCol + 1, " "), e2 += "-- ", f7 !== void 0 && (e2 += y6(t3.depth * 2), f7 !== "" && (e2 += `[${f7}] `));
    let p5 = false;
    const [s3] = t3.children;
    switch (t3.mt) {
      case f.POS_INT:
        e2 += `Unsigned: ${s3}`, typeof s3 == "bigint" && (e2 += "n");
        break;
      case f.NEG_INT:
        e2 += `Negative: ${s3}`, typeof s3 == "bigint" && (e2 += "n");
        break;
      case f.BYTE_STRING:
        e2 += `Bytes (Length: ${O4(t3.length)})`;
        break;
      case f.UTF8_STRING:
        e2 += `UTF8 (Length: ${O4(t3.length)})`, t3.length !== 1 / 0 && (e2 += `: ${JSON.stringify(s3)}`);
        break;
      case f.ARRAY:
        e2 += `Array (Length: ${O4(t3.value, "item")})`;
        break;
      case f.MAP:
        e2 += `Map (Length: ${O4(t3.value, "pair")})`;
        break;
      case f.TAG: {
        e2 += `Tag #${t3.value}`;
        const o5 = t3.children, [m4] = o5.contents.children, i = new o2(o5.tag, m4);
        u(i, n2);
        const l6 = i.comment(a4, t3.depth);
        l6 && (e2 += ": ", e2 += l6), p5 ||= i.noChildren;
        break;
      }
      case f.SIMPLE_FLOAT:
        s3 === A.BREAK ? e2 += "BREAK" : t3.ai > I.ONE ? Object.is(s3, -0) ? e2 += "Float: -0" : e2 += `Float: ${s3}` : (e2 += "Simple: ", s3 instanceof t ? e2 += s3.value : e2 += s3);
        break;
    }
    if (!p5) if (t3.leaf) {
      if (e2 += `
`, n2.length > r2 + 1) {
        const o5 = y6((t3.depth + 1) * 2), m4 = f3(n2);
        if (m4?.length) {
          m4.sort((l6, c5) => {
            const g5 = l6[0] - c5[0];
            return g5 || c5[1] - l6[1];
          });
          let i = 0;
          for (const [l6, c5, g5] of m4) if (!(l6 < i)) {
            if (i = l6 + c5, g5 === "<<") {
              e2 += y6(a4.minCol + 1), e2 += "--", e2 += o5, e2 += "<< ";
              const d6 = R(n2, l6, l6 + c5), h4 = f3(d6);
              if (h4) {
                const $3 = h4.findIndex(([w3, D, v3]) => w3 === 0 && D === c5 && v3 === "<<");
                $3 >= 0 && h4.splice($3, 1);
              }
              e2 += M(d6), e2 += ` >>
`, e2 += L2(d6, { initialDepth: t3.depth + 1, minCol: a4.minCol, noPrefixHex: true });
              continue;
            } else g5 === "'" && (e2 += y6(a4.minCol + 1), e2 += "--", e2 += o5, e2 += "'", e2 += H2.decode(n2.subarray(l6, l6 + c5)), e2 += `'
`);
            if (l6 > r2) for (let d6 = l6; d6 < l6 + c5; d6 += 8) {
              const h4 = Math.min(d6 + 8, l6 + c5);
              e2 += o5, e2 += A2(n2.subarray(d6, h4)), e2 += `
`;
            }
          }
        } else for (let i = r2 + 1; i < n2.length; i += 8) e2 += o5, e2 += A2(n2.subarray(i, i + 8)), e2 += `
`;
      }
    } else {
      e2 += `
`;
      let o5 = 0;
      for (const m4 of t3.children) {
        if (k3(m4)) {
          let i = String(o5);
          t3.mt === f.MAP ? i = o5 % 2 ? `val ${(o5 - 1) / 2}` : `key ${o5 / 2}` : t3.mt === f.TAG && (i = ""), e2 += x3(m4, a4, i);
        }
        o5++;
      }
    }
    return e2;
  }
  function L2(t3, a4) {
    const f7 = { ...q2, ...a4, ParentType: A5, saveOriginal: true }, e2 = new y3(t3, f7);
    let n2, r2;
    for (const s3 of e2) {
      if (r2 = y4.create(s3, n2, f7, e2), s3[2] === A.BREAK) if (n2?.isStreaming) n2.left = 1;
      else throw new Error("Unexpected BREAK");
      if (!k3(r2)) {
        const i = new A5(s3, 0, n2, f7);
        i.leaf = true, i.children.push(r2), u(i, e2.toHere(s3[3])), r2 = i;
      }
      let o5 = (r2.depth + 1) * 2;
      const m4 = r2.numBytes();
      for (m4 && (o5 += 1, o5 += m4 * 2), f7.minCol = Math.max(f7.minCol, o5), n2 && n2.push(r2, e2, s3[3]), n2 = r2; n2?.done; ) r2 = n2, r2.leaf || u(r2, e2.toHere(r2.offset)), { parent: n2 } = n2;
    }
    a4 && (a4.minCol = f7.minCol);
    let p5 = f7.noPrefixHex ? "" : `0x${A2(e2.toHere(0))}
`;
    return p5 += x3(r2, f7), p5;
  }
  var H2, A5, q2;
  var init_comment = __esm({
    "node_modules/cbor2/lib/comment.js"() {
      init_constants();
      init_box();
      init_utils();
      init_container();
      init_decodeStream2();
      init_simple();
      init_tag();
      init_diagnostic();
      H2 = new TextDecoder();
      A5 = class extends y4 {
        depth = 0;
        leaf = false;
        value;
        length;
        [A.ENCODED];
        constructor(a4, f7, e2, n2) {
          super(a4, f7, e2, n2), this.parent ? this.depth = this.parent.depth + 1 : this.depth = n2.initialDepth, [, , this.value, , this.length] = a4;
        }
        numBytes() {
          switch (this.ai) {
            case I.ONE:
              return 1;
            case I.TWO:
              return 2;
            case I.FOUR:
              return 4;
            case I.EIGHT:
              return 8;
          }
          return 0;
        }
      };
      q2 = { ...y4.defaultDecodeOptions, initialDepth: 0, noPrefixHex: false, minCol: 0 };
    }
  });

  // node_modules/cbor2/lib/types.js
  function I3(e2) {
    if (typeof e2 == "object" && e2) {
      if (e2.constructor !== Number) throw new Error(`Expected number: ${e2}`);
    } else if (typeof e2 != "number") throw new Error(`Expected number: ${e2}`);
  }
  function f6(e2) {
    if (typeof e2 == "object" && e2) {
      if (e2.constructor !== String) throw new Error(`Expected string: ${e2}`);
    } else if (typeof e2 != "string") throw new Error(`Expected string: ${e2}`);
  }
  function E2(e2) {
    if (!(e2 instanceof Uint8Array)) throw new Error(`Expected Uint8Array: ${e2}`);
  }
  function _2(e2) {
    if (!Array.isArray(e2)) throw new Error(`Expected Array: ${e2}`);
  }
  function w2(e2) {
    return f6(e2.contents), new Date(e2.contents);
  }
  function N3(e2) {
    return I3(e2.contents), new Date(e2.contents * 1e3);
  }
  function $2(e2) {
    return I3(e2.contents), new Date(e2.contents * S3);
  }
  function m3(e2, r2, n2) {
    if (E2(r2.contents), n2.rejectBigInts) throw new Error(`Decoding unwanted big integer: ${r2}(h'${A2(r2.contents)}')`);
    if (n2.requirePreferred && r2.contents[0] === 0) throw new Error(`Decoding overly-large bigint: ${r2.tag}(h'${A2(r2.contents)})`);
    let i = r2.contents.reduce((d6, u3) => d6 << 8n | BigInt(u3), 0n);
    e2 && (i = -1n - i);
    const a4 = i >= Number.MIN_SAFE_INTEGER && i <= Number.MAX_SAFE_INTEGER;
    if (n2.requirePreferred && a4) throw new Error(`Decoding bigint that could have been int: ${i}n`);
    return n2.collapseBigInts && a4 && (i = Number(i)), n2.boxed ? d(i, r2.contents) : i;
  }
  function R4(e2, r2) {
    return E2(e2.contents), e2;
  }
  function c3(e2, r2, n2) {
    E2(e2.contents);
    let i = e2.contents.length;
    if (i % r2.BYTES_PER_ELEMENT !== 0) throw new Error(`Number of bytes must be divisible by ${r2.BYTES_PER_ELEMENT}, got: ${i}`);
    i /= r2.BYTES_PER_ELEMENT;
    const a4 = new r2(i), d6 = new DataView(e2.contents.buffer, e2.contents.byteOffset, e2.contents.byteLength), u3 = d6[`get${r2.name.replace(/Array/, "")}`].bind(d6);
    for (let g5 = 0; g5 < i; g5++) a4[g5] = u3(g5 * r2.BYTES_PER_ELEMENT, n2);
    return a4;
  }
  function l3(e2, r2, n2, i, a4) {
    const d6 = a4.forceEndian ?? U4;
    if (m2(d6 ? r2 : n2, e2, a4), a2(i.byteLength, e2, f.BYTE_STRING), U4 === d6) e2.write(new Uint8Array(i.buffer, i.byteOffset, i.byteLength));
    else {
      const g5 = `write${i.constructor.name.replace(/Array/, "")}`, y7 = e2[g5].bind(e2);
      for (const D of i) y7(D, d6);
    }
  }
  function C(e2) {
    return E2(e2.contents), new Wtf8Decoder().decode(e2.contents);
  }
  function h3(e2) {
    throw new Error(`Encoding ${e2.constructor.name} intentionally unimplmented.  It is not concrete enough to interoperate.  Convert to Uint8Array first.`);
  }
  function p4(e2) {
    return [NaN, e2.valueOf()];
  }
  var U4, S3, L3, x4;
  var init_types = __esm({
    "node_modules/cbor2/lib/types.js"() {
      init_constants();
      init_box();
      init_utils();
      init_encoder();
      init_container();
      init_tag();
      init_lib();
      init_comment();
      U4 = !h();
      ue(Map, (e2, r2, n2) => {
        const i = [...e2.entries()].map((a4) => [a4[0], a4[1], v2(a4[0], n2)]);
        if (n2.rejectDuplicateKeys) {
          const a4 = /* @__PURE__ */ new Set();
          for (const [d6, u3, g5] of i) {
            const y7 = A2(g5);
            if (a4.has(y7)) throw new Error(`Duplicate map key: 0x${y7}`);
            a4.add(y7);
          }
        }
        n2.sortKeys && i.sort(n2.sortKeys), L(e2, e2.size, f.MAP, r2, n2);
        for (const [a4, d6, u3] of i) r2.write(u3), g3(d6, r2, n2);
      });
      w2.comment = (e2) => {
        f6(e2.contents);
        const r2 = new Date(e2.contents);
        return `(String ${e2.tag === T.DATE_FULL ? "Full " : ""}Date) ${r2.toISOString()}`;
      }, o2.registerDecoder(T.DATE_STRING, w2), o2.registerDecoder(T.DATE_FULL, w2);
      N3.comment = (e2) => (I3(e2.contents), `(Epoch Date) ${new Date(e2.contents * 1e3).toISOString()}`), o2.registerDecoder(T.DATE_EPOCH, N3);
      S3 = 1e3 * 60 * 60 * 24;
      $2.comment = (e2) => (I3(e2.contents), `(Epoch Date) ${new Date(e2.contents * S3).toISOString()}`), o2.registerDecoder(T.DATE_EPOCH_DAYS, $2), ue(Date, (e2, r2, n2) => {
        switch (n2.dateTag) {
          case T.DATE_EPOCH:
            return [n2.dateTag, e2.valueOf() / 1e3];
          case T.DATE_STRING:
            return [n2.dateTag, e2.toISOString().replace(/\.000Z$/, "Z")];
          case T.DATE_EPOCH_DAYS:
            return [n2.dateTag, Math.floor(e2.valueOf() / S3)];
          case T.DATE_FULL:
            return [n2.dateTag, e2.toISOString().split("T")[0]];
          default:
            throw new Error(`Unsupported date tag: ${n2.dateTag}`);
        }
      });
      L3 = m3.bind(null, false);
      x4 = m3.bind(null, true);
      L3.comment = (e2, r2) => `(Positive BigInt) ${m3(false, e2, r2)}n`, x4.comment = (e2, r2) => `(Negative BigInt) ${m3(true, e2, r2)}n`, o2.registerDecoder(T.POS_BIGINT, L3), o2.registerDecoder(T.NEG_BIGINT, x4);
      R4.comment = (e2, r2, n2) => {
        E2(e2.contents);
        const i = { ...r2, initialDepth: n2 + 2, noPrefixHex: true }, a4 = f2(e2);
        let u3 = 2 ** ((a4[0] & 31) - 24) + 1;
        const g5 = a4[u3] & 31;
        let y7 = A2(a4.subarray(u3, ++u3));
        g5 >= 24 && (y7 += " ", y7 += A2(a4.subarray(u3, u3 + 2 ** (g5 - 24)))), i.minCol = Math.max(i.minCol, (n2 + 1) * 2 + y7.length);
        const D = L2(e2.contents, i);
        let T2 = `Embedded CBOR
`;
        return T2 += `${"".padStart((n2 + 1) * 2, " ")}${y7}`.padEnd(i.minCol + 1, " "), T2 += `-- Bytes (Length: ${e2.contents.length})
`, T2 += D, T2;
      }, R4.noChildren = true, o2.registerDecoder(T.CBOR, R4), o2.registerDecoder(T.URI, (e2) => (f6(e2.contents), new URL(e2.contents)), "URI"), ue(URL, (e2) => [T.URI, e2.toString()]), o2.registerDecoder(T.BASE64URL, (e2) => (f6(e2.contents), x(e2.contents)), "Base64url-encoded"), o2.registerDecoder(T.BASE64, (e2) => (f6(e2.contents), y(e2.contents)), "Base64-encoded"), o2.registerDecoder(35, (e2) => (f6(e2.contents), new RegExp(e2.contents)), "RegExp"), o2.registerDecoder(21065, (e2) => {
        f6(e2.contents);
        const r2 = `^(?:${e2.contents})$`;
        return new RegExp(r2, "u");
      }, "I-RegExp"), o2.registerDecoder(T.REGEXP, (e2) => {
        if (_2(e2.contents), e2.contents.length < 1 || e2.contents.length > 2) throw new Error(`Invalid RegExp Array: ${e2.contents}`);
        return new RegExp(e2.contents[0], e2.contents[1]);
      }, "RegExp"), ue(RegExp, (e2) => [T.REGEXP, [e2.source, e2.flags]]), o2.registerDecoder(64, (e2) => (E2(e2.contents), e2.contents), "uint8 Typed Array");
      o2.registerDecoder(65, (e2) => c3(e2, Uint16Array, false), "uint16, big endian, Typed Array"), o2.registerDecoder(66, (e2) => c3(e2, Uint32Array, false), "uint32, big endian, Typed Array"), o2.registerDecoder(67, (e2) => c3(e2, BigUint64Array, false), "uint64, big endian, Typed Array"), o2.registerDecoder(68, (e2) => (E2(e2.contents), new Uint8ClampedArray(e2.contents)), "uint8 Typed Array, clamped arithmetic"), ue(Uint8ClampedArray, (e2) => [68, new Uint8Array(e2.buffer, e2.byteOffset, e2.byteLength)]), o2.registerDecoder(69, (e2) => c3(e2, Uint16Array, true), "uint16, little endian, Typed Array"), ue(Uint16Array, (e2, r2, n2) => l3(r2, 69, 65, e2, n2)), o2.registerDecoder(70, (e2) => c3(e2, Uint32Array, true), "uint32, little endian, Typed Array"), ue(Uint32Array, (e2, r2, n2) => l3(r2, 70, 66, e2, n2)), o2.registerDecoder(71, (e2) => c3(e2, BigUint64Array, true), "uint64, little endian, Typed Array"), ue(BigUint64Array, (e2, r2, n2) => l3(r2, 71, 67, e2, n2)), o2.registerDecoder(72, (e2) => (E2(e2.contents), new Int8Array(e2.contents)), "sint8 Typed Array"), ue(Int8Array, (e2) => [72, new Uint8Array(e2.buffer, e2.byteOffset, e2.byteLength)]), o2.registerDecoder(73, (e2) => c3(e2, Int16Array, false), "sint16, big endian, Typed Array"), o2.registerDecoder(74, (e2) => c3(e2, Int32Array, false), "sint32, big endian, Typed Array"), o2.registerDecoder(75, (e2) => c3(e2, BigInt64Array, false), "sint64, big endian, Typed Array"), o2.registerDecoder(77, (e2) => c3(e2, Int16Array, true), "sint16, little endian, Typed Array"), ue(Int16Array, (e2, r2, n2) => l3(r2, 77, 73, e2, n2)), o2.registerDecoder(78, (e2) => c3(e2, Int32Array, true), "sint32, little endian, Typed Array"), ue(Int32Array, (e2, r2, n2) => l3(r2, 78, 74, e2, n2)), o2.registerDecoder(79, (e2) => c3(e2, BigInt64Array, true), "sint64, little endian, Typed Array"), ue(BigInt64Array, (e2, r2, n2) => l3(r2, 79, 75, e2, n2)), o2.registerDecoder(81, (e2) => c3(e2, Float32Array, false), "IEEE 754 binary32, big endian, Typed Array"), o2.registerDecoder(82, (e2) => c3(e2, Float64Array, false), "IEEE 754 binary64, big endian, Typed Array"), o2.registerDecoder(85, (e2) => c3(e2, Float32Array, true), "IEEE 754 binary32, little endian, Typed Array"), ue(Float32Array, (e2, r2, n2) => l3(r2, 85, 81, e2, n2)), o2.registerDecoder(86, (e2) => c3(e2, Float64Array, true), "IEEE 754 binary64, big endian, Typed Array"), ue(Float64Array, (e2, r2, n2) => l3(r2, 86, 82, e2, n2)), o2.registerDecoder(T.SET, (e2, r2) => {
        if (_2(e2.contents), r2.sortKeys) {
          const n2 = y4.decodeToEncodeOpts(r2);
          let i = null;
          for (const a4 of e2.contents) {
            const d6 = [a4, void 0, v2(a4, n2)];
            if (i && r2.sortKeys(i, d6) >= 0) throw new Error(`Set items out of order in tag #${T.SET}`);
            i = d6;
          }
        }
        return new Set(e2.contents);
      }, "Set"), ue(Set, (e2, r2, n2) => {
        let i = [...e2];
        if (n2.sortKeys) {
          const a4 = i.map((d6) => [d6, void 0, v2(d6, n2)]);
          a4.sort(n2.sortKeys), i = a4.map(([d6]) => d6);
        }
        return [T.SET, i];
      }), o2.registerDecoder(T.JSON, (e2) => (f6(e2.contents), JSON.parse(e2.contents)), "JSON-encoded");
      C.comment = (e2) => {
        E2(e2.contents);
        const r2 = new Wtf8Decoder();
        return `(WTF8 string): ${JSON.stringify(r2.decode(e2.contents))}`;
      }, o2.registerDecoder(T.WTF8, C), o2.registerDecoder(T.SELF_DESCRIBED, (e2) => e2.contents, "Self-Described"), o2.registerDecoder(T.INVALID_16, () => {
        throw new Error(`Tag always invalid: ${T.INVALID_16}`);
      }, "Invalid"), o2.registerDecoder(T.INVALID_32, () => {
        throw new Error(`Tag always invalid: ${T.INVALID_32}`);
      }, "Invalid"), o2.registerDecoder(T.INVALID_64, () => {
        throw new Error(`Tag always invalid: ${T.INVALID_64}`);
      }, "Invalid"), o2.registerDecoder(T.SYMBOL, (e2) => {
        let r2 = e2.contents;
        if (Array.isArray(e2.contents)) {
          if (e2.contents.length !== 1) throw new Error(`Expected Array of size 1: ${e2.contents}`);
          [r2] = e2.contents;
        }
        if (f6(r2), !r2.length) throw new Error(`Expected non-empty string: ${e2.contents}`);
        return Symbol.for(r2);
      }, "Symbol");
      ue(ArrayBuffer, h3), ue(DataView, h3), typeof SharedArrayBuffer < "u" && ue(SharedArrayBuffer, h3);
      ue(Boolean, p4), ue(Number, p4), ue(String, p4), ue(BigInt, p4);
    }
  });

  // node_modules/cbor2/lib/version.js
  var init_version = __esm({
    "node_modules/cbor2/lib/version.js"() {
    }
  });

  // node_modules/cbor2/lib/decoder.js
  function c4(i) {
    const e2 = { ...y4.defaultDecodeOptions };
    if (i.dcbor ? Object.assign(e2, y4.dcborDecodeOptions) : i.cde && Object.assign(e2, y4.cdeDecodeOptions), Object.assign(e2, i), Object.hasOwn(e2, "rejectLongNumbers")) throw new TypeError("rejectLongNumbers has changed to requirePreferred");
    return e2.boxed && (e2.saveOriginal = true), e2;
  }
  function l4(i, e2 = {}) {
    const n2 = c4(e2), t3 = new y3(i, n2), r2 = new d4();
    for (const o5 of t3) r2.step(o5, n2, t3);
    return r2.ret;
  }
  var d4;
  var init_decoder = __esm({
    "node_modules/cbor2/lib/decoder.js"() {
      init_decodeStream2();
      init_container();
      init_constants();
      d4 = class {
        parent = void 0;
        ret = void 0;
        step(e2, n2, t3) {
          if (this.ret = y4.create(e2, this.parent, n2, t3), e2[2] === A.BREAK) if (this.parent?.isStreaming) this.parent.left = 0;
          else throw new Error("Unexpected BREAK");
          else this.parent && this.parent.push(this.ret, t3, e2[3]);
          for (this.ret instanceof y4 && (this.parent = this.ret); this.parent?.done; ) {
            this.ret = this.parent.convert(t3);
            const r2 = this.parent.parent;
            r2?.replaceLast(this.ret, this.parent, t3), this.parent = r2;
          }
        }
      };
    }
  });

  // node_modules/cbor2/lib/index.js
  var r, n, d5;
  var init_lib2 = __esm({
    "node_modules/cbor2/lib/index.js"() {
      init_types();
      init_version();
      init_container();
      init_options();
      init_decoder();
      init_diagnostic();
      init_comment();
      init_encoder();
      init_simple();
      init_tag();
      init_writer();
      init_box();
      init_typeEncoderMap();
      init_float();
      ({ cdeDecodeOptions: r, dcborDecodeOptions: n, defaultDecodeOptions: d5 } = y4);
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/errors.js
  var require_errors = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/errors.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InvalidChecksumError = exports.InvalidSequenceComponentError = exports.InvalidTypeError = exports.InvalidPathLengthError = exports.InvalidSchemeError = void 0;
      var InvalidSchemeError = class extends Error {
        constructor() {
          super("Invalid Scheme");
          this.name = "InvalidSchemeError";
        }
      };
      exports.InvalidSchemeError = InvalidSchemeError;
      var InvalidPathLengthError = class extends Error {
        constructor() {
          super("Invalid Path");
          this.name = "InvalidPathLengthError";
        }
      };
      exports.InvalidPathLengthError = InvalidPathLengthError;
      var InvalidTypeError = class extends Error {
        constructor() {
          super("Invalid Type");
          this.name = "InvalidTypeError";
        }
      };
      exports.InvalidTypeError = InvalidTypeError;
      var InvalidSequenceComponentError = class extends Error {
        constructor() {
          super("Invalid Sequence Component");
          this.name = "InvalidSequenceComponentError";
        }
      };
      exports.InvalidSequenceComponentError = InvalidSequenceComponentError;
      var InvalidChecksumError = class extends Error {
        constructor() {
          super("Invalid Checksum");
          this.name = "InvalidChecksumError";
        }
      };
      exports.InvalidChecksumError = InvalidChecksumError;
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports, module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/safe-buffer/index.js
  var require_safe_buffer = __commonJS({
    "node_modules/safe-buffer/index.js"(exports, module) {
      var buffer = require_buffer();
      var Buffer4 = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer4.from && Buffer4.alloc && Buffer4.allocUnsafe && Buffer4.allocUnsafeSlow) {
        module.exports = buffer;
      } else {
        copyProps(buffer, exports);
        exports.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer4(arg, encodingOrOffset, length);
      }
      SafeBuffer.prototype = Object.create(Buffer4.prototype);
      copyProps(Buffer4, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer4(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size, fill, encoding) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf = Buffer4(size);
        if (fill !== void 0) {
          if (typeof encoding === "string") {
            buf.fill(fill, encoding);
          } else {
            buf.fill(fill);
          }
        } else {
          buf.fill(0);
        }
        return buf;
      };
      SafeBuffer.allocUnsafe = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return Buffer4(size);
      };
      SafeBuffer.allocUnsafeSlow = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return buffer.SlowBuffer(size);
      };
    }
  });

  // node_modules/isarray/index.js
  var require_isarray = __commonJS({
    "node_modules/isarray/index.js"(exports, module) {
      var toString = {}.toString;
      module.exports = Array.isArray || function(arr) {
        return toString.call(arr) == "[object Array]";
      };
    }
  });

  // node_modules/es-errors/type.js
  var require_type = __commonJS({
    "node_modules/es-errors/type.js"(exports, module) {
      "use strict";
      module.exports = TypeError;
    }
  });

  // node_modules/es-object-atoms/index.js
  var require_es_object_atoms = __commonJS({
    "node_modules/es-object-atoms/index.js"(exports, module) {
      "use strict";
      module.exports = Object;
    }
  });

  // node_modules/es-errors/index.js
  var require_es_errors = __commonJS({
    "node_modules/es-errors/index.js"(exports, module) {
      "use strict";
      module.exports = Error;
    }
  });

  // node_modules/es-errors/eval.js
  var require_eval = __commonJS({
    "node_modules/es-errors/eval.js"(exports, module) {
      "use strict";
      module.exports = EvalError;
    }
  });

  // node_modules/es-errors/range.js
  var require_range = __commonJS({
    "node_modules/es-errors/range.js"(exports, module) {
      "use strict";
      module.exports = RangeError;
    }
  });

  // node_modules/es-errors/ref.js
  var require_ref = __commonJS({
    "node_modules/es-errors/ref.js"(exports, module) {
      "use strict";
      module.exports = ReferenceError;
    }
  });

  // node_modules/es-errors/syntax.js
  var require_syntax = __commonJS({
    "node_modules/es-errors/syntax.js"(exports, module) {
      "use strict";
      module.exports = SyntaxError;
    }
  });

  // node_modules/es-errors/uri.js
  var require_uri = __commonJS({
    "node_modules/es-errors/uri.js"(exports, module) {
      "use strict";
      module.exports = URIError;
    }
  });

  // node_modules/math-intrinsics/abs.js
  var require_abs = __commonJS({
    "node_modules/math-intrinsics/abs.js"(exports, module) {
      "use strict";
      module.exports = Math.abs;
    }
  });

  // node_modules/math-intrinsics/floor.js
  var require_floor = __commonJS({
    "node_modules/math-intrinsics/floor.js"(exports, module) {
      "use strict";
      module.exports = Math.floor;
    }
  });

  // node_modules/math-intrinsics/max.js
  var require_max = __commonJS({
    "node_modules/math-intrinsics/max.js"(exports, module) {
      "use strict";
      module.exports = Math.max;
    }
  });

  // node_modules/math-intrinsics/min.js
  var require_min = __commonJS({
    "node_modules/math-intrinsics/min.js"(exports, module) {
      "use strict";
      module.exports = Math.min;
    }
  });

  // node_modules/math-intrinsics/pow.js
  var require_pow = __commonJS({
    "node_modules/math-intrinsics/pow.js"(exports, module) {
      "use strict";
      module.exports = Math.pow;
    }
  });

  // node_modules/math-intrinsics/round.js
  var require_round = __commonJS({
    "node_modules/math-intrinsics/round.js"(exports, module) {
      "use strict";
      module.exports = Math.round;
    }
  });

  // node_modules/math-intrinsics/isNaN.js
  var require_isNaN = __commonJS({
    "node_modules/math-intrinsics/isNaN.js"(exports, module) {
      "use strict";
      module.exports = Number.isNaN || function isNaN2(a4) {
        return a4 !== a4;
      };
    }
  });

  // node_modules/math-intrinsics/sign.js
  var require_sign = __commonJS({
    "node_modules/math-intrinsics/sign.js"(exports, module) {
      "use strict";
      var $isNaN = require_isNaN();
      module.exports = function sign(number) {
        if ($isNaN(number) || number === 0) {
          return number;
        }
        return number < 0 ? -1 : 1;
      };
    }
  });

  // node_modules/gopd/gOPD.js
  var require_gOPD = __commonJS({
    "node_modules/gopd/gOPD.js"(exports, module) {
      "use strict";
      module.exports = Object.getOwnPropertyDescriptor;
    }
  });

  // node_modules/gopd/index.js
  var require_gopd = __commonJS({
    "node_modules/gopd/index.js"(exports, module) {
      "use strict";
      var $gOPD = require_gOPD();
      if ($gOPD) {
        try {
          $gOPD([], "length");
        } catch (e2) {
          $gOPD = null;
        }
      }
      module.exports = $gOPD;
    }
  });

  // node_modules/es-define-property/index.js
  var require_es_define_property = __commonJS({
    "node_modules/es-define-property/index.js"(exports, module) {
      "use strict";
      var $defineProperty = Object.defineProperty || false;
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e2) {
          $defineProperty = false;
        }
      }
      module.exports = $defineProperty;
    }
  });

  // node_modules/has-symbols/shams.js
  var require_shams = __commonJS({
    "node_modules/has-symbols/shams.js"(exports, module) {
      "use strict";
      module.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = /* @__PURE__ */ Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (var _3 in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = (
            /** @type {PropertyDescriptor} */
            Object.getOwnPropertyDescriptor(obj, sym)
          );
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // node_modules/has-symbols/index.js
  var require_has_symbols = __commonJS({
    "node_modules/has-symbols/index.js"(exports, module) {
      "use strict";
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = require_shams();
      module.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof /* @__PURE__ */ Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
    }
  });

  // node_modules/get-proto/Reflect.getPrototypeOf.js
  var require_Reflect_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports, module) {
      "use strict";
      module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
    }
  });

  // node_modules/get-proto/Object.getPrototypeOf.js
  var require_Object_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Object.getPrototypeOf.js"(exports, module) {
      "use strict";
      var $Object = require_es_object_atoms();
      module.exports = $Object.getPrototypeOf || null;
    }
  });

  // node_modules/function-bind/implementation.js
  var require_implementation = __commonJS({
    "node_modules/function-bind/implementation.js"(exports, module) {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var toStr = Object.prototype.toString;
      var max = Math.max;
      var funcType = "[object Function]";
      var concatty = function concatty2(a4, b5) {
        var arr = [];
        for (var i = 0; i < a4.length; i += 1) {
          arr[i] = a4[i];
        }
        for (var j2 = 0; j2 < b5.length; j2 += 1) {
          arr[j2 + a4.length] = b5[j2];
        }
        return arr;
      };
      var slicy = function slicy2(arrLike, offset) {
        var arr = [];
        for (var i = offset || 0, j2 = 0; i < arrLike.length; i += 1, j2 += 1) {
          arr[j2] = arrLike[i];
        }
        return arr;
      };
      var joiny = function(arr, joiner) {
        var str = "";
        for (var i = 0; i < arr.length; i += 1) {
          str += arr[i];
          if (i + 1 < arr.length) {
            str += joiner;
          }
        }
        return str;
      };
      module.exports = function bind(that) {
        var target = this;
        if (typeof target !== "function" || toStr.apply(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              concatty(args, arguments)
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          }
          return target.apply(
            that,
            concatty(args, arguments)
          );
        };
        var boundLength = max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs[i] = "$" + i;
        }
        bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }
  });

  // node_modules/function-bind/index.js
  var require_function_bind = __commonJS({
    "node_modules/function-bind/index.js"(exports, module) {
      "use strict";
      var implementation = require_implementation();
      module.exports = Function.prototype.bind || implementation;
    }
  });

  // node_modules/call-bind-apply-helpers/functionCall.js
  var require_functionCall = __commonJS({
    "node_modules/call-bind-apply-helpers/functionCall.js"(exports, module) {
      "use strict";
      module.exports = Function.prototype.call;
    }
  });

  // node_modules/call-bind-apply-helpers/functionApply.js
  var require_functionApply = __commonJS({
    "node_modules/call-bind-apply-helpers/functionApply.js"(exports, module) {
      "use strict";
      module.exports = Function.prototype.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/reflectApply.js
  var require_reflectApply = __commonJS({
    "node_modules/call-bind-apply-helpers/reflectApply.js"(exports, module) {
      "use strict";
      module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/actualApply.js
  var require_actualApply = __commonJS({
    "node_modules/call-bind-apply-helpers/actualApply.js"(exports, module) {
      "use strict";
      var bind = require_function_bind();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var $reflectApply = require_reflectApply();
      module.exports = $reflectApply || bind.call($call, $apply);
    }
  });

  // node_modules/call-bind-apply-helpers/index.js
  var require_call_bind_apply_helpers = __commonJS({
    "node_modules/call-bind-apply-helpers/index.js"(exports, module) {
      "use strict";
      var bind = require_function_bind();
      var $TypeError = require_type();
      var $call = require_functionCall();
      var $actualApply = require_actualApply();
      module.exports = function callBindBasic(args) {
        if (args.length < 1 || typeof args[0] !== "function") {
          throw new $TypeError("a function is required");
        }
        return $actualApply(bind, $call, args);
      };
    }
  });

  // node_modules/dunder-proto/get.js
  var require_get = __commonJS({
    "node_modules/dunder-proto/get.js"(exports, module) {
      "use strict";
      var callBind = require_call_bind_apply_helpers();
      var gOPD = require_gopd();
      var hasProtoAccessor;
      try {
        hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
        [].__proto__ === Array.prototype;
      } catch (e2) {
        if (!e2 || typeof e2 !== "object" || !("code" in e2) || e2.code !== "ERR_PROTO_ACCESS") {
          throw e2;
        }
      }
      var desc = !!hasProtoAccessor && gOPD && gOPD(
        Object.prototype,
        /** @type {keyof typeof Object.prototype} */
        "__proto__"
      );
      var $Object = Object;
      var $getPrototypeOf = $Object.getPrototypeOf;
      module.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
        /** @type {import('./get')} */
        function getDunder(value) {
          return $getPrototypeOf(value == null ? value : $Object(value));
        }
      ) : false;
    }
  });

  // node_modules/get-proto/index.js
  var require_get_proto = __commonJS({
    "node_modules/get-proto/index.js"(exports, module) {
      "use strict";
      var reflectGetProto = require_Reflect_getPrototypeOf();
      var originalGetProto = require_Object_getPrototypeOf();
      var getDunderProto = require_get();
      module.exports = reflectGetProto ? function getProto(O6) {
        return reflectGetProto(O6);
      } : originalGetProto ? function getProto(O6) {
        if (!O6 || typeof O6 !== "object" && typeof O6 !== "function") {
          throw new TypeError("getProto: not an object");
        }
        return originalGetProto(O6);
      } : getDunderProto ? function getProto(O6) {
        return getDunderProto(O6);
      } : null;
    }
  });

  // node_modules/hasown/index.js
  var require_hasown = __commonJS({
    "node_modules/hasown/index.js"(exports, module) {
      "use strict";
      var call = Function.prototype.call;
      var $hasOwn = Object.prototype.hasOwnProperty;
      var bind = require_function_bind();
      module.exports = bind.call(call, $hasOwn);
    }
  });

  // node_modules/get-intrinsic/index.js
  var require_get_intrinsic = __commonJS({
    "node_modules/get-intrinsic/index.js"(exports, module) {
      "use strict";
      var undefined2;
      var $Object = require_es_object_atoms();
      var $Error = require_es_errors();
      var $EvalError = require_eval();
      var $RangeError = require_range();
      var $ReferenceError = require_ref();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var $URIError = require_uri();
      var abs = require_abs();
      var floor = require_floor();
      var max = require_max();
      var min = require_min();
      var pow = require_pow();
      var round = require_round();
      var sign = require_sign();
      var $Function = Function;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e2) {
        }
      };
      var $gOPD = require_gopd();
      var $defineProperty = require_es_define_property();
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? (function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      })() : throwTypeError;
      var hasSymbols = require_has_symbols()();
      var getProto = require_get_proto();
      var $ObjectGPO = require_Object_getPrototypeOf();
      var $ReflectGPO = require_Reflect_getPrototypeOf();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
      var INTRINSICS = {
        __proto__: null,
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
        "%AsyncFromSyncIteratorPrototype%": undefined2,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": $Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": $EvalError,
        "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
        "%JSON%": typeof JSON === "object" ? JSON : undefined2,
        "%Map%": typeof Map === "undefined" ? undefined2 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": $Object,
        "%Object.getOwnPropertyDescriptor%": $gOPD,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
        "%RangeError%": $RangeError,
        "%ReferenceError%": $ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined2 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
        "%Symbol%": hasSymbols ? Symbol : undefined2,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
        "%URIError%": $URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
        "%Function.prototype.call%": $call,
        "%Function.prototype.apply%": $apply,
        "%Object.defineProperty%": $defineProperty,
        "%Object.getPrototypeOf%": $ObjectGPO,
        "%Math.abs%": abs,
        "%Math.floor%": floor,
        "%Math.max%": max,
        "%Math.min%": min,
        "%Math.pow%": pow,
        "%Math.round%": round,
        "%Math.sign%": sign,
        "%Reflect.getPrototypeOf%": $ReflectGPO
      };
      if (getProto) {
        try {
          null.error;
        } catch (e2) {
          errorProto = getProto(getProto(e2));
          INTRINSICS["%Error.prototype%"] = errorProto;
        }
      }
      var errorProto;
      var doEval = function doEval2(name) {
        var value;
        if (name === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name === "%AsyncGenerator%") {
          var fn = doEval2("%AsyncGeneratorFunction%");
          if (fn) {
            value = fn.prototype;
          }
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen = doEval2("%AsyncGenerator%");
          if (gen && getProto) {
            value = getProto(gen.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        __proto__: null,
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind = require_function_bind();
      var hasOwn = require_hasown();
      var $concat = bind.call($call, Array.prototype.concat);
      var $spliceApply = bind.call($apply, Array.prototype.splice);
      var $replace = bind.call($call, String.prototype.replace);
      var $strSlice = bind.call($call, String.prototype.slice);
      var $exec = bind.call($call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath2(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last === "%" && first !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName, function(match, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          }
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      module.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              }
              return void undefined2;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }
  });

  // node_modules/call-bound/index.js
  var require_call_bound = __commonJS({
    "node_modules/call-bound/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBindBasic = require_call_bind_apply_helpers();
      var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
      module.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = (
          /** @type {(this: unknown, ...args: unknown[]) => unknown} */
          GetIntrinsic(name, !!allowMissing)
        );
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBindBasic(
            /** @type {const} */
            [intrinsic]
          );
        }
        return intrinsic;
      };
    }
  });

  // node_modules/is-callable/index.js
  var require_is_callable = __commonJS({
    "node_modules/is-callable/index.js"(exports, module) {
      "use strict";
      var fnToStr = Function.prototype.toString;
      var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
      var badArrayLike;
      var isCallableMarker;
      if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
        try {
          badArrayLike = Object.defineProperty({}, "length", {
            get: function() {
              throw isCallableMarker;
            }
          });
          isCallableMarker = {};
          reflectApply(function() {
            throw 42;
          }, null, badArrayLike);
        } catch (_3) {
          if (_3 !== isCallableMarker) {
            reflectApply = null;
          }
        }
      } else {
        reflectApply = null;
      }
      var constructorRegex = /^\s*class\b/;
      var isES6ClassFn = function isES6ClassFunction(value) {
        try {
          var fnStr = fnToStr.call(value);
          return constructorRegex.test(fnStr);
        } catch (e2) {
          return false;
        }
      };
      var tryFunctionObject = function tryFunctionToStr(value) {
        try {
          if (isES6ClassFn(value)) {
            return false;
          }
          fnToStr.call(value);
          return true;
        } catch (e2) {
          return false;
        }
      };
      var toStr = Object.prototype.toString;
      var objectClass = "[object Object]";
      var fnClass = "[object Function]";
      var genClass = "[object GeneratorFunction]";
      var ddaClass = "[object HTMLAllCollection]";
      var ddaClass2 = "[object HTML document.all class]";
      var ddaClass3 = "[object HTMLCollection]";
      var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
      var isIE68 = !(0 in [,]);
      var isDDA = function isDocumentDotAll() {
        return false;
      };
      if (typeof document === "object") {
        all = document.all;
        if (toStr.call(all) === toStr.call(document.all)) {
          isDDA = function isDocumentDotAll(value) {
            if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
              try {
                var str = toStr.call(value);
                return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
              } catch (e2) {
              }
            }
            return false;
          };
        }
      }
      var all;
      module.exports = reflectApply ? function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        try {
          reflectApply(value, null, badArrayLike);
        } catch (e2) {
          if (e2 !== isCallableMarker) {
            return false;
          }
        }
        return !isES6ClassFn(value) && tryFunctionObject(value);
      } : function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        if (hasToStringTag) {
          return tryFunctionObject(value);
        }
        if (isES6ClassFn(value)) {
          return false;
        }
        var strClass = toStr.call(value);
        if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
          return false;
        }
        return tryFunctionObject(value);
      };
    }
  });

  // node_modules/for-each/index.js
  var require_for_each = __commonJS({
    "node_modules/for-each/index.js"(exports, module) {
      "use strict";
      var isCallable = require_is_callable();
      var toStr = Object.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var forEachArray = function forEachArray2(array, iterator, receiver) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
              iterator(array[i], i, array);
            } else {
              iterator.call(receiver, array[i], i, array);
            }
          }
        }
      };
      var forEachString = function forEachString2(string, iterator, receiver) {
        for (var i = 0, len = string.length; i < len; i++) {
          if (receiver == null) {
            iterator(string.charAt(i), i, string);
          } else {
            iterator.call(receiver, string.charAt(i), i, string);
          }
        }
      };
      var forEachObject = function forEachObject2(object, iterator, receiver) {
        for (var k4 in object) {
          if (hasOwnProperty.call(object, k4)) {
            if (receiver == null) {
              iterator(object[k4], k4, object);
            } else {
              iterator.call(receiver, object[k4], k4, object);
            }
          }
        }
      };
      function isArray(x5) {
        return toStr.call(x5) === "[object Array]";
      }
      module.exports = function forEach(list, iterator, thisArg) {
        if (!isCallable(iterator)) {
          throw new TypeError("iterator must be a function");
        }
        var receiver;
        if (arguments.length >= 3) {
          receiver = thisArg;
        }
        if (isArray(list)) {
          forEachArray(list, iterator, receiver);
        } else if (typeof list === "string") {
          forEachString(list, iterator, receiver);
        } else {
          forEachObject(list, iterator, receiver);
        }
      };
    }
  });

  // node_modules/possible-typed-array-names/index.js
  var require_possible_typed_array_names = __commonJS({
    "node_modules/possible-typed-array-names/index.js"(exports, module) {
      "use strict";
      module.exports = [
        "Float16Array",
        "Float32Array",
        "Float64Array",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "BigInt64Array",
        "BigUint64Array"
      ];
    }
  });

  // node_modules/available-typed-arrays/index.js
  var require_available_typed_arrays = __commonJS({
    "node_modules/available-typed-arrays/index.js"(exports, module) {
      "use strict";
      var possibleNames = require_possible_typed_array_names();
      var g5 = typeof globalThis === "undefined" ? global : globalThis;
      module.exports = function availableTypedArrays() {
        var out = [];
        for (var i = 0; i < possibleNames.length; i++) {
          if (typeof g5[possibleNames[i]] === "function") {
            out[out.length] = possibleNames[i];
          }
        }
        return out;
      };
    }
  });

  // node_modules/define-data-property/index.js
  var require_define_data_property = __commonJS({
    "node_modules/define-data-property/index.js"(exports, module) {
      "use strict";
      var $defineProperty = require_es_define_property();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var gopd = require_gopd();
      module.exports = function defineDataProperty(obj, property, value) {
        if (!obj || typeof obj !== "object" && typeof obj !== "function") {
          throw new $TypeError("`obj` must be an object or a function`");
        }
        if (typeof property !== "string" && typeof property !== "symbol") {
          throw new $TypeError("`property` must be a string or a symbol`");
        }
        if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
          throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
          throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
          throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
          throw new $TypeError("`loose`, if provided, must be a boolean");
        }
        var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
        var nonWritable = arguments.length > 4 ? arguments[4] : null;
        var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
        var loose = arguments.length > 6 ? arguments[6] : false;
        var desc = !!gopd && gopd(obj, property);
        if ($defineProperty) {
          $defineProperty(obj, property, {
            configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
            enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
            value,
            writable: nonWritable === null && desc ? desc.writable : !nonWritable
          });
        } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
          obj[property] = value;
        } else {
          throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
        }
      };
    }
  });

  // node_modules/has-property-descriptors/index.js
  var require_has_property_descriptors = __commonJS({
    "node_modules/has-property-descriptors/index.js"(exports, module) {
      "use strict";
      var $defineProperty = require_es_define_property();
      var hasPropertyDescriptors = function hasPropertyDescriptors2() {
        return !!$defineProperty;
      };
      hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
        if (!$defineProperty) {
          return null;
        }
        try {
          return $defineProperty([], "length", { value: 1 }).length !== 1;
        } catch (e2) {
          return true;
        }
      };
      module.exports = hasPropertyDescriptors;
    }
  });

  // node_modules/set-function-length/index.js
  var require_set_function_length = __commonJS({
    "node_modules/set-function-length/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var define2 = require_define_data_property();
      var hasDescriptors = require_has_property_descriptors()();
      var gOPD = require_gopd();
      var $TypeError = require_type();
      var $floor = GetIntrinsic("%Math.floor%");
      module.exports = function setFunctionLength(fn, length) {
        if (typeof fn !== "function") {
          throw new $TypeError("`fn` is not a function");
        }
        if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
          throw new $TypeError("`length` must be a positive 32-bit integer");
        }
        var loose = arguments.length > 2 && !!arguments[2];
        var functionLengthIsConfigurable = true;
        var functionLengthIsWritable = true;
        if ("length" in fn && gOPD) {
          var desc = gOPD(fn, "length");
          if (desc && !desc.configurable) {
            functionLengthIsConfigurable = false;
          }
          if (desc && !desc.writable) {
            functionLengthIsWritable = false;
          }
        }
        if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
          if (hasDescriptors) {
            define2(
              /** @type {Parameters<define>[0]} */
              fn,
              "length",
              length,
              true,
              true
            );
          } else {
            define2(
              /** @type {Parameters<define>[0]} */
              fn,
              "length",
              length
            );
          }
        }
        return fn;
      };
    }
  });

  // node_modules/call-bind-apply-helpers/applyBind.js
  var require_applyBind = __commonJS({
    "node_modules/call-bind-apply-helpers/applyBind.js"(exports, module) {
      "use strict";
      var bind = require_function_bind();
      var $apply = require_functionApply();
      var actualApply = require_actualApply();
      module.exports = function applyBind() {
        return actualApply(bind, $apply, arguments);
      };
    }
  });

  // node_modules/call-bind/index.js
  var require_call_bind = __commonJS({
    "node_modules/call-bind/index.js"(exports, module) {
      "use strict";
      var setFunctionLength = require_set_function_length();
      var $defineProperty = require_es_define_property();
      var callBindBasic = require_call_bind_apply_helpers();
      var applyBind = require_applyBind();
      module.exports = function callBind(originalFunction) {
        var func = callBindBasic(arguments);
        var adjustedLength = 1 + originalFunction.length - (arguments.length - 1);
        return setFunctionLength(
          func,
          adjustedLength > 0 ? adjustedLength : 0,
          true
        );
      };
      if ($defineProperty) {
        $defineProperty(module.exports, "apply", { value: applyBind });
      } else {
        module.exports.apply = applyBind;
      }
    }
  });

  // node_modules/has-tostringtag/shams.js
  var require_shams2 = __commonJS({
    "node_modules/has-tostringtag/shams.js"(exports, module) {
      "use strict";
      var hasSymbols = require_shams();
      module.exports = function hasToStringTagShams() {
        return hasSymbols() && !!Symbol.toStringTag;
      };
    }
  });

  // node_modules/which-typed-array/index.js
  var require_which_typed_array = __commonJS({
    "node_modules/which-typed-array/index.js"(exports, module) {
      "use strict";
      var forEach = require_for_each();
      var availableTypedArrays = require_available_typed_arrays();
      var callBind = require_call_bind();
      var callBound = require_call_bound();
      var gOPD = require_gopd();
      var getProto = require_get_proto();
      var $toString = callBound("Object.prototype.toString");
      var hasToStringTag = require_shams2()();
      var g5 = typeof globalThis === "undefined" ? global : globalThis;
      var typedArrays = availableTypedArrays();
      var $slice = callBound("String.prototype.slice");
      var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
        for (var i = 0; i < array.length; i += 1) {
          if (array[i] === value) {
            return i;
          }
        }
        return -1;
      };
      var cache = { __proto__: null };
      if (hasToStringTag && gOPD && getProto) {
        forEach(typedArrays, function(typedArray) {
          var arr = new g5[typedArray]();
          if (Symbol.toStringTag in arr && getProto) {
            var proto = getProto(arr);
            var descriptor = gOPD(proto, Symbol.toStringTag);
            if (!descriptor && proto) {
              var superProto = getProto(proto);
              descriptor = gOPD(superProto, Symbol.toStringTag);
            }
            if (descriptor && descriptor.get) {
              var bound = callBind(descriptor.get);
              cache[
                /** @type {`$${TypedArrayName}`} */
                "$" + typedArray
              ] = bound;
            }
          }
        });
      } else {
        forEach(typedArrays, function(typedArray) {
          var arr = new g5[typedArray]();
          var fn = arr.slice || arr.set;
          if (fn) {
            var bound = (
              /** @type {typeof BoundSlice | typeof BoundSet} */
              // @ts-expect-error TODO FIXME
              callBind(fn)
            );
            cache[
              /** @type {`$${TypedArrayName}`} */
              "$" + typedArray
            ] = bound;
          }
        });
      }
      function tryTypedArrays(value) {
        var found = false;
        forEach(
          /** @type {Record<`$${TypedArrayName}`, Getter>} */
          cache,
          /** @param {Getter} getter @param {`$${TypedArrayName}`} typedArray */
          function(getter, typedArray) {
            if (!found) {
              try {
                if ("$" + getter(value) === typedArray) {
                  found = /** @type {TypedArrayName} */
                  $slice(typedArray, 1);
                }
              } catch (e2) {
              }
            }
          }
        );
        return found;
      }
      function trySlices(value) {
        var found = false;
        forEach(
          /** @type {Record<`$${TypedArrayName}`, Getter>} */
          cache,
          /** @param {Getter} getter @param {`$${TypedArrayName}`} name */
          function(getter, name) {
            if (!found) {
              try {
                getter(value);
                found = /** @type {TypedArrayName} */
                $slice(name, 1);
              } catch (e2) {
              }
            }
          }
        );
        return found;
      }
      function isTATag(tag) {
        return $indexOf(typedArrays, tag) > -1;
      }
      function whichTypedArray(value) {
        if (!value || typeof value !== "object") {
          return false;
        }
        if (!hasToStringTag) {
          var tag = $slice($toString(value), 8, -1);
          if (isTATag(tag)) {
            return tag;
          }
          if (tag !== "Object") {
            return false;
          }
          return trySlices(value);
        }
        if (!gOPD) {
          return null;
        }
        return tryTypedArrays(value);
      }
      module.exports = whichTypedArray;
    }
  });

  // node_modules/is-typed-array/index.js
  var require_is_typed_array = __commonJS({
    "node_modules/is-typed-array/index.js"(exports, module) {
      "use strict";
      var whichTypedArray = require_which_typed_array();
      module.exports = function isTypedArray(value) {
        return !!whichTypedArray(value);
      };
    }
  });

  // node_modules/typed-array-buffer/index.js
  var require_typed_array_buffer = __commonJS({
    "node_modules/typed-array-buffer/index.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var callBound = require_call_bound();
      var $typedArrayBuffer = callBound("TypedArray.prototype.buffer", true);
      var isTypedArray = require_is_typed_array();
      module.exports = $typedArrayBuffer || function typedArrayBuffer(x5) {
        if (!isTypedArray(x5)) {
          throw new $TypeError("Not a Typed Array");
        }
        return x5.buffer;
      };
    }
  });

  // node_modules/to-buffer/index.js
  var require_to_buffer = __commonJS({
    "node_modules/to-buffer/index.js"(exports, module) {
      "use strict";
      var Buffer4 = require_safe_buffer().Buffer;
      var isArray = require_isarray();
      var typedArrayBuffer = require_typed_array_buffer();
      var isView = ArrayBuffer.isView || function isView2(obj) {
        try {
          typedArrayBuffer(obj);
          return true;
        } catch (e2) {
          return false;
        }
      };
      var useUint8Array = typeof Uint8Array !== "undefined";
      var useArrayBuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
      var useFromArrayBuffer = useArrayBuffer && (Buffer4.prototype instanceof Uint8Array || Buffer4.TYPED_ARRAY_SUPPORT);
      module.exports = function toBuffer(data, encoding) {
        if (Buffer4.isBuffer(data)) {
          if (data.constructor && !("isBuffer" in data)) {
            return Buffer4.from(data);
          }
          return data;
        }
        if (typeof data === "string") {
          return Buffer4.from(data, encoding);
        }
        if (useArrayBuffer && isView(data)) {
          if (data.byteLength === 0) {
            return Buffer4.alloc(0);
          }
          if (useFromArrayBuffer) {
            var res = Buffer4.from(data.buffer, data.byteOffset, data.byteLength);
            if (res.byteLength === data.byteLength) {
              return res;
            }
          }
          var uint8 = data instanceof Uint8Array ? data : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
          var result = Buffer4.from(uint8);
          if (result.length === data.byteLength) {
            return result;
          }
        }
        if (useUint8Array && data instanceof Uint8Array) {
          return Buffer4.from(data);
        }
        var isArr = isArray(data);
        if (isArr) {
          for (var i = 0; i < data.length; i += 1) {
            var x5 = data[i];
            if (typeof x5 !== "number" || x5 < 0 || x5 > 255 || ~~x5 !== x5) {
              throw new RangeError("Array items must be numbers in the range 0-255.");
            }
          }
        }
        if (isArr || Buffer4.isBuffer(data) && data.constructor && typeof data.constructor.isBuffer === "function" && data.constructor.isBuffer(data)) {
          return Buffer4.from(data);
        }
        throw new TypeError('The "data" argument must be a string, an Array, a Buffer, a Uint8Array, or a DataView.');
      };
    }
  });

  // node_modules/sha.js/hash.js
  var require_hash = __commonJS({
    "node_modules/sha.js/hash.js"(exports, module) {
      "use strict";
      var Buffer4 = require_safe_buffer().Buffer;
      var toBuffer = require_to_buffer();
      function Hash(blockSize, finalSize) {
        this._block = Buffer4.alloc(blockSize);
        this._finalSize = finalSize;
        this._blockSize = blockSize;
        this._len = 0;
      }
      Hash.prototype.update = function(data, enc) {
        data = toBuffer(data, enc || "utf8");
        var block = this._block;
        var blockSize = this._blockSize;
        var length = data.length;
        var accum = this._len;
        for (var offset = 0; offset < length; ) {
          var assigned = accum % blockSize;
          var remainder = Math.min(length - offset, blockSize - assigned);
          for (var i = 0; i < remainder; i++) {
            block[assigned + i] = data[offset + i];
          }
          accum += remainder;
          offset += remainder;
          if (accum % blockSize === 0) {
            this._update(block);
          }
        }
        this._len += length;
        return this;
      };
      Hash.prototype.digest = function(enc) {
        var rem = this._len % this._blockSize;
        this._block[rem] = 128;
        this._block.fill(0, rem + 1);
        if (rem >= this._finalSize) {
          this._update(this._block);
          this._block.fill(0);
        }
        var bits = this._len * 8;
        if (bits <= 4294967295) {
          this._block.writeUInt32BE(bits, this._blockSize - 4);
        } else {
          var lowBits = (bits & 4294967295) >>> 0;
          var highBits = (bits - lowBits) / 4294967296;
          this._block.writeUInt32BE(highBits, this._blockSize - 8);
          this._block.writeUInt32BE(lowBits, this._blockSize - 4);
        }
        this._update(this._block);
        var hash = this._hash();
        return enc ? hash.toString(enc) : hash;
      };
      Hash.prototype._update = function() {
        throw new Error("_update must be implemented by subclass");
      };
      module.exports = Hash;
    }
  });

  // node_modules/sha.js/sha.js
  var require_sha = __commonJS({
    "node_modules/sha.js/sha.js"(exports, module) {
      "use strict";
      var inherits = require_inherits_browser();
      var Hash = require_hash();
      var Buffer4 = require_safe_buffer().Buffer;
      var K2 = [
        1518500249,
        1859775393,
        2400959708 | 0,
        3395469782 | 0
      ];
      var W = new Array(80);
      function Sha() {
        this.init();
        this._w = W;
        Hash.call(this, 64, 56);
      }
      inherits(Sha, Hash);
      Sha.prototype.init = function() {
        this._a = 1732584193;
        this._b = 4023233417;
        this._c = 2562383102;
        this._d = 271733878;
        this._e = 3285377520;
        return this;
      };
      function rotl5(num) {
        return num << 5 | num >>> 27;
      }
      function rotl30(num) {
        return num << 30 | num >>> 2;
      }
      function ft(s3, b5, c5, d6) {
        if (s3 === 0) {
          return b5 & c5 | ~b5 & d6;
        }
        if (s3 === 2) {
          return b5 & c5 | b5 & d6 | c5 & d6;
        }
        return b5 ^ c5 ^ d6;
      }
      Sha.prototype._update = function(M2) {
        var w3 = this._w;
        var a4 = this._a | 0;
        var b5 = this._b | 0;
        var c5 = this._c | 0;
        var d6 = this._d | 0;
        var e2 = this._e | 0;
        for (var i = 0; i < 16; ++i) {
          w3[i] = M2.readInt32BE(i * 4);
        }
        for (; i < 80; ++i) {
          w3[i] = w3[i - 3] ^ w3[i - 8] ^ w3[i - 14] ^ w3[i - 16];
        }
        for (var j2 = 0; j2 < 80; ++j2) {
          var s3 = ~~(j2 / 20);
          var t3 = rotl5(a4) + ft(s3, b5, c5, d6) + e2 + w3[j2] + K2[s3] | 0;
          e2 = d6;
          d6 = c5;
          c5 = rotl30(b5);
          b5 = a4;
          a4 = t3;
        }
        this._a = a4 + this._a | 0;
        this._b = b5 + this._b | 0;
        this._c = c5 + this._c | 0;
        this._d = d6 + this._d | 0;
        this._e = e2 + this._e | 0;
      };
      Sha.prototype._hash = function() {
        var H3 = Buffer4.allocUnsafe(20);
        H3.writeInt32BE(this._a | 0, 0);
        H3.writeInt32BE(this._b | 0, 4);
        H3.writeInt32BE(this._c | 0, 8);
        H3.writeInt32BE(this._d | 0, 12);
        H3.writeInt32BE(this._e | 0, 16);
        return H3;
      };
      module.exports = Sha;
    }
  });

  // node_modules/sha.js/sha1.js
  var require_sha1 = __commonJS({
    "node_modules/sha.js/sha1.js"(exports, module) {
      "use strict";
      var inherits = require_inherits_browser();
      var Hash = require_hash();
      var Buffer4 = require_safe_buffer().Buffer;
      var K2 = [
        1518500249,
        1859775393,
        2400959708 | 0,
        3395469782 | 0
      ];
      var W = new Array(80);
      function Sha1() {
        this.init();
        this._w = W;
        Hash.call(this, 64, 56);
      }
      inherits(Sha1, Hash);
      Sha1.prototype.init = function() {
        this._a = 1732584193;
        this._b = 4023233417;
        this._c = 2562383102;
        this._d = 271733878;
        this._e = 3285377520;
        return this;
      };
      function rotl1(num) {
        return num << 1 | num >>> 31;
      }
      function rotl5(num) {
        return num << 5 | num >>> 27;
      }
      function rotl30(num) {
        return num << 30 | num >>> 2;
      }
      function ft(s3, b5, c5, d6) {
        if (s3 === 0) {
          return b5 & c5 | ~b5 & d6;
        }
        if (s3 === 2) {
          return b5 & c5 | b5 & d6 | c5 & d6;
        }
        return b5 ^ c5 ^ d6;
      }
      Sha1.prototype._update = function(M2) {
        var w3 = this._w;
        var a4 = this._a | 0;
        var b5 = this._b | 0;
        var c5 = this._c | 0;
        var d6 = this._d | 0;
        var e2 = this._e | 0;
        for (var i = 0; i < 16; ++i) {
          w3[i] = M2.readInt32BE(i * 4);
        }
        for (; i < 80; ++i) {
          w3[i] = rotl1(w3[i - 3] ^ w3[i - 8] ^ w3[i - 14] ^ w3[i - 16]);
        }
        for (var j2 = 0; j2 < 80; ++j2) {
          var s3 = ~~(j2 / 20);
          var t3 = rotl5(a4) + ft(s3, b5, c5, d6) + e2 + w3[j2] + K2[s3] | 0;
          e2 = d6;
          d6 = c5;
          c5 = rotl30(b5);
          b5 = a4;
          a4 = t3;
        }
        this._a = a4 + this._a | 0;
        this._b = b5 + this._b | 0;
        this._c = c5 + this._c | 0;
        this._d = d6 + this._d | 0;
        this._e = e2 + this._e | 0;
      };
      Sha1.prototype._hash = function() {
        var H3 = Buffer4.allocUnsafe(20);
        H3.writeInt32BE(this._a | 0, 0);
        H3.writeInt32BE(this._b | 0, 4);
        H3.writeInt32BE(this._c | 0, 8);
        H3.writeInt32BE(this._d | 0, 12);
        H3.writeInt32BE(this._e | 0, 16);
        return H3;
      };
      module.exports = Sha1;
    }
  });

  // node_modules/sha.js/sha256.js
  var require_sha256 = __commonJS({
    "node_modules/sha.js/sha256.js"(exports, module) {
      "use strict";
      var inherits = require_inherits_browser();
      var Hash = require_hash();
      var Buffer4 = require_safe_buffer().Buffer;
      var K2 = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ];
      var W = new Array(64);
      function Sha256() {
        this.init();
        this._w = W;
        Hash.call(this, 64, 56);
      }
      inherits(Sha256, Hash);
      Sha256.prototype.init = function() {
        this._a = 1779033703;
        this._b = 3144134277;
        this._c = 1013904242;
        this._d = 2773480762;
        this._e = 1359893119;
        this._f = 2600822924;
        this._g = 528734635;
        this._h = 1541459225;
        return this;
      };
      function ch(x5, y7, z2) {
        return z2 ^ x5 & (y7 ^ z2);
      }
      function maj(x5, y7, z2) {
        return x5 & y7 | z2 & (x5 | y7);
      }
      function sigma0(x5) {
        return (x5 >>> 2 | x5 << 30) ^ (x5 >>> 13 | x5 << 19) ^ (x5 >>> 22 | x5 << 10);
      }
      function sigma1(x5) {
        return (x5 >>> 6 | x5 << 26) ^ (x5 >>> 11 | x5 << 21) ^ (x5 >>> 25 | x5 << 7);
      }
      function gamma0(x5) {
        return (x5 >>> 7 | x5 << 25) ^ (x5 >>> 18 | x5 << 14) ^ x5 >>> 3;
      }
      function gamma1(x5) {
        return (x5 >>> 17 | x5 << 15) ^ (x5 >>> 19 | x5 << 13) ^ x5 >>> 10;
      }
      Sha256.prototype._update = function(M2) {
        var w3 = this._w;
        var a4 = this._a | 0;
        var b5 = this._b | 0;
        var c5 = this._c | 0;
        var d6 = this._d | 0;
        var e2 = this._e | 0;
        var f7 = this._f | 0;
        var g5 = this._g | 0;
        var h4 = this._h | 0;
        for (var i = 0; i < 16; ++i) {
          w3[i] = M2.readInt32BE(i * 4);
        }
        for (; i < 64; ++i) {
          w3[i] = gamma1(w3[i - 2]) + w3[i - 7] + gamma0(w3[i - 15]) + w3[i - 16] | 0;
        }
        for (var j2 = 0; j2 < 64; ++j2) {
          var T1 = h4 + sigma1(e2) + ch(e2, f7, g5) + K2[j2] + w3[j2] | 0;
          var T2 = sigma0(a4) + maj(a4, b5, c5) | 0;
          h4 = g5;
          g5 = f7;
          f7 = e2;
          e2 = d6 + T1 | 0;
          d6 = c5;
          c5 = b5;
          b5 = a4;
          a4 = T1 + T2 | 0;
        }
        this._a = a4 + this._a | 0;
        this._b = b5 + this._b | 0;
        this._c = c5 + this._c | 0;
        this._d = d6 + this._d | 0;
        this._e = e2 + this._e | 0;
        this._f = f7 + this._f | 0;
        this._g = g5 + this._g | 0;
        this._h = h4 + this._h | 0;
      };
      Sha256.prototype._hash = function() {
        var H3 = Buffer4.allocUnsafe(32);
        H3.writeInt32BE(this._a, 0);
        H3.writeInt32BE(this._b, 4);
        H3.writeInt32BE(this._c, 8);
        H3.writeInt32BE(this._d, 12);
        H3.writeInt32BE(this._e, 16);
        H3.writeInt32BE(this._f, 20);
        H3.writeInt32BE(this._g, 24);
        H3.writeInt32BE(this._h, 28);
        return H3;
      };
      module.exports = Sha256;
    }
  });

  // node_modules/sha.js/sha224.js
  var require_sha224 = __commonJS({
    "node_modules/sha.js/sha224.js"(exports, module) {
      "use strict";
      var inherits = require_inherits_browser();
      var Sha256 = require_sha256();
      var Hash = require_hash();
      var Buffer4 = require_safe_buffer().Buffer;
      var W = new Array(64);
      function Sha224() {
        this.init();
        this._w = W;
        Hash.call(this, 64, 56);
      }
      inherits(Sha224, Sha256);
      Sha224.prototype.init = function() {
        this._a = 3238371032;
        this._b = 914150663;
        this._c = 812702999;
        this._d = 4144912697;
        this._e = 4290775857;
        this._f = 1750603025;
        this._g = 1694076839;
        this._h = 3204075428;
        return this;
      };
      Sha224.prototype._hash = function() {
        var H3 = Buffer4.allocUnsafe(28);
        H3.writeInt32BE(this._a, 0);
        H3.writeInt32BE(this._b, 4);
        H3.writeInt32BE(this._c, 8);
        H3.writeInt32BE(this._d, 12);
        H3.writeInt32BE(this._e, 16);
        H3.writeInt32BE(this._f, 20);
        H3.writeInt32BE(this._g, 24);
        return H3;
      };
      module.exports = Sha224;
    }
  });

  // node_modules/sha.js/sha512.js
  var require_sha512 = __commonJS({
    "node_modules/sha.js/sha512.js"(exports, module) {
      "use strict";
      var inherits = require_inherits_browser();
      var Hash = require_hash();
      var Buffer4 = require_safe_buffer().Buffer;
      var K2 = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      var W = new Array(160);
      function Sha512() {
        this.init();
        this._w = W;
        Hash.call(this, 128, 112);
      }
      inherits(Sha512, Hash);
      Sha512.prototype.init = function() {
        this._ah = 1779033703;
        this._bh = 3144134277;
        this._ch = 1013904242;
        this._dh = 2773480762;
        this._eh = 1359893119;
        this._fh = 2600822924;
        this._gh = 528734635;
        this._hh = 1541459225;
        this._al = 4089235720;
        this._bl = 2227873595;
        this._cl = 4271175723;
        this._dl = 1595750129;
        this._el = 2917565137;
        this._fl = 725511199;
        this._gl = 4215389547;
        this._hl = 327033209;
        return this;
      };
      function Ch(x5, y7, z2) {
        return z2 ^ x5 & (y7 ^ z2);
      }
      function maj(x5, y7, z2) {
        return x5 & y7 | z2 & (x5 | y7);
      }
      function sigma0(x5, xl) {
        return (x5 >>> 28 | xl << 4) ^ (xl >>> 2 | x5 << 30) ^ (xl >>> 7 | x5 << 25);
      }
      function sigma1(x5, xl) {
        return (x5 >>> 14 | xl << 18) ^ (x5 >>> 18 | xl << 14) ^ (xl >>> 9 | x5 << 23);
      }
      function Gamma0(x5, xl) {
        return (x5 >>> 1 | xl << 31) ^ (x5 >>> 8 | xl << 24) ^ x5 >>> 7;
      }
      function Gamma0l(x5, xl) {
        return (x5 >>> 1 | xl << 31) ^ (x5 >>> 8 | xl << 24) ^ (x5 >>> 7 | xl << 25);
      }
      function Gamma1(x5, xl) {
        return (x5 >>> 19 | xl << 13) ^ (xl >>> 29 | x5 << 3) ^ x5 >>> 6;
      }
      function Gamma1l(x5, xl) {
        return (x5 >>> 19 | xl << 13) ^ (xl >>> 29 | x5 << 3) ^ (x5 >>> 6 | xl << 26);
      }
      function getCarry(a4, b5) {
        return a4 >>> 0 < b5 >>> 0 ? 1 : 0;
      }
      Sha512.prototype._update = function(M2) {
        var w3 = this._w;
        var ah = this._ah | 0;
        var bh = this._bh | 0;
        var ch = this._ch | 0;
        var dh = this._dh | 0;
        var eh = this._eh | 0;
        var fh = this._fh | 0;
        var gh = this._gh | 0;
        var hh = this._hh | 0;
        var al = this._al | 0;
        var bl = this._bl | 0;
        var cl = this._cl | 0;
        var dl = this._dl | 0;
        var el = this._el | 0;
        var fl = this._fl | 0;
        var gl = this._gl | 0;
        var hl = this._hl | 0;
        for (var i = 0; i < 32; i += 2) {
          w3[i] = M2.readInt32BE(i * 4);
          w3[i + 1] = M2.readInt32BE(i * 4 + 4);
        }
        for (; i < 160; i += 2) {
          var xh = w3[i - 15 * 2];
          var xl = w3[i - 15 * 2 + 1];
          var gamma0 = Gamma0(xh, xl);
          var gamma0l = Gamma0l(xl, xh);
          xh = w3[i - 2 * 2];
          xl = w3[i - 2 * 2 + 1];
          var gamma1 = Gamma1(xh, xl);
          var gamma1l = Gamma1l(xl, xh);
          var Wi7h = w3[i - 7 * 2];
          var Wi7l = w3[i - 7 * 2 + 1];
          var Wi16h = w3[i - 16 * 2];
          var Wi16l = w3[i - 16 * 2 + 1];
          var Wil = gamma0l + Wi7l | 0;
          var Wih = gamma0 + Wi7h + getCarry(Wil, gamma0l) | 0;
          Wil = Wil + gamma1l | 0;
          Wih = Wih + gamma1 + getCarry(Wil, gamma1l) | 0;
          Wil = Wil + Wi16l | 0;
          Wih = Wih + Wi16h + getCarry(Wil, Wi16l) | 0;
          w3[i] = Wih;
          w3[i + 1] = Wil;
        }
        for (var j2 = 0; j2 < 160; j2 += 2) {
          Wih = w3[j2];
          Wil = w3[j2 + 1];
          var majh = maj(ah, bh, ch);
          var majl = maj(al, bl, cl);
          var sigma0h = sigma0(ah, al);
          var sigma0l = sigma0(al, ah);
          var sigma1h = sigma1(eh, el);
          var sigma1l = sigma1(el, eh);
          var Kih = K2[j2];
          var Kil = K2[j2 + 1];
          var chh = Ch(eh, fh, gh);
          var chl = Ch(el, fl, gl);
          var t1l = hl + sigma1l | 0;
          var t1h = hh + sigma1h + getCarry(t1l, hl) | 0;
          t1l = t1l + chl | 0;
          t1h = t1h + chh + getCarry(t1l, chl) | 0;
          t1l = t1l + Kil | 0;
          t1h = t1h + Kih + getCarry(t1l, Kil) | 0;
          t1l = t1l + Wil | 0;
          t1h = t1h + Wih + getCarry(t1l, Wil) | 0;
          var t2l = sigma0l + majl | 0;
          var t2h = sigma0h + majh + getCarry(t2l, sigma0l) | 0;
          hh = gh;
          hl = gl;
          gh = fh;
          gl = fl;
          fh = eh;
          fl = el;
          el = dl + t1l | 0;
          eh = dh + t1h + getCarry(el, dl) | 0;
          dh = ch;
          dl = cl;
          ch = bh;
          cl = bl;
          bh = ah;
          bl = al;
          al = t1l + t2l | 0;
          ah = t1h + t2h + getCarry(al, t1l) | 0;
        }
        this._al = this._al + al | 0;
        this._bl = this._bl + bl | 0;
        this._cl = this._cl + cl | 0;
        this._dl = this._dl + dl | 0;
        this._el = this._el + el | 0;
        this._fl = this._fl + fl | 0;
        this._gl = this._gl + gl | 0;
        this._hl = this._hl + hl | 0;
        this._ah = this._ah + ah + getCarry(this._al, al) | 0;
        this._bh = this._bh + bh + getCarry(this._bl, bl) | 0;
        this._ch = this._ch + ch + getCarry(this._cl, cl) | 0;
        this._dh = this._dh + dh + getCarry(this._dl, dl) | 0;
        this._eh = this._eh + eh + getCarry(this._el, el) | 0;
        this._fh = this._fh + fh + getCarry(this._fl, fl) | 0;
        this._gh = this._gh + gh + getCarry(this._gl, gl) | 0;
        this._hh = this._hh + hh + getCarry(this._hl, hl) | 0;
      };
      Sha512.prototype._hash = function() {
        var H3 = Buffer4.allocUnsafe(64);
        function writeInt64BE(h4, l6, offset) {
          H3.writeInt32BE(h4, offset);
          H3.writeInt32BE(l6, offset + 4);
        }
        writeInt64BE(this._ah, this._al, 0);
        writeInt64BE(this._bh, this._bl, 8);
        writeInt64BE(this._ch, this._cl, 16);
        writeInt64BE(this._dh, this._dl, 24);
        writeInt64BE(this._eh, this._el, 32);
        writeInt64BE(this._fh, this._fl, 40);
        writeInt64BE(this._gh, this._gl, 48);
        writeInt64BE(this._hh, this._hl, 56);
        return H3;
      };
      module.exports = Sha512;
    }
  });

  // node_modules/sha.js/sha384.js
  var require_sha384 = __commonJS({
    "node_modules/sha.js/sha384.js"(exports, module) {
      "use strict";
      var inherits = require_inherits_browser();
      var SHA512 = require_sha512();
      var Hash = require_hash();
      var Buffer4 = require_safe_buffer().Buffer;
      var W = new Array(160);
      function Sha384() {
        this.init();
        this._w = W;
        Hash.call(this, 128, 112);
      }
      inherits(Sha384, SHA512);
      Sha384.prototype.init = function() {
        this._ah = 3418070365;
        this._bh = 1654270250;
        this._ch = 2438529370;
        this._dh = 355462360;
        this._eh = 1731405415;
        this._fh = 2394180231;
        this._gh = 3675008525;
        this._hh = 1203062813;
        this._al = 3238371032;
        this._bl = 914150663;
        this._cl = 812702999;
        this._dl = 4144912697;
        this._el = 4290775857;
        this._fl = 1750603025;
        this._gl = 1694076839;
        this._hl = 3204075428;
        return this;
      };
      Sha384.prototype._hash = function() {
        var H3 = Buffer4.allocUnsafe(48);
        function writeInt64BE(h4, l6, offset) {
          H3.writeInt32BE(h4, offset);
          H3.writeInt32BE(l6, offset + 4);
        }
        writeInt64BE(this._ah, this._al, 0);
        writeInt64BE(this._bh, this._bl, 8);
        writeInt64BE(this._ch, this._cl, 16);
        writeInt64BE(this._dh, this._dl, 24);
        writeInt64BE(this._eh, this._el, 32);
        writeInt64BE(this._fh, this._fl, 40);
        return H3;
      };
      module.exports = Sha384;
    }
  });

  // node_modules/sha.js/index.js
  var require_sha2 = __commonJS({
    "node_modules/sha.js/index.js"(exports, module) {
      "use strict";
      module.exports = function SHA(algorithm) {
        var alg = algorithm.toLowerCase();
        var Algorithm = module.exports[alg];
        if (!Algorithm) {
          throw new Error(alg + " is not supported (we accept pull requests)");
        }
        return new Algorithm();
      };
      module.exports.sha = require_sha();
      module.exports.sha1 = require_sha1();
      module.exports.sha224 = require_sha224();
      module.exports.sha256 = require_sha256();
      module.exports.sha384 = require_sha384();
      module.exports.sha512 = require_sha512();
    }
  });

  // node_modules/crc/node_modules/buffer/index.js
  var require_buffer2 = __commonJS({
    "node_modules/crc/node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer4;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer4.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer4.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          var proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e2) {
          return false;
        }
      }
      Object.defineProperty(Buffer4.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer4.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer4.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer4.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        var buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer4.prototype);
        return buf;
      }
      function Buffer4(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer4.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        var valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer4.from(valueOf, encodingOrOffset, length);
        }
        var b5 = fromObject(value);
        if (b5) return b5;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer4.from(
            value[Symbol.toPrimitive]("string"),
            encodingOrOffset,
            length
          );
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer4.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer4.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer4, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer4.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer4.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer4.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer4.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        var length = byteLength(string, encoding) | 0;
        var buf = createBuffer(length);
        var actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        var length = array.length < 0 ? 0 : checked(array.length) | 0;
        var buf = createBuffer(length);
        for (var i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          var copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        var buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer4.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer4.isBuffer(obj)) {
          var len = checked(obj.length) | 0;
          var buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer4.alloc(+length);
      }
      Buffer4.isBuffer = function isBuffer(b5) {
        return b5 != null && b5._isBuffer === true && b5 !== Buffer4.prototype;
      };
      Buffer4.compare = function compare(a4, b5) {
        if (isInstance(a4, Uint8Array)) a4 = Buffer4.from(a4, a4.offset, a4.byteLength);
        if (isInstance(b5, Uint8Array)) b5 = Buffer4.from(b5, b5.offset, b5.byteLength);
        if (!Buffer4.isBuffer(a4) || !Buffer4.isBuffer(b5)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a4 === b5) return 0;
        var x5 = a4.length;
        var y7 = b5.length;
        for (var i = 0, len = Math.min(x5, y7); i < len; ++i) {
          if (a4[i] !== b5[i]) {
            x5 = a4[i];
            y7 = b5[i];
            break;
          }
        }
        if (x5 < y7) return -1;
        if (y7 < x5) return 1;
        return 0;
      };
      Buffer4.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer4.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer4.alloc(0);
        }
        var i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        var buffer = Buffer4.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              Buffer4.from(buf).copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer4.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer4.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        var len = string.length;
        var mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer4.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer4.prototype._isBuffer = true;
      function swap(b5, n2, m4) {
        var i = b5[n2];
        b5[n2] = b5[m4];
        b5[m4] = i;
      }
      Buffer4.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer4.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer4.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer4.prototype.toString = function toString() {
        var length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer4.prototype.toLocaleString = Buffer4.prototype.toString;
      Buffer4.prototype.equals = function equals(b5) {
        if (!Buffer4.isBuffer(b5)) throw new TypeError("Argument must be a Buffer");
        if (this === b5) return true;
        return Buffer4.compare(this, b5) === 0;
      };
      Buffer4.prototype.inspect = function inspect() {
        var str = "";
        var max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer4.prototype[customInspectSymbol] = Buffer4.prototype.inspect;
      }
      Buffer4.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer4.from(target, target.offset, target.byteLength);
        }
        if (!Buffer4.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        var x5 = thisEnd - thisStart;
        var y7 = end - start;
        var len = Math.min(x5, y7);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x5 = thisCopy[i];
            y7 = targetCopy[i];
            break;
          }
        }
        if (x5 < y7) return -1;
        if (y7 < x5) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer4.from(val, encoding);
        }
        if (Buffer4.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j2 = 0; j2 < valLength; j2++) {
              if (read(arr, i + j2) !== read(val, j2)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer4.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer4.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer4.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        var strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer4.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        var remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer4.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        var res = "";
        var i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        var len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        var out = "";
        for (var i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer4.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        var newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer4.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer4.prototype.readUintLE = Buffer4.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer4.prototype.readUintBE = Buffer4.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        var val = this[offset + --byteLength2];
        var mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer4.prototype.readUint8 = Buffer4.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer4.prototype.readUint16LE = Buffer4.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer4.prototype.readUint16BE = Buffer4.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer4.prototype.readUint32LE = Buffer4.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer4.prototype.readUint32BE = Buffer4.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer4.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer4.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        var i = byteLength2;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer4.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer4.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer4.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer4.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer4.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer4.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer4.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer4.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer4.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer4.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer4.prototype.writeUintLE = Buffer4.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeUintBE = Buffer4.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeUint8 = Buffer4.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer4.prototype.writeUint16LE = Buffer4.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer4.prototype.writeUint16BE = Buffer4.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer4.prototype.writeUint32LE = Buffer4.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer4.prototype.writeUint32BE = Buffer4.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer4.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer4.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer4.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer4.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer4.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer4.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer4.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer4.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer4.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer4.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer4.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer4.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer4.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = Buffer4.isBuffer(val) ? val : Buffer4.from(val, encoding);
          var len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        var c5, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c5 = str.charCodeAt(i);
          hi = c5 >> 8;
          lo = c5 % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = (function() {
        var alphabet = "0123456789abcdef";
        var table = new Array(256);
        for (var i = 0; i < 16; ++i) {
          var i16 = i * 16;
          for (var j2 = 0; j2 < 16; ++j2) {
            table[i16 + j2] = alphabet[i] + alphabet[j2];
          }
        }
        return table;
      })();
    }
  });

  // node_modules/crc/lib/es6/create_buffer.js
  var require_create_buffer = __commonJS({
    "node_modules/crc/lib/es6/create_buffer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var createBuffer = _buffer.Buffer.from && _buffer.Buffer.alloc && _buffer.Buffer.allocUnsafe && _buffer.Buffer.allocUnsafeSlow ? _buffer.Buffer.from : (
        // support for Node < 5.10
        function(val) {
          return new _buffer.Buffer(val);
        }
      );
      exports.default = createBuffer;
    }
  });

  // node_modules/crc/lib/es6/define_crc.js
  var require_define_crc = __commonJS({
    "node_modules/crc/lib/es6/define_crc.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = function(model, calc) {
        var fn = function fn2(buf, previous) {
          return calc(buf, previous) >>> 0;
        };
        fn.signed = calc;
        fn.unsigned = fn;
        fn.model = model;
        return fn;
      };
    }
  });

  // node_modules/crc/lib/es6/crc1.js
  var require_crc1 = __commonJS({
    "node_modules/crc/lib/es6/crc1.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var _create_buffer = require_create_buffer();
      var _create_buffer2 = _interopRequireDefault(_create_buffer);
      var _define_crc = require_define_crc();
      var _define_crc2 = _interopRequireDefault(_define_crc);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var crc1 = (0, _define_crc2.default)("crc1", function(buf, previous) {
        if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);
        var crc = ~~previous;
        var accum = 0;
        for (var index = 0; index < buf.length; index++) {
          var byte = buf[index];
          accum += byte;
        }
        crc += accum % 256;
        return crc % 256;
      });
      exports.default = crc1;
    }
  });

  // node_modules/crc/lib/crc1.js
  var require_crc12 = __commonJS({
    "node_modules/crc/lib/crc1.js"(exports, module) {
      "use strict";
      module.exports = require_crc1().default;
    }
  });

  // node_modules/crc/lib/es6/crc8.js
  var require_crc8 = __commonJS({
    "node_modules/crc/lib/es6/crc8.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var _create_buffer = require_create_buffer();
      var _create_buffer2 = _interopRequireDefault(_create_buffer);
      var _define_crc = require_define_crc();
      var _define_crc2 = _interopRequireDefault(_define_crc);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var TABLE = [0, 7, 14, 9, 28, 27, 18, 21, 56, 63, 54, 49, 36, 35, 42, 45, 112, 119, 126, 121, 108, 107, 98, 101, 72, 79, 70, 65, 84, 83, 90, 93, 224, 231, 238, 233, 252, 251, 242, 245, 216, 223, 214, 209, 196, 195, 202, 205, 144, 151, 158, 153, 140, 139, 130, 133, 168, 175, 166, 161, 180, 179, 186, 189, 199, 192, 201, 206, 219, 220, 213, 210, 255, 248, 241, 246, 227, 228, 237, 234, 183, 176, 185, 190, 171, 172, 165, 162, 143, 136, 129, 134, 147, 148, 157, 154, 39, 32, 41, 46, 59, 60, 53, 50, 31, 24, 17, 22, 3, 4, 13, 10, 87, 80, 89, 94, 75, 76, 69, 66, 111, 104, 97, 102, 115, 116, 125, 122, 137, 142, 135, 128, 149, 146, 155, 156, 177, 182, 191, 184, 173, 170, 163, 164, 249, 254, 247, 240, 229, 226, 235, 236, 193, 198, 207, 200, 221, 218, 211, 212, 105, 110, 103, 96, 117, 114, 123, 124, 81, 86, 95, 88, 77, 74, 67, 68, 25, 30, 23, 16, 5, 2, 11, 12, 33, 38, 47, 40, 61, 58, 51, 52, 78, 73, 64, 71, 82, 85, 92, 91, 118, 113, 120, 127, 106, 109, 100, 99, 62, 57, 48, 55, 34, 37, 44, 43, 6, 1, 8, 15, 26, 29, 20, 19, 174, 169, 160, 167, 178, 181, 188, 187, 150, 145, 152, 159, 138, 141, 132, 131, 222, 217, 208, 215, 194, 197, 204, 203, 230, 225, 232, 239, 250, 253, 244, 243];
      if (typeof Int32Array !== "undefined") TABLE = new Int32Array(TABLE);
      var crc8 = (0, _define_crc2.default)("crc-8", function(buf, previous) {
        if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);
        var crc = ~~previous;
        for (var index = 0; index < buf.length; index++) {
          var byte = buf[index];
          crc = TABLE[(crc ^ byte) & 255] & 255;
        }
        return crc;
      });
      exports.default = crc8;
    }
  });

  // node_modules/crc/lib/crc8.js
  var require_crc82 = __commonJS({
    "node_modules/crc/lib/crc8.js"(exports, module) {
      "use strict";
      module.exports = require_crc8().default;
    }
  });

  // node_modules/crc/lib/es6/crc81wire.js
  var require_crc81wire = __commonJS({
    "node_modules/crc/lib/es6/crc81wire.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var _create_buffer = require_create_buffer();
      var _create_buffer2 = _interopRequireDefault(_create_buffer);
      var _define_crc = require_define_crc();
      var _define_crc2 = _interopRequireDefault(_define_crc);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var TABLE = [0, 94, 188, 226, 97, 63, 221, 131, 194, 156, 126, 32, 163, 253, 31, 65, 157, 195, 33, 127, 252, 162, 64, 30, 95, 1, 227, 189, 62, 96, 130, 220, 35, 125, 159, 193, 66, 28, 254, 160, 225, 191, 93, 3, 128, 222, 60, 98, 190, 224, 2, 92, 223, 129, 99, 61, 124, 34, 192, 158, 29, 67, 161, 255, 70, 24, 250, 164, 39, 121, 155, 197, 132, 218, 56, 102, 229, 187, 89, 7, 219, 133, 103, 57, 186, 228, 6, 88, 25, 71, 165, 251, 120, 38, 196, 154, 101, 59, 217, 135, 4, 90, 184, 230, 167, 249, 27, 69, 198, 152, 122, 36, 248, 166, 68, 26, 153, 199, 37, 123, 58, 100, 134, 216, 91, 5, 231, 185, 140, 210, 48, 110, 237, 179, 81, 15, 78, 16, 242, 172, 47, 113, 147, 205, 17, 79, 173, 243, 112, 46, 204, 146, 211, 141, 111, 49, 178, 236, 14, 80, 175, 241, 19, 77, 206, 144, 114, 44, 109, 51, 209, 143, 12, 82, 176, 238, 50, 108, 142, 208, 83, 13, 239, 177, 240, 174, 76, 18, 145, 207, 45, 115, 202, 148, 118, 40, 171, 245, 23, 73, 8, 86, 180, 234, 105, 55, 213, 139, 87, 9, 235, 181, 54, 104, 138, 212, 149, 203, 41, 119, 244, 170, 72, 22, 233, 183, 85, 11, 136, 214, 52, 106, 43, 117, 151, 201, 74, 20, 246, 168, 116, 42, 200, 150, 21, 75, 169, 247, 182, 232, 10, 84, 215, 137, 107, 53];
      if (typeof Int32Array !== "undefined") TABLE = new Int32Array(TABLE);
      var crc81wire = (0, _define_crc2.default)("dallas-1-wire", function(buf, previous) {
        if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);
        var crc = ~~previous;
        for (var index = 0; index < buf.length; index++) {
          var byte = buf[index];
          crc = TABLE[(crc ^ byte) & 255] & 255;
        }
        return crc;
      });
      exports.default = crc81wire;
    }
  });

  // node_modules/crc/lib/crc8_1wire.js
  var require_crc8_1wire = __commonJS({
    "node_modules/crc/lib/crc8_1wire.js"(exports, module) {
      "use strict";
      module.exports = require_crc81wire().default;
    }
  });

  // node_modules/crc/lib/es6/crc16.js
  var require_crc16 = __commonJS({
    "node_modules/crc/lib/es6/crc16.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var _create_buffer = require_create_buffer();
      var _create_buffer2 = _interopRequireDefault(_create_buffer);
      var _define_crc = require_define_crc();
      var _define_crc2 = _interopRequireDefault(_define_crc);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var TABLE = [0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648, 2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8e3, 56577, 7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672, 61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3, 65089, 64001, 15040, 15232, 64321, 14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600, 58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881, 26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137, 26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32e3, 48577, 48257, 31808, 46081, 29888, 30080, 46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441, 38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977, 34817, 18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369, 33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448];
      if (typeof Int32Array !== "undefined") TABLE = new Int32Array(TABLE);
      var crc16 = (0, _define_crc2.default)("crc-16", function(buf, previous) {
        if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);
        var crc = ~~previous;
        for (var index = 0; index < buf.length; index++) {
          var byte = buf[index];
          crc = (TABLE[(crc ^ byte) & 255] ^ crc >> 8) & 65535;
        }
        return crc;
      });
      exports.default = crc16;
    }
  });

  // node_modules/crc/lib/crc16.js
  var require_crc162 = __commonJS({
    "node_modules/crc/lib/crc16.js"(exports, module) {
      "use strict";
      module.exports = require_crc16().default;
    }
  });

  // node_modules/crc/lib/es6/crc16ccitt.js
  var require_crc16ccitt = __commonJS({
    "node_modules/crc/lib/es6/crc16ccitt.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var _create_buffer = require_create_buffer();
      var _create_buffer2 = _interopRequireDefault(_create_buffer);
      var _define_crc = require_define_crc();
      var _define_crc2 = _interopRequireDefault(_define_crc);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var TABLE = [0, 4129, 8258, 12387, 16516, 20645, 24774, 28903, 33032, 37161, 41290, 45419, 49548, 53677, 57806, 61935, 4657, 528, 12915, 8786, 21173, 17044, 29431, 25302, 37689, 33560, 45947, 41818, 54205, 50076, 62463, 58334, 9314, 13379, 1056, 5121, 25830, 29895, 17572, 21637, 42346, 46411, 34088, 38153, 58862, 62927, 50604, 54669, 13907, 9842, 5649, 1584, 30423, 26358, 22165, 18100, 46939, 42874, 38681, 34616, 63455, 59390, 55197, 51132, 18628, 22757, 26758, 30887, 2112, 6241, 10242, 14371, 51660, 55789, 59790, 63919, 35144, 39273, 43274, 47403, 23285, 19156, 31415, 27286, 6769, 2640, 14899, 10770, 56317, 52188, 64447, 60318, 39801, 35672, 47931, 43802, 27814, 31879, 19684, 23749, 11298, 15363, 3168, 7233, 60846, 64911, 52716, 56781, 44330, 48395, 36200, 40265, 32407, 28342, 24277, 20212, 15891, 11826, 7761, 3696, 65439, 61374, 57309, 53244, 48923, 44858, 40793, 36728, 37256, 33193, 45514, 41451, 53516, 49453, 61774, 57711, 4224, 161, 12482, 8419, 20484, 16421, 28742, 24679, 33721, 37784, 41979, 46042, 49981, 54044, 58239, 62302, 689, 4752, 8947, 13010, 16949, 21012, 25207, 29270, 46570, 42443, 38312, 34185, 62830, 58703, 54572, 50445, 13538, 9411, 5280, 1153, 29798, 25671, 21540, 17413, 42971, 47098, 34713, 38840, 59231, 63358, 50973, 55100, 9939, 14066, 1681, 5808, 26199, 30326, 17941, 22068, 55628, 51565, 63758, 59695, 39368, 35305, 47498, 43435, 22596, 18533, 30726, 26663, 6336, 2273, 14466, 10403, 52093, 56156, 60223, 64286, 35833, 39896, 43963, 48026, 19061, 23124, 27191, 31254, 2801, 6864, 10931, 14994, 64814, 60687, 56684, 52557, 48554, 44427, 40424, 36297, 31782, 27655, 23652, 19525, 15522, 11395, 7392, 3265, 61215, 65342, 53085, 57212, 44955, 49082, 36825, 40952, 28183, 32310, 20053, 24180, 11923, 16050, 3793, 7920];
      if (typeof Int32Array !== "undefined") TABLE = new Int32Array(TABLE);
      var crc16ccitt = (0, _define_crc2.default)("ccitt", function(buf, previous) {
        if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);
        var crc = typeof previous !== "undefined" ? ~~previous : 65535;
        for (var index = 0; index < buf.length; index++) {
          var byte = buf[index];
          crc = (TABLE[(crc >> 8 ^ byte) & 255] ^ crc << 8) & 65535;
        }
        return crc;
      });
      exports.default = crc16ccitt;
    }
  });

  // node_modules/crc/lib/crc16_ccitt.js
  var require_crc16_ccitt = __commonJS({
    "node_modules/crc/lib/crc16_ccitt.js"(exports, module) {
      "use strict";
      module.exports = require_crc16ccitt().default;
    }
  });

  // node_modules/crc/lib/es6/crc16modbus.js
  var require_crc16modbus = __commonJS({
    "node_modules/crc/lib/es6/crc16modbus.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var _create_buffer = require_create_buffer();
      var _create_buffer2 = _interopRequireDefault(_create_buffer);
      var _define_crc = require_define_crc();
      var _define_crc2 = _interopRequireDefault(_define_crc);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var TABLE = [0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648, 2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8e3, 56577, 7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672, 61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3, 65089, 64001, 15040, 15232, 64321, 14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600, 58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881, 26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137, 26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32e3, 48577, 48257, 31808, 46081, 29888, 30080, 46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441, 38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977, 34817, 18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369, 33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448];
      if (typeof Int32Array !== "undefined") TABLE = new Int32Array(TABLE);
      var crc16modbus = (0, _define_crc2.default)("crc-16-modbus", function(buf, previous) {
        if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);
        var crc = typeof previous !== "undefined" ? ~~previous : 65535;
        for (var index = 0; index < buf.length; index++) {
          var byte = buf[index];
          crc = (TABLE[(crc ^ byte) & 255] ^ crc >> 8) & 65535;
        }
        return crc;
      });
      exports.default = crc16modbus;
    }
  });

  // node_modules/crc/lib/crc16_modbus.js
  var require_crc16_modbus = __commonJS({
    "node_modules/crc/lib/crc16_modbus.js"(exports, module) {
      "use strict";
      module.exports = require_crc16modbus().default;
    }
  });

  // node_modules/crc/lib/es6/crc16xmodem.js
  var require_crc16xmodem = __commonJS({
    "node_modules/crc/lib/es6/crc16xmodem.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var _create_buffer = require_create_buffer();
      var _create_buffer2 = _interopRequireDefault(_create_buffer);
      var _define_crc = require_define_crc();
      var _define_crc2 = _interopRequireDefault(_define_crc);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var crc16xmodem = (0, _define_crc2.default)("xmodem", function(buf, previous) {
        if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);
        var crc = typeof previous !== "undefined" ? ~~previous : 0;
        for (var index = 0; index < buf.length; index++) {
          var byte = buf[index];
          var code = crc >>> 8 & 255;
          code ^= byte & 255;
          code ^= code >>> 4;
          crc = crc << 8 & 65535;
          crc ^= code;
          code = code << 5 & 65535;
          crc ^= code;
          code = code << 7 & 65535;
          crc ^= code;
        }
        return crc;
      });
      exports.default = crc16xmodem;
    }
  });

  // node_modules/crc/lib/crc16_xmodem.js
  var require_crc16_xmodem = __commonJS({
    "node_modules/crc/lib/crc16_xmodem.js"(exports, module) {
      "use strict";
      module.exports = require_crc16xmodem().default;
    }
  });

  // node_modules/crc/lib/es6/crc16kermit.js
  var require_crc16kermit = __commonJS({
    "node_modules/crc/lib/es6/crc16kermit.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var _create_buffer = require_create_buffer();
      var _create_buffer2 = _interopRequireDefault(_create_buffer);
      var _define_crc = require_define_crc();
      var _define_crc2 = _interopRequireDefault(_define_crc);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var TABLE = [0, 4489, 8978, 12955, 17956, 22445, 25910, 29887, 35912, 40385, 44890, 48851, 51820, 56293, 59774, 63735, 4225, 264, 13203, 8730, 22181, 18220, 30135, 25662, 40137, 36160, 49115, 44626, 56045, 52068, 63999, 59510, 8450, 12427, 528, 5017, 26406, 30383, 17460, 21949, 44362, 48323, 36440, 40913, 60270, 64231, 51324, 55797, 12675, 8202, 4753, 792, 30631, 26158, 21685, 17724, 48587, 44098, 40665, 36688, 64495, 60006, 55549, 51572, 16900, 21389, 24854, 28831, 1056, 5545, 10034, 14011, 52812, 57285, 60766, 64727, 34920, 39393, 43898, 47859, 21125, 17164, 29079, 24606, 5281, 1320, 14259, 9786, 57037, 53060, 64991, 60502, 39145, 35168, 48123, 43634, 25350, 29327, 16404, 20893, 9506, 13483, 1584, 6073, 61262, 65223, 52316, 56789, 43370, 47331, 35448, 39921, 29575, 25102, 20629, 16668, 13731, 9258, 5809, 1848, 65487, 60998, 56541, 52564, 47595, 43106, 39673, 35696, 33800, 38273, 42778, 46739, 49708, 54181, 57662, 61623, 2112, 6601, 11090, 15067, 20068, 24557, 28022, 31999, 38025, 34048, 47003, 42514, 53933, 49956, 61887, 57398, 6337, 2376, 15315, 10842, 24293, 20332, 32247, 27774, 42250, 46211, 34328, 38801, 58158, 62119, 49212, 53685, 10562, 14539, 2640, 7129, 28518, 32495, 19572, 24061, 46475, 41986, 38553, 34576, 62383, 57894, 53437, 49460, 14787, 10314, 6865, 2904, 32743, 28270, 23797, 19836, 50700, 55173, 58654, 62615, 32808, 37281, 41786, 45747, 19012, 23501, 26966, 30943, 3168, 7657, 12146, 16123, 54925, 50948, 62879, 58390, 37033, 33056, 46011, 41522, 23237, 19276, 31191, 26718, 7393, 3432, 16371, 11898, 59150, 63111, 50204, 54677, 41258, 45219, 33336, 37809, 27462, 31439, 18516, 23005, 11618, 15595, 3696, 8185, 63375, 58886, 54429, 50452, 45483, 40994, 37561, 33584, 31687, 27214, 22741, 18780, 15843, 11370, 7921, 3960];
      if (typeof Int32Array !== "undefined") TABLE = new Int32Array(TABLE);
      var crc16kermit = (0, _define_crc2.default)("kermit", function(buf, previous) {
        if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);
        var crc = typeof previous !== "undefined" ? ~~previous : 0;
        for (var index = 0; index < buf.length; index++) {
          var byte = buf[index];
          crc = (TABLE[(crc ^ byte) & 255] ^ crc >> 8) & 65535;
        }
        return crc;
      });
      exports.default = crc16kermit;
    }
  });

  // node_modules/crc/lib/crc16_kermit.js
  var require_crc16_kermit = __commonJS({
    "node_modules/crc/lib/crc16_kermit.js"(exports, module) {
      "use strict";
      module.exports = require_crc16kermit().default;
    }
  });

  // node_modules/crc/lib/es6/crc24.js
  var require_crc24 = __commonJS({
    "node_modules/crc/lib/es6/crc24.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var _create_buffer = require_create_buffer();
      var _create_buffer2 = _interopRequireDefault(_create_buffer);
      var _define_crc = require_define_crc();
      var _define_crc2 = _interopRequireDefault(_define_crc);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var TABLE = [0, 8801531, 9098509, 825846, 9692897, 1419802, 1651692, 10452759, 10584377, 2608578, 2839604, 11344079, 3303384, 11807523, 12104405, 4128302, 12930697, 4391538, 5217156, 13227903, 5679208, 13690003, 14450021, 5910942, 6606768, 14844747, 15604413, 6837830, 16197969, 7431594, 8256604, 16494759, 840169, 9084178, 8783076, 18463, 10434312, 1670131, 1434117, 9678590, 11358416, 2825259, 2590173, 10602790, 4109873, 12122826, 11821884, 3289031, 13213536, 5231515, 4409965, 12912278, 5929345, 14431610, 13675660, 5693559, 6823513, 15618722, 14863188, 6588335, 16513208, 8238147, 7417269, 16212302, 1680338, 10481449, 9664223, 1391140, 9061683, 788936, 36926, 8838341, 12067563, 4091408, 3340262, 11844381, 2868234, 11372785, 10555655, 2579964, 14478683, 5939616, 5650518, 13661357, 5180346, 13190977, 12967607, 4428364, 8219746, 16457881, 16234863, 7468436, 15633027, 6866552, 6578062, 14816117, 1405499, 9649856, 10463030, 1698765, 8819930, 55329, 803287, 9047340, 11858690, 3325945, 4072975, 12086004, 2561507, 10574104, 11387118, 2853909, 13647026, 5664841, 5958079, 14460228, 4446803, 12949160, 13176670, 5194661, 7454091, 16249200, 16476294, 8201341, 14834538, 6559633, 6852199, 15647388, 3360676, 11864927, 12161705, 4185682, 10527045, 2551230, 2782280, 11286707, 9619101, 1346150, 1577872, 10379115, 73852, 8875143, 9172337, 899466, 16124205, 7357910, 8182816, 16421083, 6680524, 14918455, 15678145, 6911546, 5736468, 13747439, 14507289, 5968354, 12873461, 4334094, 5159928, 13170435, 4167245, 12180150, 11879232, 3346363, 11301036, 2767959, 2532769, 10545498, 10360692, 1596303, 1360505, 9604738, 913813, 9157998, 8856728, 92259, 16439492, 8164415, 7343561, 16138546, 6897189, 15692510, 14936872, 6662099, 5986813, 14488838, 13733104, 5750795, 13156124, 5174247, 4352529, 12855018, 2810998, 11315341, 10498427, 2522496, 12124823, 4148844, 3397530, 11901793, 9135439, 862644, 110658, 8912057, 1606574, 10407765, 9590435, 1317464, 15706879, 6940164, 6651890, 14889737, 8145950, 16384229, 16161043, 7394792, 5123014, 13133629, 12910283, 4370992, 14535975, 5997020, 5707818, 13718737, 2504095, 10516836, 11329682, 2796649, 11916158, 3383173, 4130419, 12143240, 8893606, 129117, 876971, 9121104, 1331783, 9576124, 10389322, 1625009, 14908182, 6633453, 6925851, 15721184, 7380471, 16175372, 16402682, 8127489, 4389423, 12891860, 13119266, 5137369, 13704398, 5722165, 6015427, 14517560];
      if (typeof Int32Array !== "undefined") TABLE = new Int32Array(TABLE);
      var crc24 = (0, _define_crc2.default)("crc-24", function(buf, previous) {
        if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);
        var crc = typeof previous !== "undefined" ? ~~previous : 11994318;
        for (var index = 0; index < buf.length; index++) {
          var byte = buf[index];
          crc = (TABLE[(crc >> 16 ^ byte) & 255] ^ crc << 8) & 16777215;
        }
        return crc;
      });
      exports.default = crc24;
    }
  });

  // node_modules/crc/lib/crc24.js
  var require_crc242 = __commonJS({
    "node_modules/crc/lib/crc24.js"(exports, module) {
      "use strict";
      module.exports = require_crc24().default;
    }
  });

  // node_modules/crc/lib/es6/crc32.js
  var require_crc32 = __commonJS({
    "node_modules/crc/lib/es6/crc32.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var _create_buffer = require_create_buffer();
      var _create_buffer2 = _interopRequireDefault(_create_buffer);
      var _define_crc = require_define_crc();
      var _define_crc2 = _interopRequireDefault(_define_crc);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var TABLE = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
      if (typeof Int32Array !== "undefined") TABLE = new Int32Array(TABLE);
      var crc32 = (0, _define_crc2.default)("crc-32", function(buf, previous) {
        if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);
        var crc = previous === 0 ? 0 : ~~previous ^ -1;
        for (var index = 0; index < buf.length; index++) {
          var byte = buf[index];
          crc = TABLE[(crc ^ byte) & 255] ^ crc >>> 8;
        }
        return crc ^ -1;
      });
      exports.default = crc32;
    }
  });

  // node_modules/crc/lib/crc32.js
  var require_crc322 = __commonJS({
    "node_modules/crc/lib/crc32.js"(exports, module) {
      "use strict";
      module.exports = require_crc32().default;
    }
  });

  // node_modules/crc/lib/es6/crcjam.js
  var require_crcjam = __commonJS({
    "node_modules/crc/lib/es6/crcjam.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _buffer = require_buffer2();
      var _create_buffer = require_create_buffer();
      var _create_buffer2 = _interopRequireDefault(_create_buffer);
      var _define_crc = require_define_crc();
      var _define_crc2 = _interopRequireDefault(_define_crc);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var TABLE = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
      if (typeof Int32Array !== "undefined") TABLE = new Int32Array(TABLE);
      var crcjam = (0, _define_crc2.default)("jam", function(buf) {
        var previous = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
        if (!_buffer.Buffer.isBuffer(buf)) buf = (0, _create_buffer2.default)(buf);
        var crc = previous === 0 ? 0 : ~~previous;
        for (var index = 0; index < buf.length; index++) {
          var byte = buf[index];
          crc = TABLE[(crc ^ byte) & 255] ^ crc >>> 8;
        }
        return crc;
      });
      exports.default = crcjam;
    }
  });

  // node_modules/crc/lib/crcjam.js
  var require_crcjam2 = __commonJS({
    "node_modules/crc/lib/crcjam.js"(exports, module) {
      "use strict";
      module.exports = require_crcjam().default;
    }
  });

  // node_modules/crc/lib/index.js
  var require_lib = __commonJS({
    "node_modules/crc/lib/index.js"(exports, module) {
      "use strict";
      module.exports = {
        crc1: require_crc12(),
        crc8: require_crc82(),
        crc81wire: require_crc8_1wire(),
        crc16: require_crc162(),
        crc16ccitt: require_crc16_ccitt(),
        crc16modbus: require_crc16_modbus(),
        crc16xmodem: require_crc16_xmodem(),
        crc16kermit: require_crc16_kermit(),
        crc24: require_crc242(),
        crc32: require_crc322(),
        crcjam: require_crcjam2()
      };
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/utils.js
  var require_utils = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/utils.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bufferXOR = exports.setDifference = exports.arrayContains = exports.arraysEqual = exports.hasPrefix = exports.isURType = exports.intToBytes = exports.toUint32 = exports.getCRCHex = exports.getCRC = exports.split = exports.partition = exports.sha256Hash = void 0;
      var sha_js_1 = __importDefault(require_sha2());
      var crc_1 = require_lib();
      var sha256Hash = (data) => sha_js_1.default("sha256").update(data).digest();
      exports.sha256Hash = sha256Hash;
      var partition = (s3, n2) => s3.match(new RegExp(".{1," + n2 + "}", "g")) || [s3];
      exports.partition = partition;
      var split = (s3, length) => [s3.slice(0, -length), s3.slice(-length)];
      exports.split = split;
      var getCRC = (message) => crc_1.crc32(message);
      exports.getCRC = getCRC;
      var getCRCHex = (message) => crc_1.crc32(message).toString(16).padStart(8, "0");
      exports.getCRCHex = getCRCHex;
      var toUint32 = (number) => number >>> 0;
      exports.toUint32 = toUint32;
      var intToBytes = (num) => {
        const arr = new ArrayBuffer(4);
        const view = new DataView(arr);
        view.setUint32(0, num, false);
        return Buffer.from(arr);
      };
      exports.intToBytes = intToBytes;
      var isURType = (type) => {
        return type.split("").every((_3, index) => {
          let c5 = type.charCodeAt(index);
          if ("a".charCodeAt(0) <= c5 && c5 <= "z".charCodeAt(0))
            return true;
          if ("0".charCodeAt(0) <= c5 && c5 <= "9".charCodeAt(0))
            return true;
          if (c5 === "-".charCodeAt(0))
            return true;
          return false;
        });
      };
      exports.isURType = isURType;
      var hasPrefix = (s3, prefix) => s3.indexOf(prefix) === 0;
      exports.hasPrefix = hasPrefix;
      var arraysEqual = (ar1, ar2) => {
        if (ar1.length !== ar2.length) {
          return false;
        }
        return ar1.every((el) => ar2.includes(el));
      };
      exports.arraysEqual = arraysEqual;
      var arrayContains = (ar1, ar2) => {
        return ar2.every((v3) => ar1.includes(v3));
      };
      exports.arrayContains = arrayContains;
      var setDifference = (ar1, ar2) => {
        return ar1.filter((x5) => ar2.indexOf(x5) < 0);
      };
      exports.setDifference = setDifference;
      var bufferXOR = (a4, b5) => {
        const length = Math.max(a4.length, b5.length);
        const buffer = Buffer.allocUnsafe(length);
        for (let i = 0; i < length; ++i) {
          buffer[i] = a4[i] ^ b5[i];
        }
        return buffer;
      };
      exports.bufferXOR = bufferXOR;
    }
  });

  // node_modules/cbor-sync/main.js
  var require_main = __commonJS({
    "node_modules/cbor-sync/main.js"(exports, module) {
      (function(global2, factory) {
        if (typeof define === "function" && define.amd) {
          define([], factory);
        } else if (typeof module !== "undefined" && module.exports) {
          module.exports = factory();
        } else {
          global2.CBOR = factory();
        }
      })(exports, function() {
        var CBOR = (function() {
          function BinaryHex(hex) {
            this.$hex = hex;
          }
          BinaryHex.prototype = {
            length: function() {
              return this.$hex.length / 2;
            },
            toString: function(format) {
              if (!format || format === "hex" || format === 16) return this.$hex;
              if (format === "utf-8") {
                var encoded = "";
                for (var i = 0; i < this.$hex.length; i += 2) {
                  encoded += "%" + this.$hex.substring(i, i + 2);
                }
                return decodeURIComponent(encoded);
              }
              if (format === "latin") {
                var encoded = [];
                for (var i = 0; i < this.$hex.length; i += 2) {
                  encoded.push(parseInt(this.$hex.substring(i, i + 2), 16));
                }
                return String.fromCharCode.apply(String, encoded);
              }
              throw new Error("Unrecognised format: " + format);
            }
          };
          BinaryHex.fromLatinString = function(latinString) {
            var hex = "";
            for (var i = 0; i < latinString.length; i++) {
              var pair = latinString.charCodeAt(i).toString(16);
              if (pair.length === 1) pair = "0" + pair;
              hex += pair;
            }
            return new BinaryHex(hex);
          };
          BinaryHex.fromUtf8String = function(utf8String) {
            var encoded = encodeURIComponent(utf8String);
            var hex = "";
            for (var i = 0; i < encoded.length; i++) {
              if (encoded.charAt(i) === "%") {
                hex += encoded.substring(i + 1, i + 3);
                i += 2;
              } else {
                var hexPair = encoded.charCodeAt(i).toString(16);
                if (hexPair.length < 2) hexPair = "0" + hexPair;
                hex += hexPair;
              }
            }
            return new BinaryHex(hex);
          };
          var semanticEncoders = [];
          var semanticDecoders = {};
          var notImplemented = function(label) {
            return function() {
              throw new Error(label + " not implemented");
            };
          };
          function Reader() {
          }
          Reader.prototype = {
            peekByte: notImplemented("peekByte"),
            readByte: notImplemented("readByte"),
            readChunk: notImplemented("readChunk"),
            readFloat16: function() {
              var half = this.readUint16();
              var exponent = (half & 32767) >> 10;
              var mantissa = half & 1023;
              var negative = half & 32768;
              if (exponent === 31) {
                if (mantissa === 0) {
                  return negative ? -Infinity : Infinity;
                }
                return NaN;
              }
              var magnitude = exponent ? Math.pow(2, exponent - 25) * (1024 + mantissa) : Math.pow(2, -24) * mantissa;
              return negative ? -magnitude : magnitude;
            },
            readFloat32: function() {
              var intValue = this.readUint32();
              var exponent = (intValue & 2147483647) >> 23;
              var mantissa = intValue & 8388607;
              var negative = intValue & 2147483648;
              if (exponent === 255) {
                if (mantissa === 0) {
                  return negative ? -Infinity : Infinity;
                }
                return NaN;
              }
              var magnitude = exponent ? Math.pow(2, exponent - 23 - 127) * (8388608 + mantissa) : Math.pow(2, -23 - 126) * mantissa;
              return negative ? -magnitude : magnitude;
            },
            readFloat64: function() {
              var int1 = this.readUint32(), int2 = this.readUint32();
              var exponent = int1 >> 20 & 2047;
              var mantissa = (int1 & 1048575) * 4294967296 + int2;
              var negative = int1 & 2147483648;
              if (exponent === 2047) {
                if (mantissa === 0) {
                  return negative ? -Infinity : Infinity;
                }
                return NaN;
              }
              var magnitude = exponent ? Math.pow(2, exponent - 52 - 1023) * (4503599627370496 + mantissa) : Math.pow(2, -52 - 1022) * mantissa;
              return negative ? -magnitude : magnitude;
            },
            readUint16: function() {
              return this.readByte() * 256 + this.readByte();
            },
            readUint32: function() {
              return this.readUint16() * 65536 + this.readUint16();
            },
            readUint64: function() {
              return this.readUint32() * 4294967296 + this.readUint32();
            }
          };
          function Writer() {
          }
          Writer.prototype = {
            writeByte: notImplemented("writeByte"),
            result: notImplemented("result"),
            writeFloat16: notImplemented("writeFloat16"),
            writeFloat32: notImplemented("writeFloat32"),
            writeFloat64: notImplemented("writeFloat64"),
            writeUint16: function(value) {
              this.writeByte(value >> 8 & 255);
              this.writeByte(value & 255);
            },
            writeUint32: function(value) {
              this.writeUint16(value >> 16 & 65535);
              this.writeUint16(value & 65535);
            },
            writeUint64: function(value) {
              if (value >= 9007199254740992 || value <= -9007199254740992) {
                throw new Error("Cannot encode Uint64 of: " + value + " magnitude to big (floating point errors)");
              }
              this.writeUint32(Math.floor(value / 4294967296));
              this.writeUint32(value % 4294967296);
            },
            writeString: notImplemented("writeString"),
            canWriteBinary: function(chunk) {
              return false;
            },
            writeBinary: notImplemented("writeChunk")
          };
          function readHeaderRaw(reader) {
            var firstByte = reader.readByte();
            var majorType = firstByte >> 5, value = firstByte & 31;
            return { type: majorType, value };
          }
          function valueFromHeader(header, reader) {
            var value = header.value;
            if (value < 24) {
              return value;
            } else if (value == 24) {
              return reader.readByte();
            } else if (value == 25) {
              return reader.readUint16();
            } else if (value == 26) {
              return reader.readUint32();
            } else if (value == 27) {
              return reader.readUint64();
            } else if (value == 31) {
              return null;
            }
            notImplemented("Additional info: " + value)();
          }
          function writeHeaderRaw(type, value, writer) {
            writer.writeByte(type << 5 | value);
          }
          function writeHeader(type, value, writer) {
            var firstByte = type << 5;
            if (value < 24) {
              writer.writeByte(firstByte | value);
            } else if (value < 256) {
              writer.writeByte(firstByte | 24);
              writer.writeByte(value);
            } else if (value < 65536) {
              writer.writeByte(firstByte | 25);
              writer.writeUint16(value);
            } else if (value < 4294967296) {
              writer.writeByte(firstByte | 26);
              writer.writeUint32(value);
            } else {
              writer.writeByte(firstByte | 27);
              writer.writeUint64(value);
            }
          }
          var stopCode = new Error();
          function decodeReader(reader) {
            var header = readHeaderRaw(reader);
            switch (header.type) {
              case 0:
                return valueFromHeader(header, reader);
              case 1:
                return -1 - valueFromHeader(header, reader);
              case 2:
                return reader.readChunk(valueFromHeader(header, reader));
              case 3:
                var buffer = reader.readChunk(valueFromHeader(header, reader));
                return buffer.toString("utf-8");
              case 4:
              case 5:
                var arrayLength = valueFromHeader(header, reader);
                var result = [];
                if (arrayLength !== null) {
                  if (header.type === 5) {
                    arrayLength *= 2;
                  }
                  for (var i = 0; i < arrayLength; i++) {
                    result[i] = decodeReader(reader);
                  }
                } else {
                  var item;
                  while ((item = decodeReader(reader)) !== stopCode) {
                    result.push(item);
                  }
                }
                if (header.type === 5) {
                  var objResult = {};
                  for (var i = 0; i < result.length; i += 2) {
                    objResult[result[i]] = result[i + 1];
                  }
                  return objResult;
                } else {
                  return result;
                }
              case 6:
                var tag = valueFromHeader(header, reader);
                var decoder = semanticDecoders[tag];
                var result = decodeReader(reader);
                return decoder ? decoder(result) : result;
              case 7:
                if (header.value === 25) {
                  return reader.readFloat16();
                } else if (header.value === 26) {
                  return reader.readFloat32();
                } else if (header.value === 27) {
                  return reader.readFloat64();
                }
                switch (valueFromHeader(header, reader)) {
                  case 20:
                    return false;
                  case 21:
                    return true;
                  case 22:
                    return null;
                  case 23:
                    return void 0;
                  case null:
                    return stopCode;
                  default:
                    throw new Error("Unknown fixed value: " + header.value);
                }
              default:
                throw new Error("Unsupported header: " + JSON.stringify(header));
            }
            throw new Error("not implemented yet");
          }
          function encodeWriter(data, writer) {
            for (var i = 0; i < semanticEncoders.length; i++) {
              var replacement = semanticEncoders[i].fn(data);
              if (replacement !== void 0) {
                writeHeader(6, semanticEncoders[i].tag, writer);
                return encodeWriter(replacement, writer);
              }
            }
            if (data && typeof data.toCBOR === "function") {
              data = data.toCBOR();
            }
            if (data === false) {
              writeHeader(7, 20, writer);
            } else if (data === true) {
              writeHeader(7, 21, writer);
            } else if (data === null) {
              writeHeader(7, 22, writer);
            } else if (data === void 0) {
              writeHeader(7, 23, writer);
            } else if (typeof data === "number") {
              if (Math.floor(data) === data && data < 9007199254740992 && data > -9007199254740992) {
                if (data < 0) {
                  writeHeader(1, -1 - data, writer);
                } else {
                  writeHeader(0, data, writer);
                }
              } else {
                writeHeaderRaw(7, 27, writer);
                writer.writeFloat64(data);
              }
            } else if (typeof data === "string") {
              writer.writeString(data, function(length) {
                writeHeader(3, length, writer);
              });
            } else if (writer.canWriteBinary(data)) {
              writer.writeBinary(data, function(length) {
                writeHeader(2, length, writer);
              });
            } else if (typeof data === "object") {
              if (api.config.useToJSON && typeof data.toJSON === "function") {
                data = data.toJSON();
              }
              if (Array.isArray(data)) {
                writeHeader(4, data.length, writer);
                for (var i = 0; i < data.length; i++) {
                  encodeWriter(data[i], writer);
                }
              } else {
                var keys = Object.keys(data);
                writeHeader(5, keys.length, writer);
                for (var i = 0; i < keys.length; i++) {
                  encodeWriter(keys[i], writer);
                  encodeWriter(data[keys[i]], writer);
                }
              }
            } else {
              throw new Error("CBOR encoding not supported: " + data);
            }
          }
          var readerFunctions = [];
          var writerFunctions = [];
          var api = {
            config: {
              useToJSON: true
            },
            addWriter: function(format, writerFunction) {
              if (typeof format === "string") {
                writerFunctions.push(function(f7) {
                  if (format === f7) return writerFunction(f7);
                });
              } else {
                writerFunctions.push(format);
              }
            },
            addReader: function(format, readerFunction) {
              if (typeof format === "string") {
                readerFunctions.push(function(data, f7) {
                  if (format === f7) return readerFunction(data, f7);
                });
              } else {
                readerFunctions.push(format);
              }
            },
            encode: function(data, format) {
              for (var i = 0; i < writerFunctions.length; i++) {
                var func = writerFunctions[i];
                var writer = func(format);
                if (writer) {
                  encodeWriter(data, writer);
                  return writer.result();
                }
              }
              throw new Error("Unsupported output format: " + format);
            },
            decode: function(data, format) {
              for (var i = 0; i < readerFunctions.length; i++) {
                var func = readerFunctions[i];
                var reader = func(data, format);
                if (reader) {
                  return decodeReader(reader);
                }
              }
              throw new Error("Unsupported input format: " + format);
            },
            addSemanticEncode: function(tag, fn) {
              if (typeof tag !== "number" || tag % 1 !== 0 || tag < 0) {
                throw new Error("Tag must be a positive integer");
              }
              semanticEncoders.push({ tag, fn });
              return this;
            },
            addSemanticDecode: function(tag, fn) {
              if (typeof tag !== "number" || tag % 1 !== 0 || tag < 0) {
                throw new Error("Tag must be a positive integer");
              }
              semanticDecoders[tag] = fn;
              return this;
            },
            Reader,
            Writer
          };
          function BufferReader(buffer) {
            this.buffer = buffer;
            this.pos = 0;
          }
          BufferReader.prototype = Object.create(Reader.prototype);
          BufferReader.prototype.peekByte = function() {
            return this.buffer[this.pos];
          };
          BufferReader.prototype.readByte = function() {
            return this.buffer[this.pos++];
          };
          BufferReader.prototype.readUint16 = function() {
            var result = this.buffer.readUInt16BE(this.pos);
            this.pos += 2;
            return result;
          };
          BufferReader.prototype.readUint32 = function() {
            var result = this.buffer.readUInt32BE(this.pos);
            this.pos += 4;
            return result;
          };
          BufferReader.prototype.readFloat32 = function() {
            var result = this.buffer.readFloatBE(this.pos);
            this.pos += 4;
            return result;
          };
          BufferReader.prototype.readFloat64 = function() {
            var result = this.buffer.readDoubleBE(this.pos);
            this.pos += 8;
            return result;
          };
          BufferReader.prototype.readChunk = function(length) {
            var result = Buffer.alloc(length);
            this.buffer.copy(result, 0, this.pos, this.pos += length);
            return result;
          };
          function BufferWriter(stringFormat) {
            this.byteLength = 0;
            this.defaultBufferLength = 16384;
            this.latestBuffer = Buffer.alloc(this.defaultBufferLength);
            this.latestBufferOffset = 0;
            this.completeBuffers = [];
            this.stringFormat = stringFormat;
          }
          BufferWriter.prototype = Object.create(Writer.prototype);
          BufferWriter.prototype.writeByte = function(value) {
            this.latestBuffer[this.latestBufferOffset++] = value;
            if (this.latestBufferOffset >= this.latestBuffer.length) {
              this.completeBuffers.push(this.latestBuffer);
              this.latestBuffer = Buffer.alloc(this.defaultBufferLength);
              this.latestBufferOffset = 0;
            }
            this.byteLength++;
          };
          BufferWriter.prototype.writeFloat32 = function(value) {
            var buffer = Buffer.alloc(4);
            buffer.writeFloatBE(value, 0);
            this.writeBuffer(buffer);
          };
          BufferWriter.prototype.writeFloat64 = function(value) {
            var buffer = Buffer.alloc(8);
            buffer.writeDoubleBE(value, 0);
            this.writeBuffer(buffer);
          };
          BufferWriter.prototype.writeString = function(string, lengthFunc) {
            var buffer = Buffer.from(string, "utf-8");
            lengthFunc(buffer.length);
            this.writeBuffer(buffer);
          };
          BufferWriter.prototype.canWriteBinary = function(data) {
            return data instanceof Buffer;
          };
          BufferWriter.prototype.writeBinary = function(buffer, lengthFunc) {
            lengthFunc(buffer.length);
            this.writeBuffer(buffer);
          };
          BufferWriter.prototype.writeBuffer = function(chunk) {
            if (!(chunk instanceof Buffer)) throw new TypeError("BufferWriter only accepts Buffers");
            if (!this.latestBufferOffset) {
              this.completeBuffers.push(chunk);
            } else if (this.latestBuffer.length - this.latestBufferOffset >= chunk.length) {
              chunk.copy(this.latestBuffer, this.latestBufferOffset);
              this.latestBufferOffset += chunk.length;
              if (this.latestBufferOffset >= this.latestBuffer.length) {
                this.completeBuffers.push(this.latestBuffer);
                this.latestBuffer = Buffer.alloc(this.defaultBufferLength);
                this.latestBufferOffset = 0;
              }
            } else {
              this.completeBuffers.push(this.latestBuffer.slice(0, this.latestBufferOffset));
              this.completeBuffers.push(chunk);
              this.latestBuffer = Buffer.alloc(this.defaultBufferLength);
              this.latestBufferOffset = 0;
            }
            this.byteLength += chunk.length;
          };
          BufferWriter.prototype.result = function() {
            var result = Buffer.alloc(this.byteLength);
            var offset = 0;
            for (var i = 0; i < this.completeBuffers.length; i++) {
              var buffer = this.completeBuffers[i];
              buffer.copy(result, offset, 0, buffer.length);
              offset += buffer.length;
            }
            if (this.latestBufferOffset) {
              this.latestBuffer.copy(result, offset, 0, this.latestBufferOffset);
            }
            if (this.stringFormat) return result.toString(this.stringFormat);
            return result;
          };
          if (typeof Buffer === "function") {
            api.addReader(function(data, format) {
              if (data instanceof Buffer) {
                return new BufferReader(data);
              }
              if (format === "hex" || format === "base64") {
                var buffer = Buffer.from(data, format);
                return new BufferReader(buffer);
              }
            });
            api.addWriter(function(format) {
              if (!format || format === "buffer") {
                return new BufferWriter();
              } else if (format === "hex" || format === "base64") {
                return new BufferWriter(format);
              }
            });
          }
          function HexReader(hex) {
            this.hex = hex;
            this.pos = 0;
          }
          HexReader.prototype = Object.create(Reader.prototype);
          HexReader.prototype.peekByte = function() {
            var pair = this.hex.substring(this.pos, 2);
            return parseInt(pair, 16);
          };
          HexReader.prototype.readByte = function() {
            var pair = this.hex.substring(this.pos, this.pos + 2);
            this.pos += 2;
            return parseInt(pair, 16);
          };
          HexReader.prototype.readChunk = function(length) {
            var hex = this.hex.substring(this.pos, this.pos + length * 2);
            this.pos += length * 2;
            if (typeof Buffer === "function") return Buffer.from(hex, "hex");
            return new BinaryHex(hex);
          };
          function HexWriter(finalFormat) {
            this.$hex = "";
            this.finalFormat = finalFormat || "hex";
          }
          HexWriter.prototype = Object.create(Writer.prototype);
          HexWriter.prototype.writeByte = function(value) {
            if (value < 0 || value > 255) throw new Error("Byte value out of range: " + value);
            var hex = value.toString(16);
            if (hex.length == 1) {
              hex = "0" + hex;
            }
            this.$hex += hex;
          };
          HexWriter.prototype.canWriteBinary = function(chunk) {
            return chunk instanceof BinaryHex || typeof Buffer === "function" && chunk instanceof Buffer;
          };
          HexWriter.prototype.writeBinary = function(chunk, lengthFunction) {
            if (chunk instanceof BinaryHex) {
              lengthFunction(chunk.length());
              this.$hex += chunk.$hex;
            } else if (typeof Buffer === "function" && chunk instanceof Buffer) {
              lengthFunction(chunk.length);
              this.$hex += chunk.toString("hex");
            } else {
              throw new TypeError("HexWriter only accepts BinaryHex or Buffers");
            }
          };
          HexWriter.prototype.result = function() {
            if (this.finalFormat === "buffer" && typeof Buffer === "function") {
              return Buffer.from(this.$hex, "hex");
            }
            return new BinaryHex(this.$hex).toString(this.finalFormat);
          };
          HexWriter.prototype.writeString = function(string, lengthFunction) {
            var buffer = BinaryHex.fromUtf8String(string);
            lengthFunction(buffer.length());
            this.$hex += buffer.$hex;
          };
          api.addReader(function(data, format) {
            if (data instanceof BinaryHex || data.$hex) {
              return new HexReader(data.$hex);
            }
            if (format === "hex") {
              return new HexReader(data);
            }
          });
          api.addWriter(function(format) {
            if (format === "hex") {
              return new HexWriter();
            }
          });
          return api;
        })();
        CBOR.addSemanticEncode(0, function(data) {
          if (data instanceof Date) {
            return data.toISOString();
          }
        }).addSemanticDecode(0, function(isoString) {
          return new Date(isoString);
        }).addSemanticDecode(1, function(isoString) {
          return new Date(isoString);
        });
        return CBOR;
      });
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/cbor.js
  var require_cbor = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/cbor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.cborDecode = exports.cborEncode = void 0;
      var cbor = require_main();
      var cborEncode = (data) => {
        return cbor.encode(data);
      };
      exports.cborEncode = cborEncode;
      var cborDecode = (data) => {
        return cbor.decode(Buffer.isBuffer(data) ? data : Buffer.from(data, "hex"));
      };
      exports.cborDecode = cborDecode;
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/ur.js
  var require_ur = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/ur.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var errors_1 = require_errors();
      var utils_1 = require_utils();
      var cbor_1 = require_cbor();
      var UR2 = class _UR {
        constructor(_cborPayload, _type = "bytes") {
          this._cborPayload = _cborPayload;
          this._type = _type;
          if (!utils_1.isURType(this._type)) {
            throw new errors_1.InvalidTypeError();
          }
        }
        static fromBuffer(buf) {
          return new _UR(cbor_1.cborEncode(buf));
        }
        static from(value, encoding) {
          return _UR.fromBuffer(Buffer.from(value, encoding));
        }
        decodeCBOR() {
          return cbor_1.cborDecode(this._cborPayload);
        }
        get type() {
          return this._type;
        }
        get cbor() {
          return this._cborPayload;
        }
        equals(ur2) {
          return this.type === ur2.type && this.cbor.equals(ur2.cbor);
        }
      };
      exports.default = UR2;
    }
  });

  // node_modules/is-arguments/index.js
  var require_is_arguments = __commonJS({
    "node_modules/is-arguments/index.js"(exports, module) {
      "use strict";
      var hasToStringTag = require_shams2()();
      var callBound = require_call_bound();
      var $toString = callBound("Object.prototype.toString");
      var isStandardArguments = function isArguments(value) {
        if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
          return false;
        }
        return $toString(value) === "[object Arguments]";
      };
      var isLegacyArguments = function isArguments(value) {
        if (isStandardArguments(value)) {
          return true;
        }
        return value !== null && typeof value === "object" && "length" in value && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && "callee" in value && $toString(value.callee) === "[object Function]";
      };
      var supportsStandardArguments = (function() {
        return isStandardArguments(arguments);
      })();
      isStandardArguments.isLegacyArguments = isLegacyArguments;
      module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
    }
  });

  // node_modules/is-regex/index.js
  var require_is_regex = __commonJS({
    "node_modules/is-regex/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var hasToStringTag = require_shams2()();
      var hasOwn = require_hasown();
      var gOPD = require_gopd();
      var fn;
      if (hasToStringTag) {
        $exec = callBound("RegExp.prototype.exec");
        isRegexMarker = {};
        throwRegexMarker = function() {
          throw isRegexMarker;
        };
        badStringifier = {
          toString: throwRegexMarker,
          valueOf: throwRegexMarker
        };
        if (typeof Symbol.toPrimitive === "symbol") {
          badStringifier[Symbol.toPrimitive] = throwRegexMarker;
        }
        fn = function isRegex(value) {
          if (!value || typeof value !== "object") {
            return false;
          }
          var descriptor = (
            /** @type {NonNullable<typeof gOPD>} */
            gOPD(
              /** @type {{ lastIndex?: unknown }} */
              value,
              "lastIndex"
            )
          );
          var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, "value");
          if (!hasLastIndexDataProperty) {
            return false;
          }
          try {
            $exec(
              value,
              /** @type {string} */
              /** @type {unknown} */
              badStringifier
            );
          } catch (e2) {
            return e2 === isRegexMarker;
          }
        };
      } else {
        $toString = callBound("Object.prototype.toString");
        regexClass = "[object RegExp]";
        fn = function isRegex(value) {
          if (!value || typeof value !== "object" && typeof value !== "function") {
            return false;
          }
          return $toString(value) === regexClass;
        };
      }
      var $exec;
      var isRegexMarker;
      var throwRegexMarker;
      var badStringifier;
      var $toString;
      var regexClass;
      module.exports = fn;
    }
  });

  // node_modules/safe-regex-test/index.js
  var require_safe_regex_test = __commonJS({
    "node_modules/safe-regex-test/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var isRegex = require_is_regex();
      var $exec = callBound("RegExp.prototype.exec");
      var $TypeError = require_type();
      module.exports = function regexTester(regex) {
        if (!isRegex(regex)) {
          throw new $TypeError("`regex` must be a RegExp");
        }
        return function test(s3) {
          return $exec(regex, s3) !== null;
        };
      };
    }
  });

  // node_modules/generator-function/index.js
  var require_generator_function = __commonJS({
    "node_modules/generator-function/index.js"(exports, module) {
      "use strict";
      var cached = (
        /** @type {GeneratorFunctionConstructor} */
        function* () {
        }.constructor
      );
      module.exports = () => cached;
    }
  });

  // node_modules/is-generator-function/index.js
  var require_is_generator_function = __commonJS({
    "node_modules/is-generator-function/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var safeRegexTest = require_safe_regex_test();
      var isFnRegex = safeRegexTest(/^\s*(?:function)?\*/);
      var hasToStringTag = require_shams2()();
      var getProto = require_get_proto();
      var toStr = callBound("Object.prototype.toString");
      var fnToStr = callBound("Function.prototype.toString");
      var getGeneratorFunction = require_generator_function();
      module.exports = function isGeneratorFunction(fn) {
        if (typeof fn !== "function") {
          return false;
        }
        if (isFnRegex(fnToStr(fn))) {
          return true;
        }
        if (!hasToStringTag) {
          var str = toStr(fn);
          return str === "[object GeneratorFunction]";
        }
        if (!getProto) {
          return false;
        }
        var GeneratorFunction = getGeneratorFunction();
        return GeneratorFunction && getProto(fn) === GeneratorFunction.prototype;
      };
    }
  });

  // node_modules/util/support/types.js
  var require_types = __commonJS({
    "node_modules/util/support/types.js"(exports) {
      "use strict";
      var isArgumentsObject = require_is_arguments();
      var isGeneratorFunction = require_is_generator_function();
      var whichTypedArray = require_which_typed_array();
      var isTypedArray = require_is_typed_array();
      function uncurryThis(f7) {
        return f7.call.bind(f7);
      }
      var BigIntSupported = typeof BigInt !== "undefined";
      var SymbolSupported = typeof Symbol !== "undefined";
      var ObjectToString = uncurryThis(Object.prototype.toString);
      var numberValue = uncurryThis(Number.prototype.valueOf);
      var stringValue = uncurryThis(String.prototype.valueOf);
      var booleanValue = uncurryThis(Boolean.prototype.valueOf);
      if (BigIntSupported) {
        bigIntValue = uncurryThis(BigInt.prototype.valueOf);
      }
      var bigIntValue;
      if (SymbolSupported) {
        symbolValue = uncurryThis(Symbol.prototype.valueOf);
      }
      var symbolValue;
      function checkBoxedPrimitive(value, prototypeValueOf) {
        if (typeof value !== "object") {
          return false;
        }
        try {
          prototypeValueOf(value);
          return true;
        } catch (e2) {
          return false;
        }
      }
      exports.isArgumentsObject = isArgumentsObject;
      exports.isGeneratorFunction = isGeneratorFunction;
      exports.isTypedArray = isTypedArray;
      function isPromise(input) {
        return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
      }
      exports.isPromise = isPromise;
      function isArrayBufferView2(value) {
        if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
          return ArrayBuffer.isView(value);
        }
        return isTypedArray(value) || isDataView(value);
      }
      exports.isArrayBufferView = isArrayBufferView2;
      function isUint8Array(value) {
        return whichTypedArray(value) === "Uint8Array";
      }
      exports.isUint8Array = isUint8Array;
      function isUint8ClampedArray(value) {
        return whichTypedArray(value) === "Uint8ClampedArray";
      }
      exports.isUint8ClampedArray = isUint8ClampedArray;
      function isUint16Array(value) {
        return whichTypedArray(value) === "Uint16Array";
      }
      exports.isUint16Array = isUint16Array;
      function isUint32Array(value) {
        return whichTypedArray(value) === "Uint32Array";
      }
      exports.isUint32Array = isUint32Array;
      function isInt8Array(value) {
        return whichTypedArray(value) === "Int8Array";
      }
      exports.isInt8Array = isInt8Array;
      function isInt16Array(value) {
        return whichTypedArray(value) === "Int16Array";
      }
      exports.isInt16Array = isInt16Array;
      function isInt32Array(value) {
        return whichTypedArray(value) === "Int32Array";
      }
      exports.isInt32Array = isInt32Array;
      function isFloat32Array(value) {
        return whichTypedArray(value) === "Float32Array";
      }
      exports.isFloat32Array = isFloat32Array;
      function isFloat64Array(value) {
        return whichTypedArray(value) === "Float64Array";
      }
      exports.isFloat64Array = isFloat64Array;
      function isBigInt64Array(value) {
        return whichTypedArray(value) === "BigInt64Array";
      }
      exports.isBigInt64Array = isBigInt64Array;
      function isBigUint64Array(value) {
        return whichTypedArray(value) === "BigUint64Array";
      }
      exports.isBigUint64Array = isBigUint64Array;
      function isMapToString(value) {
        return ObjectToString(value) === "[object Map]";
      }
      isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
      function isMap(value) {
        if (typeof Map === "undefined") {
          return false;
        }
        return isMapToString.working ? isMapToString(value) : value instanceof Map;
      }
      exports.isMap = isMap;
      function isSetToString(value) {
        return ObjectToString(value) === "[object Set]";
      }
      isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
      function isSet(value) {
        if (typeof Set === "undefined") {
          return false;
        }
        return isSetToString.working ? isSetToString(value) : value instanceof Set;
      }
      exports.isSet = isSet;
      function isWeakMapToString(value) {
        return ObjectToString(value) === "[object WeakMap]";
      }
      isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
      function isWeakMap(value) {
        if (typeof WeakMap === "undefined") {
          return false;
        }
        return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
      }
      exports.isWeakMap = isWeakMap;
      function isWeakSetToString(value) {
        return ObjectToString(value) === "[object WeakSet]";
      }
      isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
      function isWeakSet(value) {
        return isWeakSetToString(value);
      }
      exports.isWeakSet = isWeakSet;
      function isArrayBufferToString(value) {
        return ObjectToString(value) === "[object ArrayBuffer]";
      }
      isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
      function isArrayBuffer(value) {
        if (typeof ArrayBuffer === "undefined") {
          return false;
        }
        return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
      }
      exports.isArrayBuffer = isArrayBuffer;
      function isDataViewToString(value) {
        return ObjectToString(value) === "[object DataView]";
      }
      isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
      function isDataView(value) {
        if (typeof DataView === "undefined") {
          return false;
        }
        return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
      }
      exports.isDataView = isDataView;
      var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
      function isSharedArrayBufferToString(value) {
        return ObjectToString(value) === "[object SharedArrayBuffer]";
      }
      function isSharedArrayBuffer(value) {
        if (typeof SharedArrayBufferCopy === "undefined") {
          return false;
        }
        if (typeof isSharedArrayBufferToString.working === "undefined") {
          isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
        }
        return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
      }
      exports.isSharedArrayBuffer = isSharedArrayBuffer;
      function isAsyncFunction(value) {
        return ObjectToString(value) === "[object AsyncFunction]";
      }
      exports.isAsyncFunction = isAsyncFunction;
      function isMapIterator(value) {
        return ObjectToString(value) === "[object Map Iterator]";
      }
      exports.isMapIterator = isMapIterator;
      function isSetIterator(value) {
        return ObjectToString(value) === "[object Set Iterator]";
      }
      exports.isSetIterator = isSetIterator;
      function isGeneratorObject(value) {
        return ObjectToString(value) === "[object Generator]";
      }
      exports.isGeneratorObject = isGeneratorObject;
      function isWebAssemblyCompiledModule(value) {
        return ObjectToString(value) === "[object WebAssembly.Module]";
      }
      exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
      function isNumberObject(value) {
        return checkBoxedPrimitive(value, numberValue);
      }
      exports.isNumberObject = isNumberObject;
      function isStringObject(value) {
        return checkBoxedPrimitive(value, stringValue);
      }
      exports.isStringObject = isStringObject;
      function isBooleanObject(value) {
        return checkBoxedPrimitive(value, booleanValue);
      }
      exports.isBooleanObject = isBooleanObject;
      function isBigIntObject(value) {
        return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
      }
      exports.isBigIntObject = isBigIntObject;
      function isSymbolObject(value) {
        return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
      }
      exports.isSymbolObject = isSymbolObject;
      function isBoxedPrimitive(value) {
        return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
      }
      exports.isBoxedPrimitive = isBoxedPrimitive;
      function isAnyArrayBuffer(value) {
        return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
      }
      exports.isAnyArrayBuffer = isAnyArrayBuffer;
      ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
        Object.defineProperty(exports, method, {
          enumerable: false,
          value: function() {
            throw new Error(method + " is not supported in userland");
          }
        });
      });
    }
  });

  // node_modules/util/support/isBufferBrowser.js
  var require_isBufferBrowser = __commonJS({
    "node_modules/util/support/isBufferBrowser.js"(exports, module) {
      module.exports = function isBuffer(arg) {
        return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
      };
    }
  });

  // node_modules/util/util.js
  var require_util = __commonJS({
    "node_modules/util/util.js"(exports) {
      var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
        var keys = Object.keys(obj);
        var descriptors = {};
        for (var i = 0; i < keys.length; i++) {
          descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
        }
        return descriptors;
      };
      var formatRegExp = /%[sdj%]/g;
      exports.format = function(f7) {
        if (!isString(f7)) {
          var objects = [];
          for (var i = 0; i < arguments.length; i++) {
            objects.push(inspect(arguments[i]));
          }
          return objects.join(" ");
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f7).replace(formatRegExp, function(x6) {
          if (x6 === "%%") return "%";
          if (i >= len) return x6;
          switch (x6) {
            case "%s":
              return String(args[i++]);
            case "%d":
              return Number(args[i++]);
            case "%j":
              try {
                return JSON.stringify(args[i++]);
              } catch (_3) {
                return "[Circular]";
              }
            default:
              return x6;
          }
        });
        for (var x5 = args[i]; i < len; x5 = args[++i]) {
          if (isNull(x5) || !isObject(x5)) {
            str += " " + x5;
          } else {
            str += " " + inspect(x5);
          }
        }
        return str;
      };
      exports.deprecate = function(fn, msg) {
        if (typeof process !== "undefined" && process.noDeprecation === true) {
          return fn;
        }
        if (typeof process === "undefined") {
          return function() {
            return exports.deprecate(fn, msg).apply(this, arguments);
          };
        }
        var warned = false;
        function deprecated() {
          if (!warned) {
            if (process.throwDeprecation) {
              throw new Error(msg);
            } else if (process.traceDeprecation) {
              console.trace(msg);
            } else {
              console.error(msg);
            }
            warned = true;
          }
          return fn.apply(this, arguments);
        }
        return deprecated;
      };
      var debugs = {};
      var debugEnvRegex = /^$/;
      if ("") {
        debugEnv = "";
        debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
        debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
      }
      var debugEnv;
      exports.debuglog = function(set) {
        set = set.toUpperCase();
        if (!debugs[set]) {
          if (debugEnvRegex.test(set)) {
            var pid = process.pid;
            debugs[set] = function() {
              var msg = exports.format.apply(exports, arguments);
              console.error("%s %d: %s", set, pid, msg);
            };
          } else {
            debugs[set] = function() {
            };
          }
        }
        return debugs[set];
      };
      function inspect(obj, opts) {
        var ctx = {
          seen: [],
          stylize: stylizeNoColor
        };
        if (arguments.length >= 3) ctx.depth = arguments[2];
        if (arguments.length >= 4) ctx.colors = arguments[3];
        if (isBoolean(opts)) {
          ctx.showHidden = opts;
        } else if (opts) {
          exports._extend(ctx, opts);
        }
        if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
        if (isUndefined(ctx.depth)) ctx.depth = 2;
        if (isUndefined(ctx.colors)) ctx.colors = false;
        if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
        if (ctx.colors) ctx.stylize = stylizeWithColor;
        return formatValue(ctx, obj, ctx.depth);
      }
      exports.inspect = inspect;
      inspect.colors = {
        "bold": [1, 22],
        "italic": [3, 23],
        "underline": [4, 24],
        "inverse": [7, 27],
        "white": [37, 39],
        "grey": [90, 39],
        "black": [30, 39],
        "blue": [34, 39],
        "cyan": [36, 39],
        "green": [32, 39],
        "magenta": [35, 39],
        "red": [31, 39],
        "yellow": [33, 39]
      };
      inspect.styles = {
        "special": "cyan",
        "number": "yellow",
        "boolean": "yellow",
        "undefined": "grey",
        "null": "bold",
        "string": "green",
        "date": "magenta",
        // "name": intentionally not styling
        "regexp": "red"
      };
      function stylizeWithColor(str, styleType) {
        var style = inspect.styles[styleType];
        if (style) {
          return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
        } else {
          return str;
        }
      }
      function stylizeNoColor(str, styleType) {
        return str;
      }
      function arrayToHash(array) {
        var hash = {};
        array.forEach(function(val, idx) {
          hash[val] = true;
        });
        return hash;
      }
      function formatValue(ctx, value, recurseTimes) {
        if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
        value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
          var ret = value.inspect(recurseTimes, ctx);
          if (!isString(ret)) {
            ret = formatValue(ctx, ret, recurseTimes);
          }
          return ret;
        }
        var primitive = formatPrimitive(ctx, value);
        if (primitive) {
          return primitive;
        }
        var keys = Object.keys(value);
        var visibleKeys = arrayToHash(keys);
        if (ctx.showHidden) {
          keys = Object.getOwnPropertyNames(value);
        }
        if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
          return formatError(value);
        }
        if (keys.length === 0) {
          if (isFunction(value)) {
            var name = value.name ? ": " + value.name : "";
            return ctx.stylize("[Function" + name + "]", "special");
          }
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
          }
          if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), "date");
          }
          if (isError(value)) {
            return formatError(value);
          }
        }
        var base = "", array = false, braces = ["{", "}"];
        if (isArray(value)) {
          array = true;
          braces = ["[", "]"];
        }
        if (isFunction(value)) {
          var n2 = value.name ? ": " + value.name : "";
          base = " [Function" + n2 + "]";
        }
        if (isRegExp(value)) {
          base = " " + RegExp.prototype.toString.call(value);
        }
        if (isDate(value)) {
          base = " " + Date.prototype.toUTCString.call(value);
        }
        if (isError(value)) {
          base = " " + formatError(value);
        }
        if (keys.length === 0 && (!array || value.length == 0)) {
          return braces[0] + base + braces[1];
        }
        if (recurseTimes < 0) {
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
          } else {
            return ctx.stylize("[Object]", "special");
          }
        }
        ctx.seen.push(value);
        var output;
        if (array) {
          output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
        } else {
          output = keys.map(function(key) {
            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
          });
        }
        ctx.seen.pop();
        return reduceToSingleString(output, base, braces);
      }
      function formatPrimitive(ctx, value) {
        if (isUndefined(value))
          return ctx.stylize("undefined", "undefined");
        if (isString(value)) {
          var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
          return ctx.stylize(simple, "string");
        }
        if (isNumber(value))
          return ctx.stylize("" + value, "number");
        if (isBoolean(value))
          return ctx.stylize("" + value, "boolean");
        if (isNull(value))
          return ctx.stylize("null", "null");
      }
      function formatError(value) {
        return "[" + Error.prototype.toString.call(value) + "]";
      }
      function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
        var output = [];
        for (var i = 0, l6 = value.length; i < l6; ++i) {
          if (hasOwnProperty(value, String(i))) {
            output.push(formatProperty(
              ctx,
              value,
              recurseTimes,
              visibleKeys,
              String(i),
              true
            ));
          } else {
            output.push("");
          }
        }
        keys.forEach(function(key) {
          if (!key.match(/^\d+$/)) {
            output.push(formatProperty(
              ctx,
              value,
              recurseTimes,
              visibleKeys,
              key,
              true
            ));
          }
        });
        return output;
      }
      function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
        var name, str, desc;
        desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
        if (desc.get) {
          if (desc.set) {
            str = ctx.stylize("[Getter/Setter]", "special");
          } else {
            str = ctx.stylize("[Getter]", "special");
          }
        } else {
          if (desc.set) {
            str = ctx.stylize("[Setter]", "special");
          }
        }
        if (!hasOwnProperty(visibleKeys, key)) {
          name = "[" + key + "]";
        }
        if (!str) {
          if (ctx.seen.indexOf(desc.value) < 0) {
            if (isNull(recurseTimes)) {
              str = formatValue(ctx, desc.value, null);
            } else {
              str = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str.indexOf("\n") > -1) {
              if (array) {
                str = str.split("\n").map(function(line) {
                  return "  " + line;
                }).join("\n").slice(2);
              } else {
                str = "\n" + str.split("\n").map(function(line) {
                  return "   " + line;
                }).join("\n");
              }
            }
          } else {
            str = ctx.stylize("[Circular]", "special");
          }
        }
        if (isUndefined(name)) {
          if (array && key.match(/^\d+$/)) {
            return str;
          }
          name = JSON.stringify("" + key);
          if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.slice(1, -1);
            name = ctx.stylize(name, "name");
          } else {
            name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
            name = ctx.stylize(name, "string");
          }
        }
        return name + ": " + str;
      }
      function reduceToSingleString(output, base, braces) {
        var numLinesEst = 0;
        var length = output.reduce(function(prev, cur) {
          numLinesEst++;
          if (cur.indexOf("\n") >= 0) numLinesEst++;
          return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
        }, 0);
        if (length > 60) {
          return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
        }
        return braces[0] + base + " " + output.join(", ") + " " + braces[1];
      }
      exports.types = require_types();
      function isArray(ar) {
        return Array.isArray(ar);
      }
      exports.isArray = isArray;
      function isBoolean(arg) {
        return typeof arg === "boolean";
      }
      exports.isBoolean = isBoolean;
      function isNull(arg) {
        return arg === null;
      }
      exports.isNull = isNull;
      function isNullOrUndefined(arg) {
        return arg == null;
      }
      exports.isNullOrUndefined = isNullOrUndefined;
      function isNumber(arg) {
        return typeof arg === "number";
      }
      exports.isNumber = isNumber;
      function isString(arg) {
        return typeof arg === "string";
      }
      exports.isString = isString;
      function isSymbol(arg) {
        return typeof arg === "symbol";
      }
      exports.isSymbol = isSymbol;
      function isUndefined(arg) {
        return arg === void 0;
      }
      exports.isUndefined = isUndefined;
      function isRegExp(re) {
        return isObject(re) && objectToString(re) === "[object RegExp]";
      }
      exports.isRegExp = isRegExp;
      exports.types.isRegExp = isRegExp;
      function isObject(arg) {
        return typeof arg === "object" && arg !== null;
      }
      exports.isObject = isObject;
      function isDate(d6) {
        return isObject(d6) && objectToString(d6) === "[object Date]";
      }
      exports.isDate = isDate;
      exports.types.isDate = isDate;
      function isError(e2) {
        return isObject(e2) && (objectToString(e2) === "[object Error]" || e2 instanceof Error);
      }
      exports.isError = isError;
      exports.types.isNativeError = isError;
      function isFunction(arg) {
        return typeof arg === "function";
      }
      exports.isFunction = isFunction;
      function isPrimitive(arg) {
        return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
        typeof arg === "undefined";
      }
      exports.isPrimitive = isPrimitive;
      exports.isBuffer = require_isBufferBrowser();
      function objectToString(o5) {
        return Object.prototype.toString.call(o5);
      }
      function pad(n2) {
        return n2 < 10 ? "0" + n2.toString(10) : n2.toString(10);
      }
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      function timestamp() {
        var d6 = /* @__PURE__ */ new Date();
        var time = [
          pad(d6.getHours()),
          pad(d6.getMinutes()),
          pad(d6.getSeconds())
        ].join(":");
        return [d6.getDate(), months[d6.getMonth()], time].join(" ");
      }
      exports.log = function() {
        console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
      };
      exports.inherits = require_inherits_browser();
      exports._extend = function(origin, add) {
        if (!add || !isObject(add)) return origin;
        var keys = Object.keys(add);
        var i = keys.length;
        while (i--) {
          origin[keys[i]] = add[keys[i]];
        }
        return origin;
      };
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? /* @__PURE__ */ Symbol("util.promisify.custom") : void 0;
      exports.promisify = function promisify(original) {
        if (typeof original !== "function")
          throw new TypeError('The "original" argument must be of type Function');
        if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
          var fn = original[kCustomPromisifiedSymbol];
          if (typeof fn !== "function") {
            throw new TypeError('The "util.promisify.custom" argument must be of type Function');
          }
          Object.defineProperty(fn, kCustomPromisifiedSymbol, {
            value: fn,
            enumerable: false,
            writable: false,
            configurable: true
          });
          return fn;
        }
        function fn() {
          var promiseResolve, promiseReject;
          var promise = new Promise(function(resolve, reject) {
            promiseResolve = resolve;
            promiseReject = reject;
          });
          var args = [];
          for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
          }
          args.push(function(err, value) {
            if (err) {
              promiseReject(err);
            } else {
              promiseResolve(value);
            }
          });
          try {
            original.apply(this, args);
          } catch (err) {
            promiseReject(err);
          }
          return promise;
        }
        Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
        if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return Object.defineProperties(
          fn,
          getOwnPropertyDescriptors(original)
        );
      };
      exports.promisify.custom = kCustomPromisifiedSymbol;
      function callbackifyOnRejected(reason, cb) {
        if (!reason) {
          var newReason = new Error("Promise was rejected with a falsy value");
          newReason.reason = reason;
          reason = newReason;
        }
        return cb(reason);
      }
      function callbackify(original) {
        if (typeof original !== "function") {
          throw new TypeError('The "original" argument must be of type Function');
        }
        function callbackified() {
          var args = [];
          for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
          }
          var maybeCb = args.pop();
          if (typeof maybeCb !== "function") {
            throw new TypeError("The last argument must be of type Function");
          }
          var self2 = this;
          var cb = function() {
            return maybeCb.apply(self2, arguments);
          };
          original.apply(this, args).then(
            function(ret) {
              process.nextTick(cb.bind(null, null, ret));
            },
            function(rej) {
              process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
            }
          );
        }
        Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
        Object.defineProperties(
          callbackified,
          getOwnPropertyDescriptors(original)
        );
        return callbackified;
      }
      exports.callbackify = callbackify;
    }
  });

  // node_modules/assert/build/internal/errors.js
  var require_errors2 = __commonJS({
    "node_modules/assert/build/internal/errors.js"(exports, module) {
      "use strict";
      function _typeof(o5) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o6) {
          return typeof o6;
        } : function(o6) {
          return o6 && "function" == typeof Symbol && o6.constructor === Symbol && o6 !== Symbol.prototype ? "symbol" : typeof o6;
        }, _typeof(o5);
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        Object.defineProperty(subClass, "prototype", { writable: false });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o5, p5) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o6, p6) {
          o6.__proto__ = p6;
          return o6;
        };
        return _setPrototypeOf(o5, p5);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e2) {
          return false;
        }
      }
      function _getPrototypeOf(o5) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o6) {
          return o6.__proto__ || Object.getPrototypeOf(o6);
        };
        return _getPrototypeOf(o5);
      }
      var codes = {};
      var assert;
      var util;
      function createErrorType(code, message, Base) {
        if (!Base) {
          Base = Error;
        }
        function getMessage(arg1, arg2, arg3) {
          if (typeof message === "string") {
            return message;
          } else {
            return message(arg1, arg2, arg3);
          }
        }
        var NodeError = /* @__PURE__ */ (function(_Base) {
          _inherits(NodeError2, _Base);
          var _super = _createSuper(NodeError2);
          function NodeError2(arg1, arg2, arg3) {
            var _this;
            _classCallCheck(this, NodeError2);
            _this = _super.call(this, getMessage(arg1, arg2, arg3));
            _this.code = code;
            return _this;
          }
          return _createClass(NodeError2);
        })(Base);
        codes[code] = NodeError;
      }
      function oneOf(expected, thing) {
        if (Array.isArray(expected)) {
          var len = expected.length;
          expected = expected.map(function(i) {
            return String(i);
          });
          if (len > 2) {
            return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
          } else if (len === 2) {
            return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
          } else {
            return "of ".concat(thing, " ").concat(expected[0]);
          }
        } else {
          return "of ".concat(thing, " ").concat(String(expected));
        }
      }
      function startsWith(str, search, pos) {
        return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
      }
      function endsWith(str, search, this_len) {
        if (this_len === void 0 || this_len > str.length) {
          this_len = str.length;
        }
        return str.substring(this_len - search.length, this_len) === search;
      }
      function includes(str, search, start) {
        if (typeof start !== "number") {
          start = 0;
        }
        if (start + search.length > str.length) {
          return false;
        } else {
          return str.indexOf(search, start) !== -1;
        }
      }
      createErrorType("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError);
      createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
        if (assert === void 0) assert = require_assert();
        assert(typeof name === "string", "'name' must be a string");
        var determiner;
        if (typeof expected === "string" && startsWith(expected, "not ")) {
          determiner = "must not be";
          expected = expected.replace(/^not /, "");
        } else {
          determiner = "must be";
        }
        var msg;
        if (endsWith(name, " argument")) {
          msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
        } else {
          var type = includes(name, ".") ? "property" : "argument";
          msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
        }
        msg += ". Received type ".concat(_typeof(actual));
        return msg;
      }, TypeError);
      createErrorType("ERR_INVALID_ARG_VALUE", function(name, value) {
        var reason = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
        if (util === void 0) util = require_util();
        var inspected = util.inspect(value);
        if (inspected.length > 128) {
          inspected = "".concat(inspected.slice(0, 128), "...");
        }
        return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
      }, TypeError, RangeError);
      createErrorType("ERR_INVALID_RETURN_VALUE", function(input, name, value) {
        var type;
        if (value && value.constructor && value.constructor.name) {
          type = "instance of ".concat(value.constructor.name);
        } else {
          type = "type ".concat(_typeof(value));
        }
        return "Expected ".concat(input, ' to be returned from the "').concat(name, '"') + " function but got ".concat(type, ".");
      }, TypeError);
      createErrorType("ERR_MISSING_ARGS", function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (assert === void 0) assert = require_assert();
        assert(args.length > 0, "At least one arg needs to be specified");
        var msg = "The ";
        var len = args.length;
        args = args.map(function(a4) {
          return '"'.concat(a4, '"');
        });
        switch (len) {
          case 1:
            msg += "".concat(args[0], " argument");
            break;
          case 2:
            msg += "".concat(args[0], " and ").concat(args[1], " arguments");
            break;
          default:
            msg += args.slice(0, len - 1).join(", ");
            msg += ", and ".concat(args[len - 1], " arguments");
            break;
        }
        return "".concat(msg, " must be specified");
      }, TypeError);
      module.exports.codes = codes;
    }
  });

  // node_modules/assert/build/internal/assert/assertion_error.js
  var require_assertion_error = __commonJS({
    "node_modules/assert/build/internal/assert/assertion_error.js"(exports, module) {
      "use strict";
      function ownKeys(e2, r2) {
        var t3 = Object.keys(e2);
        if (Object.getOwnPropertySymbols) {
          var o5 = Object.getOwnPropertySymbols(e2);
          r2 && (o5 = o5.filter(function(r3) {
            return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
          })), t3.push.apply(t3, o5);
        }
        return t3;
      }
      function _objectSpread(e2) {
        for (var r2 = 1; r2 < arguments.length; r2++) {
          var t3 = null != arguments[r2] ? arguments[r2] : {};
          r2 % 2 ? ownKeys(Object(t3), true).forEach(function(r3) {
            _defineProperty(e2, r3, t3[r3]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t3)) : ownKeys(Object(t3)).forEach(function(r3) {
            Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t3, r3));
          });
        }
        return e2;
      }
      function _defineProperty(obj, key, value) {
        key = _toPropertyKey(key);
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        Object.defineProperty(subClass, "prototype", { writable: false });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
        _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
          if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
          if (typeof Class2 !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class2)) return _cache.get(Class2);
            _cache.set(Class2, Wrapper);
          }
          function Wrapper() {
            return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
          return _setPrototypeOf(Wrapper, Class2);
        };
        return _wrapNativeSuper(Class);
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct.bind();
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a4 = [null];
            a4.push.apply(a4, args2);
            var Constructor = Function.bind.apply(Parent2, a4);
            var instance = new Constructor();
            if (Class2) _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e2) {
          return false;
        }
      }
      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }
      function _setPrototypeOf(o5, p5) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o6, p6) {
          o6.__proto__ = p6;
          return o6;
        };
        return _setPrototypeOf(o5, p5);
      }
      function _getPrototypeOf(o5) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o6) {
          return o6.__proto__ || Object.getPrototypeOf(o6);
        };
        return _getPrototypeOf(o5);
      }
      function _typeof(o5) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o6) {
          return typeof o6;
        } : function(o6) {
          return o6 && "function" == typeof Symbol && o6.constructor === Symbol && o6 !== Symbol.prototype ? "symbol" : typeof o6;
        }, _typeof(o5);
      }
      var _require = require_util();
      var inspect = _require.inspect;
      var _require2 = require_errors2();
      var ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;
      function endsWith(str, search, this_len) {
        if (this_len === void 0 || this_len > str.length) {
          this_len = str.length;
        }
        return str.substring(this_len - search.length, this_len) === search;
      }
      function repeat(str, count) {
        count = Math.floor(count);
        if (str.length == 0 || count == 0) return "";
        var maxCount = str.length * count;
        count = Math.floor(Math.log(count) / Math.log(2));
        while (count) {
          str += str;
          count--;
        }
        str += str.substring(0, maxCount - str.length);
        return str;
      }
      var blue = "";
      var green = "";
      var red = "";
      var white = "";
      var kReadableOperator = {
        deepStrictEqual: "Expected values to be strictly deep-equal:",
        strictEqual: "Expected values to be strictly equal:",
        strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
        deepEqual: "Expected values to be loosely deep-equal:",
        equal: "Expected values to be loosely equal:",
        notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
        notStrictEqual: 'Expected "actual" to be strictly unequal to:',
        notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
        notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
        notEqual: 'Expected "actual" to be loosely unequal to:',
        notIdentical: "Values identical but not reference-equal:"
      };
      var kMaxShortLength = 10;
      function copyError(source) {
        var keys = Object.keys(source);
        var target = Object.create(Object.getPrototypeOf(source));
        keys.forEach(function(key) {
          target[key] = source[key];
        });
        Object.defineProperty(target, "message", {
          value: source.message
        });
        return target;
      }
      function inspectValue(val) {
        return inspect(val, {
          compact: false,
          customInspect: false,
          depth: 1e3,
          maxArrayLength: Infinity,
          // Assert compares only enumerable properties (with a few exceptions).
          showHidden: false,
          // Having a long line as error is better than wrapping the line for
          // comparison for now.
          // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
          // have meta information about the inspected properties (i.e., know where
          // in what line the property starts and ends).
          breakLength: Infinity,
          // Assert does not detect proxies currently.
          showProxy: false,
          sorted: true,
          // Inspect getters as we also check them when comparing entries.
          getters: true
        });
      }
      function createErrDiff(actual, expected, operator) {
        var other = "";
        var res = "";
        var lastPos = 0;
        var end = "";
        var skipped = false;
        var actualInspected = inspectValue(actual);
        var actualLines = actualInspected.split("\n");
        var expectedLines = inspectValue(expected).split("\n");
        var i = 0;
        var indicator = "";
        if (operator === "strictEqual" && _typeof(actual) === "object" && _typeof(expected) === "object" && actual !== null && expected !== null) {
          operator = "strictEqualObject";
        }
        if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
          var inputLength = actualLines[0].length + expectedLines[0].length;
          if (inputLength <= kMaxShortLength) {
            if ((_typeof(actual) !== "object" || actual === null) && (_typeof(expected) !== "object" || expected === null) && (actual !== 0 || expected !== 0)) {
              return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
            }
          } else if (operator !== "strictEqualObject") {
            var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
            if (inputLength < maxLength) {
              while (actualLines[0][i] === expectedLines[0][i]) {
                i++;
              }
              if (i > 2) {
                indicator = "\n  ".concat(repeat(" ", i), "^");
                i = 0;
              }
            }
          }
        }
        var a4 = actualLines[actualLines.length - 1];
        var b5 = expectedLines[expectedLines.length - 1];
        while (a4 === b5) {
          if (i++ < 2) {
            end = "\n  ".concat(a4).concat(end);
          } else {
            other = a4;
          }
          actualLines.pop();
          expectedLines.pop();
          if (actualLines.length === 0 || expectedLines.length === 0) break;
          a4 = actualLines[actualLines.length - 1];
          b5 = expectedLines[expectedLines.length - 1];
        }
        var maxLines = Math.max(actualLines.length, expectedLines.length);
        if (maxLines === 0) {
          var _actualLines = actualInspected.split("\n");
          if (_actualLines.length > 30) {
            _actualLines[26] = "".concat(blue, "...").concat(white);
            while (_actualLines.length > 27) {
              _actualLines.pop();
            }
          }
          return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join("\n"), "\n");
        }
        if (i > 3) {
          end = "\n".concat(blue, "...").concat(white).concat(end);
          skipped = true;
        }
        if (other !== "") {
          end = "\n  ".concat(other).concat(end);
          other = "";
        }
        var printedLines = 0;
        var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
        var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
        for (i = 0; i < maxLines; i++) {
          var cur = i - lastPos;
          if (actualLines.length < i + 1) {
            if (cur > 1 && i > 2) {
              if (cur > 4) {
                res += "\n".concat(blue, "...").concat(white);
                skipped = true;
              } else if (cur > 3) {
                res += "\n  ".concat(expectedLines[i - 2]);
                printedLines++;
              }
              res += "\n  ".concat(expectedLines[i - 1]);
              printedLines++;
            }
            lastPos = i;
            other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
            printedLines++;
          } else if (expectedLines.length < i + 1) {
            if (cur > 1 && i > 2) {
              if (cur > 4) {
                res += "\n".concat(blue, "...").concat(white);
                skipped = true;
              } else if (cur > 3) {
                res += "\n  ".concat(actualLines[i - 2]);
                printedLines++;
              }
              res += "\n  ".concat(actualLines[i - 1]);
              printedLines++;
            }
            lastPos = i;
            res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
            printedLines++;
          } else {
            var expectedLine = expectedLines[i];
            var actualLine = actualLines[i];
            var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ",") || actualLine.slice(0, -1) !== expectedLine);
            if (divergingLines && endsWith(expectedLine, ",") && expectedLine.slice(0, -1) === actualLine) {
              divergingLines = false;
              actualLine += ",";
            }
            if (divergingLines) {
              if (cur > 1 && i > 2) {
                if (cur > 4) {
                  res += "\n".concat(blue, "...").concat(white);
                  skipped = true;
                } else if (cur > 3) {
                  res += "\n  ".concat(actualLines[i - 2]);
                  printedLines++;
                }
                res += "\n  ".concat(actualLines[i - 1]);
                printedLines++;
              }
              lastPos = i;
              res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
              other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
              printedLines += 2;
            } else {
              res += other;
              other = "";
              if (cur === 1 || i === 0) {
                res += "\n  ".concat(actualLine);
                printedLines++;
              }
            }
          }
          if (printedLines > 20 && i < maxLines - 2) {
            return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
          }
        }
        return "".concat(msg).concat(skipped ? skippedMsg : "", "\n").concat(res).concat(other).concat(end).concat(indicator);
      }
      var AssertionError = /* @__PURE__ */ (function(_Error, _inspect$custom) {
        _inherits(AssertionError2, _Error);
        var _super = _createSuper(AssertionError2);
        function AssertionError2(options) {
          var _this;
          _classCallCheck(this, AssertionError2);
          if (_typeof(options) !== "object" || options === null) {
            throw new ERR_INVALID_ARG_TYPE("options", "Object", options);
          }
          var message = options.message, operator = options.operator, stackStartFn = options.stackStartFn;
          var actual = options.actual, expected = options.expected;
          var limit = Error.stackTraceLimit;
          Error.stackTraceLimit = 0;
          if (message != null) {
            _this = _super.call(this, String(message));
          } else {
            if (process.stderr && process.stderr.isTTY) {
              if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
                blue = "\x1B[34m";
                green = "\x1B[32m";
                white = "\x1B[39m";
                red = "\x1B[31m";
              } else {
                blue = "";
                green = "";
                white = "";
                red = "";
              }
            }
            if (_typeof(actual) === "object" && actual !== null && _typeof(expected) === "object" && expected !== null && "stack" in actual && actual instanceof Error && "stack" in expected && expected instanceof Error) {
              actual = copyError(actual);
              expected = copyError(expected);
            }
            if (operator === "deepStrictEqual" || operator === "strictEqual") {
              _this = _super.call(this, createErrDiff(actual, expected, operator));
            } else if (operator === "notDeepStrictEqual" || operator === "notStrictEqual") {
              var base = kReadableOperator[operator];
              var res = inspectValue(actual).split("\n");
              if (operator === "notStrictEqual" && _typeof(actual) === "object" && actual !== null) {
                base = kReadableOperator.notStrictEqualObject;
              }
              if (res.length > 30) {
                res[26] = "".concat(blue, "...").concat(white);
                while (res.length > 27) {
                  res.pop();
                }
              }
              if (res.length === 1) {
                _this = _super.call(this, "".concat(base, " ").concat(res[0]));
              } else {
                _this = _super.call(this, "".concat(base, "\n\n").concat(res.join("\n"), "\n"));
              }
            } else {
              var _res = inspectValue(actual);
              var other = "";
              var knownOperators = kReadableOperator[operator];
              if (operator === "notDeepEqual" || operator === "notEqual") {
                _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
                if (_res.length > 1024) {
                  _res = "".concat(_res.slice(0, 1021), "...");
                }
              } else {
                other = "".concat(inspectValue(expected));
                if (_res.length > 512) {
                  _res = "".concat(_res.slice(0, 509), "...");
                }
                if (other.length > 512) {
                  other = "".concat(other.slice(0, 509), "...");
                }
                if (operator === "deepEqual" || operator === "equal") {
                  _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
                } else {
                  other = " ".concat(operator, " ").concat(other);
                }
              }
              _this = _super.call(this, "".concat(_res).concat(other));
            }
          }
          Error.stackTraceLimit = limit;
          _this.generatedMessage = !message;
          Object.defineProperty(_assertThisInitialized(_this), "name", {
            value: "AssertionError [ERR_ASSERTION]",
            enumerable: false,
            writable: true,
            configurable: true
          });
          _this.code = "ERR_ASSERTION";
          _this.actual = actual;
          _this.expected = expected;
          _this.operator = operator;
          if (Error.captureStackTrace) {
            Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
          }
          _this.stack;
          _this.name = "AssertionError";
          return _possibleConstructorReturn(_this);
        }
        _createClass(AssertionError2, [{
          key: "toString",
          value: function toString() {
            return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
          }
        }, {
          key: _inspect$custom,
          value: function value(recurseTimes, ctx) {
            return inspect(this, _objectSpread(_objectSpread({}, ctx), {}, {
              customInspect: false,
              depth: 0
            }));
          }
        }]);
        return AssertionError2;
      })(/* @__PURE__ */ _wrapNativeSuper(Error), inspect.custom);
      module.exports = AssertionError;
    }
  });

  // node_modules/object-keys/isArguments.js
  var require_isArguments = __commonJS({
    "node_modules/object-keys/isArguments.js"(exports, module) {
      "use strict";
      var toStr = Object.prototype.toString;
      module.exports = function isArguments(value) {
        var str = toStr.call(value);
        var isArgs = str === "[object Arguments]";
        if (!isArgs) {
          isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
        }
        return isArgs;
      };
    }
  });

  // node_modules/object-keys/implementation.js
  var require_implementation2 = __commonJS({
    "node_modules/object-keys/implementation.js"(exports, module) {
      "use strict";
      var keysShim;
      if (!Object.keys) {
        has = Object.prototype.hasOwnProperty;
        toStr = Object.prototype.toString;
        isArgs = require_isArguments();
        isEnumerable = Object.prototype.propertyIsEnumerable;
        hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
        hasProtoEnumBug = isEnumerable.call(function() {
        }, "prototype");
        dontEnums = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor"
        ];
        equalsConstructorPrototype = function(o5) {
          var ctor = o5.constructor;
          return ctor && ctor.prototype === o5;
        };
        excludedKeys = {
          $applicationCache: true,
          $console: true,
          $external: true,
          $frame: true,
          $frameElement: true,
          $frames: true,
          $innerHeight: true,
          $innerWidth: true,
          $onmozfullscreenchange: true,
          $onmozfullscreenerror: true,
          $outerHeight: true,
          $outerWidth: true,
          $pageXOffset: true,
          $pageYOffset: true,
          $parent: true,
          $scrollLeft: true,
          $scrollTop: true,
          $scrollX: true,
          $scrollY: true,
          $self: true,
          $webkitIndexedDB: true,
          $webkitStorageInfo: true,
          $window: true
        };
        hasAutomationEqualityBug = (function() {
          if (typeof window === "undefined") {
            return false;
          }
          for (var k4 in window) {
            try {
              if (!excludedKeys["$" + k4] && has.call(window, k4) && window[k4] !== null && typeof window[k4] === "object") {
                try {
                  equalsConstructorPrototype(window[k4]);
                } catch (e2) {
                  return true;
                }
              }
            } catch (e2) {
              return true;
            }
          }
          return false;
        })();
        equalsConstructorPrototypeIfNotBuggy = function(o5) {
          if (typeof window === "undefined" || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(o5);
          }
          try {
            return equalsConstructorPrototype(o5);
          } catch (e2) {
            return false;
          }
        };
        keysShim = function keys(object) {
          var isObject = object !== null && typeof object === "object";
          var isFunction = toStr.call(object) === "[object Function]";
          var isArguments = isArgs(object);
          var isString = isObject && toStr.call(object) === "[object String]";
          var theKeys = [];
          if (!isObject && !isFunction && !isArguments) {
            throw new TypeError("Object.keys called on a non-object");
          }
          var skipProto = hasProtoEnumBug && isFunction;
          if (isString && object.length > 0 && !has.call(object, 0)) {
            for (var i = 0; i < object.length; ++i) {
              theKeys.push(String(i));
            }
          }
          if (isArguments && object.length > 0) {
            for (var j2 = 0; j2 < object.length; ++j2) {
              theKeys.push(String(j2));
            }
          } else {
            for (var name in object) {
              if (!(skipProto && name === "prototype") && has.call(object, name)) {
                theKeys.push(String(name));
              }
            }
          }
          if (hasDontEnumBug) {
            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
            for (var k4 = 0; k4 < dontEnums.length; ++k4) {
              if (!(skipConstructor && dontEnums[k4] === "constructor") && has.call(object, dontEnums[k4])) {
                theKeys.push(dontEnums[k4]);
              }
            }
          }
          return theKeys;
        };
      }
      var has;
      var toStr;
      var isArgs;
      var isEnumerable;
      var hasDontEnumBug;
      var hasProtoEnumBug;
      var dontEnums;
      var equalsConstructorPrototype;
      var excludedKeys;
      var hasAutomationEqualityBug;
      var equalsConstructorPrototypeIfNotBuggy;
      module.exports = keysShim;
    }
  });

  // node_modules/object-keys/index.js
  var require_object_keys = __commonJS({
    "node_modules/object-keys/index.js"(exports, module) {
      "use strict";
      var slice = Array.prototype.slice;
      var isArgs = require_isArguments();
      var origKeys = Object.keys;
      var keysShim = origKeys ? function keys(o5) {
        return origKeys(o5);
      } : require_implementation2();
      var originalKeys = Object.keys;
      keysShim.shim = function shimObjectKeys() {
        if (Object.keys) {
          var keysWorksWithArguments = (function() {
            var args = Object.keys(arguments);
            return args && args.length === arguments.length;
          })(1, 2);
          if (!keysWorksWithArguments) {
            Object.keys = function keys(object) {
              if (isArgs(object)) {
                return originalKeys(slice.call(object));
              }
              return originalKeys(object);
            };
          }
        } else {
          Object.keys = keysShim;
        }
        return Object.keys || keysShim;
      };
      module.exports = keysShim;
    }
  });

  // node_modules/object.assign/implementation.js
  var require_implementation3 = __commonJS({
    "node_modules/object.assign/implementation.js"(exports, module) {
      "use strict";
      var objectKeys = require_object_keys();
      var hasSymbols = require_shams()();
      var callBound = require_call_bound();
      var $Object = require_es_object_atoms();
      var $push = callBound("Array.prototype.push");
      var $propIsEnumerable = callBound("Object.prototype.propertyIsEnumerable");
      var originalGetSymbols = hasSymbols ? $Object.getOwnPropertySymbols : null;
      module.exports = function assign(target, source1) {
        if (target == null) {
          throw new TypeError("target must be an object");
        }
        var to = $Object(target);
        if (arguments.length === 1) {
          return to;
        }
        for (var s3 = 1; s3 < arguments.length; ++s3) {
          var from = $Object(arguments[s3]);
          var keys = objectKeys(from);
          var getSymbols = hasSymbols && ($Object.getOwnPropertySymbols || originalGetSymbols);
          if (getSymbols) {
            var syms = getSymbols(from);
            for (var j2 = 0; j2 < syms.length; ++j2) {
              var key = syms[j2];
              if ($propIsEnumerable(from, key)) {
                $push(keys, key);
              }
            }
          }
          for (var i = 0; i < keys.length; ++i) {
            var nextKey = keys[i];
            if ($propIsEnumerable(from, nextKey)) {
              var propValue = from[nextKey];
              to[nextKey] = propValue;
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/object.assign/polyfill.js
  var require_polyfill = __commonJS({
    "node_modules/object.assign/polyfill.js"(exports, module) {
      "use strict";
      var implementation = require_implementation3();
      var lacksProperEnumerationOrder = function() {
        if (!Object.assign) {
          return false;
        }
        var str = "abcdefghijklmnopqrst";
        var letters = str.split("");
        var map = {};
        for (var i = 0; i < letters.length; ++i) {
          map[letters[i]] = letters[i];
        }
        var obj = Object.assign({}, map);
        var actual = "";
        for (var k4 in obj) {
          actual += k4;
        }
        return str !== actual;
      };
      var assignHasPendingExceptions = function() {
        if (!Object.assign || !Object.preventExtensions) {
          return false;
        }
        var thrower = Object.preventExtensions({ 1: 2 });
        try {
          Object.assign(thrower, "xy");
        } catch (e2) {
          return thrower[1] === "y";
        }
        return false;
      };
      module.exports = function getPolyfill() {
        if (!Object.assign) {
          return implementation;
        }
        if (lacksProperEnumerationOrder()) {
          return implementation;
        }
        if (assignHasPendingExceptions()) {
          return implementation;
        }
        return Object.assign;
      };
    }
  });

  // node_modules/object-is/implementation.js
  var require_implementation4 = __commonJS({
    "node_modules/object-is/implementation.js"(exports, module) {
      "use strict";
      var numberIsNaN = function(value) {
        return value !== value;
      };
      module.exports = function is(a4, b5) {
        if (a4 === 0 && b5 === 0) {
          return 1 / a4 === 1 / b5;
        }
        if (a4 === b5) {
          return true;
        }
        if (numberIsNaN(a4) && numberIsNaN(b5)) {
          return true;
        }
        return false;
      };
    }
  });

  // node_modules/object-is/polyfill.js
  var require_polyfill2 = __commonJS({
    "node_modules/object-is/polyfill.js"(exports, module) {
      "use strict";
      var implementation = require_implementation4();
      module.exports = function getPolyfill() {
        return typeof Object.is === "function" ? Object.is : implementation;
      };
    }
  });

  // node_modules/call-bind/callBound.js
  var require_callBound = __commonJS({
    "node_modules/call-bind/callBound.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBind = require_call_bind();
      var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
      module.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = GetIntrinsic(name, !!allowMissing);
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBind(intrinsic);
        }
        return intrinsic;
      };
    }
  });

  // node_modules/define-properties/index.js
  var require_define_properties = __commonJS({
    "node_modules/define-properties/index.js"(exports, module) {
      "use strict";
      var keys = require_object_keys();
      var hasSymbols = typeof Symbol === "function" && typeof /* @__PURE__ */ Symbol("foo") === "symbol";
      var toStr = Object.prototype.toString;
      var concat = Array.prototype.concat;
      var defineDataProperty = require_define_data_property();
      var isFunction = function(fn) {
        return typeof fn === "function" && toStr.call(fn) === "[object Function]";
      };
      var supportsDescriptors = require_has_property_descriptors()();
      var defineProperty = function(object, name, value, predicate) {
        if (name in object) {
          if (predicate === true) {
            if (object[name] === value) {
              return;
            }
          } else if (!isFunction(predicate) || !predicate()) {
            return;
          }
        }
        if (supportsDescriptors) {
          defineDataProperty(object, name, value, true);
        } else {
          defineDataProperty(object, name, value);
        }
      };
      var defineProperties = function(object, map) {
        var predicates = arguments.length > 2 ? arguments[2] : {};
        var props = keys(map);
        if (hasSymbols) {
          props = concat.call(props, Object.getOwnPropertySymbols(map));
        }
        for (var i = 0; i < props.length; i += 1) {
          defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
        }
      };
      defineProperties.supportsDescriptors = !!supportsDescriptors;
      module.exports = defineProperties;
    }
  });

  // node_modules/object-is/shim.js
  var require_shim = __commonJS({
    "node_modules/object-is/shim.js"(exports, module) {
      "use strict";
      var getPolyfill = require_polyfill2();
      var define2 = require_define_properties();
      module.exports = function shimObjectIs() {
        var polyfill = getPolyfill();
        define2(Object, { is: polyfill }, {
          is: function testObjectIs() {
            return Object.is !== polyfill;
          }
        });
        return polyfill;
      };
    }
  });

  // node_modules/object-is/index.js
  var require_object_is = __commonJS({
    "node_modules/object-is/index.js"(exports, module) {
      "use strict";
      var define2 = require_define_properties();
      var callBind = require_call_bind();
      var implementation = require_implementation4();
      var getPolyfill = require_polyfill2();
      var shim = require_shim();
      var polyfill = callBind(getPolyfill(), Object);
      define2(polyfill, {
        getPolyfill,
        implementation,
        shim
      });
      module.exports = polyfill;
    }
  });

  // node_modules/is-nan/implementation.js
  var require_implementation5 = __commonJS({
    "node_modules/is-nan/implementation.js"(exports, module) {
      "use strict";
      module.exports = function isNaN2(value) {
        return value !== value;
      };
    }
  });

  // node_modules/is-nan/polyfill.js
  var require_polyfill3 = __commonJS({
    "node_modules/is-nan/polyfill.js"(exports, module) {
      "use strict";
      var implementation = require_implementation5();
      module.exports = function getPolyfill() {
        if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a")) {
          return Number.isNaN;
        }
        return implementation;
      };
    }
  });

  // node_modules/is-nan/shim.js
  var require_shim2 = __commonJS({
    "node_modules/is-nan/shim.js"(exports, module) {
      "use strict";
      var define2 = require_define_properties();
      var getPolyfill = require_polyfill3();
      module.exports = function shimNumberIsNaN() {
        var polyfill = getPolyfill();
        define2(Number, { isNaN: polyfill }, {
          isNaN: function testIsNaN() {
            return Number.isNaN !== polyfill;
          }
        });
        return polyfill;
      };
    }
  });

  // node_modules/is-nan/index.js
  var require_is_nan = __commonJS({
    "node_modules/is-nan/index.js"(exports, module) {
      "use strict";
      var callBind = require_call_bind();
      var define2 = require_define_properties();
      var implementation = require_implementation5();
      var getPolyfill = require_polyfill3();
      var shim = require_shim2();
      var polyfill = callBind(getPolyfill(), Number);
      define2(polyfill, {
        getPolyfill,
        implementation,
        shim
      });
      module.exports = polyfill;
    }
  });

  // node_modules/assert/build/internal/util/comparisons.js
  var require_comparisons = __commonJS({
    "node_modules/assert/build/internal/util/comparisons.js"(exports, module) {
      "use strict";
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(o5, minLen) {
        if (!o5) return;
        if (typeof o5 === "string") return _arrayLikeToArray(o5, minLen);
        var n2 = Object.prototype.toString.call(o5).slice(8, -1);
        if (n2 === "Object" && o5.constructor) n2 = o5.constructor.name;
        if (n2 === "Map" || n2 === "Set") return Array.from(o5);
        if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray(o5, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _iterableToArrayLimit(r2, l6) {
        var t3 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
        if (null != t3) {
          var e2, n2, i, u3, a4 = [], f7 = true, o5 = false;
          try {
            if (i = (t3 = t3.call(r2)).next, 0 === l6) {
              if (Object(t3) !== t3) return;
              f7 = false;
            } else for (; !(f7 = (e2 = i.call(t3)).done) && (a4.push(e2.value), a4.length !== l6); f7 = true) ;
          } catch (r3) {
            o5 = true, n2 = r3;
          } finally {
            try {
              if (!f7 && null != t3.return && (u3 = t3.return(), Object(u3) !== u3)) return;
            } finally {
              if (o5) throw n2;
            }
          }
          return a4;
        }
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function _typeof(o5) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o6) {
          return typeof o6;
        } : function(o6) {
          return o6 && "function" == typeof Symbol && o6.constructor === Symbol && o6 !== Symbol.prototype ? "symbol" : typeof o6;
        }, _typeof(o5);
      }
      var regexFlagsSupported = /a/g.flags !== void 0;
      var arrayFromSet = function arrayFromSet2(set) {
        var array = [];
        set.forEach(function(value) {
          return array.push(value);
        });
        return array;
      };
      var arrayFromMap = function arrayFromMap2(map) {
        var array = [];
        map.forEach(function(value, key) {
          return array.push([key, value]);
        });
        return array;
      };
      var objectIs = Object.is ? Object.is : require_object_is();
      var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
        return [];
      };
      var numberIsNaN = Number.isNaN ? Number.isNaN : require_is_nan();
      function uncurryThis(f7) {
        return f7.call.bind(f7);
      }
      var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
      var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
      var objectToString = uncurryThis(Object.prototype.toString);
      var _require$types = require_util().types;
      var isAnyArrayBuffer = _require$types.isAnyArrayBuffer;
      var isArrayBufferView2 = _require$types.isArrayBufferView;
      var isDate = _require$types.isDate;
      var isMap = _require$types.isMap;
      var isRegExp = _require$types.isRegExp;
      var isSet = _require$types.isSet;
      var isNativeError = _require$types.isNativeError;
      var isBoxedPrimitive = _require$types.isBoxedPrimitive;
      var isNumberObject = _require$types.isNumberObject;
      var isStringObject = _require$types.isStringObject;
      var isBooleanObject = _require$types.isBooleanObject;
      var isBigIntObject = _require$types.isBigIntObject;
      var isSymbolObject = _require$types.isSymbolObject;
      var isFloat32Array = _require$types.isFloat32Array;
      var isFloat64Array = _require$types.isFloat64Array;
      function isNonIndex(key) {
        if (key.length === 0 || key.length > 10) return true;
        for (var i = 0; i < key.length; i++) {
          var code = key.charCodeAt(i);
          if (code < 48 || code > 57) return true;
        }
        return key.length === 10 && key >= Math.pow(2, 32);
      }
      function getOwnNonIndexProperties(value) {
        return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
      }
      function compare(a4, b5) {
        if (a4 === b5) {
          return 0;
        }
        var x5 = a4.length;
        var y7 = b5.length;
        for (var i = 0, len = Math.min(x5, y7); i < len; ++i) {
          if (a4[i] !== b5[i]) {
            x5 = a4[i];
            y7 = b5[i];
            break;
          }
        }
        if (x5 < y7) {
          return -1;
        }
        if (y7 < x5) {
          return 1;
        }
        return 0;
      }
      var ONLY_ENUMERABLE = void 0;
      var kStrict = true;
      var kLoose = false;
      var kNoIterator = 0;
      var kIsArray = 1;
      var kIsSet = 2;
      var kIsMap = 3;
      function areSimilarRegExps(a4, b5) {
        return regexFlagsSupported ? a4.source === b5.source && a4.flags === b5.flags : RegExp.prototype.toString.call(a4) === RegExp.prototype.toString.call(b5);
      }
      function areSimilarFloatArrays(a4, b5) {
        if (a4.byteLength !== b5.byteLength) {
          return false;
        }
        for (var offset = 0; offset < a4.byteLength; offset++) {
          if (a4[offset] !== b5[offset]) {
            return false;
          }
        }
        return true;
      }
      function areSimilarTypedArrays(a4, b5) {
        if (a4.byteLength !== b5.byteLength) {
          return false;
        }
        return compare(new Uint8Array(a4.buffer, a4.byteOffset, a4.byteLength), new Uint8Array(b5.buffer, b5.byteOffset, b5.byteLength)) === 0;
      }
      function areEqualArrayBuffers(buf1, buf2) {
        return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
      }
      function isEqualBoxedPrimitive(val1, val2) {
        if (isNumberObject(val1)) {
          return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
        }
        if (isStringObject(val1)) {
          return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
        }
        if (isBooleanObject(val1)) {
          return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
        }
        if (isBigIntObject(val1)) {
          return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
        }
        return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
      }
      function innerDeepEqual(val1, val2, strict, memos) {
        if (val1 === val2) {
          if (val1 !== 0) return true;
          return strict ? objectIs(val1, val2) : true;
        }
        if (strict) {
          if (_typeof(val1) !== "object") {
            return typeof val1 === "number" && numberIsNaN(val1) && numberIsNaN(val2);
          }
          if (_typeof(val2) !== "object" || val1 === null || val2 === null) {
            return false;
          }
          if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
            return false;
          }
        } else {
          if (val1 === null || _typeof(val1) !== "object") {
            if (val2 === null || _typeof(val2) !== "object") {
              return val1 == val2;
            }
            return false;
          }
          if (val2 === null || _typeof(val2) !== "object") {
            return false;
          }
        }
        var val1Tag = objectToString(val1);
        var val2Tag = objectToString(val2);
        if (val1Tag !== val2Tag) {
          return false;
        }
        if (Array.isArray(val1)) {
          if (val1.length !== val2.length) {
            return false;
          }
          var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
          var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
          if (keys1.length !== keys2.length) {
            return false;
          }
          return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
        }
        if (val1Tag === "[object Object]") {
          if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
            return false;
          }
        }
        if (isDate(val1)) {
          if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
            return false;
          }
        } else if (isRegExp(val1)) {
          if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
            return false;
          }
        } else if (isNativeError(val1) || val1 instanceof Error) {
          if (val1.message !== val2.message || val1.name !== val2.name) {
            return false;
          }
        } else if (isArrayBufferView2(val1)) {
          if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
            if (!areSimilarFloatArrays(val1, val2)) {
              return false;
            }
          } else if (!areSimilarTypedArrays(val1, val2)) {
            return false;
          }
          var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
          var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
          if (_keys.length !== _keys2.length) {
            return false;
          }
          return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
        } else if (isSet(val1)) {
          if (!isSet(val2) || val1.size !== val2.size) {
            return false;
          }
          return keyCheck(val1, val2, strict, memos, kIsSet);
        } else if (isMap(val1)) {
          if (!isMap(val2) || val1.size !== val2.size) {
            return false;
          }
          return keyCheck(val1, val2, strict, memos, kIsMap);
        } else if (isAnyArrayBuffer(val1)) {
          if (!areEqualArrayBuffers(val1, val2)) {
            return false;
          }
        } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kNoIterator);
      }
      function getEnumerables(val, keys) {
        return keys.filter(function(k4) {
          return propertyIsEnumerable(val, k4);
        });
      }
      function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
        if (arguments.length === 5) {
          aKeys = Object.keys(val1);
          var bKeys = Object.keys(val2);
          if (aKeys.length !== bKeys.length) {
            return false;
          }
        }
        var i = 0;
        for (; i < aKeys.length; i++) {
          if (!hasOwnProperty(val2, aKeys[i])) {
            return false;
          }
        }
        if (strict && arguments.length === 5) {
          var symbolKeysA = objectGetOwnPropertySymbols(val1);
          if (symbolKeysA.length !== 0) {
            var count = 0;
            for (i = 0; i < symbolKeysA.length; i++) {
              var key = symbolKeysA[i];
              if (propertyIsEnumerable(val1, key)) {
                if (!propertyIsEnumerable(val2, key)) {
                  return false;
                }
                aKeys.push(key);
                count++;
              } else if (propertyIsEnumerable(val2, key)) {
                return false;
              }
            }
            var symbolKeysB = objectGetOwnPropertySymbols(val2);
            if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
              return false;
            }
          } else {
            var _symbolKeysB = objectGetOwnPropertySymbols(val2);
            if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
              return false;
            }
          }
        }
        if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
          return true;
        }
        if (memos === void 0) {
          memos = {
            val1: /* @__PURE__ */ new Map(),
            val2: /* @__PURE__ */ new Map(),
            position: 0
          };
        } else {
          var val2MemoA = memos.val1.get(val1);
          if (val2MemoA !== void 0) {
            var val2MemoB = memos.val2.get(val2);
            if (val2MemoB !== void 0) {
              return val2MemoA === val2MemoB;
            }
          }
          memos.position++;
        }
        memos.val1.set(val1, memos.position);
        memos.val2.set(val2, memos.position);
        var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
        memos.val1.delete(val1);
        memos.val2.delete(val2);
        return areEq;
      }
      function setHasEqualElement(set, val1, strict, memo) {
        var setValues = arrayFromSet(set);
        for (var i = 0; i < setValues.length; i++) {
          var val2 = setValues[i];
          if (innerDeepEqual(val1, val2, strict, memo)) {
            set.delete(val2);
            return true;
          }
        }
        return false;
      }
      function findLooseMatchingPrimitives(prim) {
        switch (_typeof(prim)) {
          case "undefined":
            return null;
          case "object":
            return void 0;
          case "symbol":
            return false;
          case "string":
            prim = +prim;
          // Loose equal entries exist only if the string is possible to convert to
          // a regular number and not NaN.
          // Fall through
          case "number":
            if (numberIsNaN(prim)) {
              return false;
            }
        }
        return true;
      }
      function setMightHaveLoosePrim(a4, b5, prim) {
        var altValue = findLooseMatchingPrimitives(prim);
        if (altValue != null) return altValue;
        return b5.has(altValue) && !a4.has(altValue);
      }
      function mapMightHaveLoosePrim(a4, b5, prim, item, memo) {
        var altValue = findLooseMatchingPrimitives(prim);
        if (altValue != null) {
          return altValue;
        }
        var curB = b5.get(altValue);
        if (curB === void 0 && !b5.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
          return false;
        }
        return !a4.has(altValue) && innerDeepEqual(item, curB, false, memo);
      }
      function setEquiv(a4, b5, strict, memo) {
        var set = null;
        var aValues = arrayFromSet(a4);
        for (var i = 0; i < aValues.length; i++) {
          var val = aValues[i];
          if (_typeof(val) === "object" && val !== null) {
            if (set === null) {
              set = /* @__PURE__ */ new Set();
            }
            set.add(val);
          } else if (!b5.has(val)) {
            if (strict) return false;
            if (!setMightHaveLoosePrim(a4, b5, val)) {
              return false;
            }
            if (set === null) {
              set = /* @__PURE__ */ new Set();
            }
            set.add(val);
          }
        }
        if (set !== null) {
          var bValues = arrayFromSet(b5);
          for (var _i = 0; _i < bValues.length; _i++) {
            var _val = bValues[_i];
            if (_typeof(_val) === "object" && _val !== null) {
              if (!setHasEqualElement(set, _val, strict, memo)) return false;
            } else if (!strict && !a4.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
              return false;
            }
          }
          return set.size === 0;
        }
        return true;
      }
      function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
        var setValues = arrayFromSet(set);
        for (var i = 0; i < setValues.length; i++) {
          var key2 = setValues[i];
          if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
            set.delete(key2);
            return true;
          }
        }
        return false;
      }
      function mapEquiv(a4, b5, strict, memo) {
        var set = null;
        var aEntries = arrayFromMap(a4);
        for (var i = 0; i < aEntries.length; i++) {
          var _aEntries$i = _slicedToArray(aEntries[i], 2), key = _aEntries$i[0], item1 = _aEntries$i[1];
          if (_typeof(key) === "object" && key !== null) {
            if (set === null) {
              set = /* @__PURE__ */ new Set();
            }
            set.add(key);
          } else {
            var item2 = b5.get(key);
            if (item2 === void 0 && !b5.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
              if (strict) return false;
              if (!mapMightHaveLoosePrim(a4, b5, key, item1, memo)) return false;
              if (set === null) {
                set = /* @__PURE__ */ new Set();
              }
              set.add(key);
            }
          }
        }
        if (set !== null) {
          var bEntries = arrayFromMap(b5);
          for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
            var _bEntries$_i = _slicedToArray(bEntries[_i2], 2), _key = _bEntries$_i[0], item = _bEntries$_i[1];
            if (_typeof(_key) === "object" && _key !== null) {
              if (!mapHasEqualEntry(set, a4, _key, item, strict, memo)) return false;
            } else if (!strict && (!a4.has(_key) || !innerDeepEqual(a4.get(_key), item, false, memo)) && !mapHasEqualEntry(set, a4, _key, item, false, memo)) {
              return false;
            }
          }
          return set.size === 0;
        }
        return true;
      }
      function objEquiv(a4, b5, strict, keys, memos, iterationType) {
        var i = 0;
        if (iterationType === kIsSet) {
          if (!setEquiv(a4, b5, strict, memos)) {
            return false;
          }
        } else if (iterationType === kIsMap) {
          if (!mapEquiv(a4, b5, strict, memos)) {
            return false;
          }
        } else if (iterationType === kIsArray) {
          for (; i < a4.length; i++) {
            if (hasOwnProperty(a4, i)) {
              if (!hasOwnProperty(b5, i) || !innerDeepEqual(a4[i], b5[i], strict, memos)) {
                return false;
              }
            } else if (hasOwnProperty(b5, i)) {
              return false;
            } else {
              var keysA = Object.keys(a4);
              for (; i < keysA.length; i++) {
                var key = keysA[i];
                if (!hasOwnProperty(b5, key) || !innerDeepEqual(a4[key], b5[key], strict, memos)) {
                  return false;
                }
              }
              if (keysA.length !== Object.keys(b5).length) {
                return false;
              }
              return true;
            }
          }
        }
        for (i = 0; i < keys.length; i++) {
          var _key2 = keys[i];
          if (!innerDeepEqual(a4[_key2], b5[_key2], strict, memos)) {
            return false;
          }
        }
        return true;
      }
      function isDeepEqual(val1, val2) {
        return innerDeepEqual(val1, val2, kLoose);
      }
      function isDeepStrictEqual(val1, val2) {
        return innerDeepEqual(val1, val2, kStrict);
      }
      module.exports = {
        isDeepEqual,
        isDeepStrictEqual
      };
    }
  });

  // node_modules/assert/build/assert.js
  var require_assert = __commonJS({
    "node_modules/assert/build/assert.js"(exports, module) {
      "use strict";
      function _typeof(o5) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o6) {
          return typeof o6;
        } : function(o6) {
          return o6 && "function" == typeof Symbol && o6.constructor === Symbol && o6 !== Symbol.prototype ? "symbol" : typeof o6;
        }, _typeof(o5);
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      var _require = require_errors2();
      var _require$codes = _require.codes;
      var ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT;
      var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
      var ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE;
      var ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE;
      var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
      var AssertionError = require_assertion_error();
      var _require2 = require_util();
      var inspect = _require2.inspect;
      var _require$types = require_util().types;
      var isPromise = _require$types.isPromise;
      var isRegExp = _require$types.isRegExp;
      var objectAssign = require_polyfill()();
      var objectIs = require_polyfill2()();
      var RegExpPrototypeTest = require_callBound()("RegExp.prototype.test");
      var isDeepEqual;
      var isDeepStrictEqual;
      function lazyLoadComparison() {
        var comparison = require_comparisons();
        isDeepEqual = comparison.isDeepEqual;
        isDeepStrictEqual = comparison.isDeepStrictEqual;
      }
      var warned = false;
      var assert = module.exports = ok;
      var NO_EXCEPTION_SENTINEL = {};
      function innerFail(obj) {
        if (obj.message instanceof Error) throw obj.message;
        throw new AssertionError(obj);
      }
      function fail(actual, expected, message, operator, stackStartFn) {
        var argsLen = arguments.length;
        var internalMessage;
        if (argsLen === 0) {
          internalMessage = "Failed";
        } else if (argsLen === 1) {
          message = actual;
          actual = void 0;
        } else {
          if (warned === false) {
            warned = true;
            var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
            warn("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
          }
          if (argsLen === 2) operator = "!=";
        }
        if (message instanceof Error) throw message;
        var errArgs = {
          actual,
          expected,
          operator: operator === void 0 ? "fail" : operator,
          stackStartFn: stackStartFn || fail
        };
        if (message !== void 0) {
          errArgs.message = message;
        }
        var err = new AssertionError(errArgs);
        if (internalMessage) {
          err.message = internalMessage;
          err.generatedMessage = true;
        }
        throw err;
      }
      assert.fail = fail;
      assert.AssertionError = AssertionError;
      function innerOk(fn, argLen, value, message) {
        if (!value) {
          var generatedMessage = false;
          if (argLen === 0) {
            generatedMessage = true;
            message = "No value argument passed to `assert.ok()`";
          } else if (message instanceof Error) {
            throw message;
          }
          var err = new AssertionError({
            actual: value,
            expected: true,
            message,
            operator: "==",
            stackStartFn: fn
          });
          err.generatedMessage = generatedMessage;
          throw err;
        }
      }
      function ok() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        innerOk.apply(void 0, [ok, args.length].concat(args));
      }
      assert.ok = ok;
      assert.equal = function equal(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (actual != expected) {
          innerFail({
            actual,
            expected,
            message,
            operator: "==",
            stackStartFn: equal
          });
        }
      };
      assert.notEqual = function notEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (actual == expected) {
          innerFail({
            actual,
            expected,
            message,
            operator: "!=",
            stackStartFn: notEqual
          });
        }
      };
      assert.deepEqual = function deepEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (isDeepEqual === void 0) lazyLoadComparison();
        if (!isDeepEqual(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "deepEqual",
            stackStartFn: deepEqual
          });
        }
      };
      assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (isDeepEqual === void 0) lazyLoadComparison();
        if (isDeepEqual(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "notDeepEqual",
            stackStartFn: notDeepEqual
          });
        }
      };
      assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (isDeepEqual === void 0) lazyLoadComparison();
        if (!isDeepStrictEqual(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "deepStrictEqual",
            stackStartFn: deepStrictEqual
          });
        }
      };
      assert.notDeepStrictEqual = notDeepStrictEqual;
      function notDeepStrictEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (isDeepEqual === void 0) lazyLoadComparison();
        if (isDeepStrictEqual(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "notDeepStrictEqual",
            stackStartFn: notDeepStrictEqual
          });
        }
      }
      assert.strictEqual = function strictEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (!objectIs(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "strictEqual",
            stackStartFn: strictEqual
          });
        }
      };
      assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (objectIs(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "notStrictEqual",
            stackStartFn: notStrictEqual
          });
        }
      };
      var Comparison = /* @__PURE__ */ _createClass(function Comparison2(obj, keys, actual) {
        var _this = this;
        _classCallCheck(this, Comparison2);
        keys.forEach(function(key) {
          if (key in obj) {
            if (actual !== void 0 && typeof actual[key] === "string" && isRegExp(obj[key]) && RegExpPrototypeTest(obj[key], actual[key])) {
              _this[key] = actual[key];
            } else {
              _this[key] = obj[key];
            }
          }
        });
      });
      function compareExceptionKey(actual, expected, key, message, keys, fn) {
        if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
          if (!message) {
            var a4 = new Comparison(actual, keys);
            var b5 = new Comparison(expected, keys, actual);
            var err = new AssertionError({
              actual: a4,
              expected: b5,
              operator: "deepStrictEqual",
              stackStartFn: fn
            });
            err.actual = actual;
            err.expected = expected;
            err.operator = fn.name;
            throw err;
          }
          innerFail({
            actual,
            expected,
            message,
            operator: fn.name,
            stackStartFn: fn
          });
        }
      }
      function expectedException(actual, expected, msg, fn) {
        if (typeof expected !== "function") {
          if (isRegExp(expected)) return RegExpPrototypeTest(expected, actual);
          if (arguments.length === 2) {
            throw new ERR_INVALID_ARG_TYPE("expected", ["Function", "RegExp"], expected);
          }
          if (_typeof(actual) !== "object" || actual === null) {
            var err = new AssertionError({
              actual,
              expected,
              message: msg,
              operator: "deepStrictEqual",
              stackStartFn: fn
            });
            err.operator = fn.name;
            throw err;
          }
          var keys = Object.keys(expected);
          if (expected instanceof Error) {
            keys.push("name", "message");
          } else if (keys.length === 0) {
            throw new ERR_INVALID_ARG_VALUE("error", expected, "may not be an empty object");
          }
          if (isDeepEqual === void 0) lazyLoadComparison();
          keys.forEach(function(key) {
            if (typeof actual[key] === "string" && isRegExp(expected[key]) && RegExpPrototypeTest(expected[key], actual[key])) {
              return;
            }
            compareExceptionKey(actual, expected, key, msg, keys, fn);
          });
          return true;
        }
        if (expected.prototype !== void 0 && actual instanceof expected) {
          return true;
        }
        if (Error.isPrototypeOf(expected)) {
          return false;
        }
        return expected.call({}, actual) === true;
      }
      function getActual(fn) {
        if (typeof fn !== "function") {
          throw new ERR_INVALID_ARG_TYPE("fn", "Function", fn);
        }
        try {
          fn();
        } catch (e2) {
          return e2;
        }
        return NO_EXCEPTION_SENTINEL;
      }
      function checkIsPromise(obj) {
        return isPromise(obj) || obj !== null && _typeof(obj) === "object" && typeof obj.then === "function" && typeof obj.catch === "function";
      }
      function waitForActual(promiseFn) {
        return Promise.resolve().then(function() {
          var resultPromise;
          if (typeof promiseFn === "function") {
            resultPromise = promiseFn();
            if (!checkIsPromise(resultPromise)) {
              throw new ERR_INVALID_RETURN_VALUE("instance of Promise", "promiseFn", resultPromise);
            }
          } else if (checkIsPromise(promiseFn)) {
            resultPromise = promiseFn;
          } else {
            throw new ERR_INVALID_ARG_TYPE("promiseFn", ["Function", "Promise"], promiseFn);
          }
          return Promise.resolve().then(function() {
            return resultPromise;
          }).then(function() {
            return NO_EXCEPTION_SENTINEL;
          }).catch(function(e2) {
            return e2;
          });
        });
      }
      function expectsError(stackStartFn, actual, error, message) {
        if (typeof error === "string") {
          if (arguments.length === 4) {
            throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
          }
          if (_typeof(actual) === "object" && actual !== null) {
            if (actual.message === error) {
              throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error message "'.concat(actual.message, '" is identical to the message.'));
            }
          } else if (actual === error) {
            throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error "'.concat(actual, '" is identical to the message.'));
          }
          message = error;
          error = void 0;
        } else if (error != null && _typeof(error) !== "object" && typeof error !== "function") {
          throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
        }
        if (actual === NO_EXCEPTION_SENTINEL) {
          var details = "";
          if (error && error.name) {
            details += " (".concat(error.name, ")");
          }
          details += message ? ": ".concat(message) : ".";
          var fnType = stackStartFn.name === "rejects" ? "rejection" : "exception";
          innerFail({
            actual: void 0,
            expected: error,
            operator: stackStartFn.name,
            message: "Missing expected ".concat(fnType).concat(details),
            stackStartFn
          });
        }
        if (error && !expectedException(actual, error, message, stackStartFn)) {
          throw actual;
        }
      }
      function expectsNoError(stackStartFn, actual, error, message) {
        if (actual === NO_EXCEPTION_SENTINEL) return;
        if (typeof error === "string") {
          message = error;
          error = void 0;
        }
        if (!error || expectedException(actual, error)) {
          var details = message ? ": ".concat(message) : ".";
          var fnType = stackStartFn.name === "doesNotReject" ? "rejection" : "exception";
          innerFail({
            actual,
            expected: error,
            operator: stackStartFn.name,
            message: "Got unwanted ".concat(fnType).concat(details, "\n") + 'Actual message: "'.concat(actual && actual.message, '"'),
            stackStartFn
          });
        }
        throw actual;
      }
      assert.throws = function throws(promiseFn) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
      };
      assert.rejects = function rejects(promiseFn) {
        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }
        return waitForActual(promiseFn).then(function(result) {
          return expectsError.apply(void 0, [rejects, result].concat(args));
        });
      };
      assert.doesNotThrow = function doesNotThrow(fn) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }
        expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
      };
      assert.doesNotReject = function doesNotReject(fn) {
        for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }
        return waitForActual(fn).then(function(result) {
          return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
        });
      };
      assert.ifError = function ifError(err) {
        if (err !== null && err !== void 0) {
          var message = "ifError got unwanted exception: ";
          if (_typeof(err) === "object" && typeof err.message === "string") {
            if (err.message.length === 0 && err.constructor) {
              message += err.constructor.name;
            } else {
              message += err.message;
            }
          } else {
            message += inspect(err);
          }
          var newErr = new AssertionError({
            actual: err,
            expected: null,
            operator: "ifError",
            message,
            stackStartFn: ifError
          });
          var origStack = err.stack;
          if (typeof origStack === "string") {
            var tmp2 = origStack.split("\n");
            tmp2.shift();
            var tmp1 = newErr.stack.split("\n");
            for (var i = 0; i < tmp2.length; i++) {
              var pos = tmp1.indexOf(tmp2[i]);
              if (pos !== -1) {
                tmp1 = tmp1.slice(0, pos);
                break;
              }
            }
            newErr.stack = "".concat(tmp1.join("\n"), "\n").concat(tmp2.join("\n"));
          }
          throw newErr;
        }
      };
      function internalMatch(string, regexp, message, fn, fnName) {
        if (!isRegExp(regexp)) {
          throw new ERR_INVALID_ARG_TYPE("regexp", "RegExp", regexp);
        }
        var match = fnName === "match";
        if (typeof string !== "string" || RegExpPrototypeTest(regexp, string) !== match) {
          if (message instanceof Error) {
            throw message;
          }
          var generatedMessage = !message;
          message = message || (typeof string !== "string" ? 'The "string" argument must be of type string. Received type ' + "".concat(_typeof(string), " (").concat(inspect(string), ")") : (match ? "The input did not match the regular expression " : "The input was expected to not match the regular expression ") + "".concat(inspect(regexp), ". Input:\n\n").concat(inspect(string), "\n"));
          var err = new AssertionError({
            actual: string,
            expected: regexp,
            message,
            operator: fnName,
            stackStartFn: fn
          });
          err.generatedMessage = generatedMessage;
          throw err;
        }
      }
      assert.match = function match(string, regexp, message) {
        internalMatch(string, regexp, message, match, "match");
      };
      assert.doesNotMatch = function doesNotMatch(string, regexp, message) {
        internalMatch(string, regexp, message, doesNotMatch, "doesNotMatch");
      };
      function strict() {
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }
        innerOk.apply(void 0, [strict, args.length].concat(args));
      }
      assert.strict = objectAssign(strict, assert, {
        equal: assert.strictEqual,
        deepEqual: assert.deepStrictEqual,
        notEqual: assert.notStrictEqual,
        notDeepEqual: assert.notDeepStrictEqual
      });
      assert.strict.strict = assert.strict;
    }
  });

  // node_modules/bignumber.js/bignumber.js
  var require_bignumber = __commonJS({
    "node_modules/bignumber.js/bignumber.js"(exports, module) {
      (function(globalObject) {
        "use strict";
        var BigNumber, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
        function clone(configObject) {
          var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
            prefix: "",
            groupSize: 3,
            secondaryGroupSize: 0,
            groupSeparator: ",",
            decimalSeparator: ".",
            fractionGroupSize: 0,
            fractionGroupSeparator: "\xA0",
            // non-breaking space
            suffix: ""
          }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
          function BigNumber2(v3, b5) {
            var alphabet, c5, caseChanged, e2, i, isNum, len, str, x5 = this;
            if (!(x5 instanceof BigNumber2)) return new BigNumber2(v3, b5);
            if (b5 == null) {
              if (v3 && v3._isBigNumber === true) {
                x5.s = v3.s;
                if (!v3.c || v3.e > MAX_EXP) {
                  x5.c = x5.e = null;
                } else if (v3.e < MIN_EXP) {
                  x5.c = [x5.e = 0];
                } else {
                  x5.e = v3.e;
                  x5.c = v3.c.slice();
                }
                return;
              }
              if ((isNum = typeof v3 == "number") && v3 * 0 == 0) {
                x5.s = 1 / v3 < 0 ? (v3 = -v3, -1) : 1;
                if (v3 === ~~v3) {
                  for (e2 = 0, i = v3; i >= 10; i /= 10, e2++) ;
                  if (e2 > MAX_EXP) {
                    x5.c = x5.e = null;
                  } else {
                    x5.e = e2;
                    x5.c = [v3];
                  }
                  return;
                }
                str = String(v3);
              } else {
                if (!isNumeric.test(str = String(v3))) return parseNumeric(x5, str, isNum);
                x5.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
              }
              if ((e2 = str.indexOf(".")) > -1) str = str.replace(".", "");
              if ((i = str.search(/e/i)) > 0) {
                if (e2 < 0) e2 = i;
                e2 += +str.slice(i + 1);
                str = str.substring(0, i);
              } else if (e2 < 0) {
                e2 = str.length;
              }
            } else {
              intCheck(b5, 2, ALPHABET.length, "Base");
              if (b5 == 10 && alphabetHasNormalDecimalDigits) {
                x5 = new BigNumber2(v3);
                return round(x5, DECIMAL_PLACES + x5.e + 1, ROUNDING_MODE);
              }
              str = String(v3);
              if (isNum = typeof v3 == "number") {
                if (v3 * 0 != 0) return parseNumeric(x5, str, isNum, b5);
                x5.s = 1 / v3 < 0 ? (str = str.slice(1), -1) : 1;
                if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
                  throw Error(tooManyDigits + v3);
                }
              } else {
                x5.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
              }
              alphabet = ALPHABET.slice(0, b5);
              e2 = i = 0;
              for (len = str.length; i < len; i++) {
                if (alphabet.indexOf(c5 = str.charAt(i)) < 0) {
                  if (c5 == ".") {
                    if (i > e2) {
                      e2 = len;
                      continue;
                    }
                  } else if (!caseChanged) {
                    if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                      caseChanged = true;
                      i = -1;
                      e2 = 0;
                      continue;
                    }
                  }
                  return parseNumeric(x5, String(v3), isNum, b5);
                }
              }
              isNum = false;
              str = convertBase(str, b5, 10, x5.s);
              if ((e2 = str.indexOf(".")) > -1) str = str.replace(".", "");
              else e2 = str.length;
            }
            for (i = 0; str.charCodeAt(i) === 48; i++) ;
            for (len = str.length; str.charCodeAt(--len) === 48; ) ;
            if (str = str.slice(i, ++len)) {
              len -= i;
              if (isNum && BigNumber2.DEBUG && len > 15 && (v3 > MAX_SAFE_INTEGER || v3 !== mathfloor(v3))) {
                throw Error(tooManyDigits + x5.s * v3);
              }
              if ((e2 = e2 - i - 1) > MAX_EXP) {
                x5.c = x5.e = null;
              } else if (e2 < MIN_EXP) {
                x5.c = [x5.e = 0];
              } else {
                x5.e = e2;
                x5.c = [];
                i = (e2 + 1) % LOG_BASE;
                if (e2 < 0) i += LOG_BASE;
                if (i < len) {
                  if (i) x5.c.push(+str.slice(0, i));
                  for (len -= LOG_BASE; i < len; ) {
                    x5.c.push(+str.slice(i, i += LOG_BASE));
                  }
                  i = LOG_BASE - (str = str.slice(i)).length;
                } else {
                  i -= len;
                }
                for (; i--; str += "0") ;
                x5.c.push(+str);
              }
            } else {
              x5.c = [x5.e = 0];
            }
          }
          BigNumber2.clone = clone;
          BigNumber2.ROUND_UP = 0;
          BigNumber2.ROUND_DOWN = 1;
          BigNumber2.ROUND_CEIL = 2;
          BigNumber2.ROUND_FLOOR = 3;
          BigNumber2.ROUND_HALF_UP = 4;
          BigNumber2.ROUND_HALF_DOWN = 5;
          BigNumber2.ROUND_HALF_EVEN = 6;
          BigNumber2.ROUND_HALF_CEIL = 7;
          BigNumber2.ROUND_HALF_FLOOR = 8;
          BigNumber2.EUCLID = 9;
          BigNumber2.config = BigNumber2.set = function(obj) {
            var p5, v3;
            if (obj != null) {
              if (typeof obj == "object") {
                if (obj.hasOwnProperty(p5 = "DECIMAL_PLACES")) {
                  v3 = obj[p5];
                  intCheck(v3, 0, MAX, p5);
                  DECIMAL_PLACES = v3;
                }
                if (obj.hasOwnProperty(p5 = "ROUNDING_MODE")) {
                  v3 = obj[p5];
                  intCheck(v3, 0, 8, p5);
                  ROUNDING_MODE = v3;
                }
                if (obj.hasOwnProperty(p5 = "EXPONENTIAL_AT")) {
                  v3 = obj[p5];
                  if (v3 && v3.pop) {
                    intCheck(v3[0], -MAX, 0, p5);
                    intCheck(v3[1], 0, MAX, p5);
                    TO_EXP_NEG = v3[0];
                    TO_EXP_POS = v3[1];
                  } else {
                    intCheck(v3, -MAX, MAX, p5);
                    TO_EXP_NEG = -(TO_EXP_POS = v3 < 0 ? -v3 : v3);
                  }
                }
                if (obj.hasOwnProperty(p5 = "RANGE")) {
                  v3 = obj[p5];
                  if (v3 && v3.pop) {
                    intCheck(v3[0], -MAX, -1, p5);
                    intCheck(v3[1], 1, MAX, p5);
                    MIN_EXP = v3[0];
                    MAX_EXP = v3[1];
                  } else {
                    intCheck(v3, -MAX, MAX, p5);
                    if (v3) {
                      MIN_EXP = -(MAX_EXP = v3 < 0 ? -v3 : v3);
                    } else {
                      throw Error(bignumberError + p5 + " cannot be zero: " + v3);
                    }
                  }
                }
                if (obj.hasOwnProperty(p5 = "CRYPTO")) {
                  v3 = obj[p5];
                  if (v3 === !!v3) {
                    if (v3) {
                      if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                        CRYPTO = v3;
                      } else {
                        CRYPTO = !v3;
                        throw Error(bignumberError + "crypto unavailable");
                      }
                    } else {
                      CRYPTO = v3;
                    }
                  } else {
                    throw Error(bignumberError + p5 + " not true or false: " + v3);
                  }
                }
                if (obj.hasOwnProperty(p5 = "MODULO_MODE")) {
                  v3 = obj[p5];
                  intCheck(v3, 0, 9, p5);
                  MODULO_MODE = v3;
                }
                if (obj.hasOwnProperty(p5 = "POW_PRECISION")) {
                  v3 = obj[p5];
                  intCheck(v3, 0, MAX, p5);
                  POW_PRECISION = v3;
                }
                if (obj.hasOwnProperty(p5 = "FORMAT")) {
                  v3 = obj[p5];
                  if (typeof v3 == "object") FORMAT = v3;
                  else throw Error(bignumberError + p5 + " not an object: " + v3);
                }
                if (obj.hasOwnProperty(p5 = "ALPHABET")) {
                  v3 = obj[p5];
                  if (typeof v3 == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v3)) {
                    alphabetHasNormalDecimalDigits = v3.slice(0, 10) == "0123456789";
                    ALPHABET = v3;
                  } else {
                    throw Error(bignumberError + p5 + " invalid: " + v3);
                  }
                }
              } else {
                throw Error(bignumberError + "Object expected: " + obj);
              }
            }
            return {
              DECIMAL_PLACES,
              ROUNDING_MODE,
              EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
              RANGE: [MIN_EXP, MAX_EXP],
              CRYPTO,
              MODULO_MODE,
              POW_PRECISION,
              FORMAT,
              ALPHABET
            };
          };
          BigNumber2.isBigNumber = function(v3) {
            if (!v3 || v3._isBigNumber !== true) return false;
            if (!BigNumber2.DEBUG) return true;
            var i, n2, c5 = v3.c, e2 = v3.e, s3 = v3.s;
            out: if ({}.toString.call(c5) == "[object Array]") {
              if ((s3 === 1 || s3 === -1) && e2 >= -MAX && e2 <= MAX && e2 === mathfloor(e2)) {
                if (c5[0] === 0) {
                  if (e2 === 0 && c5.length === 1) return true;
                  break out;
                }
                i = (e2 + 1) % LOG_BASE;
                if (i < 1) i += LOG_BASE;
                if (String(c5[0]).length == i) {
                  for (i = 0; i < c5.length; i++) {
                    n2 = c5[i];
                    if (n2 < 0 || n2 >= BASE || n2 !== mathfloor(n2)) break out;
                  }
                  if (n2 !== 0) return true;
                }
              }
            } else if (c5 === null && e2 === null && (s3 === null || s3 === 1 || s3 === -1)) {
              return true;
            }
            throw Error(bignumberError + "Invalid BigNumber: " + v3);
          };
          BigNumber2.maximum = BigNumber2.max = function() {
            return maxOrMin(arguments, -1);
          };
          BigNumber2.minimum = BigNumber2.min = function() {
            return maxOrMin(arguments, 1);
          };
          BigNumber2.random = (function() {
            var pow2_53 = 9007199254740992;
            var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
              return mathfloor(Math.random() * pow2_53);
            } : function() {
              return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
            };
            return function(dp) {
              var a4, b5, e2, k4, v3, i = 0, c5 = [], rand = new BigNumber2(ONE);
              if (dp == null) dp = DECIMAL_PLACES;
              else intCheck(dp, 0, MAX);
              k4 = mathceil(dp / LOG_BASE);
              if (CRYPTO) {
                if (crypto.getRandomValues) {
                  a4 = crypto.getRandomValues(new Uint32Array(k4 *= 2));
                  for (; i < k4; ) {
                    v3 = a4[i] * 131072 + (a4[i + 1] >>> 11);
                    if (v3 >= 9e15) {
                      b5 = crypto.getRandomValues(new Uint32Array(2));
                      a4[i] = b5[0];
                      a4[i + 1] = b5[1];
                    } else {
                      c5.push(v3 % 1e14);
                      i += 2;
                    }
                  }
                  i = k4 / 2;
                } else if (crypto.randomBytes) {
                  a4 = crypto.randomBytes(k4 *= 7);
                  for (; i < k4; ) {
                    v3 = (a4[i] & 31) * 281474976710656 + a4[i + 1] * 1099511627776 + a4[i + 2] * 4294967296 + a4[i + 3] * 16777216 + (a4[i + 4] << 16) + (a4[i + 5] << 8) + a4[i + 6];
                    if (v3 >= 9e15) {
                      crypto.randomBytes(7).copy(a4, i);
                    } else {
                      c5.push(v3 % 1e14);
                      i += 7;
                    }
                  }
                  i = k4 / 7;
                } else {
                  CRYPTO = false;
                  throw Error(bignumberError + "crypto unavailable");
                }
              }
              if (!CRYPTO) {
                for (; i < k4; ) {
                  v3 = random53bitInt();
                  if (v3 < 9e15) c5[i++] = v3 % 1e14;
                }
              }
              k4 = c5[--i];
              dp %= LOG_BASE;
              if (k4 && dp) {
                v3 = POWS_TEN[LOG_BASE - dp];
                c5[i] = mathfloor(k4 / v3) * v3;
              }
              for (; c5[i] === 0; c5.pop(), i--) ;
              if (i < 0) {
                c5 = [e2 = 0];
              } else {
                for (e2 = -1; c5[0] === 0; c5.splice(0, 1), e2 -= LOG_BASE) ;
                for (i = 1, v3 = c5[0]; v3 >= 10; v3 /= 10, i++) ;
                if (i < LOG_BASE) e2 -= LOG_BASE - i;
              }
              rand.e = e2;
              rand.c = c5;
              return rand;
            };
          })();
          BigNumber2.sum = function() {
            var i = 1, args = arguments, sum = new BigNumber2(args[0]);
            for (; i < args.length; ) sum = sum.plus(args[i++]);
            return sum;
          };
          convertBase = /* @__PURE__ */ (function() {
            var decimal = "0123456789";
            function toBaseOut(str, baseIn, baseOut, alphabet) {
              var j2, arr = [0], arrL, i = 0, len = str.length;
              for (; i < len; ) {
                for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) ;
                arr[0] += alphabet.indexOf(str.charAt(i++));
                for (j2 = 0; j2 < arr.length; j2++) {
                  if (arr[j2] > baseOut - 1) {
                    if (arr[j2 + 1] == null) arr[j2 + 1] = 0;
                    arr[j2 + 1] += arr[j2] / baseOut | 0;
                    arr[j2] %= baseOut;
                  }
                }
              }
              return arr.reverse();
            }
            return function(str, baseIn, baseOut, sign, callerIsToString) {
              var alphabet, d6, e2, k4, r2, x5, xc, y7, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
              if (i >= 0) {
                k4 = POW_PRECISION;
                POW_PRECISION = 0;
                str = str.replace(".", "");
                y7 = new BigNumber2(baseIn);
                x5 = y7.pow(str.length - i);
                POW_PRECISION = k4;
                y7.c = toBaseOut(
                  toFixedPoint(coeffToString(x5.c), x5.e, "0"),
                  10,
                  baseOut,
                  decimal
                );
                y7.e = y7.c.length;
              }
              xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
              e2 = k4 = xc.length;
              for (; xc[--k4] == 0; xc.pop()) ;
              if (!xc[0]) return alphabet.charAt(0);
              if (i < 0) {
                --e2;
              } else {
                x5.c = xc;
                x5.e = e2;
                x5.s = sign;
                x5 = div(x5, y7, dp, rm, baseOut);
                xc = x5.c;
                r2 = x5.r;
                e2 = x5.e;
              }
              d6 = e2 + dp + 1;
              i = xc[d6];
              k4 = baseOut / 2;
              r2 = r2 || d6 < 0 || xc[d6 + 1] != null;
              r2 = rm < 4 ? (i != null || r2) && (rm == 0 || rm == (x5.s < 0 ? 3 : 2)) : i > k4 || i == k4 && (rm == 4 || r2 || rm == 6 && xc[d6 - 1] & 1 || rm == (x5.s < 0 ? 8 : 7));
              if (d6 < 1 || !xc[0]) {
                str = r2 ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
              } else {
                xc.length = d6;
                if (r2) {
                  for (--baseOut; ++xc[--d6] > baseOut; ) {
                    xc[d6] = 0;
                    if (!d6) {
                      ++e2;
                      xc = [1].concat(xc);
                    }
                  }
                }
                for (k4 = xc.length; !xc[--k4]; ) ;
                for (i = 0, str = ""; i <= k4; str += alphabet.charAt(xc[i++])) ;
                str = toFixedPoint(str, e2, alphabet.charAt(0));
              }
              return str;
            };
          })();
          div = /* @__PURE__ */ (function() {
            function multiply(x5, k4, base) {
              var m4, temp, xlo, xhi, carry = 0, i = x5.length, klo = k4 % SQRT_BASE, khi = k4 / SQRT_BASE | 0;
              for (x5 = x5.slice(); i--; ) {
                xlo = x5[i] % SQRT_BASE;
                xhi = x5[i] / SQRT_BASE | 0;
                m4 = khi * xlo + xhi * klo;
                temp = klo * xlo + m4 % SQRT_BASE * SQRT_BASE + carry;
                carry = (temp / base | 0) + (m4 / SQRT_BASE | 0) + khi * xhi;
                x5[i] = temp % base;
              }
              if (carry) x5 = [carry].concat(x5);
              return x5;
            }
            function compare2(a4, b5, aL, bL) {
              var i, cmp;
              if (aL != bL) {
                cmp = aL > bL ? 1 : -1;
              } else {
                for (i = cmp = 0; i < aL; i++) {
                  if (a4[i] != b5[i]) {
                    cmp = a4[i] > b5[i] ? 1 : -1;
                    break;
                  }
                }
              }
              return cmp;
            }
            function subtract(a4, b5, aL, base) {
              var i = 0;
              for (; aL--; ) {
                a4[aL] -= i;
                i = a4[aL] < b5[aL] ? 1 : 0;
                a4[aL] = i * base + a4[aL] - b5[aL];
              }
              for (; !a4[0] && a4.length > 1; a4.splice(0, 1)) ;
            }
            return function(x5, y7, dp, rm, base) {
              var cmp, e2, i, more, n2, prod, prodL, q3, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s3 = x5.s == y7.s ? 1 : -1, xc = x5.c, yc = y7.c;
              if (!xc || !xc[0] || !yc || !yc[0]) {
                return new BigNumber2(
                  // Return NaN if either NaN, or both Infinity or 0.
                  !x5.s || !y7.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
                    // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                    xc && xc[0] == 0 || !yc ? s3 * 0 : s3 / 0
                  )
                );
              }
              q3 = new BigNumber2(s3);
              qc = q3.c = [];
              e2 = x5.e - y7.e;
              s3 = dp + e2 + 1;
              if (!base) {
                base = BASE;
                e2 = bitFloor(x5.e / LOG_BASE) - bitFloor(y7.e / LOG_BASE);
                s3 = s3 / LOG_BASE | 0;
              }
              for (i = 0; yc[i] == (xc[i] || 0); i++) ;
              if (yc[i] > (xc[i] || 0)) e2--;
              if (s3 < 0) {
                qc.push(1);
                more = true;
              } else {
                xL = xc.length;
                yL = yc.length;
                i = 0;
                s3 += 2;
                n2 = mathfloor(base / (yc[0] + 1));
                if (n2 > 1) {
                  yc = multiply(yc, n2, base);
                  xc = multiply(xc, n2, base);
                  yL = yc.length;
                  xL = xc.length;
                }
                xi = yL;
                rem = xc.slice(0, yL);
                remL = rem.length;
                for (; remL < yL; rem[remL++] = 0) ;
                yz = yc.slice();
                yz = [0].concat(yz);
                yc0 = yc[0];
                if (yc[1] >= base / 2) yc0++;
                do {
                  n2 = 0;
                  cmp = compare2(yc, rem, yL, remL);
                  if (cmp < 0) {
                    rem0 = rem[0];
                    if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
                    n2 = mathfloor(rem0 / yc0);
                    if (n2 > 1) {
                      if (n2 >= base) n2 = base - 1;
                      prod = multiply(yc, n2, base);
                      prodL = prod.length;
                      remL = rem.length;
                      while (compare2(prod, rem, prodL, remL) == 1) {
                        n2--;
                        subtract(prod, yL < prodL ? yz : yc, prodL, base);
                        prodL = prod.length;
                        cmp = 1;
                      }
                    } else {
                      if (n2 == 0) {
                        cmp = n2 = 1;
                      }
                      prod = yc.slice();
                      prodL = prod.length;
                    }
                    if (prodL < remL) prod = [0].concat(prod);
                    subtract(rem, prod, remL, base);
                    remL = rem.length;
                    if (cmp == -1) {
                      while (compare2(yc, rem, yL, remL) < 1) {
                        n2++;
                        subtract(rem, yL < remL ? yz : yc, remL, base);
                        remL = rem.length;
                      }
                    }
                  } else if (cmp === 0) {
                    n2++;
                    rem = [0];
                  }
                  qc[i++] = n2;
                  if (rem[0]) {
                    rem[remL++] = xc[xi] || 0;
                  } else {
                    rem = [xc[xi]];
                    remL = 1;
                  }
                } while ((xi++ < xL || rem[0] != null) && s3--);
                more = rem[0] != null;
                if (!qc[0]) qc.splice(0, 1);
              }
              if (base == BASE) {
                for (i = 1, s3 = qc[0]; s3 >= 10; s3 /= 10, i++) ;
                round(q3, dp + (q3.e = i + e2 * LOG_BASE - 1) + 1, rm, more);
              } else {
                q3.e = e2;
                q3.r = +more;
              }
              return q3;
            };
          })();
          function format(n2, i, rm, id) {
            var c0, e2, ne, len, str;
            if (rm == null) rm = ROUNDING_MODE;
            else intCheck(rm, 0, 8);
            if (!n2.c) return n2.toString();
            c0 = n2.c[0];
            ne = n2.e;
            if (i == null) {
              str = coeffToString(n2.c);
              str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
            } else {
              n2 = round(new BigNumber2(n2), i, rm);
              e2 = n2.e;
              str = coeffToString(n2.c);
              len = str.length;
              if (id == 1 || id == 2 && (i <= e2 || e2 <= TO_EXP_NEG)) {
                for (; len < i; str += "0", len++) ;
                str = toExponential(str, e2);
              } else {
                i -= ne + (id === 2 && e2 > ne);
                str = toFixedPoint(str, e2, "0");
                if (e2 + 1 > len) {
                  if (--i > 0) for (str += "."; i--; str += "0") ;
                } else {
                  i += e2 - len;
                  if (i > 0) {
                    if (e2 + 1 == len) str += ".";
                    for (; i--; str += "0") ;
                  }
                }
              }
            }
            return n2.s < 0 && c0 ? "-" + str : str;
          }
          function maxOrMin(args, n2) {
            var k4, y7, i = 1, x5 = new BigNumber2(args[0]);
            for (; i < args.length; i++) {
              y7 = new BigNumber2(args[i]);
              if (!y7.s || (k4 = compare(x5, y7)) === n2 || k4 === 0 && x5.s === n2) {
                x5 = y7;
              }
            }
            return x5;
          }
          function normalise(n2, c5, e2) {
            var i = 1, j2 = c5.length;
            for (; !c5[--j2]; c5.pop()) ;
            for (j2 = c5[0]; j2 >= 10; j2 /= 10, i++) ;
            if ((e2 = i + e2 * LOG_BASE - 1) > MAX_EXP) {
              n2.c = n2.e = null;
            } else if (e2 < MIN_EXP) {
              n2.c = [n2.e = 0];
            } else {
              n2.e = e2;
              n2.c = c5;
            }
            return n2;
          }
          parseNumeric = /* @__PURE__ */ (function() {
            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
            return function(x5, str, isNum, b5) {
              var base, s3 = isNum ? str : str.replace(whitespaceOrPlus, "");
              if (isInfinityOrNaN.test(s3)) {
                x5.s = isNaN(s3) ? null : s3 < 0 ? -1 : 1;
              } else {
                if (!isNum) {
                  s3 = s3.replace(basePrefix, function(m4, p1, p22) {
                    base = (p22 = p22.toLowerCase()) == "x" ? 16 : p22 == "b" ? 2 : 8;
                    return !b5 || b5 == base ? p1 : m4;
                  });
                  if (b5) {
                    base = b5;
                    s3 = s3.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
                  }
                  if (str != s3) return new BigNumber2(s3, base);
                }
                if (BigNumber2.DEBUG) {
                  throw Error(bignumberError + "Not a" + (b5 ? " base " + b5 : "") + " number: " + str);
                }
                x5.s = null;
              }
              x5.c = x5.e = null;
            };
          })();
          function round(x5, sd, rm, r2) {
            var d6, i, j2, k4, n2, ni, rd, xc = x5.c, pows10 = POWS_TEN;
            if (xc) {
              out: {
                for (d6 = 1, k4 = xc[0]; k4 >= 10; k4 /= 10, d6++) ;
                i = sd - d6;
                if (i < 0) {
                  i += LOG_BASE;
                  j2 = sd;
                  n2 = xc[ni = 0];
                  rd = mathfloor(n2 / pows10[d6 - j2 - 1] % 10);
                } else {
                  ni = mathceil((i + 1) / LOG_BASE);
                  if (ni >= xc.length) {
                    if (r2) {
                      for (; xc.length <= ni; xc.push(0)) ;
                      n2 = rd = 0;
                      d6 = 1;
                      i %= LOG_BASE;
                      j2 = i - LOG_BASE + 1;
                    } else {
                      break out;
                    }
                  } else {
                    n2 = k4 = xc[ni];
                    for (d6 = 1; k4 >= 10; k4 /= 10, d6++) ;
                    i %= LOG_BASE;
                    j2 = i - LOG_BASE + d6;
                    rd = j2 < 0 ? 0 : mathfloor(n2 / pows10[d6 - j2 - 1] % 10);
                  }
                }
                r2 = r2 || sd < 0 || // Are there any non-zero digits after the rounding digit?
                // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
                // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
                xc[ni + 1] != null || (j2 < 0 ? n2 : n2 % pows10[d6 - j2 - 1]);
                r2 = rm < 4 ? (rd || r2) && (rm == 0 || rm == (x5.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r2 || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
                (i > 0 ? j2 > 0 ? n2 / pows10[d6 - j2] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x5.s < 0 ? 8 : 7));
                if (sd < 1 || !xc[0]) {
                  xc.length = 0;
                  if (r2) {
                    sd -= x5.e + 1;
                    xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                    x5.e = -sd || 0;
                  } else {
                    xc[0] = x5.e = 0;
                  }
                  return x5;
                }
                if (i == 0) {
                  xc.length = ni;
                  k4 = 1;
                  ni--;
                } else {
                  xc.length = ni + 1;
                  k4 = pows10[LOG_BASE - i];
                  xc[ni] = j2 > 0 ? mathfloor(n2 / pows10[d6 - j2] % pows10[j2]) * k4 : 0;
                }
                if (r2) {
                  for (; ; ) {
                    if (ni == 0) {
                      for (i = 1, j2 = xc[0]; j2 >= 10; j2 /= 10, i++) ;
                      j2 = xc[0] += k4;
                      for (k4 = 1; j2 >= 10; j2 /= 10, k4++) ;
                      if (i != k4) {
                        x5.e++;
                        if (xc[0] == BASE) xc[0] = 1;
                      }
                      break;
                    } else {
                      xc[ni] += k4;
                      if (xc[ni] != BASE) break;
                      xc[ni--] = 0;
                      k4 = 1;
                    }
                  }
                }
                for (i = xc.length; xc[--i] === 0; xc.pop()) ;
              }
              if (x5.e > MAX_EXP) {
                x5.c = x5.e = null;
              } else if (x5.e < MIN_EXP) {
                x5.c = [x5.e = 0];
              }
            }
            return x5;
          }
          function valueOf(n2) {
            var str, e2 = n2.e;
            if (e2 === null) return n2.toString();
            str = coeffToString(n2.c);
            str = e2 <= TO_EXP_NEG || e2 >= TO_EXP_POS ? toExponential(str, e2) : toFixedPoint(str, e2, "0");
            return n2.s < 0 ? "-" + str : str;
          }
          P.absoluteValue = P.abs = function() {
            var x5 = new BigNumber2(this);
            if (x5.s < 0) x5.s = 1;
            return x5;
          };
          P.comparedTo = function(y7, b5) {
            return compare(this, new BigNumber2(y7, b5));
          };
          P.decimalPlaces = P.dp = function(dp, rm) {
            var c5, n2, v3, x5 = this;
            if (dp != null) {
              intCheck(dp, 0, MAX);
              if (rm == null) rm = ROUNDING_MODE;
              else intCheck(rm, 0, 8);
              return round(new BigNumber2(x5), dp + x5.e + 1, rm);
            }
            if (!(c5 = x5.c)) return null;
            n2 = ((v3 = c5.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
            if (v3 = c5[v3]) for (; v3 % 10 == 0; v3 /= 10, n2--) ;
            if (n2 < 0) n2 = 0;
            return n2;
          };
          P.dividedBy = P.div = function(y7, b5) {
            return div(this, new BigNumber2(y7, b5), DECIMAL_PLACES, ROUNDING_MODE);
          };
          P.dividedToIntegerBy = P.idiv = function(y7, b5) {
            return div(this, new BigNumber2(y7, b5), 0, 1);
          };
          P.exponentiatedBy = P.pow = function(n2, m4) {
            var half, isModExp, i, k4, more, nIsBig, nIsNeg, nIsOdd, y7, x5 = this;
            n2 = new BigNumber2(n2);
            if (n2.c && !n2.isInteger()) {
              throw Error(bignumberError + "Exponent not an integer: " + valueOf(n2));
            }
            if (m4 != null) m4 = new BigNumber2(m4);
            nIsBig = n2.e > 14;
            if (!x5.c || !x5.c[0] || x5.c[0] == 1 && !x5.e && x5.c.length == 1 || !n2.c || !n2.c[0]) {
              y7 = new BigNumber2(Math.pow(+valueOf(x5), nIsBig ? n2.s * (2 - isOdd(n2)) : +valueOf(n2)));
              return m4 ? y7.mod(m4) : y7;
            }
            nIsNeg = n2.s < 0;
            if (m4) {
              if (m4.c ? !m4.c[0] : !m4.s) return new BigNumber2(NaN);
              isModExp = !nIsNeg && x5.isInteger() && m4.isInteger();
              if (isModExp) x5 = x5.mod(m4);
            } else if (n2.e > 9 && (x5.e > 0 || x5.e < -1 || (x5.e == 0 ? x5.c[0] > 1 || nIsBig && x5.c[1] >= 24e7 : x5.c[0] < 8e13 || nIsBig && x5.c[0] <= 9999975e7))) {
              k4 = x5.s < 0 && isOdd(n2) ? -0 : 0;
              if (x5.e > -1) k4 = 1 / k4;
              return new BigNumber2(nIsNeg ? 1 / k4 : k4);
            } else if (POW_PRECISION) {
              k4 = mathceil(POW_PRECISION / LOG_BASE + 2);
            }
            if (nIsBig) {
              half = new BigNumber2(0.5);
              if (nIsNeg) n2.s = 1;
              nIsOdd = isOdd(n2);
            } else {
              i = Math.abs(+valueOf(n2));
              nIsOdd = i % 2;
            }
            y7 = new BigNumber2(ONE);
            for (; ; ) {
              if (nIsOdd) {
                y7 = y7.times(x5);
                if (!y7.c) break;
                if (k4) {
                  if (y7.c.length > k4) y7.c.length = k4;
                } else if (isModExp) {
                  y7 = y7.mod(m4);
                }
              }
              if (i) {
                i = mathfloor(i / 2);
                if (i === 0) break;
                nIsOdd = i % 2;
              } else {
                n2 = n2.times(half);
                round(n2, n2.e + 1, 1);
                if (n2.e > 14) {
                  nIsOdd = isOdd(n2);
                } else {
                  i = +valueOf(n2);
                  if (i === 0) break;
                  nIsOdd = i % 2;
                }
              }
              x5 = x5.times(x5);
              if (k4) {
                if (x5.c && x5.c.length > k4) x5.c.length = k4;
              } else if (isModExp) {
                x5 = x5.mod(m4);
              }
            }
            if (isModExp) return y7;
            if (nIsNeg) y7 = ONE.div(y7);
            return m4 ? y7.mod(m4) : k4 ? round(y7, POW_PRECISION, ROUNDING_MODE, more) : y7;
          };
          P.integerValue = function(rm) {
            var n2 = new BigNumber2(this);
            if (rm == null) rm = ROUNDING_MODE;
            else intCheck(rm, 0, 8);
            return round(n2, n2.e + 1, rm);
          };
          P.isEqualTo = P.eq = function(y7, b5) {
            return compare(this, new BigNumber2(y7, b5)) === 0;
          };
          P.isFinite = function() {
            return !!this.c;
          };
          P.isGreaterThan = P.gt = function(y7, b5) {
            return compare(this, new BigNumber2(y7, b5)) > 0;
          };
          P.isGreaterThanOrEqualTo = P.gte = function(y7, b5) {
            return (b5 = compare(this, new BigNumber2(y7, b5))) === 1 || b5 === 0;
          };
          P.isInteger = function() {
            return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
          };
          P.isLessThan = P.lt = function(y7, b5) {
            return compare(this, new BigNumber2(y7, b5)) < 0;
          };
          P.isLessThanOrEqualTo = P.lte = function(y7, b5) {
            return (b5 = compare(this, new BigNumber2(y7, b5))) === -1 || b5 === 0;
          };
          P.isNaN = function() {
            return !this.s;
          };
          P.isNegative = function() {
            return this.s < 0;
          };
          P.isPositive = function() {
            return this.s > 0;
          };
          P.isZero = function() {
            return !!this.c && this.c[0] == 0;
          };
          P.minus = function(y7, b5) {
            var i, j2, t3, xLTy, x5 = this, a4 = x5.s;
            y7 = new BigNumber2(y7, b5);
            b5 = y7.s;
            if (!a4 || !b5) return new BigNumber2(NaN);
            if (a4 != b5) {
              y7.s = -b5;
              return x5.plus(y7);
            }
            var xe = x5.e / LOG_BASE, ye = y7.e / LOG_BASE, xc = x5.c, yc = y7.c;
            if (!xe || !ye) {
              if (!xc || !yc) return xc ? (y7.s = -b5, y7) : new BigNumber2(yc ? x5 : NaN);
              if (!xc[0] || !yc[0]) {
                return yc[0] ? (y7.s = -b5, y7) : new BigNumber2(xc[0] ? x5 : (
                  // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                  ROUNDING_MODE == 3 ? -0 : 0
                ));
              }
            }
            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();
            if (a4 = xe - ye) {
              if (xLTy = a4 < 0) {
                a4 = -a4;
                t3 = xc;
              } else {
                ye = xe;
                t3 = yc;
              }
              t3.reverse();
              for (b5 = a4; b5--; t3.push(0)) ;
              t3.reverse();
            } else {
              j2 = (xLTy = (a4 = xc.length) < (b5 = yc.length)) ? a4 : b5;
              for (a4 = b5 = 0; b5 < j2; b5++) {
                if (xc[b5] != yc[b5]) {
                  xLTy = xc[b5] < yc[b5];
                  break;
                }
              }
            }
            if (xLTy) {
              t3 = xc;
              xc = yc;
              yc = t3;
              y7.s = -y7.s;
            }
            b5 = (j2 = yc.length) - (i = xc.length);
            if (b5 > 0) for (; b5--; xc[i++] = 0) ;
            b5 = BASE - 1;
            for (; j2 > a4; ) {
              if (xc[--j2] < yc[j2]) {
                for (i = j2; i && !xc[--i]; xc[i] = b5) ;
                --xc[i];
                xc[j2] += BASE;
              }
              xc[j2] -= yc[j2];
            }
            for (; xc[0] == 0; xc.splice(0, 1), --ye) ;
            if (!xc[0]) {
              y7.s = ROUNDING_MODE == 3 ? -1 : 1;
              y7.c = [y7.e = 0];
              return y7;
            }
            return normalise(y7, xc, ye);
          };
          P.modulo = P.mod = function(y7, b5) {
            var q3, s3, x5 = this;
            y7 = new BigNumber2(y7, b5);
            if (!x5.c || !y7.s || y7.c && !y7.c[0]) {
              return new BigNumber2(NaN);
            } else if (!y7.c || x5.c && !x5.c[0]) {
              return new BigNumber2(x5);
            }
            if (MODULO_MODE == 9) {
              s3 = y7.s;
              y7.s = 1;
              q3 = div(x5, y7, 0, 3);
              y7.s = s3;
              q3.s *= s3;
            } else {
              q3 = div(x5, y7, 0, MODULO_MODE);
            }
            y7 = x5.minus(q3.times(y7));
            if (!y7.c[0] && MODULO_MODE == 1) y7.s = x5.s;
            return y7;
          };
          P.multipliedBy = P.times = function(y7, b5) {
            var c5, e2, i, j2, k4, m4, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x5 = this, xc = x5.c, yc = (y7 = new BigNumber2(y7, b5)).c;
            if (!xc || !yc || !xc[0] || !yc[0]) {
              if (!x5.s || !y7.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
                y7.c = y7.e = y7.s = null;
              } else {
                y7.s *= x5.s;
                if (!xc || !yc) {
                  y7.c = y7.e = null;
                } else {
                  y7.c = [0];
                  y7.e = 0;
                }
              }
              return y7;
            }
            e2 = bitFloor(x5.e / LOG_BASE) + bitFloor(y7.e / LOG_BASE);
            y7.s *= x5.s;
            xcL = xc.length;
            ycL = yc.length;
            if (xcL < ycL) {
              zc = xc;
              xc = yc;
              yc = zc;
              i = xcL;
              xcL = ycL;
              ycL = i;
            }
            for (i = xcL + ycL, zc = []; i--; zc.push(0)) ;
            base = BASE;
            sqrtBase = SQRT_BASE;
            for (i = ycL; --i >= 0; ) {
              c5 = 0;
              ylo = yc[i] % sqrtBase;
              yhi = yc[i] / sqrtBase | 0;
              for (k4 = xcL, j2 = i + k4; j2 > i; ) {
                xlo = xc[--k4] % sqrtBase;
                xhi = xc[k4] / sqrtBase | 0;
                m4 = yhi * xlo + xhi * ylo;
                xlo = ylo * xlo + m4 % sqrtBase * sqrtBase + zc[j2] + c5;
                c5 = (xlo / base | 0) + (m4 / sqrtBase | 0) + yhi * xhi;
                zc[j2--] = xlo % base;
              }
              zc[j2] = c5;
            }
            if (c5) {
              ++e2;
            } else {
              zc.splice(0, 1);
            }
            return normalise(y7, zc, e2);
          };
          P.negated = function() {
            var x5 = new BigNumber2(this);
            x5.s = -x5.s || null;
            return x5;
          };
          P.plus = function(y7, b5) {
            var t3, x5 = this, a4 = x5.s;
            y7 = new BigNumber2(y7, b5);
            b5 = y7.s;
            if (!a4 || !b5) return new BigNumber2(NaN);
            if (a4 != b5) {
              y7.s = -b5;
              return x5.minus(y7);
            }
            var xe = x5.e / LOG_BASE, ye = y7.e / LOG_BASE, xc = x5.c, yc = y7.c;
            if (!xe || !ye) {
              if (!xc || !yc) return new BigNumber2(a4 / 0);
              if (!xc[0] || !yc[0]) return yc[0] ? y7 : new BigNumber2(xc[0] ? x5 : a4 * 0);
            }
            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();
            if (a4 = xe - ye) {
              if (a4 > 0) {
                ye = xe;
                t3 = yc;
              } else {
                a4 = -a4;
                t3 = xc;
              }
              t3.reverse();
              for (; a4--; t3.push(0)) ;
              t3.reverse();
            }
            a4 = xc.length;
            b5 = yc.length;
            if (a4 - b5 < 0) {
              t3 = yc;
              yc = xc;
              xc = t3;
              b5 = a4;
            }
            for (a4 = 0; b5; ) {
              a4 = (xc[--b5] = xc[b5] + yc[b5] + a4) / BASE | 0;
              xc[b5] = BASE === xc[b5] ? 0 : xc[b5] % BASE;
            }
            if (a4) {
              xc = [a4].concat(xc);
              ++ye;
            }
            return normalise(y7, xc, ye);
          };
          P.precision = P.sd = function(sd, rm) {
            var c5, n2, v3, x5 = this;
            if (sd != null && sd !== !!sd) {
              intCheck(sd, 1, MAX);
              if (rm == null) rm = ROUNDING_MODE;
              else intCheck(rm, 0, 8);
              return round(new BigNumber2(x5), sd, rm);
            }
            if (!(c5 = x5.c)) return null;
            v3 = c5.length - 1;
            n2 = v3 * LOG_BASE + 1;
            if (v3 = c5[v3]) {
              for (; v3 % 10 == 0; v3 /= 10, n2--) ;
              for (v3 = c5[0]; v3 >= 10; v3 /= 10, n2++) ;
            }
            if (sd && x5.e + 1 > n2) n2 = x5.e + 1;
            return n2;
          };
          P.shiftedBy = function(k4) {
            intCheck(k4, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
            return this.times("1e" + k4);
          };
          P.squareRoot = P.sqrt = function() {
            var m4, n2, r2, rep, t3, x5 = this, c5 = x5.c, s3 = x5.s, e2 = x5.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
            if (s3 !== 1 || !c5 || !c5[0]) {
              return new BigNumber2(!s3 || s3 < 0 && (!c5 || c5[0]) ? NaN : c5 ? x5 : 1 / 0);
            }
            s3 = Math.sqrt(+valueOf(x5));
            if (s3 == 0 || s3 == 1 / 0) {
              n2 = coeffToString(c5);
              if ((n2.length + e2) % 2 == 0) n2 += "0";
              s3 = Math.sqrt(+n2);
              e2 = bitFloor((e2 + 1) / 2) - (e2 < 0 || e2 % 2);
              if (s3 == 1 / 0) {
                n2 = "5e" + e2;
              } else {
                n2 = s3.toExponential();
                n2 = n2.slice(0, n2.indexOf("e") + 1) + e2;
              }
              r2 = new BigNumber2(n2);
            } else {
              r2 = new BigNumber2(s3 + "");
            }
            if (r2.c[0]) {
              e2 = r2.e;
              s3 = e2 + dp;
              if (s3 < 3) s3 = 0;
              for (; ; ) {
                t3 = r2;
                r2 = half.times(t3.plus(div(x5, t3, dp, 1)));
                if (coeffToString(t3.c).slice(0, s3) === (n2 = coeffToString(r2.c)).slice(0, s3)) {
                  if (r2.e < e2) --s3;
                  n2 = n2.slice(s3 - 3, s3 + 1);
                  if (n2 == "9999" || !rep && n2 == "4999") {
                    if (!rep) {
                      round(t3, t3.e + DECIMAL_PLACES + 2, 0);
                      if (t3.times(t3).eq(x5)) {
                        r2 = t3;
                        break;
                      }
                    }
                    dp += 4;
                    s3 += 4;
                    rep = 1;
                  } else {
                    if (!+n2 || !+n2.slice(1) && n2.charAt(0) == "5") {
                      round(r2, r2.e + DECIMAL_PLACES + 2, 1);
                      m4 = !r2.times(r2).eq(x5);
                    }
                    break;
                  }
                }
              }
            }
            return round(r2, r2.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m4);
          };
          P.toExponential = function(dp, rm) {
            if (dp != null) {
              intCheck(dp, 0, MAX);
              dp++;
            }
            return format(this, dp, rm, 1);
          };
          P.toFixed = function(dp, rm) {
            if (dp != null) {
              intCheck(dp, 0, MAX);
              dp = dp + this.e + 1;
            }
            return format(this, dp, rm);
          };
          P.toFormat = function(dp, rm, format2) {
            var str, x5 = this;
            if (format2 == null) {
              if (dp != null && rm && typeof rm == "object") {
                format2 = rm;
                rm = null;
              } else if (dp && typeof dp == "object") {
                format2 = dp;
                dp = rm = null;
              } else {
                format2 = FORMAT;
              }
            } else if (typeof format2 != "object") {
              throw Error(bignumberError + "Argument not an object: " + format2);
            }
            str = x5.toFixed(dp, rm);
            if (x5.c) {
              var i, arr = str.split("."), g1 = +format2.groupSize, g22 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x5.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
              if (g22) {
                i = g1;
                g1 = g22;
                g22 = i;
                len -= i;
              }
              if (g1 > 0 && len > 0) {
                i = len % g1 || g1;
                intPart = intDigits.substr(0, i);
                for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
                if (g22 > 0) intPart += groupSeparator + intDigits.slice(i);
                if (isNeg) intPart = "-" + intPart;
              }
              str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g22 = +format2.fractionGroupSize) ? fractionPart.replace(
                new RegExp("\\d{" + g22 + "}\\B", "g"),
                "$&" + (format2.fractionGroupSeparator || "")
              ) : fractionPart) : intPart;
            }
            return (format2.prefix || "") + str + (format2.suffix || "");
          };
          P.toFraction = function(md) {
            var d6, d0, d1, d22, e2, exp, n2, n0, n1, q3, r2, s3, x5 = this, xc = x5.c;
            if (md != null) {
              n2 = new BigNumber2(md);
              if (!n2.isInteger() && (n2.c || n2.s !== 1) || n2.lt(ONE)) {
                throw Error(bignumberError + "Argument " + (n2.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n2));
              }
            }
            if (!xc) return new BigNumber2(x5);
            d6 = new BigNumber2(ONE);
            n1 = d0 = new BigNumber2(ONE);
            d1 = n0 = new BigNumber2(ONE);
            s3 = coeffToString(xc);
            e2 = d6.e = s3.length - x5.e - 1;
            d6.c[0] = POWS_TEN[(exp = e2 % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
            md = !md || n2.comparedTo(d6) > 0 ? e2 > 0 ? d6 : n1 : n2;
            exp = MAX_EXP;
            MAX_EXP = 1 / 0;
            n2 = new BigNumber2(s3);
            n0.c[0] = 0;
            for (; ; ) {
              q3 = div(n2, d6, 0, 1);
              d22 = d0.plus(q3.times(d1));
              if (d22.comparedTo(md) == 1) break;
              d0 = d1;
              d1 = d22;
              n1 = n0.plus(q3.times(d22 = n1));
              n0 = d22;
              d6 = n2.minus(q3.times(d22 = d6));
              n2 = d22;
            }
            d22 = div(md.minus(d0), d1, 0, 1);
            n0 = n0.plus(d22.times(n1));
            d0 = d0.plus(d22.times(d1));
            n0.s = n1.s = x5.s;
            e2 = e2 * 2;
            r2 = div(n1, d1, e2, ROUNDING_MODE).minus(x5).abs().comparedTo(
              div(n0, d0, e2, ROUNDING_MODE).minus(x5).abs()
            ) < 1 ? [n1, d1] : [n0, d0];
            MAX_EXP = exp;
            return r2;
          };
          P.toNumber = function() {
            return +valueOf(this);
          };
          P.toPrecision = function(sd, rm) {
            if (sd != null) intCheck(sd, 1, MAX);
            return format(this, sd, rm, 2);
          };
          P.toString = function(b5) {
            var str, n2 = this, s3 = n2.s, e2 = n2.e;
            if (e2 === null) {
              if (s3) {
                str = "Infinity";
                if (s3 < 0) str = "-" + str;
              } else {
                str = "NaN";
              }
            } else {
              if (b5 == null) {
                str = e2 <= TO_EXP_NEG || e2 >= TO_EXP_POS ? toExponential(coeffToString(n2.c), e2) : toFixedPoint(coeffToString(n2.c), e2, "0");
              } else if (b5 === 10 && alphabetHasNormalDecimalDigits) {
                n2 = round(new BigNumber2(n2), DECIMAL_PLACES + e2 + 1, ROUNDING_MODE);
                str = toFixedPoint(coeffToString(n2.c), n2.e, "0");
              } else {
                intCheck(b5, 2, ALPHABET.length, "Base");
                str = convertBase(toFixedPoint(coeffToString(n2.c), e2, "0"), 10, b5, s3, true);
              }
              if (s3 < 0 && n2.c[0]) str = "-" + str;
            }
            return str;
          };
          P.valueOf = P.toJSON = function() {
            return valueOf(this);
          };
          P._isBigNumber = true;
          if (configObject != null) BigNumber2.set(configObject);
          return BigNumber2;
        }
        function bitFloor(n2) {
          var i = n2 | 0;
          return n2 > 0 || n2 === i ? i : i - 1;
        }
        function coeffToString(a4) {
          var s3, z2, i = 1, j2 = a4.length, r2 = a4[0] + "";
          for (; i < j2; ) {
            s3 = a4[i++] + "";
            z2 = LOG_BASE - s3.length;
            for (; z2--; s3 = "0" + s3) ;
            r2 += s3;
          }
          for (j2 = r2.length; r2.charCodeAt(--j2) === 48; ) ;
          return r2.slice(0, j2 + 1 || 1);
        }
        function compare(x5, y7) {
          var a4, b5, xc = x5.c, yc = y7.c, i = x5.s, j2 = y7.s, k4 = x5.e, l6 = y7.e;
          if (!i || !j2) return null;
          a4 = xc && !xc[0];
          b5 = yc && !yc[0];
          if (a4 || b5) return a4 ? b5 ? 0 : -j2 : i;
          if (i != j2) return i;
          a4 = i < 0;
          b5 = k4 == l6;
          if (!xc || !yc) return b5 ? 0 : !xc ^ a4 ? 1 : -1;
          if (!b5) return k4 > l6 ^ a4 ? 1 : -1;
          j2 = (k4 = xc.length) < (l6 = yc.length) ? k4 : l6;
          for (i = 0; i < j2; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a4 ? 1 : -1;
          return k4 == l6 ? 0 : k4 > l6 ^ a4 ? 1 : -1;
        }
        function intCheck(n2, min, max, name) {
          if (n2 < min || n2 > max || n2 !== mathfloor(n2)) {
            throw Error(bignumberError + (name || "Argument") + (typeof n2 == "number" ? n2 < min || n2 > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n2));
          }
        }
        function isOdd(n2) {
          var k4 = n2.c.length - 1;
          return bitFloor(n2.e / LOG_BASE) == k4 && n2.c[k4] % 2 != 0;
        }
        function toExponential(str, e2) {
          return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e2 < 0 ? "e" : "e+") + e2;
        }
        function toFixedPoint(str, e2, z2) {
          var len, zs;
          if (e2 < 0) {
            for (zs = z2 + "."; ++e2; zs += z2) ;
            str = zs + str;
          } else {
            len = str.length;
            if (++e2 > len) {
              for (zs = z2, e2 -= len; --e2; zs += z2) ;
              str += zs;
            } else if (e2 < len) {
              str = str.slice(0, e2) + "." + str.slice(e2);
            }
          }
          return str;
        }
        BigNumber = clone();
        BigNumber["default"] = BigNumber.BigNumber = BigNumber;
        if (typeof define == "function" && define.amd) {
          define(function() {
            return BigNumber;
          });
        } else if (typeof module != "undefined" && module.exports) {
          module.exports = BigNumber;
        } else {
          if (!globalObject) {
            globalObject = typeof self != "undefined" && self ? self : window;
          }
          globalObject.BigNumber = BigNumber;
        }
      })(exports);
    }
  });

  // node_modules/jsbi/dist/jsbi-umd.js
  var require_jsbi_umd = __commonJS({
    "node_modules/jsbi/dist/jsbi-umd.js"(exports, module) {
      (function(i, _3) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = _3() : "function" == typeof define && define.amd ? define(_3) : (i = i || self, i.JSBI = _3());
      })(exports, function() {
        "use strict";
        var i = Math.imul, _3 = Math.clz32, t3 = Math.abs, e2 = Math.max, g5 = Math.floor;
        class o5 extends Array {
          constructor(i2, _4) {
            if (super(i2), this.sign = _4, i2 > o5.__kMaxLength) throw new RangeError("Maximum BigInt size exceeded");
          }
          static BigInt(i2) {
            var _4 = Number.isFinite;
            if ("number" == typeof i2) {
              if (0 === i2) return o5.__zero();
              if (o5.__isOneDigitInt(i2)) return 0 > i2 ? o5.__oneDigit(-i2, true) : o5.__oneDigit(i2, false);
              if (!_4(i2) || g5(i2) !== i2) throw new RangeError("The number " + i2 + " cannot be converted to BigInt because it is not an integer");
              return o5.__fromDouble(i2);
            }
            if ("string" == typeof i2) {
              const _5 = o5.__fromString(i2);
              if (null === _5) throw new SyntaxError("Cannot convert " + i2 + " to a BigInt");
              return _5;
            }
            if ("boolean" == typeof i2) return true === i2 ? o5.__oneDigit(1, false) : o5.__zero();
            if ("object" == typeof i2) {
              if (i2.constructor === o5) return i2;
              const _5 = o5.__toPrimitive(i2);
              return o5.BigInt(_5);
            }
            throw new TypeError("Cannot convert " + i2 + " to a BigInt");
          }
          toDebugString() {
            const i2 = ["BigInt["];
            for (const _4 of this) i2.push((_4 ? (_4 >>> 0).toString(16) : _4) + ", ");
            return i2.push("]"), i2.join("");
          }
          toString(i2 = 10) {
            if (2 > i2 || 36 < i2) throw new RangeError("toString() radix argument must be between 2 and 36");
            return 0 === this.length ? "0" : 0 == (i2 & i2 - 1) ? o5.__toStringBasePowerOfTwo(this, i2) : o5.__toStringGeneric(this, i2, false);
          }
          static toNumber(i2) {
            const _4 = i2.length;
            if (0 === _4) return 0;
            if (1 === _4) {
              const _5 = i2.__unsignedDigit(0);
              return i2.sign ? -_5 : _5;
            }
            const t4 = i2.__digit(_4 - 1), e3 = o5.__clz30(t4), n2 = 30 * _4 - e3;
            if (1024 < n2) return i2.sign ? -Infinity : 1 / 0;
            let g6 = n2 - 1, s3 = t4, l6 = _4 - 1;
            const r2 = e3 + 3;
            let a4 = 32 === r2 ? 0 : s3 << r2;
            a4 >>>= 12;
            const u3 = r2 - 12;
            let d6 = 12 <= r2 ? 0 : s3 << 20 + r2, h4 = 20 + r2;
            for (0 < u3 && 0 < l6 && (l6--, s3 = i2.__digit(l6), a4 |= s3 >>> 30 - u3, d6 = s3 << u3 + 2, h4 = u3 + 2); 0 < h4 && 0 < l6; ) l6--, s3 = i2.__digit(l6), d6 |= 30 <= h4 ? s3 << h4 - 30 : s3 >>> 30 - h4, h4 -= 30;
            const m4 = o5.__decideRounding(i2, h4, l6, s3);
            if ((1 === m4 || 0 === m4 && 1 == (1 & d6)) && (d6 = d6 + 1 >>> 0, 0 === d6 && (a4++, 0 != a4 >>> 20 && (a4 = 0, g6++, 1023 < g6)))) return i2.sign ? -Infinity : 1 / 0;
            const b5 = i2.sign ? -2147483648 : 0;
            return g6 = g6 + 1023 << 20, o5.__kBitConversionInts[1] = b5 | g6 | a4, o5.__kBitConversionInts[0] = d6, o5.__kBitConversionDouble[0];
          }
          static unaryMinus(i2) {
            if (0 === i2.length) return i2;
            const _4 = i2.__copy();
            return _4.sign = !i2.sign, _4;
          }
          static bitwiseNot(i2) {
            return i2.sign ? o5.__absoluteSubOne(i2).__trim() : o5.__absoluteAddOne(i2, true);
          }
          static exponentiate(i2, _4) {
            if (_4.sign) throw new RangeError("Exponent must be positive");
            if (0 === _4.length) return o5.__oneDigit(1, false);
            if (0 === i2.length) return i2;
            if (1 === i2.length && 1 === i2.__digit(0)) return i2.sign && 0 == (1 & _4.__digit(0)) ? o5.unaryMinus(i2) : i2;
            if (1 < _4.length) throw new RangeError("BigInt too big");
            let t4 = _4.__unsignedDigit(0);
            if (1 === t4) return i2;
            if (t4 >= o5.__kMaxLengthBits) throw new RangeError("BigInt too big");
            if (1 === i2.length && 2 === i2.__digit(0)) {
              const _5 = 1 + (0 | t4 / 30), e4 = i2.sign && 0 != (1 & t4), n3 = new o5(_5, e4);
              n3.__initializeDigits();
              const g6 = 1 << t4 % 30;
              return n3.__setDigit(_5 - 1, g6), n3;
            }
            let e3 = null, n2 = i2;
            for (0 != (1 & t4) && (e3 = i2), t4 >>= 1; 0 !== t4; t4 >>= 1) n2 = o5.multiply(n2, n2), 0 != (1 & t4) && (null === e3 ? e3 = n2 : e3 = o5.multiply(e3, n2));
            return e3;
          }
          static multiply(_4, t4) {
            if (0 === _4.length) return _4;
            if (0 === t4.length) return t4;
            let i2 = _4.length + t4.length;
            30 <= _4.__clzmsd() + t4.__clzmsd() && i2--;
            const e3 = new o5(i2, _4.sign !== t4.sign);
            e3.__initializeDigits();
            for (let n2 = 0; n2 < _4.length; n2++) o5.__multiplyAccumulate(t4, _4.__digit(n2), e3, n2);
            return e3.__trim();
          }
          static divide(i2, _4) {
            if (0 === _4.length) throw new RangeError("Division by zero");
            if (0 > o5.__absoluteCompare(i2, _4)) return o5.__zero();
            const t4 = i2.sign !== _4.sign, e3 = _4.__unsignedDigit(0);
            let n2;
            if (1 === _4.length && 32767 >= e3) {
              if (1 === e3) return t4 === i2.sign ? i2 : o5.unaryMinus(i2);
              n2 = o5.__absoluteDivSmall(i2, e3, null);
            } else n2 = o5.__absoluteDivLarge(i2, _4, true, false);
            return n2.sign = t4, n2.__trim();
          }
          static remainder(i2, _4) {
            if (0 === _4.length) throw new RangeError("Division by zero");
            if (0 > o5.__absoluteCompare(i2, _4)) return i2;
            const t4 = _4.__unsignedDigit(0);
            if (1 === _4.length && 32767 >= t4) {
              if (1 === t4) return o5.__zero();
              const _5 = o5.__absoluteModSmall(i2, t4);
              return 0 === _5 ? o5.__zero() : o5.__oneDigit(_5, i2.sign);
            }
            const e3 = o5.__absoluteDivLarge(i2, _4, false, true);
            return e3.sign = i2.sign, e3.__trim();
          }
          static add(i2, _4) {
            const t4 = i2.sign;
            return t4 === _4.sign ? o5.__absoluteAdd(i2, _4, t4) : 0 <= o5.__absoluteCompare(i2, _4) ? o5.__absoluteSub(i2, _4, t4) : o5.__absoluteSub(_4, i2, !t4);
          }
          static subtract(i2, _4) {
            const t4 = i2.sign;
            return t4 === _4.sign ? 0 <= o5.__absoluteCompare(i2, _4) ? o5.__absoluteSub(i2, _4, t4) : o5.__absoluteSub(_4, i2, !t4) : o5.__absoluteAdd(i2, _4, t4);
          }
          static leftShift(i2, _4) {
            return 0 === _4.length || 0 === i2.length ? i2 : _4.sign ? o5.__rightShiftByAbsolute(i2, _4) : o5.__leftShiftByAbsolute(i2, _4);
          }
          static signedRightShift(i2, _4) {
            return 0 === _4.length || 0 === i2.length ? i2 : _4.sign ? o5.__leftShiftByAbsolute(i2, _4) : o5.__rightShiftByAbsolute(i2, _4);
          }
          static unsignedRightShift() {
            throw new TypeError("BigInts have no unsigned right shift; use >> instead");
          }
          static lessThan(i2, _4) {
            return 0 > o5.__compareToBigInt(i2, _4);
          }
          static lessThanOrEqual(i2, _4) {
            return 0 >= o5.__compareToBigInt(i2, _4);
          }
          static greaterThan(i2, _4) {
            return 0 < o5.__compareToBigInt(i2, _4);
          }
          static greaterThanOrEqual(i2, _4) {
            return 0 <= o5.__compareToBigInt(i2, _4);
          }
          static equal(_4, t4) {
            if (_4.sign !== t4.sign) return false;
            if (_4.length !== t4.length) return false;
            for (let e3 = 0; e3 < _4.length; e3++) if (_4.__digit(e3) !== t4.__digit(e3)) return false;
            return true;
          }
          static notEqual(i2, _4) {
            return !o5.equal(i2, _4);
          }
          static bitwiseAnd(i2, _4) {
            if (!i2.sign && !_4.sign) return o5.__absoluteAnd(i2, _4).__trim();
            if (i2.sign && _4.sign) {
              const t4 = e2(i2.length, _4.length) + 1;
              let n2 = o5.__absoluteSubOne(i2, t4);
              const g6 = o5.__absoluteSubOne(_4);
              return n2 = o5.__absoluteOr(n2, g6, n2), o5.__absoluteAddOne(n2, true, n2).__trim();
            }
            return i2.sign && ([i2, _4] = [_4, i2]), o5.__absoluteAndNot(i2, o5.__absoluteSubOne(_4)).__trim();
          }
          static bitwiseXor(i2, _4) {
            if (!i2.sign && !_4.sign) return o5.__absoluteXor(i2, _4).__trim();
            if (i2.sign && _4.sign) {
              const t5 = e2(i2.length, _4.length), n3 = o5.__absoluteSubOne(i2, t5), g6 = o5.__absoluteSubOne(_4);
              return o5.__absoluteXor(n3, g6, n3).__trim();
            }
            const t4 = e2(i2.length, _4.length) + 1;
            i2.sign && ([i2, _4] = [_4, i2]);
            let n2 = o5.__absoluteSubOne(_4, t4);
            return n2 = o5.__absoluteXor(n2, i2, n2), o5.__absoluteAddOne(n2, true, n2).__trim();
          }
          static bitwiseOr(i2, _4) {
            const t4 = e2(i2.length, _4.length);
            if (!i2.sign && !_4.sign) return o5.__absoluteOr(i2, _4).__trim();
            if (i2.sign && _4.sign) {
              let e3 = o5.__absoluteSubOne(i2, t4);
              const n3 = o5.__absoluteSubOne(_4);
              return e3 = o5.__absoluteAnd(e3, n3, e3), o5.__absoluteAddOne(e3, true, e3).__trim();
            }
            i2.sign && ([i2, _4] = [_4, i2]);
            let n2 = o5.__absoluteSubOne(_4, t4);
            return n2 = o5.__absoluteAndNot(n2, i2, n2), o5.__absoluteAddOne(n2, true, n2).__trim();
          }
          static asIntN(_4, t4) {
            if (0 === t4.length) return t4;
            if (_4 = g5(_4), 0 > _4) throw new RangeError("Invalid value: not (convertible to) a safe integer");
            if (0 === _4) return o5.__zero();
            if (_4 >= o5.__kMaxLengthBits) return t4;
            const e3 = 0 | (_4 + 29) / 30;
            if (t4.length < e3) return t4;
            const s3 = t4.__unsignedDigit(e3 - 1), l6 = 1 << (_4 - 1) % 30;
            if (t4.length === e3 && s3 < l6) return t4;
            if (!((s3 & l6) === l6)) return o5.__truncateToNBits(_4, t4);
            if (!t4.sign) return o5.__truncateAndSubFromPowerOfTwo(_4, t4, true);
            if (0 == (s3 & l6 - 1)) {
              for (let n2 = e3 - 2; 0 <= n2; n2--) if (0 !== t4.__digit(n2)) return o5.__truncateAndSubFromPowerOfTwo(_4, t4, false);
              return t4.length === e3 && s3 === l6 ? t4 : o5.__truncateToNBits(_4, t4);
            }
            return o5.__truncateAndSubFromPowerOfTwo(_4, t4, false);
          }
          static asUintN(i2, _4) {
            if (0 === _4.length) return _4;
            if (i2 = g5(i2), 0 > i2) throw new RangeError("Invalid value: not (convertible to) a safe integer");
            if (0 === i2) return o5.__zero();
            if (_4.sign) {
              if (i2 > o5.__kMaxLengthBits) throw new RangeError("BigInt too big");
              return o5.__truncateAndSubFromPowerOfTwo(i2, _4, false);
            }
            if (i2 >= o5.__kMaxLengthBits) return _4;
            const t4 = 0 | (i2 + 29) / 30;
            if (_4.length < t4) return _4;
            const e3 = i2 % 30;
            if (_4.length == t4) {
              if (0 === e3) return _4;
              const i3 = _4.__digit(t4 - 1);
              if (0 == i3 >>> e3) return _4;
            }
            return o5.__truncateToNBits(i2, _4);
          }
          static ADD(i2, _4) {
            if (i2 = o5.__toPrimitive(i2), _4 = o5.__toPrimitive(_4), "string" == typeof i2) return "string" != typeof _4 && (_4 = _4.toString()), i2 + _4;
            if ("string" == typeof _4) return i2.toString() + _4;
            if (i2 = o5.__toNumeric(i2), _4 = o5.__toNumeric(_4), o5.__isBigInt(i2) && o5.__isBigInt(_4)) return o5.add(i2, _4);
            if ("number" == typeof i2 && "number" == typeof _4) return i2 + _4;
            throw new TypeError("Cannot mix BigInt and other types, use explicit conversions");
          }
          static LT(i2, _4) {
            return o5.__compare(i2, _4, 0);
          }
          static LE(i2, _4) {
            return o5.__compare(i2, _4, 1);
          }
          static GT(i2, _4) {
            return o5.__compare(i2, _4, 2);
          }
          static GE(i2, _4) {
            return o5.__compare(i2, _4, 3);
          }
          static EQ(i2, _4) {
            for (; ; ) {
              if (o5.__isBigInt(i2)) return o5.__isBigInt(_4) ? o5.equal(i2, _4) : o5.EQ(_4, i2);
              if ("number" == typeof i2) {
                if (o5.__isBigInt(_4)) return o5.__equalToNumber(_4, i2);
                if ("object" != typeof _4) return i2 == _4;
                _4 = o5.__toPrimitive(_4);
              } else if ("string" == typeof i2) {
                if (o5.__isBigInt(_4)) return i2 = o5.__fromString(i2), null !== i2 && o5.equal(i2, _4);
                if ("object" != typeof _4) return i2 == _4;
                _4 = o5.__toPrimitive(_4);
              } else if ("boolean" == typeof i2) {
                if (o5.__isBigInt(_4)) return o5.__equalToNumber(_4, +i2);
                if ("object" != typeof _4) return i2 == _4;
                _4 = o5.__toPrimitive(_4);
              } else if ("symbol" == typeof i2) {
                if (o5.__isBigInt(_4)) return false;
                if ("object" != typeof _4) return i2 == _4;
                _4 = o5.__toPrimitive(_4);
              } else if ("object" == typeof i2) {
                if ("object" == typeof _4 && _4.constructor !== o5) return i2 == _4;
                i2 = o5.__toPrimitive(i2);
              } else return i2 == _4;
            }
          }
          static NE(i2, _4) {
            return !o5.EQ(i2, _4);
          }
          static __zero() {
            return new o5(0, false);
          }
          static __oneDigit(i2, _4) {
            const t4 = new o5(1, _4);
            return t4.__setDigit(0, i2), t4;
          }
          __copy() {
            const _4 = new o5(this.length, this.sign);
            for (let t4 = 0; t4 < this.length; t4++) _4[t4] = this[t4];
            return _4;
          }
          __trim() {
            let i2 = this.length, _4 = this[i2 - 1];
            for (; 0 === _4; ) i2--, _4 = this[i2 - 1], this.pop();
            return 0 === i2 && (this.sign = false), this;
          }
          __initializeDigits() {
            for (let _4 = 0; _4 < this.length; _4++) this[_4] = 0;
          }
          static __decideRounding(i2, _4, t4, e3) {
            if (0 < _4) return -1;
            let n2;
            if (0 > _4) n2 = -_4 - 1;
            else {
              if (0 === t4) return -1;
              t4--, e3 = i2.__digit(t4), n2 = 29;
            }
            let g6 = 1 << n2;
            if (0 == (e3 & g6)) return -1;
            if (g6 -= 1, 0 != (e3 & g6)) return 1;
            for (; 0 < t4; ) if (t4--, 0 !== i2.__digit(t4)) return 1;
            return 0;
          }
          static __fromDouble(i2) {
            o5.__kBitConversionDouble[0] = i2;
            const _4 = 2047 & o5.__kBitConversionInts[1] >>> 20, t4 = _4 - 1023, e3 = (0 | t4 / 30) + 1, n2 = new o5(e3, 0 > i2);
            let g6 = 1048575 & o5.__kBitConversionInts[1] | 1048576, s3 = o5.__kBitConversionInts[0];
            const l6 = 20, r2 = t4 % 30;
            let a4, u3 = 0;
            if (20 > r2) {
              const i3 = l6 - r2;
              u3 = i3 + 32, a4 = g6 >>> i3, g6 = g6 << 32 - i3 | s3 >>> i3, s3 <<= 32 - i3;
            } else if (20 === r2) u3 = 32, a4 = g6, g6 = s3, s3 = 0;
            else {
              const i3 = r2 - l6;
              u3 = 32 - i3, a4 = g6 << i3 | s3 >>> 32 - i3, g6 = s3 << i3, s3 = 0;
            }
            n2.__setDigit(e3 - 1, a4);
            for (let _5 = e3 - 2; 0 <= _5; _5--) 0 < u3 ? (u3 -= 30, a4 = g6 >>> 2, g6 = g6 << 30 | s3 >>> 2, s3 <<= 30) : a4 = 0, n2.__setDigit(_5, a4);
            return n2.__trim();
          }
          static __isWhitespace(i2) {
            return !!(13 >= i2 && 9 <= i2) || (159 >= i2 ? 32 == i2 : 131071 >= i2 ? 160 == i2 || 5760 == i2 : 196607 >= i2 ? (i2 &= 131071, 10 >= i2 || 40 == i2 || 41 == i2 || 47 == i2 || 95 == i2 || 4096 == i2) : 65279 == i2);
          }
          static __fromString(i2, _4 = 0) {
            let t4 = 0;
            const e3 = i2.length;
            let n2 = 0;
            if (n2 === e3) return o5.__zero();
            let g6 = i2.charCodeAt(n2);
            for (; o5.__isWhitespace(g6); ) {
              if (++n2 === e3) return o5.__zero();
              g6 = i2.charCodeAt(n2);
            }
            if (43 === g6) {
              if (++n2 === e3) return null;
              g6 = i2.charCodeAt(n2), t4 = 1;
            } else if (45 === g6) {
              if (++n2 === e3) return null;
              g6 = i2.charCodeAt(n2), t4 = -1;
            }
            if (0 === _4) {
              if (_4 = 10, 48 === g6) {
                if (++n2 === e3) return o5.__zero();
                if (g6 = i2.charCodeAt(n2), 88 === g6 || 120 === g6) {
                  if (_4 = 16, ++n2 === e3) return null;
                  g6 = i2.charCodeAt(n2);
                } else if (79 === g6 || 111 === g6) {
                  if (_4 = 8, ++n2 === e3) return null;
                  g6 = i2.charCodeAt(n2);
                } else if (66 === g6 || 98 === g6) {
                  if (_4 = 2, ++n2 === e3) return null;
                  g6 = i2.charCodeAt(n2);
                }
              }
            } else if (16 === _4 && 48 === g6) {
              if (++n2 === e3) return o5.__zero();
              if (g6 = i2.charCodeAt(n2), 88 === g6 || 120 === g6) {
                if (++n2 === e3) return null;
                g6 = i2.charCodeAt(n2);
              }
            }
            if (0 != t4 && 10 !== _4) return null;
            for (; 48 === g6; ) {
              if (++n2 === e3) return o5.__zero();
              g6 = i2.charCodeAt(n2);
            }
            const s3 = e3 - n2;
            let l6 = o5.__kMaxBitsPerChar[_4], r2 = o5.__kBitsPerCharTableMultiplier - 1;
            if (s3 > 1073741824 / l6) return null;
            const a4 = l6 * s3 + r2 >>> o5.__kBitsPerCharTableShift, u3 = new o5(0 | (a4 + 29) / 30, false), h4 = 10 > _4 ? _4 : 10, b5 = 10 < _4 ? _4 - 10 : 0;
            if (0 == (_4 & _4 - 1)) {
              l6 >>= o5.__kBitsPerCharTableShift;
              const _5 = [], t5 = [];
              let s4 = false;
              do {
                let o6 = 0, r3 = 0;
                for (; ; ) {
                  let _6;
                  if (g6 - 48 >>> 0 < h4) _6 = g6 - 48;
                  else if ((32 | g6) - 97 >>> 0 < b5) _6 = (32 | g6) - 87;
                  else {
                    s4 = true;
                    break;
                  }
                  if (r3 += l6, o6 = o6 << l6 | _6, ++n2 === e3) {
                    s4 = true;
                    break;
                  }
                  if (g6 = i2.charCodeAt(n2), 30 < r3 + l6) break;
                }
                _5.push(o6), t5.push(r3);
              } while (!s4);
              o5.__fillFromParts(u3, _5, t5);
            } else {
              u3.__initializeDigits();
              let t5 = false, s4 = 0;
              do {
                let a5 = 0, D = 1;
                for (; ; ) {
                  let o6;
                  if (g6 - 48 >>> 0 < h4) o6 = g6 - 48;
                  else if ((32 | g6) - 97 >>> 0 < b5) o6 = (32 | g6) - 87;
                  else {
                    t5 = true;
                    break;
                  }
                  const l7 = D * _4;
                  if (1073741823 < l7) break;
                  if (D = l7, a5 = a5 * _4 + o6, s4++, ++n2 === e3) {
                    t5 = true;
                    break;
                  }
                  g6 = i2.charCodeAt(n2);
                }
                r2 = 30 * o5.__kBitsPerCharTableMultiplier - 1;
                const c5 = 0 | (l6 * s4 + r2 >>> o5.__kBitsPerCharTableShift) / 30;
                u3.__inplaceMultiplyAdd(D, a5, c5);
              } while (!t5);
            }
            if (n2 !== e3) {
              if (!o5.__isWhitespace(g6)) return null;
              for (n2++; n2 < e3; n2++) if (g6 = i2.charCodeAt(n2), !o5.__isWhitespace(g6)) return null;
            }
            return u3.sign = -1 == t4, u3.__trim();
          }
          static __fillFromParts(_4, t4, e3) {
            let n2 = 0, g6 = 0, o6 = 0;
            for (let s3 = t4.length - 1; 0 <= s3; s3--) {
              const i2 = t4[s3], l6 = e3[s3];
              g6 |= i2 << o6, o6 += l6, 30 === o6 ? (_4.__setDigit(n2++, g6), o6 = 0, g6 = 0) : 30 < o6 && (_4.__setDigit(n2++, 1073741823 & g6), o6 -= 30, g6 = i2 >>> l6 - o6);
            }
            if (0 !== g6) {
              if (n2 >= _4.length) throw new Error("implementation bug");
              _4.__setDigit(n2++, g6);
            }
            for (; n2 < _4.length; n2++) _4.__setDigit(n2, 0);
          }
          static __toStringBasePowerOfTwo(_4, i2) {
            const t4 = _4.length;
            let e3 = i2 - 1;
            e3 = (85 & e3 >>> 1) + (85 & e3), e3 = (51 & e3 >>> 2) + (51 & e3), e3 = (15 & e3 >>> 4) + (15 & e3);
            const n2 = e3, g6 = i2 - 1, s3 = _4.__digit(t4 - 1), l6 = o5.__clz30(s3);
            let r2 = 0 | (30 * t4 - l6 + n2 - 1) / n2;
            if (_4.sign && r2++, 268435456 < r2) throw new Error("string too long");
            const a4 = Array(r2);
            let u3 = r2 - 1, d6 = 0, h4 = 0;
            for (let e4 = 0; e4 < t4 - 1; e4++) {
              const i3 = _4.__digit(e4), t5 = (d6 | i3 << h4) & g6;
              a4[u3--] = o5.__kConversionChars[t5];
              const s4 = n2 - h4;
              for (d6 = i3 >>> s4, h4 = 30 - s4; h4 >= n2; ) a4[u3--] = o5.__kConversionChars[d6 & g6], d6 >>>= n2, h4 -= n2;
            }
            const m4 = (d6 | s3 << h4) & g6;
            for (a4[u3--] = o5.__kConversionChars[m4], d6 = s3 >>> n2 - h4; 0 !== d6; ) a4[u3--] = o5.__kConversionChars[d6 & g6], d6 >>>= n2;
            if (_4.sign && (a4[u3--] = "-"), -1 != u3) throw new Error("implementation bug");
            return a4.join("");
          }
          static __toStringGeneric(_4, i2, t4) {
            const e3 = _4.length;
            if (0 === e3) return "";
            if (1 === e3) {
              let e4 = _4.__unsignedDigit(0).toString(i2);
              return false === t4 && _4.sign && (e4 = "-" + e4), e4;
            }
            const n2 = 30 * e3 - o5.__clz30(_4.__digit(e3 - 1)), g6 = o5.__kMaxBitsPerChar[i2], s3 = g6 - 1;
            let l6 = n2 * o5.__kBitsPerCharTableMultiplier;
            l6 += s3 - 1, l6 = 0 | l6 / s3;
            const r2 = l6 + 1 >> 1, a4 = o5.exponentiate(o5.__oneDigit(i2, false), o5.__oneDigit(r2, false));
            let u3, d6;
            const h4 = a4.__unsignedDigit(0);
            if (1 === a4.length && 32767 >= h4) {
              u3 = new o5(_4.length, false), u3.__initializeDigits();
              let t5 = 0;
              for (let e4 = 2 * _4.length - 1; 0 <= e4; e4--) {
                const i3 = t5 << 15 | _4.__halfDigit(e4);
                u3.__setHalfDigit(e4, 0 | i3 / h4), t5 = 0 | i3 % h4;
              }
              d6 = t5.toString(i2);
            } else {
              const t5 = o5.__absoluteDivLarge(_4, a4, true, true);
              u3 = t5.quotient;
              const e4 = t5.remainder.__trim();
              d6 = o5.__toStringGeneric(e4, i2, true);
            }
            u3.__trim();
            let m4 = o5.__toStringGeneric(u3, i2, true);
            for (; d6.length < r2; ) d6 = "0" + d6;
            return false === t4 && _4.sign && (m4 = "-" + m4), m4 + d6;
          }
          static __unequalSign(i2) {
            return i2 ? -1 : 1;
          }
          static __absoluteGreater(i2) {
            return i2 ? -1 : 1;
          }
          static __absoluteLess(i2) {
            return i2 ? 1 : -1;
          }
          static __compareToBigInt(i2, _4) {
            const t4 = i2.sign;
            if (t4 !== _4.sign) return o5.__unequalSign(t4);
            const e3 = o5.__absoluteCompare(i2, _4);
            return 0 < e3 ? o5.__absoluteGreater(t4) : 0 > e3 ? o5.__absoluteLess(t4) : 0;
          }
          static __compareToNumber(i2, _4) {
            if (o5.__isOneDigitInt(_4)) {
              const e3 = i2.sign, n2 = 0 > _4;
              if (e3 !== n2) return o5.__unequalSign(e3);
              if (0 === i2.length) {
                if (n2) throw new Error("implementation bug");
                return 0 === _4 ? 0 : -1;
              }
              if (1 < i2.length) return o5.__absoluteGreater(e3);
              const g6 = t3(_4), s3 = i2.__unsignedDigit(0);
              return s3 > g6 ? o5.__absoluteGreater(e3) : s3 < g6 ? o5.__absoluteLess(e3) : 0;
            }
            return o5.__compareToDouble(i2, _4);
          }
          static __compareToDouble(i2, _4) {
            if (_4 !== _4) return _4;
            if (_4 === 1 / 0) return -1;
            if (_4 === -Infinity) return 1;
            const t4 = i2.sign;
            if (t4 !== 0 > _4) return o5.__unequalSign(t4);
            if (0 === _4) throw new Error("implementation bug: should be handled elsewhere");
            if (0 === i2.length) return -1;
            o5.__kBitConversionDouble[0] = _4;
            const e3 = 2047 & o5.__kBitConversionInts[1] >>> 20;
            if (2047 == e3) throw new Error("implementation bug: handled elsewhere");
            const n2 = e3 - 1023;
            if (0 > n2) return o5.__absoluteGreater(t4);
            const g6 = i2.length;
            let s3 = i2.__digit(g6 - 1);
            const l6 = o5.__clz30(s3), r2 = 30 * g6 - l6, a4 = n2 + 1;
            if (r2 < a4) return o5.__absoluteLess(t4);
            if (r2 > a4) return o5.__absoluteGreater(t4);
            let u3 = 1048576 | 1048575 & o5.__kBitConversionInts[1], d6 = o5.__kBitConversionInts[0];
            const h4 = 20, m4 = 29 - l6;
            if (m4 !== (0 | (r2 - 1) % 30)) throw new Error("implementation bug");
            let b5, D = 0;
            if (20 > m4) {
              const i3 = h4 - m4;
              D = i3 + 32, b5 = u3 >>> i3, u3 = u3 << 32 - i3 | d6 >>> i3, d6 <<= 32 - i3;
            } else if (20 === m4) D = 32, b5 = u3, u3 = d6, d6 = 0;
            else {
              const i3 = m4 - h4;
              D = 32 - i3, b5 = u3 << i3 | d6 >>> 32 - i3, u3 = d6 << i3, d6 = 0;
            }
            if (s3 >>>= 0, b5 >>>= 0, s3 > b5) return o5.__absoluteGreater(t4);
            if (s3 < b5) return o5.__absoluteLess(t4);
            for (let e4 = g6 - 2; 0 <= e4; e4--) {
              0 < D ? (D -= 30, b5 = u3 >>> 2, u3 = u3 << 30 | d6 >>> 2, d6 <<= 30) : b5 = 0;
              const _5 = i2.__unsignedDigit(e4);
              if (_5 > b5) return o5.__absoluteGreater(t4);
              if (_5 < b5) return o5.__absoluteLess(t4);
            }
            if (0 !== u3 || 0 !== d6) {
              if (0 === D) throw new Error("implementation bug");
              return o5.__absoluteLess(t4);
            }
            return 0;
          }
          static __equalToNumber(i2, _4) {
            return o5.__isOneDigitInt(_4) ? 0 === _4 ? 0 === i2.length : 1 === i2.length && i2.sign === 0 > _4 && i2.__unsignedDigit(0) === t3(_4) : 0 === o5.__compareToDouble(i2, _4);
          }
          static __comparisonResultToBool(i2, _4) {
            return 0 === _4 ? 0 > i2 : 1 === _4 ? 0 >= i2 : 2 === _4 ? 0 < i2 : 3 === _4 ? 0 <= i2 : void 0;
          }
          static __compare(i2, _4, t4) {
            if (i2 = o5.__toPrimitive(i2), _4 = o5.__toPrimitive(_4), "string" == typeof i2 && "string" == typeof _4) switch (t4) {
              case 0:
                return i2 < _4;
              case 1:
                return i2 <= _4;
              case 2:
                return i2 > _4;
              case 3:
                return i2 >= _4;
            }
            if (o5.__isBigInt(i2) && "string" == typeof _4) return _4 = o5.__fromString(_4), null !== _4 && o5.__comparisonResultToBool(o5.__compareToBigInt(i2, _4), t4);
            if ("string" == typeof i2 && o5.__isBigInt(_4)) return i2 = o5.__fromString(i2), null !== i2 && o5.__comparisonResultToBool(o5.__compareToBigInt(i2, _4), t4);
            if (i2 = o5.__toNumeric(i2), _4 = o5.__toNumeric(_4), o5.__isBigInt(i2)) {
              if (o5.__isBigInt(_4)) return o5.__comparisonResultToBool(o5.__compareToBigInt(i2, _4), t4);
              if ("number" != typeof _4) throw new Error("implementation bug");
              return o5.__comparisonResultToBool(o5.__compareToNumber(i2, _4), t4);
            }
            if ("number" != typeof i2) throw new Error("implementation bug");
            if (o5.__isBigInt(_4)) return o5.__comparisonResultToBool(o5.__compareToNumber(_4, i2), 2 ^ t4);
            if ("number" != typeof _4) throw new Error("implementation bug");
            return 0 === t4 ? i2 < _4 : 1 === t4 ? i2 <= _4 : 2 === t4 ? i2 > _4 : 3 === t4 ? i2 >= _4 : void 0;
          }
          __clzmsd() {
            return o5.__clz30(this.__digit(this.length - 1));
          }
          static __absoluteAdd(_4, t4, e3) {
            if (_4.length < t4.length) return o5.__absoluteAdd(t4, _4, e3);
            if (0 === _4.length) return _4;
            if (0 === t4.length) return _4.sign === e3 ? _4 : o5.unaryMinus(_4);
            let n2 = _4.length;
            (0 === _4.__clzmsd() || t4.length === _4.length && 0 === t4.__clzmsd()) && n2++;
            const g6 = new o5(n2, e3);
            let s3 = 0, l6 = 0;
            for (; l6 < t4.length; l6++) {
              const i2 = _4.__digit(l6) + t4.__digit(l6) + s3;
              s3 = i2 >>> 30, g6.__setDigit(l6, 1073741823 & i2);
            }
            for (; l6 < _4.length; l6++) {
              const i2 = _4.__digit(l6) + s3;
              s3 = i2 >>> 30, g6.__setDigit(l6, 1073741823 & i2);
            }
            return l6 < g6.length && g6.__setDigit(l6, s3), g6.__trim();
          }
          static __absoluteSub(_4, t4, e3) {
            if (0 === _4.length) return _4;
            if (0 === t4.length) return _4.sign === e3 ? _4 : o5.unaryMinus(_4);
            const n2 = new o5(_4.length, e3);
            let g6 = 0, s3 = 0;
            for (; s3 < t4.length; s3++) {
              const i2 = _4.__digit(s3) - t4.__digit(s3) - g6;
              g6 = 1 & i2 >>> 30, n2.__setDigit(s3, 1073741823 & i2);
            }
            for (; s3 < _4.length; s3++) {
              const i2 = _4.__digit(s3) - g6;
              g6 = 1 & i2 >>> 30, n2.__setDigit(s3, 1073741823 & i2);
            }
            return n2.__trim();
          }
          static __absoluteAddOne(_4, i2, t4 = null) {
            const e3 = _4.length;
            null === t4 ? t4 = new o5(e3, i2) : t4.sign = i2;
            let n2 = 1;
            for (let g6 = 0; g6 < e3; g6++) {
              const i3 = _4.__digit(g6) + n2;
              n2 = i3 >>> 30, t4.__setDigit(g6, 1073741823 & i3);
            }
            return 0 != n2 && t4.__setDigitGrow(e3, 1), t4;
          }
          static __absoluteSubOne(_4, t4) {
            const e3 = _4.length;
            t4 = t4 || e3;
            const n2 = new o5(t4, false);
            let g6 = 1;
            for (let o6 = 0; o6 < e3; o6++) {
              const i2 = _4.__digit(o6) - g6;
              g6 = 1 & i2 >>> 30, n2.__setDigit(o6, 1073741823 & i2);
            }
            if (0 != g6) throw new Error("implementation bug");
            for (let g7 = e3; g7 < t4; g7++) n2.__setDigit(g7, 0);
            return n2;
          }
          static __absoluteAnd(_4, t4, e3 = null) {
            let n2 = _4.length, g6 = t4.length, s3 = g6;
            if (n2 < g6) {
              s3 = n2;
              const i2 = _4, e4 = n2;
              _4 = t4, n2 = g6, t4 = i2, g6 = e4;
            }
            let l6 = s3;
            null === e3 ? e3 = new o5(l6, false) : l6 = e3.length;
            let r2 = 0;
            for (; r2 < s3; r2++) e3.__setDigit(r2, _4.__digit(r2) & t4.__digit(r2));
            for (; r2 < l6; r2++) e3.__setDigit(r2, 0);
            return e3;
          }
          static __absoluteAndNot(_4, t4, e3 = null) {
            const n2 = _4.length, g6 = t4.length;
            let s3 = g6;
            n2 < g6 && (s3 = n2);
            let l6 = n2;
            null === e3 ? e3 = new o5(l6, false) : l6 = e3.length;
            let r2 = 0;
            for (; r2 < s3; r2++) e3.__setDigit(r2, _4.__digit(r2) & ~t4.__digit(r2));
            for (; r2 < n2; r2++) e3.__setDigit(r2, _4.__digit(r2));
            for (; r2 < l6; r2++) e3.__setDigit(r2, 0);
            return e3;
          }
          static __absoluteOr(_4, t4, e3 = null) {
            let n2 = _4.length, g6 = t4.length, s3 = g6;
            if (n2 < g6) {
              s3 = n2;
              const i2 = _4, e4 = n2;
              _4 = t4, n2 = g6, t4 = i2, g6 = e4;
            }
            let l6 = n2;
            null === e3 ? e3 = new o5(l6, false) : l6 = e3.length;
            let r2 = 0;
            for (; r2 < s3; r2++) e3.__setDigit(r2, _4.__digit(r2) | t4.__digit(r2));
            for (; r2 < n2; r2++) e3.__setDigit(r2, _4.__digit(r2));
            for (; r2 < l6; r2++) e3.__setDigit(r2, 0);
            return e3;
          }
          static __absoluteXor(_4, t4, e3 = null) {
            let n2 = _4.length, g6 = t4.length, s3 = g6;
            if (n2 < g6) {
              s3 = n2;
              const i2 = _4, e4 = n2;
              _4 = t4, n2 = g6, t4 = i2, g6 = e4;
            }
            let l6 = n2;
            null === e3 ? e3 = new o5(l6, false) : l6 = e3.length;
            let r2 = 0;
            for (; r2 < s3; r2++) e3.__setDigit(r2, _4.__digit(r2) ^ t4.__digit(r2));
            for (; r2 < n2; r2++) e3.__setDigit(r2, _4.__digit(r2));
            for (; r2 < l6; r2++) e3.__setDigit(r2, 0);
            return e3;
          }
          static __absoluteCompare(_4, t4) {
            const e3 = _4.length - t4.length;
            if (0 != e3) return e3;
            let n2 = _4.length - 1;
            for (; 0 <= n2 && _4.__digit(n2) === t4.__digit(n2); ) n2--;
            return 0 > n2 ? 0 : _4.__unsignedDigit(n2) > t4.__unsignedDigit(n2) ? 1 : -1;
          }
          static __multiplyAccumulate(_4, t4, e3, n2) {
            if (0 === t4) return;
            const g6 = 32767 & t4, s3 = t4 >>> 15;
            let l6 = 0, r2 = 0;
            for (let a4, u3 = 0; u3 < _4.length; u3++, n2++) {
              a4 = e3.__digit(n2);
              const i2 = _4.__digit(u3), t5 = 32767 & i2, d6 = i2 >>> 15, h4 = o5.__imul(t5, g6), m4 = o5.__imul(t5, s3), b5 = o5.__imul(d6, g6), D = o5.__imul(d6, s3);
              a4 += r2 + h4 + l6, l6 = a4 >>> 30, a4 &= 1073741823, a4 += ((32767 & m4) << 15) + ((32767 & b5) << 15), l6 += a4 >>> 30, r2 = D + (m4 >>> 15) + (b5 >>> 15), e3.__setDigit(n2, 1073741823 & a4);
            }
            for (; 0 != l6 || 0 !== r2; n2++) {
              let i2 = e3.__digit(n2);
              i2 += l6 + r2, r2 = 0, l6 = i2 >>> 30, e3.__setDigit(n2, 1073741823 & i2);
            }
          }
          static __internalMultiplyAdd(_4, t4, e3, g6, s3) {
            let l6 = e3, a4 = 0;
            for (let n2 = 0; n2 < g6; n2++) {
              const i2 = _4.__digit(n2), e4 = o5.__imul(32767 & i2, t4), g7 = o5.__imul(i2 >>> 15, t4), u3 = e4 + ((32767 & g7) << 15) + a4 + l6;
              l6 = u3 >>> 30, a4 = g7 >>> 15, s3.__setDigit(n2, 1073741823 & u3);
            }
            if (s3.length > g6) for (s3.__setDigit(g6++, l6 + a4); g6 < s3.length; ) s3.__setDigit(g6++, 0);
            else if (0 !== l6 + a4) throw new Error("implementation bug");
          }
          __inplaceMultiplyAdd(i2, _4, t4) {
            t4 > this.length && (t4 = this.length);
            const e3 = 32767 & i2, n2 = i2 >>> 15;
            let g6 = 0, s3 = _4;
            for (let l6 = 0; l6 < t4; l6++) {
              const i3 = this.__digit(l6), _5 = 32767 & i3, t5 = i3 >>> 15, r2 = o5.__imul(_5, e3), a4 = o5.__imul(_5, n2), u3 = o5.__imul(t5, e3), d6 = o5.__imul(t5, n2);
              let h4 = s3 + r2 + g6;
              g6 = h4 >>> 30, h4 &= 1073741823, h4 += ((32767 & a4) << 15) + ((32767 & u3) << 15), g6 += h4 >>> 30, s3 = d6 + (a4 >>> 15) + (u3 >>> 15), this.__setDigit(l6, 1073741823 & h4);
            }
            if (0 != g6 || 0 !== s3) throw new Error("implementation bug");
          }
          static __absoluteDivSmall(_4, t4, e3 = null) {
            null === e3 && (e3 = new o5(_4.length, false));
            let n2 = 0;
            for (let g6, o6 = 2 * _4.length - 1; 0 <= o6; o6 -= 2) {
              g6 = (n2 << 15 | _4.__halfDigit(o6)) >>> 0;
              const i2 = 0 | g6 / t4;
              n2 = 0 | g6 % t4, g6 = (n2 << 15 | _4.__halfDigit(o6 - 1)) >>> 0;
              const s3 = 0 | g6 / t4;
              n2 = 0 | g6 % t4, e3.__setDigit(o6 >>> 1, i2 << 15 | s3);
            }
            return e3;
          }
          static __absoluteModSmall(_4, t4) {
            let e3 = 0;
            for (let n2 = 2 * _4.length - 1; 0 <= n2; n2--) {
              const i2 = (e3 << 15 | _4.__halfDigit(n2)) >>> 0;
              e3 = 0 | i2 % t4;
            }
            return e3;
          }
          static __absoluteDivLarge(i2, _4, t4, e3) {
            const g6 = _4.__halfDigitLength(), n2 = _4.length, s3 = i2.__halfDigitLength() - g6;
            let l6 = null;
            t4 && (l6 = new o5(s3 + 2 >>> 1, false), l6.__initializeDigits());
            const r2 = new o5(g6 + 2 >>> 1, false);
            r2.__initializeDigits();
            const a4 = o5.__clz15(_4.__halfDigit(g6 - 1));
            0 < a4 && (_4 = o5.__specialLeftShift(_4, a4, 0));
            const d6 = o5.__specialLeftShift(i2, a4, 1), u3 = _4.__halfDigit(g6 - 1);
            let h4 = 0;
            for (let a5, m4 = s3; 0 <= m4; m4--) {
              a5 = 32767;
              const i3 = d6.__halfDigit(m4 + g6);
              if (i3 !== u3) {
                const t5 = (i3 << 15 | d6.__halfDigit(m4 + g6 - 1)) >>> 0;
                a5 = 0 | t5 / u3;
                let e5 = 0 | t5 % u3;
                const n3 = _4.__halfDigit(g6 - 2), s4 = d6.__halfDigit(m4 + g6 - 2);
                for (; o5.__imul(a5, n3) >>> 0 > (e5 << 16 | s4) >>> 0 && (a5--, e5 += u3, !(32767 < e5)); ) ;
              }
              o5.__internalMultiplyAdd(_4, a5, 0, n2, r2);
              let e4 = d6.__inplaceSub(r2, m4, g6 + 1);
              0 !== e4 && (e4 = d6.__inplaceAdd(_4, m4, g6), d6.__setHalfDigit(m4 + g6, 32767 & d6.__halfDigit(m4 + g6) + e4), a5--), t4 && (1 & m4 ? h4 = a5 << 15 : l6.__setDigit(m4 >>> 1, h4 | a5));
            }
            if (e3) return d6.__inplaceRightShift(a4), t4 ? { quotient: l6, remainder: d6 } : d6;
            if (t4) return l6;
            throw new Error("unreachable");
          }
          static __clz15(i2) {
            return o5.__clz30(i2) - 15;
          }
          __inplaceAdd(_4, t4, e3) {
            let n2 = 0;
            for (let g6 = 0; g6 < e3; g6++) {
              const i2 = this.__halfDigit(t4 + g6) + _4.__halfDigit(g6) + n2;
              n2 = i2 >>> 15, this.__setHalfDigit(t4 + g6, 32767 & i2);
            }
            return n2;
          }
          __inplaceSub(_4, t4, e3) {
            let n2 = 0;
            if (1 & t4) {
              t4 >>= 1;
              let g6 = this.__digit(t4), o6 = 32767 & g6, s3 = 0;
              for (; s3 < e3 - 1 >>> 1; s3++) {
                const i3 = _4.__digit(s3), e4 = (g6 >>> 15) - (32767 & i3) - n2;
                n2 = 1 & e4 >>> 15, this.__setDigit(t4 + s3, (32767 & e4) << 15 | 32767 & o6), g6 = this.__digit(t4 + s3 + 1), o6 = (32767 & g6) - (i3 >>> 15) - n2, n2 = 1 & o6 >>> 15;
              }
              const i2 = _4.__digit(s3), l6 = (g6 >>> 15) - (32767 & i2) - n2;
              n2 = 1 & l6 >>> 15, this.__setDigit(t4 + s3, (32767 & l6) << 15 | 32767 & o6);
              if (t4 + s3 + 1 >= this.length) throw new RangeError("out of bounds");
              0 == (1 & e3) && (g6 = this.__digit(t4 + s3 + 1), o6 = (32767 & g6) - (i2 >>> 15) - n2, n2 = 1 & o6 >>> 15, this.__setDigit(t4 + _4.length, 1073709056 & g6 | 32767 & o6));
            } else {
              t4 >>= 1;
              let g6 = 0;
              for (; g6 < _4.length - 1; g6++) {
                const i3 = this.__digit(t4 + g6), e4 = _4.__digit(g6), o7 = (32767 & i3) - (32767 & e4) - n2;
                n2 = 1 & o7 >>> 15;
                const s4 = (i3 >>> 15) - (e4 >>> 15) - n2;
                n2 = 1 & s4 >>> 15, this.__setDigit(t4 + g6, (32767 & s4) << 15 | 32767 & o7);
              }
              const i2 = this.__digit(t4 + g6), o6 = _4.__digit(g6), s3 = (32767 & i2) - (32767 & o6) - n2;
              n2 = 1 & s3 >>> 15;
              let l6 = 0;
              0 == (1 & e3) && (l6 = (i2 >>> 15) - (o6 >>> 15) - n2, n2 = 1 & l6 >>> 15), this.__setDigit(t4 + g6, (32767 & l6) << 15 | 32767 & s3);
            }
            return n2;
          }
          __inplaceRightShift(_4) {
            if (0 === _4) return;
            let t4 = this.__digit(0) >>> _4;
            const e3 = this.length - 1;
            for (let n2 = 0; n2 < e3; n2++) {
              const i2 = this.__digit(n2 + 1);
              this.__setDigit(n2, 1073741823 & i2 << 30 - _4 | t4), t4 = i2 >>> _4;
            }
            this.__setDigit(e3, t4);
          }
          static __specialLeftShift(_4, t4, e3) {
            const g6 = _4.length, n2 = new o5(g6 + e3, false);
            if (0 === t4) {
              for (let t5 = 0; t5 < g6; t5++) n2.__setDigit(t5, _4.__digit(t5));
              return 0 < e3 && n2.__setDigit(g6, 0), n2;
            }
            let s3 = 0;
            for (let o6 = 0; o6 < g6; o6++) {
              const i2 = _4.__digit(o6);
              n2.__setDigit(o6, 1073741823 & i2 << t4 | s3), s3 = i2 >>> 30 - t4;
            }
            return 0 < e3 && n2.__setDigit(g6, s3), n2;
          }
          static __leftShiftByAbsolute(_4, i2) {
            const t4 = o5.__toShiftAmount(i2);
            if (0 > t4) throw new RangeError("BigInt too big");
            const e3 = 0 | t4 / 30, n2 = t4 % 30, g6 = _4.length, s3 = 0 !== n2 && 0 != _4.__digit(g6 - 1) >>> 30 - n2, l6 = g6 + e3 + (s3 ? 1 : 0), r2 = new o5(l6, _4.sign);
            if (0 === n2) {
              let t5 = 0;
              for (; t5 < e3; t5++) r2.__setDigit(t5, 0);
              for (; t5 < l6; t5++) r2.__setDigit(t5, _4.__digit(t5 - e3));
            } else {
              let t5 = 0;
              for (let _5 = 0; _5 < e3; _5++) r2.__setDigit(_5, 0);
              for (let o6 = 0; o6 < g6; o6++) {
                const i3 = _4.__digit(o6);
                r2.__setDigit(o6 + e3, 1073741823 & i3 << n2 | t5), t5 = i3 >>> 30 - n2;
              }
              if (s3) r2.__setDigit(g6 + e3, t5);
              else if (0 !== t5) throw new Error("implementation bug");
            }
            return r2.__trim();
          }
          static __rightShiftByAbsolute(_4, i2) {
            const t4 = _4.length, e3 = _4.sign, n2 = o5.__toShiftAmount(i2);
            if (0 > n2) return o5.__rightShiftByMaximum(e3);
            const g6 = 0 | n2 / 30, s3 = n2 % 30;
            let l6 = t4 - g6;
            if (0 >= l6) return o5.__rightShiftByMaximum(e3);
            let r2 = false;
            if (e3) {
              if (0 != (_4.__digit(g6) & (1 << s3) - 1)) r2 = true;
              else for (let t5 = 0; t5 < g6; t5++) if (0 !== _4.__digit(t5)) {
                r2 = true;
                break;
              }
            }
            if (r2 && 0 === s3) {
              const i3 = _4.__digit(t4 - 1);
              0 == ~i3 && l6++;
            }
            let a4 = new o5(l6, e3);
            if (0 === s3) {
              a4.__setDigit(l6 - 1, 0);
              for (let e4 = g6; e4 < t4; e4++) a4.__setDigit(e4 - g6, _4.__digit(e4));
            } else {
              let e4 = _4.__digit(g6) >>> s3;
              const n3 = t4 - g6 - 1;
              for (let t5 = 0; t5 < n3; t5++) {
                const i3 = _4.__digit(t5 + g6 + 1);
                a4.__setDigit(t5, 1073741823 & i3 << 30 - s3 | e4), e4 = i3 >>> s3;
              }
              a4.__setDigit(n3, e4);
            }
            return r2 && (a4 = o5.__absoluteAddOne(a4, true, a4)), a4.__trim();
          }
          static __rightShiftByMaximum(i2) {
            return i2 ? o5.__oneDigit(1, true) : o5.__zero();
          }
          static __toShiftAmount(i2) {
            if (1 < i2.length) return -1;
            const _4 = i2.__unsignedDigit(0);
            return _4 > o5.__kMaxLengthBits ? -1 : _4;
          }
          static __toPrimitive(i2, _4 = "default") {
            if ("object" != typeof i2) return i2;
            if (i2.constructor === o5) return i2;
            if ("undefined" != typeof Symbol && "symbol" == typeof Symbol.toPrimitive) {
              const t5 = i2[Symbol.toPrimitive];
              if (t5) {
                const i3 = t5(_4);
                if ("object" != typeof i3) return i3;
                throw new TypeError("Cannot convert object to primitive value");
              }
            }
            const t4 = i2.valueOf;
            if (t4) {
              const _5 = t4.call(i2);
              if ("object" != typeof _5) return _5;
            }
            const e3 = i2.toString;
            if (e3) {
              const _5 = e3.call(i2);
              if ("object" != typeof _5) return _5;
            }
            throw new TypeError("Cannot convert object to primitive value");
          }
          static __toNumeric(i2) {
            return o5.__isBigInt(i2) ? i2 : +i2;
          }
          static __isBigInt(i2) {
            return "object" == typeof i2 && null !== i2 && i2.constructor === o5;
          }
          static __truncateToNBits(i2, _4) {
            const t4 = 0 | (i2 + 29) / 30, e3 = new o5(t4, _4.sign), n2 = t4 - 1;
            for (let t5 = 0; t5 < n2; t5++) e3.__setDigit(t5, _4.__digit(t5));
            let g6 = _4.__digit(n2);
            if (0 != i2 % 30) {
              const _5 = 32 - i2 % 30;
              g6 = g6 << _5 >>> _5;
            }
            return e3.__setDigit(n2, g6), e3.__trim();
          }
          static __truncateAndSubFromPowerOfTwo(_4, t4, e3) {
            var n2 = Math.min;
            const g6 = 0 | (_4 + 29) / 30, s3 = new o5(g6, e3);
            let l6 = 0;
            const r2 = g6 - 1;
            let a4 = 0;
            for (const i2 = n2(r2, t4.length); l6 < i2; l6++) {
              const i3 = 0 - t4.__digit(l6) - a4;
              a4 = 1 & i3 >>> 30, s3.__setDigit(l6, 1073741823 & i3);
            }
            for (; l6 < r2; l6++) s3.__setDigit(l6, 0 | 1073741823 & -a4);
            let u3 = r2 < t4.length ? t4.__digit(r2) : 0;
            const d6 = _4 % 30;
            let h4;
            if (0 == d6) h4 = 0 - u3 - a4, h4 &= 1073741823;
            else {
              const i2 = 32 - d6;
              u3 = u3 << i2 >>> i2;
              const _5 = 1 << 32 - i2;
              h4 = _5 - u3 - a4, h4 &= _5 - 1;
            }
            return s3.__setDigit(r2, h4), s3.__trim();
          }
          __digit(_4) {
            return this[_4];
          }
          __unsignedDigit(_4) {
            return this[_4] >>> 0;
          }
          __setDigit(_4, i2) {
            this[_4] = 0 | i2;
          }
          __setDigitGrow(_4, i2) {
            this[_4] = 0 | i2;
          }
          __halfDigitLength() {
            const i2 = this.length;
            return 32767 >= this.__unsignedDigit(i2 - 1) ? 2 * i2 - 1 : 2 * i2;
          }
          __halfDigit(_4) {
            return 32767 & this[_4 >>> 1] >>> 15 * (1 & _4);
          }
          __setHalfDigit(_4, i2) {
            const t4 = _4 >>> 1, e3 = this.__digit(t4), n2 = 1 & _4 ? 32767 & e3 | i2 << 15 : 1073709056 & e3 | 32767 & i2;
            this.__setDigit(t4, n2);
          }
          static __digitPow(i2, _4) {
            let t4 = 1;
            for (; 0 < _4; ) 1 & _4 && (t4 *= i2), _4 >>>= 1, i2 *= i2;
            return t4;
          }
          static __isOneDigitInt(i2) {
            return (1073741823 & i2) === i2;
          }
        }
        return o5.__kMaxLength = 33554432, o5.__kMaxLengthBits = o5.__kMaxLength << 5, o5.__kMaxBitsPerChar = [0, 0, 32, 51, 64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149, 151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166], o5.__kBitsPerCharTableShift = 5, o5.__kBitsPerCharTableMultiplier = 1 << o5.__kBitsPerCharTableShift, o5.__kConversionChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], o5.__kBitConversionBuffer = new ArrayBuffer(8), o5.__kBitConversionDouble = new Float64Array(o5.__kBitConversionBuffer), o5.__kBitConversionInts = new Int32Array(o5.__kBitConversionBuffer), o5.__clz30 = _3 ? function(i2) {
          return _3(i2) - 2;
        } : function(i2) {
          var _4 = Math.LN2, t4 = Math.log;
          return 0 === i2 ? 30 : 0 | 29 - (0 | t4(i2 >>> 0) / _4);
        }, o5.__imul = i || function(i2, _4) {
          return 0 | i2 * _4;
        }, o5;
      });
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/xoshiro.js
  var require_xoshiro = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/xoshiro.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var utils_1 = require_utils();
      var bignumber_js_1 = __importDefault(require_bignumber());
      var jsbi_1 = __importDefault(require_jsbi_umd());
      var MAX_UINT64 = 18446744073709552e3;
      var rotl = (x5, k4) => jsbi_1.default.bitwiseXor(jsbi_1.default.asUintN(64, jsbi_1.default.leftShift(x5, jsbi_1.default.BigInt(k4))), jsbi_1.default.BigInt(jsbi_1.default.asUintN(64, jsbi_1.default.signedRightShift(x5, jsbi_1.default.subtract(jsbi_1.default.BigInt(64), jsbi_1.default.BigInt(k4))))));
      var Xoshiro = class {
        constructor(seed) {
          this.next = () => {
            return new bignumber_js_1.default(this.roll().toString());
          };
          this.nextDouble = () => {
            return new bignumber_js_1.default(this.roll().toString()).div(MAX_UINT64 + 1);
          };
          this.nextInt = (low, high) => {
            return Math.floor(this.nextDouble().toNumber() * (high - low + 1) + low);
          };
          this.nextByte = () => this.nextInt(0, 255);
          this.nextData = (count) => [...new Array(count)].map(() => this.nextByte());
          const digest = utils_1.sha256Hash(seed);
          this.s = [jsbi_1.default.BigInt(0), jsbi_1.default.BigInt(0), jsbi_1.default.BigInt(0), jsbi_1.default.BigInt(0)];
          this.setS(digest);
        }
        setS(digest) {
          for (let i = 0; i < 4; i++) {
            let o5 = i * 8;
            let v3 = jsbi_1.default.BigInt(0);
            for (let n2 = 0; n2 < 8; n2++) {
              v3 = jsbi_1.default.asUintN(64, jsbi_1.default.leftShift(v3, jsbi_1.default.BigInt(8)));
              v3 = jsbi_1.default.asUintN(64, jsbi_1.default.bitwiseOr(v3, jsbi_1.default.BigInt(digest[o5 + n2])));
            }
            this.s[i] = jsbi_1.default.asUintN(64, v3);
          }
        }
        roll() {
          const result = jsbi_1.default.asUintN(64, jsbi_1.default.multiply(rotl(jsbi_1.default.asUintN(64, jsbi_1.default.multiply(this.s[1], jsbi_1.default.BigInt(5))), 7), jsbi_1.default.BigInt(9)));
          const t3 = jsbi_1.default.asUintN(64, jsbi_1.default.leftShift(this.s[1], jsbi_1.default.BigInt(17)));
          this.s[2] = jsbi_1.default.asUintN(64, jsbi_1.default.bitwiseXor(this.s[2], jsbi_1.default.BigInt(this.s[0])));
          this.s[3] = jsbi_1.default.asUintN(64, jsbi_1.default.bitwiseXor(this.s[3], jsbi_1.default.BigInt(this.s[1])));
          this.s[1] = jsbi_1.default.asUintN(64, jsbi_1.default.bitwiseXor(this.s[1], jsbi_1.default.BigInt(this.s[2])));
          this.s[0] = jsbi_1.default.asUintN(64, jsbi_1.default.bitwiseXor(this.s[0], jsbi_1.default.BigInt(this.s[3])));
          this.s[2] = jsbi_1.default.asUintN(64, jsbi_1.default.bitwiseXor(this.s[2], jsbi_1.default.BigInt(t3)));
          this.s[3] = jsbi_1.default.asUintN(64, rotl(this.s[3], 45));
          return result;
        }
      };
      exports.default = Xoshiro;
    }
  });

  // node_modules/@keystonehq/alias-sampling/dist/cjs/index.js
  var require_cjs = __commonJS({
    "node_modules/@keystonehq/alias-sampling/dist/cjs/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var precomputeAlias = function(p5, n2) {
        var sum = p5.reduce(function(acc, val) {
          if (val < 0) {
            throw new Error("Probability must be a positive: p[" + p5.indexOf(val) + "]=" + val);
          }
          return acc + val;
        }, 0);
        if (sum === 0) {
          throw new Error("Probability sum must be greater than zero.");
        }
        var scaledProbabilities = p5.map(function(prob) {
          return prob * n2 / sum;
        });
        var aliasData = { prob: new Array(n2), alias: new Array(n2) };
        var small = [];
        var large = [];
        for (var i = n2 - 1; i >= 0; i--) {
          if (scaledProbabilities[i] < 1) {
            small.push(i);
          } else {
            large.push(i);
          }
        }
        while (small.length > 0 && large.length > 0) {
          var less = small.pop();
          var more = large.pop();
          aliasData.prob[less] = scaledProbabilities[less];
          aliasData.alias[less] = more;
          scaledProbabilities[more] = scaledProbabilities[more] + scaledProbabilities[less] - 1;
          if (scaledProbabilities[more] < 1) {
            small.push(more);
          } else {
            large.push(more);
          }
        }
        while (large.length > 0) {
          aliasData.prob[large.pop()] = 1;
        }
        while (small.length > 0) {
          aliasData.prob[small.pop()] = 1;
        }
        return aliasData;
      };
      var draw = function(aliasData, outcomes, rng) {
        var c5 = Math.floor(rng() * aliasData.prob.length);
        return outcomes[rng() < aliasData.prob[c5] ? c5 : aliasData.alias[c5]];
      };
      var next = function(aliasData, outcomes, rng, numOfSamples) {
        if (numOfSamples === void 0) {
          numOfSamples = 1;
        }
        if (numOfSamples === 1) {
          return draw(aliasData, outcomes, rng);
        }
        var samples = [];
        for (var i = 0; i < numOfSamples; i++) {
          samples.push(draw(aliasData, outcomes, rng));
        }
        return samples;
      };
      var sample = function(probabilities, outcomes, rng) {
        if (rng === void 0) {
          rng = Math.random;
        }
        if (!Array.isArray(probabilities)) {
          throw new Error("Probabilities must be an array.");
        }
        if (probabilities.length === 0) {
          throw new Error("Probabilities array must not be empty.");
        }
        var n2 = probabilities.length;
        var indexedOutcomes = outcomes !== null && outcomes !== void 0 ? outcomes : Array.from({ length: n2 }, function(_3, i) {
          return i;
        });
        var aliasData = precomputeAlias(probabilities, n2);
        return {
          next: function(numOfSamples) {
            if (numOfSamples === void 0) {
              numOfSamples = 1;
            }
            return next(aliasData, indexedOutcomes, rng, numOfSamples);
          }
        };
      };
      exports.default = sample;
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/fountainUtils.js
  var require_fountainUtils = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/fountainUtils.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.chooseFragments = exports.shuffle = exports.chooseDegree = void 0;
      var utils_1 = require_utils();
      var xoshiro_1 = __importDefault(require_xoshiro());
      var alias_sampling_1 = __importDefault(require_cjs());
      var chooseDegree = (seqLenth, rng) => {
        const degreeProbabilities = [...new Array(seqLenth)].map((_3, index) => 1 / (index + 1));
        const degreeChooser = alias_sampling_1.default(degreeProbabilities, void 0, rng.nextDouble);
        return degreeChooser.next() + 1;
      };
      exports.chooseDegree = chooseDegree;
      var shuffle = (items, rng) => {
        let remaining = [...items];
        let result = [];
        while (remaining.length > 0) {
          let index = rng.nextInt(0, remaining.length - 1);
          let item = remaining[index];
          remaining.splice(index, 1);
          result.push(item);
        }
        return result;
      };
      exports.shuffle = shuffle;
      var chooseFragments = (seqNum, seqLength, checksum) => {
        if (seqNum <= seqLength) {
          return [seqNum - 1];
        } else {
          const seed = Buffer.concat([utils_1.intToBytes(seqNum), utils_1.intToBytes(checksum)]);
          const rng = new xoshiro_1.default(seed);
          const degree = exports.chooseDegree(seqLength, rng);
          const indexes = [...new Array(seqLength)].map((_3, index) => index);
          const shuffledIndexes = exports.shuffle(indexes, rng);
          return shuffledIndexes.slice(0, degree);
        }
      };
      exports.chooseFragments = chooseFragments;
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/fountainEncoder.js
  var require_fountainEncoder = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/fountainEncoder.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FountainEncoderPart = void 0;
      var assert_1 = __importDefault(require_assert());
      var utils_1 = require_utils();
      var fountainUtils_1 = require_fountainUtils();
      var cbor_1 = require_cbor();
      var FountainEncoderPart = class _FountainEncoderPart {
        constructor(_seqNum, _seqLength, _messageLength, _checksum, _fragment) {
          this._seqNum = _seqNum;
          this._seqLength = _seqLength;
          this._messageLength = _messageLength;
          this._checksum = _checksum;
          this._fragment = _fragment;
        }
        get messageLength() {
          return this._messageLength;
        }
        get fragment() {
          return this._fragment;
        }
        get seqNum() {
          return this._seqNum;
        }
        get seqLength() {
          return this._seqLength;
        }
        get checksum() {
          return this._checksum;
        }
        cbor() {
          const result = cbor_1.cborEncode([
            this._seqNum,
            this._seqLength,
            this._messageLength,
            this._checksum,
            this._fragment
          ]);
          return Buffer.from(result);
        }
        description() {
          return `seqNum:${this._seqNum}, seqLen:${this._seqLength}, messageLen:${this._messageLength}, checksum:${this._checksum}, data:${this._fragment.toString("hex")}`;
        }
        static fromCBOR(cborPayload) {
          const [seqNum, seqLength, messageLength, checksum, fragment] = cbor_1.cborDecode(cborPayload);
          assert_1.default(typeof seqNum === "number");
          assert_1.default(typeof seqLength === "number");
          assert_1.default(typeof messageLength === "number");
          assert_1.default(typeof checksum === "number");
          assert_1.default(Buffer.isBuffer(fragment) && fragment.length > 0);
          return new _FountainEncoderPart(seqNum, seqLength, messageLength, checksum, Buffer.from(fragment));
        }
      };
      exports.FountainEncoderPart = FountainEncoderPart;
      var FountainEncoder = class _FountainEncoder {
        constructor(message, maxFragmentLength = 100, firstSeqNum = 0, minFragmentLength = 10) {
          const fragmentLength = _FountainEncoder.findNominalFragmentLength(message.length, minFragmentLength, maxFragmentLength);
          this._messageLength = message.length;
          this._fragments = _FountainEncoder.partitionMessage(message, fragmentLength);
          this.fragmentLength = fragmentLength;
          this.seqNum = utils_1.toUint32(firstSeqNum);
          this.checksum = utils_1.getCRC(message);
        }
        get fragmentsLength() {
          return this._fragments.length;
        }
        get fragments() {
          return this._fragments;
        }
        get messageLength() {
          return this._messageLength;
        }
        isComplete() {
          return this.seqNum >= this._fragments.length;
        }
        isSinglePart() {
          return this._fragments.length === 1;
        }
        seqLength() {
          return this._fragments.length;
        }
        mix(indexes) {
          return indexes.reduce((result, index) => utils_1.bufferXOR(this._fragments[index], result), Buffer.alloc(this.fragmentLength, 0));
        }
        nextPart() {
          this.seqNum = utils_1.toUint32(this.seqNum + 1);
          const indexes = fountainUtils_1.chooseFragments(this.seqNum, this._fragments.length, this.checksum);
          const mixed = this.mix(indexes);
          return new FountainEncoderPart(this.seqNum, this._fragments.length, this._messageLength, this.checksum, mixed);
        }
        static findNominalFragmentLength(messageLength, minFragmentLength, maxFragmentLength) {
          assert_1.default(messageLength > 0);
          assert_1.default(minFragmentLength > 0);
          assert_1.default(maxFragmentLength >= minFragmentLength);
          const maxFragmentCount = Math.ceil(messageLength / minFragmentLength);
          let fragmentLength = 0;
          for (let fragmentCount = 1; fragmentCount <= maxFragmentCount; fragmentCount++) {
            fragmentLength = Math.ceil(messageLength / fragmentCount);
            if (fragmentLength <= maxFragmentLength) {
              break;
            }
          }
          return fragmentLength;
        }
        static partitionMessage(message, fragmentLength) {
          let remaining = Buffer.from(message);
          let fragment;
          let _fragments = [];
          while (remaining.length > 0) {
            [fragment, remaining] = utils_1.split(remaining, -fragmentLength);
            fragment = Buffer.alloc(fragmentLength, 0).fill(fragment, 0, fragment.length);
            _fragments.push(fragment);
          }
          return _fragments;
        }
      };
      exports.default = FountainEncoder;
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/bytewords.js
  var require_bytewords = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/bytewords.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var assert_1 = __importDefault(require_assert());
      var utils_1 = require_utils();
      var bytewords = "ableacidalsoapexaquaarchatomauntawayaxisbackbaldbarnbeltbetabiasbluebodybragbrewbulbbuzzcalmcashcatschefcityclawcodecolacookcostcruxcurlcuspcyandarkdatadaysdelidicedietdoordowndrawdropdrumdulldutyeacheasyechoedgeepicevenexamexiteyesfactfairfernfigsfilmfishfizzflapflewfluxfoxyfreefrogfuelfundgalagamegeargemsgiftgirlglowgoodgraygrimgurugushgyrohalfhanghardhawkheathelphighhillholyhopehornhutsicedideaidleinchinkyintoirisironitemjadejazzjoinjoltjowljudojugsjumpjunkjurykeepkenokeptkeyskickkilnkingkitekiwiknoblamblavalazyleaflegsliarlimplionlistlogoloudloveluaulucklungmainmanymathmazememomenumeowmildmintmissmonknailnavyneednewsnextnoonnotenumbobeyoboeomitonyxopenovalowlspaidpartpeckplaypluspoempoolposepuffpumapurrquadquizraceramprealredorichroadrockroofrubyruinrunsrustsafesagascarsetssilkskewslotsoapsolosongstubsurfswantacotasktaxitenttiedtimetinytoiltombtoystriptunatwinuglyundouniturgeuservastveryvetovialvibeviewvisavoidvowswallwandwarmwaspwavewaxywebswhatwhenwhizwolfworkyankyawnyellyogayurtzapszerozestzinczonezoom";
      var bytewordsLookUpTable = [];
      var BYTEWORDS_NUM = 256;
      var BYTEWORD_LENGTH = 4;
      var MINIMAL_BYTEWORD_LENGTH = 2;
      var STYLES;
      (function(STYLES2) {
        STYLES2["STANDARD"] = "standard";
        STYLES2["URI"] = "uri";
        STYLES2["MINIMAL"] = "minimal";
      })(STYLES || (STYLES = {}));
      var getWord = (index) => {
        return bytewords.slice(index * BYTEWORD_LENGTH, index * BYTEWORD_LENGTH + BYTEWORD_LENGTH);
      };
      var getMinimalWord = (index) => {
        const byteword = getWord(index);
        return `${byteword[0]}${byteword[BYTEWORD_LENGTH - 1]}`;
      };
      var addCRC = (string) => {
        const crc = utils_1.getCRCHex(Buffer.from(string, "hex"));
        return `${string}${crc}`;
      };
      var encodeWithSeparator = (word, separator) => {
        const crcAppendedWord = addCRC(word);
        const crcWordBuff = Buffer.from(crcAppendedWord, "hex");
        const result = crcWordBuff.reduce((result2, w3) => [...result2, getWord(w3)], []);
        return result.join(separator);
      };
      var encodeMinimal = (word) => {
        const crcAppendedWord = addCRC(word);
        const crcWordBuff = Buffer.from(crcAppendedWord, "hex");
        const result = crcWordBuff.reduce((result2, w3) => result2 + getMinimalWord(w3), "");
        return result;
      };
      var decodeWord = (word, wordLength) => {
        assert_1.default(word.length === wordLength, "Invalid Bytewords: word.length does not match wordLength provided");
        const dim = 26;
        if (bytewordsLookUpTable.length === 0) {
          const array_len = dim * dim;
          bytewordsLookUpTable = [...new Array(array_len)].map(() => -1);
          for (let i = 0; i < BYTEWORDS_NUM; i++) {
            const byteword = getWord(i);
            let x6 = byteword[0].charCodeAt(0) - "a".charCodeAt(0);
            let y8 = byteword[3].charCodeAt(0) - "a".charCodeAt(0);
            let offset2 = y8 * dim + x6;
            bytewordsLookUpTable[offset2] = i;
          }
        }
        let x5 = word[0].toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
        let y7 = word[wordLength == 4 ? 3 : 1].toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
        assert_1.default(0 <= x5 && x5 < dim && 0 <= y7 && y7 < dim, "Invalid Bytewords: invalid word");
        let offset = y7 * dim + x5;
        let value = bytewordsLookUpTable[offset];
        assert_1.default(value !== -1, "Invalid Bytewords: value not in lookup table");
        if (wordLength == BYTEWORD_LENGTH) {
          const byteword = getWord(value);
          let c1 = word[1].toLowerCase();
          let c22 = word[2].toLowerCase();
          assert_1.default(c1 === byteword[1] && c22 === byteword[2], "Invalid Bytewords: invalid middle letters of word");
        }
        return Buffer.from([value]).toString("hex");
      };
      var _decode = (string, separator, wordLength) => {
        const words = wordLength == BYTEWORD_LENGTH ? string.split(separator) : utils_1.partition(string, 2);
        const decodedString = words.map((word) => decodeWord(word, wordLength)).join("");
        assert_1.default(decodedString.length >= 5, "Invalid Bytewords: invalid decoded string length");
        const [body, bodyChecksum] = utils_1.split(Buffer.from(decodedString, "hex"), 4);
        const checksum = utils_1.getCRCHex(body);
        assert_1.default(checksum === bodyChecksum.toString("hex"), "Invalid Checksum");
        return body.toString("hex");
      };
      var decode = (string, style = STYLES.MINIMAL) => {
        switch (style) {
          case STYLES.STANDARD:
            return _decode(string, " ", BYTEWORD_LENGTH);
          case STYLES.URI:
            return _decode(string, "-", BYTEWORD_LENGTH);
          case STYLES.MINIMAL:
            return _decode(string, "", MINIMAL_BYTEWORD_LENGTH);
          default:
            throw new Error(`Invalid style ${style}`);
        }
      };
      var encode = (string, style = STYLES.MINIMAL) => {
        switch (style) {
          case STYLES.STANDARD:
            return encodeWithSeparator(string, " ");
          case STYLES.URI:
            return encodeWithSeparator(string, "-");
          case STYLES.MINIMAL:
            return encodeMinimal(string);
          default:
            throw new Error(`Invalid style ${style}`);
        }
      };
      exports.default = {
        decode,
        encode,
        STYLES
      };
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/urEncoder.js
  var require_urEncoder = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/urEncoder.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var fountainEncoder_1 = __importDefault(require_fountainEncoder());
      var bytewords_1 = __importDefault(require_bytewords());
      var UREncoder2 = class _UREncoder {
        constructor(_ur, maxFragmentLength, firstSeqNum, minFragmentLength) {
          this.ur = _ur;
          this.fountainEncoder = new fountainEncoder_1.default(_ur.cbor, maxFragmentLength, firstSeqNum, minFragmentLength);
        }
        get fragmentsLength() {
          return this.fountainEncoder.fragmentsLength;
        }
        get fragments() {
          return this.fountainEncoder.fragments;
        }
        get messageLength() {
          return this.fountainEncoder.messageLength;
        }
        get cbor() {
          return this.ur.cbor;
        }
        encodeWhole() {
          return [...new Array(this.fragmentsLength)].map(() => this.nextPart());
        }
        nextPart() {
          const part = this.fountainEncoder.nextPart();
          if (this.fountainEncoder.isSinglePart()) {
            return _UREncoder.encodeSinglePart(this.ur);
          } else {
            return _UREncoder.encodePart(this.ur.type, part);
          }
        }
        static encodeUri(scheme, pathComponents) {
          const path = pathComponents.join("/");
          return [scheme, path].join(":");
        }
        static encodeUR(pathComponents) {
          return _UREncoder.encodeUri("ur", pathComponents);
        }
        static encodePart(type, part) {
          const seq = `${part.seqNum}-${part.seqLength}`;
          const body = bytewords_1.default.encode(part.cbor().toString("hex"), bytewords_1.default.STYLES.MINIMAL);
          return _UREncoder.encodeUR([type, seq, body]);
        }
        static encodeSinglePart(ur) {
          const body = bytewords_1.default.encode(ur.cbor.toString("hex"), bytewords_1.default.STYLES.MINIMAL);
          return _UREncoder.encodeUR([ur.type, body]);
        }
      };
      exports.default = UREncoder2;
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/fountainDecoder.js
  var require_fountainDecoder = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/fountainDecoder.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FountainDecoderPart = void 0;
      var utils_1 = require_utils();
      var fountainUtils_1 = require_fountainUtils();
      var errors_1 = require_errors();
      var FountainDecoderPart = class _FountainDecoderPart {
        constructor(_indexes, _fragment) {
          this._indexes = _indexes;
          this._fragment = _fragment;
        }
        get indexes() {
          return this._indexes;
        }
        get fragment() {
          return this._fragment;
        }
        static fromEncoderPart(encoderPart) {
          const indexes = fountainUtils_1.chooseFragments(encoderPart.seqNum, encoderPart.seqLength, encoderPart.checksum);
          const fragment = encoderPart.fragment;
          return new _FountainDecoderPart(indexes, fragment);
        }
        isSimple() {
          return this.indexes.length === 1;
        }
      };
      exports.FountainDecoderPart = FountainDecoderPart;
      var FountainDecoder = class _FountainDecoder {
        constructor() {
          this.result = void 0;
          this.expectedMessageLength = 0;
          this.expectedChecksum = 0;
          this.expectedFragmentLength = 0;
          this.processedPartsCount = 0;
          this.expectedPartIndexes = [];
          this.lastPartIndexes = [];
          this.queuedParts = [];
          this.receivedPartIndexes = [];
          this.mixedParts = [];
          this.simpleParts = [];
        }
        validatePart(part) {
          if (this.expectedPartIndexes.length === 0) {
            [...new Array(part.seqLength)].forEach((_3, index) => this.expectedPartIndexes.push(index));
            this.expectedMessageLength = part.messageLength;
            this.expectedChecksum = part.checksum;
            this.expectedFragmentLength = part.fragment.length;
          } else {
            if (this.expectedPartIndexes.length !== part.seqLength) {
              return false;
            }
            if (this.expectedMessageLength !== part.messageLength) {
              return false;
            }
            if (this.expectedChecksum !== part.checksum) {
              return false;
            }
            if (this.expectedFragmentLength !== part.fragment.length) {
              return false;
            }
          }
          return true;
        }
        reducePartByPart(a4, b5) {
          if (utils_1.arrayContains(a4.indexes, b5.indexes)) {
            const newIndexes = utils_1.setDifference(a4.indexes, b5.indexes);
            const newFragment = utils_1.bufferXOR(a4.fragment, b5.fragment);
            return new FountainDecoderPart(newIndexes, newFragment);
          } else {
            return a4;
          }
        }
        reduceMixedBy(part) {
          const newMixed = [];
          this.mixedParts.map(({ value: mixedPart }) => this.reducePartByPart(mixedPart, part)).forEach((reducedPart) => {
            if (reducedPart.isSimple()) {
              this.queuedParts.push(reducedPart);
            } else {
              newMixed.push({ key: reducedPart.indexes, value: reducedPart });
            }
          });
          this.mixedParts = newMixed;
        }
        processSimplePart(part) {
          const fragmentIndex = part.indexes[0];
          if (this.receivedPartIndexes.includes(fragmentIndex)) {
            return;
          }
          this.simpleParts.push({ key: part.indexes, value: part });
          this.receivedPartIndexes.push(fragmentIndex);
          if (utils_1.arraysEqual(this.receivedPartIndexes, this.expectedPartIndexes)) {
            const sortedParts = this.simpleParts.map(({ value }) => value).sort((a4, b5) => a4.indexes[0] - b5.indexes[0]);
            const message = _FountainDecoder.joinFragments(sortedParts.map((part2) => part2.fragment), this.expectedMessageLength);
            const checksum = utils_1.getCRC(message);
            if (checksum === this.expectedChecksum) {
              this.result = message;
            } else {
              this.error = new errors_1.InvalidChecksumError();
            }
          } else {
            this.reduceMixedBy(part);
          }
        }
        processMixedPart(part) {
          if (this.mixedParts.some(({ key: indexes }) => utils_1.arraysEqual(indexes, part.indexes))) {
            return;
          }
          let p22 = this.simpleParts.reduce((acc, { value: p5 }) => this.reducePartByPart(acc, p5), part);
          p22 = this.mixedParts.reduce((acc, { value: p5 }) => this.reducePartByPart(acc, p5), p22);
          if (p22.isSimple()) {
            this.queuedParts.push(p22);
          } else {
            this.reduceMixedBy(p22);
            this.mixedParts.push({ key: p22.indexes, value: p22 });
          }
        }
        processQueuedItem() {
          if (this.queuedParts.length === 0) {
            return;
          }
          const part = this.queuedParts.shift();
          if (part.isSimple()) {
            this.processSimplePart(part);
          } else {
            this.processMixedPart(part);
          }
        }
        receivePart(encoderPart) {
          if (this.isComplete()) {
            return false;
          }
          if (!this.validatePart(encoderPart)) {
            return false;
          }
          const decoderPart = FountainDecoderPart.fromEncoderPart(encoderPart);
          this.lastPartIndexes = decoderPart.indexes;
          this.queuedParts.push(decoderPart);
          while (!this.isComplete() && this.queuedParts.length > 0) {
            this.processQueuedItem();
          }
          ;
          this.processedPartsCount += 1;
          return true;
        }
        isComplete() {
          return Boolean(this.result !== void 0 && this.result.length > 0);
        }
        isSuccess() {
          return Boolean(this.error === void 0 && this.isComplete());
        }
        resultMessage() {
          return this.isSuccess() ? this.result : Buffer.from([]);
        }
        isFailure() {
          return this.error !== void 0;
        }
        resultError() {
          return this.error ? this.error.message : "";
        }
        expectedPartCount() {
          return this.expectedPartIndexes.length;
        }
        getExpectedPartIndexes() {
          return [...this.expectedPartIndexes];
        }
        getReceivedPartIndexes() {
          return [...this.receivedPartIndexes];
        }
        getLastPartIndexes() {
          return [...this.lastPartIndexes];
        }
        estimatedPercentComplete() {
          if (this.isComplete()) {
            return 1;
          }
          const expectedPartCount = this.expectedPartCount();
          if (expectedPartCount === 0) {
            return 0;
          }
          return Math.min(0.99, this.processedPartsCount / (expectedPartCount * 1.75));
        }
        getProgress() {
          if (this.isComplete()) {
            return 1;
          }
          const expectedPartCount = this.expectedPartCount();
          if (expectedPartCount === 0) {
            return 0;
          }
          return this.receivedPartIndexes.length / expectedPartCount;
        }
      };
      exports.default = FountainDecoder;
      FountainDecoder.joinFragments = (fragments, messageLength) => {
        return Buffer.concat(fragments).slice(0, messageLength);
      };
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/urDecoder.js
  var require_urDecoder = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/urDecoder.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var fountainDecoder_1 = __importDefault(require_fountainDecoder());
      var bytewords_1 = __importDefault(require_bytewords());
      var assert_1 = __importDefault(require_assert());
      var utils_1 = require_utils();
      var errors_1 = require_errors();
      var ur_1 = __importDefault(require_ur());
      var fountainEncoder_1 = require_fountainEncoder();
      var URDecoder3 = class _URDecoder {
        constructor(fountainDecoder = new fountainDecoder_1.default(), type = "bytes") {
          this.fountainDecoder = fountainDecoder;
          this.type = type;
          assert_1.default(utils_1.isURType(type), "Invalid UR type");
          this.expected_type = "";
        }
        static decodeBody(type, message) {
          const cbor = bytewords_1.default.decode(message, bytewords_1.default.STYLES.MINIMAL);
          return new ur_1.default(Buffer.from(cbor, "hex"), type);
        }
        validatePart(type) {
          if (this.expected_type) {
            return this.expected_type === type;
          }
          if (!utils_1.isURType(type)) {
            return false;
          }
          this.expected_type = type;
          return true;
        }
        static decode(message) {
          const [type, components] = this.parse(message);
          if (components.length === 0) {
            throw new errors_1.InvalidPathLengthError();
          }
          const body = components[0];
          return _URDecoder.decodeBody(type, body);
        }
        static parse(message) {
          const lowercase = message.toLowerCase();
          const prefix = lowercase.slice(0, 3);
          if (prefix !== "ur:") {
            throw new errors_1.InvalidSchemeError();
          }
          const components = lowercase.slice(3).split("/");
          const type = components[0];
          if (components.length < 2) {
            throw new errors_1.InvalidPathLengthError();
          }
          if (!utils_1.isURType(type)) {
            throw new errors_1.InvalidTypeError();
          }
          return [type, components.slice(1)];
        }
        static parseSequenceComponent(s3) {
          const components = s3.split("-");
          if (components.length !== 2) {
            throw new errors_1.InvalidSequenceComponentError();
          }
          const seqNum = utils_1.toUint32(Number(components[0]));
          const seqLength = Number(components[1]);
          if (seqNum < 1 || seqLength < 1) {
            throw new errors_1.InvalidSequenceComponentError();
          }
          return [seqNum, seqLength];
        }
        receivePart(s3) {
          if (this.result !== void 0) {
            return false;
          }
          const [type, components] = _URDecoder.parse(s3);
          if (!this.validatePart(type)) {
            return false;
          }
          if (components.length === 1) {
            this.result = _URDecoder.decodeBody(type, components[0]);
            return true;
          }
          if (components.length !== 2) {
            throw new errors_1.InvalidPathLengthError();
          }
          const [seq, fragment] = components;
          const [seqNum, seqLength] = _URDecoder.parseSequenceComponent(seq);
          const cbor = bytewords_1.default.decode(fragment, bytewords_1.default.STYLES.MINIMAL);
          const part = fountainEncoder_1.FountainEncoderPart.fromCBOR(cbor);
          if (seqNum !== part.seqNum || seqLength !== part.seqLength) {
            return false;
          }
          if (!this.fountainDecoder.receivePart(part)) {
            return false;
          }
          if (this.fountainDecoder.isSuccess()) {
            this.result = new ur_1.default(this.fountainDecoder.resultMessage(), type);
          } else if (this.fountainDecoder.isFailure()) {
            this.error = new errors_1.InvalidSchemeError();
          }
          return true;
        }
        resultUR() {
          return this.result ? this.result : new ur_1.default(Buffer.from([]));
        }
        isComplete() {
          return this.result && this.result.cbor.length > 0;
        }
        isSuccess() {
          return !this.error && this.isComplete();
        }
        isError() {
          return this.error !== void 0;
        }
        resultError() {
          return this.error ? this.error.message : "";
        }
        expectedPartCount() {
          return this.fountainDecoder.expectedPartCount();
        }
        expectedPartIndexes() {
          return this.fountainDecoder.getExpectedPartIndexes();
        }
        receivedPartIndexes() {
          return this.fountainDecoder.getReceivedPartIndexes();
        }
        lastPartIndexes() {
          return this.fountainDecoder.getLastPartIndexes();
        }
        estimatedPercentComplete() {
          return this.fountainDecoder.estimatedPercentComplete();
        }
        getProgress() {
          return this.fountainDecoder.getProgress();
        }
      };
      exports.default = URDecoder3;
    }
  });

  // node_modules/@ngraveio/bc-ur/dist/index.js
  var require_dist = __commonJS({
    "node_modules/@ngraveio/bc-ur/dist/index.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.URDecoder = exports.UREncoder = exports.UR = void 0;
      var ur_1 = __importDefault(require_ur());
      exports.UR = ur_1.default;
      var urEncoder_1 = __importDefault(require_urEncoder());
      exports.UREncoder = urEncoder_1.default;
      var urDecoder_1 = __importDefault(require_urDecoder());
      exports.URDecoder = urDecoder_1.default;
    }
  });

  // src/protocol/sign-response.js
  function parseSignaturePacket(data) {
    if (data.length < 2) {
      throw new Error("Truncated OpenPGP packet");
    }
    let offset = 0;
    const ctb = data[offset++];
    if ((ctb & 128) === 0) {
      throw new Error("Invalid OpenPGP packet header");
    }
    let tag;
    let length;
    if (ctb & 64) {
      tag = ctb & 63;
      const first = data[offset++];
      if (first === void 0) {
        throw new Error("Missing packet length");
      }
      if (first < 192) {
        length = first;
      } else if (first <= 223) {
        if (offset >= data.length) {
          throw new Error("Truncated packet length");
        }
        length = (first - 192 << 8) + data[offset++] + 192;
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
      tag = ctb >> 2 & 15;
      const lengthType = ctb & 3;
      if (lengthType === 0) {
        if (offset >= data.length) throw new Error("Truncated length");
        length = data[offset++];
      } else if (lengthType === 1) {
        if (offset + 2 > data.length) throw new Error("Truncated length");
        length = data[offset] << 8 | data[offset + 1];
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
    if (body[1] !== 1) {
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
  function decodeSignResponse(input) {
    if (typeof input !== "string" || input.length > 65536) {
      throw new Error("Invalid or oversized UR input");
    }
    const parts = input.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0 || parts.length > 128) {
      throw new Error("Invalid number of UR fragments");
    }
    const decoder = new import_bc_ur.URDecoder();
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
  var import_bc_ur;
  var init_sign_response = __esm({
    "src/protocol/sign-response.js"() {
      import_bc_ur = __toESM(require_dist());
    }
  });

  // src/protocol/compose-mime.js
  function createComposeSigningPayload(details, maxBytes = 104) {
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
    let body = input.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
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
        `Signing payload is ${messageBytes.length} bytes; hardware limit is ${maxBytes} bytes`
      );
    }
    return {
      messageText,
      messageBytes,
      byteLength: messageBytes.length,
      maxBytes
    };
  }
  var MIME_HEADER;
  var init_compose_mime = __esm({
    "src/protocol/compose-mime.js"() {
      MIME_HEADER = "Content-Type: text/plain; charset=us-ascii\r\n\r\n";
    }
  });

  // src/protocol/sign-request.js
  var sign_request_exports = {};
  __export(sign_request_exports, {
    createComposeSigningPayload: () => createComposeSigningPayload,
    createSignRequest: () => createSignRequest,
    decodeSignResponse: () => decodeSignResponse
  });
  function createSignRequest(messageText, keyCreationTime, signatureCreationTime, maxBytes = 104) {
    const message = new TextEncoder().encode(messageText);
    if (message.length === 0 || message.length > maxBytes) {
      throw new Error(`Message must be 1..${maxBytes} bytes`);
    }
    for (let i = 0; i < message.length; i++) {
      const b5 = message[i];
      if (b5 === 13) {
        if (message[i + 1] !== 10) {
          throw new Error("Bare CR is not allowed");
        }
        i++;
        continue;
      }
      if (b5 === 10) continue;
      if (b5 < 32 || b5 > 126) {
        throw new Error("Only printable ASCII and CRLF/LF are supported");
      }
    }
    for (const [label, value] of [
      ["Key creation time", keyCreationTime],
      ["Signature creation time", signatureCreationTime]
    ]) {
      if (!Number.isInteger(value) || value <= 0 || value > 4294967295) {
        throw new Error(`${label} must be a valid uint32 timestamp`);
      }
    }
    if (signatureCreationTime < keyCreationTime) {
      throw new Error("Signature time precedes key creation");
    }
    const innerCbor = v2(/* @__PURE__ */ new Map([
      [1, VERSION],
      [2, SIGN_MESSAGE],
      [3, message],
      [4, keyCreationTime],
      [5, signatureCreationTime]
    ]));
    const ur = import_bc_ur2.UR.fromBuffer(import_buffer.Buffer.from(innerCbor));
    const encoder = new import_bc_ur2.UREncoder(ur, 400, 0);
    const urText = encoder.nextPart();
    const decoder = new import_bc_ur2.URDecoder();
    decoder.receivePart(urText);
    if (!decoder.isComplete() || !decoder.isSuccess()) {
      throw new Error("UR round-trip validation failed");
    }
    const recovered = decoder.resultUR().decodeCBOR();
    if (recovered.length !== innerCbor.length || !recovered.every((b5, i) => b5 === innerCbor[i])) {
      throw new Error("UR round trip changed the CBOR payload");
    }
    const parsed = l4(innerCbor);
    if (!(parsed instanceof Map) || parsed.get(1) !== VERSION || parsed.get(2) !== SIGN_MESSAGE) {
      throw new Error("CBOR round-trip validation failed");
    }
    return {
      urText,
      messageBytes: message.length,
      keyCreationTime,
      signatureCreationTime
    };
  }
  var import_buffer, import_bc_ur2, VERSION, SIGN_MESSAGE;
  var init_sign_request = __esm({
    "src/protocol/sign-request.js"() {
      import_buffer = __toESM(require_buffer());
      init_lib2();
      import_bc_ur2 = __toESM(require_dist());
      init_sign_response();
      init_compose_mime();
      VERSION = 1;
      SIGN_MESSAGE = 2;
    }
  });

  // src/protocol/browser-entry.js
  var browser_entry_exports = {};
  __export(browser_entry_exports, {
    loadProtocol: () => loadProtocol
  });
  var import_buffer2 = __toESM(require_buffer());
  globalThis.Buffer = import_buffer2.Buffer;
  async function loadProtocol() {
    return Promise.resolve().then(() => (init_sign_request(), sign_request_exports));
  }
  return __toCommonJS(browser_entry_exports);
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

assert/build/internal/util/comparisons.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)
*/
