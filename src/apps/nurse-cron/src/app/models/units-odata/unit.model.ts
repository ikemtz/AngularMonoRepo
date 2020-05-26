/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
/* tslint:disable */
import { IBuilding } from './building.model';

export interface IUnit {
  id?: string;
  buildingId?: string;
  name?: string;
  del?: string;
  roomCount?: number;
  deletedBy?: string;
  deletedOnUtc?: Date;
  building?: IBuilding;
}
