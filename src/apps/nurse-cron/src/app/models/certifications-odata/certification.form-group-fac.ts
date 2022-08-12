/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR

export interface ICertificationForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  isEnabled: FormControl<boolean | null>;
  expiresOnUtc: FormControl<Date | null>;
}

export function CertificationFormGroupFac(): FormGroup<ICertificationForm> {
  return new FormGroup<ICertificationForm>({
    id: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null),
    isEnabled: new FormControl<boolean | null>(null),
    expiresOnUtc: new FormControl<Date | null>(null),
  });
}
