// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  msalConfig: {
    auth: {
      clientId: 'e5cac4cd-a55c-4a2d-951a-71b779137dba',
      authority: 'https://ikemtzB2C.b2clogin.com/ikemtzB2C.onmicrosoft.com/b2c_1_login',
      redirectUri: 'http://localhost:4200/callback.html',
      tmp_clientSecret: 'CmDY`#g!7l/T71vuH3)28bkJ',
      validateAuthority: false,
      navigateToLoginRequestUrl: true,
    },
  },
  production: false,
  appInsights: { instrumentationKey: 'abcb7484-6a9c-48a9-b44a-0ee4364aabc1' },
  endPoints: {
    emplMs: {
      ODataEndpoint: 'employeesOData/odata/v1/employees',
      ApiEndpoint: 'employeesWebApi/api/v1/employees.json',
      CertsApiEndpoint: 'employeesWebApi/api/v1/employeeCertifications.json',
    },
    certMs: {
      ODataEndpoint: 'certificationsOData/odata/v1/certifications',
      ApiEndpoint: 'certificationsWebApi/api/v1/certifications.json',
    },
  },
  auth0_options: {
    authority: 'https://nurser.auth0.com',
    client_id: 'NlqroNO9CSspZo7UUsW5Cq8jRrWy1vbn',
    audience: 'nurser',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
