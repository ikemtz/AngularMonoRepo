import { OidcService } from '../services/oidc.service';
import * as oidcActions from './oidc.actions';
import { IOidcUser } from '../models/oidc-user';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OnInitEffects, Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, map, filter, catchError, of, concatMap, tap } from 'rxjs';
import { oidcLogoutRoute } from '../img-oidc-client-routing.module';
import {
  OIDC_LIBRARY_CONFIG,
  OidcLibraryConfig,
} from '../models/oidc-library-config';

@Injectable({
  providedIn: 'root',
})
export class OidcEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly oidcService = inject(OidcService);
  private readonly oidcLibraryOptions =
    inject<OidcLibraryConfig>(OIDC_LIBRARY_CONFIG);
  private readonly router = inject(Router);

  getOidcUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(oidcActions.getOidcUser),
      switchMap(() =>
        this.oidcService.getOidcUser().pipe(
          map((userData: IOidcUser | null) =>
            this.makeOidcUserSerializable(userData),
          ),
          filter((userData: IOidcUser) => !!userData),
          map((userData: IOidcUser) => oidcActions.userFound(userData)),
          catchError((err) => of(oidcActions.userDoneLoadingError(err))),
        ),
      ),
    );
  });

  silentRenew$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(oidcActions.userFound),
      filter(
        (userFound: { payload: IOidcUser }) =>
          // user expired, initiate silent sign-in if configured to automatic
          (userFound.payload != null &&
            userFound.payload.expired &&
            this.oidcLibraryOptions.oidc_config?.automaticSilentRenew) ||
          false,
      ),
      map((userFound) => oidcActions.signInSilent(userFound.payload)),
    );
  });

  removeOidcUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(oidcActions.removeOidcUser),
      concatMap(() =>
        this.oidcService.removeOidcUser().pipe(
          map(() => oidcActions.userDoneLoading()),
          catchError((err) => of(oidcActions.oidcError(err))),
        ),
      ),
    );
  });

  userDoneLoadingNoMetadata$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(oidcActions.userFound),
      filter(() => !this.oidcLibraryOptions.getUserMetadata),
      map(() => oidcActions.userDoneLoading()),
    );
  });

  userDoneLoadingWithMetadata$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(oidcActions.userFound),
      filter(() => this.oidcLibraryOptions.getUserMetadata || false),
      switchMap(() => this.oidcService.getUserMetadata()),
      map((metadata) => oidcActions.onUserMetadataLoaded(metadata)),
    );
  });

  onAccessTokenExpired$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(oidcActions.onAccessTokenExpired),
      map(() => oidcActions.removeOidcUser()),
    );
  });

  signInPopup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(oidcActions.signInPopup),
      concatMap((args) =>
        this.oidcService.signInPopup(args.payload).pipe(
          map((user) =>
            oidcActions.onSignInPopup(this.makeOidcUserSerializable(user)),
          ),
          catchError((err) => of(oidcActions.signInError(err))),
        ),
      ),
    );
  });

  signInRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(oidcActions.signInRedirect),
      concatMap((args) =>
        this.oidcService.signInRedirect(args.payload).pipe(
          concatMap(() => this.oidcService.signinRedirectCallback()),
          map((user) =>
            oidcActions.onSignInRedirect(this.makeOidcUserSerializable(user)),
          ),
          catchError((err) => of(oidcActions.signInError(err))),
        ),
      ),
    );
  });

  signInSilent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(oidcActions.signInSilent),
      concatMap((args) =>
        this.oidcService.signInSilent(args.payload).pipe(
          map((user) =>
            oidcActions.onSignInSilent(this.makeOidcUserSerializable(user)),
          ),
          catchError((err) => of(oidcActions.onSilentRenewError(err))),
        ),
      ),
    );
  });

  signOutPopup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(oidcActions.signOutPopup),
      concatMap((args) =>
        this.oidcService.signOutPopup(args.payload).pipe(
          map(() => oidcActions.onUserSignedOut()),
          catchError((err) => of(oidcActions.signOutPopupError(err.message))),
        ),
      ),
    );
  });

  signOutRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(oidcActions.signOutRedirect),
      concatMap((args) =>
        this.oidcService.signOutRedirect(args.payload).pipe(
          map(() => oidcActions.onUserSignedOut()),
          catchError((err) =>
            of(oidcActions.signOutRedirectError(err.message)),
          ),
        ),
      ),
    );
  });

  onUserSignedOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          oidcActions.onUserSignedOut,
          oidcActions.signOutPopupError,
          oidcActions.signOutRedirectError,
        ),
        tap(() => {
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigateByUrl(oidcLogoutRoute.path ?? '');
        }),
      );
    },
    { dispatch: false },
  );

  ngrxOnInitEffects(): Action {
    return oidcActions.getOidcUser();
  }

  makeOidcUserSerializable(user: IOidcUser | null): IOidcUser {
    if (user?.toStorageString) {
      user = {
        ...user,
        toStorageString: undefined,
      };
    }
    return user as IOidcUser;
  }
}
