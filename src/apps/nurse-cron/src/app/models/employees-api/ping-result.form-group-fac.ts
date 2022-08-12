/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR

export interface IPingResultForm {
  name: FormControl<string | null>;
  version: FormControl<string | null>;
  build: FormControl<string | null>;
}

export function PingResultFormGroupFac(): FormGroup<IPingResultForm> {
  return new FormGroup<IPingResultForm>({
    name: new FormControl<string | null>(null),
    version: new FormControl<string | null>(null),
    build: new FormControl<string | null>(null),
  });
}
