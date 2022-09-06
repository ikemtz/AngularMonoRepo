import { filterOperators } from '../models';
import { IFilterOperator } from '../models/filter-operator';

export const getFilterOperator = (operatorName: string): IFilterOperator =>
  filterOperators[operatorName];
