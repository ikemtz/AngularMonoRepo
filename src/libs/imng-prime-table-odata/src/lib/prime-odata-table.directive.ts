import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { IPrimeODataTableFacade } from './prime-odata-table-facade';
import { Table } from 'primeng/table';
import { Subscriptions } from 'imng-ngrx-utils';
import { ImngPrimeODataTableBaseComponent } from './prime-odata-component-base';
import { LazyLoadEvent } from 'primeng/api';

@Directive({
  selector: '[imngODataTable]'
})
export class ImngPrimeODataTableDirective implements OnInit, OnDestroy {
  @Input('imngODataTable') public odataTableComponent: ImngPrimeODataTableBaseComponent<
    object,
    IPrimeODataTableFacade<{ id?: string | null; }>
  >;
  private facade: IPrimeODataTableFacade<{ id?: string | null; }>;
  public readonly allSubscriptions = new Subscriptions();
  constructor(
    public readonly tableComponent: Table,
    public readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.facade = this.odataTableComponent.facade || ({} as never);
    this.tableComponent.responsiveLayout = 'scroll';
    this.tableComponent.paginator = true;
    this.tableComponent.lazy = true;
    this.tableComponent.styleClass = "p-datatable-gridlines";
    this.tableComponent.showCurrentPageReport = true;
    this.tableComponent.rowsPerPageOptions = this.odataTableComponent.rowsPerPageOptions;
    this.allSubscriptions.push(this.facade.tableData$.subscribe((t) => {
      this.tableComponent.value = t || [];
      this.changeDetectorRef.markForCheck();
    }));
    this.allSubscriptions.push(this.facade.loading$.subscribe((t) => {
      this.tableComponent.loading = t;
      this.changeDetectorRef.markForCheck();
    }));
    this.allSubscriptions.push(this.facade.totalRecordCount$.subscribe((t) => {
      this.tableComponent.totalRecords = t;
      this.changeDetectorRef.markForCheck();
    }));
    this.allSubscriptions.push(this.facade.tableODataQueryState$.subscribe((t) => {
      this.tableComponent.rows = t?.take || 20;
      this.changeDetectorRef.markForCheck();
    }));
    this.allSubscriptions.push(
      this.tableComponent.onLazyLoad.subscribe((x: LazyLoadEvent) => this.facade.loadEntities({
        skip: x.first,
        take: x.rows,
      })));
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
