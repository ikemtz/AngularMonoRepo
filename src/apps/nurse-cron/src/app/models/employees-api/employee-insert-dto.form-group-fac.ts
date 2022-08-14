/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR
import { IEmployeeInsertDtoForm } from './employee-insert-dto.form';
import { IEmployeeCertificationForm } from './employee-certification.form';
import { IEmployeeCompetencyForm } from './employee-competency.form';
import { IEmployeeHealthItemForm } from './employee-health-item.form';

export function EmployeeInsertDtoFormGroupFac(): FormGroup<IEmployeeInsertDtoForm> {
  return new FormGroup<IEmployeeInsertDtoForm>({
    id: new FormControl<string | null>(null),
    firstName: new FormControl<string>('', {
      validators: Validators.compose([
        Validators.required,
        Validators.minLength(1),
      ]),
      nonNullable: true,
    }),
    lastName: new FormControl<string>('', {
      validators: Validators.compose([
        Validators.required,
        Validators.minLength(1),
      ]),
      nonNullable: true,
    }),
    email: new FormControl<string | null>(null),
    hireDate: new FormControl<Date | null>(null),
    addressLine1: new FormControl<string | null>(null),
    city: new FormControl<string | null>(null),
    state: new FormControl<string | null>(null),
    zip: new FormControl<string | null>(null),
    homePhone: new FormControl<string | null>(null),
    mobilePhone: new FormControl<string | null>(null),
    photo: new FormControl<string | null>(null),
    birthDate: new FormControl<Date | null>(null),
    employeeCertifications: new FormArray<
      FormGroup<IEmployeeCertificationForm>
    >([]),
    employeeCompetencies: new FormArray<FormGroup<IEmployeeCompetencyForm>>([]),
    employeeHealthItems: new FormArray<FormGroup<IEmployeeHealthItemForm>>([]),
  });
}
