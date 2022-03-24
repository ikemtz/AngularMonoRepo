/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { ICustomerAddress } from './customer-address.model';
import { ISaleOrder } from './sale-order.model';

export interface ICustomer {
  id?: string;
  nameStyle?: boolean;
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  companyName?: string;
  salesPerson?: string;
  emailAddress?: string;
  phone?: string;
  customerAddresses?: ICustomerAddress[];
  saleOrders?: ISaleOrder[];
}
