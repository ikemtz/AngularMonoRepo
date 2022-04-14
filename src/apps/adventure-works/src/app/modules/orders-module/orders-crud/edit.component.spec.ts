import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { of } from 'rxjs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { OrderEditComponent } from './edit.component';
import { OrderCrudFacade } from './crud.facade';
import { IOrder, OrderProperties } from '../../../models/webapi';

describe('OrderEditComponent', () => {
  let component: OrderEditComponent;
  let fixture: ComponentFixture<OrderEditComponent>;
  let facade: OrderCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrderEditComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DatePickerModule],
      providers: [
        {
          provide: OrderCrudFacade,
          useValue: createDataEntryMockFacade({ currentEntity$: of({}) }),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(OrderCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [OrderProperties.ID]: 'ID',
      [OrderProperties.ORDER_ID]: 0,
      [OrderProperties.REVISION_NUM]: 0,
      [OrderProperties.DATE]: new Date(),
      [OrderProperties.DUE_DATE]: new Date(),
      [OrderProperties.SHIP_DATE]: new Date(),
      [OrderProperties.STATUS]: 0,
      [OrderProperties.IS_ONLINE_ORDER]: true,
      [OrderProperties.NUM]: 'NUM',
      [OrderProperties.PURCHASE_ORDER_NUM]: 'PURCHASE_ORDER_NUM',
      [OrderProperties.CUSTOMER_ID]: 'CUSTOMER_ID',
      [OrderProperties.SHIP_TO_ADDRESS_ID]: 'SHIP_TO_ADDRESS_ID',
      [OrderProperties.BILL_TO_ADDRESS_ID]: 'BILL_TO_ADDRESS_ID',
      [OrderProperties.SHIP_METHOD]: 'SHIP_METHOD',
      [OrderProperties.CREDIT_CARD_APPROVAL_CODE]: 'CREDIT_CARD_APP',
      [OrderProperties.SUB_TOTAL]: 0,
      [OrderProperties.TAX_AMT]: 0,
      [OrderProperties.FREIGHT]: 0,
      [OrderProperties.TOTAL_DUE]: 0,
      [OrderProperties.COMMENT]: 'COMMENT',
      [OrderProperties.CUSTOMER]: 'CUSTOMER',
      [OrderProperties.SHIP_TO_ADDRESS]: 'SHIP_TO_ADDRESS',
      [OrderProperties.BILL_TO_ADDRESS]: 'BILL_TO_ADDRESS',
    });
    let item: IOrder | undefined;
    facade.updateExistingEntity = jest.fn(x => (item = x));
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
