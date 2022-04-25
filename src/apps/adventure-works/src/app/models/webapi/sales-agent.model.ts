/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { ICustomer } from './customer.model';

export interface ISalesAgent {
  id?: number;
  name?: string;
  loginId?: string;
  customers?: ICustomer[];
}
