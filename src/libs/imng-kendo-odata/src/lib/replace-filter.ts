import { CompositeFilterDescriptor, FilterDescriptor, isCompositeFilterDescriptor } from '@progress/kendo-data-query';
import { isFilterDescriptor } from './isFilterDescriptor';
import { ODataState } from './odata-state';

export function removeMatchingFilters(odataState: ODataState, filterField: string): ODataState {
  return {
    ...odataState,
    filter: !odataState.filter
      ? { logic: 'and', filters: [] }
      : { ...odataState.filter, filters: filterFilters(odataState.filter, filterField) },
  };
}

export function filterFilters(
  filters: (FilterDescriptor | CompositeFilterDescriptor)[] | CompositeFilterDescriptor,
  filterField: string,
): (CompositeFilterDescriptor | FilterDescriptor)[] {
  return [
    ...(isCompositeFilterDescriptor(filters as CompositeFilterDescriptor)
      ? (filters as CompositeFilterDescriptor).filters
      : (filters as (FilterDescriptor | CompositeFilterDescriptor)[])
    ).filter((m) => {
      if (isCompositeFilterDescriptor(m)) {
        m.filters = [...filterFilters(m.filters, filterField)];
        return true;
      } else if (isFilterDescriptor(m)) {
        return m.field !== filterField;
      }
    }),
  ];
}
