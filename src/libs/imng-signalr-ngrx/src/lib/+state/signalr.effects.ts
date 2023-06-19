import { Inject, Injectable } from '@angular/core';
import {
  createEffect,
  Actions,
  ofType,
  ROOT_EFFECTS_INIT,
  concatLatestFrom,
} from '@ngrx/effects';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { signalrActions } from './signalr.actions';
import { HubConnectionInjectorService } from '../services/hub-connection-injector.service';
import { Store } from '@ngrx/store';
import { signalrFeature } from './signalr.reducer';
import {
  ISignalrConfiguration,
  SIGNALR_CONFIG,
} from '../models/signalr.configuration';

@Injectable()
export class SignalrEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => from(Notification.requestPermission())),
      map((x) => signalrActions.setNotificationState(x)),
    );
  });

  connect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signalrActions.connect),
      map(async () => this.hubConnectionInjectorService.hubConnection?.start()),
      map(() => signalrActions.setConnectionState({ isConnected: true })),
    );
  });

  sendMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signalrActions.sendMessage),
        map(async (action) =>
          this.hubConnectionInjectorService.hubConnection?.send(
            action.payload.methodName,
            action.payload.data,
          ),
        ),
      );
    },
    { dispatch: false },
  );

  receiveMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signalrActions.receivedMessage),
        concatLatestFrom(() =>
          this.store.select(signalrFeature.selectNotificationPermission),
        ),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        filter(([_, permission]) => permission === 'granted'),
        tap(
          ([action, _]) =>
            new Notification(this.signalrConfiguration.notificationTitle, {
              body: action.payload.data as string,
              icon: this.signalrConfiguration.notificationIcon,
            }),
        ),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly hubConnectionInjectorService: HubConnectionInjectorService,
    private readonly store: Store,
    @Inject(SIGNALR_CONFIG)
    private readonly signalrConfiguration: ISignalrConfiguration,
  ) {}
}
