import { createAction } from '@ngrx/store';
import { readFirst } from 'imng-ngrx-utils/testing';
import { map, of } from 'rxjs';
import { handleEffectError, imngEffectError, imngEffectErrorReducer } from './error-handlers';

describe('error handlers', () => {
  describe('imngEffectError', () => {
    it('should work', () => {
      const result = imngEffectError({ action: createAction('[unit] test'), error: new Error('should-work') });
      expect(result).toMatchSnapshot();
    });
  });
  describe('handleEffectError', () => {
    it('should work', async () => {
      const action = createAction('[unit] test');
      const result = readFirst(handleEffectError(action)(of(action)).pipe(map(m => m.type)));
      expect(result).toMatchSnapshot();
    });
  });
  describe('imngEffectErrorReducer', () => {
    it('should work', async () => {
      const state = { loading: true, error: null };
      const result = imngEffectErrorReducer(state, { payload: { error: new Error('should-work') } });
      expect(result).toMatchSnapshot();
    });
  });
});
