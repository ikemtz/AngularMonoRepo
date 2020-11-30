export interface ODataPayload<T> {
  '@odata.context'?: string;
  '@odata.count'?: number;
  value: T[];
}

export function createODataPayload<T>(resultSet: T[]): ODataPayload<T> {
  return {
    ['@odata.count']: resultSet?.length,
    value: resultSet,
  };
}
