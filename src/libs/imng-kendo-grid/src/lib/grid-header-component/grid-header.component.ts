import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';

@Component({
  selector: 'imng-kendo-odata-grid-header',
  template: `<div class="mr-5 pr-5">
    @if (entityName) {
      <button
        name="imngAddEntity"
        type="button"
        title="Add {{ entityName }}"
        primary="true"
        (click)="addItemClicked.emit()"
        class="btn btn-sm btn-primary mx-1">
        <span class="k-icon k-i-plus-circle"></span> Add {{ entityName }}
      </button>
    }
    @if (hideResetFilters !== true) {
      <button
        name="imngResetFilters"
        type="button"
        title="Reset Filters"
        (click)="resetFiltersClicked.emit()"
        class="btn btn-sm mx-1">
        <span class="k-icon k-i-filter-clear"></span> Reset Filters
      </button>
    }
    @if (hideReloadData !== true) {
      <button
        name="imngReloadData"
        type="button"
        title="Clear Cache And Reload Data"
        (click)="reloadEntitiesClicked.emit()"
        class="btn btn-sm mx-1">
        <span class="k-icon k-i-reset"></span> Reload Data
      </button>
    }
    @if (hideExports !== true) {
      <button
        name="imngExportPDF"
        type="button"
        title="Export To PDF"
        kendoGridPDFCommand
        icon="file-pdf"
        class="btn btn-sm mx-1"
        (click)="parentGrid.saveAsPDF()">
        <span class="k-icon k-i-pdf"></span> Export to PDF
      </button>
    }
    @if (hideExports !== true) {
      <button
        name="imngExportExcel'"
        type="button"
        title="Export To Excel"
        kendoGridExcelCommand
        icon="file-excel"
        class="btn btn-sm mx-1"
        (click)="parentGrid.saveAsExcel()">
        <span class="k-icon k-i-excel"></span> Export To Excel
      </button>
    }
    @if (hideColumnChooser !== true) {
      <kendo-grid-column-chooser
        name="imngColumnChooser"
        title="Columns"
        [allowHideAll]="true"
        [autoSync]="true"
        [ngClass]="{
          'text-primary': (hasHiddenColumns$ | async),
        }" />
    }
  </div>`,
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
      .k-bare {
        border-color: rgba(0, 0, 0, 0.08) !important;
        background-color: #f5f5f5 !important;
        background-image: linear-gradient(
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.02)
        ) !important;
      }
    `,
  ],
  standalone: false,
})
export class ImngGridHeaderComponent {
  parentGrid = inject<GridComponent>(GridComponent);

  @Input()
  public entityName = '';
  @Input()
  public hideColumnChooser = false;
  @Input()
  public hideResetFilters = false;
  @Input()
  public hideReloadData = false;
  @Input()
  public hideExports = false;
  @Input()
  public hasHiddenColumns$: Observable<boolean> | undefined;
  @Output()
  public addItemClicked = new EventEmitter();
  @Output()
  public resetFiltersClicked = new EventEmitter();
  @Output()
  public reloadEntitiesClicked = new EventEmitter();
}
