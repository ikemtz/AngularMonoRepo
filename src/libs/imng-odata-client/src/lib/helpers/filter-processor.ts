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
  m: IFilter | IChildFilter | ICompositeFilter,
): string {
  if (isCompositeFilter(m) && m.filters.length > 1) {
    return serializeCompositeFilter(m);
  } else if (isCompositeFilter(m) && m.filters.length === 1) {
    return serializeFilterItem(m.filters[0]);
  }
  return serializeFilter(m as IFilter | IChildFilter);
}

export function serializeFilter(filter: IFilter | IChildFilter): string {
  const operator =
    typeof filter.operator === 'string'
      ? getFilterOperator(filter.operator)
      : getFilterOperator(filter.operator?.name || 'equals');
  const odataStringFunction = operator.toODataString;
  if (filter.field === undefined) {
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
