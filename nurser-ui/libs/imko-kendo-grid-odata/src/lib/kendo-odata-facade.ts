import { Observable } from 'rxjs'; 
import { PagerSettings } from '@progress/kendo-angular-grid';
import { select, Store } from '@ngrx/store';
import { KendoODataSelector } from './kendo-odata-selector';
import { ODataGridState } from './odata-grid-state';
import { ODataGridDataResult } from './odata-grid-data-result';

export abstract class KendoODataFacadeBase<Entity, PartialState> {

  loading$: Observable<boolean> = (<any>this.store).pipe(select(this.selector.getLoading));
  gridODataState$: Observable<ODataGridState> = (<any>this.store).pipe(select(this.selector.getGridODataState));
  gridGridDataResult: Observable<ODataGridDataResult<Entity>> = (<any>this.store).pipe(
    select(this.selector.getGridDataResult)
  );
  currentEntity$: Observable<Entity> = (<any>this.store).pipe(select(this.selector.getCurrentEntity));
  gridPagerSettings$: Observable<false | PagerSettings> = (<any>this.store).pipe(
    select(this.selector.getPagerSettings)
  );

  constructor(protected store: Store<PartialState>, protected selector: KendoODataSelector<Entity>) { }

  abstract loadData(state: ODataGridState): void;
  abstract addNewEntity(entity: Entity): void;
  abstract clearCurrentEntity(): void;
  abstract saveEntity(entity: Entity): void;
}
