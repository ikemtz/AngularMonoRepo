import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth0Facade, OidcFacade, IOidcUser } from 'imng-auth0-oidc';

@Component({
  selector: 'ngnu-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  public readonly identity$: Observable<IOidcUser>;
  public readonly email$: Observable<string>;
  public readonly loggedIn$: Observable<boolean>;
  public readonly profilePicture$: Observable<string>;
  public collapsed = true;

  constructor(private readonly oidcFacade: OidcFacade, private readonly auth0Facade: Auth0Facade) {
    this.identity$ = this.oidcFacade.identity$;
    this.email$ = this.auth0Facade.email$;
    this.loggedIn$ = this.oidcFacade.loggedIn$;
    this.profilePicture$ = this.auth0Facade.profilePicture$;
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  signinRedirect() {
    this.oidcFacade.signinRedirect();
  }

  signoutRedirect() {
    this.oidcFacade.signoutRedirect();
  }
}
