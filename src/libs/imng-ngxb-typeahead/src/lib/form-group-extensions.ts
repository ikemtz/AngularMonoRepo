import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

declare module '@angular/forms' {
  export interface FormGroup {
    addTypeAheadControl(controlName?: string, initialValue?: string): FormControl;
  }
}
UntypedFormGroup.prototype.addTypeAheadControl = function (controlName = 'typeAhead', initialValue = ''): UntypedFormControl {
  return addTypeAheadControl(this, controlName, initialValue);
};

export function addTypeAheadControl(formGroup: UntypedFormGroup, controlName = 'typeAhead', initialValue = ''): UntypedFormControl {
  const formControl = new UntypedFormControl(initialValue);
  formGroup.addControl(controlName, formControl);
  return formControl;
}
