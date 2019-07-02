export interface ODataPayload<T> {
  '@odata.context'?: string;
  '@odata.count'?: number;
  value: T[];
}
