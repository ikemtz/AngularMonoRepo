import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import { readFirst } from 'imng-ngrx-utils/testing';
import * as pluralize from 'pluralize';
import { dasherize, classify } from '@angular-devkit/core/src/utils/strings';

const collectionPath = path.join(__dirname, '../collection.json');

describe('imng-module', () => {
  it('works - Competencies', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const options: IOptions = {
      name: 'competency',
      openApiJsonUrl: 'https://im-wa-cmpo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
      openApiJsonFileName: '../../open-api-docs/nrcrn-comp-odata.json',
      path: './test',
      swaggerProperties: [],
      storeName: 'competencies',
      appPrefix: 'nrcrn'
    };
    const tree: UnitTestTree = await readFirst(runner.runSchematicAsync('imng-module', options, Tree.empty()));

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
    let content: string | undefined = '';
    tree.files.forEach(file => {
      content = tree.get(file)?.content.toString();
      if (content) {
        content = content.toLowerCase();
        expect(content.indexOf('competencys')).toBeLessThan(0);
      }
    });

    const effectsFile = tree.get(`/test/${pluralize(dasherize(options.name))}-module/+state/${dasherize(options.name)}.effects.ts`);
    content = effectsFile?.content.toString();
    expect(content).toContain(`${options.name}ActionTypes.reload${classify(pluralize(options.name))}Request())),`);
    expect(content).toContain(`import { ${classify(options.name)}ApiService } from '../${dasherize(pluralize(options.name))}-crud';`);

    const listFacadeSpecFile = tree.get(`/test/${pluralize(dasherize(options.name))}-module/${dasherize(pluralize(options.name))}-list/list.facade.spec.ts`);
    content = listFacadeSpecFile?.content.toString();
    expect(content).toContain(`expect(httpClient.get).toBeCalledWith('${dasherize(pluralize(options.name))}-odata/odata/v1/${classify(pluralize(options.name))}?&$count=true');`);

  });
});
