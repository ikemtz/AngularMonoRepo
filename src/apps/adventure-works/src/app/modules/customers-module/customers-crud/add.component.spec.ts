import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { mockConsoleError, mockConsoleGroup, mockConsoleWarn, readFirst } from 'imng-ngrx-utils/testing';
import { of } from 'rxjs';
import { CustomerProperties, ICustomer } from '../../../models/webapi';

import { CustomerAddComponent } from './add.component';
import { CustomerCrudFacade } from './crud.facade';

export function createMockCustomerFacade() {
  return {
    currentEntity$: of({}),
    salesAgents$: of([
      { name: 'abc', loginId: 'abc', },
      { name: 'xyz', loginId: 'xyz', },]),
    loadSalesAgents: jest.fn(),
  };
}

describe('CustomerAddComponent', () => {
  let component: CustomerAddComponent;
  let fixture: ComponentFixture<CustomerAddComponent>;
  let facade: CustomerCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [CustomerAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DropDownsModule,],
      providers: [{ provide: CustomerCrudFacade, useValue: createDataEntryMockFacade(createMockCustomerFacade()) }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(CustomerCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should save', () => {
    component.initForm();
    component.addEditForm?.patchValue({
      [CustomerProperties.ID]: 'ID',
      [CustomerProperties.NUM]: 'NUM-nu.323',
      [CustomerProperties.NAME]: 'NAME',
      [CustomerProperties.COMPANY_NAME]: 'COMPANY_NAME',
      [CustomerProperties.SALES_AGENT_ID]: 0,
      [CustomerProperties.EMAIL_ADDRESS]: 'EMAIL_ADDRESS',
      [CustomerProperties.PHONE]: 'PHONE',
      [CustomerProperties.SALES_AGENT]: 'SALES_AGENT',
    });

    let item: ICustomer | undefined;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

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
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    facade.clearCurrentEntity = jest.fn();
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });

  test('should support SalesAgent filters', async () => {
    component.handleSalesAgentFilter('xy');
    const result = await readFirst(component.salesAgents$);
    expect(result).toStrictEqual([{ name: 'xyz', loginId: 'xyz', }]);
  });
});
