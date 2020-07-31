import { InjectionToken } from '@angular/core';

export interface Auth0Config {
  audience: string;
  client_id: string;
  authority: string;
  scope?: 'openid' |
  'profile' |
  'offline_access' |
  'name' |
  'given_name' |
  'family_name' |
  'nickname' |
  'email' |
  'email_verified' |
  'picture' |
  'created_at' |
  'identities' |
  'phone' |
  'address' |
  string;
  response_type?: 'code' |
  'token' |
  'id_token' |
  'code token' |
  'code id_token' |
  'token id_token' |
  'code token id_token' |
  string;
  automaticSilentRenew?: boolean;
  getUserMetadata: boolean;
}
export const AUTH0_CONFIG = new InjectionToken<Auth0Config>('auth0-config');
