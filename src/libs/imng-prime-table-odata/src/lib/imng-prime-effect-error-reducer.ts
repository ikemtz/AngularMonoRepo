export function imngPrimeEffectErrorReducer<
  T extends { activeEffectCount: number; error: unknown },
>(state: T, effectError: { payload: { error: Error } }): T {
  return {
    ...state,
    activeEffectCount: state.activeEffectCount - 1,
    error: effectError.payload.error,
  };
}
