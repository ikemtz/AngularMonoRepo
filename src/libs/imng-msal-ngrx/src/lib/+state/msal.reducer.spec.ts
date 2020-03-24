import { MsalEntity } from './msal.models';
import * as MsalActions from './msal.actions';
import { State, initialState, reducer } from './msal.reducer';

describe('Msal Reducer', () => {
  const createMsalEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MsalEntity);

  beforeEach(() => {});

  describe('valid Msal actions', () => {
    it('loadMsalSuccess should return set the list of known Msal', () => {
      const msal = [createMsalEntity('PRODUCT-AAA'), createMsalEntity('PRODUCT-zzz')];
      const action = MsalActions.loadMsalSuccess({ msal });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
