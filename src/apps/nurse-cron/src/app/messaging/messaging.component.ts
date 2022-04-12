import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrFacade, ISignalrMessage } from 'imng-signalr-ngrx';
import { take, filter, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'nrcrn-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent implements OnInit, OnDestroy {
  public lastMessage$?: Observable<ISignalrMessage<unknown> | undefined>;
  public subscriptions: Subscription[] = [];
  constructor(private readonly signalrFacade: SignalrFacade) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.signalrFacade.isConnected$
        .pipe(
          filter((t) => t),
          take(1),
          tap(() =>
            this.signalrFacade.sendMessage({
              methodName: 'SendMessage',
              data: 'Signed In',
            })
          )
        )
        .subscribe()
    );
    this.lastMessage$ = this.signalrFacade.lastReceivedMessage$;
    this.signalrFacade.connect();
  }
  ngOnDestroy(): void {
    this.subscriptions
      .filter((t) => !t.closed)
      .forEach((element) => {
        element.unsubscribe();
      });
  }
}
