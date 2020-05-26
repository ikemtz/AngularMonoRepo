import { Rule, SchematicContext, Tree, chain, schematic, noop } from '@angular-devkit/schematics';
import { generateFiles, IOptions, runLint } from '../shared';
import pluralize = require('pluralize');
import { normalize } from 'path';


export function imngModule(_options: IOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const listOptions = {
      name: _options.name,
      storeName: _options.storeName,
      swaggerJsonUrl: _options.swaggerJsonUrl,
      path: normalize(`${_options.path}/${pluralize(_options.name)}-list`)
    };
    console.warn('swaggerJsonUrl: ' + listOptions.swaggerJsonUrl);
    console.warn('path: ' + listOptions.path);

    return chain([
      generateFiles(_options, 'module'),
      _options.swaggerJsonUrl ? schematic('imng-list', listOptions) : noop(),
      runLint(_options)
    ])(tree, _context);
  };
}