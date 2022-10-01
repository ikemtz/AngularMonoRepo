import { createSelector } from '@ngrx/store';
import { OidcUserProfile } from '../models/oidc-user-profile';
import { oidcSelectors } from './oidc.selectors';
import { oidcFeature } from './oidc.reducer';
import { IOidcUser } from '../models/oidc-user';

const selectProfile = createSelector(
  oidcSelectors.selectIdentity,
  (identity?: IOidcUser) => identity?.profile as OidcUserProfile,
);

const selectScope = createSelector(
  oidcSelectors.selectIdentity,
  (identity?: IOidcUser) => identity?.scope?.split(' ') || identity?.scopes,
);
const getPermissions = oidcFeature.selectPermissions;

const selectEmail = createSelector(selectProfile, (profile) => profile?.email);

const selectProfilePicture = createSelector(
  selectProfile,
  (profile) => profile?.picture,
);

export const oidcUserSelectors = {
  getScope: selectScope,
  getProfile: selectProfile,
  getEmail: selectEmail,
  getProfilePicture: selectProfilePicture,
  getPermissions,
};
