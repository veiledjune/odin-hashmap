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

  delete(key) {
    let head = this.head;
    let current = head;
    let prev = null;
    while (current) {
      if (current.key === key) {
        if (current === head) {
          if (head.nextNode) {
            this.head = head.nextNode;
            return true;
          } else {
            this.head = null;
            return true;
          }
        } else {
          prev.nextNode = current.nextNode;
          return true;
        }
      }
      prev = current;
      current = current.nextNode;
    }
    return false;
  }

  find(key) {
    let current = this.head;
    while (current) {
      if (current.key === key) return current;
      current = current.nextNode;
    }
    return null;
  }
}

export class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}
