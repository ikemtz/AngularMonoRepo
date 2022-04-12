import { IDataEntryFacade } from './data-entry-facade';
import { BaseDataEntryComponent } from './base-data-entry.component';
import { of } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscribable } from 'imng-ngrx-utils';

describe('MockBaseComponent', () => {
  let component: MockBaseComponent;
  let facade: MockFacade;

  beforeEach(() => {
    facade = new MockFacade();
    component = new MockBaseComponent(facade);
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
    expect(component.save).toBeCalledTimes(1);
  });

  it('handle onCancel', () => {
    facade.clearCurrentEntity = jest.fn();
    component.onCancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
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
  });
});

export class MockBaseComponent
  extends BaseDataEntryComponent<MockFacade>
  implements Subscribable
{
  dialogTitle = '';
  props = {};
  save = jest.fn();
  public initForm(): void {
    this.addEditForm = new FormGroup({
      id: new FormControl(''),
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
