import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SignalrFacade, ISignalrMessage } from 'imng-signalr-ngrx';
import { take, filter, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'nrcrn-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class MessagingComponent implements OnInit, OnDestroy {
  private readonly signalrFacade = inject(SignalrFacade);

  public lastMessage$?: Observable<ISignalrMessage | undefined>;
  public subscriptions: Subscription[] = [];

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
            }),
          ),
        )
        .subscribe(),
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
