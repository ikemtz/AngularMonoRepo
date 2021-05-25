import { defaultProxySettings, defaultProxyDebugSettings } from './default-proxy-settings';

describe('defaultProxyDebugSettings', () => {
  it('should return expected value', () => {
    const result = defaultProxyDebugSettings();
    expect(result).toMatchSnapshot(result);
  });
});

describe('defaultProxySettings', () => {
  it('should return expected value', () => {
    const result = defaultProxySettings();
    expect(result).toMatchSnapshot(result);
  });
});
