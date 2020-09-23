import './date-extensions';

describe('toShortDateString', () => {
  it('to handle 1/1/2020', () => {
    const dt = new Date('1/1/2020');
    expect(dt.toShortDateString()).toBe(false);
  });
});
