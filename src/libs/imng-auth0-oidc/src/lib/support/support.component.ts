import { Component, OnInit } from '@angular/core';
import { OidcFacade } from '../+state/oidc.facade';
import { Auth0Facade } from '../+state/auth0.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'imng-support',
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {
  public profileValue$: Observable<{ key: string, value: string; }[]>;
  constructor(public readonly facade: OidcFacade, public readonly auth0Facade: Auth0Facade) { }
  ngOnInit(): void {
    this.profileValue$ = this.auth0Facade.profile$.pipe(map(x =>
      Object.keys(x).map(propertyKey => ({ key: propertyKey, value: x[propertyKey] }))
    ));
  }
}
