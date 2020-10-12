import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OidcClient, SigninRequest, SignoutRequest, User as OidcUser, UserManager } from 'oidc-client';
import { Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { OidcState } from './oidc.reducer';
import { oidcQuery } from './oidc.selectors';
import { OidcService } from '../services/oidc.service';
import { RequestArugments } from '../models/arguments.model';
import { OidcEvent } from '../models/constants';
import * as oidcActions from './oidc.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IOidcUser } from '../models/oidc-user';

@Injectable({
  providedIn: 'root',
})
export class OidcFacade {
  constructor(private readonly store: Store<OidcState>, private readonly oidcService: OidcService) {
    this.registerDefaultEvents();
  }

  loading$: Observable<boolean> = this.store.select(oidcQuery.getOidcLoading);
  expiring$: Observable<boolean> = this.store.select(oidcQuery.isIdentityExpiring);
  expired$: Observable<boolean> = this.store.select(oidcQuery.isIdentityExpired);
  loggedIn$: Observable<boolean> = this.store.select(oidcQuery.isLoggedIn);
  identity$: Observable<IOidcUser> = this.store.select(oidcQuery.getOidcIdentity);
  accessToken$: Observable<string> = this.store.select(oidcQuery.getAccessToken);
  httpError$: Observable<HttpErrorResponse> = this.store.select(oidcQuery.getHttpError);
  signInError$: Observable<any> = this.store.select(oidcQuery.getSignInError);
  silentRenewError$: Observable<any> = this.store.select(oidcQuery.getSilentRenewError);
  hasErrors$: Observable<boolean> = this.store.select(oidcQuery.hasErrors);
  permissions$: Observable<string[]> = this.store.select(oidcQuery.getPermissions);
  audiences$: Observable<string[]> = this.store.select(oidcQuery.getAudiences);
  expiresAt$: Observable<Date> = this.store.select(oidcQuery.getExpiresAt);
  userMetadata$: Observable<unknown> = this.store.select(oidcQuery.getUserMetadata);

  // default bindings to events
  public addUserUnLoaded(): void {
    if (this.store) {
      this.store.dispatch(oidcActions.onUserUnloaded());
    }
  }

  public accessTokenExpired(): void {
    if (this.store) {
      this.store.dispatch(oidcActions.onAccessTokenExpired());
    } else {
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
    }
  }

  public accessTokenExpiring(): void {
    if (this.store) {
      this.store.dispatch(oidcActions.onAccessTokenExpiring());
    } else {
      this.accessTokenExpired();
    }
  }

  public addSilentRenewError(e): void {
    this.store.dispatch(oidcActions.onSilentRenewError(e));
  }

  public addUserLoaded(loadedUser: OidcUser): void {
    this.store.dispatch(oidcActions.onUserLoaded(loadedUser));
  }

  public addUserSignedOut(): void {
    this.oidcService.removeOidcUser();
    this.store.dispatch(oidcActions.onUserSignedOut());
  }

  public addUserSessionChanged(e): void {
    this.store.dispatch(oidcActions.onSessionChanged());
  }

  public clearErrors(): void {
    this.store.dispatch(oidcActions.clearErrors());
  }

  // OIDC Methods

  public getOidcUser(): void {
    this.store.dispatch(oidcActions.getOidcUser());
  }

  public removeOidcUser(): void {
    this.store.dispatch(oidcActions.removeOidcUser());
  }

  public getUserManager(): UserManager {
    return this.oidcService.getUserManager();
  }

  public getOidcClient(): OidcClient {
    return this.oidcService.getOidcClient();
  }

  /**
   * Convenient function to wait for loaded.
   */
  public waitForAuthenticationLoaded(): Observable<boolean> {
    return this.loading$.pipe(
      filter(loading => loading === false),
      take(1),
      map(() => true)
    );
  }

  public signinPopup(args?: RequestArugments): void {
    this.store.dispatch(oidcActions.signInPopup(args));
  }

  public signinRedirect(args?: RequestArugments): void {
    this.store.dispatch(oidcActions.signInRedirect(args));
  }

  public signinSilent(args?: RequestArugments): void {
    this.store.dispatch(oidcActions.signInSilent(args));
  }

  public signoutPopup(args?: RequestArugments): void {
    this.store.dispatch(oidcActions.signOutPopup(args));
  }

  public signoutRedirect(args?: RequestArugments): void {
    this.store.dispatch(oidcActions.signOutRedirect(args));
  }

  public getSigninUrl(args?: RequestArugments): Observable<SigninRequest> {
    return this.oidcService.getSigninUrl(args);
  }

  getSignoutUrl(args?: RequestArugments): Observable<SignoutRequest> {
    return this.oidcService.getSignoutUrl(args);
  }

  registerEvent(event: OidcEvent, callback: (...ev: any[]) => void): void {
    this.oidcService.registerOidcEvent(event, callback);
  }

  private registerDefaultEvents(): void {
    // add simple loggers
    this.registerEvent(OidcEvent.AccessTokenExpired, this.accessTokenExpired);
    this.registerEvent(OidcEvent.AccessTokenExpiring, this.accessTokenExpiring);
    this.registerEvent(OidcEvent.SilentRenewError, this.addSilentRenewError);

    this.registerEvent(OidcEvent.UserLoaded, this.addUserLoaded);
    this.registerEvent(OidcEvent.UserUnloaded, this.addUserUnLoaded);
    this.registerEvent(OidcEvent.UserSignedOut, this.addUserSignedOut);
    this.registerEvent(OidcEvent.UserSessionChanged, this.addUserSessionChanged);
  }
}
