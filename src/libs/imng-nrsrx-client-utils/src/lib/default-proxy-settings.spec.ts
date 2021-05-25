import { defaultProxySettings, defaultProxyDebugSettings } from './default-proxy-settings';

describe('defaultProxyDebugSettings', () => {
  it('should return expected value', () => {
    expect(defaultProxyDebugSettings).toMatchSnapshot();
  });
});

describe('defaultProxySettings', () => {
  it('should return expected value', () => {
    expect(defaultProxySettings).toMatchSnapshot();
  });
  it('should cache headers', () => {
    expect(defaultProxySettings.onProxyRes({ headers: {} })).toMatchSnapshot();
  });
});
