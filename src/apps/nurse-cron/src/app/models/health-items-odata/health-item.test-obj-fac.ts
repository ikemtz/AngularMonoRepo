/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { HealthItemProperties } from './health-item.properties';

export function createTestHealthItem() {
    return { 
      [HealthItemProperties.ID]: 'ID',
      [HealthItemProperties.NAME]: 'NAME',
      [HealthItemProperties.IS_ENABLED]: false, 
    };
}
