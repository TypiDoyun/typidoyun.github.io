class Tree {
    constructor(
        private readonly root: TreeNode
    ) {};

    public getRoot(): TreeNode {
        return this.root;
    }

    public getNthChild(n: number): TreeNode | undefined {
        let index = 0;

        for (const child of this) {
            if (index === n - 1) {
                return child;
            }

            index++;
        }

        return;
    }

    public *[Symbol.iterator]() {
        const queue = [ this.root ];
        const visited = new Set();

        while (queue.length > 0) {
            const node = queue.shift()!;

            if (visited.has(node)) continue;

            visited.add(node);

            for (const child of node.iterateChildren()) {
                queue.push(child);
            }

            yield node;
        }
    }
}