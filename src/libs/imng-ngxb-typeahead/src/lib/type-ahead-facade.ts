import { Observable } from 'rxjs';
import { ImngTypeaheadMatch } from './type-ahead-match';
import { FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';

export interface ImngTypeAheadFacade<T> {
  matches$: Observable<ImngTypeaheadMatch<T>[]>;
  loadMatches(filterCriteria: string): void;
}

export function createTypeaheadFilters(fields: string[], filterCriteria: string): CompositeFilterDescriptor {
  const filterSegments = filterCriteria.split(' ').filter(t => t !== '');
  const filters: FilterDescriptor[] = [];
  fields.forEach(field =>
    filterSegments.forEach(segment => filters.push({ field: field, operator: 'contains', value: segment })),
  );
  return {
    logic: 'or',
    filters: filters,
  };
}
