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
      name: 'certification',
      swaggerJsonUrl: 'https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
      path: './test',
      swaggerProperties: [],
      storeName: 'certifications'
    };
    const tree = await readFirst(runner.runSchematicAsync('imng-crud', options, Tree.empty()));

    expect(tree.files).toEqual([
      '/test/certifications-crud/add-edit.component.html',
      '/test/certifications-crud/add-edit.component.scss',
      '/test/certifications-crud/add.component.spec.ts',
      '/test/certifications-crud/add.component.ts',
      '/test/certifications-crud/api.service.ts',
      '/test/certifications-crud/base-entry.component.ts',
      '/test/certifications-crud/crud.facade.spec.ts',
      '/test/certifications-crud/crud.facade.ts',
      '/test/certifications-crud/edit.component.spec.ts',
      '/test/certifications-crud/edit.component.ts',
      '/test/certifications-crud/index.ts',
    ]);

    const htmlFile = tree.get('/test/certifications-crud/add-edit.component.html');
    expect(htmlFile?.content.toString()).toContain('[formControlName]="props.IS_ENABLED"');

    const addComponentSpecFile = tree.get('/test/certifications-crud/add.component.spec.ts');
    expect(addComponentSpecFile?.content.toString()).toContain("[CertificationProperties.IS_ENABLED]: true,");

    const facadeSpecFile = tree.get('/test/certifications-crud/crud.facade.spec.ts');
    expect(facadeSpecFile?.content.toString()).toContain("[CertificationProperties.IS_ENABLED]: true,");

    const editComponentSpecFile = tree.get('/test/certifications-crud/edit.component.spec.ts');
    expect(editComponentSpecFile?.content.toString()).toContain("[CertificationProperties.IS_ENABLED]: true,");
  });
});
