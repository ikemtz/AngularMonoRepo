import {
  IChildFilter,
  ICompositeFilter,
  IFilter,
  isChildFilter,
  isCompositeFilter,
  ODataQuery,
} from '../models';
import { getFilterOperator } from './get-filter-operator';

export function processFilters(query: ODataQuery, queryString: string): string {
  if (!query.filter?.filters?.length) {
    return queryString;
  }
  const filterString = serializeCompositeFilter(query.filter);
  if (filterString === '()') {
    return queryString;
  }
  return `${queryString}&$filter=${filterString}`;
}

export function serializeCompositeFilter(filter: ICompositeFilter): string {
  const filterLogicSeperator = ` ${filter.logic} `;
  return `(${filter.filters
    .map((m) => serializeFilterItem(m))
    .filter((m) => m && m !== '()')
    .join(filterLogicSeperator)})`;
}
export function serializeFilterItem(
  filter: IFilter | IChildFilter | ICompositeFilter,
): string {
  if (isCompositeFilter(filter)) {
    const subFilters = filter.filters.filter((subFilter) =>
      isNotEmptyFilter(subFilter),
    );
    if (subFilters.length > 1) {
      return serializeCompositeFilter(filter);
    } else if (subFilters.length === 1) {
      return serializeFilterItem(subFilters[0]);
    } else {
      return '';
    }
  }
  return serializeFilter(filter);
}

export function isNotEmptyFilter(
  filter: IFilter | IChildFilter | ICompositeFilter,
): boolean {
  if (isCompositeFilter(filter)) {
    return filter.filters.every((filter) => isNotEmptyFilter(filter));
  } else {
    return (
      filter.field !== undefined &&
      filter.field !== null &&
      filter.field.length > 0
    );
  }
}

export function serializeFilter(filter: IFilter | IChildFilter): string {
  const operator =
    typeof filter.operator === 'string'
      ? getFilterOperator(filter.operator)
      : getFilterOperator(filter.operator?.name || 'equals');
  const odataStringFunction = operator.toODataString;
  if (filter.field === undefined || filter.field === null) {
    return '';
  } else if (isChildFilter(filter)) {
    const childFieldName = `o/${filter.field}`;
    return `${filter.childTable}/${
      filter.linqOperation
    }(o: ${odataStringFunction(childFieldName, filter.value as never)})`;
  } else {
    return odataStringFunction(filter.field, filter.value as never);
  }
}
