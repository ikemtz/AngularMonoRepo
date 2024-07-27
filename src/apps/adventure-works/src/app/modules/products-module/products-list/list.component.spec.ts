import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  createDataEntryMockFacade,
  createDataDeleteMockFacade,
} from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';

import { ProductListComponent } from './list.component';
import { ProductListFacade } from './list.facade';
import { ProductCrudFacade } from '../products-crud';
import { createTestProduct } from '../../../models/odata';
import { provideRouter } from '@angular/router';
import { productRoutes } from '../products.routing';
import { provideOidcMockFacade } from 'imng-oidc-client/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let listFacade: ProductListFacade;
  let crudFacade: ProductCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [],
      providers: [
        {
          provide: ProductListFacade,
          useValue: createODataGridMockFacade(createDataDeleteMockFacade()),
        },
        { provide: ProductCrudFacade, useValue: createDataEntryMockFacade() },
        provideRouter(productRoutes),
        provideOidcMockFacade(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(ProductListFacade);
    crudFacade = TestBed.inject(ProductCrudFacade);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle DetailExpanded', () => {
    const dataItem = createTestProduct();
    component.detailExpanded({ dataItem } as never);
    expect(component.currentItem).toEqual(dataItem);
  });

  test('it should handle reload', () => {
    component.reloadEntities();
    expect(listFacade.reloadEntities).toHaveBeenCalledTimes(1);
  });

  test('it should handle AddItem', () => {
    component.addItem();
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith({});
  });

  test('it should handle EditItem', () => {
    const item = createTestProduct();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith(item);
  });

  test('it should handle DeleteItem', () => {
    const item = createTestProduct();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledWith(item);
  });

  test('it should getFormatSrc', () => {
    const result = component.getFormatSrc(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      'png',
    );
    expect(result).toMatchSnapshot();
  });
});
