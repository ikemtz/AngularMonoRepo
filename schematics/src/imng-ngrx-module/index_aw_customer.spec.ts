import { beforeAll, describe, expect, test } from '@jest/globals';
import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'node:path';
import { IOptions } from '../shared';
import { plural, singular } from 'pluralize';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';

const collectionPath = path.join(__dirname, `../collection.json`);

describe(`imng-ngrx-module`, () => {
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
    };
    tree = await runner.runSchematic(`imng-ngrx-module`, options, Tree.empty());
  }, 30000);

  test(`tree files should match`, () => {
    expect(tree.files.sort()).toMatchSnapshot();
  });

  test(`module should work`, () => {
    const file = tree.get(
      `/test/customers-ngrx-module/customers.module.ts`
    );
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`crud facade template should work`, () => {
    const file = tree.get(`/test/customers-ngrx-module/customer.crud.facade.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`crud facade spec template should work`, () => {
    const file = tree.get(`/test/customers-ngrx-module/customer.crud.facade.spec.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`actions should work`, () => {
    const file = tree.get(`/test/customers-ngrx-module/+state/customer.actions.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`reducers should work`, () => {
    const file = tree.get(`/test/customers-ngrx-module/+state/customer.feature.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`effects should work`, () => {
    const effectsFile = tree.get(`/test/customers-ngrx-module/+state/customer.list.effects.ts`
    );
    const content = effectsFile?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`list facade should work`, () => {
    const fileName =
      `/test/${plural(dasherize(options.name))}-ngrx-module/${dasherize(
        singular(options.name)
      )}.list.facade.spec.ts`;
    const listFacadeSpecFile = tree.get(fileName);
    const content = listFacadeSpecFile?.content.toString();
    expect(content).toContain(
      `expect(httpClient.get).toHaveBeenCalledWith('${dasherize(
        plural(options.name)
      )}-odata/odata/v1/${classify(plural(options.name))}?&$count=true');`
    );
  });
});
