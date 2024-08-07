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

import { createMockUnitFacade } from './add.component.spec';
import { UnitEditComponent } from './edit.component';
import { UnitCrudFacade } from './crud.facade';
import {
  createTestUnit,
  IUnit,
  createTestBuilding,
} from '../../../models/units-odata';

describe('UnitEditComponent', () => {
  let component: UnitEditComponent;
  let fixture: ComponentFixture<UnitEditComponent>;
  let facade: UnitCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [UnitEditComponent],
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
    fixture = TestBed.createComponent(UnitEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(UnitCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue(createTestUnit());
    component.addEditForm.controls.building?.patchValue(createTestBuilding());
    let item: IUnit | undefined;
    facade.updateExistingEntity = jest.fn((x) => (item = x));
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(1);

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

  test('should support Building filters', async () => {
    component.handleBuildingFilter('xy');
    const result = await readFirst(component.buildings$);
    expect(result).toStrictEqual([
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
    ]);
  });
});
