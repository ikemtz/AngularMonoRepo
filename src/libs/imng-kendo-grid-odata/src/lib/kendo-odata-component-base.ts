import { Observable, Subscription, isObservable } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { OnInit, OnDestroy, Directive } from '@angular/core';
import { ODataState, ODataResult, Expander } from 'imng-kendo-odata';
import { ODataGridStateChangeEvent } from './kendo-odata-grid-state-change-event';
import { IKendoODataGridFacade } from './kendo-odata-grid-facade';
import { RouterState } from '@angular/router';

/** @dynamic */@Directive()
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class KendoODataComponentBase<ENTITY, FACADE extends IKendoODataGridFacade<ENTITY>>
  implements OnInit, OnDestroy {
  protected allSubscription: Subscription[] = [];
  public gridStateQueryKey = 'odataState';
  public gridDataState: ODataState;
  public readonly gridDataResult$: Observable<ODataResult<ENTITY>>;
  public loading$: Observable<boolean>;
  public readonly gridPagerSettings$: Observable<false | PagerSettings>;
  /**
   * A properties enum to make kendo grid columns definitions type safe
   * {@example <kendo-grid-column [field]="props.FIELD_NAME">}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract readonly props: any;  //NOSONAR
  protected expanders: (string | Expander)[];
  protected transformations: string;

  constructor(
    public readonly facade: FACADE,
    protected readonly state: ODataState | Observable<ODataState>,
    protected readonly gridRefresh$: Observable<unknown> = null,
    public readonly router: RouterState = null,
  ) {
    this.loading$ = this.facade.loading$;
    this.gridDataResult$ = this.facade.gridData$;
    this.gridPagerSettings$ = this.facade.gridPagerSettings$;
    if (this.router?.snapshot?.root.queryParams[this.gridStateQueryKey]) {
      this.state = JSON.parse(this.router?.snapshot?.root?.queryParams[this.gridStateQueryKey]);
    }
    if (isObservable(state)) {
      this.allSubscription.push(
        state.subscribe(t => {
          this.gridDataState = t;
          this.expanders = t.expanders;
          this.transformations = t.transformations;
        }),
      );
    } else {
      this.gridDataState = state;
      this.expanders = state.expanders;
      this.transformations = state.transformations;
    }
    if (gridRefresh$) {
      this.allSubscription.push(gridRefresh$.subscribe(() => this.loadEntities(this.gridDataState)));
    }
  }

  ngOnInit(): void {
    if (!this.gridRefresh$) {
      this.loadEntities(this.gridDataState);
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
      transformations: this.transformations,
    };
    this.facade.loadEntities(this.gridDataState);
  }

  public excelData = (): Observable<ODataResult<ENTITY>> => this.gridDataResult$;

  public loadEntities(state: ODataState): void {
    this.gridDataState = state;
    this.expanders = state.expanders;
    this.transformations = state.transformations;
    this.facade.loadEntities(this.gridDataState);
    this.router.snapshot.root.queryParams[this.gridStateQueryKey] = JSON.stringify(this.state);
  }
}
