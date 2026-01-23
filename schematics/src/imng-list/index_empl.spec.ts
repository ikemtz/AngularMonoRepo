import { describe, expect, test } from '@jest/globals';
import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'node:path';
import { IOptions } from '../shared';
import { classify } from '@angular-devkit/core/src/utils/strings';
import { plural } from 'pluralize';

const collectionPath = path.join(__dirname, '../collection.json');

describe('imng-list', () => {
  test('generation works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const options: IOptions = {
      name: 'employee',
      openApiJsonUrl:
        'https://raw.githubusercontent.com/ikemtz/AngularMonoRepo/master/schematics/open-api-docs/nrcrn-empl-odata.json',
      path: './test',
      swaggerProperties: [],
      storeName: 'employees',
      appPrefix: 'nrcrn',
    };
    const tree: UnitTestTree = await runner.runSchematic('imng-list', options, Tree.empty());

    expect(tree.files).toEqual([
      `/test/${plural(options.name)}-list/index.ts`,
      `/test/${plural(options.name)}-list/list.component.html`,
      `/test/${plural(options.name)}-list/list.component.scss`,
      `/test/${plural(options.name)}-list/list.component.spec.ts`,
      `/test/${plural(options.name)}-list/list.component.ts`,
      `/test/${plural(options.name)}-list/list.facade.spec.ts`,
      `/test/${plural(options.name)}-list/list.facade.ts`,
      `/test/${plural(options.name)}-list/list.grid-state.ts`,
    ]);

    const htmlFile = tree.get(
      `/test/${plural(options.name)}-list/list.component.html`
    );
    let content = htmlFile?.content.toString();
    expect(content).toContain('[field]="props.ADDRESS_LINE_1"');
    expect(content).toContain(`<${options.appPrefix}-${options.name}-add `);
    expect(content).toContain(`<${options.appPrefix}-${options.name}-edit `);
    expect(content).toMatchSnapshot('list.component.html');
    const gridStateFile = tree.get(
      `/test/${plural(options.name)}-list/list.grid-state.ts`
    );
    content = gridStateFile?.content.toString();
    expect(content).toContain(
      `${classify(options.name)}Properties.ADDRESS_LINE_1,`
    );
    expect(content).toMatchSnapshot();

    const componentFile = tree.get(
      `/test/${plural(options.name)}-list/list.component.ts`
    );
    content = componentFile?.content.toString();
    expect(content).toContain(`'${options.appPrefix}-${options.name}-list'`);

    const facadeSpecFile = tree.get(
      `/test/${plural(options.name)}-list/list.facade.spec.ts`
    );
    content = facadeSpecFile?.content.toString();
    expect(content).toContain(
      `useValue: { get: jest.fn(() => of(createODataPayload([createTestEmployee()]))) } },`
    );
    expect(content).toContain(
      `store.dispatch(employeeActionTypes.loadEmployeesSuccess(createODataResult([createTestEmployee(), createTestEmployee()])));`
    );
  });
});
