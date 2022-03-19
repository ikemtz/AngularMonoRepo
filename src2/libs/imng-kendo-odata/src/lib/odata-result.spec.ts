import { createODataResult } from './odata-result';

describe('createODataResult', () => {

  it('should work', () => {
    const resultSet = [1, 2, 3, 4];
    const result = createODataResult(resultSet);
    expect(result).toMatchSnapshot();
  });
});
