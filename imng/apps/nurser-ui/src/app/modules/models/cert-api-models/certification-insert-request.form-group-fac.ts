import { FormGroup, FormControl, Validators } from '@angular/forms';
export function CertificationInsertRequestFormGroupFac(): FormGroup {
  return new FormGroup({
    name: new FormControl('', Validators.required),
  });
};
