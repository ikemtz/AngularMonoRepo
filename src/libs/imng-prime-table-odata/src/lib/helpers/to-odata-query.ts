import {
  CompositeFilter,
  Filter,
  getFilterOperator,
  ODataQuery,
  Sort,
} from 'imng-odata-client';
import { FilterMetadata, LazyLoadEvent } from 'primeng/api';

export function toODataQuery(val: LazyLoadEvent): ODataQuery {
  const query: ODataQuery = {
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
      .map((key) => {
        if (val.filters && val.filters[key]) {
          return {
            key: key,
            collection: (val.filters[key] as FilterMetadata[]) || [],
          };
        }
        return { key: key, collection: [] };
      })
      .map(
        (t): CompositeFilter => ({
          logic: t.collection?.every((e) => e.operator === 'and')
            ? 'and'
            : 'or',
          filters: t.collection.map(
            (m): Filter => ({
              field: t.key,
              operator: getFilterOperator(m.matchMode),
              value: m.value,
            }),
          ),
        }),
      );
    if (filters?.length) {
      query.filter = { logic: 'and', filters: filters };
    }
  }
  return query;
}
