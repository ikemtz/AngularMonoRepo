/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { ICustomer } from './customer.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISalesAgent {
  id?: number | null;
  name?: string;
  loginId?: string;
  customers?: ICustomer[] | null;
}
