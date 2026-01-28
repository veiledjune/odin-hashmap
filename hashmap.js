import { LinkedList, Node } from './linked-list.js';

export class HashMap {
  constructor() {
    this.capacity = 16;
    this.array = new Array(this.capacity).fill(null);
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
    if (!arr[hashCode]) {
      arr[hashCode] = new LinkedList();
    }
    arr[hashCode].append(key, value);
    this.totalItems++;
    this.handleSize();
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

  has(key) {
    const arr = this.array;
    const hashCode = this.hash(key);
    if (!arr[hashCode]) return false;
    let current = arr[hashCode].head;
    while (current) {
      if (current.key === key) return true;
      current = current.nextNode;
    }
    return false;
  }

  remove(key) {
    const arr = this.array;
    const hashCode = this.hash(key);
    if (!arr[hashCode]) return false;
    let head = arr[hashCode].head;
    let current = head;
    let prev = null;
    while (current) {
      if (current.key === key) {
        if (current === head) {
          if (head.nextNode) {
            arr[hashCode].head = head.nextNode;
            this.totalItems--;
            return true;
          } else {
            arr[hashCode] = null;
            this.totalItems--;
            return true;
          }
        } else {
          prev.nextNode = current.nextNode;
          this.totalItems--;
          return true;
        }
      }
      prev = current;
      current = current.nextNode;
    }
    return false;
  }

  length() {
    return this.totalItems;
  }

  clear() {
    this.capacity = 16;
    this.array = new Array(this.capacity).fill(null);
    this.totalItems = 0;
    this.loadFactor = Math.round(0.75 * this.capacity);
  }

  keys() {
    const keys = [];
    const arr = this.array;
    arr.forEach((item) => {
      if (item) {
        let current = item.head;
        while (current) {
          keys.push(current.key);
          current = current.nextNode;
        }
      }
    });
    return keys;
  }

  values() {
    const values = [];
    const arr = this.array;
    arr.forEach((item) => {
      if (item) {
        let current = item.head;
        while (current) {
          values.push(current.value);
          current = current.nextNode;
        }
      }
    });
    return values;
  }

  entries() {
    const entries = [];
    const arr = this.array;
    arr.forEach((item) => {
      if (item) {
        let current = item.head;
        while (current) {
          entries.push([current.key, current.value]);
          current = current.nextNode;
        }
      }
    });
    return entries;
  }

  handleSize() {
    if (this.totalItems > this.loadFactor) {
      const entries = this.entries();
      this.capacity = this.capacity * 2;
      this.array = new Array(this.capacity).fill(null);
      this.totalItems = 0;
      this.loadFactor = Math.round(0.75 * this.capacity);
      entries.forEach((entry) => {
        const key = entry[0],
          value = entry[1];
        this.set(key, value);
      });
    }
  }
}
