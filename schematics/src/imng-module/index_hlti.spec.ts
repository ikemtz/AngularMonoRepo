import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import { readFirst } from '@nrwl/angular/testing';
import * as pluralize from 'pluralize';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';

const collectionPath = path.join(__dirname, '../collection.json');

describe('imng-module', () => {
  it('works - Health Items', async done => {
    try {
      const runner = new SchematicTestRunner('schematics', collectionPath);
      const options: IOptions = {
        name: 'healthItem',
        openApiJsonUrl: 'https://im-wa-hlto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
        path: './test',
        swaggerProperties: [],
        storeName: 'healthItems',
        appPrefix: 'nrcrn'
      };
      const tree : UnitTestTree = await readFirst(runner.runSchematicAsync('imng-module', options, Tree.empty()) as any);

      expect(tree.files).toEqual([
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}.module.spec.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}.module.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}.routing.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/+state/${dasherize(options.name)}.actions.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/+state/${dasherize(options.name)}.effects.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/+state/${dasherize(options.name)}.reducer.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/+state/${dasherize(options.name)}.selectors.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-list/index.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-list/list.component.html`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-list/list.component.scss`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-list/list.component.spec.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-list/list.component.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-list/list.facade.spec.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-list/list.facade.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-crud/add-edit.component.html`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-crud/add-edit.component.scss`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-crud/add.component.spec.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-crud/add.component.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-crud/api.service.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-crud/base-entry.component.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-crud/crud.facade.spec.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-crud/crud.facade.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-crud/edit.component.spec.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-crud/edit.component.ts`,
        `/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-crud/index.ts`,
      ]);

      const effectsFile = tree.get(`/test/${pluralize(dasherize(options.name))}-module/+state/${dasherize(options.name)}.effects.ts`);
      let content = effectsFile?.content.toString();
      expect(content).toContain(`import { ${classify(options.name)}ApiService } from '../${dasherize(pluralize(options.name))}-crud';`);

      const listFacadeSpecFile = tree.get(`/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-list/list.facade.spec.ts`);
      content = listFacadeSpecFile?.content.toString();
      expect(content).toContain(`expect(httpClient.get).toBeCalledWith('${dasherize(pluralize(options.name))}-odata/odata/v1/${classify(pluralize(options.name))}?&$count=true');`);
      done();
    }
    catch (err) {
      done.fail(err);
    }
  });
});
