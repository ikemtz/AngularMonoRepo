import { createSelector } from '@ngrx/store';
import { oidcFeature } from 'imng-oidc-client';
import { idleFeature } from './idle.reducer';

const getIsTimingOut = idleFeature.selectIsTimingOut;
const getTimeoutSpanInMs = idleFeature.selectTimeoutSpanInMs;

const selectLoggedInAndIsNotTimingOut = createSelector(
  oidcFeature.selectIsLoggedIn,
  idleFeature.selectIsTimingOut,
  (isLoggedIn, IsTimingOut) => isLoggedIn && !IsTimingOut,
);

export const idleQuery = { getIsTimingOut, getTimeoutSpanInMs, selectLoggedInAndIsNotTimingOut };
