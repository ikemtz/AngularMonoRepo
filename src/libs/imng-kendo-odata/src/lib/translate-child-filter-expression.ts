import { CompositeFilterDescriptor, FilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { BoundChildTableProperty } from './fetch-options';
import { ChildFilterDescriptor, ODataState } from './odata-state';

export function translateChildFilterExpression(
  odataState: ODataState,
  childTableProperty: BoundChildTableProperty,
): ODataState {
  const childFieldString = `${childTableProperty.table}.${childTableProperty.field}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterPredicate = (filter: FilterDescriptor | SortDescriptor | any) => {
    return filter.field === childFieldString;
  };
  const childTableFilter: CompositeFilterDescriptor = odataState.filter?.filters.find((t: CompositeFilterDescriptor) =>
    t.filters?.some(filterPredicate),
  ) as CompositeFilterDescriptor;
  if (childTableFilter) {
    odataState.filter = {
      ...odataState.filter,
      filters: [
        ...odataState.filter.filters.filter((t: CompositeFilterDescriptor) => !t.filters?.some(filterPredicate)),
      ],
    };
    odataState.childFilters = {
      logic: odataState.childFilters?.logic || 'and',
      filters:
        odataState.childFilters?.filters.filter(
          (childFilterDescriptor: ChildFilterDescriptor) =>
            childFilterDescriptor.childTableNavigationProperty !== childTableProperty.table &&
            childFilterDescriptor.field !== childTableProperty.field,
        ) || [],
    };
    odataState.childFilters.filters.push({
      logic: childTableFilter.logic,
      filters: childTableFilter?.filters?.map((filter: FilterDescriptor) => ({
        ...filter,
        linqOperation: childTableProperty.linqOperation || 'any',
        childTableNavigationProperty: childTableProperty.table,
        field: childTableProperty.field,
      })),
    });
  }
  return odataState;
}
