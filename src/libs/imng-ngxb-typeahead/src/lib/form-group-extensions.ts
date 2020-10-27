import { FormControl, FormGroup } from '@angular/forms';

declare module '@angular/forms' {
  export interface FormGroup {
    addTypeAheadControl(controlName?: string, initialValue?: string): FormControl;
  }
}
// tslint:disable-next-line: space-before-function-paren
FormGroup.prototype.addTypeAheadControl = function (controlName: string = 'typeAhead', initialValue: string = ''): FormControl {
  const formGroup: FormGroup = this;
  return addTypeAheadControl(formGroup, controlName, initialValue);
};

export function addTypeAheadControl(formGroup: FormGroup, controlName: string = 'typeAhead', initialValue: string = ''): FormControl {
  const formControl = new FormControl(initialValue);
  formGroup.addControl(controlName, formControl);
  return formControl;
}
