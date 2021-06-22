/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR

export function SaleOrderDetailFormGroupFac(): FormGroup {
  return new FormGroup({
    id: new FormControl(''),
    saleOrderId: new FormControl('', Validators.required),
    orderQty: new FormControl('', Validators.required),
    productId: new FormControl('', Validators.required),
    unitPrice: new FormControl('', Validators.required),
    unitPriceDiscount: new FormControl('', Validators.required),
    lineTotal: new FormControl('', Validators.required),
    saleOrder: new FormControl(''),
    product: new FormControl(''),
  });
};
