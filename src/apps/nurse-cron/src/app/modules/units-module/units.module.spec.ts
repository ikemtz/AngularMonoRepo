import { async, TestBed } from '@angular/core/testing';
import { UnitsModule } from './units.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('UnitsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UnitsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UnitsModule).toBeDefined();
    const module = new UnitsModule();
    expect(module).toBeTruthy();
  });
});
