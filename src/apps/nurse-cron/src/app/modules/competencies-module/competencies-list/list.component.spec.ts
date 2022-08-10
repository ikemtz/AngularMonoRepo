import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createDataEntryMockFacade, createDataDeleteMockFacade } from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';

import { CompetencyListComponent } from './list.component';
import { createCompetency } from './list.facade.spec';
import { CompetencyListFacade } from './list.facade';
import { CompetencyCrudFacade } from '../competencies-crud';

describe('CompetencyListComponent', () => {
  let component: CompetencyListComponent;
  let fixture: ComponentFixture<CompetencyListComponent>;
  let listFacade: CompetencyListFacade;
  let crudFacade: CompetencyCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: CompetencyListFacade, useValue: createODataGridMockFacade(createDataDeleteMockFacade()) },
        { provide: CompetencyCrudFacade, useValue: createDataEntryMockFacade() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(CompetencyListFacade);
    crudFacade = TestBed.inject(CompetencyCrudFacade);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle DetailExpanded', () => {
    const dataItem = createCompetency();
    component.detailExpanded({ dataItem } as never);
    expect(component.currentItem).toEqual(dataItem);
  });

  test('it should handle reload', () => {
    component.reloadEntities();
    expect(listFacade.reloadEntities).toBeCalledTimes(1);
  });

  test('it should handle AddItem', () => {
    component.addItem();
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith({});
  });

  test('it should handle EditItem', () => {
    const item = createCompetency();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith(item);
  });

  test('it should handle DeleteItem', () => {
    const item = createCompetency();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toBeCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toBeCalledWith(item);
  });
});
