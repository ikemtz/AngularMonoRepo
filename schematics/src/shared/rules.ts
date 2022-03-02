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
import { strings, normalize } from '@angular-devkit/core';
import fetch from 'node-fetch';
import { PropertyInfo, OpenApiComponent } from './open-api-component';
import * as pluralize from 'pluralize';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IOptions } from './options';
import _ = require('lodash');
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import { findUpSync } from './find-up';

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
      jsonDoc = from(fetch(options.openApiJsonUrl, {
        agent: httpsAgent
      })).pipe(
        switchMap(resp => from(resp.json())));
    }
    if (jsonDoc) {
      return jsonDoc.pipe(map(data => processOpenApiDoc(data, options, host)));
    }
    return of(host);
  };
}

function getFileNames(openApiJsonFileName: string) {
  if (fs.existsSync(`${__dirname}/${openApiJsonFileName}`)) {
    return `${__dirname}/${openApiJsonFileName}`;
  }
  return findUpSync(openApiJsonFileName);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function processOpenApiDoc(data: any, schema: IOptions, host: Tree): Tree { //NOSONAR
  const openApiComponent = data.components.schemas[strings.classify(schema.name)] as OpenApiComponent;
  if (!openApiComponent) {
    throw new Error(`OpenApi Component not found in swagger doc: ${schema.name}`);
  }
  const properties = openApiComponent.properties as {
    [key: string]: PropertyInfo;
  };
  let firstProperty: PropertyInfo | undefined;
  const filteredProperties: PropertyInfo[] = [];
  const excludedFields = ['createdBy', 'createdOnUtc', 'tenantId', 'updatedBy', 'updatedOnUtc'];
  schema.hasDates = false;
  for (const propertyKey in properties) {
    if (excludedFields.indexOf(propertyKey) < 0 && properties[propertyKey].type !== 'array') {
      const property =
        mapPropertyAttributes(schema, properties[propertyKey], {
          ...properties[propertyKey],
          name: propertyKey,
          required: (openApiComponent.required ?? []).indexOf(propertyKey) > -1,
        });
      filteredProperties.push(property);
      if (!firstProperty && propertyKey !== 'id') {
        firstProperty = property;
      }
    }
  }
  schema.swaggerProperties = filteredProperties;
  schema.firstProperty = firstProperty;
  return host;
}

function mapPropertyAttributes(options: IOptions, source: PropertyInfo, dest: PropertyInfo) {
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
  } else {
    dest.htmlInputType = 'text';
    dest.filterExpression = 'text';
    dest.testFactoryValue = `'${dest.maxLength ?
      _.snakeCase(dest.name).toUpperCase().substring(0, dest.maxLength) : _.snakeCase(dest.name).toUpperCase()}'`;
  }
  dest.snakeCaseName = _.snakeCase(dest.name);
  dest.startCaseName = _.startCase(dest.name);
  return dest;
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

