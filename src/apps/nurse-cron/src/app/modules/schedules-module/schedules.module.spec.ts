import { TestBed } from '@angular/core/testing';
import { SchedulesModule } from './schedules.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SchedulesModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SchedulesModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('should create', () => {
    expect(SchedulesModule).toBeDefined();
    const module = new SchedulesModule();
    expect(module).toBeTruthy();
  });
});
