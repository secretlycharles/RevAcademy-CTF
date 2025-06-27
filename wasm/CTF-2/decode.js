var key = "Zm~Ikilmeqs><m:i1>1991jl<ii1j0n=mm09;<i:u\x00\x00";

function copy_char() {
    var flag = "";
    for(let i = 0; i < key.length; i++) {
        flag += String.fromCharCode(key.charCodeAt(i) ^ 8);
    };
    console.log(flag);
};

function main() {
    copy_char();
};

main();