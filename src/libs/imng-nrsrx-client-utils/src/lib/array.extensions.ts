import { distinct, flat } from './array.helper';

declare global {
  export interface Array<T> {
    distinct(): T[];
    flat(): T;
  }
}

if (!Array.prototype.distinct) {
  Array.prototype.distinct = function <T>(this: T[]): T[] { //NOSONAR
    return distinct(this);
  };
}

if (!Array.prototype.flat) {
  Array.prototype.flat = function <T>(this: T[][] | T[]): T[] { //NOSONAR
    return flat(this);
  };
}
export { };
