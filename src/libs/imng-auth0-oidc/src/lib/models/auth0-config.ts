import { InjectionToken } from '@angular/core';

export interface Auth0Config {
  audience: string;
  client_id: string;
  authority: string;
  scope?: string;
}
export const AUTH0_CONFIG = new InjectionToken<Auth0Config>('auth0-config');
