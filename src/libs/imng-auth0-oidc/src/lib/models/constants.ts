export enum OidcEvent {
  AccessTokenExpired = 'addAccessTokenExpired',
  AccessTokenExpiring = 'addAccessTokenExpiring',
  SilentRenewError = 'AddSilentRenewError',
  UserLoaded = 'addUserLoaded',
  UserUnloaded = 'addUserUnloaded',
  UserSignedOut = 'addUserSignedOut',
  UserSessionChanged = 'addUserSessionChanged'
}

export enum StorageKeys {
  PopupCallback = 'ngoidc:isPopupCallback',
  OidcSettings = 'ngoidc:settings',
}

export const ACTION_NO_ACTION = 'NO_ACTION';
