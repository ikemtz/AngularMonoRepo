import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { auth0Query} from './auth0.selectors';
import { OidcState } from './oidc.reducer';
import { Auth0Profile } from '../models/auth0-profile';

@Injectable({
  providedIn: 'root'
})
export class Auth0Facade {
  constructor(private store: Store<OidcState>) { }
  profile$: Observable<Auth0Profile> = this.store.select(auth0Query.getProfile);
  email$: Observable<string> = this.store.select(auth0Query.getEmail);
  profilePicture$: Observable<string> = this.store.select(auth0Query.getProfilePicture);
}  