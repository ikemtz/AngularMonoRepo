import { Rule, SchematicContext, Tree, chain, schematic, noop } from '@angular-devkit/schematics';
import { generateFiles, IOptions, runLint } from '../shared';
import pluralize = require('pluralize');
import { normalize } from 'path';


export function imngModule(_options: IOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const listOptions = {
      name: _options.name,
      storeName: _options.storeName || _options.name,
      swaggerJsonUrl: _options.swaggerJsonUrl,
      path: normalize(`${_options.path}/${pluralize(_options.name)}-module`)
    };
    const crudOptions = {
      name: _options.name,
      storeName: _options.storeName || _options.name,
      swaggerJsonUrl: _options.swaggerJsonUrl,
      path: normalize(`${_options.path}/${pluralize(_options.name)}-module`)
    };
    console.warn('swaggerJsonUrl: ' + listOptions.swaggerJsonUrl);
    console.warn('path: ' + listOptions.path);

    return chain([
      generateFiles(_options, 'module'),
      _options.swaggerJsonUrl ? schematic('imng-list', listOptions) : noop(),
      _options.swaggerJsonUrl ? schematic('imng-crud', crudOptions) : noop(),
      runLint(_options)
    ])(tree, _context);
  };
}