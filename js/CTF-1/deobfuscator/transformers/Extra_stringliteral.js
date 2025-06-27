
module.exports = {
    StringLiteral(path) {
        const { node } = path;
        if (node.extra) {
            delete node.extra;
        }
    }
}
