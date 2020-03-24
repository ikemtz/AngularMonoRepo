import { TestBed } from '@angular/core/testing';

import { MsalNgrxService } from './imng-msal-ngrx.service';

describe('MsalNgrxService', () => {
  let service: MsalNgrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsalNgrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
