import { describe, expect, test } from "@jest/globals";
import { Tree } from "@angular-devkit/schematics";
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "node:path";
import { IOptions } from "../shared";
import { plural } from "pluralize";
import { classify, dasherize } from "@angular-devkit/core/src/utils/strings";

const collectionPath = path.join(__dirname, "../collection.json");

describe("imng-module", () => {
  test("generation works - Health Items", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const options: IOptions = {
      name: "healthItem",
      openApiJsonUrl:
        "https://raw.githubusercontent.com/ikemtz/AngularMonoRepo/master/schematics/open-api-docs/nrcrn-hlth-odata.json",
      path: "./test",
      swaggerProperties: [],
      storeName: "healthItems",
      appPrefix: "nrcrn",
    };
    const tree: UnitTestTree = await runner.runSchematic(
      "imng-module",
      options,
      Tree.empty(),
    );

    expect(tree.files.sort()).toMatchSnapshot();
    const effectsFile = tree.get(
      `/test/${plural(dasherize(options.name))}-module/+state/${dasherize(
        options.name,
      )}-crud.effects.ts`,
    );
    let content = effectsFile?.content.toString();
    expect(content).toContain(
      `import { ${classify(options.name)}ApiService } from '../${dasherize(
        plural(options.name),
      )}-crud/api.service';`,
    );

    const listFacadeSpecFile = tree.get(
      `/test/${plural(dasherize(options.name))}-module/${dasherize(
        plural(options.name),
      )}-list/list.facade.spec.ts`,
    );
    content = listFacadeSpecFile?.content.toString();
    expect(content).toContain(
      `expect((httpClient.get as jest.Mock).mock.calls[0][0]).toMatchSnapshot();`,
    );
  });
});
