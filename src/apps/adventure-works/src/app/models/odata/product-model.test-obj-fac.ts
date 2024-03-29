/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { ProductModelProperties } from './product-model.properties';

export function createTestProductModel() {
    return { 
      [ProductModelProperties.ID]: 'ID',
      [ProductModelProperties.NAME]: 'NAME',
      [ProductModelProperties.DESCRIPTION]: 'DESCRIPTION', 
      [ProductModelProperties.PRODUCTS]: [],
    };
}
