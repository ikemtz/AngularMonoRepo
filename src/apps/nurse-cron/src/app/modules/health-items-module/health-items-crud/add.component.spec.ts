import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { mockConsoleError } from 'imng-ngrx-utils/testing';
import {
  HealthItemProperties,
  IHealthItem,
} from '../../../models/health-items-odata';

import { HealthItemAddComponent } from './add.component';
import { HealthItemCrudFacade } from './crud.facade';

describe('HealthItemAddComponent', () => {
  let component: HealthItemAddComponent;
  let fixture: ComponentFixture<HealthItemAddComponent>;
  let facade: HealthItemCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HealthItemAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        {
          provide: HealthItemCrudFacade,
          useValue: createDataEntryMockFacade(),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthItemAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(HealthItemCrudFacade);
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
      [HealthItemProperties.ID]: 'ID',
      [HealthItemProperties.NAME]: 'NAME',
      [HealthItemProperties.IS_ENABLED]: true,
    });

    let item: IHealthItem | undefined;
    facade.saveNewEntity = jest.fn((x) => (item = x));
    facade.updateExistingEntity = jest.fn();
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(1);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(0);

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
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(1);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    facade.clearCurrentEntity = jest.fn();
    component.cancel();
    expect(facade.clearCurrentEntity).toHaveBeenCalledTimes(1);
  });
});
