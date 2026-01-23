import { describe, expect, test } from '@jest/globals';
import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'node:path';
import { IOptions } from '../shared';
import { plural } from 'pluralize';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';

const collectionPath = path.join(__dirname, '../collection.json');

describe('imng-module', () => {
  test('generation works - Certifications', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const options: IOptions = {
      name: 'certification',
      openApiJsonUrl:
        'https://im-wa-crto-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
      openApiJsonFileName: '../../open-api-docs/nrcrn-cert-odata.json',
      path: './test',
      swaggerProperties: [],
      appPrefix: 'nrcrn',
    };
    const tree: UnitTestTree = await runner.runSchematic('imng-module', options, Tree.empty());


    expect(tree.files.sort()).toMatchSnapshot();

    const listEffectsFile = tree.get(
      `/test/${plural(dasherize(options.name))}-module/+state/${dasherize(
        options.name
      )}-list.effects.ts`
    );
    const listContent = listEffectsFile?.content.toString();
    expect(listContent).toContain(
      `${options.name}ActionTypes.reload${classify(
        plural(options.name)
      )}Request),`
    );

    const crudEffectsFile = tree.get(
      `/test/${plural(dasherize(options.name))}-module/+state/${dasherize(
        options.name
      )}-crud.effects.ts`
    );
    const crudContent = crudEffectsFile?.content.toString();
    expect(crudContent).toContain(
      `import { ${classify(options.name)}ApiService } from '../${dasherize(
        plural(options.name)
      )}-crud/api.service';`
    );

    const listFacadeSpecFile = tree.get(
      `/test/${plural(dasherize(options.name))}-module/${dasherize(
        plural(options.name)
      )}-list/list.facade.spec.ts`
    );
    let content = listFacadeSpecFile?.content.toString();
    expect(content).toContain(
      `expect(httpClient.get).toHaveBeenCalledWith('${dasherize(
        plural(options.name)
      )}-odata/odata/v1/${classify(plural(options.name))}?&$count=true');`
    );

    const featureFile = tree.get(
      `/test/${plural(dasherize(options.name))}-module/+state/${dasherize(
        options.name
      )}.feature.ts`
    );
    content = featureFile?.content.toString();
    expect(content).toMatchSnapshot();
  });
});
