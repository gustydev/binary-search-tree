class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function sortArray(arr) {
    arr.sort((a, b) => { return a - b }); // Sorts numerically
    arr = [...new Set(arr)]; // Removes duplicates
    return arr;
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(sortArray(arr));
    }
    buildTree(arr, start = 0, end = arr.length - 1) {
        if (start > end) {
            return null; // Base case
        }
        const mid = Math.round((start + end) / 2);
        const node = new Node(arr[mid]);

        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);

        return node;
    }
    find(value) {
        let currentNode = this.root;
        while (currentNode.left !== null && currentNode.right !== null) {
            if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
        }
        if (currentNode.data === value) {
            return currentNode;
        } else {
            return null;
        }
    }
    insert(value) {
        if (this.find(value)) {
            throw new Error('Value is already in the tree')
        }
        let currentNode = this.root;
        let previousNode;
        while (!(currentNode.left === null && currentNode.right === null)) {
            previousNode = currentNode;
            if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
            if (!currentNode) { // In case of previous node not being a leaf
                if (previousNode.data < value) {
                    previousNode.right = new Node(value); // Make a new leaf node
                } else {
                    previousNode.left = new Node(value);
                }
                return;
            }
        }
        // if this part is reached, it means currentNode is a leaf node
        if (value > currentNode.data) { currentNode.right = new Node(value) }
        else { currentNode.left = new Node(value) }
    }
    delete(value) {
        if (!this.find(value)) {
            throw new Error('Value is not in the tree');
        }

    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]; 
// After sorting and getting rid of dupes, length 11. End = index 10
// [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]

const tree = new Tree(testArr);
// console.log(tree)
// console.log(prettyPrint(tree.root))

tree.insert(69)// nice
// console.log(prettyPrint(tree.root))

tree.insert(6)
tree.insert(68)

console.log(prettyPrint(tree.root))
console.log('the sussy')
tree.insert(70)
tree.insert(71) // Tree becomes unbalanced starting from this one!!! Height difference more than 1
tree.insert(72)
tree.insert(2)
tree.insert(-1)
console.log(prettyPrint(tree.root))

