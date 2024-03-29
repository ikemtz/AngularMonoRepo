/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR
import { IScheduleForm } from './schedule.form';

export function ScheduleFormGroupFac(): FormGroup<IScheduleForm> {
  return new FormGroup<IScheduleForm>({
    id: new FormControl<string | null | undefined>(null),
    unitId: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    unitName: new FormControl<string>('', {
      validators: Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      nonNullable: true,
    }),
    employeeId: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    employeeName: new FormControl<string>('', {
      validators: Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      nonNullable: true,
    }),
    staffingRequirementId: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    startTimeUtc: new FormControl<Date>(new Date(), {
      validators: Validators.required,
      nonNullable: true,
    }),
    scheduledHours: new FormControl<number>(0, {
      validators: Validators.required,
      nonNullable: true,
    }),
    approvedOnUtc: new FormControl<Date>(new Date(), {
      validators: Validators.required,
      nonNullable: true,
    }),
  });
}
