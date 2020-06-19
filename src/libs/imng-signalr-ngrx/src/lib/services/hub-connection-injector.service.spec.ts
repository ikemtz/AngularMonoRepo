import { TestBed } from '@angular/core/testing';

import { HubConnectionInjectorService } from './hub-connection-injector.service';
import { SIGNALR_CONFIG } from '../models/signalr.configuration';
import { OidcFacade } from 'imng-auth0-oidc';
import { of } from 'rxjs';

describe('HubConnectionInjectorService', () => {
  let service: HubConnectionInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SIGNALR_CONFIG, multi: false, useValue: { hostUrl: 'http://xyz/notificationHub', logLevel: 1 } },
        { provide: OidcFacade, useValue: { accessToken$: of('xyz') } }
      ]
    });
    service = TestBed.inject(HubConnectionInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
