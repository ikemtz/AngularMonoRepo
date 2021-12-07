import * as i from './id-type';

describe('isaNumber', () => {
  it('should work for a number', () => {
    expect(i.isaNumber(234234123412341234123412341234)).toBe(true);
  });
  it('should not  work for a string', () => {
    expect(i.isaNumber('234234123412341234123412341234')).toBe(false);
  });
  it('should not  work for a Date', () => {
    expect(i.isaNumber(new Date())).toBe(false);
  });
});
