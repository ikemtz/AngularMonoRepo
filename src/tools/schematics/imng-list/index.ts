import { chain, SchematicContext, Tree, Rule } from '@angular-devkit/schematics';
import { getSwaggerDoc, generateFiles, runLint, IOptionsSchema } from '../shared';


export default function (schema: IOptionsSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([getSwaggerDoc(schema), generateFiles(schema, 'list'), runLint(schema)])(tree, context);
  };
}
