import { TestBed } from '@angular/core/testing';
import { OidcService } from './oidc.service';
import { OIDC_CONFIG } from '../models/config.model';

describe('OidcService', () => {
  let service: OidcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OIDC_CONFIG, useValue: { oidc_config: {} } }]
    });
    service = TestBed.inject(OidcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
