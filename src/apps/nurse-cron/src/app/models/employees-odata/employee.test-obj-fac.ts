/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { EmployeeProperties } from './employee.properties';

export function createTestEmployee() {
    return { 
      [EmployeeProperties.ID]: 'ID',
      [EmployeeProperties.LAST_NAME]: 'LAST_NAME',
      [EmployeeProperties.FIRST_NAME]: 'FIRST_NAME',
      [EmployeeProperties.BIRTH_DATE]: new Date(),
      [EmployeeProperties.MOBILE_PHONE]: 'MOBILE_PHONE',
      [EmployeeProperties.HOME_PHONE]: 'HOME_PHONE',
      [EmployeeProperties.PHOTO]: 'PHOTO',
      [EmployeeProperties.EMAIL]: 'EMAIL',
      [EmployeeProperties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',
      [EmployeeProperties.ADDRESS_LINE_2]: 'ADDRESS_LINE_2',
      [EmployeeProperties.CITY]: 'CITY',
      [EmployeeProperties.STATE]: 'ST',
      [EmployeeProperties.ZIP]: 'ZIP',
      [EmployeeProperties.IS_ENABLED]: false,
      [EmployeeProperties.HIRE_DATE]: new Date(),
      [EmployeeProperties.FIRE_DATE]: new Date(),
      [EmployeeProperties.TOTAL_HOURS_OF_SERVICE]: 0,
      [EmployeeProperties.CERTIFICATION_COUNT]: 0,
      [EmployeeProperties.COMPETENCY_COUNT]: 0,
      [EmployeeProperties.HEALTH_ITEM_COUNT]: 0, 
      [EmployeeProperties.EMPLOYEE_CERTIFICATIONS]: [],
      [EmployeeProperties.EMPLOYEE_COMPETENCIES]: [],
      [EmployeeProperties.EMPLOYEE_HEALTH_ITEMS]: [],
    };
}
