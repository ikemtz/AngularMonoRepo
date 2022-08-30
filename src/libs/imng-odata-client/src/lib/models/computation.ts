import { ComputationOperators } from './computation-operators';

export interface Computation {
  /** This is the first value to be used in the computation */
  fieldA: string | number;
  /** This is the second value to be used in the computation */
  fieldB: string | number;
  operator: ComputationOperators | string; //NOSONAR

  /** This MUST differ from the names of declared or dynamic properties of the identified resources. */
  alias: string;
}

export function isComputation(
  source: string | Computation,
): source is Computation {
  return !!(source as Computation)?.operator;
}
