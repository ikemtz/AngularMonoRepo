import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { SaleOrderAddComponent } from './add.component';
import { SaleOrderCrudFacade } from './crud.facade';
import { ISaleOrder, SaleOrderProperties } from '../../../models';

describe('SaleOrderAddComponent', () => {
  let component: SaleOrderAddComponent;
  let fixture: ComponentFixture<SaleOrderAddComponent>;
  let facade: SaleOrderCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SaleOrderAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      providers: [{ provide: SaleOrderCrudFacade, useValue: createDataEntryMockFacade() }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOrderAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(SaleOrderCrudFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [SaleOrderProperties.ID]: 'ID',
      [SaleOrderProperties.SALES_ORDER_ID]: 0,
      [SaleOrderProperties.REVISION_NUM]: 0,
      [SaleOrderProperties.DATE]: new Date(),
      [SaleOrderProperties.DUE_DATE]: new Date(),
      [SaleOrderProperties.SHIP_DATE]: new Date(),
      [SaleOrderProperties.STATUS]: 0,
      [SaleOrderProperties.IS_ONLINE_ORDER]: true,
      [SaleOrderProperties.NUM]: 'NUM',
      [SaleOrderProperties.PURCHASE_ORDER_NUM]: 'PURCHASE_ORDER_NUM',
      [SaleOrderProperties.ACCOUNT_NUM]: 'ACCOUNT_NUM',
      [SaleOrderProperties.CUSTOMER_ID]: 'CUSTOMER_ID',
      [SaleOrderProperties.SHIP_TO_ADDRESS_ID]: 'SHIP_TO_ADDRESS_ID',
      [SaleOrderProperties.BILL_TO_ADDRESS_ID]: 'BILL_TO_ADDRESS_ID',
      [SaleOrderProperties.SHIP_METHOD]: 'SHIP_METHOD',
      [SaleOrderProperties.CREDIT_CARD_APPROVAL_CODE]: 'CREDIT_CARD_APP',
      [SaleOrderProperties.SUB_TOTAL]: 0,
      [SaleOrderProperties.TAX_AMT]: 0,
      [SaleOrderProperties.FREIGHT]: 0,
      [SaleOrderProperties.TOTAL_DUE]: 0,
      [SaleOrderProperties.COMMENT]: '',
      [SaleOrderProperties.SHIP_TO_ADDRESS]: 'SHIP_TO_ADDRESS',
      [SaleOrderProperties.BILL_TO_ADDRESS]: 'BILL_TO_ADDRESS',
      [SaleOrderProperties.CUSTOMER]: 'CUSTOMER',
    });

    let item: ISaleOrder | undefined;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component.addEditForm = { ...component.addEditForm, valid: true } as any;
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

    expect(item).toMatchSnapshot({
      date: expect.any(Date),
      dueDate: expect.any(Date),
      shipDate: expect.any(Date),
    });

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
