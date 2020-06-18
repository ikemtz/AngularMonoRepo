import { Injectable, Inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ISignalrConfiguration, SIGNALR_CONFIG } from '../models/signalr.configuration';

@Injectable({
  providedIn: 'root'
})
export class HubConnectionInjectorService {
  public readonly hubConnection: HubConnection;
  constructor(@Inject(SIGNALR_CONFIG) signalrConfiguration: ISignalrConfiguration) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(signalrConfiguration.hostUrl)
      .configureLogging(signalrConfiguration.logLevel)
      .withAutomaticReconnect()
      .build();
  }
}
