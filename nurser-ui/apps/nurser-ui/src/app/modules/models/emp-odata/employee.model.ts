/**
 * This file is generated by the odata-ts-generator
 * For issues or feature request, visit the repo: https://github.com/ikemtz/OData-TS-Generator
 * Do not edit.
 */
 // tslint:disable: array-type
 
import { IEmployeeCertification } from './employee-certification.model';
import { ICompetency } from './competency.model';
import { IHealthItem } from './health-item.model';

export interface IEmployee {
    addressLine1?: string;
    birthDate?: Date;
    certifications?: Array<IEmployeeCertification>;
    city?: string;
    competencies?: Array<ICompetency>;
    createdBy?: string;
    createdOnUtc?: Date;
    email?: string;
    fireDate?: Date;
    firstName?: string;
    healthItems?: Array<IHealthItem>;
    hireDate?: Date;
    homePhone?: string;
    id?: string;
    isEnabled?: boolean;
    lastName?: string;
    mobilePhone?: string;
    photo?: string;
    state?: string;
    updatedBy?: string;
    updatedOnUtc?: Date;
    zip?: string;
}

export enum EmployeeProperties {
    ADDRESS_LINE_1 = 'addressLine1',
    BIRTH_DATE = 'birthDate',
    CERTIFICATIONS = 'certifications',
    CITY = 'city',
    COMPETENCIES = 'competencies',
    CREATED_BY = 'createdBy',
    CREATED_ON_UTC = 'createdOnUtc',
    EMAIL = 'email',
    FIRE_DATE = 'fireDate',
    FIRST_NAME = 'firstName',
    HEALTH_ITEMS = 'healthItems',
    HIRE_DATE = 'hireDate',
    HOME_PHONE = 'homePhone',
    ID = 'id',
    IS_ENABLED = 'isEnabled',
    LAST_NAME = 'lastName',
    MOBILE_PHONE = 'mobilePhone',
    PHOTO = 'photo',
    STATE = 'state',
    UPDATED_BY = 'updatedBy',
    UPDATED_ON_UTC = 'updatedOnUtc',
    ZIP = 'zip',
}
