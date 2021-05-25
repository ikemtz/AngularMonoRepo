import { TestBed } from '@angular/core/testing';
import { CertificationsModule } from './certifications.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CertificationsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CertificationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it.skip('should create', () => {
    expect(CertificationsModule).toBeDefined();
    const module = new CertificationsModule();
    expect(module).toBeTruthy();
  });
});
