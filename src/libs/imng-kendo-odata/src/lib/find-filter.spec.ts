import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { findMatchingFilters } from './find-filter';
import { isFilterDescriptor } from './isFilterDescriptor';

describe('findFilter', () => {
  const genFilter = (x: string): FilterDescriptor => ({ field: x, operator: 'eq', value: 2 });
  it('should find', () => {
    const filters: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [genFilter('y'), genFilter('z')],
    };
    const result = findMatchingFilters({ filter: filters }, 'y');
    expect(result).toMatchSnapshot();
  });

  it('should find sub filters', () => {
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
    const result = findMatchingFilters({ filter: filters }, 'y');
    expect(isFilterDescriptor(result)).toBe(true)
    expect(result).toMatchSnapshot();
  });
  it('should not find', () => {
    const filters: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [genFilter('y'), genFilter('z')],
    };
    const result = findMatchingFilters({ filter: { filters: [filters], logic: 'and' } }, 'x');
    expect(result).toMatchSnapshot();
  });
  it('should work with non-filtered odata states', () => {
    const result = findMatchingFilters({}, 'x');
    expect(result).toMatchSnapshot();
  });
});
