import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { mockConsoleError, readFirst } from 'imng-ngrx-utils/testing';

import { CompetencyAddComponent } from './add.component';
import { CompetencyCrudFacade } from './crud.facade';

describe('CompetencyAddComponent', () => {
  let component: CompetencyAddComponent;
  let fixture: ComponentFixture<CompetencyAddComponent>;
  let facade: CompetencyCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, ],
      providers: [{ provide: CompetencyCrudFacade, useValue: createDataEntryMockFacade() }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(CompetencyCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should save', () => {
    component.initForm();
    component.addEditForm?.patchValue({
    [CompetencyProperties.ID]: 'ID',
    [CompetencyProperties.NAME]: 'NAME',
    [CompetencyProperties.IS_ENABLED]: true,
    });

    let item: ICompetency | undefined;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

    expect(item).toMatchSnapshot();

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
});
