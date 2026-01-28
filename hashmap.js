export class HashMap {
  constructor() {
    this.capacity = 16;
    this.array = new Array(this.capacity);
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
}
