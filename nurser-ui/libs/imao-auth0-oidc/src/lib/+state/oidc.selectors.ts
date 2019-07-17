import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { User as OidcUser } from 'oidc-client';
import { ErrorState, OidcState } from './oidc.reducer';
// State Selectors

const selectOidcState = createFeatureSelector<OidcState>('oidc');
const getOidcLoading = createSelector(selectOidcState, (state: OidcState) => state.loading);
const getOidcIdentity = createSelector(selectOidcState, (state: OidcState) => state.identity);
const getAccessToken = createSelector(getOidcIdentity, (user: OidcUser) => (user || <OidcUser>{ access_token: null }).access_token);
const isIdentityExpiring = createSelector(selectOidcState, (state: OidcState) => state.expiring);
const isIdentityExpired = createSelector(
    getOidcIdentity,
    (identity: OidcUser) => identity && identity.expired
);
const isLoggedIn = createSelector(
    getOidcIdentity,
    (identity: OidcUser) => identity && !identity.expired
);

// errors
const selectOidcErrorState: MemoizedSelector<{}, ErrorState> = createSelector(
    selectOidcState,
    (state: OidcState) => state.errors
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

export const oidcQuery =
{
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
}