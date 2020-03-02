import * as NursesActions from './nurses.actions';
import { initialState, reducer } from './nurses.reducer';

describe('Nurses Reducer', () => {
  beforeEach(() => {});

  describe('valid Nurses actions', () => {
    it('loadNursesSuccess should return set the list of known Nurses', () => {});
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
