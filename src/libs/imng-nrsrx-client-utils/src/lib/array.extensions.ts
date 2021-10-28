import { distinct } from './array.helper';

declare global {
  export interface Array<T> {
    distinct(): T[];
  }
}

if (!Array.prototype.distinct) {
  Array.prototype.distinct = function <T>(this: T[]): T[] {
    return distinct(this);
  };
}
export {};
