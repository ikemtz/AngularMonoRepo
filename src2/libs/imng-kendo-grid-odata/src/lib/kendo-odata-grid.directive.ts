/* eslint-disable @typescript-eslint/ban-types */
import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { KendoODataComponentBase } from './kendo-odata-component-base';
import { IKendoODataGridFacade } from './kendo-odata-grid-facade';
import { GridStateChangeEvent, hasHiddenColumns } from 'imng-kendo-grid';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[imngODataGrid]',
})
export class ImngODataGridDirective
  implements OnInit, AfterViewInit, OnDestroy, Subscribable
{
  public readonly allSubscriptions = new Subscriptions();
  private facade: IKendoODataGridFacade<object>;

  @Input('imngODataGrid') public odataComponent: KendoODataComponentBase<
    object,
    IKendoODataGridFacade<object>
  >;
  constructor(
    public readonly gridComponent: GridComponent,
    public readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.facade = this.odataComponent.facade || ({} as never);
    this.gridComponent.reorderable = true;
    this.gridComponent.resizable = true;
    this.gridComponent.filterable = 'menu';
    this.gridComponent.sortable = {
      allowUnsort: true,
      mode: 'multiple',
    };
    this.gridComponent.navigable = true;
    this.allSubscriptions.push(
      this.facade.loading$.subscribe((t: boolean) => {
        this.gridComponent.loading = t;
        this.changeDetectorRef.markForCheck();
      })
    );
    this.odataComponent.hasHiddenColumns$ = merge(
      this.odataComponent.facade.loading$.pipe(
        hasHiddenColumns(this.gridComponent)
      ),
      this.gridComponent.columnVisibilityChange?.pipe(
        hasHiddenColumns(this.gridComponent)
      )
    );
  }

  ngAfterViewInit(): void {
    this.allSubscriptions.push(
      this.gridComponent.dataStateChange.subscribe((t: GridStateChangeEvent) =>
        this.odataComponent.dataStateChange(t)
      ),
      this.facade.gridData$.subscribe((t) => {
        this.gridComponent.data = t;
        this.changeDetectorRef.markForCheck();
      }),
      this.facade.gridPagerSettings$.subscribe(
        (t) => (this.gridComponent.pageable = t)
      ),
      this.facade.gridODataState$.pipe(filter((t) => !!t)).subscribe((t) => {
        this.gridComponent.pageSize = t.take || 20;
        this.gridComponent.filter = t.filter || { logic: 'and', filters: [] };
        this.gridComponent.skip = t.skip || 0;
        this.gridComponent.sort = t.sort || [];
      })
    );
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
