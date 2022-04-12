import { isNullOrUndefined } from '@microsoft/applicationinsights-core-js';


describe('isNullOrUndefined', () => {
  it('should work for a null', () => {
    expect(isNullOrUndefined(null)).toBe(true);
  });
  it('should work for undefined', () => {
    expect(isNullOrUndefined(undefined)).toBe(true);
  });
  it('should not  work for a string', () => {
    expect(isNullOrUndefined('234234123412341234123412341234')).toBe(false);
  });
  it('should not  work for a Date', () => {
    expect(isNullOrUndefined(new Date())).toBe(false);
  });
});
