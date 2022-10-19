import {
  ChildFilter,
  CompositeFilter,
  Filter,
  getFilterOperator,
  isCompositeFilter,
  ODataQuery,
  Sort,
} from 'imng-odata-client';
import { PrimeTableState } from '../models/prime-table-state';

export function toODataQuery(val: PrimeTableState): ODataQuery {
  const query: ODataQuery = {
    ...val,
    orderBy: val.multiSortMeta?.map(
      (x): Sort => ({
        field: x.field,
        dir: x.order === -1 ? 'desc' : 'asc',
      }),
    ),
    skip: val.first,
    top: val.rows,
  };

  if (val.filters) {
    const filters = Object.keys(val.filters || {})
      .map((key) => ({
        key,
        collection: val.filters?.[key] || [],
      }))
      .filter((t) => t.collection?.filter((t) => t.value).length)
      .map(
        (t): CompositeFilter => ({
          logic: t.collection?.every((e) => e.operator === 'and')
            ? 'and'
            : 'or',
          filters: t.collection.map(
            (m): Filter => ({
              field: t.key,
              operator: getFilterOperator(m.matchMode || 'eq'),
              value: m.value,
            }),
          ),
        }),
      );
    if (filters?.length) {
      query.filter = { logic: 'and', filters };
    }
  }
  delete (query as { filters: undefined }).filters;
  delete (query as { multiSortMeta: undefined }).multiSortMeta;
  query.filter = transformPrimeRelatedTableFilters(query.filter);
  return query;
}

export function transformPrimeRelatedTableFilters(
  filter: CompositeFilter,
): CompositeFilter {
  if (filter) {
    filter.filters = filter.filters.map((x) => {
      if (isCompositeFilter(x)) {
        return transformPrimeRelatedTableFilters(x);
      } else if (x.field.indexOf('/') > 0) {
        const fieldSegments = x.field.split('/');
        return <ChildFilter>{
          ...x,
          childTable: fieldSegments[0].replace('.', '/'),
          field: fieldSegments.filter((v, i) => i > 0).join('/'),
          linqOperation: 'any',
        };
      } else if (x.field.indexOf('.') > 0) {
        x.field = x.field.replace(/\./g, '/');
      }
      return x;
    });
  }
  return filter;
}
