import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getEmail, getProfile, getProfilePicture } from './auth0-selectors';
import { OidcState } from './reducers/oidc.reducer';
import { Auth0Profile } from './auth0-profile';

@Injectable({
  providedIn: 'root'
})
export class Auth0Facade {
  constructor(private store: Store<OidcState>) { }
  profile$: Observable<Auth0Profile> = this.store.select(getProfile);
  email$: Observable<string> = this.store.select(getEmail);
  profilePicture$: Observable<string> = this.store.select(getProfilePicture);
}  