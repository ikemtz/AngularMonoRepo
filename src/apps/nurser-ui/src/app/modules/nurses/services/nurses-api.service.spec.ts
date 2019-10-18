import { TestBed } from '@angular/core/testing';

import { NursesApiService } from './nurses-api.service';

describe('NursesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NursesApiService = TestBed.get(NursesApiService);
    expect(service).toBeTruthy();
  });
});
