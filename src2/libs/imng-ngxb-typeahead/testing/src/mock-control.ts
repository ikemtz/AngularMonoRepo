import { NgControl, AbstractControl } from '@angular/forms';

export class MockNgControl extends NgControl {
  control = new MockAbstractControl();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  viewToModelUpdate(newValue: never): void {
    // do nothing here, as this is only a mock
  }
}

class MockAbstractControl extends AbstractControl {
  constructor() {
    super(null, null);
  }
  public override value = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  setValue(value: any, options?: unknown): void {
    this.value = value;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  patchValue(value: any, options?: unknown): void {
    this.value = value;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  reset(value?: any, options?: unknown): void {
    this.value = '';
  }
}
