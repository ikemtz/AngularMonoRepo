import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './list.component';
import { GridModule, GridComponent, DetailExpandEvent } from '@progress/kendo-angular-grid';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';
import { createDataEntryMockFacade, createDataDeleteMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { createEmployee } from './list.facade.spec';
import { EmployeeListFacade } from './list.facade';
import { EmployeeCrudFacade } from '../employees-crud';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let listFacade: EmployeeListFacade;
  let crudFacade: EmployeeCrudFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports: [GridModule],
      providers: [
        { provide: EmployeeListFacade, useValue: createODataGridMockFacade(createDataDeleteMockFacade()) },
        { provide: EmployeeCrudFacade, useValue: createDataEntryMockFacade() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(EmployeeListFacade);
    crudFacade = TestBed.inject(EmployeeCrudFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle DetailExpanded', () => {
    const grid = fixture.debugElement.query(By.directive(GridComponent));
    const item = createEmployee();
    grid.triggerEventHandler('detailExpand', { dataItem: item } as DetailExpandEvent);
    expect(component.currentItem).toEqual(item);
  });

  it('should handle AddItem', () => {
    component.addItem();
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith({});
  });

  it('should handle EditItem', () => {
    const item = createEmployee();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith(item);
  });

  it('should handle DeleteItem', () => {
    const item = createEmployee();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toBeCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toBeCalledWith(item);
  });
});
