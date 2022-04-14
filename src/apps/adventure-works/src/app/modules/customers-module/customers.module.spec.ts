import { TestBed } from '@angular/core/testing';
import { CustomersModule } from './customers.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CustomersModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomersModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('should create', () => {
    expect(CustomersModule).toBeDefined();
    const module = new CustomersModule();
    expect(module).toBeTruthy();
  });
});
