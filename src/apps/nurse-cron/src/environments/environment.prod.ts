import { endPoints } from './endpoints';
import { LogLevel } from '@microsoft/signalr';
export const environment = {
  version: '0.0.0',
  production: true,
  runtimeChecks: {
    strictActionImmutability: false,
    strictStateImmutability: false,
  },
  endPoints,
  appInsights: { instrumentationKey: 'e92419ad-e3e7-488a-81d4-794b498de73e' },
  oidc_options: {
    authority: 'https://nrsrx-demo.auth0.com',
    client_id: '6JEcsWCEL4y5k5Lvr9YGgdLG3qVTylTn',
    audience: 'IM-NurseCron',
    response_type: 'code',
    getUserMetadata: true,
  },
  signalr: {
    hostUrl: 'https://im-wa-coms-nrcrn.azurewebsites.net/notificationHub',
    logger: LogLevel.Trace,
    clientMethods: ['OnMessageRecieved'],
  },
  idleConfig: {
    timeoutWarningInMs: 540000, //9 minutes
    autoLogoutInMs: 600000, //10 minutes
  },
};
