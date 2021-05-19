import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CompetencyEditComponent } from './edit.component';
import { CompetencyCrudFacade } from './crud.facade';
import { CompetencyProperties, ICompetency } from '../../../models/competencies-odata';

describe('CompetencyEditComponent', () => {
  let component: CompetencyEditComponent;
  let fixture: ComponentFixture<CompetencyEditComponent>;
  let facade: CompetencyCrudFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyEditComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        {
          provide: CompetencyCrudFacade,
          useValue: createDataEntryMockFacade({ currentEntity$: of({}) }),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(CompetencyCrudFacade);
    fixture.detectChanges();
  });

  it('should update', () => {
    component.initForm();
    component.addEditForm.patchValue({
      [CompetencyProperties.ID]: 'ID',
      [CompetencyProperties.NAME]: 'NAME',
      [CompetencyProperties.IS_ENABLED]: true,
    });
    let item: ICompetency;
    facade.updateExistingEntity = jest.fn(x => (item = x));
    component.save();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

    expect(item).toMatchSnapshot();

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
