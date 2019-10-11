import { FormGroup, FormControl, Validators } from '@angular/forms';
export function EmployeeFormGroupFac(): FormGroup {
  return new FormGroup({
    addressLine1: new FormControl(''),
    birthDate: new FormControl(''),
    certifications: new FormControl(''),
    city: new FormControl(''),
    competencies: new FormControl(''),
    createdBy: new FormControl(''),
    createdOnUtc: new FormControl(''),
    email: new FormControl(''),
    fireDate: new FormControl(''),
    firstName: new FormControl(''),
    healthItems: new FormControl(''),
    hireDate: new FormControl(''),
    homePhone: new FormControl(''),
    id: new FormControl(''),
    isEnabled: new FormControl(''),
    lastName: new FormControl(''),
    mobilePhone: new FormControl(''),
    photo: new FormControl(''),
    state: new FormControl(''),
    updatedBy: new FormControl(''),
    updatedOnUtc: new FormControl(''),
    zip: new FormControl(''),
  });
};
