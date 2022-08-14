/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { CustomerAddressProperties } from './customer-address.properties';

export function createTestCustomerAddress() {
    return { 
      [CustomerAddressProperties.ID]: 'ID',
      [CustomerAddressProperties.CUSTOMER_ID]: 'CUSTOMER_ID',
      [CustomerAddressProperties.ADDRESS_TYPE]: 'ADDRESS_TYPE',
      [CustomerAddressProperties.LINE_1]: 'LINE_1',
      [CustomerAddressProperties.LINE_2]: 'LINE_2',
      [CustomerAddressProperties.CITY]: 'CITY',
      [CustomerAddressProperties.STATE_PROVINCE]: 'STATE_PROVINCE',
      [CustomerAddressProperties.COUNTRY_REGION]: 'COUNTRY_REGION',
      [CustomerAddressProperties.POSTAL_CODE]: 'POSTAL_CODE', 
      [CustomerAddressProperties.CUSTOMER]: undefined,
    };
}
