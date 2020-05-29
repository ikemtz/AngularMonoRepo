import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetencyListComponent } from './list.component';
import { GridModule, GridComponent, DetailExpandEvent } from '@progress/kendo-angular-grid';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';
import { createDataEntryMockFacade, createDataDeleteMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { createCompetency } from './list.facade.spec';
import { CompetencyListFacade } from './list.facade';
import { CompetencyCrudFacade } from '../competencies-crud';

describe('CompetencyListComponent', () => {
  let component: CompetencyListComponent;
  let fixture: ComponentFixture<CompetencyListComponent>;
  let listFacade: CompetencyListFacade;
  let crudFacade: CompetencyCrudFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyListComponent],
      imports: [GridModule],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle DetailExpanded', () => {
    const grid = fixture.debugElement.query(By.directive(GridComponent));
    const item = createCompetency();
    grid.triggerEventHandler('detailExpand', { dataItem: item } as DetailExpandEvent);
    expect(component.currentItem).toEqual(item);
  });

  it('should handle AddItem', () => {
    component.addItem();
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith({});
  });

  it('should handle EditItem', () => {
    component.editItem(createCompetency());
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith(createCompetency());
  });

  it('should handle DeleteItem', () => {
    component.deleteItem(createCompetency());
    expect(listFacade.deleteExistingEntity).toBeCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toBeCalledWith(createCompetency());
  });
});
