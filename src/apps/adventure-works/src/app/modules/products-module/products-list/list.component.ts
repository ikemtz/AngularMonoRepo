import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { ProductListFacade } from './list.facade';
import { ProductCrudFacade } from '../products-crud';
import {
  IProduct,
  ProductCategoryProperties,
  ProductModelProperties,
  ProductProperties,
} from '../../../models/odata';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    ProductProperties.ID,
    ProductProperties.NAME,
    ProductProperties.NUM,
    ProductProperties.COLOR,
    ProductProperties.STANDARD_COST,
    ProductProperties.LIST_PRICE,
    ProductProperties.SIZE,
    ProductProperties.WEIGHT,
    ProductProperties.PRODUCT_CATEGORY_ID,
    ProductProperties.PRODUCT_MODEL_ID,
    ProductProperties.SELL_START_DATE,
    ProductProperties.SELL_END_DATE,
    ProductProperties.DISCONTINUED_DATE,
    ProductProperties.THUMB_NAIL_PHOTO,
  ],
  sort: [{ field: ProductProperties.LIST_PRICE, dir: 'desc' }],
  expanders: [
    {
      table: ProductProperties.PRODUCT_MODEL,
      selectors: [
        ProductModelProperties.ID,
        ProductModelProperties.NAME,
        ProductModelProperties.DESCRIPTION,
      ],
    },
    {
      table: ProductProperties.PRODUCT_CATEGORY,
      selectors: [ProductCategoryProperties.ID, ProductCategoryProperties.NAME],
    },
  ],
};

@Component({
    selector: 'aw-product-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProductListComponent extends KendoODataBasedComponent<
  IProduct,
  ProductListFacade
> {
  public readonly props = ProductProperties;
  public readonly productModelProps = ProductModelProperties;
  public readonly productCategoryProps = ProductCategoryProperties;
  public currentItem: IProduct | undefined;

  constructor(
    facade: ProductListFacade,
    public readonly crudFacade: ProductCrudFacade,
    router: Router,
    private domSanitizer: DomSanitizer,
  ) {
    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: IProduct): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: IProduct): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }

  public getFormatSrc(base64Image: string, format = 'png'): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(
      `data:image/${format};base64, ${base64Image}`,
    );
  }
}
