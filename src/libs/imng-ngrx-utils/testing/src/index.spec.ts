import { of } from 'rxjs';
import { readAll, readFirst } from './index'

describe('readFirst', () => {
  it('should work', async () => {
    const result = await readFirst(of('x', 1, 3));
    expect(result).toBe('x');
  });
});

describe('readAll', () => {
  it('should work', async () => {
    const result = await readAll(of('x', 2, 3));
    expect(result).toStrictEqual(['x',2, 3]);
  }); it('should work with single value', async () => {
    const result = await readAll(of('x'));
    expect(result).toStrictEqual(['x']);
  });
});