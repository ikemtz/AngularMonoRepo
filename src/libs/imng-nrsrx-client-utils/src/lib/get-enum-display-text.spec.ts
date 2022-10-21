import { getEnumDisplayText } from './get-enum-display-text';

describe('getEnumDisplayText with string', () => {
  it('should work', () => {
    const result = getEnumDisplayText(testEnumValues, 'first');
    expect(result).toBe('First');
  });

  it('should work with Enum', () => {
    const result = getEnumDisplayText(testEnumValues, TestEnum.first);
    expect(result).toBe('First');
  });
  it('should handle notfound with string', () => {
    const result = getEnumDisplayText(testEnumValues, 'fourth');
    expect(result).toBeUndefined();
  });

  it('should handle notfound  with Enum', () => {
    const result = getEnumDisplayText(testEnumValues, 4);
    expect(result).toBeUndefined();
  });
});

enum TestEnum {
  first = 1,
  second = 2,
  third = 3,
}

const testEnumValues = [
  { key: 1, name: 'first', displayText: 'First' },
  { key: 2, name: 'second', displayText: 'Second' },
  { key: 3, name: 'third', displayText: 'Third' },
];
