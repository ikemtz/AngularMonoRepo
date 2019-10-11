import { TestBed } from '@angular/core/testing';
import { ODataService } from './odata.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ODataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ODataService = TestBed.get(ODataService);
    expect(service).toBeTruthy();
  });
});
