import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OidcUserSelectors } from './oidc-user.selectors';
import { OidcState } from './oidc.reducer';
import { OidcUserProfile } from '../models/oidc-user-profile';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OidcUserFacade {
  constructor(private readonly store: Store<OidcState>) {}
  profile$: Observable<OidcUserProfile> = this.store.select(
    OidcUserSelectors.getProfile
  );
  email$: Observable<string | undefined> = this.store.select(
    OidcUserSelectors.getEmail
  );
  profilePicture$: Observable<string | undefined> = this.store.select(
    OidcUserSelectors.getProfilePicture
  );
  permissions$: Observable<string[] | undefined> = this.store.select(
    OidcUserSelectors.getPermissions
  );

  public hasPermissions(
    requiredPermissions: Array<string>
  ): Observable<boolean> {
    return this.permissions$.pipe(
      map(
        (t) =>
          -1 <
          requiredPermissions.findIndex(
            (f) => -1 < (t?.findIndex((i) => i === f) || -1)
          )
      )
    );
  }
}
