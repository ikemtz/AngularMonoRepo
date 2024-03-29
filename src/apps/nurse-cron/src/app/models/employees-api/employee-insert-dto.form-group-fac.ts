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
    id: new FormControl<string | null | undefined>(null),
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
    email: new FormControl<string | null | undefined>(null, {
      validators: Validators.email,
    }),
    hireDate: new FormControl<Date | null | undefined>(null),
    addressLine1: new FormControl<string | null | undefined>(null),
    city: new FormControl<string | null | undefined>(null),
    state: new FormControl<string | null | undefined>(null),
    zip: new FormControl<string | null | undefined>(null),
    homePhone: new FormControl<string | null | undefined>(null),
    mobilePhone: new FormControl<string | null | undefined>(null),
    photo: new FormControl<string | null | undefined>(null),
    birthDate: new FormControl<Date | null | undefined>(null),
    employeeCertifications: new FormArray<
      FormGroup<IEmployeeCertificationForm>
    >([]),
    employeeCompetencies: new FormArray<FormGroup<IEmployeeCompetencyForm>>([]),
    employeeHealthItems: new FormArray<FormGroup<IEmployeeHealthItemForm>>([]),
  });
}
