import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import {
  mockConsoleError,
  mockConsoleGroup,
  mockConsoleWarn,
  readFirst,
} from 'imng-ngrx-utils/testing';
import { of } from 'rxjs';
import { createTestUnit, IUnit, createTestBuilding } from '../../../models/units-odata';

import { UnitAddComponent } from './add.component';
import { UnitCrudFacade } from './crud.facade';

export function createMockUnitFacade() {
  return {
    currentEntity$: of({}),
    buildings$: of([
      {
        id: 'abc',
        name: 'abc',
        siteName: 'abc',
        addressLine1: 'abc',
        addressLine2: 'abc',
        cityOrMunicipality: 'abc',
        stateOrProvidence: 'abc',
        postalCode: 'abc',
        country: 'abc',
        gpsData: 'abc',
        deletedBy: 'abc',
        deletedOnUtc: 'abc',
      },
      {
        id: 'xyz',
        name: 'xyz',
        siteName: 'xyz',
        addressLine1: 'xyz',
        addressLine2: 'xyz',
        cityOrMunicipality: 'xyz',
        stateOrProvidence: 'xyz',
        postalCode: 'xyz',
        country: 'xyz',
        gpsData: 'xyz',
        deletedBy: 'xyz',
        deletedOnUtc: 'xyz',
      },
    ]),
    loadBuildings: jest.fn(),
  };
}

describe('UnitAddComponent', () => {
  let component: UnitAddComponent;
  let fixture: ComponentFixture<UnitAddComponent>;
  let facade: UnitCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [UnitAddComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        DatePickerModule,
        DropDownsModule,
      ],
      providers: [
        {
          provide: UnitCrudFacade,
          useValue: createDataEntryMockFacade(createMockUnitFacade()),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(UnitCrudFacade);
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
    component.addEditForm.patchValue(createTestUnit());
    component.addEditForm.controls.building?.patchValue(createTestBuilding());

    let item: IUnit | undefined;
    facade.saveNewEntity = jest.fn((x) => (item = x));
    facade.updateExistingEntity = jest.fn();
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

    expect(item).toMatchSnapshot({
      deletedOnUtc: expect.any(Date),
      building: {
        deletedOnUtc: expect.any(Date),
      },
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

  test('should support Building filters', async () => {
    component.handleBuildingFilter('xy');
    const result = await readFirst(component.buildings$);
    expect(result).toMatchSnapshot();
  });
});
