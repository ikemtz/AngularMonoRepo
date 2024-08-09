import * as pluralize from 'pluralize';
import { PropertyInfo, OpenApiComponent, OpenApiDocument } from './open-api-component';
import { IOptions } from './options';
import { mapPropertyAttributes } from './rules';

const excludedFields = ['createdBy', 'createdOnUtc', 'tenantId', 'updatedBy', 'updatedOnUtc'];

export function mapProperties(properties: { [key: string]: PropertyInfo; }, options: IOptions, openApiComponent: OpenApiComponent, openApiDoc: OpenApiDocument) {
  let firstProperty: PropertyInfo | undefined;
  const filteredProperties: PropertyInfo[] = [];
  for (const propertyKey in properties) {
    const originalProperty = properties[propertyKey];
    if (excludedFields.indexOf(propertyKey) < 0 && originalProperty.type !== 'array') {
      const property = mapPropertyAttributes(options, originalProperty, {
        ...properties[propertyKey],
        name: propertyKey,
        required: (openApiComponent.required ?? []).indexOf(propertyKey) > -1,
      });

      mapReferencedProperties(property, propertyKey, openApiComponent, openApiDoc);
      if (!firstProperty && propertyKey !== 'id') {
        firstProperty = property;
      }
      filteredProperties.push(property);
    }
  }
  return { firstProperty, filteredProperties };
}
function mapReferencedProperties(property: PropertyInfo, propertyKey: string, openApiComponent: OpenApiComponent, openApiDoc: OpenApiDocument) {
  const prop = openApiComponent.properties[propertyKey];
  const propTypeNames = prop['$ref']?.split('/');
  if (propTypeNames) {
    const typeName: string = propTypeNames.pop() || '';
    property.propertyTypeName = typeName;
    property.pluralizedPropertyTypeName = pluralize.plural(typeName);
    property.singularizedPropertyTypeName = pluralize.singular(typeName);
    const refComponent = openApiDoc.components.schemas[typeName];
    property.enum = refComponent.enum;
    if (property.enum) {
      const value = property.enum[0].toString().split(' ').pop();
      property.testFactoryValue = `${property.pluralizedPropertyTypeName}.${value}`
    }
  }
}

