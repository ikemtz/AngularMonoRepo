import { createODataPayload } from './odata-payload';

describe('createODataPayload', () => {

  it('should work', () => {
    const resultSet = [1, 2, 3, 4];
    const result = createODataPayload(resultSet);
    expect(result).toMatchSnapshot();
  });
});
