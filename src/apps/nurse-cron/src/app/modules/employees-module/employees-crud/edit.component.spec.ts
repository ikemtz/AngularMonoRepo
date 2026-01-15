import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';
import {
  mockConsoleError,
  mockConsoleGroup,
  mockConsoleWarn,
} from 'imng-ngrx-utils/testing';

import { EmployeeEditComponent } from './edit.component';
import { EmployeeCrudFacade } from './crud.facade';
import { IEmployee, createTestEmployee } from '../../../models/employees-api';

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
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        EmployeeEditComponent,
      ],
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

  afterAll(() => {
    component.ngOnDestroy();
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue(createTestEmployee());
    let item: IEmployee | undefined;
    facade.updateExistingEntity = jest.fn((x) => (item = x));
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(1);

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
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    component.cancel();
    expect(facade.clearCurrentEntity).toHaveBeenCalledTimes(1);
  });
});
