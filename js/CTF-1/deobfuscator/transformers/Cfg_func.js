
// let mappings = {};
// let currentFunc = null;
// let generatorFuncs = [];

// module.exports = {
//     pre() {
//         mappings = {};
//         generatorFuncs = [];
//     },
//     visitor: {
//         FunctionDeclaration(path) {
//             const { node } = path;
//             var { id, body } = node;

//             // Check if the function is a generator, map out the function declaration for CFG if it isn't
//             if(!node.generator) {
//                 for(var expr of body.body) {
//                     if (expr.type === "FunctionDeclaration" && expr.generator) {
//                         // Map out the function declaration
//                         //console.log(`========================================`);
//                         //console.log(`[!] Outside Func: ${id.name}, Inner Func: ${expr.id.name}, Args: ${expr.params.length-1}`);

//                         // Push for further processing
//                         generatorFuncs.push({
//                             "parent": node,
//                             "func": expr
//                         });

//                         // Mapout variables
//                         currentFunc = `${id.name}-${expr.id.name}`;
//                         mappings[currentFunc] = {};
//                         for(var param of expr.params) {
//                             if (param.type === "Identifier") {
//                                 mappings[currentFunc][param.name] = null;
//                             } else if(param.type === "AssignmentPattern") {
//                                 // Fetch object name
//                                 const { left, right } = param;

//                                 // Get object
//                                 const property = right.properties[0];
//                                 const { key, value } = property;

//                                 // Mapout key for cfg
//                                 mappings[currentFunc][left.name] = {
//                                     [`${key['name']}`]: {}
//                                 };
//                                 //console.log(left.name, key.name, value.type);
//                             };
//                         };
//                         //console.log(`[!] Mappings: ${JSON.stringify(mappings[currentFunc])}`);
//                     } else if (expr.type === "ExpressionStatement") {
//                         const { expression } = expr;
//                         if(expression.type === "AssignmentExpression") {
//                             const { left, right } = expression;
//                             if(right.type === "MemberExpression" && right.object.callee) {
//                                 for(var arg of right.object?.callee.object.arguments) {
//                                     if(arg.type === "NumericLiteral") {
//                                         //console.log(`[!] Found numeric literal in MemberExpression: ${arg.value}`);
//                                         for(const [key, value] of Object.entries(mappings[currentFunc])) {
//                                             // Only replace if value is null
//                                             if(value == null) {
//                                                 mappings[currentFunc][key] = arg.value;
//                                                 break;
//                                             };
//                                         };
//                                         //console.log(mappings);
//                                     } else if(arg.type === "UnaryExpression" && arg.operator === "-") {
//                                         //console.log(`[!] Found unary expression in MemberExpression: ${arg.operator}${arg.argument.value}`);
//                                         for(const [key, value] of Object.entries(mappings[currentFunc])) {
//                                             // Only replace if value is null
//                                             if(value == null) {
//                                                 mappings[currentFunc][key] = -arg.argument.value;
//                                                 break;
//                                             };
//                                         };
//                                         //console.log(mappings);
//                                     }
//                                 };
//                             }
//                         }
//                     }
//                 }
//             };
//         }
//     },
//     post() {
//         for(const { parent, func } of generatorFuncs) {
//             var key = `${parent.id.name}-${func.id.name}`;
//             var mapped = mappings[key];
//             if(parent.id.name === "rDpsqLr" && func.id.name === "F8Hpn4q") {
//                 console.log(`========================================`);
//                 console.log(`[!] Generator Function: ${key}, Mappings: ${JSON.stringify(mapped)}`);
//                 const switchStatement = func.body.body[0].body.body;

//                 // Mapout binary opeartions
//                 const discriminant = switchStatement.discriminant;
//                 const identifiers = extractIdentifiers(discriminant);
//                 console.log(`[!] Discriminant:`, identifiers);

//                 // Calculate cases
//                 var total = 0;
//                 for(var identifier of identifiers) {
//                     if(!mapped[identifier]) 
//                         throw new Error(`Identifier ${identifier} not found in mappings!`);
//                     total += mapped[identifier];
//                 };
//                 console.log(`[!] Total: ${total}`);

//                 var data = evaluateSwitch(switchStatement.cases, mapped, total);
//                 console.log(`[!] Evaluated Switch: ${data}`);
//             }
//         }
//     }
// }

// function evaluateSwitch(cases, mapped, value) {
//     for(let i = 0; i < cases.length; i++) {
//         caseClause = cases[i];
//         switch (caseClause.test?.type) {
//             case 'NumericLiteral':
//                 console.log(`[!] Evaluating NumericLiteral: ${caseClause.value}`);
//                 break;
//             case 'UnaryExpression':
//                 if(caseClause.test.operator === '-') {
//                     console.log(`[!] Evaluating UnaryExpression: ${caseClause.test.operator}${caseClause.test.argument.value}`);
//                     if(value === -caseClause.test.argument.value)
//                         return true;
//                 } else {
//                     throw new Error(`Unsupported UnaryExpression operator: ${caseClause.test.operator}`);
//                 }
//                 break;
//             case 'BinaryExpression':
//                 break;
//             case 'LogicalExpression':
//                 break;
//             default:
//                 if(caseClause.test === null) {
//                     console.log(`[!] Evaluating Case: ${caseClause.test}`);
//                 } else {
//                     throw new Error(`Unsupported case type: ${caseClause.test.type}`);
//                 }
//                 break;
//         };
//     };
//     return false; // Default return if no case matches
// };

// function extractIdentifiers(node, collected = []) {
//   if (!node) return collected;

//   if (node.type === 'Identifier') {
//     collected.push(node.name);
//   } else if (node.type === 'BinaryExpression' && node.operator === '+') {
//     extractIdentifiers(node.left, collected);
//     extractIdentifiers(node.right, collected);
//   } else {
//     throw new Error(`Unsupported node type: ${node.type}`);
//   }

//   return collected;
// }

// this really wasn't needed, i just ended up stepping and logging.. the obfuscation was pretty simple but tedious