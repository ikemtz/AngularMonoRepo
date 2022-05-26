const tsGenerator = require('openapi-ts-generator');
const meraidGenerator = require('openapi-mermaid');

async function generateTsModels() {
  //Certifications
  console.log('** Certifications OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/certifications-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Certifications OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/certifications-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
  });

  //Competencies
  console.log('** Competencies OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-cmpo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/competencies-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Competencies OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/competencies-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
  });

  //Employees
  console.log('** Employees OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-empo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/employees-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Employees OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-empo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/employees-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
  });

  //HealthItems
  console.log('** HealthItems OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-hlto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/health-items-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Health Items OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-hlto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/health-items-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
  });

  //Schedules
  console.log('** Schedules OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-scdo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/schedules-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Schedules OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-scdo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/schedules-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
  });

  //Units
  console.log('** Units OData Models **');
  await tsGenerator.generateTsModels({
    openApiJsonUrl:
      'https://im-wa-unto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/src/app/models/units-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    genAngularFormGroups: true,
  });

  console.log('** Units OData Diagrams **');
  await meraidGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://im-wa-unto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/nurse-cron/diagrams/units-odata/',
    typeFilterCallBack: tsGenerator.nrsrxTypeFilterCallBack,
  });
}

generateTsModels();
