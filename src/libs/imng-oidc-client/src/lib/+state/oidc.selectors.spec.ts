import { oidcSelectors } from './oidc.selectors';
import { OIDC_FEATURE_KEY } from './oidc.reducer';

describe('OIDC Selectors', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let state: any;

  beforeEach(() => {
    state = {
      [OIDC_FEATURE_KEY]: {
        identity: {
          id_token: '😎🐱',
          access_token: '🔑',
          expires_at: 60,
          token_type: 'bearer',
          scope: '🌎',
          profile: {},
        },
        audiences: [],
        permissions: [],
        loading: false,
        expiring: false,
      },
    };
  });

  describe('OIDC Selectors', () => {
    it('getAccessToken', () => {
      const results = oidcSelectors.selectAccessToken(state);
      expect(results).toBe('🔑');
    });
  });
});
