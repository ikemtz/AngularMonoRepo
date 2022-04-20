import { FilterDescriptor } from '@progress/kendo-data-query';
import { findMatchingFilters } from './find-filter';
import { ODataState } from './odata-state';

export function applyFilter(odataState: ODataState, filter: FilterDescriptor): ODataState {
  if (!odataState.filter) {
    odataState.filter = { logic: 'and', filters: [] };
  }
  const matchedFilter = findMatchingFilters(odataState, filter.field as string);
  if (!matchedFilter) {
    odataState.filter.filters.push({
      logic: 'and',
      filters: [filter]
    });
  }
  else {
    matchedFilter.operator = 'eq';
    matchedFilter.value = filter.value;
  }
  return odataState;
}
