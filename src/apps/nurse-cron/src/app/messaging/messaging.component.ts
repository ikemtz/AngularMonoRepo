import { Component, OnInit } from '@angular/core';
import { SignalrFacade, signalrActions, ISignalrMessage } from 'imng-signalr-ngrx';
import { take, filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'nrcrn-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  public lastMessage$: Observable<ISignalrMessage<string>>;
  constructor(private readonly signalrFacade: SignalrFacade) { }

  ngOnInit(): void {
    this.signalrFacade.isConnected$.pipe(
      filter(t => t),
      take(1),
      tap(t => this.signalrFacade.dispatchAction(signalrActions.sendMessage({
        methodName: 'SendMessage',
        data: 'Signed In'
      }))));
    this.lastMessage$ = this.signalrFacade.lastReceivedMessage$;
    this.signalrFacade.dispatchAction(signalrActions.connect());
  }


}
