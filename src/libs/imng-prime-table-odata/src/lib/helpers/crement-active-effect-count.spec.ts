import {
  decrementActiveEffectCount,
  incrementActiveEffectCount,
} from './crement-active-effect-count';

describe('incrementActiveEffectCount', () => {
  it('should work', () => {
    const result = incrementActiveEffectCount({
      activeEffectCount: 9,
      prop1: '😈',
    });
    expect(result).toMatchSnapshot();
  });
});
describe('decrementActiveEffectCount', () => {
  it('should work', () => {
    const result = decrementActiveEffectCount({
      activeEffectCount: 19,
      prop1: '😈',
    });
    expect(result).toMatchSnapshot();
  });
  it('should handle zero', () => {
    const result = decrementActiveEffectCount({
      activeEffectCount: 0,
      prop1: '😈',
    });
    expect(result).toMatchSnapshot();
  });
  it('should handle below zero', () => {
    const result = decrementActiveEffectCount({
      activeEffectCount: -1,
      prop1: '😈',
    });
    expect(result).toMatchSnapshot();
  });
});
