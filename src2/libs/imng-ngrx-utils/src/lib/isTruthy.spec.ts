import { isTruthy } from './isTruthy';

describe('IsTruthy', () => {
  it('should handle zeros', () => {
    expect(isTruthy(0)).toBe(false);
  });
  it('should handle false', () => {
    expect(isTruthy(false)).toBe(false);
  });
  it('should handle null', () => {
    expect(isTruthy(null)).toBe(false);
  });
  it('should handle undefined', () => {
    expect(isTruthy(undefined)).toBe(false);
  });
});
