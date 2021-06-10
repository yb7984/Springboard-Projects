
/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this._list = [];
  }

  get first() {
    if (this._list.length === 0) {
      return null;
    }
    return this._list[this._list.length - 1];
  }

  get last() {
    return this._list[0] || null;
  }

  get size() {
    return this._list.length;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    this._list.push(val);
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (this._list.length === 0){
      throw new Error("This stack is empty!");
    }
    return this._list.pop();
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return (this.size === 0);
  }
}

module.exports = Stack;
