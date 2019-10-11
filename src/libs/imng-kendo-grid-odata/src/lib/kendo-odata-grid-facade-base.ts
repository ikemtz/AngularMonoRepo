import { Observable } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { select, Store } from '@ngrx/store';
import { KendoODataSelector } from './kendo-odata-selector';
import { ODataState, ODataResult } from 'imng-kendo-odata';
import { IKendoODataGridFacade } from './kendo-odata-grid-facade';

export abstract class KendoODataFacadeBase<Entity, PartialState> implements IKendoODataGridFacade<Entity> {
  loading$: Observable<boolean> = (<Observable<any>>this.store).pipe(select(this.selector.getLoading));
  gridODataState$: Observable<ODataState> = (<Observable<any>>this.store).pipe(select(this.selector.getGridODataState));
  gridDataResult$: Observable<ODataResult<Entity>> = (<Observable<any>>this.store).pipe(
    select(this.selector.getGridDataResult),
  );
  gridPagerSettings$: Observable<false | PagerSettings> = (<Observable<any>>this.store).pipe(
    select(this.selector.getPagerSettings),
  );

  constructor(protected store: Store<PartialState>, protected selector: KendoODataSelector<Entity>) {}

  abstract loadEntities(state: ODataState): void;
}
