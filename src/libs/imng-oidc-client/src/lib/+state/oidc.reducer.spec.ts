import * as oidcActions from './oidc.actions';
import { initialState, oidcFeature } from './oidc.reducer';

describe('Employees Reducer', () => {
  describe('valid Oidc actions', () => {
    it('getOidcUser', () => {
      const action = oidcActions.getOidcUser();
      const result = oidcFeature.reducer(initialState, action);
      expect(result.isLoading).toBe(false);
    });

    it('onUserLoading snapshot', () => {
      const action = oidcActions.onUserLoading();
      const result = oidcFeature.reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('userExpired', () => {
      const action = oidcActions.userExpired();
      const result = oidcFeature.reducer(initialState, action);
      expect(result.isLoggedIn).toBe(false);
      expect(result.isExpiring).toBe(false);
    });

    it('onUserLoading', () => {
      const action = oidcActions.onUserLoading();
      const result = oidcFeature.reducer(initialState, action);
      expect(result.isLoading).toBe(true);
      expect(result.isLoggedIn).toBe(false);
    });

    it('onSignOutPopup', () => {
      const action = oidcActions.signOutPopup({});
      const result = oidcFeature.reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('onSignInError', () => {
      const action = oidcActions.signInError(new Error('unit tests'));
      const result = oidcFeature.reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('onUserFound', () => {
      const action = oidcActions.userFound({ access_token: null } as never);
      const result = oidcFeature.reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });
});
