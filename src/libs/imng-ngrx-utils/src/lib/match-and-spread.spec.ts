import { matchAndSpread } from './match-and-spread';

describe('matchAndSpread', () => {
  it('should work', () => {

    const dataset1 = [
      { id: 123, collection: ['😎', '🐱‍👤'] },
      { id: 456, collection: ['a', 'b', 'c'] },
    ];
    const dataset2 = [
      { id: 123, singleValue: '😎😎😉' },
      { id: 456, singleValue: '🐱', collection: ['d', 'x', 'c'] },
      { id: 789, doubeValue: '🎂', collection: ['d', 'x', 'c'] }
    ];
    const result = matchAndSpread(dataset1, dataset2);
    expect(result).toMatchSnapshot();
  });
});

