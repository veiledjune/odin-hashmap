export class LinkedList {
  constructor() {
    this.head = null;
  }
}

export class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}
