import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthItemListComponent } from './list.component';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';
import { createDataEntryMockFacade, createDataDeleteMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { createHealthItem } from './list.facade.spec';
import { HealthItemListFacade } from './list.facade';
import { HealthItemCrudFacade } from '../health-items-crud';

describe('HealthItemListComponent', () => {
  let component: HealthItemListComponent;
  let fixture: ComponentFixture<HealthItemListComponent>;
  let listFacade: HealthItemListFacade;
  let crudFacade: HealthItemCrudFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthItemListComponent],
      providers: [
        { provide: HealthItemListFacade, useValue: createODataGridMockFacade(createDataDeleteMockFacade()) },
        { provide: HealthItemCrudFacade, useValue: createDataEntryMockFacade() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(HealthItemListFacade);
    crudFacade = TestBed.inject(HealthItemCrudFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle AddItem', () => {
    component.addItem();
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith({});
  });

  it('should handle EditItem', () => {
    const item = createHealthItem();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith(item);
  });

  it('should handle DeleteItem', () => {
    const item = createHealthItem();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toBeCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toBeCalledWith(item);
  });
});
