import { CompositeFilterDescriptor, FilterDescriptor, isCompositeFilterDescriptor } from '@progress/kendo-data-query';
import { isFilterDescriptor, ODataState } from 'imng-kendo-odata';

export function removeMatchingFilters(odataState: ODataState, filterField: string): ODataState {
  if (odataState.filter) {
    odataState = {
      ...odataState,
      filter: { ...odataState.filter, filters: filterFilters(odataState.filter, filterField) },
    };
  }
  return odataState;
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
