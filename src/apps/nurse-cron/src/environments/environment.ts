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
  auth0_options: {
    authority: 'https://nrsrx-demo.auth0.com',
    client_id: '6JEcsWCEL4y5k5Lvr9YGgdLG3qVTylTn',
    audience: 'IM-NurseCron',
    response_type: 'code',
    getUserMetadata: true,
  },
  signalr: {
    hostUrl: 'https://im-wa-coms-nrcrn.azurewebsites.net/notificationHub',
    logLevel: LogLevel.Trace,
    clientMethods: ['OnMessageRecieved']
  },
  idleConfig: {
    timeoutWarningInMs: 540000, //9 minutes
    autoLogoutInMs: 600000 //10 minutes
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
