import { ODataState } from './odata-state';
import {
  ICompositeFilter,
  IFilter,
  isCompositeFilter,
} from 'imng-odata-client';

export function findMatchingFilters(
  odataState: ODataState,
  filterField: string,
): IFilter | undefined {
  if (!odataState.filter) {
    return;
  }
  return flattenCompositeFilters(odataState.filter).find(
    (x) => x.field === filterField,
  );
}

export function flattenCompositeFilters(filters: ICompositeFilter): IFilter[] {
  return filters.filters.flatMap((x) =>
    isCompositeFilter(x) ? flattenCompositeFilters(x) : [x],
  );
}
