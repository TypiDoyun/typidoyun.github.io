class Tree {
    root;
    constructor(root) {
        this.root = root;
    }
    ;
    getRoot() {
        return this.root;
    }
    getNthChild(n) {
        let index = 0;
        for (const child of this) {
            if (index === n - 1) {
                return child;
            }
            index++;
        }
        return;
    }
    *[Symbol.iterator]() {
        const queue = [this.root];
        const visited = new Set();
        while (queue.length > 0) {
            const node = queue.shift();
            if (visited.has(node))
                continue;
            visited.add(node);
            for (const child of node.iterateChildren()) {
                queue.push(child);
            }
            yield node;
        }
    }
}
