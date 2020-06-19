import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ISignalrConfiguration, SIGNALR_CONFIG } from '../models/signalr.configuration';
import { OidcFacade } from 'imng-auth0-oidc';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HubConnectionInjectorService implements OnDestroy {
  private readonly subscriptions: Subscription[] = [];
  public hubConnection: HubConnection;

  constructor(@Inject(SIGNALR_CONFIG) signalrConfiguration: ISignalrConfiguration, oidcFacade: OidcFacade) {
    this.subscriptions.push(oidcFacade.accessToken$.pipe(
      tap(accessToken => {
        this.hubConnection = new HubConnectionBuilder()
          .withUrl(signalrConfiguration.hostUrl, { accessTokenFactory: () => accessToken })
          .configureLogging(signalrConfiguration.logLevel)
          .withAutomaticReconnect()
          .build();
      })).subscribe());
  }
  ngOnDestroy(): void {
    this.subscriptions.filter(t => t).forEach(t => t.unsubscribe());
  }
}
