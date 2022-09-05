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
import { PrimeTableState } from './models/prime-odata-table-state';

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
  public tableStateQueryKey = 'odataQuery';
  public tableState: PrimeTableState;
  public tableData$: Observable<ENTITY[]>;
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
    @Inject(STATE)
    private readonly state: PrimeTableState | Observable<PrimeTableState>,
    public readonly router: Router | null = null, //NOSONAR
    public readonly gridRefresh$: Observable<unknown> | null = null,
  ) {
    if (
      this.router?.routerState?.snapshot?.root.queryParams[
        this.tableStateQueryKey
      ]
    ) {
      try {
        this.tableState = this.deserializeTableState(
          this.router?.routerState?.snapshot?.root?.queryParams[
            this.tableStateQueryKey
          ],
        );
      } catch (e) {
        console.error(
          //NOSONAR
          `Exception thrown while deserializing query string parameter: ${this.tableStateQueryKey}.`,
        );
      }
    }
    if (isObservable(state)) {
      this.allSubscriptions.push(
        state.subscribe((t) => {
          this.tableState = t;
          this.expanders = t.expand;
          this.appliedTransformations = t.apply;
        }),
      );
    } else {
      this.tableState = this.tableState
        ? {
            ...this.tableState,
            select: state.select,
            expand: state.expand,
          }
        : state;
      this.expanders = state.expand;
      this.appliedTransformations = state.apply;
    }
    if (gridRefresh$) {
      this.allSubscriptions.push(
        gridRefresh$.subscribe(() => this.loadEntities(this.tableState)),
      );
    }
  }

  public ngOnInit(): void {
    if (!this.gridRefresh$) {
      this.loadEntities(this.tableState);
    }
    this.loading$ = this.facade.loading$;
    this.tableData$ = this.facade.tableData$?.pipe(
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

  public deserializeTableState(stateQueryParam: string): PrimeTableState {
    return JSON.parse(atob(stateQueryParam));
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

  public serializeTableState(primeTableState: PrimeTableState): string {
    return btoa(JSON.stringify(primeTableState));
  }
  /**
   * Will reset filters to initialGrid state passed into the constructor
   */
  public resetFilters(): void {
    if (!isObservable(this.state)) {
      this.tableState = {
        ...this.state,
        filters: this.state.filters,
      };
      this.loadEntities(this.tableState);
    }
  }
  public dataStateChange(primeTableState: PrimeTableState): void {
    this.tableState = {
      ...primeTableState,
      expand: this.expanders,
      apply: this.appliedTransformations,
    };
    this.loadEntities(this.tableState);
  }

  public excelData = (): Observable<ENTITY[]> => this.tableData$;

  public loadEntities(primeTableState: PrimeTableState): void {
    primeTableState = this.validateSortParameters(primeTableState);
    this.tableState = primeTableState;
    this.expanders = primeTableState.expand;
    this.appliedTransformations = primeTableState.apply;
    this.facade.loadEntities(primeTableState);
    this.updateRouterState(primeTableState);
  }

  public validateSortParameters(
    primeTableState: PrimeTableState,
  ): PrimeTableState {
    if (
      primeTableState.multiSortMeta &&
      primeTableState.multiSortMeta?.length > this.maxSortedColumnCount
    ) {
      primeTableState = {
        ...primeTableState,
        multiSortMeta: primeTableState.multiSortMeta.slice(
          0,
          this.maxSortedColumnCount,
        ),
      };
      console.warn(
        `You have exceeded the limit of ${this.maxSortedColumnCount} sorted columns for the current grid. MAX-Sorted-Column-Count`,
      ); //NOSONAR
    }
    return primeTableState;
  }

  public updateRouterState(state: PrimeTableState): void {
    if (this.router) {
      const tempState = { ...state };
      delete tempState.select;
      delete tempState.expand;
      this.router.navigate([], {
        relativeTo: this.router.routerState.root,
        queryParams: {
          [this.tableStateQueryKey]: this.serializeTableState(tempState),
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
