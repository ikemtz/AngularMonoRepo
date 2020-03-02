import { Component, OnInit } from '@angular/core';
import { OidcFacade } from '../+state/oidc.facade';

@Component({
  selector: 'imng-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(public facade: OidcFacade) { }

  ngOnInit() {
  }

}