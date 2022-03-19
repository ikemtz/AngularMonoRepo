import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { ChildFilterDescriptor } from './odata-state';

export function isFilterDescriptor(
  source: CompositeFilterDescriptor | FilterDescriptor | ChildFilterDescriptor,
): source is FilterDescriptor {
  return !!(source as FilterDescriptor)?.field;
}
