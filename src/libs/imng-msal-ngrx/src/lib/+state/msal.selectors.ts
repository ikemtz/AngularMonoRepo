import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MSAL_FEATURE_KEY, State, MsalPartialState, msalAdapter } from './msal.reducer';

// Lookup the 'Msal' feature state managed by NgRx
export const getMsalState = createFeatureSelector<MsalPartialState, State>(MSAL_FEATURE_KEY);

const { selectAll, selectEntities } = msalAdapter.getSelectors();

export const getMsalLoaded = createSelector(getMsalState, (state: State) => state.loaded);

export const getMsalError = createSelector(getMsalState, (state: State) => state.error);

export const getAllMsal = createSelector(getMsalState, (state: State) => selectAll(state));

export const getMsalEntities = createSelector(getMsalState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getMsalState, (state: State) => state.selectedId);

export const getSelected = createSelector(
  getMsalEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId],
);
