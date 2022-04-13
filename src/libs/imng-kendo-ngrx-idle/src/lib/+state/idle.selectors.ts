import { idleFeature } from './idle.reducer';

const getIsTimingOut = idleFeature.selectIsTimingOut;
const getTimeoutSpanInMs = idleFeature.selectTimeoutSpanInMs;

export const idleQuery = { getIsTimingOut, getTimeoutSpanInMs };
