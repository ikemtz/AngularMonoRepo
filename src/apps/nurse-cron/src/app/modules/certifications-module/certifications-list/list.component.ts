import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent, KENDO_GRID } from '@progress/kendo-angular-grid';
import {
  ImngKendoGridODataModule,
  KendoODataBasedComponent,
} from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { CertificationListFacade } from './list.facade';
import {
  CertificationAddComponent,
  CertificationCrudFacade,
  CertificationEditComponent,
} from '../certifications-crud';
import {
  CertificationProperties,
  ICertification,
} from '../../../models/certifications-odata';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { KENDO_MENUS } from '@progress/kendo-angular-menu';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    CertificationProperties.ID,
    CertificationProperties.NAME,
    CertificationProperties.IS_ENABLED,
    CertificationProperties.EXPIRES_ON_UTC,
  ],
  sort: [{ field: CertificationProperties.NAME, dir: 'asc' }],
};

@Component({
  selector: 'nrcrn-certification-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    SlicePipe,
    KENDO_GRID,
    KENDO_MENUS,
    KENDO_SVGICON,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ImngKendoGridFilteringModule,
    ImngDataEntryDialogModule,
    CertificationAddComponent,
    CertificationEditComponent,
  ],
})
export class CertificationListComponent extends KendoODataBasedComponent<
  ICertification,
  CertificationListFacade
> {
  readonly crudFacade = inject(CertificationCrudFacade);

  public readonly props = CertificationProperties;
  public currentItem: ICertification | undefined;

  constructor() {
    const facade = inject(CertificationListFacade);
    const router = inject(Router);

    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: ICertification): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: ICertification): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
