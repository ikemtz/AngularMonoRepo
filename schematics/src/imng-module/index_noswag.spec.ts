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
      path: './test',
      swaggerProperties: [],
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
    ]);
  });
});
