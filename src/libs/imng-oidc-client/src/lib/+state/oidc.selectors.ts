import { createSelector } from '@ngrx/store';
import { ErrorState, oidcFeature } from './oidc.reducer';
import { IOidcUser } from '../models/oidc-user';
// State Selectors

const getOidcLoading = oidcFeature.selectLoading;
const getOidcIdentity = oidcFeature.selectIdentity;
const getAccessToken = createSelector(
  oidcFeature.selectIdentity,
  (user?: IOidcUser) => (user || { access_token: undefined }).access_token
);
const isIdentityExpiring = oidcFeature.selectExpiring;

const isIdentityExpired = oidcFeature.selectExpired;
const isLoggedIn = oidcFeature.selectLoggedIn;

// errors
const selectOidcErrorState = createSelector(
  oidcFeature.selectErrors,
  (errors) => errors
);

const hasErrors = createSelector(
  selectOidcErrorState,
  (state: ErrorState) =>
    !!state.httpError || !!state.signInError || !!state.silentRenewError
);

const getSignInError = createSelector(
  selectOidcErrorState,
  (errors: ErrorState) => errors.signInError
);

const getSilentRenewError = createSelector(
  selectOidcErrorState,
  (errors: ErrorState) => errors.silentRenewError
);

const getHttpError = createSelector(
  selectOidcErrorState,
  (errors: ErrorState) => errors.httpError
);
const getPermissions = oidcFeature.selectPermissions;
const getAudiences = oidcFeature.selectAudiences;

const getExpiresAt = createSelector(getOidcIdentity, (state?: IOidcUser) =>
  state?.expires_at ? new Date(state.expires_at * 1000) : null //NOSONAR
);
const getUserMetadata = oidcFeature.selectUserMetadata;

export const oidcQuery = {
  getExpiresAt,
  getPermissions,
  getOidcLoading,
  getOidcIdentity,
  getAccessToken,
  isIdentityExpiring,
  getSilentRenewError,
  isIdentityExpired,
  isLoggedIn,
  getSignInError,
  getHttpError,
  hasErrors,
  getAudiences,
  getUserMetadata,
};
