import { Observable, Subscription, isObservable } from 'rxjs';
import { PagerSettings, GridDataResult, SortSettings } from '@progress/kendo-angular-grid';
import { OnInit, OnDestroy } from '@angular/core';
import { ODataState, ODataResult } from 'imng-kendo-odata';
import { ODataGridStateChangeEvent } from './kendo-odata-grid-state-change-event';
import { IKendoODataGridFacade } from './kendo-odata-grid-facade';
export abstract class KendoODataComponentBase<ENTITY, FACADE extends IKendoODataGridFacade<ENTITY>>
  implements OnInit, OnDestroy {
  protected allSubscription: Subscription[] = [];
  public gridDataState: ODataState;
  public readonly gridDataResult$: Observable<ODataResult<ENTITY>>;
  public readonly loading$: Observable<boolean>;
  public readonly gridPagerSettings$: Observable<false | PagerSettings>;
  /**
   * A properties enum to make kendo grid columns definitions type safe
   * {@example <kendo-grid-column [field]="props.FIELD_NAME">}
   */
  public abstract readonly props: any;
  public readonly sortSettings: SortSettings = {
    allowUnsort: true,
    mode: 'multiple',
  };
  protected expanders: string[];

  constructor(
    protected readonly facade: FACADE,
    protected readonly state: ODataState | Observable<ODataState>,
    protected readonly gridRefresh$: Observable<any> = null,
  ) {
    this.loading$ = this.facade.loading$;
    this.gridDataResult$ = this.facade.gridDataResult$;
    this.gridPagerSettings$ = this.facade.gridPagerSettings$;
    if (isObservable(state)) {
      this.allSubscription.push(
        state.subscribe(t => {
          this.gridDataState = t;
          this.expanders = t.expanders;
        }),
      );
    } else {
      this.gridDataState = state;
      this.expanders = state.expanders;
    }
    if (gridRefresh$) {
      this.allSubscription.push(gridRefresh$.subscribe(() => this.facade.loadEntities(this.gridDataState)));
    }
  }

  ngOnInit(): void {
    if (!this.gridRefresh$) {
      this.facade.loadEntities(this.gridDataState);
    }
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
      expanders: this.expanders,
    };
    this.facade.loadEntities(this.gridDataState);
  }

  public excelData = (): Observable<GridDataResult> => {
    return this.facade.gridDataResult$;
  };
}
