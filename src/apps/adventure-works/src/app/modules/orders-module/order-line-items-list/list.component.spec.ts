import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { createDataDeleteMockFacade } from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';

import { OrderLineItemListComponent } from './list.component';
import { OrderLineItemListFacade } from './list.facade';
import { createTestOrderLineItem } from '../../../models/odata';
import { provideRouter } from '@angular/router';
import { orderRoutes } from '../orders.routing';

describe('OrderLineItemListComponent', () => {
  let component: OrderLineItemListComponent;
  let fixture: ComponentFixture<OrderLineItemListComponent>;
  let listFacade: OrderLineItemListFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OrderLineItemListComponent],
      providers: [
        {
          provide: OrderLineItemListFacade,
          useValue: createODataGridMockFacade(createDataDeleteMockFacade()),
        },
        provideRouter(orderRoutes),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLineItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listFacade = TestBed.inject(OrderLineItemListFacade);
    component.parentGridId = 'ORDER_ID';
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('it should create', () => {
    expect(component).toBeTruthy();
  });

  test('it should handle reload', () => {
    component.reloadEntities();
    expect(listFacade.reloadEntities).toHaveBeenCalledTimes(1);
  });

  test('it should handle DeleteItem', () => {
    const item = createTestOrderLineItem();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toHaveBeenCalledWith(item);
  });
});
