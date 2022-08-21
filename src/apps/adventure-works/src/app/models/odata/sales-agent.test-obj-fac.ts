/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { SalesAgentProperties } from './sales-agent.properties';

export function createTestSalesAgent() {
    return { 
      [SalesAgentProperties.ID]: 0,
      [SalesAgentProperties.NAME]: 'NAME',
      [SalesAgentProperties.LOGIN_ID]: 'LOGIN_ID', 
      [SalesAgentProperties.CUSTOMERS]: [],
    };
}