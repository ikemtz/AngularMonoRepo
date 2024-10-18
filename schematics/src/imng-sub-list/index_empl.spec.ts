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

    expect(tree.files.sort()).toMatchSnapshot();

    const htmlFile = tree.get(
      `/test/employee-certifications-list/list.component.html`
    );
    let content = htmlFile?.content.toString();
    expect(content).toContain('[field]="props.CERTIFICATION_ID');

    const componentFile = tree.get(
      `/test/employee-certifications-list/list.component.ts`
    );
    content = componentFile?.content.toString();

    expect(content).toContain(`nrcrn-employee-certification-list`);

    const stateFile = tree.get(
      `/test/employee-certifications-list/list.grid-state.ts`
    );
    content = stateFile?.content.toString();

    expect(content).toContain(
      `EmployeeCertificationProperties.CERTIFICATION_ID,`
    );
    const facadeSpecFile = tree.get(
      `/test/employee-certifications-list/list.facade.spec.ts`
    );
    content = facadeSpecFile?.content.toString();
    expect(content).toContain(
      `{ ...createTestEmployee(),`
    );
  });
});
