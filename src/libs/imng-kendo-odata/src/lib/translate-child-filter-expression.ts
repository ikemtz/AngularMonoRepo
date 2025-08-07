import {
  CompositeFilterDescriptor,
  FilterDescriptor,
  isCompositeFilterDescriptor,
  SortDescriptor,
} from '@progress/kendo-data-query';
import { BoundChildTableProperty } from './fetch-options';
import { isCompositeChildFilterDescriptor } from './isCompositeChildFilterDescriptor';
import {
  ChildFilterDescriptor,
  CompositeChildFilterDescriptor,
  ODataState,
} from './odata-state';

export function translateChildFilterExpression(
  odataState: ODataState,
  childTableProperty: BoundChildTableProperty,
): ODataState {
  const childFieldString = `${childTableProperty.table}.${childTableProperty.field}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterPredicate = (filter: FilterDescriptor | SortDescriptor | any) => {
    return filter.field === childFieldString;
  };
  const childTableFilter: CompositeFilterDescriptor =
    odataState.filter?.filters.find(
      (t: CompositeFilterDescriptor | FilterDescriptor) =>
        isCompositeFilterDescriptor(t) && t.filters?.some(filterPredicate),
    ) as CompositeFilterDescriptor;
  if (childTableFilter && odataState.filter) {
    odataState.filter = {
      ...odataState.filter,
      filters: [
        ...odataState.filter.filters.filter(
          (t: FilterDescriptor | CompositeFilterDescriptor) =>
            isCompositeFilterDescriptor(t) && !t.filters?.some(filterPredicate),
        ),
      ],
    };
    odataState.childFilters = {
      logic: odataState.childFilters?.logic || 'and',
      filters:
        odataState.childFilters?.filters?.filter(
          (
            childFilterDescriptor:
              | ChildFilterDescriptor
              | CompositeChildFilterDescriptor,
          ) =>
            !isCompositeChildFilterDescriptor(childFilterDescriptor) &&
            childFilterDescriptor.childTableNavigationProperty !==
              childTableProperty.table &&
            childFilterDescriptor.field !== childTableProperty.field,
        ) || [],
    };
    odataState.childFilters.filters?.push({
      logic: childTableFilter.logic,
      filters: childTableFilter?.filters?.map(
        (filter: FilterDescriptor | CompositeFilterDescriptor) => ({
          ...(filter as FilterDescriptor),
          linqOperation: childTableProperty.linqOperation || 'any',
          childTableNavigationProperty: childTableProperty.table,
          field: childTableProperty.field,
        }),
      ),
    });
  }
  return odataState;
}
