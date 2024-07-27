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
import { ScheduleProperties, ISchedule } from '../../../models/schedules-odata';

import { ScheduleAddComponent } from './add.component';
import { ScheduleCrudFacade } from './crud.facade';

describe('ScheduleAddComponent', () => {
  let component: ScheduleAddComponent;
  let fixture: ComponentFixture<ScheduleAddComponent>;
  let facade: ScheduleCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [ScheduleAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DatePickerModule],
      providers: [
        { provide: ScheduleCrudFacade, useValue: createDataEntryMockFacade() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(ScheduleCrudFacade);
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
      [ScheduleProperties.ID]: 'ID',
      [ScheduleProperties.UNIT_ID]: 'UNIT_ID',
      [ScheduleProperties.UNIT_NAME]: 'UNIT_NAME',
      [ScheduleProperties.EMPLOYEE_ID]: 'EMPLOYEE_ID',
      [ScheduleProperties.EMPLOYEE_NAME]: 'EMPLOYEE_NAME',
      [ScheduleProperties.STAFFING_REQUIREMENT_ID]: 'STAFFING_REQUIREMENT_ID',
      [ScheduleProperties.START_TIME_UTC]: new Date(),
      [ScheduleProperties.SCHEDULED_HOURS]: 0,
      [ScheduleProperties.APPROVED_ON_UTC]: new Date(),
    });

    let item: ISchedule | undefined;
    facade.saveNewEntity = jest.fn((x) => (item = x));
    facade.updateExistingEntity = jest.fn();
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(1);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(0);

    expect(item).toMatchSnapshot({
      startTimeUtc: expect.any(Date),
      approvedOnUtc: expect.any(Date),
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
