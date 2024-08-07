import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  createDataEntryMockFacade,
  createDataDeleteMockFacade,
} from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';

import { OrderListComponent } from './list.component';
import { createOrder } from './list.facade.spec';
import { OrderListFacade } from './list.facade';
import { OrderCrudFacade } from '../orders-crud';
import { provideRouter } from '@angular/router';
import { orderRoutes } from '../orders.routing';
import { provideOidcMockFacade } from 'imng-oidc-client/testing';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let listFacade: OrderListFacade;
  let crudFacade: OrderCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListComponent],
      imports: [],
      providers: [
        {
          provide: OrderListFacade,
          useValue: createODataGridMockFacade(createDataDeleteMockFacade()),
        },
        { provide: OrderCrudFacade, useValue: createDataEntryMockFacade() },
        provideRouter(orderRoutes),
        provideOidcMockFacade(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(OrderListFacade);
    crudFacade = TestBed.inject(OrderCrudFacade);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle DetailExpanded', () => {
    const dataItem = createOrder();
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
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith({
      orderLineItemOData: {
        data: [],
        total: 0,
      },
      orderLineItemODataState: {},
      orderLineItemPagerSettings: false,
    });
  });

  test('it should handle EditItem', () => {
    const item = createOrder();
    component.editItem(item);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledTimes(1);
    expect(crudFacade.setCurrentEntity).toHaveBeenCalledWith(item);
  });

  test('it should handle DeleteItem', () => {
    const item = createOrder();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledWith(item);
  });
});
