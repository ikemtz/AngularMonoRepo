const tsGenerator = require('openapi-ts-generator');
const meraidGenerator = require('openapi-mermaid');

async function generateTsModels() {
  //Certifications
  console.log('** Certifications OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/certifications-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Certifications OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/certifications-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
  });

  //Competencies
  console.log('** Competencies OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-cmpo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/competencies-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Competencies OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/competencies-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
  });

  //Employees
  console.log('** Employees OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-empo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/employees-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Employees OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-empo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/employees-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
  });

  //HealthItems
  console.log('** HealthItems OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-hlto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/health-items-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Health Items OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-hlto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/health-items-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
  });

  //Schedules
  console.log('** Schedules OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-scdo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/schedules-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Schedules OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-scdo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/schedules-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
  });

  //Units
  console.log('** Units OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-unto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/units-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Units OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-unto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/units-odata/',
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
  });
}

generateTsModels();
