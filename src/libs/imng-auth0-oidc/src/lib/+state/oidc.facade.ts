import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OidcClient, SigninRequest, SignoutRequest, User as OidcUser, UserManager } from 'oidc-client';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { OidcState } from './oidc.reducer';
import { oidcQuery } from './oidc.selectors';
import { OidcService } from '../services/oidc.service';
import { RequestArugments } from '../models/arguments.model';
import { OidcEvent } from '../models/constants';
import * as oidcActions from './oidc.action';
import { HttpErrorResponse } from '@angular/common/http';
import { IOidcUser } from '../models/i-oidc-user';

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
  profile$: Observable<{ key: string; value: string; }[]> = this.store.select(oidcQuery.getProfile);

  // default bindings to events
  public addUserUnLoaded(): void {
    this.store.dispatch(oidcActions.onUserUnloaded());
  }

  public accessTokenExpired(e): void {
    this.store.dispatch(oidcActions.onAccessTokenExpired());
  };

  public accessTokenExpiring(): void {
    this.store.dispatch(oidcActions.onAccessTokenExpiring());
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

  public getOidcUser(args?: any): void {
    this.store.dispatch(oidcActions.getOidcUser(args));
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
    );
  }

  public signinPopup(args?: RequestArugments): void {
    this.store.dispatch(oidcActions.signinPopup(args));
  }

  public signinRedirect(args?: RequestArugments): void {
    this.store.dispatch(oidcActions.signinRedirect(args));
  }

  public signinSilent(args?: RequestArugments): void {
    this.store.dispatch(oidcActions.signinSilent(args));
  }

  public signoutPopup(args?: RequestArugments): void {
    this.store.dispatch(oidcActions.signoutPopup(args));
  }

  public signoutRedirect(args?: RequestArugments): void {
    this.store.dispatch(oidcActions.signoutRedirect(args));
  }

  public getSigninUtrl(args?: RequestArugments): Observable<SigninRequest> {
    return this.oidcService.getSigninUrl(args);
  }

  getSignoutUrl(args?: RequestArugments): Observable<SignoutRequest> {
    return this.oidcService.getSignoutUrl(args);
  }

  registerEvent(event: OidcEvent, callback: (...ev: any[]) => void): void {
    this.oidcService.registerOidcEvent(event, callback);
  }

  private registerDefaultEvents() {
    // add simple loggers
    this.oidcService.registerOidcEvent(OidcEvent.AccessTokenExpired, this.accessTokenExpired);
    this.oidcService.registerOidcEvent(OidcEvent.AccessTokenExpiring, this.accessTokenExpiring);
    this.oidcService.registerOidcEvent(OidcEvent.SilentRenewError, this.addSilentRenewError);

    this.oidcService.registerOidcEvent(OidcEvent.UserLoaded, this.addUserLoaded);
    this.oidcService.registerOidcEvent(OidcEvent.UserUnloaded, this.addUserUnLoaded);
    this.oidcService.registerOidcEvent(OidcEvent.UserSignedOut, this.addUserSignedOut);
    this.oidcService.registerOidcEvent(OidcEvent.UserSessionChanged, this.addUserSessionChanged);
  }
}
