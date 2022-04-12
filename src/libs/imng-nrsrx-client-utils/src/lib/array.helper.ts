export function distinct<T>(arr: T[]): T[] {
  return arr.filter((value, index, array) => array.indexOf(value) === index);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flat<T>(arr: T[] | any): T[] { //NOSONAR
  return arr.reduce((acc: T[], val: T[]) => acc.concat(val), []);
}
