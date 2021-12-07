import { findAndMerge } from './find-and-merge';
import { IdType } from 'imng-nrsrx-client-utils';
/**
 * Spreads the objects in the dataset1, with a matching id object from the dataset2.
 * @param dataset1 The original dataset, these are the records you can expect to get back.
 * @param dataset2 This dataset will be used to augment the individuals records in dataSet1, records will be matched based on 'id'.
 * @returns dataset1
 */
export function matchAndSpread<ENTITY1 extends { id?: IdType }, ENTITY2 extends { id?: IdType }>(
  dataset1: ENTITY1[],
  dataset2: ENTITY2[],
): ENTITY1[] {
  return dataset1.map((d1) => findAndMerge(d1, dataset2));
}
