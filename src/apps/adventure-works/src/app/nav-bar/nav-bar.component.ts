import { Component, inject } from '@angular/core';
import { OidcFacade, OidcUserFacade, IOidcUser } from 'imng-oidc-client';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'aw-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: false
})
export class NavBarComponent {
  private readonly oidcFacade = inject(OidcFacade);
  private readonly oidcUserFacade = inject(OidcUserFacade);
  readonly router = inject(Router);

  public readonly identity$: Observable<IOidcUser | undefined>;
  public readonly email$: Observable<string | undefined>;
  public readonly loggedIn$: Observable<boolean>;
  public readonly profilePicture$: Observable<string | undefined>;
  public collapsed = true;
  public items = [
    { text: 'Support', path: '/oidc/support' },
    { text: 'Logout' },
  ];


  constructor() {
    this.identity$ = this.oidcFacade.identity$;
    this.email$ = this.oidcUserFacade.email$;
    this.loggedIn$ = this.oidcFacade.loggedIn$;
    this.profilePicture$ = this.oidcUserFacade.profilePicture$;
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
