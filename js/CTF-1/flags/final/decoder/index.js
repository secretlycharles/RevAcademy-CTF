
var flag = "¼Ê´ªÎÆ»¬º¹²«º©°­Ï©È¬©Æ²©©¥®Î©¬ªÏÆ¬§Ïº­§ÏÂ"

function decodeFlag(encodedFlag) {
    // decode first stage
    var hexString = encodedFlag.split("").map((byte) => {
        var hexValue = byte.charCodeAt(0).toString(16);
        return hexValue.toUpperCase();
    }).join("");
    console.log("Hex String:", hexString);

    var ynString = hexString.split("").map((hexChar) => {
        return hexChar
            .split("")                                  // each hex digit…
            .map(h => parseInt(h, 16)                   // → number 0-15
                        .toString(2)                   // → binary
                        .padStart(4, "0"))             // always 4 bits
            .join("")                                   // 0101…
            .split("")                                  // individual bits
            .map(b => (b === "1" ? "Y" : "N"))          // 1 ↔ Y, 0 ↔ N
            .join("");                                  // back to a flag string
    }).join("");
    console.log("YN String:", ynString);

    // 0. Strip any whitespace the caller left in
    yn = ynString.replace(/\s+/g, '');

    // 1. Reverse lookup table
    const rev = { Y: '0', N: '1' };

    // 2. Build an array of byte values
    const bytes = [];
    for (let i = 0; i < yn.length; i += 8) {
        const chunk = yn.slice(i, i + 8);
        if (chunk.length < 8) {
        throw new Error('Input length must be a multiple of 8 (got a dangling chunk).');
        }
        // Map Y/N → 0/1 then parse as binary
        const binary = chunk.split('').map(c => {
        if (!(c in rev)) throw new Error(`Invalid char “${c}” at pos ${i}.`);
        return rev[c];
        }).join('');
        bytes.push(parseInt(binary, 2));
    }

    // 3. Turn the byte array back into text
    const base64 = new TextDecoder().decode(Uint8Array.from(bytes));
    fs = require('fs');
    fs.writeFileSync('output.txt', base64, 'utf8');
    console.log("Base64:", atob(base64));
};

decodeFlag(flag);

