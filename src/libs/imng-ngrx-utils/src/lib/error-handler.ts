import { Action } from '@ngrx/store';
import { catchError, of, OperatorFunction } from 'rxjs';
import { createPayloadAction } from './payload';

export const effectError = createPayloadAction<{ action: Action, error: Error; }>(
  '[IMNG] Error Occured');

export function handleEffectError(action: Action): OperatorFunction<Action, Action> {
  return catchError((error) => of(effectError({ action, error })));;
} 
