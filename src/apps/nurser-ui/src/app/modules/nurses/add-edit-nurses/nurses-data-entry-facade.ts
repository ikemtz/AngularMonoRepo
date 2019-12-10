import { IEmployee } from '../../models/emp-api';
import { Injectable } from '@angular/core';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { Store, select } from '@ngrx/store';
import { NursesPartialState } from '../+state/nurses.reducer'; 
import {
  clearCurrentNurseItem,
  saveNurseRequest,
  updateNurseRequest,
  setCurrentNurseItem,
} from '../+state/nurses.actions';
import { queries } from './nurses-data-entry.selectors';

@Injectable()
export class NursesDataEntryFacade implements IDataEntryFacade<IEmployee> {
  constructor(private readonly store: Store<NursesPartialState>) {}
  loading$ = this.store.pipe(select(queries.getLoading));
  currentEntity$ = this.store.pipe(select(queries.getCurrentEntity));
  isEditActive$ = this.store.pipe(select(queries.getIsEditActive));
  isNewActive$ = this.store.pipe(select(queries.getIsNewActive));
  setCurrentEntity(entity: IEmployee): void {
    this.store.dispatch(setCurrentNurseItem(entity));
  }
  clearCurrentEntity(): void {
    this.store.dispatch(clearCurrentNurseItem());
  }
  saveNewEntity(entity: IEmployee): void {
    this.store.dispatch(saveNurseRequest(entity));
  }
  updateExistingEntity(entity: IEmployee): void {
    this.store.dispatch(updateNurseRequest(entity));
  }
}
