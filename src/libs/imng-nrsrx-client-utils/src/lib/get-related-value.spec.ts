import { getRelatedValue } from './get-related-value';

describe('getRelatedValue', () => {
  it('should work', () => {
    const obj = { parent: { child: { subChild: { x: 1, y: '2' } } } };

    const xResult = getRelatedValue(obj, 'parent', 'child', 'subChild', 'x');
    const yResult = getRelatedValue(obj, 'parent', 'child', 'subChild', 'y');

    expect(xResult).toEqual(1);
    expect(yResult).toEqual('2');
  });
  it('should handle invalid paths', () => {
    const obj = { parent: { child: { subChild: { x: 1, y: '2' } } } };

    const badChildPathResult = getRelatedValue(
      obj,
      'parent',
      'child2',
      'subChild',
      'y',
    );
    const badSubChildPathResult = getRelatedValue(
      obj,
      'parent',
      'child',
      'subChild2',
      'y',
    );

    expect(badChildPathResult).toBeUndefined();
    expect(badSubChildPathResult).toBeUndefined();
  });
});
