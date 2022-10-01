import { oidcUserSelectors } from './oidc-user.selectors';
import { OIDC_FEATURE_KEY } from './oidc.reducer';

describe('OIDC User Selector', () => {
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
          scope: '🌎 group1 group2 email pic',
          profile: {},
        },
        audiences: [],
        permissions: [],
        loading: false,
        expiring: false,
      },
    };
  });

  it('getScope', () => {
    const results = oidcUserSelectors.getScope(state);
    expect(results).toStrictEqual(['🌎', 'group1', 'group2', 'email', 'pic']);
  });

  it('getScopes', () => {
    state = {
      ...state,
      [OIDC_FEATURE_KEY]: {
        ...state[OIDC_FEATURE_KEY],
        identity: {
          ...state[OIDC_FEATURE_KEY].identity,
          scopes: ['🌎', 'group1', 'group2', 'email', 'pic'],
        },
      },
    };
    const results = oidcUserSelectors.getScope(state);
    expect(results).toStrictEqual(['🌎', 'group1', 'group2', 'email', 'pic']);
  });
});
