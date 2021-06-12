/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }


  _goDeep(node, depth, setDepth) {
    if (!node) {
      setDepth(depth);
      return;
    }

    depth++;

    if (!node.left && !node.right) {
      setDepth(depth);
      return;
    }

    if (node.left) {
      this._goDeep(node.left, depth, setDepth);
    }
    if (node.right) {
      this._goDeep(node.right, depth, setDepth);
    }
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let mininum = null;

    const _setMinDepth = (depth) => {
      if (mininum === null) {
        mininum = depth;
        return;
      }

      if (mininum > depth) {
        mininum = depth;
        return;
      }
    }

    this._goDeep(this.root, 0, _setMinDepth);

    return mininum;
  }



  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let maximum = null;

    const _setMaximum = (depth) => {
      if (maximum === null) {
        maximum = depth;
        return;
      }

      if (maximum < depth) {
        maximum = depth;
        return;
      }
    }

    this._goDeep(this.root, 0, _setMaximum);

    return maximum;

  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {

    let max = 0;

    const _maxSum = (node) => {
      if (!node) {
        return 0;
      }

      const left = _maxSum(node.left);
      const right = _maxSum(node.right);

      max = Math.max(max, node.val + left + right);

      return Math.max(0, left + node.val, right + node.val);
    }

    _maxSum(this.root);

    return max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = null;

    const _nextLarger = (lowerBound, node) => {
      if (node === null) {
        return;
      }

      if (node.val > lowerBound) {
        if (result == null || result > node.val) {
          result = node.val;
        }
      }

      _nextLarger(lowerBound, node.left);
      _nextLarger(lowerBound, node.right);
    }

    _nextLarger(lowerBound, this.root);

    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

    const _findNode = (node, parent, level) => {
      if (parent === null) {
        return [null, -1];
      }

      if (parent === node) {
        return [null, level];
      }

      if (parent.left === node || parent.right === node) {
        return [parent, level + 1];
      }

      const result = _findNode(node, parent.left, level + 1);

      if (result[0] === null && result[1] === -1) {
        return _findNode(node, parent.right, level + 1);
      }
      return result;
    }

    const [parent1, level1] = _findNode(node1, this.root, 1);
    const [parent2, level2] = _findNode(node2, this.root, 1);

    if (parent1 !== parent2 && level1 === level2) {
      return true;
    }

    return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {

    const values = [];

    const getMaxDepth = (node, depth = 0) => {
      if (!node) {
        return depth;
      }

      const newDepth = depth + 1;

      if (!node.left && !node.right) {
        return newDepth;
      }

      return Math.max(getMaxDepth(node.left, newDepth), getMaxDepth(node.right, newDepth));
    }

    const maxDepth = getMaxDepth(tree.root, 0);

    for (let i = 0; i < maxDepth; i++) {
      values[i] = [];
    }

    const serializeNode = (node, depth = 0) => {
      if (node === null) {
        // if node is null, fill in the spaces with empty string
        for (let i = depth; i < maxDepth; i++) {
          values[i] = values[i].concat(Array(Math.pow(2, i - depth)).fill(""));
        }

        return;
      }

      // push in the value
      values[depth].push(node.val);

      // push in the children
      serializeNode(node.left, depth + 1);
      serializeNode(node.right, depth + 1);
    }

    serializeNode(tree.root, 0);

    return values.map(arr => arr.join(",")).join("|");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(str) {
    if (!str) {
      return null;
    }

    const values = str.split("|").map(item => item.split(","));

    const nodes = [];
    for (let depth = 0; depth < values.length; depth++) {
      nodes[depth] = [];

      values[depth].forEach((value, i) => {
        if (value === "") {
          nodes[depth].push(null);
          return;
        }

        if (depth === 0) {
          nodes[0][0] = new BinaryTreeNode(parseInt(value));
        }
        else {
          const node = new BinaryTreeNode(parseInt(value));
          const parent = nodes[depth - 1][Math.floor(i / 2)];
          nodes[depth].push(node);
          if (i % 2 === 0) {
            parent.left = node;
          } else {
            parent.right = node;
          }
        }
      });
    }

    return new BinaryTree(nodes[0][0]);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

    const _findPath = (node, parent, path = []) => {

      if (parent === null) {
        return false;
      }

      if (node === parent) {
        return [...path, node];
      }

      let newPath = _findPath(node, parent.left, [...path, parent]);
      if (newPath === false) {
        newPath = _findPath(node, parent.right, [...path, parent]);
      }

      return newPath;
    }

    const path1 = _findPath(node1, this.root, []);
    const path2 = _findPath(node2, this.root, []);


    if (path1 === false && path2 === false) {
      return null;
    }

    for (let i = path1.length - 1; i >= 0; i--) {
      if (path2.includes(path1[i])) {
        return path1[i];
      }
    }

    return null;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
