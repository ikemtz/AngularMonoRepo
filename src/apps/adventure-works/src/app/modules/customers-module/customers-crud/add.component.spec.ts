import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CustomerAddComponent } from './add.component';
import { CustomerCrudFacade } from './crud.facade';
import { CustomerProperties, ICustomer } from '../../../models';
import { readFirst } from 'imng-ngrx-utils/testing';

describe('CustomerAddComponent', () => {
  let component: CustomerAddComponent;
  let fixture: ComponentFixture<CustomerAddComponent>;
  let facade: CustomerCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      providers: [{ provide: CustomerCrudFacade, useValue: createDataEntryMockFacade() }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(CustomerCrudFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', async () => {
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

    let item: ICustomer | undefined;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    component.save();
    item = await readFirst(facade.currentEntity$);
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

    expect(item).toMatchSnapshot();

  });

  it('should not save', () => {
    component.addEditForm = { valid: false } as never;
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
  });

  it('should cancel', () => {
    facade.clearCurrentEntity = jest.fn();
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });
});
