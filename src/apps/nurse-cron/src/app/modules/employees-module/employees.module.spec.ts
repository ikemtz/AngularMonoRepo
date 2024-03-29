import { TestBed } from '@angular/core/testing';
import { EmployeesModule } from './employees.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('EmployeesModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeesModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('should create', () => {
    expect(EmployeesModule).toBeDefined();
    const module = new EmployeesModule();
    expect(module).toBeTruthy();
  });
});
