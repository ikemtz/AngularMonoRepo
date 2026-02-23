import { IdType } from 'imng-nrsrx-client-utils';

export interface IFilterOperator {
  name: string;
  toODataString:
    | ((field: string, isRelativeValue: boolean, value?: IdType) => string)
    | ((field: string, isRelativeValue: boolean, value?: IdType[]) => string);
}
