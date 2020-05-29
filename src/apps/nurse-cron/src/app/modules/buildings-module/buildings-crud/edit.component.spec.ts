import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { of } from 'rxjs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { BuildingEditComponent } from './edit.component';
import { BuildingCrudFacade } from './crud.facade';
import { BuildingProperties, IBuilding } from '../../../models/units-odata';

describe('BuildingEditComponent', () => {
  let component: BuildingEditComponent;
  let fixture: ComponentFixture<BuildingEditComponent>;
  let facade: BuildingCrudFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingEditComponent],
      imports: [ReactiveFormsModule, ImngDataEntryDialogModule, NoopAnimationsModule, DatePickerModule],
      providers: [
        {
          provide: BuildingCrudFacade,
          useValue: createDataEntryMockFacade({ currentEntity$: of({}) }),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(BuildingCrudFacade);
    fixture.detectChanges();
  });

  it('should update', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [BuildingProperties.ID]: 'ID',
      [BuildingProperties.NAME]: 'NAME',
      [BuildingProperties.SITE_NAME]: 'SITE_NAME',
      [BuildingProperties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',
      [BuildingProperties.ADDRESS_LINE_2]: 'ADDRESS_LINE_2',
      [BuildingProperties.CITY_OR_MUNICIPALITY]: 'CITY_OR_MUNICIPALITY',
      [BuildingProperties.STATE_OR_PROVIDENCE]: 'STATE_OR_PROVIDENCE',
      [BuildingProperties.POSTAL_CODE]: 'POSTAL_CODE',
      [BuildingProperties.COUNTRY]: 'COU',
      [BuildingProperties.GPS_DATA]: 'GPS_DATA',
      [BuildingProperties.DELETED_BY]: 'DELETED_BY',
      [BuildingProperties.DELETED_ON_UTC]: new Date(),
    });
    let item: IBuilding;
    facade.updateExistingEntity = jest.fn(x => (item = x));
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

    expect(item).toMatchSnapshot({
      deletedOnUtc: expect.any(Date),
    });

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
