import { isaNumber } from 'imng-nrsrx-client-utils';
import {
  ChildExistsFilterDescriptor,
  ChildFilterDescriptor,
  CompositeChildFilterDescriptor,
  ODataState,
} from './odata-state';
import { isCompositeChildFilterDescriptor } from './isCompositeChildFilterDescriptor';
import { toODataString } from '@progress/kendo-data-query';
export const filterQueryStringParamLen = 8; //"$filter="
export const stringFilterOperators: string[] = [
  `startswith`,
  `endswith`,
  `contains`,
  `doesnotcontain`,
  `isempty`,
  `isnotempty`,
];
export function processChildFilterDescriptors(
  state: ODataState,
  queryString: string,
): string {
  if (!state.childFilters) {
    return queryString;
  } else {
    return transformCompositeChildFilter(state.childFilters, queryString);
  }
}
export function transformChildExistsFilter(
  childExistsFilter: ChildExistsFilterDescriptor,
  logic: 'and' | 'or' | undefined,
  queryString: string,
): string {
  const filterString = `$filter=${childExistsFilter.childTableNavigationProperty}/${childExistsFilter.linqOperation ?? 'any'}(${childExistsFilter.filter ?? ''})`;
  if (queryString.match(/\$filter=/)) {
    queryString = queryString.replace(
      /\$filter=/,
      `${filterString} ${logic || 'and'} `,
    );
  } else {
    queryString += filterString;
  }
  return queryString;
}
export function transformCompositeChildFilter(
  compositeChildFilter: CompositeChildFilterDescriptor,
  queryString: string,
): string {
  let tempFilterString = '';
  compositeChildFilter.filters
    ?.filter((filter) => !isCompositeChildFilterDescriptor(filter))
    .forEach(
      (
        filter: ChildFilterDescriptor | CompositeChildFilterDescriptor,
        index: number,
        array: (ChildFilterDescriptor | CompositeChildFilterDescriptor)[],
      ) => {
        tempFilterString += index === 0 && array.length > 1 ? '(' : '';
        tempFilterString += transformChildFilter(
          filter as ChildFilterDescriptor,
        );
        if (index === array.length - 1 && array.length > 1) {
          tempFilterString += ')';
        } else if (index !== array.length - 1) {
          tempFilterString += ` ${compositeChildFilter.logic || 'and'} `;
        }
      },
    );
  if (tempFilterString.length > 0) {
    if (queryString.match(/\$filter=/)) {
      queryString = queryString.replace(
        /\$filter=/,
        `$filter=${tempFilterString} and `,
      );
    } else {
      queryString += `&$filter=${tempFilterString}`;
    }
  }
  compositeChildFilter.filters
    ?.filter((filter) => isCompositeChildFilterDescriptor(filter))
    .forEach(
      (filter: CompositeChildFilterDescriptor | ChildFilterDescriptor) => {
        queryString = transformCompositeChildFilter(
          filter as CompositeChildFilterDescriptor,
          queryString,
        );
      },
    );
  compositeChildFilter.existsFilters?.forEach(
    (filter: ChildExistsFilterDescriptor) => {
      queryString = transformChildExistsFilter(
        filter as ChildExistsFilterDescriptor,
        compositeChildFilter.logic,
        queryString,
      );
    },
  );
  return queryString;
}

export function transformChildFilter(
  childFilter: ChildFilterDescriptor,
): string {
  let filteringString: string;
  if (
    -1 < stringFilterOperators.findIndex((x) => x === childFilter.operator) &&
    !isaNumber(childFilter.value)
  ) {
    filteringString = `${childFilter.operator}(o/${childFilter.field}, '${childFilter.value}')`;
  } else {
    filteringString = `o/${toODataString({
      filter: { logic: 'and', filters: [childFilter] },
    }).slice(filterQueryStringParamLen)}`;
  }
  return (
    `${childFilter.childTableNavigationProperty}/${childFilter.linqOperation}` +
    `(o: ${filteringString})`
  );
}
