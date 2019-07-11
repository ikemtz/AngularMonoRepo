import { createSelector } from '@ngrx/store';
import { User } from 'oidc-client';
import { getOidcIdentity } from './reducers';

export const getProfile = createSelector(getOidcIdentity, (identity: User) =>
    <{ email: string }>(identity || { profile: { email: null } }).profile);

export const getEmail = createSelector(getProfile,
    (profile) => profile.email);