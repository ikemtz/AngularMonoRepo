import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { mockConsoleError, mockConsoleGroup, mockConsoleWarn } from 'imng-ngrx-utils/testing';
import { BuildingProperties, IBuilding } from '../../../models/units-odata';

import { BuildingAddComponent } from './add.component';
import { BuildingCrudFacade } from './crud.facade';

describe('BuildingAddComponent', () => {
  let component: BuildingAddComponent;
  let fixture: ComponentFixture<BuildingAddComponent>;
  let facade: BuildingCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [BuildingAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DatePickerModule,],
      providers: [{ provide: BuildingCrudFacade, useValue: createDataEntryMockFacade() }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(BuildingCrudFacade);
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
      [BuildingProperties.ID]: 'ID',
      [BuildingProperties.NAME]: 'NAME',
      [BuildingProperties.SITE_NAME]: 'SITE_NAME',
      [BuildingProperties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',
      [BuildingProperties.ADDRESS_LINE_2]: 'ADDRESS_LINE_2',
      [BuildingProperties.CITY_OR_MUNICIPALITY]: 'CITY_OR_MUNICIPALITY',
      [BuildingProperties.STATE_OR_PROVIDENCE]: 'STATE_OR_PROVIDENCE',
      [BuildingProperties.POSTAL_CODE]: 'POSTAL_CODE',
      [BuildingProperties.COUNTRY]: 'COU',
      [BuildingProperties.GPS_DATA]: 'GPS_DATA',
      [BuildingProperties.DELETED_BY]: 'DELETED_BY',
      [BuildingProperties.DELETED_ON_UTC]: new Date(),
    });

    let item: IBuilding | undefined;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

    expect(item).toMatchSnapshot({
      deletedOnUtc: expect.any(Date),
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
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    facade.clearCurrentEntity = jest.fn();
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });
});
