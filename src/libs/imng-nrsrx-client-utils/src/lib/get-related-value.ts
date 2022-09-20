export function getRelatedValue<ENTITY>(
  obj: ENTITY,
  ...segments: string[]
): unknown | undefined | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = obj; //NOSONAR
  segments.forEach((segment) => {
    if (result) {
      result = result[segment];
    }
  });
  return result;
}
