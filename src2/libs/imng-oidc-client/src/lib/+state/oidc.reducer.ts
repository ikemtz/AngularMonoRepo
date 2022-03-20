import * as oidcActions from './oidc.actions';
import { jwtDecoder } from '../util/jwt-decoder';
import { on, createReducer, Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IOidcUser } from '../models/oidc-user';

export const OIDC_FEATURE_KEY = 'oidc';
export interface OidcState {
  identity: IOidcUser | null;
  audiences?: string[] | null;
  userMetadata?: unknown;
  permissions?: string[];
  loading: boolean;
  loggedIn: boolean;
  expiring: boolean;
  expired: boolean;
  errors: ErrorState;
}

export interface ErrorState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  silentRenewError?: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signInError?: unknown;
  httpError?: HttpErrorResponse;
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
    silentRenewError: undefined,
    signInError: undefined,
    httpError: undefined,
  },
};

const featureReducer = createReducer(
  initialState,
  on(oidcActions.getOidcUser, oidcActions.onUserLoading, (state) => ({
    ...state,
    loading: true,
    loggedIn: false,
  })),
  on(oidcActions.removeOidcUser, (state) => ({
    ...state,
    loading: true,
    loggedIn: false,
    identity: null,
  })),
  on(oidcActions.setHttpError, (state, err) => ({
    ...state,
    loading: false,
    errors: {
      ...state.errors,
      httpError: err.payload,
    },
  })),
  on(oidcActions.onUserMetadataLoaded, (state, userMetadata) => ({
    ...state,
    userMetadata: userMetadata.payload,
    loading: false,
  })),
  on(oidcActions.clearErrors, (state) => ({ ...state, errors: {} })),
  on(oidcActions.userDoneLoading, (state) => ({ ...state, loading: false })),
  on(oidcActions.onAccessTokenExpiring, (state) => ({
    ...state,
    expiring: true,
  })),
  on(oidcActions.onAccessTokenExpired, (state) => ({
    ...state,
    loggedIn: false,
    expiring: false,
    expired: true,
  })),
  on(oidcActions.onUserLoaded, (state) => ({
    ...state,
    loading: false,
    expiring: false,
  })),
  on(
    oidcActions.onUserUnloaded,
    oidcActions.onUserSignedOut,
    oidcActions.signOutPopupError,
    oidcActions.signOutRedirectError,
    (state) => ({
      ...state,
      loggedIn: false,
      identity: null,
      expired: true,
      expiring: false,
      userMetadata: undefined,
    })
  ),
  on(oidcActions.signOutRedirect, oidcActions.signOutPopup, (state) => ({
    ...state,
    identity: null,
    userMetadata: null,
    loggedIn: false,
  })),
  on(
    oidcActions.userFound,
    oidcActions.onSignInPopup,
    oidcActions.onSignInRedirect,
    oidcActions.onSignInSilent,
    (state, { payload }) => ({
      ...state,
      identity: payload,
      loggedIn: true,
      audiences: payload.access_token
        ? jwtDecoder<{ aud?: [] }>(payload.access_token)?.aud
        : null,
      permissions: jwtDecoder<{ permissions?: [] }>(payload.access_token)
        ?.permissions,
    })
  ),
  on(oidcActions.userExpired, (state) => ({
    ...state,
    loggedIn: false,
    expiring: false,
  })),
  on(oidcActions.onSilentRenewError, (state, err) => ({
    ...state,
    loading: false,
    errors: {
      ...state.errors,
      silentRenewError: err.payload,
    },
  })),
  on(
    oidcActions.userDoneLoadingError,
    oidcActions.signInError,
    (state, err) => ({
      ...state,
      loading: false,
      errors: {
        ...state.errors,
        signInError: err.payload,
      },
    })
  )
);

export function oidcReducer(
  state: OidcState | undefined,
  action: Action
): OidcState {
  return featureReducer(state, action);
}
