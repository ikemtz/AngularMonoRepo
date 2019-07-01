import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'ngnu-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit {

  identity$: Observable<User>;
  email$: Observable<string>;
  public collapsed = true;

  constructor(private oidcFacade: OidcFacade) {
    this.identity$ = this.oidcFacade.identity$;
    this.email$ = this.oidcFacade.identity$.pipe(
      filter(t => t&&t.profile),
      map(m => m.profile.email))
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
