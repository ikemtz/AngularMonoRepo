import { FormGroup, FormControl, Validators } from '@angular/forms';
export function EmployeeInsertRequestFormGroupFac(): FormGroup {
  return new FormGroup({
    addressLine1: new FormControl(''),
    birthDate: new FormControl(''),
    certifications: new FormControl(''),
    city: new FormControl(''),
    competencies: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    healthItems: new FormControl(''),
    hireDate: new FormControl(''),
    homePhone: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    mobilePhone: new FormControl(''),
    photo: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
  });
};
