import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { updateFilter } from './update-filter';

describe('updateFilter', () => {
  const genFilter = (x: string): FilterDescriptor => ({ field: x, operator: 'eq', value: 2 });
  it('should update subFilters', () => {
    const filters: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [genFilter('y'), genFilter('z'),
      { filters: [genFilter('a'), genFilter('b')], logic: 'and' }],
    };
    const result = updateFilter(filters, { ...genFilter('b'), value: 'xyz' });
    expect(result).toMatchSnapshot();
  });
  it('should update filters', () => {
    const filters: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [genFilter('y'), genFilter('z'), genFilter('b')],
    };
    const result = updateFilter(filters, { ...genFilter('b'), value: 'xyz' });
    expect(result).toMatchSnapshot();
  });
});
