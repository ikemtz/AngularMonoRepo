/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup } from '@angular/forms'; //NOSONAR
import { IProductForm } from './product.form';

export interface IProductCategoryForm {
  id: FormControl<string | null | undefined>;
  name: FormControl<string>;
  products: FormArray<FormGroup<IProductForm>>;
}
