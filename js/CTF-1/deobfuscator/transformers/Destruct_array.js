const t = require("@babel/types");

module.exports = {
    ExpressionStatement(path) {
        const { node } = path;
        const expr = node.expression;

        if (t.isAssignmentExpression(expr) &&
            t.isArrayPattern(expr.left) &&
            t.isArrayExpression(expr.right) &&
            expr.left.elements.length === expr.right.elements.length
        ) {
            const assignments = [];

            for (let i = 0; i < expr.left.elements.length; i++) {
                const left = expr.left.elements[i];
                const right = expr.right.elements[i];

                // Sanity check: ensure left is MemberExpression
                if (!t.isMemberExpression(left)) {
                    console.warn("[!] Unsupported left-hand side element:", left.type);
                    continue;
                }

                let rightExpr;
                if (t.isUnaryExpression(right) || t.isLiteral(right)) {
                    rightExpr = right;
                } else {
                    console.warn("[!] Unsupported right-hand side element:", right.type);
                    continue;
                }
                
                // Create new assignment expression
                const newExpr = t.expressionStatement(
                    t.assignmentExpression("=", left, rightExpr)
                );

                assignments.push(newExpr);
            }

            // Replace the entire destructuring expression statement
            path.replaceWithMultiple(assignments);
        }
    }
};
