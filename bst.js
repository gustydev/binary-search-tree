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
    isLeaf(node) {
        if (node.left === null && node.right === null) {
            return true;
        } else {
            return false;
        }
    }
    find(value) {
        let currentNode = this.root;
        while ((currentNode)) {
            if (value === currentNode.data) {
                return currentNode;
            } else {
                if (value > currentNode.data) {
                    currentNode = currentNode.right;
                } else if (value < currentNode.data) {
                    currentNode = currentNode.left;
                }
            }
        }
        if (!currentNode) {
            // value not found
            return null;
        }
    }
    insert(value) {
        if (this.find(value)) {
            throw new Error('Value is already in the tree')
        }
        let currentNode = this.root;
        let previousNode;
        while ((currentNode)) {
            previousNode = currentNode;
            if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
        }
        if (!currentNode) {
            if (previousNode.data < value) {
                previousNode.right = new Node(value);
            } else {
                previousNode.left = new Node(value);
            }
            return;
        }
    }
    delete(value) {
        if (!this.find(value)) {
            throw new Error('Value is not in the tree');
        }
        let currentNode = this.root;
        let previousNode;
        while (currentNode.data !== value) {
            previousNode = currentNode;
            if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
        }
        console.log(previousNode.data, currentNode.data)
        if (this.isLeaf(currentNode)) {
            // Case 1: node to be removed is a leaf
            if (currentNode.data > previousNode.data) {
                previousNode.right = null;
            } else {
                previousNode.left = null;
            }
        } else if (Boolean(currentNode.left) !== Boolean(currentNode.right)) {
            // Case 2: node has one child
            previousNode.data = currentNode.data;
            previousNode.left = currentNode.left;
            previousNode.right = currentNode.right;
        } else {
            return
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
tree.insert(70)
tree.insert(71) // Tree becomes unbalanced starting from this one!!! Height difference more than 1
tree.insert(72)
tree.insert(2)
tree.insert(-1)

tree.delete(72)
console.log(prettyPrint(tree.root))
tree.delete(3)
console.log(prettyPrint(tree.root))
