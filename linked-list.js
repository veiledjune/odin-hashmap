export class LinkedList {
  constructor() {
    this.head = null;
  }
  append(key, value) {
    const node = new Node(key, value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;

      while (current.nextNode) current = current.nextNode;

      current.nextNode = node;
    }
  }
}

export class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}
