import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'imng-kendo-odata-grid-header',
  template: `<div>
    <button
      *ngIf="entityName"
      type="button"
      title="Add {{ entityName }}"
      primary="true"
      (click)="addItemClicked.emit()"
      class="btn btn-sm btn-primary mx-1"
    >
      <span class="k-icon k-i-plus-circle"></span> Add {{ entityName }}
    </button>
    <button
      *ngIf="hideClearFilters !== true"
      type="button"
      title="Clear Filters"
      (click)="clearFiltersClicked.emit()"
      class="btn btn-sm mx-1"
    >
      <span class="k-icon k-i-filter-clear"></span> Clear Filters
    </button>
    <button
      *ngIf="hideReloadData !== true"
      type="button"
      title="Clear Cache And Reload Data"
      (click)="reloadEntitiesClicked.emit()"
      class="btn btn-sm mx-1"
    >
      <span class="k-icon k-i-reset"></span> Reload Data
    </button>
    <button type="button" title="Export To PDF" kendoGridPDFCommand icon="file-pdf" class="mx-1">Export to PDF</button>
    <button type="button" title="Export To Excel" kendoGridExcelCommand icon="file-excel" class="mx-1">
      Export To Excel
    </button>
    <kendo-grid-column-chooser
      *ngIf="hideColumnChooser !== true"
      [allowHideAll]="true"
      [autoSync]="true"
      [ngClass]="{
        'text-primary': (hasHiddenColumns$ | async),
        'mr-2 pr-2': true
      }"
    ></kendo-grid-column-chooser>
  </div> `,
  styles: [
    `
      .btn-sm {
        height: 30px;
        border-radius: 2px;
        background-color: #f5f5f5;
        border-color: rgba(0, 0, 0, 0.08);
      }

      .btn-primary {
        background-color: #007bff;
      }

      .k-icon {
        padding-bottom: 3px;
      }
    `,
  ],
})
export class ImngGridHeaderComponent {
  @Input()
  public entityName: string;
  @Input()
  public hideColumnChooser: boolean;
  @Input()
  public hideClearFilters: boolean;
  @Input()
  public hideReloadData: boolean;
  @Input()
  public hasHiddenColumns$: Observable<boolean>;
  @Output()
  public addItemClicked = new EventEmitter();
  @Output()
  public clearFiltersClicked = new EventEmitter();
  @Output()
  public reloadEntitiesClicked = new EventEmitter();
}
