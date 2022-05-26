/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { IBuilding } from './building.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUnit {
  id?: string;
  buildingId?: string;
  name?: string;
  roomCount?: number;
  deletedBy?: string;
  deletedOnUtc?: Date;
  building?: IBuilding;
}
