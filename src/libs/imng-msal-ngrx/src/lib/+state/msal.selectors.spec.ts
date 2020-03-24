import { MsalEntity } from './msal.models';
import { State, msalAdapter, initialState } from './msal.reducer';
import * as MsalSelectors from './msal.selectors';

describe('Msal Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMsalId = it => it['id'];
  const createMsalEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MsalEntity);

  let state;

  beforeEach(() => {
    state = {
      msal: msalAdapter.addAll(
        [createMsalEntity('PRODUCT-AAA'), createMsalEntity('PRODUCT-BBB'), createMsalEntity('PRODUCT-CCC')],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        },
      ),
    };
  });

  describe('Msal Selectors', () => {
    it('getAllMsal() should return the list of Msal', () => {
      const results = MsalSelectors.getAllMsal(state);
      const selId = getMsalId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = MsalSelectors.getSelected(state);
      const selId = getMsalId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getMsalLoaded() should return the current 'loaded' status", () => {
      const result = MsalSelectors.getMsalLoaded(state);

      expect(result).toBe(true);
    });

    it("getMsalError() should return the current 'error' state", () => {
      const result = MsalSelectors.getMsalError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
