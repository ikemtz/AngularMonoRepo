export interface AggregateResult {
  [fieldName: string]: {
    count?: number;
    sum?: number;
    average?: number;
    min?: number;
    max?: number;
  };
}
