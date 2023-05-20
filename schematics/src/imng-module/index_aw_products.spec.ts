import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import * as pluralize from 'pluralize'; 
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';

const collectionPath = path.join(__dirname, `../collection.json`);

describe(`imng-module`, () => {
  let tree: UnitTestTree;
  let options: IOptions;
  beforeAll(async () => {
    const runner = new SchematicTestRunner(`schematics`, collectionPath);
    options = {
      name: `product`,
      openApiJsonUrl: `https://awod-ikemtz.azurewebsites.net/swagger/v1/swagger.json`,
      path: `./test`,
      swaggerProperties: [],
      appPrefix: 'aw',
    };
    tree = await runner.runSchematic(`imng-module`, options, Tree.empty());
  })
  test(`tree files should match`, () => {
    expect(tree.files).toMatchSnapshot();
  });

  test(`module should work`, () => {
    const file = tree.get(
      `/test/products-module/products.module.ts`
    );
    const content = file?.content.toString();
    expect(content).toMatchSnapshot()
  });
  test(`list component should work`, () => {
    const file = tree.get(`/test/products-module/products-list/list.component.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`base crud component should work`, () => {
    const file = tree.get(`/test/products-module/products-crud/base-entry.component.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`crud facade template should work`, () => {
    const file = tree.get(`/test/products-module/products-crud/crud.facade.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`crud facade spec template should work`, () => {
    const file = tree.get(`/test/products-module/products-crud/crud.facade.spec.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`selectors template should work`, () => {
    const file = tree.get(`/test/products-module/+state/product.selectors.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`crud html template should work`, () => {
    const file = tree.get(`/test/products-module/products-crud/add-edit.component.html`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`add component template should work`, () => {
    const file = tree.get(`/test/products-module/products-crud/add.component.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`edit component template should work`, () => {
    const file = tree.get(`/test/products-module/products-crud/edit.component.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`add component spec template should work`, () => {
    const file = tree.get(`/test/products-module/products-crud/add.component.spec.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`edit component spec template should work`, () => {
    const file = tree.get(`/test/products-module/products-crud/edit.component.spec.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`actions should work`, () => {
    const file = tree.get(`/test/products-module/+state/product.actions.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`reducers should work`, () => {
    const file = tree.get(`/test/products-module/+state/product.reducer.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`effects should work`, () => {
    const effectsFile = tree.get(`/test/products-module/+state/product.effects.ts`
    );
    const content = effectsFile?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`list facade should work`, () => {
    const listFacadeSpecFile = tree.get(
      `/test/${pluralize(dasherize(options.name))}-module/${dasherize(
        pluralize(options.name)
      )}-list/list.facade.spec.ts`
    );
    const content = listFacadeSpecFile?.content.toString();
    expect(content).toContain(
      `expect(httpClient.get).toBeCalledWith('${dasherize(
        pluralize(options.name)
      )}-odata/odata/v1/${classify(pluralize(options.name))}?&$count=true');`
    );
  });
  test(`html file should work`, () => {
    const htmlFile = tree.get(`/test/products-module/products-list/list.component.html`
    );
    const content = htmlFile?.content.toString();
    expect(content).toMatchSnapshot();
  });
});
