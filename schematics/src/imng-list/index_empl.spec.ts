import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import { readFirst } from '@nrwl/angular/testing';
import { classify } from '@angular-devkit/core/src/utils/strings';
import * as pluralize from 'pluralize';

const collectionPath = path.join(__dirname, '../collection.json');


describe('imng-list', () => {
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
      const tree: UnitTestTree = await readFirst(runner.runSchematicAsync('imng-list', options, Tree.empty()) as any);

      expect(tree.files).toEqual([
        `/test/${pluralize(options.name)}-list/index.ts`,
        `/test/${pluralize(options.name)}-list/list.component.html`,
        `/test/${pluralize(options.name)}-list/list.component.scss`,
        `/test/${pluralize(options.name)}-list/list.component.spec.ts`,
        `/test/${pluralize(options.name)}-list/list.component.ts`,
        `/test/${pluralize(options.name)}-list/list.facade.spec.ts`,
        `/test/${pluralize(options.name)}-list/list.facade.ts`,
      ]);

      const htmlFile = tree.get(`/test/${pluralize(options.name)}-list/list.component.html`);
      let content = htmlFile?.content.toString();
      expect(content).toContain('[field]="props.ADDRESS_LINE_1"');
      expect(content).toContain(`<${options.appPrefix}-${options.name}-add `);
      expect(content).toContain(`<${options.appPrefix}-${options.name}-edit `);

      const componentFile = tree.get(`/test/${pluralize(options.name)}-list/list.component.ts`);
      content = componentFile?.content.toString();
      expect(content).toContain(`${classify(options.name)}Properties.ADDRESS_LINE_1,`);
      expect(content).toContain(`'${options.appPrefix}-${options.name}-list'`);

      const facadeSpecFile = tree.get(`/test/${pluralize(options.name)}-list/list.facade.spec.ts`);
      content = facadeSpecFile?.content.toString();
      expect(content).toContain(`[${classify(options.name)}Properties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',`);
      expect(content).toContain(`[${classify(options.name)}Properties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',`);
      done();
    }
    catch (err) {
      done.fail(err);
    }
  });
});
