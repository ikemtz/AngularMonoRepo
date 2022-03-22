import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { ErrorState, OidcState } from './oidc.reducer';
import { IOidcUser } from '../models/oidc-user';
// State Selectors

const selectOidcState = createFeatureSelector<OidcState>('oidc');
const getOidcLoading = createSelector(
  selectOidcState,
  (state: OidcState) => state.loading
);
const getOidcIdentity = createSelector(
  selectOidcState,
  (state: OidcState) => state.identity
);
const getAccessToken = createSelector(
  getOidcIdentity,
  (user?: IOidcUser) => (user || { access_token: undefined }).access_token
);
const isIdentityExpiring = createSelector(
  selectOidcState,
  (state: OidcState) => state.expiring
);

const isIdentityExpired = createSelector(
  selectOidcState,
  (state: OidcState) => state.expired
);
const isLoggedIn = createSelector(
  selectOidcState,
  (state: OidcState) => state.loggedIn
);

// errors
// eslint-disable-next-line @typescript-eslint/ban-types
const selectOidcErrorState: MemoizedSelector<{}, ErrorState> = createSelector(
  selectOidcState,
  (state: OidcState) => state.errors
);

// eslint-disable-next-line @typescript-eslint/ban-types
const hasErrors: MemoizedSelector<{}, boolean> = createSelector(
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
const getPermissions = createSelector(
  selectOidcState,
  (state: OidcState) => state.permissions
);
const getAudiences = createSelector(
  selectOidcState,
  (state: OidcState) => state.audiences
);
const getExpiresAt = createSelector(getOidcIdentity, (state?: IOidcUser) =>
  state?.expires_at ? new Date(state.expires_at * 1000) : null
);
const getUserMetadata = createSelector(
  selectOidcState,
  (state: OidcState) => state.userMetadata
);

export const oidcQuery = {
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
  getUserMetadata,
};
