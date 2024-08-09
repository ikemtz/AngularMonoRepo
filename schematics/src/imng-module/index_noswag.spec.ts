import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import * as pluralize from 'pluralize';

const collectionPath = path.join(__dirname, `../collection.json`);

describe(`imng-module`, () => {
  test(`generation works`, async () => {
    const runner = new SchematicTestRunner(`schematics`, collectionPath);
    const options: IOptions = {
      name: `employee`,
      path: `./test`,
      swaggerProperties: [],
      appPrefix: '',
    };
    const tree: UnitTestTree = await runner.runSchematic(`imng-module`, options, Tree.empty());

    expect(tree.files).toEqual([
      `/test/${pluralize(options.name)}-module/${pluralize(
        options.name
      )}.module.spec.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(
        options.name
      )}.module.ts`,
      `/test/${pluralize(options.name)}-module/${pluralize(
        options.name
      )}.routing.ts`,
      `/test/${pluralize(options.name)}-module/+state/index.ts`,
      `/test/${pluralize(options.name)}-module/+state/${options.name}-crud.effects.ts`,
      `/test/${pluralize(options.name)}-module/+state/${options.name}-list.effects.ts`,
      `/test/${pluralize(options.name)}-module/+state/${options.name
      }.actions.ts`,
      `/test/${pluralize(options.name)}-module/+state/${options.name
      }.feature.ts`,
      `/test/${pluralize(options.name)}-module/+state/${options.name
      }.selectors.ts`,
    ]);
  });
});
