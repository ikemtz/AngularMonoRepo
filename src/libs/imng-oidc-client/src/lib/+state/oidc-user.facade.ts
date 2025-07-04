import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { oidcUserSelectors } from './oidc-user.selectors';
import { OidcUserProfile } from '../models/oidc-user-profile';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OidcUserFacade {
  private readonly store = inject(Store);

  profile$: Observable<OidcUserProfile> = this.store.select(
    oidcUserSelectors.getProfile,
  );
  scopes$: Observable<string[] | undefined> = this.store.select(
    oidcUserSelectors.getScopes,
  );
  email$: Observable<string | undefined> = this.store.select(
    oidcUserSelectors.getEmail,
  );
  profilePicture$: Observable<string | undefined> = this.store.select(
    oidcUserSelectors.getProfilePicture,
  );
  permissions$: Observable<string[] | undefined> = this.store.select(
    oidcUserSelectors.getPermissions,
  );

  public hasPermissions(
    requiredPermissions: Array<string>,
  ): Observable<boolean> {
    return this.permissions$.pipe(
      map(
        (t) =>
          -1 <
          requiredPermissions.findIndex(
            (f) => -1 < (t?.findIndex((i) => i === f) ?? -1),
          ),
      ),
    );
  }
}
