import { beforeAll, describe, expect, test } from '@jest/globals';
import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'node:path';
import { IOptions } from '../shared';

const collectionPath = path.join(__dirname, `../collection.json`);
const thirtySecondTimeout = 30000;
describe(`imng-standalone-crud`, () => {
  let tree: UnitTestTree;
  let options: IOptions;
  beforeAll(async () => {
    const runner = new SchematicTestRunner(`schematics`, collectionPath);
    options = {
      name: `customer`,
      openApiJsonUrl: `https://awod-ikemtz.azurewebsites.net/swagger/v1/swagger.json`,
      path: `./test`,
      swaggerProperties: [],
      appPrefix: 'aw',
      modelFolderLocation: '../../models/webapi',
    };
    tree = await runner.runSchematic(`imng-standalone-crud`, options, Tree.empty());
  }, thirtySecondTimeout);

  test(`tree files should match`, () => {
    expect(tree.files.sort()).toMatchSnapshot();
  });

  test(`barrel should work`, () => {
    const file = tree.get(`/test/customers-crud/index.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });

  test(`html should work`, () => {
    const file = tree.get(`/test/customers-crud/add-edit.component.html`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });

  test(`scss should work`, () => {
    const file = tree.get(`/test/customers-crud/add-edit.component.scss`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`add component should work`, () => {
    const file = tree.get(`/test/customers-crud/add.component.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`add component spec should work`, () => {
    const file = tree.get(`/test/customers-crud/add.component.spec.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`edit component should work`, () => {
    const file = tree.get(`/test/customers-crud/edit.component.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`edit component spec should work`, () => {
    const file = tree.get(`/test/customers-crud/edit.component.spec.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`base component should work`, () => {
    const file = tree.get(`/test/customers-crud/base-entry.component.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
});
