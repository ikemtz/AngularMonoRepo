import { Auth0Options } from './auth0-options';
import { Config } from 'ng-oidc-client';

export function auth0Configurator(auth0Options: Auth0Options): Config {
  return {
    oidc_config: {
      authority: auth0Options.authority,
      client_id: auth0Options.client_id,
      extraQueryParams: { audience: auth0Options.audience },
      redirect_uri: `${window.location.origin}/callback.html`,
      response_type: 'id_token token',
      scope: auth0Options.scope || 'openid profile offline_access email',
      post_logout_redirect_uri: `${
        window.location.origin
        }/signout-callback.html`,
      silent_redirect_uri: `${window.location.origin}/renew-callback.html`,
      automaticSilentRenew: true,
      metadata: {
        issuer: `${auth0Options.authority}/`,
        authorization_endpoint: `${auth0Options.authority}/authorize`,
        userinfo_endpoint: `${auth0Options.authority}/userinfo`,
        end_session_endpoint: `${auth0Options.authority}/v2/logout?client_id=${
          auth0Options.client_id
          }&returnTo=${window.location.origin}/signout-callback.html`
      }
    }
  };
}
