import { jest } from '@jest/globals';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
  TrackByFunction,
} from '@angular/core';
import { of } from 'rxjs';
import {
  CompositeFilterDescriptor,
  DataResult,
  GroupDescriptor,
  SortDescriptor,
} from '@progress/kendo-data-query';
import {
  AdaptiveMode,
  CellSelectedFn,
  DataLayoutMode,
  GridItem,
  GridSize,
  RowClassFn,
  RowSelectableFn,
  RowSelectedFn,
  RowStickyFn,
  ScrollMode,
} from '../type';
import { ColumnMenuSettings } from '../interfaces/column-menu-settings';
import { DataLayoutModeSettings } from '../interfaces/data-layout-mode-settings';
import { GridResizableSettings } from '../interfaces/grid-resizable-settings';
import { RowArgs } from '../interfaces/row-args';
import { GroupRowArgs } from '../interfaces/group-row-args';
import { PagerSettings } from '../interfaces/pager-settings';
import { SelectableSettings } from '../interfaces/selectable-settings';

@Component({
  selector: 'kendo-grid',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_GRID_STUB {
  @Input() public imngODataGrid?: never;
  @Input() public height = 500;
  @Input() public data: never[] | DataResult = [];
  @Input() public group?: Array<GroupDescriptor> | null;
  @Input() public groupable: boolean | string = false;
  @Input() public loading = false;
  @Input() public kendoGridExpandDetailsBy:
    | string
    | ((dataItem: never) => never) = 'kendoGridExpandDetailsBy';
  @Input() public expandedDetailKeys: never[] = [];
  @Input() public columnMenu: boolean | ColumnMenuSettings = false;
  @Input() public filter?: CompositeFilterDescriptor | null;
  @Input() public filterable: boolean | string = false;
  @Input() public pageSize = 20;
  @Input() public skip = 0;
  @Input() public reorderable = true;
  @Input() public resizable: boolean | string = true;
  @Input() public sort?: Array<SortDescriptor> | null = [];
  @Input() public sortable:
    | boolean
    | string
    | { allowUnsort: boolean; mode: string } = true;
  @Input() public navigable = true;

  adaptiveMode?: AdaptiveMode = 'none';
  autoSize? = false;
  cellSelected?: CellSelectedFn;
  dataLayoutMode?: DataLayoutMode | DataLayoutModeSettings = 'columns';
  detailRowHeight?: number;
  gridResizable?: boolean | GridResizableSettings = false;

  hideHeader? = false;
  isDetailExpanded?: (args: RowArgs) => boolean;
  isGroupExpanded?: (args: GroupRowArgs) => boolean;
  isRowSelectable?: RowSelectableFn;
  pageable?: boolean | PagerSettings = false;
  rowClass?: RowClassFn;
  rowHeight?: number;
  rowReorderable?: boolean = false;
  rowSelected?: RowSelectedFn;
  rowSticky?: RowStickyFn;
  scrollable?: ScrollMode = 'scrollable';
  selectable?: boolean | SelectableSettings = false;
  showInactiveTools?: boolean = false;
  size?: GridSize;
  trackBy?: TrackByFunction<GridItem>;
  virtualColumns?: boolean = false;

  public saveAsPDF = jest.fn();
  public saveAsExcel = jest.fn();
  public excelExport = of([]);

  @Output() public detailExpand: EventEmitter<never> =
    new EventEmitter<never>();
  @Output() public dataStateChange: EventEmitter<never> =
    new EventEmitter<never>();
  @Output() public filterChange: EventEmitter<never> =
    new EventEmitter<never>();
  @Output() public pageChange: EventEmitter<never> = new EventEmitter<never>();
  @Output() public groupChange: EventEmitter<Array<never>> = new EventEmitter<
    Array<never>
  >();
  @Output() public sortChange: EventEmitter<Array<never>> = new EventEmitter<
    Array<never>
  >();
  @Output() public columnVisibilityChange: EventEmitter<never> =
    new EventEmitter<never>();
  @Output() public detailCollapse: EventEmitter<never> =
    new EventEmitter<never>();
  @Output() public edit: EventEmitter<never> = new EventEmitter<never>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public cancel: EventEmitter<never> = new EventEmitter<never>();
  @Output() public save: EventEmitter<never> = new EventEmitter<never>();
  @Output() public remove: EventEmitter<never> = new EventEmitter<never>();
  @Output() public add: EventEmitter<never> = new EventEmitter<never>();
  @Output() public cellClose: EventEmitter<never> = new EventEmitter<never>();
  @Output() public cellClick: EventEmitter<never> = new EventEmitter<never>();

  @Output() public columnLockedChange: EventEmitter<never> =
    new EventEmitter<never>();
  @Output() public columnReorder: EventEmitter<never> =
    new EventEmitter<never>();
  @Output() public columnResize: EventEmitter<never[]> = new EventEmitter<
    never[]
  >();
  @Output() public columnStickyChange: EventEmitter<never> =
    new EventEmitter<never>();
  @Output() public contentScroll: EventEmitter<never> =
    new EventEmitter<never>();
  @Output() public csvExport: EventEmitter<never> = new EventEmitter<never>();
  @Output() public gridStateChange: EventEmitter<never> =
    new EventEmitter<never>();
  @Output() public groupCollapse: EventEmitter<GroupRowArgs> =
    new EventEmitter<GroupRowArgs>();
  @Output() public groupExpand: EventEmitter<GroupRowArgs> =
    new EventEmitter<GroupRowArgs>();
  @Output() public pdfExport: EventEmitter<never> = new EventEmitter<never>();
  @Output() public rowReorder: EventEmitter<never> = new EventEmitter<never>();
  @Output() public scrollBottom: EventEmitter<never> =
    new EventEmitter<never>();
  @Output() public selectionChange: EventEmitter<never> =
    new EventEmitter<never>();
}
