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

@Directive({
  selector: '[imngODataTable]',
})
export class ImngPrimeODataTableDirective implements OnInit, OnDestroy {
  @Input('imngODataTable')
  public odataTableComponent: ImngPrimeODataTableBaseComponent<
    object,
    IPrimeODataTableFacade<{ id?: string | null }>
  >;
  private facade: IPrimeODataTableFacade<{ id?: string | null }>;
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
    this.tableComponent.sortMode = 'multiple';
    this.tableComponent.showCurrentPageReport = true;
    this.tableComponent.rowHover = true;
    this.tableComponent.resizableColumns = true;
    this.tableComponent.rowHover = true;
    this.tableComponent.resizableColumns = true;
    this.tableComponent.rowsPerPageOptions =
      this.odataTableComponent.rowsPerPageOptions;
    this.allSubscriptions.push(
      this.facade.tableData$.subscribe((t) => {
        this.tableComponent.value = t || [];
        this.changeDetectorRef.markForCheck();
      }),
    );
    this.allSubscriptions.push(
      this.facade.loading$.subscribe((t) => {
        this.tableComponent.loading = t;
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
      this.facade.tableState$.subscribe((t) => {
        this.tableComponent.rows = t?.rows || 20;
        this.changeDetectorRef.markForCheck();
        if (t.filters) {
          const newFilters = { ...t.filters };
          Object.keys(newFilters).forEach((x) => {
            if (t.filters?.[x]) {
              newFilters[x] = [
                ...(t.filters[x] as FilterMetadata[]).map((m) => ({ ...m })),
              ] as FilterMetadata;
            }
          });
          this.tableComponent.filters = newFilters;
        }
      }),
    );
    this.allSubscriptions.push(
      this.tableComponent.onLazyLoad.subscribe((x: LazyLoadEvent) => {
        this.tableComponent.multiSortMeta =
          this.sortState =
          x.multiSortMeta =
            handleMultiColumnSorting(x, this.sortState);
        this.facade.loadEntities(x);
      }),
    );
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
