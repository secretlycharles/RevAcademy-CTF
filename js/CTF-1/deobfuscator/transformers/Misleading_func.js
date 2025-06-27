const types = require("@babel/types");

module.exports = {
  CallExpression(path) {
    const { node } = path;

    if (node.callee.name === "WRu5ZJi") {
      const replacementStatements = node.arguments.map((arg, idx) => {
        return path.scope.buildUndefinedNode
          ? types.expressionStatement(arg) // fallback
          : types.expressionStatement(arg);
      });

      // Replace the whole call expression statement
      if (path.parentPath.isExpressionStatement()) {
        path.replaceWithMultiple(replacementStatements);
      } else {
        // WRu5ZJi is used in some expression context? Log it.
        console.warn(
          "[-] WRu5ZJi is not a top-level expression statement. Manual review might be needed."
        );
      }
    }
  },
};
