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
      name: 'certification',
      swaggerJsonUrl: 'https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
      path: './test',
      swaggerProperties: [],
      storeName: 'certifications'
    };
    const tree = await readFirst(runner.runSchematicAsync('imng-module', options, Tree.empty()));

    expect(tree.files).toEqual([
      '/test/certifications-module/certifications.module.spec.ts',
      '/test/certifications-module/certifications.module.ts',
      '/test/certifications-module/certifications.routing.module.ts',
      '/test/certifications-module/+state/certification.actions.ts',
      '/test/certifications-module/+state/certification.effects.ts',
      '/test/certifications-module/+state/certification.reducer.ts',
      '/test/certifications-module/+state/certification.selectors.ts',
      '/test/certifications-module/certifications-list/index.ts',
      '/test/certifications-module/certifications-list/list.component.html',
      '/test/certifications-module/certifications-list/list.component.scss',
      '/test/certifications-module/certifications-list/list.component.spec.ts',
      '/test/certifications-module/certifications-list/list.component.ts',
      '/test/certifications-module/certifications-list/list.facade.spec.ts',
      '/test/certifications-module/certifications-list/list.facade.ts',
      '/test/certifications-module/certifications-crud/add-edit.component.html',
      '/test/certifications-module/certifications-crud/add-edit.component.scss',
      '/test/certifications-module/certifications-crud/add.component.spec.ts',
      '/test/certifications-module/certifications-crud/add.component.ts',
      '/test/certifications-module/certifications-crud/api.service.ts',
      '/test/certifications-module/certifications-crud/base-entry.component.ts',
      '/test/certifications-module/certifications-crud/crud.facade.spec.ts',
      '/test/certifications-module/certifications-crud/crud.facade.ts',
      '/test/certifications-module/certifications-crud/edit.component.spec.ts',
      '/test/certifications-module/certifications-crud/edit.component.ts',
      '/test/certifications-module/certifications-crud/index.ts',
    ]);
  });
});
