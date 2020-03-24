import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromMsal from './msal.reducer';
import * as MsalSelectors from './msal.selectors';

@Injectable()
export class MsalFacade {
  loaded$ = this.store.pipe(select(MsalSelectors.getMsalLoaded));
  allMsal$ = this.store.pipe(select(MsalSelectors.getAllMsal));
  selectedMsal$ = this.store.pipe(select(MsalSelectors.getSelected));

  constructor(private store: Store<fromMsal.MsalPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
