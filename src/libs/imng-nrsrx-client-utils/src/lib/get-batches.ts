import { BatchInfo } from './batch-info';

export function getBatches<T>(array: T[], batchSize = 10): BatchInfo<T>[] {
  const batches: BatchInfo<T>[] = [];
  const batchCount = Math.ceil(array.length / batchSize);
  for (let i = 0; i < array.length; i += batchSize) {
    batches.push({
      data: array.slice(i, i + batchSize),
      num: Math.floor(i / batchSize) + 1,
      count: batchCount,
    });
  }
  return batches;
}
