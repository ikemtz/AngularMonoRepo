import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { SignalrEffects } from './signalr.effects';
import { SignalrFacade } from './signalr.facade';

import { SIGNALR_FEATURE_KEY, State, initialState, reducer } from './signalr.reducer';
import { HubConnectionInjectorService } from '../services/hub-connection-injector.service';
import { SIGNALR_CONFIG } from '../models/signalr.configuration';
import { connect, sendMessage, receivedMessage, clearMessages } from './signalr.actions';

interface TestSchema {
  signalr: State;
}

describe('SignalrFacade', () => {
  let facade: SignalrFacade;
  let store: Store<TestSchema>;
  let service: HubConnectionInjectorService;
  let closeCallback;
  let messageReceivedCallBack;
  beforeEach(() => { });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SIGNALR_FEATURE_KEY, reducer, { initialState }),
          EffectsModule.forFeature([SignalrEffects])],
        providers: [SignalrFacade,
          {
            provide: HubConnectionInjectorService, useValue: {
              hubConnection: {
                on: jest.fn((x, y) => messageReceivedCallBack = y),
                send: jest.fn(),
                start: jest.fn(() => Promise.resolve()),
                onclose: jest.fn(x => x)
              }
            }
          },
          { provide: SIGNALR_CONFIG, multi: false, useValue: { hostUrl: 'http://xyz/notificationHub', logLevel: 1, clientMethods: ['x'] } }],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule],
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
      expect(service.hubConnection.on).toBeCalledTimes(1);
    });

    it('should handle connect', async done => {
      try {
        facade.dispatchAction(connect());
        expect(service.hubConnection.start).toBeCalledTimes(1);
        const result = await readFirst(store);
        expect(result).toMatchSnapshot();
        const isConnected = await readFirst(facade.isConnected$);
        expect(isConnected).toBe(true);
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });

    it('should handle send', () => {
      facade.dispatchAction(sendMessage({ methodName: 'helloWorld', data: '😎' }));
      expect(service.hubConnection.send).toBeCalledTimes(1);
      expect(service.hubConnection.send).toBeCalledWith('helloWorld', '😎');
    });

    it('should handle received messages', async done => {
      try {
        facade.dispatchAction(receivedMessage({ methodName: 'helloWorld', data: '😎' }));
        messageReceivedCallBack('😎');
        let result = await readFirst(store);
        expect(result).toMatchSnapshot('pre-clear');

        const message = await readFirst(facade.lastReceivedMessage$);
        expect(message).toStrictEqual({ methodName: 'helloWorld', data: '😎' });

        const messages = await readFirst(facade.receivedMessages$);
        expect(messages).toStrictEqual([{ methodName: 'helloWorld', data: '😎' }]);

        facade.dispatchAction(clearMessages());
        result = await readFirst(store);
        expect(result).toMatchSnapshot('post-cleared');
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });
  });
});
