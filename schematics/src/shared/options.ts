import { PropertyInfo } from './open-api-component';

export interface IOptions {
  name: string;
  storeName?: string;
  path: string;
  swaggerJsonUrl?: string;
  swaggerProperties: PropertyInfo[];
}
