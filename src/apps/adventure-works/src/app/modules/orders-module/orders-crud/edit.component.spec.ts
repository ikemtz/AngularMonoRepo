import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import {
  mockConsoleError,
  mockConsoleGroup,
  mockConsoleWarn,
  readFirst,
} from 'imng-ngrx-utils/testing';

import { createMockOrderFacade } from './add.component.spec';
import { OrderEditComponent } from './edit.component';
import { OrderCrudFacade } from './crud.facade';
import {
  createTestOrder,
  createTestOrderAddress,
  IOrder,
  createTestCustomer,
  createTestSalesAgent,
} from '../../../models/odata';

describe('OrderEditComponent', () => {
  let component: OrderEditComponent;
  let fixture: ComponentFixture<OrderEditComponent>;
  let facade: OrderCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule, OrderEditComponent],
      providers: [
        {
          provide: OrderCrudFacade,
          useValue: createDataEntryMockFacade(createMockOrderFacade()),
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
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue(createTestOrder());
    component.addEditForm.controls.billToAddress?.patchValue(
      createTestOrderAddress(),
    );
    component.addEditForm.controls.shipToAddress?.patchValue(
      createTestOrderAddress(),
    );
    component.addEditForm.controls.customer?.patchValue(createTestCustomer());
    component.addEditForm.controls.customer?.controls.salesAgent?.patchValue(
      createTestSalesAgent(),
    );
    let item: IOrder | undefined;
    facade.updateExistingEntity = jest.fn((x) => (item = x));
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(1);

    expect(item).toMatchSnapshot({
      date: expect.any(Date),
      dueDate: expect.any(Date),
      shipDate: expect.any(Date),
    });
  });

  /**
   * Note: if this test fails, then you're missing validators in your forms.
   * Using form validators is typically a good idea.
   */
  test('should not update', () => {
    const consoleErrorMock = mockConsoleError();
    component.addEditForm?.patchValue({});
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    component.cancel();
    expect(facade.clearCurrentEntity).toHaveBeenCalledTimes(1);
  });

  test('should support Customer filters', async () => {
    component.handleCustomerFilter('xy');
    const result = await readFirst(component.customers$);
    expect(result).toStrictEqual([
      {
        id: 'xyz',
        num: 'xyz',
        name: 'xyz',
        companyName: 'xyz',
        emailAddress: 'xyz',
        phone: 'xyz',
      },
    ]);
  });

  test('should support ShipToAddress filters', async () => {
    component.handleShipToAddressFilter('xy');
    const result = await readFirst(component.shipToAddresses$);
    expect(result).toStrictEqual([
      {
        id: 'xyz',
        line1: 'xyz',
        line2: 'xyz',
        city: 'xyz',
        stateProvince: 'xyz',
        countryRegion: 'xyz',
        postalCode: 'xyz',
      },
    ]);
  });

  test('should support BillToAddress filters', async () => {
    component.handleBillToAddressFilter('xy');
    const result = await readFirst(component.billToAddresses$);
    expect(result).toStrictEqual([
      {
        id: 'xyz',
        line1: 'xyz',
        line2: 'xyz',
        city: 'xyz',
        stateProvince: 'xyz',
        countryRegion: 'xyz',
        postalCode: 'xyz',
      },
    ]);
  });
  test('should handle StatusType filters', async () => {
    component.handleStatusTypeFilter('abc-xyz');
    const result = await readFirst(component.statusTypes$);
    expect(result).toStrictEqual([]);
  });
  test('should handle ShippingType filters', async () => {
    component.handleShippingTypeFilter('abc-xyz');
    const result = await readFirst(component.shippingTypes$);
    expect(result).toStrictEqual([]);
  });
});
