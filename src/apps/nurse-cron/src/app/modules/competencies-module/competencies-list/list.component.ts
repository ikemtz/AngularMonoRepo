import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent, KENDO_GRID } from '@progress/kendo-angular-grid';
import {
  ImngKendoGridODataModule,
  KendoODataBasedComponent,
} from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { CompetencyListFacade } from './list.facade';
import {
  CompetencyAddComponent,
  CompetencyCrudFacade,
  CompetencyEditComponent,
} from '../competencies-crud';
import {
  CompetencyProperties,
  ICompetency,
} from '../../../models/competencies-odata';
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
    CompetencyProperties.ID,
    CompetencyProperties.NAME,
    CompetencyProperties.IS_ENABLED,
  ],
  sort: [{ field: CompetencyProperties.NAME, dir: 'asc' }],
};

@Component({
  selector: 'nrcrn-competency-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    CompetencyAddComponent,
    CompetencyEditComponent,
  ],
})
export class CompetencyListComponent extends KendoODataBasedComponent<
  ICompetency,
  CompetencyListFacade
> {
  readonly crudFacade = inject(CompetencyCrudFacade);

  public readonly props = CompetencyProperties;
  public currentItem: ICompetency | undefined;

  constructor() {
    const facade = inject(CompetencyListFacade);
    const router = inject(Router);

    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: ICompetency): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: ICompetency): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
