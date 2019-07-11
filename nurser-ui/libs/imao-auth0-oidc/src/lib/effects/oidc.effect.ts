import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { User as OidcUser } from 'oidc-client';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import {
  OidcActionTypes, GetOidcUser, UserFound, SigninSilent, UserDoneLoading, OidcError,
  OnUserLoaded, SigninPopup, SignInError, SigninRedirect, OnSilentRenewError, SignOutError,
  SignoutPopup, SignoutRedirect
} from '../actions/oidc.action';
import { Config, OIDC_CONFIG } from '../models/config.model';
import { ACTION_NO_ACTION } from '../models/constants';
import { OidcService } from '../services/oidc.service';

@Injectable()
export class OidcEffects {
  constructor(
    private actions$: Actions,
    @Inject(OidcService) private oidcService: OidcService,
    @Inject(OIDC_CONFIG) private config: Config
  ) { }

  @Effect()
  getOicdUser$ = this.actions$.pipe(
    ofType(OidcActionTypes.GetOidcUser),
    map((action: GetOidcUser) => action.payload),
    concatMap(args =>
      this.oidcService.getOidcUser().pipe(
        concatMap((userData: OidcUser) => {
          const r: Action[] = [new UserFound(this.makeOidcUserSerializable(userData))];
          const automaticSilentRenew =
            this.config.oidc_config.automaticSilentRenew != null && this.config.oidc_config.automaticSilentRenew;
          // user expired, initiate silent sign-in if configured to automatic
          if (userData != null && userData.expired === true && automaticSilentRenew === true) {
            r.push(new SigninSilent(args));
          }
          return r;
        }),
        catchError(error => {
          return of(new UserDoneLoading());
        })
      )
    )
  );
  @Effect()
  removeOidcUser$ = this.actions$.pipe(
    ofType(OidcActionTypes.RemoveOidcUser),
    concatMap(() => {
      return this.oidcService.removeOidcUser().pipe(
        concatMap(() => [new UserDoneLoading()]),
        catchError(error => [new OidcError(error)]) //
      );
    })
  );

  @Effect()
  userFound$ = this.actions$.pipe(
    ofType(OidcActionTypes.UserFound),
    concatMap(() => {
      return [new UserDoneLoading()];
    })
  );

  @Effect()
  onUserLoaded$: Observable<Action> = this.actions$.pipe(
    ofType(OidcActionTypes.OnUserLoaded),
    map((action: OnUserLoaded) => action.payload),
    switchMap((userData: OidcUser) => {
      return [new UserFound(this.makeOidcUserSerializable(userData))];
    })
  );

  @Effect()
  signInPopup$: Observable<Action> = this.actions$.pipe(
    ofType(OidcActionTypes.SignInPopup),
    map((action: SigninPopup) => action.payload),
    concatMap(args => {
      return this.oidcService.signInPopup(args).pipe(
        concatMap((user: OidcUser) => of({ type: ACTION_NO_ACTION })), // dispatch empty action
        catchError(error => of(new SignInError(error)))
      );
    })
  );

  @Effect()
  signInRedirect$: Observable<Action> = this.actions$.pipe(
    ofType(OidcActionTypes.SignInRedirect),
    map((action: SigninRedirect) => action.payload),
    concatMap(args => {
      return this.oidcService.signInRedirect(args).pipe(
        concatMap((user: OidcUser) => of({ type: ACTION_NO_ACTION })), // dispatch empty action
        catchError(error => of(new SignInError(error)))
      );
    })
  );

  @Effect()
  signInSilent$ = this.actions$.pipe(
    ofType(OidcActionTypes.SignInSilent),
    map((action: SigninSilent) => action.payload),
    concatMap(args => {
      return this.oidcService.signInSilent(args).pipe(
        concatMap((userData: OidcUser) => {
          return [new UserFound(this.makeOidcUserSerializable(userData))];
        }),
        catchError(error => {
          // Something went wrong renewing the access token.
          // Set loading done so the auth guard will resolve.
          return of(new OnSilentRenewError(error), new UserDoneLoading());
        })
      );
    })
  );

  @Effect()
  signOutPopup$: Observable<Action> = this.actions$.pipe(
    ofType(OidcActionTypes.SignOutPopup),
    map((action: SignoutPopup) => action.payload),
    concatMap(args => {
      return this.oidcService.signOutPopup(args).pipe(
        concatMap(() => of({ type: ACTION_NO_ACTION })), // dispatch empty action
        catchError(error => of(new SignOutError(error)))
      );
    })
  );

  @Effect()
  signOutRedirect$: Observable<Action> = this.actions$.pipe(
    ofType(OidcActionTypes.SignOutRedirect),
    map((action: SignoutRedirect) => action.payload),
    concatMap(args => {
      return this.oidcService.signOutRedirect(args).pipe(
        concatMap(() => of({ type: ACTION_NO_ACTION })), // dispatch empty action
        catchError(error => of(new SignOutError(error)))
      );
    })
  );

  makeOidcUserSerializable(user: OidcUser) {
    if (user.toStorageString) {
      user = {
        ...user,
        toStorageString: undefined
      };
    }
    return user;
  }
}
