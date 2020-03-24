import { Component, OnInit } from '@angular/core';
import { MsalNgrxService } from '../../services/imng-msal-ngrx.service';

@Component({
  selector: 'imng-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent implements OnInit {
  constructor(private readonly msalNgrxService: MsalNgrxService) {}

  ngOnInit(): void {
    console.log('error');
    this.msalNgrxService.handleRedirectCallback(this.msalNgrxService.authRedirectCallBack);
  }
}
