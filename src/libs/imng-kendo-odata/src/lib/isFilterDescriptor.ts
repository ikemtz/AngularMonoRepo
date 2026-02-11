import {
  CompositeFilterDescriptor,
  FilterDescriptor,
} from '@progress/kendo-data-query';
import { ChildFilterDescriptor } from './odata-state';
import { ICompositeFilter, IFilter } from 'imng-odata-client';

export function isFilterDescriptor(
  source:
    | CompositeFilterDescriptor
    | FilterDescriptor
    | ChildFilterDescriptor
    | ICompositeFilter
    | IFilter,
): source is FilterDescriptor {
  return !!(source as FilterDescriptor)?.field;
}
