import { NursesEntity } from './nurses.models';
import * as NursesActions from './nurses.actions';
import { NursesState, initialState, reducer } from './nurses.reducer';

describe('Nurses Reducer', () => {
  const createNursesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as NursesEntity);

  beforeEach(() => {});

  describe('valid Nurses actions', () => {
    it('loadNursesSuccess should return set the list of known Nurses', () => {
      const nurses = [createNursesEntity('PRODUCT-AAA'), createNursesEntity('PRODUCT-zzz')];
      const action = NursesActions.loadNursesSuccess({ nurses });

      const result: NursesState = reducer(initialState, action);

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
