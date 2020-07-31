import { Auth0Config } from '../models/auth0-config';
import { Config } from '../models/config.model';

export function auth0Configurator(auth0Config: Auth0Config, document: Document): Config {
  return {
    oidc_config: {
      authority: auth0Config.authority,
      client_id: auth0Config.client_id,
      extraQueryParams: { audience: auth0Config.audience },
      redirect_uri: `${document.location.origin}/callback.html`,
      response_type: auth0Config.response_type || 'id_token token',
      scope: auth0Config.scope || 'openid profile offline_access email',
      post_logout_redirect_uri: `${
        document.location.origin
        }/signout-callback.html`,
      silent_redirect_uri: `${document.location.origin}/renew-callback.html`,
      automaticSilentRenew: auth0Config.automaticSilentRenew || true,
      metadataUrl: `${auth0Config.authority}/.well-known/openid-configuration`,

    },
    getUserMetadata: auth0Config.getUserMetadata
  };
}
