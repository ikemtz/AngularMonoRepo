import * as i from './id-type';

describe('isaDate', () => {
  it('should work for a number', () => {
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    expect(i.isaDate(234234123412341234123412341234)).toBe(false);
  });
  it('should not  work for a string', () => {
    expect(i.isaDate('234234123412341234123412341234')).toBe(false);
  });
  it('should not  work for a Date', () => {
    expect(i.isaDate(new Date())).toBe(true);
  });
});
