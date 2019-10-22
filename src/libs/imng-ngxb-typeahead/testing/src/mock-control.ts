import { NgControl, AbstractControl } from '@angular/forms';

export class MockNgControl extends NgControl {
  control = new MockAbstractControl();
  viewToModelUpdate(newValue: any): void {
    // do nothing here, as this is only a mock
  }
}

class MockAbstractControl extends AbstractControl {
  constructor() {
    super(null, null);
  }
  public value = '';
  setValue(value: any, options?: Object): void {
    value = value;
  }
  patchValue(value: any, options?: Object): void {
    value = value;
  }
  reset(value?: any, options?: Object): void {
    value = '';
  }
}
