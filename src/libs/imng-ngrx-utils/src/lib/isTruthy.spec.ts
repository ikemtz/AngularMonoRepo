import { isFalsy, isTruthy } from './isTruthy';

describe('IsTruthy', () => {
  it('should handle zeros', () => {
    expect(isTruthy(0)).toBe(false);
    expect(isFalsy(0)).toBe(true);
  });
  it('should handle false', () => {
    expect(isTruthy(false)).toBe(false);
    expect(isFalsy(false)).toBe(true);
  });
  it('should handle null', () => {
    expect(isTruthy(null)).toBe(false);
    expect(isFalsy(null)).toBe(true);
  });
  it('should handle undefined', () => {
    expect(isTruthy(undefined)).toBe(false);
    expect(isFalsy(undefined)).toBe(true);
  });
});
