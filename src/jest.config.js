const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/imng-kendo-odata',
    '<rootDir>/libs/imng-auth0-oidc',
    '<rootDir>/libs/imng-kendo-grid-odata',
    '<rootDir>/libs/imng-application-insights-ngrx',
    '<rootDir>/libs/imng-kendo-data-entry',
    '<rootDir>/libs/imng-ngrx-utils',
    '<rootDir>/libs/imng-nrsrx-client-utils',
    '<rootDir>/libs/imng-ngxb-typeahead',
    '<rootDir>/libs/imng-kendo-chart-odata',
    '<rootDir>/apps/imng-az-func-configr',
    '<rootDir>/libs/imng-snippets',
    '<rootDir>/libs/imng-kendo-grid',
    '<rootDir>/apps/nurse-cron',
    '<rootDir>/libs/imng-signalr-ngrx',
    '<rootDir>/apps/imng-inventory',
    '<rootDir>/libs/imng-ngrx-idle',
    '<rootDir>/apps/adventure-works',
    '<rootDir>/libs/imng-angular-core',
  ],
};
