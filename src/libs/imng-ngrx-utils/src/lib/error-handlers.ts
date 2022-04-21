import { Action } from '@ngrx/store';
import { catchError, of, OperatorFunction } from 'rxjs';
import { createPayloadAction } from './payload';

export const imngEffectError = createPayloadAction<{ action: Action, error: Error; }>(
  '[IMNG] Error Occured');

/**
 *  Will handle effect error and dispatch an imngEffectError action
 * @param action 
 * @returns 
 */
export function handleEffectError(action: Action): OperatorFunction<Action, Action> {
  return catchError((error) => of(imngEffectError({ action, error })));
}

export function imngEffectErrorReducer<T extends { loading: boolean, error: unknown; }>(
  state: T,
  effectError: { payload: { error: Error; }; })
  : T {
  return ({
    ...state,
    loading: false,
    error: effectError.payload.error
  });
}
