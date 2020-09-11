import { Component, OnInit } from '@angular/core';
import { OidcFacade, Auth0Facade, IOidcUser } from 'imng-auth0-oidc';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'nrcrn-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  public readonly identity$: Observable<IOidcUser>;
  public readonly email$: Observable<string>;
  public readonly loggedIn$: Observable<boolean>;
  public readonly profilePicture$: Observable<string>;
  public collapsed = true;

  constructor(private readonly oidcFacade: OidcFacade, private readonly auth0Facade: Auth0Facade, public readonly router: Router) {
    this.identity$ = this.oidcFacade.identity$;
    this.email$ = this.auth0Facade.email$;
    this.loggedIn$ = this.oidcFacade.loggedIn$;
    this.profilePicture$ = this.auth0Facade.profilePicture$;
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  signinRedirect(): void {
    this.oidcFacade.signinRedirect();
  }

  signoutRedirect(): void {
    this.oidcFacade.signoutRedirect();
  }
}
