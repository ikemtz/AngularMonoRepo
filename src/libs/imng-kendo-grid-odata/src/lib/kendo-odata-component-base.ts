import { Observable, isObservable } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { OnInit, OnDestroy, InjectionToken, Inject, Directive } from '@angular/core';
import { ODataState, ODataResult, Expander } from 'imng-kendo-odata';
import { ODataGridStateChangeEvent } from './kendo-odata-grid-state-change-event';
import { IKendoODataGridFacade } from './kendo-odata-grid-facade';
import { Router } from '@angular/router';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { CompositeFilterDescriptor, FilterDescriptor, isCompositeFilterDescriptor } from '@progress/kendo-data-query';

const FACADE = new InjectionToken<IKendoODataGridFacade<unknown>>('imng-grid-odata-facade');
const STATE = new InjectionToken<ODataState>('imng-grid-odata-odataState');

@Directive()
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class KendoODataComponentBase<ENTITY, FACADE extends IKendoODataGridFacade<ENTITY>>
  implements OnInit, OnDestroy, Subscribable
{
  public readonly allSubscriptions = new Subscriptions();
  public gridStateQueryKey = 'odataState';
  public gridDataState: ODataState;
  public gridDataResult$: Observable<ODataResult<ENTITY>>;
  public loading$: Observable<boolean>;
  public gridPagerSettings$: Observable<false | PagerSettings>;
  /**
   * A properties enum to make kendo grid columns definitions type safe
   * {@example <kendo-grid-column [field]="props.FIELD_NAME">}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract readonly props: any; //NOSONAR
  protected expanders: (string | Expander)[];
  protected transformations: string;

  constructor(
    @Inject(FACADE) public readonly facade: FACADE,
    @Inject(STATE) public readonly state: ODataState | Observable<ODataState>,
    public readonly router: Router = null,
    public readonly gridRefresh$: Observable<unknown> = null,
  ) {
    this.loading$ = this.facade.loading$;
    this.gridDataResult$ = this.facade.gridData$;
    this.gridPagerSettings$ = this.facade.gridPagerSettings$;
    if (this.router?.routerState?.snapshot?.root.queryParams[this.gridStateQueryKey]) {
      try {
        this.gridDataState = this.deserializeODataState(
          this.router?.routerState?.snapshot?.root?.queryParams[this.gridStateQueryKey],
        );
      } catch (e) {
        console.error(`Exception thrown while deserializing query string parameter: ${this.gridStateQueryKey}.`);
      }
    }
    if (isObservable(state)) {
      this.allSubscriptions.push(
        state.subscribe((t) => {
          this.gridDataState = t;
          this.expanders = t.expanders;
          this.transformations = t.transformations;
        }),
      );
    } else {
      this.gridDataState = this.gridDataState
        ? { ...this.gridDataState, selectors: state.selectors, expanders: state.expanders }
        : state;
      this.expanders = state.expanders;
      this.transformations = state.transformations;
    }
    if (gridRefresh$) {
      this.allSubscriptions.push(gridRefresh$.subscribe(() => this.loadEntities(this.gridDataState)));
    }
  }

  public ngOnInit(): void {
    if (!this.gridRefresh$) {
      this.loadEntities(this.gridDataState);
    }
  }

  public deserializeODataState(stateQueryParam: string): ODataState {
    const state: ODataState = JSON.parse(atob(stateQueryParam));
    state.filter?.filters?.forEach((filter) => this.normalizeFilters(filter));
    return state;
  }

  public normalizeFilters(filter: FilterDescriptor | CompositeFilterDescriptor) {
    if (isCompositeFilterDescriptor(filter)) {
      this.normalizeFilters(filter);
    } else if (
      (filter?.field as string)?.toUpperCase().endsWith('DATE') ||
      (filter?.field as string)?.toUpperCase().endsWith('UTC')
    ) {
      filter.value = new Date(filter.value);
    }
  }

  public serializeODataState(odataState: ODataState): string {
    return btoa(JSON.stringify(odataState));
  }

  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
  /**
   * Will reset filters to initialGrid state passed into the constructor
   */
  public resetFilters(): void {
    if (!isObservable(this.state)) {
      this.gridDataState = {
        ...this.gridDataState,
        filter: this.state.filter,
        inFilters: this.state.inFilters,
        childFilters: this.state.childFilters,
      };
      this.loadEntities(this.gridDataState);
    }
  }

  public dataStateChange(state: ODataGridStateChangeEvent): void {
    this.gridDataState = {
      ...state,
      expanders: this.expanders,
      transformations: this.transformations,
    };
    this.loadEntities(this.gridDataState);
  }

  public excelData = (): Observable<ODataResult<ENTITY>> => this.gridDataResult$;

  public loadEntities(odataState: ODataState): void {
    this.gridDataState = odataState;
    this.expanders = odataState.expanders;
    this.transformations = odataState.transformations;
    this.facade.loadEntities(this.gridDataState);
    if (this.router) {
      const tempState = { ...odataState };
      delete tempState.selectors;
      delete tempState.expanders;
      this.router.navigate([], {
        relativeTo: this.router.routerState.root,
        queryParams: {
          [this.gridStateQueryKey]: this.serializeODataState(tempState),
        },
        skipLocationChange: false,
        queryParamsHandling: 'merge',
      });
    }
  }

  public reloadEntities(): void {
    this.facade.reloadEntities();
  }
}
