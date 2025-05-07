import { toDateOnly } from './to-date-only';

describe('toDateOnly', () => {
  it('should work', () => {
    expect(toDateOnly(new Date('2023-10-01T00:00:00Z'))).toStrictEqual(
      '2023-10-01',
    );
  });
});
