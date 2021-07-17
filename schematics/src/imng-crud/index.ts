import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { getSwaggerDoc, generateFiles, IOptions } from '../shared'; 

export function imngCrud(_options: IOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([getSwaggerDoc(_options), generateFiles(_options, 'crud')])(tree, _context);
  };
}
