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
  test(`generation works - employees`, async () => {
    const runner = new SchematicTestRunner(`schematics`, collectionPath);
    const options: IOptions = {
      name: `employee`,
      openApiJsonUrl: `https://im-wa-empo-nrcrn.azurewebsites.net/swagger/v1/swagger.json`,
      openApiJsonFileName: '../../open-api-docs/nrcrn-empl-odata.json',
      path: `./test`,
      swaggerProperties: [],
      storeName: `employees`,
      appPrefix: '',
    };
    const tree: UnitTestTree = await runner.runSchematic(`imng-module`, options, Tree.empty());

    expect(tree.files.sort()).toMatchSnapshot();

    const listEffectsFile = tree.get(
      `/test/${pluralize(dasherize(options.name))}-module/+state/${dasherize(
        options.name
      )}-list.effects.ts`
    );
    const listContent = listEffectsFile?.content.toString();
    expect(listContent).toContain(
      `${options.name}ActionTypes.reload${classify(
        pluralize(options.name)
      )}Request),`
    );
    const crudEffectsFile = tree.get(
      `/test/${pluralize(dasherize(options.name))}-module/+state/${dasherize(
        options.name
      )}-crud.effects.ts`
    );
    const crudContent = crudEffectsFile?.content.toString();
    expect(crudContent).toContain(
      `import { ${classify(options.name)}ApiService } from '../${dasherize(
        pluralize(options.name)
      )}-crud/api.service';`
    );

    const listFacadeSpecFile = tree.get(
      `/test/${pluralize(dasherize(options.name))}-module/${dasherize(
        pluralize(options.name)
      )}-list/list.facade.spec.ts`
    );
    let content = listFacadeSpecFile?.content.toString();
    expect(content).toContain(
      `expect(httpClient.get).toHaveBeenCalledWith('${dasherize(
        pluralize(options.name)
      )}-odata/odata/v1/${classify(pluralize(options.name))}?&$count=true');`
    );

    const htmlFile = tree.get(
      `/test/${pluralize(dasherize(options.name))}-module/${dasherize(
        pluralize(options.name)
      )}-crud/add-edit.component.html`
    );
    content = htmlFile?.content.toString();
    expect(content).toContain(
      `<input id="mobile_phone" type="text" class="form-control" [formControlName]="props.MOBILE_PHONE" />`
    );
  });
});
