import { Component, OnInit } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { OidcFacade } from 'imng-auth0-oidc';

@Component({
  selector: 'nrcrn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public readonly year: number;
  public readonly buildNumber: string;
  public loggedIn$: Observable<boolean>;

  constructor(private readonly oidcFacade: OidcFacade) {
    this.year = new Date().getFullYear();
    this.buildNumber = environment.version;
  }
  ngOnInit(): void {
    this.loggedIn$ = this.oidcFacade.loggedIn$;
  }
}
