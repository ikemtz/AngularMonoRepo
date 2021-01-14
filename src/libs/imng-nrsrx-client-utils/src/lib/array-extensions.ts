declare global {
  export interface Array<T> {
    distinct(): T[];
  }
}

if (!Array.prototype.distinct) {
  Array.prototype.distinct = function <T>(this: T[]): T[] {
    return this.filter((value, index, array) => array.indexOf(value) === index);
  };
}
export { };
