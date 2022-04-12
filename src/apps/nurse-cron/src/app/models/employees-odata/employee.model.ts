/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { IEmployeeCertification } from './employee-certification.model';
import { IEmployeeCompetency } from './employee-competency.model';
import { IEmployeeHealthItem } from './employee-health-item.model';

export interface IEmployee {
  id?: string;
  lastName?: string;
  firstName?: string;
  birthDate?: Date;
  mobilePhone?: string;
  homePhone?: string;
  photo?: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
  isEnabled?: boolean;
  hireDate?: Date;
  fireDate?: Date;
  totalHoursOfService?: number;
  certificationCount?: number;
  competencyCount?: number;
  healthItemCount?: number;
  employeeCertifications?: IEmployeeCertification[];
  employeeCompetencies?: IEmployeeCompetency[];
  employeeHealthItems?: IEmployeeHealthItem[];
}
