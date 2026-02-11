import {
  CompositeChildFilterDescriptor,
  ChildFilterDescriptor,
} from './odata-state';
import { ICompositeFilter } from 'imng-odata-client';
export function isCompositeChildFilterDescriptor(
  source:
    | CompositeChildFilterDescriptor
    | ChildFilterDescriptor
    | ICompositeFilter,
): source is CompositeChildFilterDescriptor {
  return !!(source as CompositeChildFilterDescriptor)?.filters;
}
