const LinkedList = require('./linked-list');

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this._list = new LinkedList();
  }

  get first() {
    return this._list.head;
  }

  get last() {
    return this._list.tail;
  }

  get size() {
    return this._list.length;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    this._list.unshift(val);
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    return this._list.shift();
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return (this.size === 0);
  }
}

module.exports = Stack;
