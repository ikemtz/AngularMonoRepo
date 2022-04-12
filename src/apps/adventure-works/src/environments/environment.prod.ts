import { Endpoints } from '../app/models/odata/endpoints';

export const environment = {
  production: true,
  version: '1.0.0',
  endPoints: { ...Endpoints },
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true,
  },
  appInsights: { instrumentationKey: 'e92419ad-e3e7-488a-81d4-794b498de73e' },
  oidc_options: {
    authority: 'https://nrsrx-demo.auth0.com',
    client_id: 'em42lcjfm0WbbPwhooEbYAqvAjburTPW',
    audience: 'AdventureWorks',
    response_type: 'code',
    getUserMetadata: true,
  },
  idleConfig: {
    timeoutWarningInMs: 540000, //9 minutes
    autoLogoutInMs: 600000, //10 minutes
  },
};
