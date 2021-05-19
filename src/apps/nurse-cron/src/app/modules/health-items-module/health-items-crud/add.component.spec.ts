import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HealthItemAddComponent } from './add.component';
import { HealthItemCrudFacade } from './crud.facade';
import { HealthItemProperties, IHealthItem } from '../../../models/health-items-odata';

describe('HealthItemAddComponent', () => {
  let component: HealthItemAddComponent;
  let fixture: ComponentFixture<HealthItemAddComponent>;
  let facade: HealthItemCrudFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthItemAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      providers: [{ provide: HealthItemCrudFacade, useValue: createDataEntryMockFacade() }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthItemAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(HealthItemCrudFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [HealthItemProperties.ID]: 'ID',
      [HealthItemProperties.NAME]: 'NAME',
      [HealthItemProperties.IS_ENABLED]: true,
    });

    let item: IHealthItem;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

    expect(item).toMatchSnapshot();

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
