const generator = require('openapi-ts-generator');

async function generateTsModels() {
  //Employees
  console.log('** Employees OData Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://im-wa-empo-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/modules/models/emp-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
  });
  console.log('** Employees WebApi Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://im-wa-empa-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/modules/models/emp-api/',
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
  });
  //Certifications
  console.log('** Certifications OData Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://im-wa-crto-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/modules/models/cert-odata-models/',
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
  });
  console.log('** Certifications WebApi Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://im-wa-crta-nrsr.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/modules/models/cert-api-models/',
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
  });
}

genTypeScriptModels();
