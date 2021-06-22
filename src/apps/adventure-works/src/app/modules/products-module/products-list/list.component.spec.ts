import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './list.component';
import { GridModule, GridComponent, DetailExpandEvent } from '@progress/kendo-angular-grid';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';
import { createDataEntryMockFacade, createDataDeleteMockFacade } from 'imng-kendo-data-entry/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { createProduct } from './list.facade.spec';
import { ProductListFacade } from './list.facade';
import { ProductCrudFacade } from '../products-crud';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let listFacade: ProductListFacade;
  let crudFacade: ProductCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [GridModule],
      providers: [
        { provide: ProductListFacade, useValue: createODataGridMockFacade(createDataDeleteMockFacade()) },
        { provide: ProductCrudFacade, useValue: createDataEntryMockFacade() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(ProductListFacade);
    crudFacade = TestBed.inject(ProductCrudFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle DetailExpanded', () => {
    const grid = fixture.debugElement.query(By.directive(GridComponent));
    const item = createProduct();
    grid.triggerEventHandler('detailExpand', { dataItem: item } as DetailExpandEvent);
    expect(component.currentItem).toEqual(item);
  });

  it('should handle AddItem', () => {
    component.addItem();
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith({});
  });
  
  it('should handle EditItem', () => {
    const item = createProduct();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toBeCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toBeCalledWith(item);
  });

  it('should handle DeleteItem', () => {
    const item = createProduct();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toBeCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toBeCalledWith(item);
  });
});
