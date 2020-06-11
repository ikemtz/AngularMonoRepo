import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ErrorState, OidcState } from './oidc.reducer';
import { IOidcUser } from '../models/oidc-user';
// State Selectors

const selectOidcState = createFeatureSelector<OidcState>('oidc');
const getOidcLoading = createSelector(selectOidcState, (state: OidcState) => state.loading);
const getOidcIdentity = createSelector(selectOidcState, (state: OidcState) => state.identity);
const getAccessToken = createSelector(
  getOidcIdentity,
  (user: IOidcUser) => (user || { access_token: null }).access_token,
);
const isIdentityExpiring = createSelector(selectOidcState, (state: OidcState) => state.expiring);

const isIdentityExpired = createSelector(selectOidcState, (state: OidcState) => state.expired);
const isLoggedIn = createSelector(getOidcIdentity, (identity: IOidcUser) => identity && !identity.expired);

// errors
const selectOidcErrorState: MemoizedSelector<{}, ErrorState> = createSelector(
  selectOidcState,
  (state: OidcState) => state.errors,
);

const hasErrors: MemoizedSelector<{}, boolean> = createSelector(
  selectOidcErrorState,
  (state: ErrorState) => !!state.httpError || !!state.signInError || !!state.silentRenewError,
);

const getSignInError = createSelector(selectOidcErrorState, (errors: ErrorState) => errors.signInError);

const getSilentRenewError = createSelector(selectOidcErrorState, (errors: ErrorState) => errors.silentRenewError);

const getHttpError = createSelector(selectOidcErrorState, (errors: ErrorState) => errors.httpError);
const getPermissions = createSelector(selectOidcState, (state: OidcState) => state.permissions);
const getAudiences = createSelector(selectOidcState, (state: OidcState) => state.audiences);
const getExpiresAt = createSelector(getOidcIdentity, (state: IOidcUser) => new Date(state.expires_at * 1000));
const getProfile = createSelector(getOidcIdentity, (state: IOidcUser) => {
  if (!state || !state.profile) {
    return [];
  }
  return Object.entries(state.profile).map((k, v) => {
    return { key: k[0], value: k[1] as string };
  });
});

export const oidcQuery = {
  getProfile,
  getExpiresAt,
  getPermissions,
  selectOidcState,
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
};
