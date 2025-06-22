import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { IProductForm } from '../../../models/odata';
import {
  IProductCategory,
  IProductModel,
  ProductCategoryProperties,
  ProductFormGroupFac,
  ProductModelProperties,
  ProductProperties,
} from '../../../models/webapi';

import { ProductCrudFacade } from './crud.facade';

@Component({
    template: '',
    standalone: false
})
export abstract class ProductBaseEntryComponent
  extends BaseDataEntryComponent<ProductCrudFacade>
  implements OnInit
{
  public readonly props = ProductProperties;
  public readonly productModelProps = ProductModelProperties;
  public readonly productModels$: Observable<IProductModel[]>;
  public readonly productModelFilter$ = new BehaviorSubject('');
  public readonly productCategoryProps = ProductCategoryProperties;
  public readonly productCategories$: Observable<IProductCategory[]>;
  public readonly productCategoryFilter$ = new BehaviorSubject('');
  public addEditForm: FormGroup<IProductForm>;

  constructor(facade: ProductCrudFacade) {
    super(facade);
    this.productModels$ = facade.productModels$.pipe(
      switchMap((productModels) =>
        this.productModelFilter$.pipe(
          map((productModelFilter) =>
            productModelFilter
              ? productModels.filter(
                  (productModel) =>
                    (productModel.name &&
                      productModel.name
                        .toLowerCase()
                        .indexOf(productModelFilter) >= 0) ||
                    (productModel.description &&
                      productModel.description
                        .toLowerCase()
                        .indexOf(productModelFilter) >= 0),
                )
              : productModels,
          ),
        ),
      ),
    );
    this.productCategories$ = facade.productCategories$.pipe(
      switchMap((productCategories) =>
        this.productCategoryFilter$.pipe(
          map((productCategoryFilter) =>
            productCategoryFilter
              ? productCategories.filter(
                  (productCategory) =>
                    productCategory.name &&
                    productCategory.name
                      .toLowerCase()
                      .indexOf(productCategoryFilter) >= 0,
                )
              : productCategories,
          ),
        ),
      ),
    );
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.facade.loadProductModels({
      selectors: [
        ProductModelProperties.ID,
        ProductModelProperties.NAME,
        ProductModelProperties.DESCRIPTION,
      ],
    });
    this.facade.loadProductCategories({
      selectors: [ProductCategoryProperties.ID, ProductCategoryProperties.NAME],
    });
  }

  public initForm(): void {
    this.addEditForm = ProductFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }

  public handleProductModelFilter(value: string) {
    this.productModelFilter$.next(value.toLowerCase());
  }
  public handleProductCategoryFilter(value: string) {
    this.productCategoryFilter$.next(value.toLowerCase());
  }
}
