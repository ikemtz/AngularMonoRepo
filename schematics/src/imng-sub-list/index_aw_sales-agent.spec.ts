import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';

const collectionPath = path.join(__dirname, `../collection.json`);

describe(`imng-sub-list`, () => {
  let tree: UnitTestTree;
  let options: IOptions;
  beforeAll(async () => {
    const runner = new SchematicTestRunner(`schematics`, collectionPath);
    options = {
      name: `SalesAgent`,
      parentName: 'Customer',
      openApiJsonUrl: `https://awod-ikemtz.azurewebsites.net/swagger/v1/swagger.json`,
      path: `./test`,
      swaggerProperties: [],
      appPrefix: 'aw',
    };
    tree = await runner.runSchematic(`imng-sub-list`, options, Tree.empty());
  })
  test(`tree files should match`, () => {
    expect(tree.files).toMatchSnapshot();
  });
  test(`actions should work`, () => {
    const file = tree.get(`/test/+state/sales-agent.actions.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`effects should work`, () => {
    const file = tree.get(`/test/+state/sales-agent.effects.ts`
    );
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`selectors should work`, () => {
    const file = tree.get(`/test/+state/sales-agent.selectors.ts`
    );
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`models should work`, () => {
    const file = tree.get(`/test/models/ext-customer.ts`);
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`api.service should work`, () => {
    const file = tree.get('/test/sales-agents-list/api.service.ts');
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`list html should work`, () => {
    const file = tree.get('/test/sales-agents-list/list.component.html');
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`list component spec should work`, () => {
    const file = tree.get('/test/sales-agents-list/list.component.spec.ts');
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`list component should work`, () => {
    const file = tree.get('/test/sales-agents-list/list.component.ts');
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`facade spec should work`, () => {
    const file = tree.get('/test/sales-agents-list/list.facade.spec.ts');
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
  test(`facade should work`, () => {
    const file = tree.get('/test/sales-agents-list/list.facade.ts');
    const content = file?.content.toString();
    expect(content).toMatchSnapshot();
  });
});
