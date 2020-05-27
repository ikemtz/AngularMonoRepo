import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import { readFirst } from '@nrwl/angular/testing';

const collectionPath = path.join(__dirname, '../collection.json');


describe('imng-crud', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const options: IOptions = {
      name: 'employee',
      swaggerJsonUrl: 'https://im-wa-empo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
      path: './test',
      swaggerProperties: [],
      storeName: 'employees'
    };
    const tree = await readFirst(runner.runSchematicAsync('imng-crud', options, Tree.empty()));

    expect(tree.files).toEqual([
      '/test/employees-crud/add-edit.component.html',
      '/test/employees-crud/add-edit.component.scss',
      '/test/employees-crud/add.component.spec.ts',
      '/test/employees-crud/add.component.ts',
      '/test/employees-crud/api.service.ts',
      '/test/employees-crud/base-entry.component.ts',
      '/test/employees-crud/crud.facade.spec.ts',
      '/test/employees-crud/crud.facade.ts',
      '/test/employees-crud/edit.component.spec.ts',
      '/test/employees-crud/edit.component.ts',
      '/test/employees-crud/index.ts',
    ]);

    const htmlFile = tree.get('/test/employees-crud/add-edit.component.html');
    expect(htmlFile?.content.toString()).toContain('[formControlName]="props.ADDRESS_LINE_1"');

    const addComponentSpecFile = tree.get('/test/employees-crud/add.component.spec.ts');
    expect(addComponentSpecFile?.content.toString()).toContain("[EmployeeProperties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',");
    expect(addComponentSpecFile?.content.toString()).toContain("[EmployeeProperties.STATE]: 'ST',");

    const facadeSpecFile = tree.get('/test/employees-crud/crud.facade.spec.ts');
    expect(facadeSpecFile?.content.toString()).toContain("[EmployeeProperties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',");
    expect(facadeSpecFile?.content.toString()).toContain("[EmployeeProperties.STATE]: 'ST',");

    const editComponentSpecFile = tree.get('/test/employees-crud/edit.component.spec.ts');
    expect(editComponentSpecFile?.content.toString()).toContain("[EmployeeProperties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',");
    expect(editComponentSpecFile?.content.toString()).toContain("[EmployeeProperties.STATE]: 'ST',");
  });
});
