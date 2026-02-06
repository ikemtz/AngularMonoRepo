import { findMatchingFilters } from './find-filter';
import { ODataState } from './odata-state';
import { updateFilter } from './update-filter';
import { IFilter } from 'imng-odata-client';

export function applyFilter(
  odataState: ODataState,
  filter: IFilter,
): ODataState {
  odataState.filter ??= { logic: 'and', filters: [] };
  const matchedFilter = findMatchingFilters(odataState, filter.field);
  if (matchedFilter) {
    updateFilter(odataState.filter, filter);
  } else {
    odataState.filter.filters.push({
      logic: 'and',
      filters: [filter],
    });
  }
  return odataState;
}
