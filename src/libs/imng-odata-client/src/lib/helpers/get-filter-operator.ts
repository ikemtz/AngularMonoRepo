import { filterOperators } from '../models/filter-operators';
import { IFilterOperator } from '../models/filter-operator';

export function getFilterOperator(operatorName?: string): IFilterOperator {
  return filterOperators[operatorName || ''];
}
