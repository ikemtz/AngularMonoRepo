import { FormGroup, FormControl, Validators } from '@angular/forms';
export function CertificationUpdateRequestFormGroupFac(): FormGroup {
  return new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
  });
};
