import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ISignalrConfiguration, SIGNALR_CONFIG } from '../models/signalr.configuration';
import { Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { signalrActions } from '../+state/signalr.actions';
import { Store } from '@ngrx/store';
import * as fromSignalr from '../+state/signalr.reducer';
import { OidcFacade } from 'imng-auth0-oidc';

@Injectable({
  providedIn: 'root'
})
export class HubConnectionInjectorService implements OnDestroy {
  private readonly subscriptions: Subscription[] = [];
  public hubConnection: HubConnection;

  constructor(
    @Inject(SIGNALR_CONFIG) private readonly signalrConfiguration: ISignalrConfiguration,
    private readonly store$: Store<fromSignalr.SignalrPartialState>,
    oidcFacade: OidcFacade) {
    this.subscriptions.push(oidcFacade.accessToken$.pipe(
      filter(accessToken => !!accessToken),
      tap(accessToken => {
        this.hubConnection = this.getNewHubConnection(accessToken);
        this.hubConnection.onclose(async () =>
          this.store$.dispatch(signalrActions.connect()));
        signalrConfiguration.clientMethods.forEach(clientMethod =>
          this.hubConnection.on(clientMethod,
            data => this.store$.dispatch(signalrActions.receivedMessage({ methodName: clientMethod, data: data }))));
      })).subscribe());
  }

  public getNewHubConnection(accessToken: string): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.signalrConfiguration.hostUrl, { accessTokenFactory: () => accessToken })
      .configureLogging(this.signalrConfiguration.logLevel)
      .withAutomaticReconnect()
      .build();
  }

  public ngOnDestroy(): void {
    this.subscriptions.filter(t => t).forEach(t => t.unsubscribe());
  }
}
