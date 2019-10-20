import { TestBed } from '@angular/core/testing';

import { NurseCertificationsApiService } from './nurse-certifications-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NurseCertificationsApiService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const service: NurseCertificationsApiService = TestBed.get(NurseCertificationsApiService);
    expect(service).toBeTruthy();
  });
});
