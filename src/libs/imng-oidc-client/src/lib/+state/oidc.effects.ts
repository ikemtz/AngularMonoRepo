import { Inject, Injectable } from '@angular/core';
import { Actions, ofType, OnInitEffects, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  filter,
  tap,
  switchMap,
} from 'rxjs/operators';
import { OidcService } from '../services/oidc.service';
import * as oidcActions from './oidc.actions';
import { IOidcUser } from '../models/oidc-user';
import { Router } from '@angular/router';
import { oidcLogoutRoute } from '../img-oidc-client-routing.module';
import {
  OidcLibraryConfig,
  OIDC_LIBRARY_CONFIG,
} from '../models/oidc-library-config';

@Injectable({
  providedIn: 'root',
})
export class OidcEffects implements OnInitEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly oidcService: OidcService,
    @Inject(OIDC_LIBRARY_CONFIG)
    private readonly oidcLibraryOptions: OidcLibraryConfig,
    private readonly router: Router
  ) {}

  getOidcUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.getOidcUser),
      switchMap(() =>
        this.oidcService.getOidcUser().pipe(
          map((userData: IOidcUser | null) =>
            this.makeOidcUserSerializable(userData)
          ),
          filter((userData: IOidcUser) => !!userData),
          map((userData: IOidcUser) => oidcActions.userFound(userData)),
          catchError((err) => of(oidcActions.userDoneLoadingError(err)))
        )
      )
    )
  );

  silentRenew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.userFound),
      filter(
        (userFound: { payload: IOidcUser }) =>
          // user expired, initiate silent sign-in if configured to automatic
          (userFound.payload != null &&
            userFound.payload.expired &&
            this.oidcLibraryOptions.oidc_config?.automaticSilentRenew) ||
          false
      ),
      map((userFound) => oidcActions.signInSilent(userFound.payload))
    )
  );

  removeOidcUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.removeOidcUser),
      concatMap(() =>
        this.oidcService.removeOidcUser().pipe(
          map(() => oidcActions.userDoneLoading()),
          catchError((err) => of(oidcActions.oidcError(err)))
        )
      )
    )
  );

  userDoneLoadingNoMetadata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.userFound),
      filter(() => !this.oidcLibraryOptions.getUserMetadata),
      map(() => oidcActions.userDoneLoading())
    )
  );

  userDoneLoadingWithMetadata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.userFound),
      filter(() => this.oidcLibraryOptions.getUserMetadata || false),
      switchMap(() => this.oidcService.getUserMetadata()),
      map((metadata) => oidcActions.onUserMetadataLoaded(metadata))
    )
  );

  onAccessTokenExpired$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.onAccessTokenExpired),
      map(() => oidcActions.removeOidcUser())
    )
  );

  signInPopup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signInPopup),
      concatMap((args) =>
        this.oidcService.signInPopup(args.payload).pipe(
          map((user) =>
            oidcActions.onSignInPopup(this.makeOidcUserSerializable(user))
          ),
          catchError((err) => of(oidcActions.signInError(err)))
        )
      )
    )
  );

  signInRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signInRedirect),
      concatMap((args) =>
        this.oidcService.signInRedirect(args.payload).pipe(
          concatMap(() => this.oidcService.signinRedirectCallback()),
          map((user) =>
            oidcActions.onSignInRedirect(this.makeOidcUserSerializable(user))
          ),
          catchError((err) => of(oidcActions.signInError(err)))
        )
      )
    )
  );

  signInSilent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signInSilent),
      concatMap((args) =>
        this.oidcService.signInSilent(args.payload).pipe(
          map((user) =>
            oidcActions.onSignInSilent(this.makeOidcUserSerializable(user))
          ),
          catchError((err) => of(oidcActions.onSilentRenewError(err)))
        )
      )
    )
  );

  signOutPopup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signOutPopup),
      concatMap((args) =>
        this.oidcService.signOutPopup(args.payload).pipe(
          map(() => oidcActions.onUserSignedOut()),
          catchError((err) => of(oidcActions.signOutPopupError(err.message)))
        )
      )
    )
  );

  signOutRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signOutRedirect),
      concatMap((args) =>
        this.oidcService.signOutRedirect(args.payload).pipe(
          map(() => oidcActions.onUserSignedOut()),
          catchError((err) => of(oidcActions.signOutRedirectError(err.message)))
        )
      )
    )
  );

  onUserSignedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          oidcActions.onUserSignedOut,
          oidcActions.signOutPopupError,
          oidcActions.signOutRedirectError
        ),
        tap(() => {
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigateByUrl(oidcLogoutRoute.path || '');
        })
      ),
    { dispatch: false }
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