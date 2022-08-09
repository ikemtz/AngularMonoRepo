import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';
import { mockConsoleError, mockConsoleGroup, mockConsoleWarn, readFirst } from 'imng-ngrx-utils/testing';

import { EmployeeEditComponent } from './edit.component';
import { EmployeeCrudFacade } from './crud.facade';

describe('EmployeeEditComponent', () => {
  let component: EmployeeEditComponent;
  let fixture: ComponentFixture<EmployeeEditComponent>;
  let facade: EmployeeCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [EmployeeEditComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DatePickerModule, ],
      providers: [{ provide: EmployeeCrudFacade, useValue: createDataEntryMockFacade({ currentEntity$: of({}) }) }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(EmployeeCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue({
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
    facade.updateExistingEntity = jest.fn(x => (item = x));
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

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
  test('should not update', () => {
    const consoleErrorMock = mockConsoleError();
    component.addEditForm?.patchValue({});
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });
});
