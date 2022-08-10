import { TestBed } from '@angular/core/testing';
import { BuildingsModule } from './buildings.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('BuildingsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BuildingsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('should create', () => {
    expect(BuildingsModule).toBeDefined();
    const module = new BuildingsModule();
    expect(module).toBeTruthy();
  });
});
