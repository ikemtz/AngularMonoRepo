import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { removeMatchingFilters } from './replace-filter';

describe('removeMatchingFilters', () => {
  const genFilter = (x: string): FilterDescriptor => ({ field: x, operator: 'eq', value: 2 });
  it('should remove', () => {
    const filters: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [genFilter('y'), genFilter('z')],
    };
    const result = removeMatchingFilters({ filter: filters }, 'y');
    expect(result).toMatchSnapshot();
  });

  it('should remove sub filters', () => {
    const filters: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [
        {
          logic: 'and',
          filters: [genFilter('y'), genFilter('z')],
        },
        {
          logic: 'and',
          filters: [genFilter('a'), genFilter('b')],
        },
        {
          logic: 'and',
          filters: [genFilter('e'), genFilter('f')],
        },
      ],
    };
    const result = removeMatchingFilters({ filter: filters }, 'y');
    expect(result).toMatchSnapshot();
  });
  it('should not remove', () => {
    const filters: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [genFilter('y'), genFilter('z')],
    };
    const result = removeMatchingFilters({ filter: { filters: [filters], logic: 'and' } }, 'x');
    expect(result).toMatchSnapshot();
  });
  it('should work with non-filtered odata states', () => {
    const filters: CompositeFilterDescriptor = {
      logic: 'and',
      filters: undefined,
    };
    const result = removeMatchingFilters({ filter: { filters: [filters], logic: 'and' } }, 'x');
    expect(result).toMatchSnapshot();
  });
});
