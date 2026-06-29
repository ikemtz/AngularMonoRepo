import { getBatches } from './get-batches';

describe('getBatches', () => {
  it('should split an array into batches', () => {
    const array = [1, 2, 3, 4, 5];
    const batchSize = 2;
    const batches = getBatches(array, batchSize);
    expect(batches).toHaveLength(3);
    expect(batches[0].batch).toEqual([1, 2]);
    expect(batches[1].batch).toEqual([3, 4]);
    expect(batches[2].batch).toEqual([5]);
  });

  it('should handle the default batch size', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const batches = getBatches(array);
    expect(batches).toHaveLength(2);
    expect(batches[0].batch).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(batches[1].batch).toEqual([11]);
  });

  it('should handle empty arrays', () => {
    const array: number[] = [];
    const batchSize = 2;
    const batches = getBatches(array, batchSize);
    expect(batches).toHaveLength(0);
  });
});
