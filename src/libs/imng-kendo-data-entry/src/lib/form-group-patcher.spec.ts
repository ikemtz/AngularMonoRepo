import { formGroupPatcher } from './form-group-patcher';
import { of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

describe('formGroupPatcher', () => {
  it('should patch', () => {
    const formGroup = new FormGroup({
      id: new FormControl(''),
    });
    const entity = { id: '🤦‍♂️😂' };
    of(entity)
      .pipe(formGroupPatcher(formGroup))
      .subscribe();
    expect(formGroup.value).toStrictEqual(entity);
  });
});
