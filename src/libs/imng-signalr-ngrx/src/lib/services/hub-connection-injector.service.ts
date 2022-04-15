import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import {
  ISignalrConfiguration,
  SIGNALR_CONFIG,
} from '../models/signalr.configuration';

import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { tap, filter } from 'rxjs/operators';
import { signalrActions } from '../+state/signalr.actions';
import { Store } from '@ngrx/store';
import { OidcFacade } from 'imng-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class HubConnectionInjectorService implements OnDestroy, Subscribable {
  public readonly allSubscriptions = new Subscriptions();
  public hubConnection?: HubConnection;

  constructor(
    @Inject(SIGNALR_CONFIG)
    private readonly signalrConfiguration: ISignalrConfiguration,
    private readonly store: Store,
    oidcFacade: OidcFacade
  ) {
    this.allSubscriptions.push(
      oidcFacade.accessToken$
        .pipe(
          filter((accessToken) => !!accessToken),
          tap((accessToken) => {
            this.hubConnection = this.getNewHubConnection(accessToken);
            this.hubConnection?.onclose(this.onClose);
            signalrConfiguration.clientMethods?.forEach((clientMethod) =>
              this.hubConnection?.on(clientMethod, (data) =>
                this.onMessageReceived(clientMethod, data)
              )
            );
          })
        )
        .subscribe()
    );
  }
  public onClose() {
    this.store.dispatch(signalrActions.connect());
  }
  public onMessageReceived(clientMethod: string, data: unknown) {
    this.store.dispatch(
      signalrActions.receivedMessage({ methodName: clientMethod, data })
    );
  }
  public getNewHubConnection(accessToken?: string): HubConnection | undefined {
    if (accessToken) {
      return new HubConnectionBuilder()
        .withUrl(this.signalrConfiguration.hostUrl, {
          ...this.signalrConfiguration,
          accessTokenFactory: () => accessToken,
        })
        .configureLogging(this.signalrConfiguration.logger)
        .withAutomaticReconnect()
        .build();
    }
    return; //NOSONAR
  }

  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
