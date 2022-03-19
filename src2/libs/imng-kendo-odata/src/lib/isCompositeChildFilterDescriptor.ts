import { CompositeChildFilterDescriptor, ChildFilterDescriptor } from './odata-state';

export function isCompositeChildFilterDescriptor(
  source: CompositeChildFilterDescriptor | ChildFilterDescriptor,
): source is CompositeChildFilterDescriptor {
  return !!(source as CompositeChildFilterDescriptor)?.filters;
}
