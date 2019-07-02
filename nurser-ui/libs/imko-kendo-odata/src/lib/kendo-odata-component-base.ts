import { KendoODataFacadeBase } from './kendo-odata-facade';
import { Observable } from 'rxjs';
import { PagerSettings, GridDataResult, SortSettings } from '@progress/kendo-angular-grid';
import { OnInit } from '@angular/core'; 
import { ODataGridState, ODataGridStateChangeEvent } from './odata-grid-state';
import { ODataGridDataResult } from './odata-grid-data-result';

export abstract class KendoODataComponentBase<
  ENTITY,
  PARTIALSTATE,
  FASCADE extends KendoODataFacadeBase<ENTITY, PARTIALSTATE>
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

  constructor(protected fascade: FASCADE, state: ODataGridState) {
    this.loading$ = this.fascade.loading$;
    this.gridDataResult$ = this.fascade.gridDataResult$;
    this.gridPagerSettings$ = this.fascade.gridPagerSettings$;
    this.gridDataState = state;
    this.expanders = state.expanders;
  }

  ngOnInit(): void {
    this.fascade.loadData(this.gridDataState);
  }

  public dataStateChange(state: ODataGridStateChangeEvent): void {
    this.gridDataState = {
      ...state,
      expanders: this.expanders
    };
    this.fascade.loadData(this.gridDataState);
  }

  public excelData = (): Observable<GridDataResult> => {
    return this.fascade.gridDataResult$;
  };
}
