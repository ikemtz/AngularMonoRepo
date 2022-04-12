/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR

export function CustomerAddressFormGroupFac(): FormGroup {
  return new FormGroup({
    id: new FormControl(''),
    customerId: new FormControl('', Validators.required),
    addressType: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
    line1: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(60)])),
    line2: new FormControl('', Validators.maxLength(60)),
    city: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
    stateProvince: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
    countryRegion: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
    postalCode: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15)])),
    customer: new FormControl(''),
  });
}
