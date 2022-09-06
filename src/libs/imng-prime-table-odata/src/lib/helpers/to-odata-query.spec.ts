import { toODataQuery } from './to-odata-query';

describe('toODataQuery', () => {
  it('should convert empty State', () => {
    const result = toODataQuery({});
    expect(result).toMatchSnapshot();
  });
  it('should convert typical State', () => {
    const result = toODataQuery({
      multiSortMeta: [
        { field: 'abc', order: 1 },
        { field: 'xyz', order: -1 },
      ],
      filters: {
        abc: [{ operator: 'all', matchMode: 'equals', value: 'xyz' }],
      },
    });
    expect(result).toMatchSnapshot();
  });
});
