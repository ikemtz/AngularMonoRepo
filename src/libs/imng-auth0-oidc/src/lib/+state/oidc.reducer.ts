import * as oidcActions from './oidc.actions';
import { jwtDecoder } from '../util/jwt-decoder';
import { on, createReducer, Action, State } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IOidcUser } from '../models/oidc-user';

export const OIDC_FEATURE_KEY = 'oidc';
export interface OidcState {
  identity: IOidcUser | null;
  audiences: string[];
  userMetadata?: unknown;
  permissions: string[];
  loading: boolean;
  loggedIn: boolean;
  expiring: boolean;
  expired: boolean;
  errors: ErrorState;
}

export interface ErrorState {
  silentRenewError: any;
  signInError: any;
  httpError: HttpErrorResponse;
}

export const initialState: OidcState = {
  identity: null,
  audiences: [],
  permissions: [],
  loading: true,
  loggedIn: false,
  expiring: false,
  expired: false,
  errors: {
    silentRenewError: null,
    signInError: null,
    httpError: null,
  },
};

const featureReducer = createReducer(
  initialState,
  on(oidcActions.getOidcUser, state => ({ ...state, loading: true, loggedIn: false })),
  on(oidcActions.removeOidcUser, state => ({ ...state, loading: true, loggedIn: false, identity: null })),
  on(oidcActions.onUserLoading, state => ({ ...state, loading: true, loggedIn: false })),
  on(oidcActions.setHttpError, (state, err) => ({
    ...state,
    loading: false,
    errors: {
      ...state.errors,
      httpError: err.payload,
    },
  })),
  on(oidcActions.onUserMetadataLoaded, (state, userMetadata) => ({ ...state, userMetadata: userMetadata.payload })),
  on(oidcActions.clearErrors, state => ({ ...state, errors: {} })),
  on(oidcActions.userDoneLoading, state => ({ ...state, loading: false, })),
  on(oidcActions.onAccessTokenExpiring, state => ({ ...state, expiring: true })),
  on(oidcActions.onAccessTokenExpired, state => ({ ...state, loggedIn: false, expiring: false, expired: true })),
  on(oidcActions.onUserLoaded, state => ({ ...state, loading: false, expiring: false, })),
  on(oidcActions.onUserUnloaded, oidcActions.onUserSignedOut, oidcActions.signOutPopupError, oidcActions.signOutRedirectError,
    state => ({ ...state, loggedIn: false, identity: null, expired: true, expiring: false, userMetadata: undefined })),
  on(oidcActions.signOutRedirect, oidcActions.signOutPopup, state => ({ ...state, identity: null, userMetadata: null, loggedIn: false })),
  on(oidcActions.userFound, (state, identity) => ({
    ...state,
    identity: identity.payload,
    loggedIn: true,
    audiences: jwtDecoder<{ aud?: []; }>(identity.payload.access_token).aud,
    permissions: jwtDecoder<{ permissions?: []; }>(identity.payload.access_token).permissions,
  })),
  on(oidcActions.userExpired, state => ({ ...state, loggedIn: false, expiring: false })),
  on(oidcActions.onSilentRenewError, (state, err) => ({
    ...state,
    loading: false,
    errors: {
      ...state.errors,
      silentRenewError: err.payload,
    },
  })),
  on(oidcActions.userDoneLoadingError, oidcActions.signInError, (state, err) => ({
    ...state,
    loading: false,
    errors: {
      ...state.errors,
      signInError: err.payload,
    },
  })),
);

export function oidcReducer(state: OidcState | undefined, action: Action) {
  return featureReducer(state, action);
}
