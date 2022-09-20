export function incrementActiveEffectCount<
  T extends {
    activeEffectCount: number;
  },
>(state: T): T {
  return {
    ...state,
    activeEffectCount: state.activeEffectCount + 1,
  };
}

export function decrementActiveEffectCount<
  T extends {
    activeEffectCount: number;
  },
>(state: T): T {
  return {
    ...state,
    activeEffectCount:
      state.activeEffectCount - 1 < 0 ? 0 : state.activeEffectCount - 1,
  };
}
