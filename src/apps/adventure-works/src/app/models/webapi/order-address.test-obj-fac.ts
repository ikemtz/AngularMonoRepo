/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { OrderAddressProperties } from './order-address.properties';

export function createTestOrderAddress() {
    return { 
      [OrderAddressProperties.ID]: 'ID',
      [OrderAddressProperties.LINE_1]: 'LINE_1',
      [OrderAddressProperties.LINE_2]: 'LINE_2',
      [OrderAddressProperties.CITY]: 'CITY',
      [OrderAddressProperties.STATE_PROVINCE]: 'STATE_PROVINCE',
      [OrderAddressProperties.COUNTRY_REGION]: 'COUNTRY_REGION',
      [OrderAddressProperties.POSTAL_CODE]: 'POSTAL_CODE', 
      [OrderAddressProperties.BILL_TO_ORDERS]: [],
      [OrderAddressProperties.SHIP_TO_ORDERS]: [],
    };
}