/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR

export function SaleOrderFormGroupFac(): FormGroup {
  return new FormGroup({
    id: new FormControl(''),
    salesOrderId: new FormControl('', Validators.required),
    revisionNum: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    shipDate: new FormControl(''),
    status: new FormControl('', Validators.required),
    isOnlineOrder: new FormControl('', Validators.required),
    num: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
    purchaseOrderNum: new FormControl('', Validators.maxLength(25)),
    accountNum: new FormControl('', Validators.maxLength(15)),
    customerID: new FormControl('', Validators.required),
    shipToAddressID: new FormControl(''),
    billToAddressID: new FormControl(''),
    shipMethod: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
    creditCardApprovalCode: new FormControl('', Validators.maxLength(15)),
    subTotal: new FormControl('', Validators.required),
    taxAmt: new FormControl('', Validators.required),
    freight: new FormControl('', Validators.required),
    totalDue: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.maxLength(-1)),
    shipToAddress: new FormControl(''),
    billToAddress: new FormControl(''),
    customer: new FormControl(''),
    saleOrderDetails: new FormArray([]),
  });
};