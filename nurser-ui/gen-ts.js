const generator = require('odata-ts-generator');

async function genModels() {
  //Employees
  await generator.generateTsModels(
    'https://im-wa-empo-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    './apps/nurser/src/app/modules/employees/models/odata-models/'
  );
  await generator.generateTsModels(
    'https://im-wa-empa-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    './apps/nurser/src/app/modules/employees/models/api-models/'
  );

  //Certifications
  await generator.generateTsModels(
    'https://im-wa-crto-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    './apps/nurser/src/app/modules/certifications/models/odata-models/'
  );
  await generator.generateTsModels(
    'https://im-wa-crta-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    './apps/nurser/src/app/modules/certifications/models/api-models/'
  );
}

genModels();
