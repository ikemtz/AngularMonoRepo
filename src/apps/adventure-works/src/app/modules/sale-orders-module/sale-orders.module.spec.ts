import { TestBed } from '@angular/core/testing';
import { SaleOrdersModule } from './sale-orders.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SaleOrdersModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SaleOrdersModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('should create', () => {
    expect(SaleOrdersModule).toBeDefined();
    const module = new SaleOrdersModule();
    expect(module).toBeTruthy();
  });
});
