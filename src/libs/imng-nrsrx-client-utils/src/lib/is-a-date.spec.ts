import * as i from './is-a';

describe('isaDate', () => {

  it('should work for a number', () => {
    expect(i.isaDate(234234123412341234123412341234)).toBe(false);
  });
  it('should not  work for a string', () => {
    expect(i.isaDate("234234123412341234123412341234")).toBe(false);
  });
  it('should not  work for a Date', () => {
    expect(i.isaDate(new Date())).toBe(true);
  });
});
