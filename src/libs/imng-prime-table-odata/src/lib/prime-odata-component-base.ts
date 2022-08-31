import { Observable, isObservable, map } from 'rxjs';
import {
  OnInit,
  OnDestroy,
  InjectionToken,
  Inject,
  Component,
} from '@angular/core';
import { IPrimeODataTableFacade } from './prime-odata-table-facade';
import { Router } from '@angular/router';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import {
  CompositeFilter,
  Expander,
  Filter,
  isCompositeFilter,
  ODataQuery,
} from 'imng-odata-client';
import { toLocalTimeStamp } from 'imng-nrsrx-client-utils';

const FACADE = new InjectionToken<
  IPrimeODataTableFacade<{ id?: string | null }>
>('imng-grid-odata-facade');
const STATE = new InjectionToken<ODataQuery>('imng-grid-odata-odataQuery');

@Component({ template: '' })
export abstract class ImngPrimeODataTableBaseComponent<
  ENTITY,
  FACADE extends IPrimeODataTableFacade<ENTITY>,
> implements OnInit, OnDestroy, Subscribable
{
  public readonly allSubscriptions = new Subscriptions();
  public readonly ENUM_DISPLAY_TEXT = 'displayText';
  public readonly ENUM_NAME = 'name';
  /**
   * This sets the amount of the maximum amount of sortable columns for this component.  Default = 5.
   */
  public maxSortedColumnCount = 5; //NOSONAR
  /**
   * This will allow you to provide a visual indicator that some of the columns have been hidden.
   */
  public hasHiddenColumns$: Observable<boolean>;
  public gridStateQueryKey = 'odataQuery';
  public gridDataState: ODataQuery;
  public gridData$: Observable<ENTITY[]>;
  public loading$: Observable<boolean>;
  public gridPagerSettings$: Observable<false>;
  public rowsPerPageOptions: number[] = [10, 20, 50, 100];
  /**
   * A properties enum to make prime table columns definitions type safe
   * {@example <td>{{ dataItem[props.FIELD_NAME] }}</td>}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract readonly props: any; //NOSONAR
  protected expanders?: Expander[];
  protected appliedTransformations?: string;

  constructor(
    @Inject(FACADE) public readonly facade: FACADE,
    @Inject(STATE) public readonly state: ODataQuery | Observable<ODataQuery>,
    public readonly router: Router | null = null, //NOSONAR
    public readonly gridRefresh$: Observable<unknown> | null = null,
  ) {
    if (
      this.router?.routerState?.snapshot?.root.queryParams[
        this.gridStateQueryKey
      ]
    ) {
      try {
        this.gridDataState = this.deserializeODataQuery(
          this.router?.routerState?.snapshot?.root?.queryParams[
            this.gridStateQueryKey
          ],
        );
      } catch (e) {
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
          this.expanders = t.expand;
          this.appliedTransformations = t.apply;
        }),
      );
    } else {
      this.gridDataState = this.gridDataState
        ? {
            ...this.gridDataState,
            select: state.select,
            expand: state.expand,
          }
        : state;
      this.expanders = state.expand;
      this.appliedTransformations = state.apply;
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
    this.gridData$ = this.facade.tableData$?.pipe(
      map((gridData) => (gridData ? gridData : [])),
    );
  }
  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }

  public getExportFileName(exportName: string): string {
    return `${exportName}-${toLocalTimeStamp()}`;
  }
  public getRelatedValue(
    obj: ENTITY,
    ...segments: string[]
  ): unknown | undefined | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = obj; //NOSONAR
    segments.forEach((segment) => {
      if (result) {
        result = result[segment];
      }
    });
    return result;
  }

  public getRelatedField(...segments: string[]): string {
    return segments.join('.');
  }
  public getEnumText(
    data: { name: string; displayText: string }[],
    nameValue: string,
  ): string | undefined {
    return data.find((f) => f.name === nameValue)?.displayText;
  }

  public deserializeODataQuery(stateQueryParam: string): ODataQuery {
    const state: ODataQuery = JSON.parse(atob(stateQueryParam));
    state.filter?.filters?.forEach((filter) => this.normalizeFilters(filter));
    return state;
  }
  /**
   * This method ensures the proper handling of date filters in an OData query
   * @param filter
   */
  public normalizeFilters(filter: Filter | CompositeFilter) {
    if (isCompositeFilter(filter)) {
      filter.filters.forEach(this.normalizeFilters);
    } else if (
      filter?.field?.toUpperCase() === 'DATE' ||
      filter?.field?.toUpperCase().endsWith('DATE') ||
      filter?.field?.toUpperCase().endsWith('UTC')
    ) {
      filter.value = new Date(filter.value as never);
    }
  }

  public serializeODataQuery(odataQuery: ODataQuery): string {
    return btoa(JSON.stringify(odataQuery));
  }
  /**
   * Will reset filters to initialGrid state passed into the constructor
   */
  public resetFilters(): void {
    if (!isObservable(this.state)) {
      this.gridDataState = {
        ...this.gridDataState,
        filter: this.state.filter,
      };
      this.loadEntities(this.gridDataState);
    }
  }
  public dataStateChange(state: ODataQuery): void {
    this.gridDataState = {
      ...state,
      expand: this.expanders,
      apply: this.appliedTransformations,
    };
    this.loadEntities(this.gridDataState);
  }

  public excelData = (): Observable<ENTITY[]> => this.gridData$;

  public loadEntities(odataQuery: ODataQuery): void {
    odataQuery = this.validateSortParameters(odataQuery);
    this.gridDataState = odataQuery;
    this.expanders = odataQuery.expand;
    this.appliedTransformations = odataQuery.apply;
    this.facade.loadEntities(this.gridDataState);
    this.updateRouterState(odataQuery);
  }

  public validateSortParameters(state: ODataQuery): ODataQuery {
    if (state.orderBy && state.orderBy?.length > this.maxSortedColumnCount) {
      state = {
        ...state,
        orderBy: state.orderBy.slice(0, this.maxSortedColumnCount),
      };
      console.warn(
        `You have exceeded the limit of ${this.maxSortedColumnCount} sorted columns for the current grid. MAX-Sorted-Column-Count`,
      ); //NOSONAR
    }
    return state;
  }

  public updateRouterState(state: ODataQuery): void {
    if (this.router) {
      const tempState = { ...state };
      delete tempState.select;
      delete tempState.expand;
      this.router.navigate([], {
        relativeTo: this.router.routerState.root,
        queryParams: {
          [this.gridStateQueryKey]: this.serializeODataQuery(tempState),
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
