import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map } from 'rxjs';
import { HubConnectionInjectorService } from '../services/hub-connection-injector.service';
import { signalrActions } from './signalr.actions';

@Injectable()
export class SignalrEffects {
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
        map(
          async (action) =>
            this.hubConnectionInjectorService.hubConnection?.send(
              action.payload.methodName,
              action.payload.data,
            ),
        ),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly hubConnectionInjectorService: HubConnectionInjectorService,
  ) {}
}
