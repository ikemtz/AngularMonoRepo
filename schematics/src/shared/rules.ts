import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { strings, normalize, FileDoesNotExistException } from '@angular-devkit/core';
import axios from 'axios';
import { PropertyInfo, OpenApiDocument } from './open-api-component';
import * as pluralize from 'pluralize';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOptions } from './options';
import _ = require('lodash');
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import { snakeCase } from 'lodash';
import { mapProperties } from './map-properties';

export function getSwaggerDoc(options: IOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let jsonDoc: Observable<any> | null = null;
    if (options.openApiJsonFileName) {
      const fileName = getFileNames(options.openApiJsonFileName);
      context.logger.info(`Getting Swagger Document @${fileName}`);
      if (!fileName) {
        throw new Error(`File not found: ${options.openApiJsonFileName}`);
      }
      const response = fs.readFileSync(fileName);
      const apiDoc = JSON.parse(response.toString());
      jsonDoc = of(apiDoc);
    } else if (options.openApiJsonUrl) {
      context.logger.info(`Getting Swagger Document @${options.openApiJsonUrl}`);
      const httpsAgent = options.openApiJsonUrl.toLowerCase().startsWith("https") ? new https.Agent({
        rejectUnauthorized: false,
      }) : new http.Agent();
      jsonDoc = from(axios.get(options.openApiJsonUrl, {
        httpsAgent: httpsAgent
      })).pipe(map(m => m.data));
    }
    if (jsonDoc) {
      return jsonDoc.pipe(map(data =>
        processOpenApiDoc(data, options, host)));
    }
    return of(host);

  };
}

function getFileNames(openApiJsonFileName: string) {
  const fileName = `${__dirname}/${openApiJsonFileName}`;
  if (fs.existsSync(fileName)) {
    return fileName;
  }
  throw new FileDoesNotExistException(fileName)
}

export function processOpenApiDoc(data: OpenApiDocument, options: IOptions, host: Tree): Tree {
  const openApiComponent = data.components.schemas[strings.classify(options.name)];
  if (!openApiComponent) {
    throw new Error(`OpenApi Component not found in swagger doc: ${options.name}`);
  }
  const properties = openApiComponent.properties as {
    [key: string]: PropertyInfo;
  };
  options.hasDates = false;
  options.hasObjects = false;
  const mappedProperties = mapProperties(properties, options, openApiComponent, data);
  mappedProperties.filteredProperties.filter(f => f.$ref).forEach(property => {
    const componentName = property.$ref?.split('/').pop();
    const component = data.components.schemas[componentName || '']
    if (component) {
      property.properties = mapProperties(component.properties, options, component, data).filteredProperties;
      property.firstProperty = property.properties.find(prop => prop.name?.toLowerCase() !== 'id');
      options.hasObjects = true;
    }
  });
  options.swaggerObjectProperties = mappedProperties.filteredProperties.filter(f => f.$ref);
  options.swaggerProperties = mappedProperties.filteredProperties;
  options.firstProperty = mappedProperties.firstProperty;
  options.hasNullableDates = options.swaggerProperties.some(t => t.format === 'date-time' && !t.required);
  return host;
}

export function mapPropertyAttributes(options: IOptions, source: PropertyInfo, dest: PropertyInfo) {
  if (source.type === 'number' || source.type === 'integer') {
    dest.htmlInputType = 'number';
    dest.filterExpression = 'numeric';
    dest.testFactoryValue = '0';
  } else if (source.type === 'boolean') {
    dest.htmlInputType = 'checkbox';
    dest.filterExpression = 'boolean';
    dest.testFactoryValue = 'true';
  } else if (source.format === 'date-time') {
    dest.htmlInputType = 'date';
    dest.filterExpression = 'date';
    dest.testFactoryValue = 'new Date()';
    options.hasDates = true;
  } else if (source.$ref) {
    dest.htmlInputType = 'object';
    dest.filterExpression = 'text';
    dest.$ref = source.$ref;
    dest.pluralizedName = pluralize(dest.name || '', plural);
    dest.testFactoryValue = '{}';
  }
  else {
    dest.htmlInputType = 'text';
    dest.filterExpression = 'text';
    dest.testFactoryValue = `'${dest.maxLength ?
      _.snakeCase(dest.name).toUpperCase().substring(0, dest.maxLength) : _.snakeCase(dest.name).toUpperCase()}'`;
  }
  dest.snakeCaseName = _.snakeCase(dest.name);
  dest.startCaseName = _.startCase(dest.name);
  return dest;
}

const singular = 1;
const plural = 2;
export function generateFiles(options: IOptions, templateType: 'list' | 'crud' | 'module' | 'sub-list'): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(`Running ${strings.capitalize(templateType)} Schematic`);

    const singularizedName = pluralize(options.name, singular);
    const pluralizedName = pluralize(options.name, plural);
    const pluralizedParentName = pluralize(options.parentName ?? options.name, plural);
    const singularizedParentName = pluralize(options.parentName ?? options.name, singular);
    const snakeCasedParentName = snakeCase(singularizedParentName).toUpperCase()
    const startCasedPluralName = _.startCase(pluralizedName);
    const singularizedStoreName = pluralize(options.storeName ?? options.parentName ?? options.name, singular);
    const pluralizedStoreName = pluralize(singularizedStoreName, plural);

    const folderName = templateType === 'sub-list' ?
      normalize(`${options.path}`)
      : normalize(`${options.path}/${strings.dasherize(pluralizedName)}-${templateType}`);
    const templateSource = apply(url('./files'), [
      applyTemplates({
        ...strings,
        ...options,
        hasDates: options.hasDates,
        hasObjects: options.hasObjects,
        pluralizedName,
        singularizedName,
        pluralizedParentName,
        singularizedParentName,
        snakeCasedParentName,
        pluralizedStoreName,
        singularizedStoreName,
        startCasedPluralName,
      }),
      move(folderName),
    ]);
    return chain([mergeWith(templateSource)])(tree, context);
  };
}

