import { featureReducer, initialState } from './idle.reducer';

describe('Idle Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = featureReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
