import { InjectionToken } from '@angular/core';

export interface OidcClientConfig {
  audience: string;
  client_id: string;
  authority: string;
  scope?:
  | 'openid'
  | 'profile'
  | 'offline_access'
  | 'name'
  | 'given_name'
  | 'family_name'
  | 'nickname'
  | 'email'
  | 'email_verified'
  | 'picture'
  | 'created_at'
  | 'identities'
  | 'phone'
  | 'address'
  | string; //NOSONAR
  response_type?:
  | 'code'
  | 'token'
  | 'id_token'
  | 'code token'
  | 'code id_token'
  | 'token id_token'
  | 'code token id_token'
  | string; //NOSONAR
  automaticSilentRenew?: boolean;
  getUserMetadata: boolean;
  useCallbackFlag?: boolean;
  webStorageStateStore?: Storage,
}
export const OIDC_CLIENT_CONFIG = new InjectionToken<OidcClientConfig>(
  'oidc-client-config'
);
