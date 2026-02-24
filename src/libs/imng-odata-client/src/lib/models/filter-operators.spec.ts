import { FilterOperators } from './filter-operators';

describe('FilterOperators', () => {
  it('should support contains', () => {
    const result = FilterOperators.contains.toODataString('xyz', 123 as never);
    expect(result).toMatchSnapshot();
  });
  it('should support contains with relativeFields', () => {
    const result = FilterOperators.contains.toODataString(
      'xyz',
      'abc' as never,
      true,
    );
    expect(result).toMatchSnapshot();
  });
  it('should support endsWith', () => {
    const result = FilterOperators.endsWith.toODataString('xyz', 123 as never);
    expect(result).toMatchSnapshot();
  });
  it('should support endsWith with relativeFields', () => {
    const result = FilterOperators.endsWith.toODataString(
      'xyz',
      'abc' as never,
      true,
    );
    expect(result).toMatchSnapshot();
  });
  it('should support equals', () => {
    const result = FilterOperators.equals.toODataString('xyz', 123 as never);
    expect(result).toMatchSnapshot();
  });
  it('should support greaterThan', () => {
    const result = FilterOperators.greaterThan.toODataString(
      'xyz',
      123 as never,
    );
    expect(result).toMatchSnapshot();
  });
  it('should support greaterThanOrEquals', () => {
    const result = FilterOperators.greaterThanOrEquals.toODataString(
      'xyz',
      'abc' as never,
    );
    expect(result).toMatchSnapshot();
  });
  it('should support in', () => {
    const result = FilterOperators.in.toODataString('xyz', [
      'abc',
      123,
    ] as never);
    expect(result).toMatchSnapshot();
  });
  it('should support notIn', () => {
    const result = FilterOperators.notIn.toODataString('xyz', [
      'abc',
      123,
    ] as never);
    expect(result).toMatchSnapshot();
  });
  it('should support isEmpty', () => {
    const result = FilterOperators.isEmpty.toODataString('xyz');
    expect(result).toMatchSnapshot();
  });
  it('should support isNull', () => {
    const result = FilterOperators.isNull.toODataString('xyz');
    expect(result).toMatchSnapshot();
  });
  it('should support lessThan', () => {
    const result = FilterOperators.lessThan.toODataString('xyz', 123 as never);
    expect(result).toMatchSnapshot();
  });
  it('should support lessThan with relativeFields', () => {
    const result = FilterOperators.lessThan.toODataString(
      'xyz',
      'abc' as never,
      true,
    );
    expect(result).toMatchSnapshot();
  });
  it('should support lessThanOrEquals', () => {
    const result = FilterOperators.lessThanOrEquals.toODataString(
      'xyz',
      123 as never,
    );
    expect(result).toMatchSnapshot();
  });
  it('should support notContains', () => {
    const result = FilterOperators.notContains.toODataString(
      'xyz',
      123 as never,
    );
    expect(result).toMatchSnapshot();
  });
  it('should support notEmpty', () => {
    const result = FilterOperators.notEmpty.toODataString('xyz', 123 as never);
    expect(result).toMatchSnapshot();
  });
  it('should support notEndsWith', () => {
    const result = FilterOperators.notEndsWith.toODataString(
      'xyz',
      123 as never,
    );
    expect(result).toMatchSnapshot();
  });
  it('should support notEquals', () => {
    const result = FilterOperators.notEquals.toODataString('xyz', 123 as never);
    expect(result).toMatchSnapshot();
  });
  it('should support notNull', () => {
    const result = FilterOperators.notNull.toODataString('xyz');
    expect(result).toMatchSnapshot();
  });
  it('should support notStartsWith', () => {
    const result = FilterOperators.notStartsWith.toODataString(
      'xyz',
      '123' as never,
    );
    expect(result).toMatchSnapshot();
  });
  it('should support startsWith', () => {
    const result = FilterOperators.startsWith.toODataString(
      'xyz',
      '123' as never,
    );
    expect(result).toMatchSnapshot();
  });
});
