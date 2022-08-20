/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup } from '@angular/forms'; //NOSONAR

export interface ICertificationForm {
  id?: FormControl<string | null>;
  name?: FormControl<string | null>;
  isEnabled?: FormControl<boolean | null>;
  expiresOnUtc?: FormControl<Date | null>;
}
