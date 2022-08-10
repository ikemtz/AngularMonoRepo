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
  '/buildings-odata': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-unto-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/buildings-odata': '',
    },
  },
  '/buildings-webapi': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-unta-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/buildings-webapi': '',
    },
  },
  '/units-odata': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-unto-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/units-odata': '',
    },
  },
  '/units-webapi': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-unta-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/units-webapi': '',
    },
  },
  '/certifications-odata': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-crto-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/certifications-odata': '',
    },
  },
  '/certifications-webapi': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-crta-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/certifications-webapi': '',
    },
  },
  '/health-items-odata': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-hlto-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/health-items-odata': '',
    },
  },
  '/health-items-webapi': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-hlta-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/health-items-webapi': '',
    },
  },
  '/schedules-odata': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-scdo-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/schedules-odata': '',
    },
  },
  '/schedules-webapi': {
    ...defaultDebugProxySettings,
    target: 'https://im-wa-scda-nrcrn.azurewebsites.net',
    pathRewrite: {
      '^/schedules-webapi': '',
    },
  },
};
module.exports = PROXY_CONFIG;
