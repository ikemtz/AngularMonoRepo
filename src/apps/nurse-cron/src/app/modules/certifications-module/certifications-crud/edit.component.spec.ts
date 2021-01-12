import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { of } from 'rxjs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CertificationEditComponent } from './edit.component';
import { CertificationCrudFacade } from './crud.facade';
import { CertificationProperties, ICertification } from '../../../models/certifications-odata';

describe('CertificationEditComponent', () => {
  let component: CertificationEditComponent;
  let fixture: ComponentFixture<CertificationEditComponent>;
  let facade: CertificationCrudFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationEditComponent],
      imports: [ReactiveFormsModule, ImngDataEntryDialogModule, NoopAnimationsModule, DatePickerModule],
      providers: [
        {
          provide: CertificationCrudFacade,
          useValue: createDataEntryMockFacade({ currentEntity$: of({}) }),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(CertificationCrudFacade);
    fixture.detectChanges();
  });

  it('should update', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [CertificationProperties.ID]: 'ID',
      [CertificationProperties.NAME]: 'NAME',
      [CertificationProperties.IS_ENABLED]: true,
      [CertificationProperties.EXPIRES_ON_UTC]: new Date(),
    });
    let item: ICertification;
    facade.updateExistingEntity = jest.fn(x => (item = x));
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

    expect(item).toMatchSnapshot({
      expiresOnUtc: expect.any(Date),
    });

  });

  it('should not update', () => {
    component.addEditForm = { valid: false } as never;
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
  });

  it('should cancel', () => {
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });
});
