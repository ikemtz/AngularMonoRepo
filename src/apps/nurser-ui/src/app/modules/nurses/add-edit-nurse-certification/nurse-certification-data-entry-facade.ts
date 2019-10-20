import { IEmployeeCertification } from '../../models/emp-api';
import { Injectable } from '@angular/core';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { Store, select } from '@ngrx/store';
import { NursesPartialState } from '../+state/nurses.reducer';
import { createPayload } from 'imng-ngrx-utils';
import {
  clearCurrentNurseItem,
  saveNurseCertificationRequest,
  updateNurseCertificationRequest,
  clearCurrentNurseCertificationItem,
} from '../+state/nurses.actions';
import { queries } from './nurse-certification-data-entry.selectors';

@Injectable()
export class NurseCertificationDataEntryFacade implements IDataEntryFacade<IEmployeeCertification> {
  constructor(private readonly store: Store<NursesPartialState>) {}
  loading$ = this.store.pipe(select(queries.getLoading));
  currentNurse$ = this.store.pipe(select(queries.getCurrentNurse));
  currentEntity$ = this.store.pipe(select(queries.getCurrentEntity));
  isEditActive$ = this.store.pipe(select(queries.getIsEditActive));
  isNewActive$ = this.store.pipe(select(queries.getIsNewActive));
  clearCurrentEntity(): void {
    this.store.dispatch(clearCurrentNurseCertificationItem());
  }
  saveNewEntity(entity: IEmployeeCertification): void {
    this.store.dispatch(saveNurseCertificationRequest(createPayload(entity)));
  }
  updateExistingEntity(entity: IEmployeeCertification): void {
    this.store.dispatch(updateNurseCertificationRequest(createPayload(entity)));
  }
}
