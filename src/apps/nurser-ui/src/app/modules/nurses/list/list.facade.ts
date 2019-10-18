import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromNurses from '../+state/nurses.reducer';
import * as NursesActions from '../+state/nurses.actions';
import { KendoODataFacadeBase, createKendoODataGridSelector } from 'imng-kendo-grid-odata';
import { IEmployee } from '../../models/emp-api';
import { createPayload } from 'imng-ngrx-utils';
import { ODataState } from 'imng-kendo-odata';

@Injectable()
export class ListFacade extends KendoODataFacadeBase<IEmployee, fromNurses.NursesPartialState> {
  addNewCertification(nurse: IEmployee) {
    this.store.dispatch(NursesActions.setCurrentNurseCertificationItem(createPayload({ nurse, certification: {} })));
  }
  addNewNurse() {
    this.store.dispatch(NursesActions.setCurrentNurseItem(createPayload({})));
  }
  editNurse(item: IEmployee) {
    this.store.dispatch(NursesActions.setCurrentNurseItem(createPayload(item)));
  }
  deleteNurse(item: IEmployee) {
    this.store.dispatch(NursesActions.deleteNurseRequest(createPayload(item)));
  }
  constructor(store: Store<fromNurses.NursesPartialState>) {
    super(
      store,
      createKendoODataGridSelector<IEmployee, fromNurses.NursesPartialState, fromNurses.NursesState>(
        fromNurses.NURSES_FEATURE_KEY,
      ),
    );
  }
  loadEntities(state: ODataState): void {
    this.store.dispatch(NursesActions.loadNursesRequest(createPayload(state)));
  }
}
