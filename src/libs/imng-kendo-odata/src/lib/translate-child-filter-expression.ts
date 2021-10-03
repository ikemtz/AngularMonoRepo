import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { ChildFilterDescriptor, ODataState } from './odata-state';

export function translateChildFilterExpression(odataState: ODataState, childField: string): ODataState {
  if (odataState.filter) {
    const [table, field] = childField.split('/');
    const childTableFilter = odataState.filter.filters.find((t: CompositeFilterDescriptor) =>
      t.filters.filter((filter: FilterDescriptor) => filter.field === childField)) as CompositeFilterDescriptor;
    odataState.filter.filters = odataState.filter.filters.filter((t: CompositeFilterDescriptor) =>
      !t.filters.some((filter: FilterDescriptor) => filter.field === childField));

    odataState.childFilters = (odataState.childFilters || [])
      .filter((childFilterDescriptor: ChildFilterDescriptor) =>
        childFilterDescriptor.childTableNavigationProperty !== table && childFilterDescriptor.field !== field);
    childTableFilter.filters.forEach((filter: FilterDescriptor) => {
      const [tableName, fieldName] = (filter.field as string).split('/');
      odataState.childFilters.push({
        ...filter,
        linqOperation: 'any',
        childTableNavigationProperty: tableName,
        field: fieldName,
        logic: childTableFilter.logic,
      });
    });
  }
  return odataState;
}
