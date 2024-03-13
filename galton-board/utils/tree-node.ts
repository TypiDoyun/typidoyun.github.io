class TreeNode {
    private children: TreeNode[] = [];

    constructor(
        private vector: Vector,
        public readonly id: string = "node"
    ) {}

    public get length(): number {
        return this.children.length;
    }

    public *iterateChildren() {
        for (const child of this.children) {
            yield child;
        }
    }

    public appendChild(node: TreeNode): void {
        this.children.push(node);
    }

    public setChild(index: number, node: TreeNode): boolean {
        if (index > this.children.length) return false;

        this.children[index] = node;

        return true;
    }

    public getChild(index: number): TreeNode | undefined {
        return this.children[index];
    }

    public getVector(): Vector {
        return this.vector;
    }

    public toString() {
        return `{ TreeNode ${this.id} }`;
    }
}