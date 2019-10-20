import { TestBed } from '@angular/core/testing';

import { NursesApiService } from './nurses-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NursesApiService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const service: NursesApiService = TestBed.get(NursesApiService);
    expect(service).toBeTruthy();
  });
});
