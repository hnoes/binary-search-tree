class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val === current.val) return undefined;
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  insertRecursively(val, node = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.left);
    } else if (val > node.val) {
      if (!node.right) {
        node.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.right);
    }

    return undefined;
  }

  find(val) {
    if (!this.root) return undefined;
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  findRecursively(val, node = this.root) {
    if (!node) return undefined;
    if (val === node.val) return node;
    if (val < node.val) return this.findRecursively(val, node.left);
    if (val > node.val) return this.findRecursively(val, node.right);
  }

  dfsPreOrder() {
    const visited = [];
    function traverse(node) {
      visited.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return visited;
  }

  dfsInOrder() {
    const visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return visited;
  }

  dfsPostOrder() {
    const visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.val);
    }
    traverse(this.root);
    return visited;
  }

  bfs() {
    const visited = [];
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      visited.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return visited;
  }

  remove(val) {
    const removeNode = (node, val) => {
      if (!node) return null;
      if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else if (val > node.val) {
        node.right = removeNode(node.right, val);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        const minRight = this.findMin(node.right);
        node.val = minRight.val;
        node.right = removeNode(node.right, minRight.val);
        return node;
      }
    };

    this.root = removeNode(this.root, val);
    return this;
  }

  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  isBalanced() {
    const checkBalance = (node) => {
      if (!node) return 0;
      const leftHeight = checkBalance(node.left);
      if (leftHeight === -1) return -1;
      const rightHeight = checkBalance(node.right);
      if (rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;
      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkBalance(this.root) !== -1;
  }

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let current = this.root;
    while (current) {
      if (current.left && !current.right) {
        return current.left.val;
      }
      if (current.right && !current.right.left && !current.right.right) {
        return current.val;
      }
      current = current.right;
    }
  }
}

module.exports = BinarySearchTree;
