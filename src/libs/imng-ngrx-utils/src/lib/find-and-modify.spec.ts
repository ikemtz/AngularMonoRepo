import { findAndModify } from './find-and-modify';

describe('findAndModify', () => {
  it('should work', () => {

    const data = [
      { id: 123, collection: ['😎', '🐱‍👤'] },
      { id: 456, collection: ['a', 'b', 'c'] }
    ];
    findAndModify(data, 456, x => x.collection = ['x', 'y', 'z']);
  });
});
