import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import { readFirst } from '@nrwl/angular/testing';
import * as pluralize from 'pluralize';
import { classify } from '@angular-devkit/core/src/utils/strings';

const collectionPath = path.join(__dirname, '../collection.json');


describe('imng-crud', () => {
  it('works', async done => {
    try {
      const runner = new SchematicTestRunner('schematics', collectionPath);
      const options: IOptions = {
        name: 'employee',
        openApiJsonUrl: 'https://im-wa-empo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
        path: './test',
        swaggerProperties: [],
        storeName: 'employees',
        appPrefix: 'nrcrn'
      };
      const tree: UnitTestTree = await readFirst(runner.runSchematicAsync('imng-crud', options, Tree.empty()));

      expect(tree.files).toEqual([
        '/test/employees-crud/add-edit.component.html',
        '/test/employees-crud/add-edit.component.scss',
        '/test/employees-crud/add.component.spec.ts',
        '/test/employees-crud/add.component.ts',
        '/test/employees-crud/api.service.ts',
        '/test/employees-crud/base-entry.directive.ts',
        '/test/employees-crud/crud.facade.spec.ts',
        '/test/employees-crud/crud.facade.ts',
        '/test/employees-crud/edit.component.spec.ts',
        '/test/employees-crud/edit.component.ts',
        '/test/employees-crud/index.ts',
      ]);

      const htmlFile = tree.get(`/test/${pluralize(options.name)}-crud/add-edit.component.html`);
      let content = htmlFile?.content.toString();
      expect(content).toContain('[formControlName]="props.ADDRESS_LINE_1"');
      expect(content).toContain('<div *ngIf="formControlErrors(props.HIRE_DATE).required">Employee hire date is required</div>');
      expect(content).toContain('<label for="hire_date" class="control-label mr-4">Hire Date:</label>');

      const addComponent = tree.get(`/test/${pluralize(options.name)}-crud/add.component.ts`);
      content = addComponent?.content.toString();
      expect(content).toContain(`'${options.appPrefix}-${options.name}-add'`);

      const addComponentSpecFile = tree.get(`/test/${pluralize(options.name)}-crud/add.component.spec.ts`);
      content = addComponentSpecFile?.content.toString();
      expect(content).toContain(`[${classify(options.name)}Properties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',`);
      expect(content).toContain(`[${classify(options.name)}Properties.STATE]: 'ST',`);
      expect(content).toContain(`birthDate: expect.any(Date),`);

      const facadeSpecFile = tree.get(`/test/${pluralize(options.name)}-crud/crud.facade.spec.ts`);
      content = facadeSpecFile?.content.toString();
      expect(content).toContain(`[${classify(options.name)}Properties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',`);
      expect(content).toContain(`[${classify(options.name)}Properties.STATE]: 'ST',`);

      const editComponent = tree.get(`/test/${pluralize(options.name)}-crud/edit.component.ts`);
      content = editComponent?.content.toString();
      expect(content).toContain(`'${options.appPrefix}-${options.name}-edit'`);

      const editComponentSpecFile = tree.get('/test/employees-crud/edit.component.spec.ts');
      content = editComponentSpecFile?.content.toString();
      expect(content).toContain(`[${classify(options.name)}Properties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',`);
      expect(content).toContain(`[${classify(options.name)}Properties.STATE]: 'ST',`);
      expect(content).toContain(`birthDate: expect.any(Date),`);
      done();
    }
    catch (err) {
      done.fail(err);
    }
  });
});
