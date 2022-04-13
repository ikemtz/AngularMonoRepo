import { createSelector } from '@ngrx/store';
import { OidcUserProfile } from '../models/oidc-user-profile';
import { oidcQuery } from './oidc.selectors';
import { oidcFeature } from './oidc.reducer';
import { IOidcUser } from '../models/oidc-user';

const getProfile = createSelector(
  oidcQuery.getOidcIdentity,
  (identity?: IOidcUser) => identity?.profile as OidcUserProfile
);

const getPermissions = oidcFeature.selectPermissions;

const getEmail = createSelector(getProfile, (profile) => profile?.email);

const getProfilePicture = createSelector(
  getProfile,
  (profile) => profile?.picture
);

export const OidcUserSelectors = {
  getProfile,
  getEmail,
  getProfilePicture,
  getPermissions,
};
