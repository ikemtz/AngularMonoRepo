/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR
import { ISalesAgentForm } from './sales-agent.form';
import { ICustomerForm } from './customer.form';

export function SalesAgentFormGroupFac(): FormGroup<ISalesAgentForm> {
  return new FormGroup<ISalesAgentForm>({
    id: new FormControl<number | null | undefined>(null),
    name: new FormControl<string>('', {
      validators: Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(256),
      ]),
      nonNullable: true,
    }),
    loginId: new FormControl<string>('', {
      validators: Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(256),
      ]),
      nonNullable: true,
    }),
    customers: new FormArray<FormGroup<ICustomerForm>>([]),
  });
}
