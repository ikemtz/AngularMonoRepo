import { Rule, SchematicContext, Tree, chain, } from '@angular-devkit/schematics';
import { generateFiles, getSwaggerDoc, IOptions } from '../shared';

export function imngNgrxModule(_options: IOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {


    return chain([
      getSwaggerDoc(_options),
      generateFiles(_options, 'ngrx-module'),
    ])(tree, _context);
  };
}
