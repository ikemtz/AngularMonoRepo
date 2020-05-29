import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import { readFirst } from '@nrwl/angular/testing';
import * as pluralize from 'pluralize';

const collectionPath = path.join(__dirname, '../collection.json');

describe('imng-module', () => {
  it('works - Competencies', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const options: IOptions = {
      name: 'competency',
      swaggerJsonUrl: 'https://im-wa-cmpo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
      path: './test',
      swaggerProperties: [],
      storeName: 'competencies',
      appPrefix: 'nrcrn'
    };
    const tree = await readFirst(runner.runSchematicAsync('imng-module', options, Tree.empty()));

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
    tree.files.forEach(file => {
      let content = tree.get(file)?.content.toString();
      if (content) {
        content = content.toLowerCase();
        expect(content.indexOf('competencys')).toBeLessThan(0);
      }
    })
  });
});
