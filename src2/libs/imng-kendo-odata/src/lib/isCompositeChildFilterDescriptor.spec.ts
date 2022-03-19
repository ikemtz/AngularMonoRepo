import { isCompositeChildFilterDescriptor } from './isCompositeChildFilterDescriptor';
import { ChildFilterDescriptor, CompositeChildFilterDescriptor } from './odata-state';

describe('isCompositeChildFilterDescriptor', () => {
  it('should work', () => {
    const filters: CompositeChildFilterDescriptor = {
      logic: 'and',
      filters: [{ field: 'x', childTableNavigationProperty: 'y', linqOperation: 'all', operator: 'eq', value: 1 }],
    };
    const result = isCompositeChildFilterDescriptor(filters);
    expect(result).toBe(true);
  });

  it('should negate', () => {
    const filters: ChildFilterDescriptor = {
      field: 'x',
      childTableNavigationProperty: 'y',
      linqOperation: 'all',
      operator: 'eq',
      value: 1,
    };
    const result = isCompositeChildFilterDescriptor(filters);
    expect(result).toBe(false);
  });
});
