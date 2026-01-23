import { describe, expect, test } from '@jest/globals';
import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'node:path';
import { IOptions } from '../shared';

const collectionPath = path.join(__dirname, `../collection.json`);

describe(`imng-ngrx-module`, () => {
  test(`generation works`, async () => {
    const runner = new SchematicTestRunner(`schematics`, collectionPath);
    const options: IOptions = {
      name: `employee`,
      path: `./test`,
      swaggerProperties: [],
      appPrefix: '',
    };
    try {
      const tree: UnitTestTree = await runner.runSchematic(`imng-ngrx-module`, options, Tree.empty());
      expect(tree).toBeUndefined();
    } catch (error) {
      expect(error).toMatchSnapshot();
    }

  });
});
