import { FormGroup, FormControl, Validators } from '@angular/forms';
export function CertificationFormGroupFac(): FormGroup {
  return new FormGroup({
    createdBy: new FormControl(''),
    createdOnUtc: new FormControl(''),
    expiresOnUtc: new FormControl(''),
    id: new FormControl(''),
    isEnabled: new FormControl(''),
    name: new FormControl(''),
    updatedBy: new FormControl(''),
    updatedOnUtc: new FormControl(''),
  });
};
