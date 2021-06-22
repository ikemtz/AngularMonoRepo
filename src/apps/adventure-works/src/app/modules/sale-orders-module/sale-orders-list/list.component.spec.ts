import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleOrderListComponent } from './list.component';
import { GridModule, GridComponent, DetailExpandEvent } from '@progress/kendo-angular-grid';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';
import { createDataEntryMockFacade, createDataDeleteMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { createSaleOrder } from './list.facade.spec';
import { SaleOrderListFacade } from './list.facade';
import { SaleOrderCrudFacade } from '../sale-orders-crud';

describe('SaleOrderListComponent', () => {
  let component: SaleOrderListComponent;
  let fixture: ComponentFixture<SaleOrderListComponent>;
  let listFacade: SaleOrderListFacade;
  let crudFacade: SaleOrderCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SaleOrderListComponent],
      imports: [GridModule],
      providers: [
        { provide: SaleOrderListFacade, useValue: createODataGridMockFacade(createDataDeleteMockFacade()) },
        { provide: SaleOrderCrudFacade, useValue: createDataEntryMockFacade() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(SaleOrderListFacade);
    crudFacade = TestBed.inject(SaleOrderCrudFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle DetailExpanded', () => {
    const grid = fixture.debugElement.query(By.directive(GridComponent));
    const item = createSaleOrder();
    grid.triggerEventHandler('detailExpand', { dataItem: item } as DetailExpandEvent);
    expect(component.currentItem).toEqual(item);
  });

  it('should handle AddItem', () => {
    component.addItem();
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith({});
  });
  
  it('should handle EditItem', () => {
    const item = createSaleOrder();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith(item);
  });

  it('should handle DeleteItem', () => {
    const item = createSaleOrder();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toBeCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toBeCalledWith(item);
  });
});
