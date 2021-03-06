import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';

import { ProductListFacade } from './list.facade';
import { ProductCrudFacade } from '../products-crud';
import { IProduct, ProductProperties } from '../../../models';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    ProductProperties.ID,
    ProductProperties.NAME,
    ProductProperties.PRODUCT_NUMBER,
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
    ProductProperties.THUMBNAIL_PHOTO_FILE_NAME,
    ProductProperties.PRODUCT_CATEGORY,
    ProductProperties.PRODUCT_MODEL,
  ],
  sort: [
    { field: ProductProperties.ID, dir: 'asc' },
  ],
};

@Component({
  selector: 'aw-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent extends KendoODataComponentBase<IProduct, ProductListFacade> {
  public readonly props = ProductProperties;
  public currentItem: IProduct | undefined;

  constructor(facade: ProductListFacade, public readonly crudFacade: ProductCrudFacade) {
    super(facade, initialGridState);
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
}
