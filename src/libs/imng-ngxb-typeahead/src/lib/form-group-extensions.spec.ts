import { FormGroup } from '@angular/forms';
import './form-group-extensions';

describe('addTypeAheadControl', () => {
  it('should work', () => {
    const formGroup = new FormGroup({});
    const control = formGroup.addTypeAheadControl();
    expect(control).toBeTruthy();
    expect(formGroup.value).toMatchSnapshot();
  });
});
