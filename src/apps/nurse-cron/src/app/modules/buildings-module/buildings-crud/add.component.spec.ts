import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { BuildingAddComponent } from './add.component';
import { BuildingCrudFacade } from './crud.facade';
import { BuildingProperties, IBuilding } from '../../../models/units-odata';

describe('BuildingAddComponent', () => {
  let component: BuildingAddComponent;
  let fixture: ComponentFixture<BuildingAddComponent>;
  let facade: BuildingCrudFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      providers: [{ provide: BuildingCrudFacade, useValue: createDataEntryMockFacade() }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(BuildingCrudFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    component.initForm();
    component.addEditForm.patchValue({
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

    let item: IBuilding;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

    expect(item).toMatchSnapshot({
      deletedOnUtc: expect.any(Date),
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
