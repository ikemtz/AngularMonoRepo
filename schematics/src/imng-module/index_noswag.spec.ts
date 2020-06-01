import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { IOptions } from '../shared';
import { readFirst } from '@nrwl/angular/testing';
import * as pluralize from 'pluralize';


const collectionPath = path.join(__dirname, `../collection.json`);


describe(`imng-module`, () => {
  it(`works`, async done => {
    try {
      const runner = new SchematicTestRunner(`schematics`, collectionPath);
      const options: IOptions = {
        name: `employee`,
        path: `./test`,
        swaggerProperties: [],
        appPrefix: ''
      };
      const tree = await readFirst(runner.runSchematicAsync(`imng-module`, options, Tree.empty()));

      expect(tree.files).toEqual([
        `/test/${pluralize(options.name)}-module/${pluralize(options.name)}.module.spec.ts`,
        `/test/${pluralize(options.name)}-module/${pluralize(options.name)}.module.ts`,
        `/test/${pluralize(options.name)}-module/${pluralize(options.name)}.routing.module.ts`,
        `/test/${pluralize(options.name)}-module/+state/${options.name}.actions.ts`,
        `/test/${pluralize(options.name)}-module/+state/${options.name}.effects.ts`,
        `/test/${pluralize(options.name)}-module/+state/${options.name}.reducer.ts`,
        `/test/${pluralize(options.name)}-module/+state/${options.name}.selectors.ts`,
      ]);
      done();
    }
    catch (err) {
      done.fail(err);
    }
  });
});