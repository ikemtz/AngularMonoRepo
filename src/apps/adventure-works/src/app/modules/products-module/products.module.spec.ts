import { TestBed } from '@angular/core/testing';
import { ProductsModule } from './products.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('should create', () => {
    expect(ProductsModule).toBeDefined();
    const module = new ProductsModule();
    expect(module).toBeTruthy();
  });
});
