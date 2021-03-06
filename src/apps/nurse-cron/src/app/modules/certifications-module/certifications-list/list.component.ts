import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { faPlusCircle, faCheck, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { CertificationListFacade } from './list.facade';
import { CertificationCrudFacade } from '../certifications-crud';
import { CertificationProperties, ICertification } from '../../../models/certifications-odata';
import { Router } from '@angular/router';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    CertificationProperties.ID,
    CertificationProperties.NAME,
    CertificationProperties.IS_ENABLED,
    CertificationProperties.EXPIRES_ON_UTC,
  ],
  sort: [
    { field: CertificationProperties.ID, dir: 'asc' },
  ],
};

@Component({
  selector: 'nrcrn-certification-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationListComponent extends KendoODataComponentBase<ICertification, CertificationListFacade> {
  public readonly props = CertificationProperties;
  public currentItem: ICertification;
  public readonly faPlusCircle = faPlusCircle;
  public readonly faCheck = faCheck;
  public readonly faEdit = faEdit;
  public readonly faTrash = faTrash;

  constructor(facade: CertificationListFacade, public readonly crudFacade: CertificationCrudFacade, router: Router) {
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
