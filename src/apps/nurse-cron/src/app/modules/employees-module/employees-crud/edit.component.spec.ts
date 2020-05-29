import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { of } from 'rxjs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { EmployeeEditComponent } from './edit.component';
import { EmployeeCrudFacade } from './crud.facade';
import { EmployeeProperties, IEmployee } from '../../../models/employees-odata';

describe('EmployeeEditComponent', () => {
  let component: EmployeeEditComponent;
  let fixture: ComponentFixture<EmployeeEditComponent>;
  let facade: EmployeeCrudFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeEditComponent],
      imports: [ReactiveFormsModule, ImngDataEntryDialogModule, NoopAnimationsModule, DatePickerModule],
      providers: [
        {
          provide: EmployeeCrudFacade,
          useValue: createDataEntryMockFacade({ currentEntity$: of({}) }),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(EmployeeCrudFacade);
    fixture.detectChanges();
  });

  it('should update', () => {
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
    facade.updateExistingEntity = jest.fn(x => (item = x));
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

    expect(item).toMatchSnapshot({
      birthDate: expect.any(Date),
      hireDate: expect.any(Date),
      fireDate: expect.any(Date),
    });        

  });  

  it('should not update', () => {
    component.addEditForm = { valid: false } as any;
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
  });

  it('should cancel', () => {
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });
});
