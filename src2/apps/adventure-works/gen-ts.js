const generator = require('openapi-ts-generator');
const diagramGenerator = require('openapi-mermaid');

async function generateTsModels() {
  //Adventure Works OData
  console.log('** Adventure Works OData Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://awod.ikemtz.com/swagger/v1/swagger.json',
    outputPath: './apps/adventure-works/src/app/models/odata',
    genAngularFormGroups: true,
    typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    pathUrlFormattingCallBack: (val) => 'aw-odata' + val,
  });

  diagramGenerator.generateDiagrams({
    openApiJsonUrl: 'https://awod.ikemtz.com/swagger/v1/swagger.json',
    outputPath: './apps/adventure-works/diagrams/odata',
  });

  //Adventure Works WebApi
  console.log('** Adventure Works WebApi Models **');
  await generator.generateTsModels({
    openApiJsonUrl: 'https://awwa.ikemtz.com/swagger/v1/swagger.json',
    outputPath: './apps/adventure-works/src/app/models/webapi',
    genAngularFormGroups: true,
    valuePropertyTypeFilterCallBack: (val, i, arr) =>
      !val.name.startsWith('created') && !val.name.startsWith('updated'),
    pathUrlFormattingCallBack: (val) =>
      'aw-webapi' + val.replace('.{format}', '.json'),
  });

  diagramGenerator.generateDiagrams({
    openApiJsonUrl: 'https://awwa.ikemtz.com/swagger/v1/swagger.json',
    outputPath: './apps/adventure-works/diagrams/webapi',
  });
}

generateTsModels();
