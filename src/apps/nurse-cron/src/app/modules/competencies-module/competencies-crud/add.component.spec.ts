import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CompetencyAddComponent } from './add.component';
import { CompetencyCrudFacade } from './crud.facade';
import { CompetencyProperties, ICompetency } from '../../../models/competencies-odata';

describe('CompetencyAddComponent', () => {
  let component: CompetencyAddComponent;
  let fixture: ComponentFixture<CompetencyAddComponent>;
  let facade: CompetencyCrudFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyAddComponent],
      imports: [ReactiveFormsModule, ImngDataEntryDialogModule, NoopAnimationsModule],
      providers: [{ provide: CompetencyCrudFacade, useValue: createDataEntryMockFacade() }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(CompetencyCrudFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [CompetencyProperties.ID]: 'ID',
      [CompetencyProperties.NAME]: 'NAME',
      [CompetencyProperties.IS_ENABLED]: true,
    });

    let item: ICompetency;
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
