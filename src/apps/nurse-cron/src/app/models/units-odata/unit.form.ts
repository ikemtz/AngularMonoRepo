/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup } from '@angular/forms'; //NOSONAR
import { IBuildingForm } from './building.form';

export interface IUnitForm {
  id: FormControl<string | null | undefined>;
  buildingId: FormControl<string>;
  name: FormControl<string>;
  roomCount: FormControl<number>;
  deletedBy: FormControl<string | null | undefined>;
  deletedOnUtc: FormControl<Date | null | undefined>;
  building: FormGroup<IBuildingForm>;
}
