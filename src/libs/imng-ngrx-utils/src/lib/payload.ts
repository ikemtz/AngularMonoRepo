import { createAction } from '@ngrx/store';
import { FunctionWithParametersType, TypedAction } from '@ngrx/store/src/models';

export class Payload<T> {
  payload: T;
}

export function createPayloadAction<T>(
  actionType: string,
): FunctionWithParametersType<
  [T],
  {
    payload: T;
  } & TypedAction<string>
> &
  TypedAction<string> {
  return createAction(actionType, (payload: T) => ({ payload }));
}
