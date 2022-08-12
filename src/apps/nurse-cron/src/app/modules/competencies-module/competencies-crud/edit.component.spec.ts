import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';
import { mockConsoleError } from 'imng-ngrx-utils/testing';

import { CompetencyEditComponent } from './edit.component';
import { CompetencyCrudFacade } from './crud.facade';
import { CompetencyProperties, ICompetency } from '../../../models/competencies-odata';

describe('CompetencyEditComponent', () => {
  let component: CompetencyEditComponent;
  let fixture: ComponentFixture<CompetencyEditComponent>;
  let facade: CompetencyCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyEditComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule,],
      providers: [{ provide: CompetencyCrudFacade, useValue: createDataEntryMockFacade({ currentEntity$: of({}) }) }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(CompetencyCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [CompetencyProperties.ID]: 'ID',
      [CompetencyProperties.NAME]: 'NAME',
      [CompetencyProperties.IS_ENABLED]: true,
    });
    let item: ICompetency | undefined;
    facade.updateExistingEntity = jest.fn(x => (item = x));
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

    expect(item).toMatchSnapshot();

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
