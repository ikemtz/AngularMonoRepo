const generator = require('openapi-ts-generator');

async function genTypeScriptModels() {
  //Employees
  console.log("** Employees OData Models **");
  await generator.generateTsModels(
    'https://im-wa-empo-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    './apps/nurse-cron/src/app/modules/models/emp-odata/'
  );
  console.log("** Employees WebApi Models **");
  await generator.generateTsModels(
    'https://im-wa-empa-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    './apps/nurse-cron/src/app/modules/models/emp-api/'
  );

  //Certifications
  console.log("** Certifications OData Models **");
  await generator.generateTsModels(
    'https://im-wa-crto-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    './apps/nurse-cron/src/app/modules/models/cert-odata-models/'
  );
  console.log("** Certifications WebApi Models **");
  await generator.generateTsModels(
    'https://im-wa-crta-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    './apps/nurse-cron/src/app/modules/models/cert-api-models/'
  );
}

genTypeScriptModels();
