const generator = require('openapi-ts-generator');

async function generateTsModels() {
  //Certifications
  console.log('** Certifications OData Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/modules/models/certifications-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
  });

  //Competencies
  console.log('** Competencies OData Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://im-wa-cmpo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/modules/models/competencies-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
  });

  //Employees
  console.log('** Employees OData Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://im-wa-empo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/modules/models/employees-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
  });

  //HealthItems
  console.log('** HealthItems OData Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://im-wa-hlto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/modules/models/health-items-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
  });

  //Schedules
  console.log('** Schedules OData Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://im-wa-scdo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/modules/models/schedules-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
  });

  //Units
  console.log('** Units OData Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://im-wa-unto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/modules/models/units-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
  });
}

generateTsModels();
