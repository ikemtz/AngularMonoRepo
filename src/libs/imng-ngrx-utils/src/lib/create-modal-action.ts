import { createAction } from '@ngrx/store';

export interface ModalPayload<T> {
  modalState: string;
  entity: T;
}

// tslint:disable-next-line: typedef , doing otherwise would involve having deep imports on the @ngrx library
export function createModalAction<T>(actionType: string) {
  return createAction(actionType, (payload: ModalPayload<T>) => ({ payload }));
}
