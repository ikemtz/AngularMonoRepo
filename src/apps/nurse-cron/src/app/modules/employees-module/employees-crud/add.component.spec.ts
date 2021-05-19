import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { EmployeeAddComponent } from './add.component';
import { EmployeeCrudFacade } from './crud.facade';
import { IEmployee, EmployeeProperties } from '../../../models/employees-odata';

describe('EmployeeAddComponent', () => {
  let component: EmployeeAddComponent;
  let fixture: ComponentFixture<EmployeeAddComponent>;
  let facade: EmployeeCrudFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      providers: [{ provide: EmployeeCrudFacade, useValue: createDataEntryMockFacade() }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(EmployeeCrudFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [EmployeeProperties.ID]: 'ID',
      [EmployeeProperties.LAST_NAME]: 'LAST_NAME',
      [EmployeeProperties.FIRST_NAME]: 'FIRST_NAME',
      [EmployeeProperties.BIRTH_DATE]: new Date(),
      [EmployeeProperties.MOBILE_PHONE]: 'MOBILE_PHO',
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

    let item: IEmployee;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

    expect(item).toMatchSnapshot({
      birthDate: expect.any(Date),
      hireDate: expect.any(Date),
      fireDate: expect.any(Date),
    });

  });

  it('should not save', () => {
    component.addEditForm = { valid: false } as never;
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
  });

  it('should cancel', () => {
    facade.clearCurrentEntity = jest.fn();
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });
});
