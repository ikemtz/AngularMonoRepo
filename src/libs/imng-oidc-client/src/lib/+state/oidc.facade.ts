/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  OidcClient,
  SigninRequest,
  SignoutRequest,
  UserManager,
} from 'oidc-client';
import { Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { oidcSelectors } from './oidc.selectors';
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
  private readonly store = inject(Store);
  private readonly oidcService = inject(OidcService);

  constructor() {
    this.registerDefaultEvents();
  }

  loading$: Observable<boolean> = this.store.select(
    oidcSelectors.selectIsLoading,
  );
  expiring$: Observable<boolean> = this.store.select(
    oidcSelectors.selectIsExpiring,
  );
  expired$: Observable<boolean> = this.store.select(
    oidcSelectors.selectIsExpired,
  );
  loggedIn$: Observable<boolean> = this.store.select(
    oidcSelectors.selectIsLoggedIn,
  );
  identity$: Observable<IOidcUser | undefined> = this.store.select(
    oidcSelectors.selectIdentity,
  );
  accessToken$: Observable<string | undefined> = this.store.select(
    oidcSelectors.selectAccessToken,
  );
  httpError$: Observable<HttpErrorResponse | undefined> = this.store.select(
    oidcSelectors.selectHttpError,
  );
  signInError$: Observable<unknown> = this.store.select(
    oidcSelectors.selectSignInError,
  );
  silentRenewError$: Observable<unknown> = this.store.select(
    oidcSelectors.selectSilentRenewError,
  );
  hasErrors$: Observable<boolean> = this.store.select(
    oidcSelectors.selectHasErrors,
  );
  permissions$: Observable<string[] | undefined> = this.store.select(
    oidcSelectors.selectPermissions,
  );
  audiences$: Observable<string[] | null | undefined> = this.store.select(
    oidcSelectors.selectAudiences,
  );
  expiresAt$: Observable<Date | null> = this.store.select(
    oidcSelectors.selectExpiresAt,
  );
  userMetadata$: Observable<unknown> = this.store.select(
    oidcSelectors.selectUserMetadata,
  );

  // default bindings to events
  public addUserUnLoaded(): void {
    this.store?.dispatch(oidcActions.onUserUnloaded());
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

  public addSilentRenewError(...ev: unknown[]): void {
    this.store.dispatch(oidcActions.onSilentRenewError(ev[0] as Error));
  }

  public addUserLoaded(...ev: unknown[]): void {
    this.store.dispatch(oidcActions.onUserLoaded(ev[0] as IOidcUser));
  }

  public addUserSignedOut(): void {
    this.oidcService.removeOidcUser();
    this.store.dispatch(oidcActions.onUserSignedOut());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addUserSessionChanged(): void {
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
   * Convenient function to wait for OIDC dependencies to be loaded.
   */
  public waitForAuthenticationLoaded(): Observable<boolean> {
    return this.loading$.pipe(
      filter((loading) => loading === false),
      take(1),
      map(() => true),
    );
  }

  public signinPopup(args: RequestArugments): void {
    this.store.dispatch(oidcActions.signInPopup(args));
  }

  public signinRedirect(args?: RequestArugments): void {
    this.store.dispatch(oidcActions.signInRedirect(args));
  }

  public signinSilent(args: RequestArugments): void {
    this.store.dispatch(oidcActions.signInSilent(args));
  }

  public signoutPopup(args: RequestArugments): void {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerEvent(event: OidcEvent, callback: (...ev: unknown[]) => void): void {
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
    this.registerEvent(
      OidcEvent.UserSessionChanged,
      this.addUserSessionChanged,
    );
  }
}
