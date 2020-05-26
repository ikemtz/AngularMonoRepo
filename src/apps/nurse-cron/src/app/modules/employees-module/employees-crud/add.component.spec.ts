import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { EmployeeAddComponent } from './add.component';
import { EmployeeCrudFacade } from './crud.facade';
import { EmployeeProperties, IEmployee } from '../../../models/employees-odata';

describe('EmployeeAddComponent', () => {
  let component: EmployeeAddComponent;
  let fixture: ComponentFixture<EmployeeAddComponent>;
  let facade: EmployeeCrudFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeAddComponent],
      imports: [ReactiveFormsModule, ImngDataEntryDialogModule, NoopAnimationsModule],
      providers: [{ provide: EmployeeCrudFacade, useValue: createDataEntryMockFacade() }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

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
      [EmployeeProperties.LAST_NAME]: 'LAST-NAME',
      [EmployeeProperties.FIRST_NAME]: 'FIRST-NAME',
      [EmployeeProperties.BIRTH_DATE]: 'BIRTH-DATE',
      [EmployeeProperties.MOBILE_PHONE]: 'MOBILEHONE',
      [EmployeeProperties.HOME_PHONE]: 'HOME-NE',
      [EmployeeProperties.PHOTO]: 'PHOTO',
      [EmployeeProperties.EMAIL]: 'EMAIL',
      [EmployeeProperties.ADDRESS_LINE_1]: 'ADDRESS-LINE1',
      [EmployeeProperties.ADDRESS_LINE_2]: 'ADDRESS-LINE2',
      [EmployeeProperties.CITY]: 'CITY',
      [EmployeeProperties.STATE]: 'ST',
      [EmployeeProperties.ZIP]: 'ZIP',
      [EmployeeProperties.IS_ENABLED]: 'IS-ENABLED',
      [EmployeeProperties.HIRE_DATE]: 'HIRE-DATE',
      [EmployeeProperties.FIRE_DATE]: 'FIRE-DATE',
      [EmployeeProperties.TOTAL_HOURS_OF_SERVICE]: 'TOTAL-HOURS-OF-SERVICE',
      [EmployeeProperties.CERTIFICATION_COUNT]: 'CERTIFICATION-COUNT',
      [EmployeeProperties.COMPETENCY_COUNT]: 'COMPETENCY-COUNT',
      [EmployeeProperties.HEALTH_ITEM_COUNT]: 'HEALTH-ITEM-COUNT',
    });

    let item: IEmployee;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
    expect(item).toMatchSnapshot();
  });

  it('should not save', () => {
    component.addEditForm = { valid: false } as any;
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
