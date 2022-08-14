import { Rule, SchematicContext, Tree, chain, schematic, noop } from '@angular-devkit/schematics';
import { generateFiles, getSwaggerDoc, IOptions } from '../shared';
import pluralize = require('pluralize');
import { normalize } from 'path';
import { dasherize } from '@angular-devkit/core/src/utils/strings';


export function imngModule(_options: IOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const listOptions = {
      ..._options,
      storeName: _options.storeName || _options.name,
      path: normalize(`${_options.path}/${dasherize(pluralize(_options.name))}-module`)
    };
    const crudOptions = {
      ..._options,
      storeName: _options.storeName || _options.name,
      path: normalize(`${_options.path}/${dasherize(pluralize(_options.name))}-module`),
    };

    return chain([
      getSwaggerDoc(_options),
      generateFiles(_options, 'module'),
      _options.openApiJsonUrl || _options.openApiJsonFileName ? schematic('imng-list', listOptions) : noop(),
      _options.openApiJsonUrl || _options.openApiJsonFileName ? schematic('imng-crud', crudOptions) : noop(),
    ])(tree, _context);
  };
}
