import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import { readFirst } from '@nrwl/angular/testing';

const collectionPath = path.join(__dirname, '../collection.json');


describe('imng-list', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const options: IOptions = {
      name: 'employee',
      swaggerJsonUrl: 'https://im-wa-empo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
      path: './test',
      swaggerProperties: [],
      storeName: 'employees'
    };
    const tree = await readFirst(runner.runSchematicAsync('imng-list', options, Tree.empty()));

    expect(tree.files).toEqual([
      '/test/employees-list/index.ts',
      '/test/employees-list/list.component.html',
      '/test/employees-list/list.component.scss',
      '/test/employees-list/list.component.spec.ts',
      '/test/employees-list/list.component.ts',
      '/test/employees-list/list.facade.spec.ts',
      '/test/employees-list/list.facade.ts',
    ]);
  });
});
