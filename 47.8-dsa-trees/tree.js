/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {

    const _sumValues = (node) => {

      if (!node) {
        return 0;
      }

      let total = node.val;
      if (node.children) {
        node.children.forEach(child => {
          total += _sumValues(child);
        })
      }

      return total;
    }
    return _sumValues(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let count = 0;

    const _countEvens = (node) => {
      if (!node) {
        return;
      }

      if (node.val % 2 === 0) {
        count++;
      }
      if (node.children) {
        node.children.forEach(child => {
          _countEvens(child);
        })
      }
    }

    _countEvens(this.root);

    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {

    let count = 0;

    const _countGreater = (lowerBound, node) => {
      if (!node) {
        return;
      }

      if (node.val > lowerBound) {
        count++;
      }

      if (!node.children) {
        return;
      }
      node.children.forEach(child => {
        _countGreater(lowerBound, child);
      })
    }
    _countGreater(lowerBound, this.root);

    return count;
  }
}

module.exports = { Tree, TreeNode };
