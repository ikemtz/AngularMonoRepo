import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getEmail, getProfile } from './auth0-selectors';
import { OidcState } from './reducers';

@Injectable({
  providedIn: 'root'
})
export class Auth0Facade {
  constructor(private store: Store<OidcState>) { }
  profile$: Observable<{ email: string }> = this.store.select(getProfile);
  email$: Observable<string> = this.store.select(getEmail);
}  