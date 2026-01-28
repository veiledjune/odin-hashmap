import { LinkedList, Node } from './linked-list.js';

export class HashMap {
  constructor() {
    this.capacity = 16;
    this.array = new Array(this.capacity);
    this.totalItems = 0;
    this.loadFactor = Math.round(0.75 * this.capacity);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const arr = this.array;
    const hashCode = this.hash(key);
    const node = new Node(key, value);
    if (!arr[hashCode]) {
      arr[hashCode] = new LinkedList();
      arr[hashCode].head = node;
      this.totalItems++;
    } else {
      let current = arr[hashCode].head;
      while (current) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (!current.nextNode) {
          current.nextNode = node;
          this.totalItems++;
          return;
        } else current = current.nextNode;
      }
    }
  }

  get(key) {
    const arr = this.array;
    const hashCode = this.hash(key);
    if (!arr[hashCode]) return null;
    let current = arr[hashCode].head;
    while (current) {
      if (current.key === key) return current.value;
      current = current.nextNode;
    }
    return null;
  }
}
