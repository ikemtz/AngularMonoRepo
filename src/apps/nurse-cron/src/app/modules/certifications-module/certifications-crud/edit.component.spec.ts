import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';
import { mockConsoleError, mockConsoleGroup, mockConsoleWarn } from 'imng-ngrx-utils/testing';

import { CertificationEditComponent } from './edit.component';
import { CertificationCrudFacade } from './crud.facade';
import { CertificationProperties, ICertification } from '../../../models/certifications-odata';

describe('CertificationEditComponent', () => {
  let component: CertificationEditComponent;
  let fixture: ComponentFixture<CertificationEditComponent>;
  let facade: CertificationCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [CertificationEditComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DatePickerModule,],
      providers: [{ provide: CertificationCrudFacade, useValue: createDataEntryMockFacade({ currentEntity$: of({}) }) }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(CertificationCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [CertificationProperties.ID]: 'ID',
      [CertificationProperties.NAME]: 'NAME',
      [CertificationProperties.IS_ENABLED]: true,
      [CertificationProperties.EXPIRES_ON_UTC]: new Date(),
    });
    let item: ICertification | undefined;
    facade.updateExistingEntity = jest.fn(x => (item = x));
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

    expect(item).toMatchSnapshot({
      expiresOnUtc: expect.any(Date),
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
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });
});
