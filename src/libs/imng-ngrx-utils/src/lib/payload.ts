import { createAction } from '@ngrx/store';

export class Payload<T> {
  payload: T;
}

export function createPayloadAction<T>(actionType: string) {
  return createAction(actionType, (payload: T) => ({ payload }));
}
