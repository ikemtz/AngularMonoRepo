/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
/* tslint:disable */
import { FormControl, FormGroup, Validators } from '@angular/forms';

export function CompetencyFormGroupFac(): FormGroup {
  return new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    isEnabled: new FormControl(''),
  });
}
