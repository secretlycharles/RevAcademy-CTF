const types = require("@babel/types");

var mapper = [];

module.exports = {
    VariableDeclarator(path) {
        const { node } = path;
        const { id, init } = node;

        // Parse elements
        if(id.name == "R9pjeK") {
            for (let i = 0; i < init.elements.length; i++) {
                const element = init.elements[i];
                if(element && element.type === "StringLiteral" && element.extra) {
                    delete element.extra;
                };

                if(element.type === "StringLiteral") {
                    mapper.push(element.value);
                } else if(element.type === "NumericLiteral") {
                    mapper.push(element.value);
                } else if(element.type === "NullLiteral") {
                    mapper.push(null);
                } else if(element.type === "UnaryExpression" && element.operator === "void" && element.argument.type === "NumericLiteral" && element.argument.value === 0) {
                    mapper.push(undefined);
                } else if(element.type ==="UnaryExpression" && element.operator === "!" && element.argument.type === "NumericLiteral" && element.argument.value === 0) {
                    mapper.push(true);
                } else if(element.type ==="UnaryExpression" && element.operator === "!" && element.argument.type === "NumericLiteral" && element.argument.value === 1) {
                    mapper.push(false);
                } else {
                    console.log("[!] Unknown element type in mapper array:", element);
                };
            };
            console.log("[+] Parsed mapper array with", mapper.length, "elements");
        };
    },
    MemberExpression(path) {
        const { node } = path;
        const { object, property } = node;

        // Replace member expressions
        if(object.type === "Identifier" && object.name === "R9pjeK" && property.type === "NumericLiteral") {
            const index = property.value;
            if(index >= 0 && index < mapper.length) {
                console.log(`[+] Replacing R9pjeK[${index}] with ${JSON.stringify(mapper[index])}`);
                const value = mapper[index];
                if(value === undefined) {
                    path.replaceWith(types.identifier("undefined"));
                } else if(value === null) {
                    path.replaceWith(types.nullLiteral());
                } else if(typeof value === "boolean") {
                    path.replaceWith(types.booleanLiteral(value));
                } else if(typeof value === "number") {
                    path.replaceWith(types.numericLiteral(value));
                } else if(typeof value === "string") {
                    path.replaceWith(types.stringLiteral(value));
                } else {
                    console.log("[!] Unknown value type in mapper array:", value);
                };
            } else {
                console.log("[!] Index out of bounds in mapper array:", index);
            };
        };
    }
}