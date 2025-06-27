/**
 * Re-implementation of ukTq3pZ
 * @param {string} dZjY6_ – the (already-decoded) input string
 * @returns {string[]}    – array of 8-character “Y/N” blocks, one per byte
 */
function ynEncoder(dZjY6_) {
  // 1. Bit-to-letter map
  const mappings = { "0": "Y", "1": "N" };

  // 2. Encode UTF-8 bytes
  const wSXUngr = new TextEncoder().encode(dZjY6_);

  // 3. Transform each byte → 8-char “Y/N” string
  const buffer = Array.from(wSXUngr).map((F8Hpn4q) => {
    // 3a. Binary string, zero-padded to 8 bits
    const s3oKnc = F8Hpn4q.toString(2).padStart(8, "0");

    // 3b. Map each bit with the lookup table and join
    return s3oKnc
      .split("")
      .map((bit) => mappings[bit])
      .join("");
  });

  // The original snippet never joined the outer map’s result,
  // so we keep it as an array.  If you need a single flat string,
  // return buffer.join("");
  return buffer.join("");
}

// ── Quick demo ────────────────────────────────────────────────
// console.log(ynEncoder("CgJoaQ==").join(""));

// Script:
    // Input: CgJIaQ==
    // Output: YNYYYYNN YNNYYNNN YNYYNYNY YNYYNYYN YNNYYYYN YNYNYYYN YYNNNNYN YYNNNNYN
    // CgJoaQ==
    // Output: YNYYYYNN YNNYYNNN YNYYNYNY YNNYNNNN YNNYYYYN YNYNYYYN YYNNNNYN YYNNNNYN

// Website:
    // Input: Hi (CgJIaQ==)
    // Output: YNYYYYNN YNNYYNNN YNYYNYNY YNYYNYYN YNNYYYYN YNYNYYYN YYNNNNYN YYNNNNYN
    // Input: hi (CgJoaQ==)
    // Output: YNYYYYNN YNNYYNNN YNYYNYNY YNNYNNNN YNNYYYYN YNYNYYYN YYNNNNYN YYNNNNYN

module.exports = { ynEncoder };