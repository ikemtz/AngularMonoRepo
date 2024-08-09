import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';

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

    expect(tree.files.sort()).toMatchSnapshot();
  });
});
