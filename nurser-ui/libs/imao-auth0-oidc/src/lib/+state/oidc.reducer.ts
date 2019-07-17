import { User as OidcUser } from 'oidc-client';
import { oidcActions } from './oidc.action';
import { jwtDecoder } from '../util/jwt-decoder';
import { on, createReducer, Action } from '@ngrx/store';


export interface OidcState {
  identity: OidcUser | null;
  permissions: string[];
  loading: boolean;
  expiring: boolean;
  errors: ErrorState;
}

export interface ErrorState {
  silentRenewError: any;
  signInError: any;
}

export const initialState: OidcState = {
  identity: null,
  permissions: [],
  loading: true,
  expiring: false,
  errors: {
    silentRenewError: null,
    signInError: null
  }
};

const featureReducer = createReducer(
  initialState,
  on(oidcActions.getOidcUser, state => ({ ...state, loading: true })),
  on(oidcActions.removeOidcUser, state => ({ ...state, loading: true })),
  on(oidcActions.onUserLoading, state => ({ ...state, loading: true })),
  on(oidcActions.userDoneLoading, state => ({ ...state, loading: false })),
  on(oidcActions.onAccessTokenExpiring, state => ({ ...state, expiring: true })),
  on(oidcActions.onUserLoaded, state => ({ ...state, loading: false, expiring: false })),
  on(oidcActions.onUserUnloaded, state => ({ ...state, identity: null, expiring: false })),
  on(oidcActions.userFound, (state, identity) => ({ ...state, identity: identity.payload, permissions: jwtDecoder<{ permissions?: [] }>(identity.payload.access_token).permissions })),
  on(oidcActions.userExpired, state => ({ ...state, expiring: false })),
  on(oidcActions.onSilentRenewError, (state, err) => ({
    ...state, errors: {
      ...state.errors, silentRenewError: {
        message: err.payload.message, name: err.payload.name, stack: err.payload.stack,
        loading: false
      }
    }
  })),
  on(oidcActions.userDoneLoadingError, (state, err) => ({
    ...state, loading: false, errors: {
      ...state.errors,
      signInError: err.payload
    }
  })),
  on(oidcActions.signInError, (state, err) => ({
    ...state, errors: {
      ...state.errors, signInError: {
        message: err.payload.message, name: err.payload.name, stack: err.payload.stack
      }
    }
  })),
);

export function oidcReducer(state: OidcState | undefined, action: Action) {
  return featureReducer(state, action);
}