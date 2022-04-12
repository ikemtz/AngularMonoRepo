/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  Log,
  OidcClient,
  SigninRequest,
  SignoutRequest,
  UserManager,
  UserManagerSettings,
} from 'oidc-client';
import { from, Observable } from 'rxjs';
import { OidcEvent, StorageKeys } from '../models/constants';
import { IOidcUser } from '../models/oidc-user';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  OidcLibraryConfig,
  OIDC_LIBRARY_CONFIG,
} from '../models/oidc-library-config';

@Injectable({
  providedIn: 'root',
})
export class OidcService {
  public readonly OidcUserManager: UserManager;
  private readonly _oidcClient: OidcClient;
  private readonly _userManagerSettings: UserManagerSettings;

  constructor(
    @Inject(OIDC_LIBRARY_CONFIG)
    private readonly oidcLibraryConfig: OidcLibraryConfig,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly httpClient: HttpClient
  ) {
    const logSettings = this.oidcLibraryConfig.log;
    let clientSettings = this.oidcLibraryConfig.oidc_config;

    if (logSettings) {
      Log.level = logSettings.level;
      Log.logger = logSettings.logger;
    }

    if (clientSettings?.userStore != null) {
      clientSettings = {
        ...clientSettings,
        userStore: clientSettings.userStore,
      };
    }
    this._userManagerSettings = { ...clientSettings };
    this.OidcUserManager = new UserManager(clientSettings);
    this._oidcClient = new OidcClient(clientSettings);
  }

  public getUserMetadata(): Observable<unknown> {
    return this.httpClient
      .get<{ userinfo_endpoint: string; }>(
        this.oidcLibraryConfig.oidc_config?.metadataUrl || ''
      )
      .pipe(
        switchMap((openidConfig) =>
          this.httpClient.get<unknown>(openidConfig.userinfo_endpoint)
        )
      );
  }

  getUserManager(): UserManager {
    return this.OidcUserManager;
  }

  getOidcClient(): OidcClient {
    return this._oidcClient;
  }

  getOidcUser(): Observable<IOidcUser | null> {
    return from(this.OidcUserManager.getUser());
  }

  removeOidcUser(): Observable<void> {
    return from(this.OidcUserManager.removeUser());
  }

  registerOidcEvent(
    event: OidcEvent,
    callback: (...ev: unknown[]) => void
  ): void {
    switch (event) {
      case OidcEvent.AccessTokenExpired:
        this.OidcUserManager.events.addAccessTokenExpired(callback);
        break;
      case OidcEvent.AccessTokenExpiring:
        this.OidcUserManager.events.addAccessTokenExpiring(callback);
        break;
      case OidcEvent.SilentRenewError:
        this.OidcUserManager.events.addSilentRenewError(callback);
        break;
      case OidcEvent.UserLoaded:
        this.OidcUserManager.events.addUserLoaded(callback);
        break;
      case OidcEvent.UserSessionChanged:
        this.OidcUserManager.events.addUserSessionChanged(callback);
        break;
      case OidcEvent.UserSignedOut:
        this.OidcUserManager.events.addUserSignedOut(callback);
        break;
      case OidcEvent.UserUnloaded:
        this.OidcUserManager.events.addUserUnloaded(callback);
        break;
      default:
        break;
    }
  }

  removeOidcEvent(
    event: OidcEvent,
    callback: (...ev: unknown[]) => void
  ): void {
    switch (event) {
      case OidcEvent.AccessTokenExpired:
        this.OidcUserManager.events.removeAccessTokenExpired(callback);
        break;
      case OidcEvent.AccessTokenExpiring:
        this.OidcUserManager.events.removeAccessTokenExpiring(callback);
        break;
      case OidcEvent.SilentRenewError:
        this.OidcUserManager.events.removeSilentRenewError(callback);
        break;
      case OidcEvent.UserLoaded:
        this.OidcUserManager.events.removeUserLoaded(callback);
        break;
      case OidcEvent.UserSessionChanged:
        this.OidcUserManager.events.removeUserSessionChanged(callback);
        break;
      case OidcEvent.UserSignedOut:
        this.OidcUserManager.events.removeUserSignedOut(callback);
        break;
      case OidcEvent.UserUnloaded:
        this.OidcUserManager.events.removeUserUnloaded(callback);
        break;
      default:
        break;
    }
  }

  signInPopup(args?: any): Observable<IOidcUser> { //NOSONAR
    this.setCallbackInformation(true);

    return from(this.OidcUserManager.signinPopup({ ...args }));
  }

  signInRedirect(args?: any): Observable<void> { //NOSONAR
    this.setCallbackInformation(false);

    return from(this.OidcUserManager.signinRedirect({ ...args }));
  }

  signOutPopup(args?: any): Observable<any> { //NOSONAR
    this.setCallbackInformation(true);

    return from(this.OidcUserManager.signoutPopup({ ...args }));
  }

  signOutRedirect(args?: any): Observable<any> { //NOSONAR
    this.setCallbackInformation(false);
    return from(this.OidcUserManager.signoutRedirect({ ...args }));
  }

  signInSilent(args?: any): Observable<IOidcUser> { //NOSONAR
    return from(this.OidcUserManager.signinSilent({ ...args }));
  }

  signinPopupCallback(): Observable<any> { //NOSONAR
    return from(this.OidcUserManager.signinPopupCallback());
  }

  signinRedirectCallback(): Observable<IOidcUser> {
    return from(this.OidcUserManager.signinRedirectCallback());
  }

  signoutPopupCallback(): Observable<void> {
    return from(this.OidcUserManager.signoutPopupCallback());
  }

  signoutRedirectCallback(): Observable<any> { //NOSONAR
    return from(this.OidcUserManager.signoutRedirectCallback());
  }

  getSigninUrl(args?: any): Observable<SigninRequest> { //NOSONAR
    return from(this.OidcUserManager.createSigninRequest(args));
  }

  getSignoutUrl(args?: any): Observable<SignoutRequest> { //NOSONAR
    return from(this.OidcUserManager.createSignoutRequest(args));
  }

  private setCallbackInformation(isPopupCallback: boolean): void {
    // is browser and useCallbackFlag set to true or defaults to true
    if (
      isPlatformBrowser(this.platformId) &&
      this.oidcLibraryConfig.useCallbackFlag
    ) {
      localStorage.setItem(StorageKeys.PopupCallback, `${isPopupCallback}`);
      localStorage.setItem(
        StorageKeys.OidcSettings,
        JSON.stringify(this._userManagerSettings)
      );
    }
  }
}
