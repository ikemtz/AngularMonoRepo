import { IdType } from 'imng-nrsrx-client-utils';

export interface IFilterOperator {
  name: string;
  toODataString:
    | ((field: string, value?: IdType) => string)
    | ((field: string, value?: IdType[]) => string);
}
