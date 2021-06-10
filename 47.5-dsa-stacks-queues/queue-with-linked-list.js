const LinkedList = require('./linked-list');
/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
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

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    this._list.push(val);
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    return this._list.shift();
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    if (this.size === 0) {
      throw new Error("This queue is empty!");
    }

    return this.first.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return (this.size === 0);
  }
}

module.exports = Queue;
