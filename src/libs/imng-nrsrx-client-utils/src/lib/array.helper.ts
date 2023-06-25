export function distinct<T>(arr: T[]): T[] {
  return arr.filter((value, index, array) => array.indexOf(value) === index);
}
/**
 * Will flatten an array of arrays into a single array
 * WARNING: This will only flatten two levels of arrays.
 * @param arr
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flat<T>(arr: T[] | any): T[] {
  //NOSONAR
  return arr.reduce((acc: T[], val: T[]) => acc.concat(val), []);
}
