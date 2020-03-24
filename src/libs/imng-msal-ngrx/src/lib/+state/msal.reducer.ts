import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MsalActions from './msal.actions';
import { MsalEntity } from './msal.models';

export const MSAL_FEATURE_KEY = 'msal';

export interface State extends EntityState<MsalEntity> {
  selectedId?: string | number; // which Msal record has been selected
  loaded: boolean; // has the Msal list been loaded
  error?: string | null; // last none error (if any)
}

export interface MsalPartialState {
  readonly [MSAL_FEATURE_KEY]: State;
}

export const msalAdapter: EntityAdapter<MsalEntity> = createEntityAdapter<MsalEntity>();

export const initialState: State = msalAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const msalReducer = createReducer(
  initialState,
  on(MsalActions.loadMsal, state => ({ ...state, loaded: false, error: null })),
  on(MsalActions.loadMsalSuccess, (state, { msal }) => msalAdapter.addAll(msal, { ...state, loaded: true })),
  on(MsalActions.loadMsalFailure, (state, { error }) => ({ ...state, error })),
);

export function reducer(state: State | undefined, action: Action) {
  return msalReducer(state, action);
}
