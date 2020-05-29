import { async, TestBed } from '@angular/core/testing';
import { HealthItemsModule } from './health-items.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('HealthItemsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HealthItemsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HealthItemsModule).toBeDefined();
    const module = new HealthItemsModule();
    expect(module).toBeTruthy();
  });
});
