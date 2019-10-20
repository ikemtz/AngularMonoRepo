export const environment = {
  production: true,
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
