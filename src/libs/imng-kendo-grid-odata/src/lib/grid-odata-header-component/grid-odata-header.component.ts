import { AsyncPipe, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { GridComponent, KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_ICONS } from '@progress/kendo-angular-icons';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import {
  filePdfIcon,
  fileExcelIcon,
  filterClearIcon,
  arrowRotateCcwIcon,
  plusIcon,
  exportIcon,
} from '@progress/kendo-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { KendoODataBasedComponent } from '../kendo-odata-component-base';
import { IKendoODataGridFacade } from '../kendo-odata-grid-facade';
import { KENDO_POPUP } from '@progress/kendo-angular-popup';
import { KENDO_PROGRESSBARS } from '@progress/kendo-angular-progressbar';

@Component({
  selector: 'imng-kendo-grid-odata-header',
  imports: [
    AsyncPipe,
    NgClass,
    KENDO_GRID,
    KENDO_ICONS,
    KENDO_BUTTONS,
    KENDO_POPUP,
    KENDO_PROGRESSBARS,
  ],
  template: ` <span
      #popupAnchor
      class="k-w-full k-justify-content-center"></span>
    @if (loadDataProgression$ | async; as loadDataProgression) {
      <kendo-popup
        class="w-25"
        [anchor]="popupAnchor"
        [anchorAlign]="{
          horizontal: 'center',
          vertical: 'center',
        }"
        [popupAlign]="{
          horizontal: 'center',
          vertical: 'center',
        }">
        <div class="text-center">
          @if (loadDataProgression > 0 && loadDataProgression <= 5) {
            <div class="font-weight-bold">Initializing...</div>
          } @else if (loadDataProgression > 5 && loadDataProgression < 90) {
            <div class="font-weight-bold">Loading Data...</div>
          } @else if (loadDataProgression >= 90) {
            <div class="font-weight-bold">Almost There...</div>
          }
          <div>
            <kendo-progressbar
              [value]="loadDataProgression"
              [min]="0"
              [max]="100"
              [label]="{
                visible: true,
                format: 'percent',
                position: 'center',
              }"></kendo-progressbar>
          </div>
        </div>
      </kendo-popup>
    }
    <div class="mr-5 pr-5">
      @if (entityName) {
        <button
          name="imngAddEntity"
          type="button"
          title="Add {{ entityName }}"
          primary="true"
          (click)="addItemClicked.emit()"
          class="btn btn-sm btn-primary mx-1">
          <kendo-svg-icon [icon]="plusIcon"></kendo-svg-icon>
          Add {{ entityName }}
        </button>
      }
      @if (hideResetFilters !== true) {
        <button
          name="imngResetFilters"
          type="button"
          title="Reset Filters"
          (click)="resetFiltersClicked.emit()"
          class="btn btn-sm mx-1">
          <kendo-svgicon [icon]="filterClearIcon"></kendo-svgicon> Reset Filters
        </button>
      }
      @if (hideReloadData !== true) {
        <button
          name="imngReloadData"
          type="button"
          title="Clear Cache And Reload Data"
          (click)="reloadEntitiesClicked.emit()"
          class="btn btn-sm mx-1">
          <kendo-svg-icon [icon]="arrowRotateCcwIcon"></kendo-svg-icon>
          Reload Data
        </button>
      }
      @if (hideExports !== true) {
        <kendo-splitbutton
          [data]="exportOptions"
          [svgIcon]="exportIcon"
          textField="name">
          Export Data
        </kendo-splitbutton>
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
})
export class IMNG_KENDO_GRID_ODATA_HEADER implements OnInit {
  public parentGrid = inject<GridComponent>(GridComponent);
  public readonly exportIcon = exportIcon;
  public readonly filePdfIcon = filePdfIcon;
  public readonly plusIcon = plusIcon;
  public readonly fileExcelIcon = fileExcelIcon;
  public readonly filterClearIcon = filterClearIcon;
  public readonly arrowRotateCcwIcon = arrowRotateCcwIcon;
  @Input({ required: true }) public imngODataGrid!: KendoODataBasedComponent<
    object,
    IKendoODataGridFacade<object>
  >;

  public loadDataProgression$: BehaviorSubject<number>;
  public exportOptions: {
    name: string;
    command: string;
    click: () => void;
    svgIcon?: unknown;
  }[];
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

  ngOnInit(): void {
    this.exportOptions = [
      {
        name: 'Export PDF',
        command: 'pdf',
        click: () => this.parentGrid.saveAsPDF(),
        svgIcon: filePdfIcon,
      },
      {
        name: 'Export Excel',
        command: 'excel',
        click: () => this.parentGrid.saveAsExcel(),
        svgIcon: fileExcelIcon,
      },
    ];
    if (this.imngODataGrid.odataService && this.imngODataGrid.odataEndpoint) {
      this.exportOptions.push({
        name: 'Export All Excel',
        command: 'excel',
        click: () =>
          this.configureGridForLoadAllData((grid) => grid.saveAsExcel()),
        svgIcon: fileExcelIcon,
      });
    }
    this.loadDataProgression$ = this.imngODataGrid.loadDataProgression$;
  }

  public configureGridForLoadAllData(
    exportCallback: (gridComponent: GridComponent) => void,
  ) {
    this.imngODataGrid.loadDataProgression$.next(1);
    this.imngODataGrid.useLoadAllDataExport = true;
    exportCallback(this.parentGrid);
  }
}
