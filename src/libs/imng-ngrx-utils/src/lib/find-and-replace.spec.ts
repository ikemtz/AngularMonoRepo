import { findAndReplace } from './find-and-replace';

describe('findAndReplace', () => {
  it('should work', () => {

    const data = [
      { id: 123, collection: ['😎', '🐱‍👤'] },
      { id: 456, collection: ['a', 'b', 'c'] }
    ];
    findAndReplace(data, 456, x => x.collection = ['x', 'y', 'z']);
  });
});
