import { of } from 'rxjs';
import { cachinator } from './cachinator';
import { readFirst } from 'imng-ngrx-utils/testing';

describe('cachinator', () => {
  it('should provide cached data', async () => {
    const data = [{ id: 123, collection: ['😎', '🐱‍👤'] }];
    const observable = of([{ id: 456, collection: ['a', 'b', 'c'] }]);

    const result = await readFirst(cachinator(data, observable));
    expect(result).toStrictEqual(data);
  });

  it('should provide observable if empty cached data available', () => {
    const data = [];
    const observable = of([{ id: 456, collection: ['a', 'b', 'c'] }]);

    const result = cachinator(data, observable);
    expect(result).toEqual(observable);
  });

  it('should provide observable if no cached data available', () => {
    const data = null;
    const observable = of([{ id: 456, collection: ['a', 'b', 'c'] }]);

    const result = cachinator(data, observable);
    expect(result).toEqual(observable);
  });
});
