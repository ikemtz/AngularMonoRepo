import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { certificationsFeature } from '../+state/certification.reducer';
import { certificationQueries } from '../+state/certification.selectors';
import * as certificationActionTypes from '../+state/certification.actions';
import { ICertification } from '../../../models/certifications-odata';

@Injectable()
export class CertificationCrudFacade implements IDataEntryFacade<ICertification> {
  loading$ = this.store.select(certificationsFeature.selectLoading);
  currentEntity$ = this.store.select(certificationQueries.selectCurrentCertification);
  isEditActive$ = this.store.select(certificationQueries.selectIsEditCertificationActive);
  isNewActive$ = this.store.select(certificationQueries.selectIsNewCertificationActive);

  constructor(private readonly store: Store) { }

  public setCurrentEntity(item: ICertification): void {
    this.store.dispatch(certificationActionTypes.setCurrentCertification(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(certificationActionTypes.clearCurrentCertification());
  }

  public saveNewEntity(item: ICertification): void {
    this.store.dispatch(certificationActionTypes.saveCertificationRequest(item));
  }

  public updateExistingEntity(item: ICertification): void {
    this.store.dispatch(certificationActionTypes.updateCertificationRequest(item));
  }

}
