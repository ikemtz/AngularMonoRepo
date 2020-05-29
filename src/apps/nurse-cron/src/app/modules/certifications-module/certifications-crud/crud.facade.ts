import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ODataState } from 'imng-kendo-odata';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { CertificationsPartialState } from '../+state/certification.reducer';
import { certificationQueries } from '../+state/certification.selectors';
import * as certificationActionTypes from '../+state/certification.actions';
import { ICertification } from '../../../models/certifications-odata';

@Injectable()
export class CertificationCrudFacade implements IDataEntryFacade<ICertification> {
  loading$ = this.store.pipe(select(certificationQueries.getLoading));
  currentEntity$ = this.store.pipe(select(certificationQueries.getCurrentCertification));
  isEditActive$ = this.store.pipe(select(certificationQueries.getIsEditCertificationActive));
  isNewActive$ = this.store.pipe(select(certificationQueries.getIsNewCertificationActive));

  constructor(private readonly store: Store<CertificationsPartialState>) {}
  loadEntities(state: ODataState): void {}
  setCurrentEntity(item: ICertification): void {
    this.store.dispatch(certificationActionTypes.setCurrentCertification(item));
  }
  clearCurrentEntity(): void {
    this.store.dispatch(certificationActionTypes.clearCurrentCertification());
  }
  saveNewEntity(item: ICertification): void {
    this.store.dispatch(certificationActionTypes.saveCertificationRequest(item));
  }
  updateExistingEntity(item: ICertification): void {
    this.store.dispatch(certificationActionTypes.updateCertificationRequest(item));
  }
}
