import { describe, expect, test } from "@jest/globals";
import { Tree } from "@angular-devkit/schematics";
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "node:path";
import { IOptions } from "../shared";
import { plural } from "pluralize";
import { dasherize, classify } from "@angular-devkit/core/src/utils/strings";

const collectionPath = path.join(__dirname, "../collection.json");

describe("imng-module", () => {
  test("generation works - Competencies", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const options: IOptions = {
      name: "competency",
      openApiJsonUrl:
        "https://im-wa-cmpo-nrcrn.azurewebsites.net/swagger/v1/swagger.json",
      openApiJsonFileName: "../../open-api-docs/nrcrn-comp-odata.json",
      path: "./test",
      swaggerProperties: [],
      storeName: "competencies",
      appPrefix: "nrcrn",
    };
    const tree: UnitTestTree = await runner.runSchematic(
      "imng-module",
      options,
      Tree.empty(),
    );

    expect(tree.files.sort()).toMatchSnapshot();
    let content: string | undefined = "";
    tree.files.forEach((file) => {
      content = tree.get(file)?.content.toString();
      if (content) {
        expect(content.indexOf("competencys")).toBeLessThan(0);
      }
    });

    const listEffectsFile = tree.get(
      `/test/${plural(dasherize(options.name))}-module/+state/${dasherize(
        options.name,
      )}-list.effects.ts`,
    );
    content = listEffectsFile?.content.toString();
    expect(content).toContain(
      `${options.name}ActionTypes.reload${classify(
        plural(options.name),
      )}Request),`,
    );

    const crudEffectsFile = tree.get(
      `/test/${plural(dasherize(options.name))}-module/+state/${dasherize(
        options.name,
      )}-crud.effects.ts`,
    );
    content = crudEffectsFile?.content.toString();
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
