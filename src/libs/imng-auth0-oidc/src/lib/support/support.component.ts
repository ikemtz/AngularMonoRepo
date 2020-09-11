import { Component } from '@angular/core';
import { OidcFacade } from '../+state/oidc.facade';
import { Auth0Facade } from '../+state/auth0.facade';

@Component({
  selector: 'imng-support',
  templateUrl: './support.component.html'
})
export class SupportComponent {
  constructor(public readonly facade: OidcFacade, public readonly auth0Facade: Auth0Facade) { }
}
