import { formGroupPatcher } from './form-group-patcher';
import { of } from 'rxjs';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

describe('formGroupPatcher', () => {
  it('should patch', () => {
    const formGroup = new UntypedFormGroup({
      id: new UntypedFormControl(''),
    });
    const entity = { id: '🤦‍♂️😂' };
    of(entity)
      .pipe(formGroupPatcher(formGroup))
      .subscribe();
    expect(formGroup.value).toStrictEqual(entity);
  });
});
