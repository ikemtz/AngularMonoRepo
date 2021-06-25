import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { of } from 'rxjs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CustomerEditComponent } from './edit.component';
import { CustomerCrudFacade } from './crud.facade';
import { CustomerProperties, ICustomer } from '../../../models';

describe('CustomerEditComponent', () => {
  let component: CustomerEditComponent;
  let fixture: ComponentFixture<CustomerEditComponent>;
  let facade: CustomerCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerEditComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DatePickerModule],
      providers: [
        {
          provide: CustomerCrudFacade,
          useValue: createDataEntryMockFacade({ currentEntity$: of({}) }),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(CustomerCrudFacade);
    fixture.detectChanges();
  });

  test('should update', async () => {
    component.initForm();
    component.addEditForm.patchValue({
      [CustomerProperties.ID]: 'ID',
      [CustomerProperties.NAME_STYLE]: true,
      [CustomerProperties.TITLE]: 'TITLE',
      [CustomerProperties.FIRST_NAME]: 'FIRST_NAME',
      [CustomerProperties.MIDDLE_NAME]: 'MIDDLE_NAME',
      [CustomerProperties.LAST_NAME]: 'LAST_NAME',
      [CustomerProperties.SUFFIX]: 'SUFFIX',
      [CustomerProperties.COMPANY_NAME]: 'COMPANY_NAME',
      [CustomerProperties.SALES_PERSON]: 'SALES_PERSON',
      [CustomerProperties.EMAIL_ADDRESS]: 'EMAIL_ADDRESS',
      [CustomerProperties.PHONE]: 'PHONE',
    });
    let item: ICustomer = {};
    facade.updateExistingEntity = jest.fn(x => (item = x));
    component.save();

    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

    expect(item).toMatchSnapshot();

  });

  test('should not update', () => {
    component.addEditForm = { valid: false } as never;
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
  });

  test('should cancel', () => {
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });
});
