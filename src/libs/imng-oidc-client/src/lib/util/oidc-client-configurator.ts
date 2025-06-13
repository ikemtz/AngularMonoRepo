import { isNullOrUndefined } from 'imng-nrsrx-client-utils';
import { OidcClientConfig } from '../models/oidc-client-config';
import { OidcLibraryConfig } from '../models/oidc-library-config';

export function oidcConfigurator(
  oidcClientConfig: OidcClientConfig,
  document: Document,
): OidcLibraryConfig {
  return {
    oidc_config: {
      ...oidcClientConfig,
      extraQueryParams: { audience: oidcClientConfig.audience },
      redirect_uri: `${document.location.origin}/callback.html`,
      response_type: oidcClientConfig.response_type || 'id_token token',
      post_logout_redirect_uri: `${document.location.origin}/signout-callback.html`,
      silent_redirect_uri: `${document.location.origin}/renew-callback.html`,
      automaticSilentRenew: isNullOrUndefined(
        oidcClientConfig.automaticSilentRenew,
      )
        ? true
        : oidcClientConfig.automaticSilentRenew,
      metadataUrl: oidcClientConfig.metadataUrl || `${oidcClientConfig.authority}/.well-known/openid-configuration`,
    },
    getUserMetadata: oidcClientConfig.getUserMetadata,
    useCallbackFlag: isNullOrUndefined(oidcClientConfig.useCallbackFlag)
      ? true
      : (oidcClientConfig.useCallbackFlag as boolean),
  };
}
