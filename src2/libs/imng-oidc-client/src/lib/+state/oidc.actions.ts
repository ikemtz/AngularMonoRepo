import { createAction } from '@ngrx/store';
import { RequestArugments } from '../models/arguments.model';
import { HttpErrorResponse } from '@angular/common/http';
import { IOidcUser } from '../models/oidc-user';
import { createPayloadAction } from 'imng-ngrx-utils';

export const clearCurrentEmployee = createAction('[Employees] Clear Current Employee');

// OIDC COMMANDS

export const getOidcUser = createAction('[Oidc] get oidc user');
export const removeOidcUser = createAction('[Oidc] remove oidc user');
export const userExpired = createAction('[Oidc] user expired');
export const userFound = createPayloadAction<IOidcUser>('[Oidc] user found');
export const onSessionChanged = createAction('[Oidc] session changed');
export const onAccessTokenExpired = createAction('[Oidc] on access token expired');
export const onAccessTokenExpiring = createAction('[Oidc] user expiring');
export const onUserLoading = createAction('[Oidc] user loading');
export const userDoneLoading = createAction('[Oidc] user done loading');
export const userDoneLoadingError = createPayloadAction<Error>('[Oidc] user done loading error');
export const onUserMetadataLoaded = createPayloadAction<unknown>('[Oidc] on User Metadata Loaded');

// OIDC EVENTS
export const onSignInPopup = createPayloadAction<IOidcUser>('[Oidc] on SignInPopup');
export const onSignInRedirect = createPayloadAction<IOidcUser>('[Oidc] on onSignInRedirect');
export const onSignInSilent = createPayloadAction<IOidcUser>('[Oidc] on onSignInSilent');

export const onUserLoaded = createPayloadAction<IOidcUser>('[Oidc] on user loaded');
export const onUserloadError = createPayloadAction<Error>('[Oidc] user load error');
export const onUserUnloaded = createAction('[Oidc] on user unloaded');
export const onUserSignedOut = createAction('[Oidc] on user signed out');
export const onSilentRenewError = createPayloadAction<Error>('[Oidc] on silent renew error');
export const signInPopup = createPayloadAction<RequestArugments>('[Oidc] sign in popup');
export const signInRedirect = createPayloadAction<RequestArugments>('[Oidc] sign in redirect');
export const signInError = createPayloadAction<Error>('[Oidc] sign in popup error');
export const signOutPopup = createPayloadAction<RequestArugments>('[Oidc] sign out popup');
export const signOutPopupError = createPayloadAction<string>('[Oidc] sign out popup error');
export const signOutRedirect = createPayloadAction<RequestArugments>('[Oidc] sign out redirect');
export const signOutRedirectError = createPayloadAction<string>('[Oidc] sign out redirect error');
export const signInSilent = createPayloadAction<RequestArugments>('[Oidc] sign in silent');
export const oidcError = createPayloadAction<Error>('[Oidc] error');

// HTTP
export const setHttpError = createPayloadAction<HttpErrorResponse>('[HTTP] Set Http Error');
export const clearErrors = createAction('[HTTP] Clear Errors');
