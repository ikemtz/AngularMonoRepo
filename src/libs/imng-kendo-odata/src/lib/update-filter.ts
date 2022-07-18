import { CompositeFilterDescriptor, FilterDescriptor, isCompositeFilterDescriptor } from '@progress/kendo-data-query';

export function updateFilter(compositefilter: CompositeFilterDescriptor, newFilter: FilterDescriptor): CompositeFilterDescriptor {
  compositefilter.filters.forEach(subFilter => {
    if (isCompositeFilterDescriptor(subFilter)) {
      updateFilter(subFilter, newFilter);
    } else if (subFilter.field === newFilter.field) {
      compositefilter = {
        ...compositefilter,
        filters: [...compositefilter.filters.filter(f => isCompositeFilterDescriptor(f) ||
          f.field !== newFilter.field), newFilter]
      };
    }
  });
  return compositefilter;
}
