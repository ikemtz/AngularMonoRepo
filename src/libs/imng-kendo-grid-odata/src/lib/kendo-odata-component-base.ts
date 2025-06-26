import { Observable, first, isObservable, map } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { OnInit, OnDestroy, InjectionToken, Component, inject } from '@angular/core';
import { ODataState, ODataResult, Expander } from 'imng-kendo-odata';
import { GridStateChangeEvent, KendoGridBaseComponent } from 'imng-kendo-grid';
import { IKendoODataGridFacade } from './kendo-odata-grid-facade';
import { Router } from '@angular/router';
import { Subscribable } from 'imng-ngrx-utils';
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
  isCompositeFilterDescriptor,
} from '@progress/kendo-data-query';

const FACADE = new InjectionToken<IKendoODataGridFacade<unknown>>(
  'imng-grid-odata-facade',
);
const STATE = new InjectionToken<ODataState>('imng-grid-odata-odataState');

@Component({
    template: '',
    standalone: false
})
export abstract class KendoODataBasedComponent<
    ENTITY,
    FACADE extends IKendoODataGridFacade<ENTITY>,
  >
  extends KendoGridBaseComponent<ENTITY>
  implements OnInit, OnDestroy, Subscribable
{
  readonly facade = inject<FACADE>(FACADE);
  readonly state = inject<ODataState | Observable<ODataState>>(STATE);
  readonly router = inject(Router) ?? null;
  readonly gridRefresh$ = inject<Observable<unknown> | null>(Observable<unknown>) ?? null;

  /**
   * This sets the amount of the maximum amount of sortable columns for this component.  Default = 5.
   */
  public maxSortedColumnCount = 5; //NOSONAR
  /**
   * This will allow you to provide a visual indicator that some of the columns have been hidden.
   */
  public hasHiddenColumns$: Observable<boolean>;
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
  protected expanders?: Expander[];
  protected transformations?: string;

  /**
   * The default filter descriptor is set by developer in the constructor initialization.
   * This is used to reset the filter when the "Clear Filter" button is clicked.
   *
   * @public
   * @type {CompositeFilterDescriptor | undefined}
   */
  public defaultFilter: CompositeFilterDescriptor | undefined;

  constructor() {
    super();
    const state = this.state;
    const gridRefresh$ = this.gridRefresh$;

    if (
      this.router?.routerState?.snapshot?.root.queryParams[
        this.gridStateQueryKey
      ]
    ) {
      try {
        this.gridDataState = this.deserializeODataState(
          this.router?.routerState?.snapshot?.root?.queryParams[
            this.gridStateQueryKey
          ],
        );
      } catch {
        console.error(
          //NOSONAR
          `Exception thrown while deserializing query string parameter: ${this.gridStateQueryKey}.`,
        );
      }
    }
    if (isObservable(state)) {
      this.allSubscriptions.push(
        state.subscribe((t) => {
          this.gridDataState = t;
          this.expanders = t.expanders;
          this.transformations = t.transformations;
        }),
        state.pipe(first()).subscribe((t) => (this.defaultFilter = t.filter)),
      );
    } else {
      this.gridDataState = this.gridDataState
        ? {
            ...this.gridDataState,
            selectors: state.selectors,
            expanders: state.expanders,
          }
        : state;
      this.expanders = state.expanders;
      this.defaultFilter = state.filter;
      this.transformations = state.transformations;
    }
    if (gridRefresh$) {
      this.allSubscriptions.push(
        gridRefresh$.subscribe(() => this.loadEntities(this.gridDataState)),
      );
    }
  }

  public ngOnInit(): void {
    if (!this.gridRefresh$) {
      this.loadEntities(this.gridDataState);
    }
    this.loading$ = this.facade.loading$;
    this.gridDataResult$ = this.facade.gridData$?.pipe(
      map((gridData) => (gridData ? gridData : { total: 0, data: [] })),
    );
    this.gridPagerSettings$ = this.facade.gridPagerSettings$;
  }

  public deserializeODataState(stateQueryParam: string): ODataState {
    const state: ODataState = JSON.parse(atob(stateQueryParam));
    state.filter?.filters?.forEach((filter) => this.normalizeFilters(filter));
    return state;
  }

  /**
   * This method ensures the proper handling of date filters in an OData query
   * @param filter
   */
  public normalizeFilters(
    filter: FilterDescriptor | CompositeFilterDescriptor,
  ) {
    if (isCompositeFilterDescriptor(filter)) {
      filter.filters.forEach(this.normalizeFilters);
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
  /**
   * Will reset filters to initialGrid state passed into the constructor
   */
  public resetFilters(): void {
    this.gridDataState = {
      ...this.gridDataState,
      filter: this.defaultFilter,
    };
    if (!isObservable(this.state)) {
      this.gridDataState = {
        ...this.gridDataState,
        inFilters: this.state.inFilters,
        childFilters: this.state.childFilters,
      };
    }
    this.loadEntities(this.gridDataState);
  }

  public dataStateChange(state: GridStateChangeEvent | ODataState): void {
    this.gridDataState = {
      ...state,
      expanders: this.expanders,
      transformations: this.transformations,
    };
    this.loadEntities(this.gridDataState);
  }

  public excelData = (): Observable<ODataResult<ENTITY>> =>
    this.gridDataResult$;

  public loadEntities(odataState: ODataState): void {
    odataState = this.validateSortParameters(odataState);
    this.gridDataState = odataState;
    this.expanders = odataState.expanders;
    this.transformations = odataState.transformations;
    this.facade.loadEntities(this.gridDataState);
    this.updateRouterState(odataState);
  }

  public validateSortParameters(state: ODataState): ODataState {
    if (state.sort && (state.sort?.length || 0) > this.maxSortedColumnCount) {
      state = {
        ...state,
        sort: state.sort.slice(0, this.maxSortedColumnCount),
      };
      console.warn(
        `You have exceeded the limit of ${this.maxSortedColumnCount} sorted columns for the current grid. MAX-Sorted-Column-Count`,
      ); //NOSONAR
    }
    return state;
  }

  public updateRouterState(state: ODataState): void {
    if (this.router) {
      const tempState = { ...state };
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
