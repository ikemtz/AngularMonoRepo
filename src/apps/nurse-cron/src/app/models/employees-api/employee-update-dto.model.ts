/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { IEmployeeCertification } from './employee-certification.model';
import { IEmployeeCompetency } from './employee-competency.model';
import { IEmployeeHealthItem } from './employee-health-item.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEmployeeUpdateDto {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  hireDate?: Date;
  addressLine1?: string;
  city?: string;
  state?: string;
  zip?: string;
  homePhone?: string;
  mobilePhone?: string;
  photo?: string;
  birthDate?: Date;
  fireDate?: Date;
  isEnabled?: boolean;
  employeeCertifications?: IEmployeeCertification[];
  employeeCompetencies?: IEmployeeCompetency[];
  employeeHealthItems?: IEmployeeHealthItem[];
}