import { TestBed } from '@angular/core/testing';

import { NurseCertificationsApiService } from './nurse-certifications-api.service';

describe('NurseCertificationsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NurseCertificationsApiService = TestBed.get(NurseCertificationsApiService);
    expect(service).toBeTruthy();
  });
});
