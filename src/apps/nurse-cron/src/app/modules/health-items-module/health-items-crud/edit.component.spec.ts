import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';
import { mockConsoleError } from 'imng-ngrx-utils/testing';

import { HealthItemEditComponent } from './edit.component';
import { HealthItemCrudFacade } from './crud.facade';
import {
  HealthItemProperties,
  IHealthItem,
} from '../../../models/health-items-odata';

describe('HealthItemEditComponent', () => {
  let component: HealthItemEditComponent;
  let fixture: ComponentFixture<HealthItemEditComponent>;
  let facade: HealthItemCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        HealthItemEditComponent,
      ],
      providers: [
        {
          provide: HealthItemCrudFacade,
          useValue: createDataEntryMockFacade({ currentEntity$: of({}) }),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthItemEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(HealthItemCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [HealthItemProperties.ID]: 'ID',
      [HealthItemProperties.NAME]: 'NAME',
      [HealthItemProperties.IS_ENABLED]: true,
    });
    let item: IHealthItem | undefined;
    facade.updateExistingEntity = jest.fn((x) => (item = x));
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(1);

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
    expect(facade.saveNewEntity).toHaveBeenCalledTimes(0);
    expect(facade.updateExistingEntity).toHaveBeenCalledTimes(1);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    component.cancel();
    expect(facade.clearCurrentEntity).toHaveBeenCalledTimes(1);
  });
});
