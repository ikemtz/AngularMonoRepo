const defaultDebugProxySettings = {
  secure: true,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyRes: (proxyRes) =>
    (proxyRes.headers['Cache-Control'] = `max-age=2590000, public`),
};
const PROXY_CONFIG = {
  '/employees-odata': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-empo-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/employees-odata': '',
    },
  },
  '/employees-webapi': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-empa-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/employees-webapi': '',
    },
  },
  '/competencies-odata': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-cmpo-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/competencies-odata': '',
    },
  },
  '/competencies-webapi': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-cmpa-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/competencies-webapi': '',
    },
  },
};
module.exports = PROXY_CONFIG;
