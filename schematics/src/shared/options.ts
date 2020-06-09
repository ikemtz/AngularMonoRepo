import { PropertyInfo } from './open-api-component';

export interface IOptions {
  name: string;
  storeName?: string;
  path: string;
  openApiJsonUrl?: string;
  openApiJsonFileName?: string;
  swaggerProperties: PropertyInfo[];
  hasDates?: boolean;
  appPrefix: string;
}
