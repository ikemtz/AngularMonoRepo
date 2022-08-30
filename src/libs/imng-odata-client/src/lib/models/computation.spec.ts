import { Computation, isComputation } from './computation';
import { ComputationOperators } from './computation-operators';

describe('Computation', () => {
  it('should validate isComputation', () => {
    const computation: Computation = {
      fieldA: '2',
      fieldB: 3,
      operator: ComputationOperators.Multiply,
      alias: 'x',
    };
    expect(isComputation(computation)).toBe(true);
  });
});
