import { oidcConfigurator } from './oidc-client-configurator';

describe('oidcConfigurator', () => {
  it('should handle undefined', () => {
    const result = oidcConfigurator(
      {
        audience: 'aud',
        client_id: 'client',
        authority: 'auth',
        getUserMetadata: false,
        scope: 'openid email',
      },
      {
        location: { origin: 'origin' },
      } as Document,
    );
    expect(result).toMatchSnapshot();
  });
  it('should handle trues', () => {
    const result = oidcConfigurator(
      {
        audience: 'aud',
        client_id: 'client',
        authority: 'auth',
        getUserMetadata: true,
        automaticSilentRenew: true,
        useCallbackFlag: true,
        scope: 'openid email',
      },
      {
        location: { origin: 'origin' },
      } as Document,
    );
    expect(result).toMatchSnapshot();
  });
  it('should handle falses', () => {
    const result = oidcConfigurator(
      {
        audience: 'aud',
        client_id: 'client',
        authority: 'auth',
        getUserMetadata: false,
        automaticSilentRenew: false,
        useCallbackFlag: false,
        scope: 'openid email',
      },
      {
        location: { origin: 'origin' },
      } as Document,
    );
    expect(result).toMatchSnapshot();
  });
});
