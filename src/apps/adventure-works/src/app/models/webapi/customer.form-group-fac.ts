/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR

export function CustomerFormGroupFac(): FormGroup {
  return new FormGroup({
    id: new FormControl(''),
    num: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15)])),
    name: new FormControl('', Validators.maxLength(512)),
    companyName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(128)])),
    salesPerson: new FormControl(''),
    emailAddress: new FormControl('', Validators.maxLength(250)),
    phone: new FormControl('', Validators.maxLength(25)),
    customerAddresses: new FormArray([]),
    orders: new FormArray([]),
  });
}
