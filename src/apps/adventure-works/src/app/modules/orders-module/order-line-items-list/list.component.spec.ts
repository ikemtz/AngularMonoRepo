import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createDataDeleteMockFacade } from 'imng-kendo-data-entry/testing';
import { createODataGridMockFacade } from 'imng-kendo-grid-odata/testing';

import { OrderLineItemListComponent } from './list.component';
import { createOrderLineItem } from './list.facade.spec';
import { OrderLineItemListFacade } from './list.facade';

describe('OrderLineItemListComponent', () => {
  let component: OrderLineItemListComponent;
  let fixture: ComponentFixture<OrderLineItemListComponent>;
  let listFacade: OrderLineItemListFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrderLineItemListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: OrderLineItemListFacade, useValue: createODataGridMockFacade(createDataDeleteMockFacade()) },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
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
    expect(listFacade.reloadEntities).toBeCalledTimes(1);
  });

  test('it should handle DeleteItem', () => {
    const item = createOrderLineItem();
    component.deleteItem(item);
    expect(listFacade.deleteExistingEntity).toBeCalledTimes(1);
    expect(listFacade.deleteExistingEntity).toBeCalledWith(item);
  });
});
