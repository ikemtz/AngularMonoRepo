import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { readFirst } from '@nrwl/angular/testing';

const collectionPath = path.join(__dirname, '../collection.json');


describe('imng-schematics', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await readFirst(runner.runSchematicAsync('imng-schematics', {}, Tree.empty()));

    expect(tree.files).toEqual([]);
  });
});
