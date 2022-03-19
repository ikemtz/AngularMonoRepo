import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { isFilterDescriptor } from './isFilterDescriptor';

describe('isFilterDescriptor', () => {
  it('should negate', () => {
    const filters: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [{ field: 'x', operator: 'eq', value: 1 }],
    };
    const result = isFilterDescriptor(filters);
    expect(result).toBe(false);
  });

  it('should work', () => {
    const filters: FilterDescriptor = {
      field: 'x',
      operator: 'eq',
      value: 1,
    };
    const result = isFilterDescriptor(filters);
    expect(result).toBe(true);
  });
});
