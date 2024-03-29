// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { endPoints } from './endpoints';
import { LogLevel } from '@microsoft/signalr';
export const environment = {
  // tslint:disable-next-line: object-literal-key-quotes quotemark
  version: '0.0.0',
  production: false,
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true,
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
