import { FilterDescriptor } from './filter-descriptor';

export interface CompositeFilterDescriptor {
  logic: 'or' | 'and';
  filters: Array<FilterDescriptor | CompositeFilterDescriptor>;
}
