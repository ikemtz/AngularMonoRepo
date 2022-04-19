import { createEmptyODataResult, createODataResult, isODataResult } from './odata-result';

describe('odata-result.ts', () => {
  describe('createODataResult', () => {
    it('should work', () => {
      const resultSet = [1, 2, 3, 4];
      const result = createODataResult(resultSet);
      expect(result).toMatchSnapshot();
    });
    it('should work with nulls', () => {
      const result = createODataResult(null as never);
      expect(result).toMatchSnapshot();
    });
  });

  describe('createEmptyODataResult', () => {
    it('should work', () => {
      const result = createEmptyODataResult();
      expect(result).toMatchSnapshot();
      expect(isODataResult(result)).toBe(true);
    });
  });

  describe('isODataResult', () => {
    it('should work with nulls', () => {
      const result = isODataResult(null);
      expect(isODataResult(result)).toBe(false);
    });
  });
});
