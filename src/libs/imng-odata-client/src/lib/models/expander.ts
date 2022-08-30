import { ODataQuery } from './odata-query';

export interface Expander extends ODataQuery {
  table: string;
}

export function isExpander(source: string | Expander): source is Expander {
  return !!(source as Expander)?.table;
}
