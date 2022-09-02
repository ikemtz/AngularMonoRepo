import { ODataQuery, Sort } from 'imng-odata-client';
import { LazyLoadEvent, SortMeta } from 'primeng/api';

export function loadRequestConverter(val: LazyLoadEvent): ODataQuery {
  return {
    orderBy: val.multiSortMeta?.map(
      (x): Sort => ({
        field: x.field,
        direction: x.order === -1 ? 'desc' : 'asc',
      }),
    ),
    skip: val.first,
    top: val.rows,
  };
}

export function handleMultiColumnSorting(
  val: LazyLoadEvent,
  sortState: SortMeta[],
): SortMeta[] {
  //The following code is due to a bug in the MultiSortMeta
  //This object is currently only returning the lastest user defined sort
  if (val.multiSortMeta) {
    const sort = val.multiSortMeta[0];
    const matchingSort = sortState.find((f) => sort.field === f.field);
    sortState = sortState.filter((f) => sort.field !== f.field);
    if (!matchingSort || matchingSort.order !== -1) {
      sortState.push(sort);
    }
  }
  return sortState;
}
