import { createSelector } from '@ngrx/store';
import { User } from 'oidc-client';
import { getOidcIdentity } from './reducers';
import { Auth0Profile } from './auth0-profile';

export const getProfile = createSelector(getOidcIdentity, (identity: User) =>
    <Auth0Profile>(identity || { profile: {} }).profile);

export const getEmail = createSelector(getProfile,
    (profile) => profile.email);

export const getProfilePicture = createSelector(getProfile,
    (profile) => profile.picture);