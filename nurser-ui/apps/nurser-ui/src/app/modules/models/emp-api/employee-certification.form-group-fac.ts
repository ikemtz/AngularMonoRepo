import { FormGroup, FormControl, Validators } from '@angular/forms';
export function EmployeeCertificationFormGroupFac(): FormGroup {
  return new FormGroup({
    certificationId: new FormControl(''),
    certificationName: new FormControl(''),
    employeeId: new FormControl(''),
    expiresOnUtc: new FormControl(''),
    id: new FormControl(''),
  });
};
