import { createSelector } from '@ngrx/store';
import { User } from 'oidc-client';
import { Auth0Profile } from '../models/auth0-profile';
import { oidcQuery } from './oidc.selectors';
import { OidcState } from './oidc.reducer';

const getProfile = createSelector(oidcQuery.getOidcIdentity, (identity: User) =>
  <Auth0Profile>(identity || { profile: {} }).profile);

const getPermissions = createSelector(oidcQuery.selectOidcState, (state: OidcState) =>
  (state || { permissions: Array<string>() }).permissions);

const getEmail = createSelector(getProfile,
  (profile) => profile.email);

const getProfilePicture = createSelector(getProfile,
  (profile) => profile.picture);


export const auth0Query =
{
  getProfile,
  getEmail,
  getProfilePicture,
  getPermissions
}