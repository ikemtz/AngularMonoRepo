import { CompositeFilterDescriptor, FilterDescriptor, isCompositeFilterDescriptor } from '@progress/kendo-data-query';
import { ODataState } from './odata-state'; 

export function findMatchingFilters(odataState: ODataState, filterField: string): FilterDescriptor | undefined {
  if (!odataState.filter) {
    return;
  }
  return flattenCompositeFilters(odataState.filter).find((x) => x.field === filterField);
}

export function flattenCompositeFilters(filters: CompositeFilterDescriptor): FilterDescriptor[] {
  return filters.filters.map((x) => (isCompositeFilterDescriptor(x) ? flattenCompositeFilters(x) : [x])).flat();
}
