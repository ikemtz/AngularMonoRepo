import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_MULTICOLUMNCOMBOBOX } from '@progress/kendo-angular-dropdowns';
import { IMNG_KENDO_DATA_ENTRY_DIALOG } from 'imng-kendo-data-entry';
import {
  createDataEntryMockFacade,
  getImngKendoDataEntryDialogOverride,
} from 'imng-kendo-data-entry/testing';
import {
  mockConsoleError,
  mockConsoleGroup,
  mockConsoleWarn,
  readFirst,
} from 'imng-ngrx-utils/testing';
import { of } from 'rxjs';

import { CustomerEditComponent } from './edit.component';
import { CustomerCrudFacade } from '../customers-ngrx-module/customer.crud.facade';
import { CustomerLookupFacade } from '../customers-ngrx-module/customer.lookup.facade';
import {
  ICustomer,
  createTestCustomer,
  createTestSalesAgent,
} from '../../models/webapi';
import {
  IMNG_KENDO_MULTICOLUMNCOMBOBOX_STUB,
  IMNG_KENDO_COMBOBOX_COLUMN_STUB,
} from 'imng-kendo-testing-stubs';

describe('CustomerEditComponent', () => {
  let component: CustomerEditComponent;
  let fixture: ComponentFixture<CustomerEditComponent>;
  let crudFacade: CustomerCrudFacade;
  let lookupFacade: CustomerLookupFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      imports: [CustomerEditComponent, ReactiveFormsModule],
      providers: [
        { provide: CustomerCrudFacade, useValue: createDataEntryMockFacade() },
        {
          provide: CustomerLookupFacade,
          useValue: {
            salesAgents$: of([createTestSalesAgent()]),
            loadSalesAgents: jest.fn(),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .overrideComponent(
        IMNG_KENDO_DATA_ENTRY_DIALOG,
        getImngKendoDataEntryDialogOverride(),
      )
      .overrideComponent(CustomerEditComponent, {
        remove: { imports: [KENDO_MULTICOLUMNCOMBOBOX] },
        add: {
          imports: [
            IMNG_KENDO_MULTICOLUMNCOMBOBOX_STUB,
            IMNG_KENDO_COMBOBOX_COLUMN_STUB,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditComponent);
    component = fixture.componentInstance;
    crudFacade = component.facade;
    lookupFacade = component.customerLookupFacade;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
    expect(lookupFacade.loadSalesAgents).toHaveBeenCalled();
  });

  afterAll(() => {
    component.ngOnDestroy();
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue(createTestCustomer());
    component.addEditForm.controls.salesAgent.patchValue(
      createTestSalesAgent(),
    );
    let item: ICustomer | undefined;
    crudFacade.updateExistingEntity = jest.fn((x) => (item = x));
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(crudFacade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(crudFacade.updateExistingEntity).toHaveBeenCalledTimes(1);

    expect(item).toMatchSnapshot();
  });

  /**
   * Note: if this test fails, then you're missing validators in your forms.
   * Using form validators is typically a good idea.
   */
  test('should not update', () => {
    const consoleErrorMock = mockConsoleError();
    component.addEditForm?.patchValue({});
    component.onSubmit();
    expect(crudFacade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(crudFacade.updateExistingEntity).toHaveBeenCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    component.cancel();
    expect(crudFacade.clearCurrentEntity).toHaveBeenCalledTimes(1);
  });

  test('should support SalesAgent filters', async () => {
    component.handleSalesAgentFilter('xy');
    const result = await readFirst(component.salesAgents$);
    expect(result).toMatchSnapshot();
  });
});
