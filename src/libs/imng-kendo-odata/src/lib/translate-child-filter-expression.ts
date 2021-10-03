import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { ChildFilterDescriptor, ODataState } from './odata-state';

export function translateChildFilterExpression(odataState: ODataState, childField: string): ODataState {
  if (odataState.filter) {
    const [tableName, fieldName] = childField.split('.');
    const childTableFilter = odataState.filter.filters.find((t: CompositeFilterDescriptor) =>
      t.filters.some((filter: FilterDescriptor) => filter.field === childField)) as CompositeFilterDescriptor;
    odataState.filter = {
      ...odataState.filter,
      filters: [...odataState.filter.filters.filter((t: CompositeFilterDescriptor) =>
        !t.filters.some((filter: FilterDescriptor) => filter.field === childField))],
    };

    odataState.childFilters = (odataState.childFilters || [])
      .filter((childFilterDescriptor: ChildFilterDescriptor) =>
        !childFilterDescriptor.field ||
        (childFilterDescriptor.childTableNavigationProperty !== tableName && childFilterDescriptor.field !== fieldName));
    childTableFilter?.filters?.forEach((filter: FilterDescriptor) => {
      odataState.childFilters.push({
        ...filter,
        linqOperation: 'any',
        childTableNavigationProperty: tableName,
        field: fieldName,
        logic: childTableFilter.logic,
      });
    });
  }
  if (odataState.sort) {
    odataState.sort = odataState.sort.filter(t => t.field !== childField);
  }
  return odataState;
}
