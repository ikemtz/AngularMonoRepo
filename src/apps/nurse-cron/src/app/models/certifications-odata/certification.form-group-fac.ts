/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR
import { ICertificationForm } from './certification.form';

export function CertificationFormGroupFac(): FormGroup<ICertificationForm> {
  return new FormGroup<ICertificationForm>({
    id: new FormControl<string | null | undefined>(null),
    name: new FormControl<string | null | undefined>(null),
    isEnabled: new FormControl<boolean | null | undefined>(null),
    expiresOnUtc: new FormControl<Date | null | undefined>(null),
  });
}
