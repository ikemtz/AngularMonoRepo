import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import * as pluralize from 'pluralize';
import { readFirst } from '@nrwl/angular/testing';
import { classify } from '@angular-devkit/core/src/utils/strings';


const collectionPath = path.join(__dirname, `../collection.json`);


describe(`imng-module`, () => {
  it(`works - employees`, async () => {
    const runner = new SchematicTestRunner(`schematics`, collectionPath);
    const options: IOptions = {
      name: `employee`,
      swaggerJsonUrl: `https://im-wa-empo-nrcrn.azurewebsites.net/swagger/v1/swagger.json`,
      path: `./test`,
      swaggerProperties: [],
      storeName: `employees`,
      appPrefix: ''
    };
    const tree = await readFirst(runner.runSchematicAsync(`imng-module`, options, Tree.empty()));

    expect(tree.files).toEqual([
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}.module.spec.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}.module.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}.routing.module.ts`,
      `/test/${pluralize(options.name)}-module/+state/${options.name}.actions.ts`,
      `/test/${pluralize(options.name)}-module/+state/${options.name}.effects.ts`,
      `/test/${pluralize(options.name)}-module/+state/${options.name}.reducer.ts`,
      `/test/${pluralize(options.name)}-module/+state/${options.name}.selectors.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-list/index.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-list/list.component.html`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-list/list.component.scss`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-list/list.component.spec.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-list/list.component.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-list/list.facade.spec.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-list/list.facade.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-crud/add-edit.component.html`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-crud/add-edit.component.scss`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-crud/add.component.spec.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-crud/add.component.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-crud/api.service.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-crud/base-entry.component.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-crud/crud.facade.spec.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-crud/crud.facade.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-crud/edit.component.spec.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-crud/edit.component.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(options.name)}-crud/index.ts`,
    ]);
    
    const effectsFile = tree.get(`/test/${pluralize(options.name)}-module/+state/${options.name}.effects.ts`,);
    const content = effectsFile?.content.toString();
    expect(content).toContain(`${options.name}ActionTypes.load${classify(pluralize(options.name))}Request(store[from${classify(pluralize(options.name))}Reducer.${pluralize(options.name).toUpperCase()}_FEATURE_KEY].gridODataState),`);
 
  });
});
