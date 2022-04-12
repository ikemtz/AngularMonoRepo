import { InjectionToken } from '@angular/core';
import { UserManagerSettings, Logger } from 'oidc-client';

export interface OidcLibraryConfig {
  oidc_config: UserManagerSettings;
  useCallbackFlag: boolean;
  getUserMetadata: boolean;
  log?: {
    logger: Logger;
    level: number;
  };
}
export const OIDC_LIBRARY_CONFIG = new InjectionToken<OidcLibraryConfig>(
  'OIDC_LIBRARY_CONFIG'
);
