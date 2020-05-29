import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { UnitAddComponent } from './add.component';
import { UnitCrudFacade } from './crud.facade';
import { UnitProperties, IUnit } from '../../../models/units-odata';

describe('UnitAddComponent', () => {
  let component: UnitAddComponent;
  let fixture: ComponentFixture<UnitAddComponent>;
  let facade: UnitCrudFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitAddComponent],
      imports: [ReactiveFormsModule, ImngDataEntryDialogModule, NoopAnimationsModule],
      providers: [{ provide: UnitCrudFacade, useValue: createDataEntryMockFacade() }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(UnitCrudFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [UnitProperties.ID]: 'ID',
      [UnitProperties.BUILDING_ID]: 'BUILDING_ID',
      [UnitProperties.NAME]: 'NAME',
      [UnitProperties.DEL]: 'DEL',
      [UnitProperties.ROOM_COUNT]: 0,
      [UnitProperties.DELETED_BY]: 'DELETED_BY',
      [UnitProperties.DELETED_ON_UTC]: new Date(),
      [UnitProperties.BUILDING]: 'BUILDING',
    });

    let item: IUnit;
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
