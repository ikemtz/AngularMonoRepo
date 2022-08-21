/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { OrderStatusTypes } from './order-status-types.enum';
import { ShippingTypes } from './shipping-types.enum';
import { OrderProperties } from './order.properties';

export function createTestOrder() {
    return { 
      [OrderProperties.ID]: 'ID',
      [OrderProperties.ORDER_ID]: 0,
      [OrderProperties.REVISION_NUM]: 0,
      [OrderProperties.DATE]: new Date(),
      [OrderProperties.DUE_DATE]: new Date(),
      [OrderProperties.SHIP_DATE]: new Date(),
      [OrderProperties.IS_ONLINE_ORDER]: false,
      [OrderProperties.NUM]: 'NUM',
      [OrderProperties.PURCHASE_ORDER_NUM]: 'PURCHASE_ORDER_NUM',
      [OrderProperties.CUSTOMER_ID]: 'CUSTOMER_ID',
      [OrderProperties.SHIP_TO_ADDRESS_ID]: 'SHIP_TO_ADDRESS_ID',
      [OrderProperties.BILL_TO_ADDRESS_ID]: 'BILL_TO_ADDRESS_ID',
      [OrderProperties.CREDIT_CARD_APPROVAL_CODE]: 'CREDIT_CARD_APP',
      [OrderProperties.SUB_TOTAL]: 0,
      [OrderProperties.TAX_AMT]: 0,
      [OrderProperties.FREIGHT]: 0,
      [OrderProperties.TOTAL_DUE]: 0,
      [OrderProperties.COMMENT]: 'COMMENT', 
      [OrderProperties.STATUS_TYPE]: OrderStatusTypes.Processing,
      [OrderProperties.SHIPPING_TYPE]: ShippingTypes.Other,
      [OrderProperties.CUSTOMER]: undefined,
      [OrderProperties.SHIP_TO_ADDRESS]: undefined,
      [OrderProperties.BILL_TO_ADDRESS]: undefined,
      [OrderProperties.ORDER_LINE_ITEMS]: [],
    };
}