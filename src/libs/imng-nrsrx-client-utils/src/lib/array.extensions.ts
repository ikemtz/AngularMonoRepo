import { distinct, flat } from './array.helper';

declare global {
  export interface Array<T> {
    distinct(): T[];
    flat(): T;
  }
}

if (!Array.prototype.distinct) {
  Array.prototype.distinct = function <T>(this: T[]): T[] {
    return distinct(this);
  };
}

if (!Array.prototype.flat) {
  Array.prototype.flat = function <T>(this: T[][] | T[]): T[] {
    return flat(this);
  };
}
export {};
