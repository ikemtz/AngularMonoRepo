import {
  ICompositeFilter,
  IFilter,
  isCompositeFilter,
} from 'imng-odata-client';
import { ODataState } from './odata-state';

export function removeMatchingFilters(
  odataState: ODataState,
  filterField: string,
): ODataState {
  return {
    ...odataState,
    filter: odataState.filter
      ? {
          ...odataState.filter,
          filters: filterFilters(odataState.filter, filterField),
        }
      : { logic: 'and', filters: [] },
  };
}

export function filterFilters(
  filters: (IFilter | ICompositeFilter)[] | ICompositeFilter,
  filterField: string,
): (ICompositeFilter | IFilter)[] {
  return (
    isCompositeFilter(filters as ICompositeFilter)
      ? (filters as ICompositeFilter).filters
      : (filters as (IFilter | ICompositeFilter)[])
  ).filter((m) => {
    if (isCompositeFilter(m)) {
      m.filters = [...filterFilters(m.filters, filterField)];
      return true;
    } else {
      return m.field !== filterField;
    }
  });
}
