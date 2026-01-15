/// <reference types="jest" />
import { getRelatedField, isRelatedFieldOptions } from './get-related-field';

describe('getRelatedField', () => {
  it('should work', () => {
    const result = getRelatedField({
      segments: ['parent', 'child', 'subChild', 'x'],
    });

    expect(result).toEqual('parent/child/subChild/x');
  });

  it('should work with separator', () => {
    const result = getRelatedField({
      seperator: '-',
      segments: ['parent', 'child', 'subChild', 'x'],
    });

    expect(result).toEqual('parent-child-subChild-x');
  });

  it('should work with strings', () => {
    const result = isRelatedFieldOptions('x');
    expect(result).toBe(false);
  });
});
