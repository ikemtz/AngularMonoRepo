import { IdType } from 'imng-nrsrx-client-utils';
import { IFilter, isFilter } from './filter';
import { IFilterOperator } from './filter-operator';
import { ICompositeFilter } from './composite-filter';
import { IChildFilter } from './child-filter';
import { FilterOperators } from './filter-operators';

export interface IArrayFilter extends IFilter {
  /**
   * The supported operators are:
   * * `FilterOperators.in` (specified value should be an array)
   * * `FilterOperators.notIn` (specified value should be an array)
   */
  operator: IFilterOperator | string;
  /**
   * The value to which the field is compared. Has to be of the same type as the field.
   */
  value?: IdType[] | null;
}

export function isArrayFilter(
  source: ICompositeFilter | IFilter | IChildFilter | string,
): source is IArrayFilter {
  return (
    isFilter(source) &&
    (source.operator === 'in' ||
      source.operator === 'notIn' ||
      source.operator === FilterOperators.in ||
      source.operator === FilterOperators.notIn)
  );
}
