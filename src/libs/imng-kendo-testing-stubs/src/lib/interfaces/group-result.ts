import { AggregateResult } from './aggregate-result';

export interface GroupResult {
  items: unknown[];
  aggregates: AggregateResult;
  field: string;
  value: unknown;
}
