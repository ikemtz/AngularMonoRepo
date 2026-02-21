import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import {
  mockConsoleError,
  mockConsoleGroup,
  mockConsoleWarn,
  readFirst,
} from 'imng-ngrx-utils/testing';
import { of } from 'rxjs';

import { CustomerAddComponent } from './add.component';
import { CustomerCrudFacade } from '../customers-ngrx-module/customer.crud.facade';
import { CustomerLookupFacade } from '../customers-ngrx-module/customer.lookup.facade';
import {
  ICustomer,
  createTestCustomer,
  createTestSalesAgent,
} from '../../models/webapi';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  IMNG_KENDO_COMBOBOX_COLUMN_STUB,
  IMNG_KENDO_MULTICOLUMNCOMBOBOX_STUB,
} from 'imng-kendo-testing-stubs';

describe('CustomerAddComponent', () => {
  let component: CustomerAddComponent;
  let fixture: ComponentFixture<CustomerAddComponent>;
  let crudFacade: CustomerCrudFacade;
  let lookupFacade: CustomerLookupFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      imports: [
        CustomerAddComponent,
        ReactiveFormsModule,
        ImngDataEntryDialogModule,
      ],
      providers: [
        provideAnimations(),
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
      .overrideComponent(CustomerAddComponent, {
        remove: { imports: [KENDO_DROPDOWNS] },
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
    fixture = TestBed.createComponent(CustomerAddComponent);
    component = fixture.componentInstance;
    crudFacade = component.facade;
    lookupFacade = component.customerLookupFacade;
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
    expect(lookupFacade.loadSalesAgents).toHaveBeenCalled();
  });

  test('should save', () => {
    component.initForm();
    component.addEditForm?.patchValue(createTestCustomer());
    component.addEditForm.controls.salesAgent?.patchValue(
      createTestSalesAgent(),
    );

    let item: ICustomer | undefined;
    crudFacade.saveNewEntity = jest.fn((x) => (item = x));
    crudFacade.updateExistingEntity = jest.fn();
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(crudFacade.saveNewEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.updateExistingEntity).toHaveBeenCalledTimes(0);

    expect(item).toMatchSnapshot();
  });

  /**
   * Note: if this test fails, then you're missing validators in your forms.
   * Using form validators is typically a good idea.
   */
  test('should not save', () => {
    const consoleErrorMock = mockConsoleError();
    component.addEditForm?.patchValue({});
    component.onSubmit();
    expect(crudFacade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(crudFacade.updateExistingEntity).toHaveBeenCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    crudFacade.clearCurrentEntity = jest.fn();
    component.cancel();
    expect(crudFacade.clearCurrentEntity).toHaveBeenCalledTimes(1);
  });

  test('should support SalesAgent filters', async () => {
    component.handleSalesAgentFilter('xy');
    const result = await readFirst(component.salesAgents$);
    expect(result).toMatchSnapshot();
  });
});
