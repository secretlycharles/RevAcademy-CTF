const data1 = "\x9d\x6e\x93\xc8\xb2\xb9\x41\x8b\xc2\x97\xd4\x66\xc7\x93\xc4\xd4" +
              "\x61\xc2\xc6\xc9\xdd\x62\x94\x9e\xc2\x89\x32\x91\x90\xc1\xdd\x33" +
              "\x91\x91\x97\x8b\x64\xc1\x92\xc4\x90\x00\x00";
const key = "\xed\x07\xf0\xa7\xf1";

function copy_char() {
    var flag = "";
    for(let i = 0; i < data1.length; i++) {
        flag += String.fromCharCode(
            data1.charCodeAt(i) ^ key.charCodeAt(i % 5)
        );
    };  
    console.log(flag);
};

function main() {
    copy_char();
};

main();