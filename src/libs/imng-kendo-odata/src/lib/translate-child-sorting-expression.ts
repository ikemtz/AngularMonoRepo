import { SortDescriptor } from '@progress/kendo-data-query';
import { BoundChildTableProperty } from './fetch-options';
import { Expander, isExpander, ODataState } from './odata-state';
import { distinct } from 'imng-nrsrx-client-utils';

export function translateChildSortingExpression(
  odataState: ODataState,
  childTableProperties: BoundChildTableProperty[],
): ODataState {
  if (!childTableProperties || childTableProperties.length === 0) {
    return odataState;
  }
  const childTableStrings: string[] = distinct(childTableProperties.map((x) => x.table));
  const childTablePropertyStrings: string[] = childTableProperties.map((x) => `${x.table}.${x.field}`);
  const filterPredicate = (x: SortDescriptor) => childTablePropertyStrings.indexOf(x.field) > -1;
  const sortedColumns = odataState.sort
    ?.filter(filterPredicate)
    .map((m) => ({ ...m, childProperty: m.field.split('.') }));
  if (sortedColumns?.length > 0) {
    odataState.sort = odataState.sort?.filter((x) => !filterPredicate(x));

    odataState.expanders = odataState.expanders.map((m) => (isExpander(m) ? { ...m } : m));
    const expanders = odataState.expanders
      .filter((t: Expander) => childTableStrings.indexOf(t.table) > -1)
      .map((t: Expander) => {
        t.sort = (t.sort || []).filter(
          (f) => !sortedColumns.find((s) => t.table === s.childProperty[0] && f.field === s.childProperty[1]),
        );
        return t;
      });
    sortedColumns.forEach((x) => {
      const expander = expanders.find((e) => e.table === x.childProperty[0]);
      expander.sort.push({ field: x.childProperty[1], dir: x.dir });
    });
  }
  return odataState;
}
