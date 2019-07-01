// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  oidc_config: {
    authority: 'https://nurser.auth0.com', // e.g. https://ngOidcClient.auth0.com/'
    client_id: 'NlqroNO9CSspZo7UUsW5Cq8jRrWy1vbn',
    redirect_uri: 'http://localhost:4200/callback.html',
    response_type: 'id_token token',
    scope: 'openid profile offline_access',
    post_logout_redirect_uri: 'http://localhost:4200/signout-callback.html',
    silent_redirect_uri: 'http://localhost:4200/renew-callback.html',
    automaticSilentRenew: true,
    metadata: {
      issuer: 'https://nurser.auth0.com/',
      authorization_endpoint: 'https://nurser.auth0.com/authorize',
      userinfo_endpoint: 'https://nurser.auth0.com/userinfo',
      end_session_endpoint:
        'https://nurser.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A4200%2Fsignout-callback.html'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
