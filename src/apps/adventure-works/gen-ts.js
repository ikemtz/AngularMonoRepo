const generator = require('openapi-ts-generator');
const diagramGenerator = require('openapi-mermaid');

async function generateTsModels() {
  //Adventure Works OData
  console.log('** Adventure Works OData Models **');
  await generator.generateTsModels({
    openApiJsonUrl:
      'https://awod-ikemtz.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/adventure-works/src/app/models/odata',
    genAngularFormGroups: true,
    genAngularFormGroupsWithDefaultValues: true,
    typeFilterCallBack: generator.nrsrxTypeFilterCallBack,
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    pathUrlFormattingCallBack: (val) => 'aw-odata' + val,
  });

  diagramGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://awwa-ikemtz.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: '../docs/adventure-works-diagrams/odata',
  });

  //Adventure Works WebApi
  console.log('** Adventure Works WebApi Models **');
  await generator.generateTsModels({
    openApiJsonUrl:
      'https://awwa-ikemtz.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: './apps/adventure-works/src/app/models/webapi',
    genAngularFormGroups: true,
    genAngularFormGroupsWithDefaultValues: true,
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    pathUrlFormattingCallBack: (val) =>
      'aw-webapi' + val.replace('.{format}', '.json'),
  });

  diagramGenerator.generateDiagrams({
    openApiJsonUrl:
      'https://awwa-ikemtz.azurewebsites.net/swagger/v1/swagger.json',
    outputPath: '../docs/adventure-works-diagrams/webapi',
  });
}

await generateTsModels();
