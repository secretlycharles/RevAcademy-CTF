function encoder(LJyFtev) {
  LJyFtev = LJyFtev.replace(/\s/g, "");
  // Step 2: Prepare output
  let result = [];

  // Step 3: Iterate 4 characters at a time
  for (let i = 0; i < LJyFtev.length; i += 4) {
    // 4-letter binary sequence (e.g., "YYNY")
    let segment = LJyFtev.slice(i, i + 4);
    let value = 0;

    for (let j = 0; j < 4; j++) {
      // R9pjeK[d2BtbZc + 0x29b] is assumed to be "Y" (i.e., bit = 1 if "Y")
      value = value * 2 + (segment[j] === "Y" ? 1 : 0);
    }

    // Log and store
    // console.log(
    //   `(cJskyP6) Before Processed: ${value}, Processed ${value.toString(16)}`
    // );
    result.push(value.toString(16)); // hex format
  }
    // Step 5: Join the result
    console.log(result)
    return result.join("").toUpperCase();
}

module.exports = { encoder };
