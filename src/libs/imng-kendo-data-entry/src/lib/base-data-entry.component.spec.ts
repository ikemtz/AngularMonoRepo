import { IDataEntryFacade } from './data-entry-facade';
import { BaseDataEntryComponent } from './base-data-entry.component';
import { of } from 'rxjs';
import { Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { Subscribable } from 'imng-ngrx-utils';
import { mockConsoleError } from 'imng-ngrx-utils/testing';

describe('MockBaseComponent', () => {
  let component: MockBaseComponent;
  let facade: MockFacade;
  let consoleErrorMock: jest.SpyInstance<void>;

  beforeEach(() => {
    consoleErrorMock = mockConsoleError();
    facade = new MockFacade();
    component = new MockBaseComponent(facade);
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should destroy', () => {
    component.allSubscriptions.push(component.submitted$.subscribe());
    expect(component.allSubscriptions.length).toEqual(1);
    component.ngOnDestroy();
    expect(component.allSubscriptions.length).toEqual(0);
  });

  it('handle onSubmit', () => {
    component.onSubmit();
    expect(component.save).toHaveBeenCalledTimes(1);
  });

  it('handle onCancel', () => {
    facade.clearCurrentEntity = jest.fn();
    component.onCancel();
    expect(facade.clearCurrentEntity).toHaveBeenCalledTimes(1);
  });

  it('handle formControl get', () => {
    component.addEditForm?.patchValue({ id: '💩' });
    const control = component.formControl('id');
    expect(control?.value).toBe('💩');
  });

  it('handle formControlErrors get', () => {
    component.addEditForm?.controls['id'].setErrors({ ['happy']: '😎' });
    const value = component.formControlErrors('id');
    expect(value).toStrictEqual({ happy: '😎' });
    expect(component.getFormErrors()).toMatchSnapshot();
    expect(component.isDataInvalid()).toBe(true);
  });

  it('handle minLength formControlErrors get', () => {
    component.onSubmit();
    expect(component.getFormErrors()).toStrictEqual([]);
    expect(component.isDataInvalid()).toBe(false);

    component.addEditForm?.patchValue({ id: '😎', minLenVal: 'min' });
    component.onSubmit();
    const result = component.formMinLengthError('minLenVal');
    expect(result).toMatchSnapshot();
    expect(component.isDataInvalid()).toBe(true);
  });

  it('handle required formControlErrors get', () => {
    component.onSubmit();
    expect(component.getFormErrors()).toStrictEqual([]);
    expect(component.isDataInvalid()).toBe(false);

    component.addEditForm?.patchValue({
      subItemForm: { id: '😎', minLenVal: null },
    });
    component.onSubmit();
    const result = component.formMinLengthError('minLenVal');
    expect(result).toMatchSnapshot();
    expect(component.isDataInvalid()).toBe(true);
  });

  it('should handle negative scenarios', () => {
    expect(component.formControlErrors('bad-name')).toBeUndefined();
    expect(component.formMinLengthError('bad-name')).toBeUndefined();
  });
});
export interface ISubItemForm {
  id: FormControl<string | null>;
  minLenVal: FormControl<string | null>;
}
export interface IItemForm extends ISubItemForm {
  subItemForm: FormGroup<ISubItemForm>;
  subItemForms: FormArray<FormGroup<ISubItemForm>>;
}
export class MockBaseComponent
  extends BaseDataEntryComponent<MockFacade>
  implements Subscribable
{
  public addEditForm: FormGroup<IItemForm> = this.formGroupFac();
  dialogTitle = '';
  props = {};
  save = jest.fn();
  public initForm(): void {
    this.addEditForm = this.formGroupFac();
  }

  public subItemFormGroupFac() {
    return new FormGroup<ISubItemForm>({
      id: new FormControl<string>(''),
      minLenVal: new FormControl<string>(
        'asbasdkfjalksjdflkjasdflkjadslfkjads',
        {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(20),
          ]),
          nonNullable: true,
        },
      ),
    });
  }
  public formGroupFac() {
    return new FormGroup<IItemForm>({
      id: new FormControl<string>(''),
      minLenVal: new FormControl<string>(
        'asbasdkfjalksjdflkjasdflkjadslfkjads',
        Validators.minLength(20),
      ),
      subItemForm: this.subItemFormGroupFac(),
      subItemForms: new FormArray([this.subItemFormGroupFac()]),
    });
  }
}

export class MockEntity {
  id = '🤦‍♂️';
}

export class MockFacade implements IDataEntryFacade<MockEntity> {
  loading$ = of(false);
  currentEntity$ = of(new MockEntity());
  isEditActive$ = of(true);
  isNewActive$ = of(false);
  initForm = () => jest.fn();
  setCurrentEntity = () => jest.fn();
  clearCurrentEntity = () => jest.fn();
  saveNewEntity = () => jest.fn();
  updateExistingEntity = () => jest.fn();
}
