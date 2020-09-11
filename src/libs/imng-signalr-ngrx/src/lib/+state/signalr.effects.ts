import { Injectable, } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { signalrActions } from './signalr.actions';
import { HubConnectionInjectorService } from '../services/hub-connection-injector.service';

@Injectable()
export class SignalrEffects {

  connect$ = createEffect(() => this.actions$.pipe(
    ofType(signalrActions.connect),
    map(async () => this.hubConnectionInjectorService.hubConnection.start()),
    map(() => signalrActions.setConnectionState(true)),
  ));

  sendMessage$ = createEffect(() => this.actions$.pipe(
    ofType(signalrActions.sendMessage),
    map(async action => this.hubConnectionInjectorService.hubConnection.send(action.payload.methodName, action.payload.data)),
  ), { dispatch: false });

  constructor(
    private readonly actions$: Actions,
    private readonly hubConnectionInjectorService: HubConnectionInjectorService,
  ) {
  }
}
