import {
  apply,
  applyTemplates,
  chain,
  DirEntry,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { TslintFixTask } from '@angular-devkit/schematics/tasks';
import * as fetch from 'node-fetch';
import { PropertyInfo, OpenApiComponent } from './open-api-component';
import * as pluralize from 'pluralize';
import { Observable } from '@angular-devkit/core/node_modules/rxjs/internal/Observable';
import { IOptions } from './options';
import _ = require('lodash');


export function getSwaggerDoc(schema: IOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    return new Observable<Tree>(observer => {
      context.logger.info(`Getting Swagger Document @${schema.swaggerJsonUrl}`);
      fetch.default(schema.swaggerJsonUrl || '')
        .then(res => {
          return res.json();
        })
        .then(data => {
          const openApiComonent = data.components.schemas[strings.classify(schema.name)] as OpenApiComponent;
          const properties = openApiComonent.properties as {
            [key: string]: PropertyInfo;
          };
          const filteredProperties: PropertyInfo[] = [];
          const excludedFields = ['createdBy', 'createdOnUtc', 'tenantId', 'updatedBy', 'updatedOnUtc'];
          schema.hasDates = false;
          for (const propertyKey in properties) {
            if (excludedFields.indexOf(propertyKey) < 0 && properties[propertyKey].type !== 'array') {
              const property = {
                ...properties[propertyKey],
                name: propertyKey,
                required: (openApiComonent.required ?? []).indexOf(propertyKey) > -1,
              };
              if (properties[propertyKey].type === 'number' || properties[propertyKey].type === 'integer') {
                property.htmlInputType = 'number';
                property.testFactoryValue = '0';
              } else if (properties[propertyKey].type === 'boolean') {
                property.htmlInputType = 'checkbox';
                property.testFactoryValue = 'true';
              } else if (properties[propertyKey].format === 'date-time') {
                property.htmlInputType = 'date';
                property.testFactoryValue = 'new Date()';
                schema.hasDates = true;
              } else {
                property.htmlInputType = 'text';
                property.testFactoryValue = `'${property.maxLength ?
                  _.snakeCase(propertyKey).toUpperCase().substring(0, property.maxLength) : _.snakeCase(propertyKey).toUpperCase()}'`;
              }
              property.snakeCaseName = _.snakeCase(property.name);
              filteredProperties.push(property);
            }
          }
          schema.swaggerProperties = filteredProperties;
          observer.next(host);
          observer.complete();
          return host;
        })
        .catch(function (err: any) {
          context.logger.warn('An error occured');
          observer.error(err);
        });
    });
  };
}

export function generateFiles(schema: IOptions, templateType: 'list' | 'crud' | 'module'): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(`Running ${strings.capitalize(templateType)} Schematic`);

    const singularizedName = pluralize(schema.name, 1);
    const pluralizedName = pluralize(schema.name, 2);
    const singularizedStoreName = schema.storeName ? pluralize(schema.storeName, 1) : '';
    const pluralizedStoreName = schema.storeName ? pluralize(schema.storeName, 2) : '';

    const folderName = normalize(`${schema.path}/${strings.dasherize(pluralizedName)}-${templateType}`);
    const templateSource = apply(url('./files'), [
      applyTemplates({
        ...strings,
        ...schema,
        pluralizedName,
        singularizedName,
        pluralizedStoreName,
        singularizedStoreName,
      }),
      move(folderName),
    ]);
    return chain([mergeWith(templateSource)])(tree, context);
  };
}

export function runLint(schema: IOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const dir: DirEntry | null = tree.getDir(schema.path.substr(0, schema.path.lastIndexOf('/')));
    const files = tree.actions.reduce((acc: Set<string>, action) => {
      const path = action.path.substr(1); // Remove the starting '/'.
      if (path.endsWith('.ts') && dir && action.path.startsWith(dir.path)) {
        acc.add(path);
      }
      return acc;
    }, new Set<string>());
    context.addTask(
      new TslintFixTask({
        ignoreErrors: false,
        tsConfigPath: 'tsconfig.json',
        files: Array.from(files),
      }),
    );
    return tree;
  };
}
