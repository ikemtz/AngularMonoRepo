import { Inject, Injectable } from '@angular/core';
import { Actions, ofType, OnInitEffects, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, filter } from 'rxjs/operators';
import { Config, OIDC_CONFIG } from '../models/config.model';
import { OidcService } from '../services/oidc.service';
import { oidcActions } from './oidc.action';
import { IOidcUser } from '../models/i-oidc-user';

@Injectable({
  providedIn: 'root',
})
export class OidcEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private oidcService: OidcService,
    @Inject(OIDC_CONFIG) private config: Config,
  ) {}

  getOicdUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.getOidcUser),
      concatMap(args =>
        this.oidcService.getOidcUser().pipe(
          map((userData: IOidcUser) => oidcActions.userFound({ payload: this.makeOidcUserSerializable(userData) })),
          catchError(err => of(oidcActions.userDoneLoadingError(err))),
        ),
      ),
    ),
  );

  silentRenew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.userFound),
      filter(userFound => {
        const automaticSilentRenew =
          this.config.oidc_config.automaticSilentRenew != null && this.config.oidc_config.automaticSilentRenew;
        // user expired, initiate silent sign-in if configured to automatic
        return userFound.payload != null && userFound.payload.expired && automaticSilentRenew;
      }),
      map(userFound => oidcActions.signinSilent({ payload: userFound.payload })),
    ),
  );

  removeOidcUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.removeOidcUser),
      concatMap(() =>
        this.oidcService.removeOidcUser().pipe(
          map(() => oidcActions.userDoneLoading()),
          catchError(err => of(oidcActions.oidcError(err))),
        ),
      ),
    ),
  );

  userFound$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.userFound),
      map(() => oidcActions.userDoneLoading()),
    ),
  );

  onAccessTokenExpired$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.onAccessTokenExpired),
      map(() => oidcActions.removeOidcUser()),
    ),
  );

  onUserLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.onUserLoaded),
      map(userData => oidcActions.userFound({ payload: this.makeOidcUserSerializable(userData.payload) })),
    ),
  );

  signInPopup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signinPopup),
      concatMap(args =>
        this.oidcService.signInPopup(args.payload).pipe(
          map(user => oidcActions.userFound({ payload: this.makeOidcUserSerializable(user) })),
          catchError(err => of(oidcActions.signInError(err))),
        ),
      ),
    ),
  );

  signInRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signinRedirect),
      concatMap(args =>
        this.oidcService.signInRedirect(args.payload).pipe(
          concatMap(() => this.oidcService.signinRedirectCallback()),
          map(user => oidcActions.userFound({ payload: this.makeOidcUserSerializable(user) })),
          catchError(err => of(oidcActions.signInError(err))),
        ),
      ),
    ),
  );

  signInSilent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signinSilent),
      concatMap(args =>
        this.oidcService.signInSilent(args.payload).pipe(
          map(user => oidcActions.userFound({ payload: this.makeOidcUserSerializable(user) })),
          catchError(err => of(oidcActions.onSilentRenewError(err))),
        ),
      ),
    ),
  );

  signOutPopup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signoutPopup),
      concatMap(args =>
        this.oidcService.signOutPopup(args.payload).pipe(
          map(user => oidcActions.userDoneLoading()),
          catchError(err => of(oidcActions.signOutError(err))),
        ),
      ),
    ),
  );

  signOutRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(oidcActions.signoutRedirect),
      concatMap(args =>
        this.oidcService.signOutRedirect(args.payload).pipe(
          map(user => oidcActions.userDoneLoading()),
          catchError(err => of(oidcActions.signOutError(err))),
        ),
      ),
    ),
  );

  ngrxOnInitEffects(): Action {
    return oidcActions.getOidcUser({ payload: {} });
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
