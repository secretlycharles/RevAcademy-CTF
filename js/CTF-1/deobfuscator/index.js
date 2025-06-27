// Required stuff for babel
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generate = require("@babel/generator").default;

// Transformers
const R9pjeK_variablesTransformer = require("./transformers/R9pjeK_variables.js");
const Extra_stringliteralTransformer = require("./transformers/Extra_stringliteral.js");
const Misleading_funcTransformer = require("./transformers/Misleading_func.js");
const Destruct_arrayTransformer = require("./transformers/Destruct_array.js");
const Cfg_funcTransformer = require("./transformers/Cfg_func.js");
const qDsLhzT_funcTransformer = require("./transformers/qDsLhzT_func.js");

// File Utilites
const beautify = require("js-beautify");
const { readFileSync, writeFile } = require("fs");

function deobfuscate(code) {
    // Parse AST with permissive settings
    const ast = parser.parse(code, {
        sourceType: "script", 
    });

    // Visitors to deobfuscate challenge
    const transformers = [
        R9pjeK_variablesTransformer,
        Extra_stringliteralTransformer,
        Misleading_funcTransformer,
        Destruct_arrayTransformer,
        Cfg_funcTransformer,
        qDsLhzT_funcTransformer,
    ];

    for (const transformer of transformers) {
        if (typeof transformer.pre === "function") {
            transformer.pre(); // ✅ Call pre hook
        }

        if (transformer.visitor) {
            traverse(ast, transformer.visitor); // ✅ Call visitor
        } else {
            traverse(ast, transformer); // fallback
        }

        if (typeof transformer.post === "function") {
            transformer.post(); // ✅ Call post hook
        }
    }

    // Generate & Beautify Code
    let deobfuscatedCode = generate(ast, {
        comments: true,
        retainLines: true, // helps preserve original formatting
    }).code;

    // Write to output
    const outputPath = "../output/cleaned.js";
    writeFile(outputPath, deobfuscatedCode, (err) => {
        if (err) {
            console.error("[!] Failed to write code to file!", err);
        } else {
            console.log(`[+] Wrote file to ${outputPath}`);
        }
    });
}

function main() {
    try {
        console.log(`[+] Deobfuscating JS`);
        // Deobfuscate Challenge VM
        deobfuscate(
            readFileSync("../glue.js", "utf-8")
        );
        console.log(`[+] Finished Deobfuscating JS`);
    } catch(err) {
        console.log(`[!] Failed to deobfuscate JS!`, err);
    };
};

main();