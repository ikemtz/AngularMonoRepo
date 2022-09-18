import {
  CompositeFilter,
  Filter,
  getFilterOperator,
  ODataQuery,
  Sort,
} from 'imng-odata-client';
import { PrimeTableState } from '../models/prime-odata-table-state';

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
  return query;
}
