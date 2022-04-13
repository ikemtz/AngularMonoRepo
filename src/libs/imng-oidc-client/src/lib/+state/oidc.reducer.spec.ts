
import * as oidcActions from './oidc.actions';
import { initialState, oidcFeature } from './oidc.reducer';

describe('Employees Reducer', () => {

  describe('valid Oidc actions', () => {
    it('getOidcUser', () => {
      const action = oidcActions.getOidcUser();
      const result = oidcFeature.reducer(initialState, action);
      expect(result.loading).toBe(true);
    });

    it('userExpired', () => {
      const action = oidcActions.userExpired();
      const result = oidcFeature.reducer(initialState, action);
      expect(result.loggedIn).toBe(false);
      expect(result.expiring).toBe(false);
    });

    it('onUserLoading', () => {
      const action = oidcActions.onUserLoading();
      const result = oidcFeature.reducer(initialState, action);
      expect(result.loading).toBe(true);
      expect(result.loggedIn).toBe(false);
    });
  });
});
