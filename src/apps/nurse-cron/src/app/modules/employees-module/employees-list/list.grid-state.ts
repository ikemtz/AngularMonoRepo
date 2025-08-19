import { ODataState } from 'imng-kendo-odata';
import { EmployeeProperties } from '../../../models/employees-api';

export const employeeGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    EmployeeProperties.ID,
    EmployeeProperties.LAST_NAME,
    EmployeeProperties.FIRST_NAME,
    EmployeeProperties.BIRTH_DATE,
    EmployeeProperties.MOBILE_PHONE,
    EmployeeProperties.HOME_PHONE,
    EmployeeProperties.PHOTO,
    EmployeeProperties.EMAIL,
    EmployeeProperties.ADDRESS_LINE_1,
    EmployeeProperties.ADDRESS_LINE_2,
    EmployeeProperties.CITY,
    EmployeeProperties.STATE,
    EmployeeProperties.ZIP,
    EmployeeProperties.IS_ENABLED,
    EmployeeProperties.HIRE_DATE,
    EmployeeProperties.FIRE_DATE,
    EmployeeProperties.TOTAL_HOURS_OF_SERVICE,
    EmployeeProperties.CERTIFICATION_COUNT,
    EmployeeProperties.COMPETENCY_COUNT,
    EmployeeProperties.HEALTH_ITEM_COUNT,
  ],
  sort: [{ field: EmployeeProperties.LAST_NAME, dir: 'asc' }],
};
