/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { EmployeeCertificationProperties } from './employee-certification.properties';

export function createTestEmployeeCertification() {
    return { 
      [EmployeeCertificationProperties.ID]: 'ID',
      [EmployeeCertificationProperties.EMPLOYEE_ID]: 'EMPLOYEE_ID',
      [EmployeeCertificationProperties.CERTIFICATION_ID]: 'CERTIFICATION_ID',
      [EmployeeCertificationProperties.CERTIFICATION_NAME]: 'CERTIFICATION_NAME',
      [EmployeeCertificationProperties.EXPIRES_ON_UTC]: new Date(), 
    };
}
