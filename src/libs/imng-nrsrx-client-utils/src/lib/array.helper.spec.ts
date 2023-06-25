import { flat } from './array.helper';
describe('array.helper', () => {
  it('flat should work 2 deep', () => {
    const array = [1, 2, 3, [4, 5, [6]]];
    expect(flat(array)).toMatchSnapshot();
  });

  it('flat should work 3 deep', () => {
    const array = [1, 2, 3, [4, 5, [6]]];
    expect(flat(flat(array))).toMatchSnapshot();
  });
});
