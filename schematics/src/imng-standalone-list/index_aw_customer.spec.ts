import { beforeAll, describe, expect, test } from "@jest/globals";
import { Tree } from "@angular-devkit/schematics";
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "node:path";
import { IOptions } from "../shared";

const collectionPath = path.join(__dirname, `../collection.json`);

describe(`imng-standalone-list`, () => {
  let tree: UnitTestTree;
  let options: IOptions;
  beforeAll(async () => {
    const runner = new SchematicTestRunner(`schematics`, collectionPath);
    options = {
      name: `customer`,
      openApiJsonUrl: `https://awod-ikemtz.azurewebsites.net/swagger/v1/swagger.json`,
      path: `./test`,
      swaggerProperties: [],
      appPrefix: "aw",
      modelFolderLocation: "../../models/webapi",
    };
    tree = await runner.runSchematic(`imng-standalone-list`, options, Tree.empty());
  }, 30000);

  test(`tree files should match`, () => {
    expect(tree.files.sort()).toMatchSnapshot();
  });

  test(`barrel should work`, () => {
    const file = tree.get(`/test/customers-list/index.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });

  test(`html should work`, () => {
    const file = tree.get(`/test/customers-list/list.component.html`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });

  test(`component should work`, () => {
    const file = tree.get(`/test/customers-list/list.component.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });

  test(`component spec should work`, () => {
    const file = tree.get(`/test/customers-list/list.component.spec.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });

  test(`grid state should work`, () => {
    const file = tree.get(`/test/customers-list/list.grid-state.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
});
