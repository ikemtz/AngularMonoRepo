import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { of } from 'rxjs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { SaleOrderEditComponent } from './edit.component';
import { SaleOrderCrudFacade } from './crud.facade';
import { ISaleOrder, SaleOrderProperties } from '../../../models';

describe('SaleOrderEditComponent', () => {
  let component: SaleOrderEditComponent;
  let fixture: ComponentFixture<SaleOrderEditComponent>;
  let facade: SaleOrderCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SaleOrderEditComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DatePickerModule],
      providers: [
        {
          provide: SaleOrderCrudFacade,
          useValue: createDataEntryMockFacade({ currentEntity$: of({}) }),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOrderEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(SaleOrderCrudFacade);
    fixture.detectChanges();
  });

  test('should update', () => {
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
    facade.updateExistingEntity = jest.fn(x => (item = x));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component.addEditForm = { ...component.addEditForm, valid: true } as any;
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

    expect(item).toMatchSnapshot({
      date: expect.any(Date),
      dueDate: expect.any(Date),
      shipDate: expect.any(Date),
    });

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
