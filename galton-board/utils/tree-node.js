class TreeNode {
    vector;
    id;
    children = [];
    constructor(vector, id = "node") {
        this.vector = vector;
        this.id = id;
    }
    get length() {
        return this.children.length;
    }
    *iterateChildren() {
        for (const child of this.children) {
            yield child;
        }
    }
    appendChild(node) {
        this.children.push(node);
    }
    setChild(index, node) {
        if (index > this.children.length)
            return false;
        this.children[index] = node;
        return true;
    }
    getChild(index) {
        return this.children[index];
    }
    getVector() {
        return this.vector;
    }
    toString() {
        return `{ TreeNode ${this.id} }`;
    }
}
