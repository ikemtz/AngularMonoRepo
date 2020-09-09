import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { of } from 'rxjs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HealthItemEditComponent } from './edit.component';
import { HealthItemCrudFacade } from './crud.facade';
import { HealthItemProperties, IHealthItem } from '../../../models/health-items-odata';

describe('HealthItemEditComponent', () => {
  let component: HealthItemEditComponent;
  let fixture: ComponentFixture<HealthItemEditComponent>;
  let facade: HealthItemCrudFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthItemEditComponent],
      imports: [ReactiveFormsModule, ImngDataEntryDialogModule, NoopAnimationsModule, DatePickerModule],
      providers: [
        {
          provide: HealthItemCrudFacade,
          useValue: createDataEntryMockFacade({ currentEntity$: of({}) }),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthItemEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(HealthItemCrudFacade);
    fixture.detectChanges();
  });

  it('should update', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [HealthItemProperties.ID]: 'ID',
      [HealthItemProperties.NAME]: 'NAME',
      [HealthItemProperties.IS_ENABLED]: true,
    });
    let item: IHealthItem;
    facade.updateExistingEntity = jest.fn(x => (item = x));
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

    expect(item).toMatchSnapshot();

  });

  it('should not update', () => {
    component.addEditForm = { valid: false } as any;
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
  });

  it('should cancel', () => {
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });
});
