import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { CertificationsPartialState } from '../+state/certification.reducer';
import { certificationQueries } from '../+state/certification.selectors';
import * as certificationActionTypes from '../+state/certification.actions';
import { ICertification } from '../../../models/certifications-odata';

@Injectable()
export class CertificationListFacade
  implements IKendoODataGridFacade<ICertification>, IDataDeleteFacade<ICertification>
{
  loading$ = this.store.pipe(select(certificationQueries.getLoading));
  gridODataState$ = this.store.pipe(select(certificationQueries.getGridODataState));
  gridData$ = this.store.pipe(select(certificationQueries.getCertifications));
  gridPagerSettings$ = this.store.pipe(select(certificationQueries.getPagerSettings));

  constructor(private readonly store: Store<CertificationsPartialState>) {}

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
