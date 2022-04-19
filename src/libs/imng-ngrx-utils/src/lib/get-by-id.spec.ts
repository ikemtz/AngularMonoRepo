import { getById } from './get-by-id';

describe('getById', () => {
  it('should work for arrays', () => {

    const data = [
      { id: 123, collection: ['😎', '🐱‍👤'] },
      { id: 456, collection: ['a', 'b', 'c'] }
    ];
    const result = getById(data, 456);
    expect(result).toStrictEqual(data[1]);
  });
  it('should work for odataResult', () => {
    const data = {
      data: [{ id: 123, collection: ['😎', '🐱‍👤'] },
      { id: 456, collection: ['a', 'b', 'c'] }
      ], total: 2
    };
    const result = getById(data, 456);
    expect(result).toStrictEqual(data.data[1]);
  });
  it('should work with undefined', () => {
    const result = getById({ total: 0 } as never, 456);
    expect(result).toBeUndefined();
  });
});
