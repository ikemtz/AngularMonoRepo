import * as i from './id-type';

describe('isaString', () => {
  it('should work for a number', () => {
    expect(i.isaString(9234123412341234)).toBe(false);
  });
  it('should not  work for a string', () => {
    expect(i.isaString('234234123412341234123412341234')).toBe(true);
  });
  it('should not  work for a Date', () => {
    expect(i.isaString(new Date())).toBe(false);
  });
});
