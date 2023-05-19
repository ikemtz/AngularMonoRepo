import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function loadFormArray<
  TFORM extends { [k in keyof TFORM]: AbstractControl<never, never> },
>(
  formGroupFac: () => FormGroup<TFORM>,
  formArray?: FormArray<FormGroup<TFORM>>,
  data?: never[],
) {
  formArray?.clear({ emitEvent: false });
  data?.forEach((record) => {
    const form = formGroupFac();
    form.patchValue(record, { emitEvent: false });
    formArray?.push(form);
  });
}
