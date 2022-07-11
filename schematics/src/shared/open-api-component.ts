
export interface Schemas {
  [key: string]: OpenApiComponent;
}
export interface OpenApiDocument {
  components: {
    schemas: Schemas
  }
}

export interface OpenApiComponent {
  properties: Properties;
  required?: string[];
  enum?: [string | number];
}
export interface Properties {
  [key: string]: PropertyInfo;
}
export interface PropertyInfo {
  name?: string;
  enum?: [string | number];
  type: 'string' | 'boolean' | 'array' | 'integer' | 'number' | 'date' | 'object';
  format?: 'date-time' | 'uuid' | 'int32' | 'double';
  filterExpression: 'text' | 'numeric' | 'boolean' | 'date' | null;
  nullable?: boolean;
  readOnly?: boolean;
  required: boolean;
  htmlInputType: 'text' | 'number' | 'checkbox' | 'date' | 'object';
  snakeCaseName: string;
  startCaseName: string;
  maxLength: number;
  testFactoryValue: string;
  '$ref'?: string;
  pluralizedName?: string;
  properties?: PropertyInfo[];
  firstProperty: PropertyInfo | undefined;
  propertyTypeName?: string;
  pluralizedPropertyTypeName?:string;
}
