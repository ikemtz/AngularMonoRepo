import { KendoODataFacadeBase } from './kendo-odata-facade';
import { Observable, Subscription } from 'rxjs';
import { PagerSettings, GridDataResult, SortSettings } from '@progress/kendo-angular-grid';
import { OnInit, OnDestroy } from '@angular/core';
import { ODataGridState, ODataGridStateChangeEvent } from './odata-grid-state';
import { ODataGridDataResult } from './odata-grid-data-result';

export abstract class KendoODataComponentBase<
  ENTITY,
  PARTIALSTATE,
  FACADE extends KendoODataFacadeBase<ENTITY, PARTIALSTATE>
  > implements OnInit, OnDestroy {
  private allSubscription: Subscription[] = [];
  public gridDataState: ODataGridState;
  public readonly gridDataResult$: Observable<ODataGridDataResult<ENTITY>>;
  public readonly loading$: Observable<boolean>;
  public readonly gridPagerSettings$: Observable<false | PagerSettings>;
  public readonly sortSettings: SortSettings = {
    allowUnsort: true,
    mode: 'multiple'
  };

  private readonly expanders: string[];

  constructor(protected facade: FACADE, state: ODataGridState, gridRefresh$: Observable<any> = null) {
    this.loading$ = this.facade.loading$;
    this.gridDataResult$ = this.facade.gridDataResult$;
    this.gridPagerSettings$ = this.facade.gridPagerSettings$;
    this.gridDataState = state;
    this.expanders = state.expanders;
    if (gridRefresh$) {
      this.allSubscription.push(
        gridRefresh$.subscribe(() => this.facade.loadEntities(this.gridDataState))
      );
    }
  }

  ngOnInit(): void {
    this.facade.loadEntities(this.gridDataState);
  }

  ngOnDestroy(): void {
    this.allSubscription.forEach(element => {
      if (element) {
        element.unsubscribe();
      }
    });
  }

  public dataStateChange(state: ODataGridStateChangeEvent): void {
    this.gridDataState = {
      ...state,
      expanders: this.expanders
    };
    this.facade.loadEntities(this.gridDataState);
  }

  public excelData = (): Observable<GridDataResult> => {
    return this.facade.gridDataResult$;
  };
}
