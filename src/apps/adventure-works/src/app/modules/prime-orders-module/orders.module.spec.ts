import { TestBed } from '@angular/core/testing';
import { OrdersModule } from './orders.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrdersModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OrdersModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('should create', () => {
    expect(OrdersModule).toBeDefined();
    const module = new OrdersModule();
    expect(module).toBeTruthy();
  });
});
