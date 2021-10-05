import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { ChildFilterDescriptor, ODataState } from './odata-state';

export function translateChildFilterExpression(odataState: ODataState, childField: string): ODataState {
  const childTableFilter: CompositeFilterDescriptor = odataState.filter?.filters.find((t: CompositeFilterDescriptor) =>
    t.filters?.some((filter: FilterDescriptor) => filter.field === childField)) as CompositeFilterDescriptor;
  if (childTableFilter) {
    const [tableName, fieldName] = childField.split('.');
    odataState.filter = {
      ...odataState.filter,
      filters: [...odataState.filter.filters.filter((t: CompositeFilterDescriptor) =>
        !t.filters?.some((filter: FilterDescriptor) => filter.field === childField))],
    };
    odataState.childFilters = {
      logic: odataState.childFilters?.logic || 'and',
      filters: odataState.childFilters?.filters.filter((childFilterDescriptor: ChildFilterDescriptor) =>
        childFilterDescriptor.childTableNavigationProperty !== tableName && childFilterDescriptor.field !== fieldName) || []
    };
    odataState.childFilters.filters.push({
      logic: childTableFilter.logic,
      filters: childTableFilter?.filters?.map((filter: FilterDescriptor) =>
      ({
        ...filter,
        linqOperation: 'any',
        childTableNavigationProperty: tableName,
        field: fieldName,
      }))
    });
  }

  odataState.sort = odataState.sort?.filter(t => t.field !== childField);
  return odataState;
}
