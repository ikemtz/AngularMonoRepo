import { idleFeature } from './idle.reducer';

const getIsTimingOut = idleFeature.selectIsTimingOut;

const getTimeoutSpanInMs = idleFeature.selectIsTimingOut;
export const idleQuery = { getIsTimingOut, getTimeoutSpanInMs };
