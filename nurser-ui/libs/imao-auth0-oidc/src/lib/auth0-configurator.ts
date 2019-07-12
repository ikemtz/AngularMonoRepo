import { Auth0Config } from './auth0-config';
import { Config } from './models';

export function auth0Configurator(auth0Config: Auth0Config): Config {
  return {
    oidc_config: {
      authority: auth0Config.authority,
      client_id: auth0Config.client_id,
      extraQueryParams: { audience: auth0Config.audience },
      redirect_uri: `${window.location.origin}/callback.html`,
      response_type: 'id_token token',
      scope: auth0Config.scope || 'openid profile offline_access email',
      post_logout_redirect_uri: `${
        window.location.origin
        }/signout-callback.html`,
      silent_redirect_uri: `${window.location.origin}/renew-callback.html`,
      automaticSilentRenew: true,
      metadata: {
        issuer: `${auth0Config.authority}/`,
        authorization_endpoint: `${auth0Config.authority}/authorize`,
        userinfo_endpoint: `${auth0Config.authority}/userinfo`,
        end_session_endpoint: `${auth0Config.authority}/v2/logout?client_id=${
          auth0Config.client_id
          }&returnTo=${window.location.origin}/signout-callback.html`,
        jwks_uri: `${auth0Config.authority}/.well-known/jwks.json`
      }
    }
  };
}
