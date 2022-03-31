import { TestBed } from '@angular/core/testing';

import { HubConnectionInjectorService } from './hub-connection-injector.service';
import { SIGNALR_CONFIG } from '../models/signalr.configuration';
import { OidcFacade } from 'imng-auth0-oidc';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TestSchema } from '../+state/signalr.facade.spec';
import exp = require('constants');

describe('HubConnectionInjectorService', () => {
  let service: HubConnectionInjectorService;
  let store: Store<TestSchema>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SIGNALR_CONFIG,
          multi: false,
          useValue: { hostUrl: 'http://xyz/notificationHub', logger: 6, clientMethods: ['x'] },
        },
        { provide: OidcFacade, useValue: { accessToken$: of('xyz') } },
        { provide: Store, useValue: { dispatch: jest.fn() } },
      ],
    });
    service = TestBed.inject(HubConnectionInjectorService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect((service as unknown as { allSubscriptions: [] }).allSubscriptions.length).toBe(1);
  });

  it('should be ngOnDestroy', () => {
    service.ngOnDestroy();
  });

  it('should handle onClose', () => {
    service.onClose();
    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toBeCalledWith({
      type: '[SignalR] Init Connection',
    });
  });
  it('should handle onMessageReceived', () => {
    service.onMessageReceived('x', { id: '😉👼' });
    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toBeCalledWith({
      payload: {
        data: {
          id: '😉👼',
        },
        methodName: 'x',
      },
      type: '[SignalR] Received Message',
    });
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
