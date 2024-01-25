class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = [left];
        this.right = [right];
    }
}

const testnode = new Node('panda');
console.log(testnode)