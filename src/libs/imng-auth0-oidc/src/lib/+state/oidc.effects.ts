import { Inject, Injectable } from '@angular/core';
import { Actions, ofType, OnInitEffects, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, filter, tap, switchMap } from 'rxjs/operators';
import { Config, OIDC_CONFIG } from '../models/config.model';
import { OidcService } from '../services/oidc.service';
import * as oidcActions from './oidc.actions';
import { IOidcUser } from '../models/oidc-user';
import { Router } from '@angular/router';
import { oidcLogoutRoute } from '../auth0-oidc-routing.module';

@Injectable({
  providedIn: 'root',
})
export class OidcEffects implements OnInitEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly oidcService: OidcService,
    @Inject(OIDC_CONFIG) private readonly config: Config,
    private readonly router: Router,
  ) {}

  getOidcUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.getOidcUser),
      switchMap(() =>
        this.oidcService.getOidcUser().pipe(
          map((userData: IOidcUser) => oidcActions.userFound(this.makeOidcUserSerializable(userData))),
          catchError((err) => of(oidcActions.userDoneLoadingError(err))),
        ),
      ),
    ),
  );

  silentRenew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.userFound),
      filter((userFound) => {
        const automaticSilentRenew =
          this.config.oidc_config.automaticSilentRenew != null && this.config.oidc_config.automaticSilentRenew;
        // user expired, initiate silent sign-in if configured to automatic
        return userFound.payload != null && userFound.payload.expired && automaticSilentRenew;
      }),
      map((userFound) => oidcActions.signInSilent(userFound.payload)),
    ),
  );

  removeOidcUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.removeOidcUser),
      concatMap(() =>
        this.oidcService.removeOidcUser().pipe(
          map(() => oidcActions.userDoneLoading()),
          catchError((err) => of(oidcActions.oidcError(err))),
        ),
      ),
    ),
  );

  userDoneLoadingNoMetadata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.userFound),
      filter(() => !this.config.getUserMetadata),
      map(() => oidcActions.userDoneLoading()),
    ),
  );

  userDoneLoadingWithMetadata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.userFound),
      filter(() => this.config.getUserMetadata),
      switchMap(() => this.oidcService.getUserMetadata()),
      map((metadata) => oidcActions.onUserMetadataLoaded(metadata)),
    ),
  );

  onAccessTokenExpired$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.onAccessTokenExpired),
      map(() => oidcActions.removeOidcUser()),
    ),
  );

  signInPopup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signInPopup),
      concatMap((args) =>
        this.oidcService.signInPopup(args.payload).pipe(
          map((user) => oidcActions.onSignInPopup(this.makeOidcUserSerializable(user))),
          catchError((err) => of(oidcActions.signInError(err))),
        ),
      ),
    ),
  );

  signInRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signInRedirect),
      concatMap((args) =>
        this.oidcService.signInRedirect(args.payload).pipe(
          concatMap(() => this.oidcService.signinRedirectCallback()),
          map((user) => oidcActions.onSignInRedirect(this.makeOidcUserSerializable(user))),
          catchError((err) => of(oidcActions.signInError(err))),
        ),
      ),
    ),
  );

  signInSilent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signInSilent),
      concatMap((args) =>
        this.oidcService.signInSilent(args.payload).pipe(
          map((user) => oidcActions.onSignInSilent(this.makeOidcUserSerializable(user))),
          catchError((err) => of(oidcActions.onSilentRenewError(err))),
        ),
      ),
    ),
  );

  signOutPopup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signOutPopup),
      concatMap((args) =>
        this.oidcService.signOutPopup(args.payload).pipe(
          map(() => oidcActions.onUserSignedOut()),
          catchError((err) => of(oidcActions.signOutPopupError(err.message))),
        ),
      ),
    ),
  );

  signOutRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signOutRedirect),
      concatMap((args) =>
        this.oidcService.signOutRedirect(args.payload).pipe(
          map(() => oidcActions.onUserSignedOut()),
          catchError((err) => of(oidcActions.signOutRedirectError(err.message))),
        ),
      ),
    ),
  );

  onUserSignedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(oidcActions.onUserSignedOut, oidcActions.signOutPopupError, oidcActions.signOutRedirectError),
        tap(() => {
          localStorage.clear();
          sessionStorage.clear();
          if (oidcLogoutRoute.path) {
            this.router.navigateByUrl(oidcLogoutRoute.path);
          }
        }),
      ),
    { dispatch: false },
  );

  ngrxOnInitEffects(): Action {
    return oidcActions.getOidcUser();
  }

  makeOidcUserSerializable(user: IOidcUser): IOidcUser {
    if (user.toStorageString) {
      user = {
        ...user,
        toStorageString: undefined,
      };
    }
    return user;
  }
}
