import { Component, OnInit } from '@angular/core';
import { SignalrFacade, signalrActions } from 'imng-signalr-ngrx';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'nrcrn-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  constructor(private readonly signalrFacade: SignalrFacade) { }

  ngOnInit(): void {
    this.signalrFacade.isConnected$.pipe(filter(t => t), take(1));
    this.signalrFacade.dispatchAction(signalrActions.connect());

  }


}
