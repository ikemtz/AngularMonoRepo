/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { IOrder } from './order.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IOrderAddress {
  id?: string | null;
  line1?: string;
  line2?: string | null;
  city?: string;
  stateProvince?: string;
  countryRegion?: string;
  postalCode?: string;
  billToOrders?: Partial<IOrder[]>;
  shipToOrders?: Partial<IOrder[]>;
}
