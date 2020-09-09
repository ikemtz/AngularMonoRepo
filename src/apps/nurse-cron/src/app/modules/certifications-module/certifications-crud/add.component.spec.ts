import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CertificationAddComponent } from './add.component';
import { CertificationCrudFacade } from './crud.facade';
import { CertificationProperties, ICertification } from '../../../models/certifications-odata';

describe('CertificationAddComponent', () => {
  let component: CertificationAddComponent;
  let fixture: ComponentFixture<CertificationAddComponent>;
  let facade: CertificationCrudFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationAddComponent],
      imports: [ReactiveFormsModule, ImngDataEntryDialogModule, NoopAnimationsModule],
      providers: [{ provide: CertificationCrudFacade, useValue: createDataEntryMockFacade() }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(CertificationCrudFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [CertificationProperties.ID]: 'ID',
      [CertificationProperties.NAME]: 'NAME',
      [CertificationProperties.IS_ENABLED]: true,
      [CertificationProperties.EXPIRES_ON_UTC]: new Date(),
    });

    let item: ICertification;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

    expect(item).toMatchSnapshot({
      expiresOnUtc: expect.any(Date),
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
