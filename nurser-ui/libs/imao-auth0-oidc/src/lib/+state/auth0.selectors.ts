import { createSelector } from '@ngrx/store';
import { User } from 'oidc-client';
import { Auth0Profile } from '../models/auth0-profile';
import { oidcQuery } from './oidc.selectors';

const getProfile = createSelector(oidcQuery.getOidcIdentity, (identity: User) =>
    <Auth0Profile>(identity || { profile: {} }).profile);

const getEmail = createSelector(getProfile,
    (profile) => profile.email);

const getProfilePicture = createSelector(getProfile,
    (profile) => profile.picture);


export const auth0Query =
{
    getProfile,
    getEmail,
    getProfilePicture
}