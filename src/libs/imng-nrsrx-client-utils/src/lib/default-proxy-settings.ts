
export const defaultProxySettings = {

  secure: true,
  changeOrigin: true,
  onProxyRes: (proxyRes: { headers: { [x: string]: string; }; }) =>
    proxyRes.headers['Cache-Control'] = `max-age=2590000, public`
};
export const defaultProxyDebugSettings =
{
  ...defaultProxySettings,
  logLevel: 'debug',
};
