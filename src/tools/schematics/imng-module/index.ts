import {
  chain, Rule, Tree, SchematicContext,
  schematic, noop,
} from '@angular-devkit/schematics';
import { getSwaggerDoc, generateFiles, runLint, IOptionsSchema } from '../shared';
import * as pluralize from 'pluralize';

export default function (schema: IOptionsSchema): Rule {
  return module(schema);
};

export function module(schema: IOptionsSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const listOptions = {
      ...schema,
      path: `${schema.path}/${pluralize(schema.name)}-list`
    };
    return chain([getSwaggerDoc(schema), generateFiles(schema, 'crud'), schema.swaggerJsonUrl ? schematic('list', listOptions) : noop(), runLint(schema)])(tree, context);
  };
}
