import { PagerSettings } from '@progress/kendo-angular-grid';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { IOrder, IOrderLineItem } from '../../../models/odata';

export interface IExtOrder extends IOrder {
  orderLineItemODataState: ODataState;
  orderLineItemOData: ODataResult<IOrderLineItem>;
  orderLineItemPagerSettings: PagerSettings | false;
}
