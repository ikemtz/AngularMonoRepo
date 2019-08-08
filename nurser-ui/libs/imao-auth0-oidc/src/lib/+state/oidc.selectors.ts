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

const hasErrors: MemoizedSelector<{}, boolean> = createSelector(
    selectOidcErrorState,
    (state: ErrorState) => !!state.httpError || !!state.signInError || !!state.silentRenewError
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
)
const getExpiresAt = createSelector(
    getOidcIdentity,
    (state: OidcUser) => new Date(state.expires_at * 1000)
)
const getProfile = createSelector(
    getOidcIdentity,
    (state: OidcUser) => Object.entries(state.profile).map((k, v) => {
        return { key: k[0], value: <string>k[1] };
    })
)

export const oidcQuery =
{
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
}