
const { encodeInputToBase64 } = require('./utils/base64');
const { encoder } = require('./utils/encoder');
const { ynEncoder } = require('./utils/yn');

function main() {
    const result = encodeInputToBase64("JS_CHALLENGE{b10bf15hb10bf15hb10bf15hb10bf15h}");
    console.log("Encoded Base64:", result);


    const ynResult = ynEncoder(result);
    console.log("YN Encoded Result:", ynResult);

    // we've inverted this
    const hexResult = encoder(ynResult);
    console.log("Hex Encoded Result:", hexResult);

    // we've inverted this
    var val = hexResult.match(new RegExp(".{1,2}", "g"))["map"]((F8Hpn4q) => {
        console.log(`Mapping: ${F8Hpn4q}, ${parseInt(F8Hpn4q, 16)}`);
        return parseInt(F8Hpn4q, 16);
    })["map"](
        (...F8Hpn4q) => {
            console.log(
                `Processing ${String.fromCharCode(F8Hpn4q[0])}, ${F8Hpn4q[0]}`
            );
            return String.fromCharCode(F8Hpn4q[0]);
        }
    );
    console.log("Final Result:", val.join("")['replace'](new RegExp("\x97", 'g'),"")['replac' + "e"](
                new RegExp(
                  "\x99",
                  "g"
                ),
                ""
              )['replace'](new RegExp("\x93", "g"), ""));

    fs = require('fs');
    fs.writeFileSync('output.txt', val.join("")['replace'](new RegExp("\x97", 'g'),"")['replac' + "e"](
                new RegExp(
                  "\x99",
                  "g"
                ),
                ""
              )['replace'](new RegExp("\x93", "g"), ""), 'utf8');
};

main();
