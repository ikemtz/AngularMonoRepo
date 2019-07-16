import { FormGroup, FormControl, Validators } from '@angular/forms';
export function CompetencyFormGroupFac(): FormGroup {
  return new FormGroup({
    id: new FormControl(''),
    isEnabled: new FormControl(''),
    name: new FormControl(''),
  });
};
