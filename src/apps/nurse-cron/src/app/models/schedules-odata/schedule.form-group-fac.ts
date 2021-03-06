/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
/* tslint:disable */
import { FormControl, FormGroup, Validators } from '@angular/forms';

export function ScheduleFormGroupFac(): FormGroup {
  return new FormGroup({
    id: new FormControl(''),
    unitId: new FormControl('', Validators.required),
    unitName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(250)])),
    employeeId: new FormControl('', Validators.required),
    employeeName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(250)])),
    staffingRequirementId: new FormControl('', Validators.required),
    startTimeUtc: new FormControl('', Validators.required),
    scheduledHours: new FormControl('', Validators.required),
    approvedOnUtc: new FormControl('', Validators.required),
  });
}
