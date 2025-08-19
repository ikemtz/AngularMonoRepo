import { PropertyInfo } from './open-api-component';

export interface IOptions {
  /** Entity Name (Must match schema name in json) */
  name: string;
  /** Parent Entity Name (Must match schema name in json) */
  parentName?: string;
  /** NGRX Store Feature Name */
  storeName?: string;
  /** Angular application Prefix */
  appPrefix: string;
  /** Folder to place generated files */
  path: string;
  /** Optional: Url of remote OpenApi JSON document (If this is not provided, then you must specify openApiJsonFileName) */
  openApiJsonUrl?: string;
  /** Optional: File path of local OpenApi JSON document (If this is not provided, then you must specify openApiJsonUrl) */
  openApiJsonFileName?: string;
  /** Optional: This is the property that will used for initial sorting on list and auto focus on crud schematics */
  modelFolderLocation?: string;
  /** Optional: Location of model files relative to the module/component generated root */

  firstProperty?: PropertyInfo;
  /** Ignore: This is for internal schematic use only  */
  swaggerProperties: PropertyInfo[];
  /** Ignore: This is for internal schematic use only  */
  swaggerObjectProperties?: PropertyInfo[];
  /** Ignore: This is for internal schematic use only  */
  hasDates?: boolean;
  hasObjects?: boolean;
  hasNullableDates?: boolean;
}
