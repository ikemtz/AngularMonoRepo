import { createSelector } from '@ngrx/store';
import { ErrorState, oidcFeature } from './oidc.reducer';
import { IOidcUser } from '../models/oidc-user';
// State Selectors

const selectAccessToken = createSelector(
  oidcFeature.selectIdentity,
  (user?: IOidcUser) => (user || { access_token: undefined }).access_token
);

// errors
const selectOidcErrorState = createSelector(
  oidcFeature.selectErrors,
  (errors) => errors
);

const selectHasErrors = createSelector(
  selectOidcErrorState,
  (state: ErrorState) =>
    !!state.httpError || !!state.signInError || !!state.silentRenewError
);

const selectSignInError = createSelector(
  selectOidcErrorState,
  (errors: ErrorState) => errors.signInError
);

const selectSilentRenewError = createSelector(
  selectOidcErrorState,
  (errors: ErrorState) => errors.silentRenewError
);

const selectHttpError = createSelector(
  selectOidcErrorState,
  (errors: ErrorState) => errors.httpError
);

const selectExpiresAt = createSelector(oidcFeature.selectIdentity, (state?: IOidcUser) =>
  state?.expires_at ? new Date(state.expires_at * 1000) : null //NOSONAR
);
;

export const oidcQuery = {
  selectExpiresAt,
  selectPermissions: oidcFeature.selectPermissions,
  selectIsLoading: oidcFeature.selectIsLoading,
  selectIdentity: oidcFeature.selectIdentity,
  selectAccessToken,
  selectIsExpiring: oidcFeature.selectIsExpiring,
  selectIsExpired: oidcFeature.selectIsExpired,
  selectIsLoggedIn: oidcFeature.selectIsLoggedIn,
  selectSilentRenewError,
  selectSignInError,
  selectHttpError,
  selectHasErrors,
  selectAudiences: oidcFeature.selectAudiences,
  selectUserMetadata: oidcFeature.selectUserMetadata,
};
