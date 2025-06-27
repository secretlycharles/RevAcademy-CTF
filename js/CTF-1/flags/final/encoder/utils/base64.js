const { enc } = require("crypto-js");

function encodeInputToBase64(nIHBL5z) {
  const buffer = [];

  // Step 1: Push control byte (1 << 3 | 2 === 10)
  buffer.push((1 << 3) | 2);

  // Step 2: Convert input to UTF-8 bytes
  const vEsHKIM = new TextEncoder().encode(nIHBL5z);

  // Step 3: Push the length of the byte array
  buffer.push(vEsHKIM.length);

  // Step 4: Push all bytes from vEsHKIM to buffer
  buffer.push(...vEsHKIM);

  // Step 5: Create Uint8Array and base64 encode
  const bytes = new Uint8Array(buffer);
  const base64 = btoa(String.fromCharCode.apply(null, bytes));

  return base64;
}

// Example usage:
// const encoded = encodeInputToBase64("hi");
// console.log(encoded);  // Outputs: CgVoZWxsbw==

// CgJoaQ==
// CgJoaQ==

module.exports = { encodeInputToBase64 };