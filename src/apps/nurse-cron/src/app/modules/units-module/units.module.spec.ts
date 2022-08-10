import { TestBed } from '@angular/core/testing';
import { UnitsModule } from './units.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('UnitsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UnitsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('should create', () => {
    expect(UnitsModule).toBeDefined();
    const module = new UnitsModule();
    expect(module).toBeTruthy();
  });
});
