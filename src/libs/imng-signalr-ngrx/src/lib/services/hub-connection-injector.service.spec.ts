import { TestBed } from '@angular/core/testing';

import { HubConnectionInjectorService } from './hub-connection-injector.service';
import { SIGNALR_CONFIG } from '../models/signalr.configuration';
import { OidcFacade } from 'imng-oidc-client';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { NullLogger } from '@microsoft/signalr';
import { HttpTransportType } from '@microsoft/signalr';

describe('HubConnectionInjectorService', () => {
  let service: HubConnectionInjectorService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SIGNALR_CONFIG,
          multi: false,
          useValue: {
            hostUrl: 'http://xyz/notificationHub',
            logger: NullLogger,
            clientMethods: ['x'],
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets,
          },
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
    expect(
      (service as unknown as { allSubscriptions: []; }).allSubscriptions.length
    ).toBe(1);
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
  it('should handle null access token', () => {
    const result = service.getNewHubConnection();
    expect(result).toBeUndefined();
  });

  it('should throw an error on improper host', async () => {
    const hubConnection = service.getNewHubConnection('accessToken');
    jest.spyOn(global.console, 'error');
    try {
      await hubConnection?.start();
    } catch (err) {
      expect(err).toMatchSnapshot();
      expect((err as { statusCode: number; }).statusCode).toBeFalsy();
    }
    expect.assertions(2);
  });
});
