import { removeById } from './remove-by-id';

describe('removeById', () => {
  const result = (): { data: { id: number; val: string }[]; total: number } => ({
    data: [
      { id: 4, val: '👼👼' },
      { id: 3, val: '👼👼' },
    ],
    total: 2,
  });
  it('should handle ODataResult', () => {
    expect(removeById(result(), 4)).toStrictEqual({ data: [{ id: 3, val: '👼👼' }], total: 1 });
  });
  it('should handle Array', () => {
    expect(removeById(result().data, 3)).toStrictEqual([{ id: 4, val: '👼👼' }]);
  });
  it('should handle empty Array', () => {
    expect(removeById([], 3)).toStrictEqual([]);
  });
  it('should handle empty odataResult', () => {
    expect(removeById({ data: [], total: 0 }, 3)).toStrictEqual({ data: [], total: 0 });
  });
  it('should handle null', () => {
    expect(removeById(null, 3)).toStrictEqual([]);
  });
});
