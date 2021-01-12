/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { select, Store } from '@ngrx/store';
import { KendoODataSelector } from './kendo-odata-selector';
import { ODataState, ODataResult } from 'imng-kendo-odata';
import { IKendoODataGridFacade } from './kendo-odata-grid-facade';

export abstract class KendoODataFacadeBase<Entity, PartialState> implements IKendoODataGridFacade<Entity> {
  loading$: Observable<boolean> = (this.store as Observable<any>).pipe(select(this.selector.getLoading));
  gridODataState$: Observable<ODataState> = (this.store as Observable<any>).pipe(select(this.selector.getGridODataState));
  gridData$: Observable<ODataResult<Entity>> = (this.store as Observable<any>).pipe(select(this.selector.getGridData));
  gridPagerSettings$: Observable<false | PagerSettings> = (this.store as Observable<any>).pipe(
    select(this.selector.getPagerSettings),
  );

  constructor(protected store: Store<PartialState>, protected selector: KendoODataSelector) { }

  abstract loadEntities(state: ODataState): void;
}
