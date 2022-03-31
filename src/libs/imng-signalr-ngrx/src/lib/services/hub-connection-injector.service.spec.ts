import { TestBed } from '@angular/core/testing';

import { HubConnectionInjectorService } from './hub-connection-injector.service';
import { SIGNALR_CONFIG } from '../models/signalr.configuration';
import { OidcFacade } from 'imng-auth0-oidc';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('HubConnectionInjectorService', () => {
  let service: HubConnectionInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SIGNALR_CONFIG,
          multi: false,
          useValue: { hostUrl: 'http://xyz/notificationHub', logger: 6, clientMethods: [] },
        },
        { provide: OidcFacade, useValue: { accessToken$: of('xyz') } },
        { provide: Store, useValue: { dispatch: jest.fn() } },
      ],
    });
    service = TestBed.inject(HubConnectionInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect((service as unknown as { allSubscriptions: [] }).allSubscriptions.length).toBe(1);
  });

  it('should be ngOnDestroy', () => {
    service.ngOnDestroy();
  });

  it('should throw an error on improper host', async () => {
    const hubConnection = service.getNewHubConnection('accessToken');
    jest.spyOn(global.console, 'error');
    try {
      await hubConnection.start();
    } catch (err) {
      expect(err).toMatchSnapshot();
      expect(err.statusCode).toBe(0);
    }
    expect.assertions(2);
  });
});
