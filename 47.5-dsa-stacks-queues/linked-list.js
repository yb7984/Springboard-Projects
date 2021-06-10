/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const node = new Node(val);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      this.length = 1;
    } else {
      this.tail.next = node;
      this.tail = node;
      this.length++;
    }
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const node = new Node(val);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
      this.length = 1;
    } else {
      node.next = this.head;
      this.head = node;

      this.length++;
    }
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.head === null) {
      throw new Error("This list is empty!");
    }

    let currentNode = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;

      return currentNode.val;
    }

    while (currentNode.next !== this.tail) {
      currentNode = node.next;
    }

    const tail = this.tail;

    this.tail = currentNode;
    this.tail.next = null;

    this.length--;

    return tail.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0) {
      throw new Error("This list is empty!");
    }

    const node = this.head;

    if (node.next === null) {
      this.head = null;
      this.tail = null;
      this.length = 0;

      return node.val;
    }

    this.head = node.next;
    this.length--;

    return node.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0 || idx >= this.length) {
      throw new Error("Invalid index");
    }

    let i = 0;
    let current = this.head;
    while (i < idx && current.next) {
      current = current.next;
      i++;
    }

    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0 || idx >= this.length) {
      throw new Error("Invalid Index");
    }

    if (idx === this.length - 1) {
      this.tail.val = val;
    } else {

      let currentNode = this.head;
      let i = 0;

      while (i < idx) {
        currentNode = currentNode.next;
        i++;
      }

      currentNode.val = val;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) {
      throw new Error("Invalid Index");
    }

    const node = new Node(val);

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.length = 1;

      return;
    }

    if (idx === this.length) {
      this.tail.next = node;
      this.tail = node;

      this.length++;
    }

    let currentNode = this.head;
    let i = 0;

    while (i < idx - 1) {
      currentNode = currentNode.next;
      i++;
    }

    node.next = currentNode.next;
    currentNode.next = node;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (
      this.length === 0 ||
      idx < 0 ||
      idx >= this.length) {
      throw new Error("Invalid index!");
    }
    let currentNode;

    if (idx === 0) {
      currentNode = this.head;
      this.head = this.head.next;
      this.length--;

      if (this.length === 0) {
        this.tail = null;
      }

      return currentNode.val;
    }

    let i = 0;
    currentNode = this.head;

    while (i < idx - 1) {
      currentNode = currentNode.next;
      i++;
    }

    const preNode = currentNode;
    currentNode = currentNode.next;

    preNode.next = currentNode.next;
    this.length--;

    if (this.tail === currentNode) {
      this.tail = preNode;
    }

    return currentNode;
  }

  /** average(): return an average of all values in the list */

  average() {

    if (this.length === 0) {
      return 0;
    }


    let total = 0;

    let currentNode = this.head;
    total += currentNode.val;

    while (currentNode.next) {
      currentNode = currentNode.next;
      total += currentNode.val;
    }

    return total / this.length;
  }

  /** reverse(): reverses a linked list in place — not by creating a new list or new nodes.*/
  reverse() {

    if (this.length <= 1) {
      return;
    }
    const newHead = this.tail;
    const newTail = this.head;

    let currentNode = this.head;
    let nextNode = currentNode.next;

    currentNode.next = null;

    while (nextNode) {
      let nextNext = nextNode.next;
      nextNode.next = currentNode;
      currentNode = nextNode;
      nextNode = nextNext;
    }

    this.head = newHead;
    this.tail = newTail;
  }

  pivot(num) {
    let floorNode;
    let currentNode = this.head;
    let nextNode = currentNode.next;

    if (currentNode.val < num) {
      floorNode = currentNode;
    }

    while (nextNode) {

      console.log(currentNode, nextNode);

      let nextNext = nextNode.next;

      if (nextNode.val < num) {
        // if belong to the first part, move ahead, otherwise do nothing
        if (floorNode) {
          if (floorNode === currentNode) {
            floorNode = nextNode;
            currentNode = nextNode;
          } else {
            nextNode.next = floorNode.next;
            floorNode.next = nextNode;
            floorNode = nextNode;
            currentNode.next = nextNext;
          }
        } else {
          nextNode.next = this.head;
          this.head = nextNode;
          floorNode = nextNode;
          currentNode.next = nextNext;
        }
      } else {
        currentNode = nextNode;
      }
      nextNode = nextNext;
    }

    this.tail = currentNode;

  }


  /**
   * passed two linked lists, a and b, both of which are already sorted.
   * It should return a new linked list, in sorted order. 
   * */
  static SortSortedLinkedLists(lst1, lst2) {
    const lst = new LinkedList();

    let node1 = lst1.head;
    let node2 = lst2.head;

    while (node1 || node2) {
      if (node1 && node2) {
        if (node1.val < node2.val) {
          lst.push(node1.val);
          node1 = node1.next;
        } else {
          lst.push(node2.val);
          node2 = node2.next;
        }
      } else if (node1) {
        lst.push(node1.val);
        node1 = node1.next;
      } else if (node2) {
        lst.push(node2.val);
        node2 = node2.next;
      }
    }

    return lst;
  }
}

module.exports = LinkedList;
