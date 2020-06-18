import { Injectable, Inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { signalrActions } from './signalr.actions';
import { HubConnectionInjectorService } from '../services/hub-connection-injector.service';
import { SignalrPartialState } from './signalr.reducer';
import { SIGNALR_CONFIG, ISignalrConfiguration } from '../models/signalr.configuration';
@Injectable()
export class SignalrEffects {

  connect$ = createEffect(() => this.actions$.pipe(
    ofType(signalrActions.connect),
    map(async () => await this.hubConnectionInjectorService.hubConnection.start()),
    map(() => signalrActions.setConnectionState(true)),
  ));

  sendMessage$ = createEffect(() => this.actions$.pipe(
    ofType(signalrActions.sendMessage),
    map(async action => await this.hubConnectionInjectorService.hubConnection.send(action.payload.methodName, action.payload.data)),
  ), { dispatch: false });

  constructor(private readonly actions$: Actions,
    private readonly store$: Store<SignalrPartialState>,
    private readonly hubConnectionInjectorService: HubConnectionInjectorService,
    @Inject(SIGNALR_CONFIG) signalrConfiguration: ISignalrConfiguration
  ) {

    this.hubConnectionInjectorService.hubConnection.onclose(async () => {
      this.store$.dispatch(signalrActions.connect());
    });
    signalrConfiguration.clientMethods.forEach(clientMethod => {
      this.hubConnectionInjectorService.hubConnection.on(clientMethod,
        data => this.store$.dispatch(signalrActions.receivedMessage({ methodName: clientMethod, data: data }))
      );
    });
  }
}
