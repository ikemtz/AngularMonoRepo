import { TestBed } from '@angular/core/testing';
import { ODataService } from './odata.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ODataService', () => {
  let service: ODataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ODataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
