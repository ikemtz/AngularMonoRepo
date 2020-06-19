export interface OpenApiComponent {
  properties: Properties;
  required?: string[];
}
export interface Properties {
  [key: string]: PropertyInfo;
}
export interface PropertyInfo {
  name?: string;
  enum?: [string | number];
  type: 'string' | 'boolean' | 'array' | 'integer' | 'number' | 'date';
  format?: 'date-time' | 'uuid' | 'int32' | 'double';
  filterExpression: 'text' | 'numeric' | 'boolean' | 'date';
  nullable?: boolean;
  readOnly?: boolean;
  required: boolean;
  htmlInputType: 'text' | 'number' | 'checkbox' | 'date';
  snakeCaseName: string; 
  startCaseName: string;
  maxLength: number;
  testFactoryValue: string;
}
