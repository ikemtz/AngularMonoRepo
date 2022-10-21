import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IPrimeODataTableFacade } from './prime-odata-table-facade';
import { Table } from 'primeng/table';
import { Subscriptions } from 'imng-ngrx-utils';
import { ImngPrimeODataTableBaseComponent } from './prime-odata-component-base';
import { FilterMetadata, LazyLoadEvent, SortMeta } from 'primeng/api';
import { handleMultiColumnSorting } from './helpers/handle-multi-column-sorting';
import { PrimeTableState } from './models/prime-table-state';
import { IdType } from 'imng-nrsrx-client-utils';

@Directive({
  selector: '[imngODataTable]',
})
export class ImngPrimeODataTableDirective implements OnInit, OnDestroy {
  @Input('imngODataTable')
  public odataTableComponent: ImngPrimeODataTableBaseComponent<
    object,
    IPrimeODataTableFacade<{ id?: IdType | null }>
  >;
  private facade: IPrimeODataTableFacade<{ id?: IdType | null }>;
  private sortState: SortMeta[] = [];
  public readonly allSubscriptions = new Subscriptions();
  constructor(
    public readonly tableComponent: Table,
    public readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.facade = this.odataTableComponent.facade || ({} as never);
    this.tableComponent.responsiveLayout = 'scroll';
    this.tableComponent.paginator = true;
    this.tableComponent.lazy = true;
    this.tableComponent.styleClass = 'p-datatable-gridlines';
    this.tableComponent.sortMode = 'multiple';
    this.tableComponent.showCurrentPageReport = true;
    this.tableComponent.rowHover = true;
    this.tableComponent.resizableColumns = true;
    this.tableComponent.reorderableColumns = true;
    this.tableComponent.currentPageReportTemplate =
      'Showing {first} to {last} of {totalRecords} entries';
    this.tableComponent.rowsPerPageOptions =
      this.odataTableComponent.rowsPerPageOptions;

    this.allSubscriptions.push(
      this.facade.tableData$.subscribe((t) => {
        this.tableComponent.value = t || [];
        this.changeDetectorRef.markForCheck();
      }),
    );
    this.allSubscriptions.push(
      this.facade.activeEffectCount$.subscribe((t) => {
        this.tableComponent.loading = t > 0;
        this.changeDetectorRef.markForCheck();
      }),
    );
    this.allSubscriptions.push(
      this.facade.totalRecordCount$.subscribe((t) => {
        this.tableComponent.totalRecords = t || 0;
        this.changeDetectorRef.markForCheck();
      }),
    );
    this.allSubscriptions.push(
      this.facade.tableState$.subscribe((newTableState) => {
        this.tableComponent.rows = newTableState?.rows || 20;
        if (newTableState.filters) {
          const newFilters: { [s: string]: FilterMetadata[] } = {};
          Object.keys(newTableState.filters)
            .filter((newFilterKey) => newTableState.filters?.[newFilterKey])
            .forEach((newFilterKey) => {
              newFilters[newFilterKey] = [
                ...(newTableState.filters?.[newFilterKey].map(
                  (filterMetadata) => ({
                    ...filterMetadata,
                  }),
                ) || []),
              ];
            });
          this.tableComponent.filters = newFilters;
        }
        this.tableComponent.multiSortMeta =
          newTableState.multiSortMeta?.map((sort) => ({
            ...sort,
          })) || [];
        this.changeDetectorRef.markForCheck();
      }),
    );
    this.allSubscriptions.push(
      this.tableComponent.onLazyLoad.subscribe((x: LazyLoadEvent) => {
        this.tableComponent.multiSortMeta =
          this.sortState =
          x.multiSortMeta =
            this.odataTableComponent.validateSortParameters(
              handleMultiColumnSorting(x, this.sortState),
            );
        if (x.globalFilter && x.filters?.['global']) {
          const globalFilter = x.filters['global'];
          this.tableComponent.globalFilterFields?.forEach((field) => {
            const filterVal = x.filters?.[field] as FilterMetadata[];
            if (filterVal.length === 1) {
              filterVal[0].value = globalFilter.value;
              filterVal[0].matchMode = globalFilter.matchMode;
              filterVal[0].operator = 'or';
            }
          });
          delete x.filters['global'];
        }
        this.facade.loadEntities(x as PrimeTableState);
      }),
    );
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
