import { createAction, props } from '@ngrx/store';
import { User as OidcUser } from 'oidc-client';
import { RequestArugments } from '../models/arguments.model';

export enum OidcActionTypes {
  GetOidcUser = '[Oidc] get oidc user',
  RemoveOidcUser = '[Oidc] remove oidc user',

  UserExpired = '[Oidc] user expired',
  UserFound = '[Oidc] user found',

  OnAccessTokenExpired = '[Oidc] on access token expired',
  OnAccessTokenExpiring = '[Oidc] user expiring',
  OnSilentRenewError = '[Oidc] on silent renew error',
  OnUserLoaded = '[Oidc] on user loaded',
  OnUserUnloaded = '[Oidc] on user unloaded',
  OnUserloadError = '[Oidc] user load error',
  OnUserSignedOut = '[Oidc] on user signed out',
  OnSessionChanged = '[Oidc] session changed',

  UserLoading = '[Oidc] user loading',
  UserDoneLoading = '[Oidc] user done loading',
  UserDoneLoadingError = '[Oidc] user done loading error',

  // Sign In
  SignInPopup = '[Oidc] sign in popup',
  SignInRedirect = '[Oidc] sign in redirect',
  SignInSilent = '[Oidc] sign in silent',
  SignInError = '[Oidc] sign in popup error',

  // Sign Out
  SignOutPopup = '[Oidc] sign out popup',
  SignOutRedirect = '[Oidc] sign out redirect',
  SignOutError = '[Oidc] sign out popup error',

  OidcError = '[Oidc] error'
}

// OIDC COMMANDS

export const getOidcUser = createAction(OidcActionTypes.GetOidcUser, props<{ payload: any }>());
export const removeOidcUser = createAction(OidcActionTypes.RemoveOidcUser);
export const userExpired = createAction(OidcActionTypes.UserExpired);
export const userFound = createAction(OidcActionTypes.UserFound, props<{ payload?: OidcUser }>());
export const onSessionChanged = createAction(OidcActionTypes.OnSessionChanged);
export const onAccessTokenExpired = createAction(OidcActionTypes.OnAccessTokenExpired);
export const onAccessTokenExpiring = createAction(OidcActionTypes.OnAccessTokenExpiring);
export const onUserLoading = createAction(OidcActionTypes.UserLoading);
export const userDoneLoading = createAction(OidcActionTypes.UserDoneLoading);
export const userDoneLoadingError = createAction(OidcActionTypes.UserDoneLoadingError, props<{ payload: Error }>());

// OIDC EVENTS

export const onUserLoaded = createAction(OidcActionTypes.OnUserLoaded, props<{ payload: OidcUser }>());
export const onUserloadError = createAction(OidcActionTypes.OnUserloadError, props<{ payload: Error }>());
export const onUserUnloaded = createAction(OidcActionTypes.OnUserUnloaded);
export const onUserSignedOut = createAction(OidcActionTypes.OnUserSignedOut);
export const onSilentRenewError = createAction(OidcActionTypes.OnSilentRenewError, props<{ payload: Error }>());
export const signinPopup = createAction(OidcActionTypes.SignInPopup, props<{ payload: RequestArugments }>());
export const signinRedirect = createAction(OidcActionTypes.SignInRedirect, props<{ payload: RequestArugments }>());
export const signInError = createAction(OidcActionTypes.SignInError, props<{ payload: Error }>());
export const signoutPopup = createAction(OidcActionTypes.SignOutPopup, props<{ payload: RequestArugments }>());
export const signoutRedirect = createAction(OidcActionTypes.SignOutRedirect, props<{ payload: RequestArugments }>());
export const signOutError = createAction(OidcActionTypes.SignOutError, props<{ payload: Error }>());
export const signinSilent = createAction(OidcActionTypes.SignInSilent, props<{ payload: RequestArugments }>());
export const oidcError = createAction(OidcActionTypes.OidcError, props<{ payload: Error }>());

export const oidcActions = {
  getOidcUser,
  removeOidcUser,
  userExpired,
  userFound,
  onSessionChanged,
  onAccessTokenExpired,
  onAccessTokenExpiring,
  onUserLoading,
  userDoneLoading,
  userDoneLoadingError,
  onUserLoaded,
  onUserUnloaded,
  onUserSignedOut,
  onSilentRenewError,
  signinPopup,
  signinRedirect,
  signInError,
  signoutPopup,
  signoutRedirect,
  signOutError,
  signinSilent,
  oidcError
};
