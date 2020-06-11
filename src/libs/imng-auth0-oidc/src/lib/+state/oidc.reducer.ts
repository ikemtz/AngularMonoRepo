import * as oidcActions from './oidc.action';
import { jwtDecoder } from '../util/jwt-decoder';
import { on, createReducer, Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IOidcUser } from '../models/oidc-user';

export const OIDC_FEATURE_KEY = 'oidc';
export interface OidcState {
  identity: IOidcUser | null;
  audiences: string[];
  permissions: string[];
  loading: boolean;
  expiring: boolean;
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
  expiring: false,
  errors: {
    silentRenewError: null,
    signInError: null,
    httpError: null,
  },
};

const featureReducer = createReducer(
  initialState,
  on(oidcActions.getOidcUser, state => ({ ...state, loading: true })),
  on(oidcActions.removeOidcUser, state => ({ ...state, loading: true })),
  on(oidcActions.onUserLoading, state => ({ ...state, loading: true })),
  on(oidcActions.setHttpError, (state, err) => ({
    ...state,
    loading: false,
    errors: {
      ...state.errors,
      httpError: err.payload,
    },
  })),
  on(oidcActions.clearErrors, state => ({ ...state, errors: {} })),
  on(oidcActions.userDoneLoading, state => ({ ...state, loading: false })),
  on(oidcActions.onAccessTokenExpiring, state => ({ ...state, expiring: true })),
  on(oidcActions.onUserLoaded, state => ({ ...state, loading: false, expiring: false })),
  on(oidcActions.onUserUnloaded, state => ({ ...state, identity: null, expiring: false })),
  on(oidcActions.userFound, (state, identity) => ({
    ...state,
    identity: identity.payload,
    audiences: jwtDecoder<{ aud?: []; }>(identity.payload.access_token).aud,
    permissions: jwtDecoder<{ permissions?: []; }>(identity.payload.access_token).permissions,

  })),
  on(oidcActions.userExpired, state => ({ ...state, expiring: false })),
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
