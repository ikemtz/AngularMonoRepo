import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from 'imng-ngrx-utils/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { SignalrEffects } from './signalr.effects';
import { SignalrFacade } from './signalr.facade';

import { signalrFeature } from './signalr.reducer';
import { HubConnectionInjectorService } from '../services/hub-connection-injector.service';
import { SIGNALR_CONFIG } from '../models/signalr.configuration';
import { receivedMessage } from './signalr.actions';
import { OidcFacade } from 'imng-oidc-client';
import { of } from 'rxjs';

describe('SignalrFacade', () => {
  let facade: SignalrFacade;
  let store: Store;
  let service: HubConnectionInjectorService;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(signalrFeature),
          EffectsModule.forFeature([SignalrEffects]),
        ],
        providers: [
          {
            provide: SIGNALR_CONFIG,
            multi: false,
            useValue: {
              hostUrl: 'http://xyz/notificationHub',
              logLevel: 1,
              clientMethods: ['x'],
            },
          },
          { provide: OidcFacade, useValue: { accessToken$: of('xyz') } },
          {
            provide: HubConnectionInjectorService,
            useValue: {
              hubConnection: {
                on: jest.fn(),
                send: jest.fn(),
                start: jest.fn(() => Promise.resolve()),
                onclose: jest.fn(),
              },
            },
          },
          SignalrFacade,
        ],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(SignalrFacade);
      service = TestBed.inject(HubConnectionInjectorService);
    });

    it('should be truthy', () => {
      expect(store).toBeTruthy();
      expect(service).toBeTruthy();
      expect(facade).toBeTruthy();
    });

    it('should handle reconnect', async () => {
      facade.connect();
      expect(service.hubConnection?.start).toBeCalledTimes(1);
      const result = await readFirst(store);
      expect(result).toMatchSnapshot();
      const isConnected = await readFirst(facade.isConnected$);
      expect(isConnected).toBe(true);
    });

    it('should handle send', () => {
      facade.sendMessage({ methodName: 'helloWorld', data: '😎' });
      expect(service.hubConnection?.send).toBeCalledTimes(1);
      expect(service.hubConnection?.send).toBeCalledWith('helloWorld', '😎');
    });

    it('should handle received messages', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (facade as any).store.dispatch(
        receivedMessage({ methodName: 'helloWorld', data: '😎' })
      );

      let result = await readFirst(store);
      expect(result).toMatchSnapshot('pre-clear');

      const message = await readFirst(facade.lastReceivedMessage$);
      expect(message).toStrictEqual({ methodName: 'helloWorld', data: '😎' });

      const messages = await readFirst(facade.receivedMessages$);
      expect(messages).toStrictEqual([
        { methodName: 'helloWorld', data: '😎' },
      ]);

      facade.clearMessages();
      result = await readFirst(store);
      expect(result).toMatchSnapshot('post-cleared');
    });
  });
});
