import { FormControl, FormGroup } from '@angular/forms';

declare module '@angular/forms' {
  export interface FormGroup {
    addTypeAheadControl(
      controlName?: string,
      initialValue?: string,
    ): FormControl;
  }
}
FormGroup.prototype.addTypeAheadControl = function (
  controlName = 'typeAhead',
  initialValue = '',
): FormControl<string | null> {
  return addTypeAheadControl(this, controlName, initialValue);
};

export function addTypeAheadControl(
  formGroup: FormGroup,
  controlName = 'typeAhead',
  initialValue = '',
): FormControl<string | null> {
  const formControl = new FormControl<string>(initialValue);
  formGroup.addControl(controlName, formControl);
  return formControl;
}
