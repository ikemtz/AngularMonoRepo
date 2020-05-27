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
      name: 'certification',
      swaggerJsonUrl: 'https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
      path: './test',
      swaggerProperties: [],
      storeName: 'certifications'
    };
    const tree = await readFirst(runner.runSchematicAsync('imng-list', options, Tree.empty()));

    expect(tree.files).toEqual([
      '/test/certifications-list/index.ts',
      '/test/certifications-list/list.component.html',
      '/test/certifications-list/list.component.scss',
      '/test/certifications-list/list.component.spec.ts',
      '/test/certifications-list/list.component.ts',
      '/test/certifications-list/list.facade.spec.ts',
      '/test/certifications-list/list.facade.ts',
    ]);

    const htmlFile = tree.get('/test/certifications-list/list.component.html');
    expect(htmlFile?.content.toString()).toContain('[field]="props.IS_ENABLED"');

    const componentFile = tree.get('/test/certifications-list/list.component.ts');
    expect(componentFile?.content.toString()).toContain("CertificationProperties.EXPIRES_ON_UTC,");

    const facadeSpecFile = tree.get('/test/certifications-list/list.facade.spec.ts');
    expect(facadeSpecFile?.content.toString()).toContain("[CertificationProperties.IS_ENABLED]: true,");
    expect(facadeSpecFile?.content.toString()).toContain(" [CertificationProperties.NAME]: 'NAME',");

  });
});
