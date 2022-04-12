/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR

export function ProductFormGroupFac(): FormGroup {
  return new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
    num: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
    color: new FormControl('', Validators.maxLength(15)),
    standardCost: new FormControl('', Validators.required),
    listPrice: new FormControl('', Validators.required),
    size: new FormControl('', Validators.maxLength(5)),
    weight: new FormControl(''),
    productCategoryId: new FormControl(''),
    productModelId: new FormControl(''),
    sellStartDate: new FormControl('', Validators.required),
    sellEndDate: new FormControl(''),
    discontinuedDate: new FormControl(''),
    thumbNailPhoto: new FormControl('', Validators.maxLength(5000)),
    productModel: new FormControl(''),
    productCategory: new FormControl(''),
    orderLineItems: new FormArray([]),
  });
}