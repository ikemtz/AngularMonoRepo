import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import {
  mockConsoleError,
  mockConsoleGroup,
  mockConsoleWarn,
  readFirst,
} from 'imng-ngrx-utils/testing';

import { createMockCustomerFacade } from './add.component.spec';
import { CustomerEditComponent } from './edit.component';
import { CustomerCrudFacade } from './crud.facade';
import { ICustomer } from '../../../models/webapi';
import {
  createTestCustomer,
  createTestSalesAgent,
} from '../../../models/odata';

describe('CustomerEditComponent', () => {
  let component: CustomerEditComponent;
  let fixture: ComponentFixture<CustomerEditComponent>;
  let facade: CustomerCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        DropDownsModule,
        CustomerEditComponent,
      ],
      providers: [
        {
          provide: CustomerCrudFacade,
          useValue: createDataEntryMockFacade(createMockCustomerFacade()),
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

  afterAll(() => {
    component.ngOnDestroy();
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue(createTestCustomer());
    component.addEditForm.controls.salesAgent?.patchValue(
      createTestSalesAgent(),
    );
    let item: ICustomer | undefined;
    facade.updateExistingEntity = jest.fn((x) => (item = x));
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(1);

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
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    component.cancel();
    expect(facade.clearCurrentEntity).toHaveBeenCalledTimes(1);
  });

  test('should support SalesAgent filters', async () => {
    component.handleSalesAgentFilter('xy');
    const result = await readFirst(component.salesAgents$);
    expect(result).toStrictEqual([{ name: 'xyz', loginId: 'xyz' }]);
  });
});
