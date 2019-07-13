// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0_options: {
    authority: 'https://nurser.auth0.com',
    client_id: 'NlqroNO9CSspZo7UUsW5Cq8jRrWy1vbn',
    audience: 'nurser'
  },
  appInsights: { instrumentationKey: 'abcb7484-6a9c-48a9-b44a-0ee4364aabc1' },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
