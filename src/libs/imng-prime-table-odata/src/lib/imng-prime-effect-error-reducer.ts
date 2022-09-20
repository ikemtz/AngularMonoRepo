import { decrementActiveEffectCount } from './helpers/crement-active-effect-count';

export function imngPrimeEffectErrorReducer<
  T extends { activeEffectCount: number; error: unknown },
>(state: T, effectError: { payload: { error: Error } }): T {
  return {
    ...decrementActiveEffectCount(state),
    error: effectError.payload.error,
  };
}
