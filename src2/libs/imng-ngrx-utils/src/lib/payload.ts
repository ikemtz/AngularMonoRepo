import { createAction } from '@ngrx/store';

export class Payload<T> {
  payload: T;
}

// tslint:disable-next-line: typedef , doing otherwise would involve having deep imports on the @ngrx library
export function createPayloadAction<T>(
  actionType: string,
) {
  return createAction(actionType, (payload: T) => ({ payload }));
}
