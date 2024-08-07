import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import {
  mockConsoleError,
  mockConsoleGroup,
  mockConsoleWarn,
} from 'imng-ngrx-utils/testing';
import { EmployeeProperties, IEmployee } from '../../../models/employees-odata';

import { EmployeeAddComponent } from './add.component';
import { EmployeeCrudFacade } from './crud.facade';

describe('EmployeeAddComponent', () => {
  let component: EmployeeAddComponent;
  let fixture: ComponentFixture<EmployeeAddComponent>;
  let facade: EmployeeCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [EmployeeAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DatePickerModule],
      providers: [
        { provide: EmployeeCrudFacade, useValue: createDataEntryMockFacade() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(EmployeeCrudFacade);
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
      [EmployeeProperties.ID]: 'ID',
      [EmployeeProperties.LAST_NAME]: 'LAST_NAME',
      [EmployeeProperties.FIRST_NAME]: 'FIRST_NAME',
      [EmployeeProperties.BIRTH_DATE]: new Date(),
      [EmployeeProperties.MOBILE_PHONE]: 'MOBILE_PHONE',
      [EmployeeProperties.HOME_PHONE]: 'HOME_PHONE',
      [EmployeeProperties.PHOTO]: 'PHOTO',
      [EmployeeProperties.EMAIL]: 'EMAIL',
      [EmployeeProperties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',
      [EmployeeProperties.ADDRESS_LINE_2]: 'ADDRESS_LINE_2',
      [EmployeeProperties.CITY]: 'CITY',
      [EmployeeProperties.STATE]: 'ST',
      [EmployeeProperties.ZIP]: 'ZIP',
      [EmployeeProperties.IS_ENABLED]: true,
      [EmployeeProperties.HIRE_DATE]: new Date(),
      [EmployeeProperties.FIRE_DATE]: new Date(),
      [EmployeeProperties.TOTAL_HOURS_OF_SERVICE]: 0,
      [EmployeeProperties.CERTIFICATION_COUNT]: 0,
      [EmployeeProperties.COMPETENCY_COUNT]: 0,
      [EmployeeProperties.HEALTH_ITEM_COUNT]: 0,
    });

    let item: IEmployee | undefined;
    facade.saveNewEntity = jest.fn((x) => (item = x));
    facade.updateExistingEntity = jest.fn();
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(1);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(0);

    expect(item).toMatchSnapshot({
      birthDate: expect.any(Date),
      hireDate: expect.any(Date),
      fireDate: expect.any(Date),
    });
  });

  /**
   * Note: if this test fails, then you're missing validators in your forms.
   * Using form validators is typically a good idea.
   */
  test('should not save', () => {
    const consoleErrorMock = mockConsoleError();
    component.addEditForm?.patchValue({});
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    facade.clearCurrentEntity = jest.fn();
    component.cancel();
    expect(facade.clearCurrentEntity).toHaveBeenCalledTimes(1);
  });
});
