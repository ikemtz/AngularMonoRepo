import { createAction, props } from '@ngrx/store';

export class Payload<T> {
  payload: T;
}

export function createPayload<T>(payload: T): Payload<T> {
  return { payload };
}

export function createPayloadAction<T>(actionType: string) {
  return createAction(actionType, props<Payload<T>>());
}
