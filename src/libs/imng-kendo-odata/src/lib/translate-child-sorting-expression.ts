import { SortDescriptor } from '@progress/kendo-data-query';
import { BoundChildTableProperty } from './fetch-options';
import { Expander, isExpander, ODataState } from './odata-state';

export function translateChildSortingExpression(
  odataState: ODataState,
  childTableProperties: BoundChildTableProperty[],
): ODataState {
  if (!childTableProperties || childTableProperties.length === 0) {
    return odataState;
  }
  const childTableStrings: string[] = childTableProperties.map((x) => x.table).distinct();
  const childTablePropertyStrings: string[] = childTableProperties.map((x) => `${x.table}.${x.field}`);
  const filterPredicate = (x: SortDescriptor) => childTablePropertyStrings.indexOf(x.field) > -1;
  const sortedColumns = odataState.sort
    ?.filter(filterPredicate)
    .map((m) => ({ ...m, childProperty: m.field.split('.') }));
  if (sortedColumns?.length > 0) {
    odataState.sort = odataState.sort?.filter((x) => !filterPredicate(x));
    const expanders = odataState.expanders
      .filter(isExpander)
      .filter((t: Expander) => childTableStrings.indexOf(t.table) > -1)
      .map((t) => ({ ...t, sort: t.sort || [] }));
    sortedColumns.forEach((x) =>
      expanders.find((e) => e.table === x.childProperty[0]).sort.push({ field: x.childProperty[1], dir: x.dir }),
    );
  }
  return odataState;
}
