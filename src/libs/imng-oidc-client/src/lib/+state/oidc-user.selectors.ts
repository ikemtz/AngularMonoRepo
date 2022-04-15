import { createSelector } from '@ngrx/store';
import { OidcUserProfile } from '../models/oidc-user-profile';
import { oidcQuery } from './oidc.selectors';
import { oidcFeature } from './oidc.reducer';
import { IOidcUser } from '../models/oidc-user';

const selectProfile = createSelector(
  oidcQuery.selectIdentity,
  (identity?: IOidcUser) => identity?.profile as OidcUserProfile
);

const getPermissions = oidcFeature.selectPermissions;

const selectEmail = createSelector(selectProfile, (profile) => profile?.email);

const selectProfilePicture = createSelector(
  selectProfile,
  (profile) => profile?.picture
);

export const OidcUserSelectors = {
  getProfile: selectProfile,
  getEmail: selectEmail,
  getProfilePicture: selectProfilePicture,
  getPermissions,
};
