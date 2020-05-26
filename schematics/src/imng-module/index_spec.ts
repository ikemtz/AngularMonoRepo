import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import { readFirst } from '@nrwl/angular/testing';


const collectionPath = path.join(__dirname, '../collection.json');


describe('imng-module', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const options: IOptions = {
      name: 'employee',
      swaggerJsonUrl: 'https://im-wa-empo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
      path: './test',
      swaggerProperties: [],
      storeName: 'employees'
    };
    const tree = await readFirst(runner.runSchematicAsync('imng-module', options, Tree.empty()));

    expect(tree.files).toEqual([
      '/test/employees-module/employees.module.spec.ts',
      '/test/employees-module/employees.module.ts',
      '/test/employees-module/employees.routing.module.ts',
      '/test/employees-module/+state/employee.actions.ts',
      '/test/employees-module/+state/employee.effects.ts',
      '/test/employees-module/+state/employee.reducer.ts',
      '/test/employees-module/+state/employee.selectors.ts',
      '/test/employees-module/employees-list/index.ts',
      '/test/employees-module/employees-list/list.component.html',
      '/test/employees-module/employees-list/list.component.scss',
      '/test/employees-module/employees-list/list.component.spec.ts',
      '/test/employees-module/employees-list/list.component.ts',
      '/test/employees-module/employees-list/list.facade.spec.ts',
      '/test/employees-module/employees-list/list.facade.ts',
      '/test/employees-module/employees-crud/add-edit.component.html',
      '/test/employees-module/employees-crud/add-edit.component.scss',
      '/test/employees-module/employees-crud/add.component.spec.ts',
      '/test/employees-module/employees-crud/add.component.ts',
      '/test/employees-module/employees-crud/api.service.ts',
      '/test/employees-module/employees-crud/base-entry.component.ts',
      '/test/employees-module/employees-crud/crud.facade.spec.ts',
      '/test/employees-module/employees-crud/crud.facade.ts',
      '/test/employees-module/employees-crud/edit.component.spec.ts',
      '/test/employees-module/employees-crud/edit.component.ts',
      '/test/employees-module/employees-crud/index.ts',
    ]);
  });
});
