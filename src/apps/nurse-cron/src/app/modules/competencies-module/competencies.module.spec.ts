import { TestBed } from '@angular/core/testing';
import { CompetenciesModule } from './competencies.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CompetenciesModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompetenciesModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    expect(CompetenciesModule).toBeDefined();
    const module = new CompetenciesModule();
    expect(module).toBeTruthy();
  });
});
