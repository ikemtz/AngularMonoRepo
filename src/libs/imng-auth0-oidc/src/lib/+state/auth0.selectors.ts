import { createSelector } from '@ngrx/store';
import { Auth0Profile } from '../models/auth0-profile';
import { oidcQuery } from './oidc.selectors';
import { OidcState } from './oidc.reducer';
import { IOidcUser } from '../models/oidc-user';

const getProfile = createSelector(oidcQuery.getOidcIdentity, (identity: IOidcUser) =>
  identity?.profile as Auth0Profile);

const getPermissions = createSelector(oidcQuery.selectOidcState, (state: OidcState) =>
  state?.permissions);

const getEmail = createSelector(getProfile, (profile) => profile?.email);

const getProfilePicture = createSelector(getProfile, (profile) => profile?.picture);

export const auth0Query =
{
  getProfile,
  getEmail,
  getProfilePicture,
  getPermissions
};
