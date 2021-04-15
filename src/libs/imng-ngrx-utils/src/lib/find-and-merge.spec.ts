 import {findAndMerge} from './find-and-merge';

describe('findAndMerge', () => {
  it('should work', () => {

    const data = [
      { id: 123, collection: ['😎', '🐱‍👤'] },
      { id: 456, collection: ['a', 'b', 'c'] }
    ];
    const record= {id: 123, singleValue: '😎😎😉'};
    const result = findAndMerge(record, data);
    expect(result).toMatchSnapshot();
  });
}); 

