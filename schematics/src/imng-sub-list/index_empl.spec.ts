import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';

const collectionPath = path.join(__dirname, '../collection.json');

describe('imng-sub-list', () => {
  test('generation works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const options: IOptions = {
      name: 'employeeCertification',
      parentName: 'employee',
      openApiJsonUrl:
        'https://raw.githubusercontent.com/ikemtz/AngularMonoRepo/master/schematics/open-api-docs/nrcrn-empl-odata.json',
      path: './test',
      swaggerProperties: [],
      appPrefix: 'nrcrn',
    };
    const tree: UnitTestTree = await runner.runSchematic('imng-sub-list', options, Tree.empty());

    expect(tree.files).toEqual([
      `/test/+state/employee-certification.actions.ts`,
      `/test/+state/employee-certification.effects.ts`,
      `/test/+state/employee-certification.selectors.ts`,
      `/test/models/ext-employee.ts`,
      "/test/employee-certifications-list/api.service.ts",
      "/test/employee-certifications-list/index.ts",
      "/test/employee-certifications-list/list.component.html",
      "/test/employee-certifications-list/list.component.scss",
      "/test/employee-certifications-list/list.component.spec.ts",
      "/test/employee-certifications-list/list.component.ts",
      "/test/employee-certifications-list/list.facade.spec.ts",
      "/test/employee-certifications-list/list.facade.ts",
    ]);

    const htmlFile = tree.get(
      `/test/employee-certifications-list/list.component.html`
    );
    let content = htmlFile?.content.toString();
    expect(content).toContain('[field]="props.CERTIFICATION_ID');

    const componentFile = tree.get(
      `/test/employee-certifications-list/list.component.ts`
    );
    content = componentFile?.content.toString();
    expect(content).toContain(
      `EmployeeCertificationProperties.CERTIFICATION_ID,`
    );
    expect(content).toContain(`nrcrn-employee-certification-list`);

    const facadeSpecFile = tree.get(
      `/test/employee-certifications-list/list.facade.spec.ts`
    );
    content = facadeSpecFile?.content.toString();
    expect(content).toContain(
      `{ ...createTestEmployee(),`
    );
  });
});
