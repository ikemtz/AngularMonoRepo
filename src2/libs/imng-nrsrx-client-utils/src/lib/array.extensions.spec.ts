import './array.extensions';
describe('distinct<T>', () => {
  it('to handle a,b,a,c', () => {
    const collection = ['a', 'b', 'a', 'c'];

    expect(collection.distinct()).toStrictEqual(['a', 'b', 'c']);
  });

  it('to handle 1,2,3,1', () => {
    const collection = [1, 2, 3, 1];
    expect(collection.distinct()).toStrictEqual([1, 2, 3]);
  });
});
