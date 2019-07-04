import { KendoODataFacadeBase } from './kendo-odata-facade';
import { Observable } from 'rxjs';
import { PagerSettings, GridDataResult, SortSettings } from '@progress/kendo-angular-grid';
import { OnInit } from '@angular/core'; 
import { ODataGridState, ODataGridStateChangeEvent } from './odata-grid-state';
import { ODataGridDataResult } from './odata-grid-data-result';

export abstract class KendoODataComponentBase<
  ENTITY,
  PARTIALSTATE,
  FACADE extends KendoODataFacadeBase<ENTITY, PARTIALSTATE>
> implements OnInit {
  public gridDataState: ODataGridState;
  public readonly gridDataResult$: Observable<ODataGridDataResult<ENTITY>>;
  public readonly loading$: Observable<boolean>;
  public readonly gridPagerSettings$: Observable<false | PagerSettings>;
  public readonly sortSettings: SortSettings = {
    allowUnsort: true,
    mode: 'multiple'
  };

  private readonly expanders: string[];

  constructor(protected facade: FACADE, state: ODataGridState) {
    this.loading$ = this.facade.loading$;
    this.gridDataResult$ = this.facade.gridDataResult$;
    this.gridPagerSettings$ = this.facade.gridPagerSettings$;
    this.gridDataState = state;
    this.expanders = state.expanders;
  }

  ngOnInit(): void {
    this.facade.loadEntities(this.gridDataState);
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
