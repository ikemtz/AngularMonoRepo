import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';
import { Auth0Facade, OidcFacade } from '@imao/auth0-oidc';

@Component({
  selector: 'ngnu-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit {

  public readonly identity$: Observable<User>;
  public readonly email$: Observable<string>;
  public readonly loggedIn$: Observable<boolean>;
  public collapsed = true;

  constructor(private oidcFacade: OidcFacade, private auth0Facade: Auth0Facade) {
    this.identity$ = this.oidcFacade.identity$;
    this.email$ = this.auth0Facade.email$;
    this.loggedIn$ = this.oidcFacade.loggedIn$;
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  ngOnInit() {
    this.oidcFacade.getOidcUser();
  }

  signinRedirect() {
    this.oidcFacade.signinRedirect();
  }

  signoutRedirect() {
    this.oidcFacade.signoutRedirect();
  }
}
