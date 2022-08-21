/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { CustomerProperties } from './customer.properties';

export function createTestCustomer() {
    return { 
      [CustomerProperties.ID]: 'ID',
      [CustomerProperties.NUM]: 'NUM_NUM_NUM_NUM',
      [CustomerProperties.NAME]: 'NAME',
      [CustomerProperties.COMPANY_NAME]: 'COMPANY_NAME',
      [CustomerProperties.SALES_AGENT_ID]: 0,
      [CustomerProperties.EMAIL_ADDRESS]: 'EMAIL_ADDRESS',
      [CustomerProperties.PHONE]: 'PHONE', 
      [CustomerProperties.SALES_AGENT]: undefined,
      [CustomerProperties.CUSTOMER_ADDRESSES]: [],
      [CustomerProperties.ORDERS]: [],
    };
}