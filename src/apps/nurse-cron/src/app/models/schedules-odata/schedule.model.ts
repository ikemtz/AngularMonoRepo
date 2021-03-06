/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
/* tslint:disable */
export interface ISchedule {
  id?: string;
  unitId?: string;
  unitName?: string;
  employeeId?: string;
  employeeName?: string;
  staffingRequirementId?: string;
  startTimeUtc?: Date;
  scheduledHours?: number;
  approvedOnUtc?: Date;
}
