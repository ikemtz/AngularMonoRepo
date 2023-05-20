import { Tree } from "@angular-devkit/schematics";
import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "path";
import { IOptions } from "../shared";
import * as pluralize from "pluralize";

const collectionPath = path.join(__dirname, `../collection.json`);

describe(`imng-crud`, () => {
  test(`generation works`, async () => {
    const runner = new SchematicTestRunner(`schematics`, collectionPath);
    const options: IOptions = {
      name: `certification`,
      openApiJsonUrl: `https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json`,
      openApiJsonFileName: "../../open-api-docs/nrcrn-cert-odata.json",
      path: `./test`,
      swaggerProperties: [],
      storeName: `certifications`,
      appPrefix: `nrcrn`,
    };
    const tree: UnitTestTree = await runner.runSchematic(
      `imng-crud`,
      options,
      Tree.empty()
    );

    expect(tree.files).toEqual([
      `/test/${pluralize(options.name)}-crud/add-edit.component.html`,
      `/test/${pluralize(options.name)}-crud/add-edit.component.scss`,
      `/test/${pluralize(options.name)}-crud/add.component.spec.ts`,
      `/test/${pluralize(options.name)}-crud/add.component.ts`,
      `/test/${pluralize(options.name)}-crud/api.service.ts`,
      `/test/${pluralize(options.name)}-crud/base-entry.component.ts`,
      `/test/${pluralize(options.name)}-crud/crud.facade.spec.ts`,
      `/test/${pluralize(options.name)}-crud/crud.facade.ts`,
      `/test/${pluralize(options.name)}-crud/edit.component.spec.ts`,
      `/test/${pluralize(options.name)}-crud/edit.component.ts`,
      `/test/${pluralize(options.name)}-crud/index.ts`,
    ]);

    const htmlFile = tree.get(
      `/test/${pluralize(options.name)}-crud/add-edit.component.html`
    );
    let content = htmlFile?.content.toString();
    expect(content).toContain(`[formControlName]="props.IS_ENABLED"`);

    const addComponent = tree.get(
      `/test/${pluralize(options.name)}-crud/add.component.ts`
    );
    content = addComponent?.content.toString();
    expect(content).toContain(`'${options.appPrefix}-${options.name}-add'`);

    const addComponentSpecFile = tree.get(
      `/test/${pluralize(options.name)}-crud/add.component.spec.ts`
    );
    content = addComponentSpecFile?.content.toString();
    expect(content).toContain(
      `component.addEditForm?.patchValue(createTestCertification())`
    );

    const facadeSpecFile = tree.get(
      `/test/${pluralize(options.name)}-crud/crud.facade.spec.ts`
    );
    content = facadeSpecFile?.content.toString();
    expect(content).toContain(
      `useValue: { get: jest.fn(() => of(createODataPayload([createTestCertification()]))) } }`
    );

    const editComponent = tree.get(
      `/test/${pluralize(options.name)}-crud/edit.component.ts`
    );
    content = editComponent?.content.toString();
    expect(content).toContain(`'${options.appPrefix}-${options.name}-edit'`);

    const editComponentSpecFile = tree.get(
      `/test/${pluralize(options.name)}-crud/edit.component.spec.ts`
    );
    content = editComponentSpecFile?.content.toString();
    expect(content).toContain(
      `component.addEditForm.patchValue(createTestCertification());`
    );
  });
});
