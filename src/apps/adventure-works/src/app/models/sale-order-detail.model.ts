/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { ISaleOrder } from './sale-order.model';
import { IProduct } from './product.model';

export interface ISaleOrderDetail {
  id?: string;
  saleOrderId?: string;
  orderQty?: number;
  productId?: string;
  unitPrice?: number;
  unitPriceDiscount?: number;
  lineTotal?: number;
  saleOrder?: ISaleOrder;
  product?: IProduct;
}