import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { certificationsFeature } from '../+state/certification.reducer';
import * as certificationActionTypes from '../+state/certification.actions';
import { ICertification } from '../../../models/certifications-odata';

@Injectable()
export class CertificationListFacade implements IKendoODataGridFacade<ICertification>, IDataDeleteFacade<ICertification> {
  loading$ = this.store.select(certificationsFeature.selectLoading);
  gridData$ = this.store.select(certificationsFeature.selectGridData);
  gridPagerSettings$ = this.store.select(certificationsFeature.selectGridPagerSettings);
  gridODataState$ = this.store.select(certificationsFeature.selectGridODataState);

  constructor(private readonly store: Store) { }

  public loadEntities(state: ODataState): void {
    this.store.dispatch(certificationActionTypes.loadCertificationsRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(certificationActionTypes.reloadCertificationsRequest());
  }

  public deleteExistingEntity(entity: ICertification): void {
    this.store.dispatch(certificationActionTypes.deleteCertificationRequest(entity));
  }
}
