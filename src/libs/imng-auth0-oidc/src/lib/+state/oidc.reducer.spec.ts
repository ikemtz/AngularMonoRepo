
import * as oidcActions from './oidc.action';
import { initialState, oidcReducer } from './oidc.reducer';

describe('Employees Reducer', () => {

  beforeEach(() => { });

  describe('valid Oidc actions', () => {
    it('getOidcUser', () => {
      const action = oidcActions.getOidcUser('');

      const result = oidcReducer(initialState, action);

      expect(result.loading).toBe(true);
    });
  });
});
