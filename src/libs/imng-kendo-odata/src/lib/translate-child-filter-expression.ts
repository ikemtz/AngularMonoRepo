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
  const childTableFilter: CompositeFilterDescriptor = odataState.filter?.filters.find(
    (t: CompositeFilterDescriptor | FilterDescriptor) =>
      (t as CompositeFilterDescriptor).filters?.some(filterPredicate),
  ) as CompositeFilterDescriptor;
  if (childTableFilter) {
    odataState.filter = {
      logic: odataState.filter?.logic as 'or' | 'and',
      filters: [
        ...(odataState.filter?.filters as (CompositeFilterDescriptor | FilterDescriptor)[])?.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (t: CompositeFilterDescriptor | any) => !t.filters?.some(filterPredicate),
        ),
      ],
    };
    odataState.childFilters = {
      logic: (odataState.childFilters?.logic || 'and') as 'or' | 'and',
      filters:
        odataState.childFilters?.filters.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (childFilterDescriptor: ChildFilterDescriptor | any) =>
            childFilterDescriptor.childTableNavigationProperty !== childTableProperty.table &&
            childFilterDescriptor.field !== childTableProperty.field,
        ) || [],
    };
    odataState.childFilters.filters.push({
      logic: childTableFilter.logic,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filters: childTableFilter?.filters?.map((filter: FilterDescriptor | any) => ({
        ...filter,
        linqOperation: childTableProperty.linqOperation || 'any',
        childTableNavigationProperty: childTableProperty.table,
        field: childTableProperty.field,
      })),
    });
  }
  return odataState;
}
