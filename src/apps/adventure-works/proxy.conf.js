const defaultDebugProxySettings = {
  secure: true,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyRes: (proxyRes) => (proxyRes.headers['Cache-Control'] = `max-age=2590000, public`),
};
const PROXY_CONFIG = {
  '/aw-odata': {
    ...defaultDebugProxySettings,
    target: 'https://awod.ikemtz.com',
    pathRewrite: {
      '^/aw-odata': '',
    },
  },
  '/aw-api': {
    ...defaultDebugProxySettings,
    target: 'https://awwa.ikemtz.com',
    pathRewrite: {
      '^/aw-api': '',
    },
  },
};
module.exports = PROXY_CONFIG;
