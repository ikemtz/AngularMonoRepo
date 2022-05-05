import * as oidcActions from './oidc.actions';
import { jwtDecoder } from '../util/jwt-decoder';
import { on, createReducer, createFeature } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IOidcUser } from '../models/oidc-user';

export const OIDC_FEATURE_KEY = 'oidc';
export interface OidcState {
  identity: IOidcUser | undefined;
  audiences: string[] | undefined;
  userMetadata: unknown | undefined;
  permissions: string[] | undefined;
  isLoading: boolean;
  isLoggedIn: boolean;
  isExpiring: boolean;
  isExpired: boolean;
  errors: ErrorState;
}

export interface ErrorState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  silentRenewError: unknown | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signInError: unknown | undefined;
  httpError: HttpErrorResponse | undefined;
}

export const initialState: OidcState = {
  audiences: [],
  permissions: [],
  isLoading: true,
  isLoggedIn: false,
  isExpiring: false,
  isExpired: false,
  identity: undefined,
  userMetadata: undefined,
  errors: {
    silentRenewError: undefined,
    signInError: undefined,
    httpError: undefined,
  },
};

export const oidcFeature = createFeature({
  name: OIDC_FEATURE_KEY,
  reducer: createReducer(initialState,
    on(oidcActions.getOidcUser,
      (state): OidcState => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
      })),
    on(oidcActions.onUserLoading,
      (state): OidcState => ({
        ...state,
        isLoading: true,
        isLoggedIn: false,
      })),
    on(oidcActions.removeOidcUser,
      (state): OidcState => ({
        ...state,
        isLoading: true,
        isLoggedIn: false,
        identity: undefined,
      })),
    on(oidcActions.setHttpError,
      (state, err): OidcState => ({
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          httpError: err.payload,
        },
      })),
    on(oidcActions.onUserMetadataLoaded,
      (state, userMetadata): OidcState => ({
        ...state,
        userMetadata: userMetadata.payload,
        isLoading: false,
      })),
    on(oidcActions.clearErrors,
      (state): OidcState => ({
        ...state, errors: {
          signInError: undefined,
          silentRenewError: undefined,
          httpError: undefined
        }
      })),
    on(oidcActions.userDoneLoading,
      (state): OidcState => ({
        ...state,
        isLoading: false
      })),
    on(oidcActions.onAccessTokenExpiring,
      (state): OidcState => ({
        ...state,
        isExpiring: true,
      })),
    on(oidcActions.onAccessTokenExpired,
      (state): OidcState => ({
        ...state,
        isLoggedIn: false,
        isExpiring: false,
        isExpired: true,
      })),
    on(oidcActions.onUserLoaded,
      (state): OidcState => ({
        ...state,
        isLoading: false,
        isExpiring: false,
      })),
    on(
      oidcActions.onUserUnloaded,
      oidcActions.onUserSignedOut,
      oidcActions.signOutPopupError,
      oidcActions.signOutRedirectError,
      (state): OidcState => ({
        ...state,
        isLoggedIn: false,
        identity: undefined,
        isExpired: true,
        isExpiring: false,
        userMetadata: undefined,
      })
    ),
    on(oidcActions.signOutRedirect,
      oidcActions.signOutPopup,
      (state): OidcState => ({
        ...state,
        identity: undefined,
        userMetadata: null,
        isLoggedIn: false,
      })),
    on(
      oidcActions.userFound,
      oidcActions.onSignInPopup,
      oidcActions.onSignInRedirect,
      oidcActions.onSignInSilent,
      (state, { payload }): OidcState => ({
        ...state,
        identity: payload,
        isLoggedIn: true,
        audiences: jwtDecoder<{ aud?: []; }>(payload.access_token)?.aud,
        permissions: jwtDecoder<{ permissions?: []; }>(payload.access_token)?.permissions,
      })
    ),
    on(oidcActions.userExpired, (state): OidcState => ({
      ...state,
      isLoggedIn: false,
      isExpiring: false,
    })),
    on(oidcActions.onSilentRenewError, (state, err): OidcState => ({
      ...state,
      isLoading: false,
      errors: {
        ...state.errors,
        silentRenewError: err.payload,
      },
    })),
    on(
      oidcActions.userDoneLoadingError,
      oidcActions.signInError,
      (state, err): OidcState => ({
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          signInError: err.payload,
        },
      })
    ))
});
