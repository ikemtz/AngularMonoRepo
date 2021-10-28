import { isaDate, isaNumber } from 'imng-nrsrx-client-utils';
import {
  ChildFilterDescriptor,
  CompositeChildFilterDescriptor,
  isCompositeChildFilterDescriptor,
  ODataState,
} from './odata-state';
import { serializeFilters } from '@progress/kendo-data-query/dist/npm/filter-serialization.common';
import { toODataString } from '@progress/kendo-data-query';

export const stringFilterOperators: string[] = [
  `startswith`,
  `endswith`,
  `contains`,
  `doesnotcontain`,
  `isempty`,
  `isnotempty`,
];
export function processChildFilterDescriptors(state: ODataState, queryString: string): string {
  const childFilters = state.childFilters;
  if (!childFilters) {
    return queryString;
  }
  queryString = transformCompositeChildFilter(state.childFilters, queryString);
  return queryString;
}

export function transformCompositeChildFilter(
  compositeChildFilter: CompositeChildFilterDescriptor,
  queryString: string,
): string {
  let tempFilterString = '';
  compositeChildFilter.filters
    .filter((filter) => !isCompositeChildFilterDescriptor(filter))
    .forEach((filter: ChildFilterDescriptor, index: number, array: ChildFilterDescriptor[]) => {
      tempFilterString += index === 0 && array.length > 1 ? '(' : '';
      tempFilterString += transformChildFilter(filter);
      if (index === array.length - 1 && array.length > 1) {
        tempFilterString += ')';
      } else if (index !== array.length - 1) {
        tempFilterString += ` ${compositeChildFilter.logic || 'and'} `;
      }
    });
  if (tempFilterString.length > 0) {
    if (queryString.match(/\$filter=/)) {
      queryString = queryString.replace(/\$filter=/, `$filter=${tempFilterString} and `);
    } else {
      queryString += `&$filter=${tempFilterString}`;
    }
  }
  compositeChildFilter.filters
    .filter((filter) => isCompositeChildFilterDescriptor(filter))
    .forEach((filter: CompositeChildFilterDescriptor) => {
      queryString = transformCompositeChildFilter(filter, queryString);
    });
  return queryString;
}

export function transformChildFilter(childFilter: ChildFilterDescriptor): string {
  let filteringString: string;
  if (-1 < stringFilterOperators.findIndex((x) => x === childFilter.operator) && !isaNumber(childFilter.value)) {
    filteringString = `${childFilter.operator}(o/${childFilter.field}, '${childFilter.value}')`;
  } else {
    filteringString = `o/${toODataString({
      filter: { logic: 'and', filters: [childFilter] },
    }).slice('$filter='.length)}`;
  }
  return `${childFilter.childTableNavigationProperty}/${childFilter.linqOperation}` + `(o: ${filteringString})`;
}
