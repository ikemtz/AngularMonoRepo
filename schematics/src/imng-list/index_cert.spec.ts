import { Tree } from "@angular-devkit/schematics";
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "path";
import { IOptions } from "../shared";
import * as pluralize from "pluralize";
import { classify } from "@angular-devkit/core/src/utils/strings";

const collectionPath = path.join(__dirname, "../collection.json");

describe("imng-list", () => {
  test("generation works", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const options: IOptions = {
      name: "certification",
      openApiJsonUrl:
        "https://raw.githubusercontent.com/ikemtz/AngularMonoRepo/master/schematics/open-api-docs/nrcrn-cert-odata.json",
      path: "./test",
      swaggerProperties: [],
      storeName: "certifications",
      appPrefix: "nrcrn",
    };
    const tree: UnitTestTree = await runner.runSchematic(
      "imng-list",
      options,
      Tree.empty()
    );
    expect(tree.files).toEqual([
      `/test/${pluralize(options.name)}-list/index.ts`,
      `/test/${pluralize(options.name)}-list/list.component.html`,
      `/test/${pluralize(options.name)}-list/list.component.scss`,
      `/test/${pluralize(options.name)}-list/list.component.spec.ts`,
      `/test/${pluralize(options.name)}-list/list.component.ts`,
      `/test/${pluralize(options.name)}-list/list.facade.spec.ts`,
      `/test/${pluralize(options.name)}-list/list.facade.ts`,
    ]);

    const htmlFile = tree.get(
      `/test/${pluralize(options.name)}-list/list.component.html`
    );
    let content = htmlFile?.content.toString();
    expect(content).toContain(`[field]="props.IS_ENABLED"`);
    expect(content).toContain(`<${options.appPrefix}-${options.name}-add `);
    expect(content).toContain(`<${options.appPrefix}-${options.name}-edit `);

    const componentFile = tree.get(
      `/test/${pluralize(options.name)}-list/list.component.ts`
    );
    content = componentFile?.content.toString();
    expect(content).toContain(
      `${classify(options.name)}Properties.EXPIRES_ON_UTC,`
    );
    expect(content).toContain(`'${options.appPrefix}-${options.name}-list'`);

    const facadeSpecFile = tree.get(
      `/test/${pluralize(options.name)}-list/list.facade.spec.ts`
    );
    content = facadeSpecFile?.content.toString();
    expect(content).toContain(
      `of(createODataPayload([createTestCertification()]`
    );
    expect(content).toContain(
      `store.dispatch(certificationActionTypes.loadCertificationsSuccess(createODataResult([createTestCertification(), createTestCertification()])));`
    );
  }, 10000);
});
