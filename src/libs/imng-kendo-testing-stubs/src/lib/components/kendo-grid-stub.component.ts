import { jest } from '@jest/globals';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
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

  @Input() public adaptiveMode?: AdaptiveMode = 'none';
  @Input() public autoSize? = false;
  @Input() public cellSelected?: CellSelectedFn;
  @Input() public dataLayoutMode?: DataLayoutMode | DataLayoutModeSettings =
    'columns';
  @Input() public detailRowHeight?: number;
  @Input() public gridResizable?: boolean | GridResizableSettings = false;

  @Input() public hideHeader? = false;
  @Input() public isDetailExpanded?: (args: RowArgs) => boolean;
  @Input() public isGroupExpanded?: (args: GroupRowArgs) => boolean;
  @Input() public isRowSelectable?: RowSelectableFn;
  @Input() public pageable?: boolean | PagerSettings = false;
  @Input() public rowClass?: RowClassFn;
  @Input() public rowHeight?: number;
  @Input() public rowReorderable?: boolean = false;
  @Input() public rowSelected?: RowSelectedFn;
  @Input() public rowSticky?: RowStickyFn;
  @Input() public scrollable?: ScrollMode = 'scrollable';
  @Input() public selectable?: boolean | SelectableSettings = false;
  @Input() public showInactiveTools?: boolean = false;
  @Input() public size?: GridSize;
  @Input() public trackBy?: TrackByFunction<GridItem>;
  @Input() public virtualColumns?: boolean = false;

  public saveAsPDF = jest.fn();
  public saveAsExcel = jest.fn();
  public excelExport = of([]);

  public detailExpand: EventEmitter<never> = new EventEmitter<never>();
  public dataStateChange: EventEmitter<never> = new EventEmitter<never>();
  public filterChange: EventEmitter<never> = new EventEmitter<never>();
  public pageChange: EventEmitter<never> = new EventEmitter<never>();
  public groupChange: EventEmitter<Array<never>> = new EventEmitter<
    Array<never>
  >();
  public sortChange: EventEmitter<Array<never>> = new EventEmitter<
    Array<never>
  >();
  public columnVisibilityChange: EventEmitter<never> =
    new EventEmitter<never>();
  public detailCollapse: EventEmitter<never> = new EventEmitter<never>();
  public edit: EventEmitter<never> = new EventEmitter<never>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  public cancel: EventEmitter<never> = new EventEmitter<never>();
  public save: EventEmitter<never> = new EventEmitter<never>();
  public remove: EventEmitter<never> = new EventEmitter<never>();
  public add: EventEmitter<never> = new EventEmitter<never>();
  public cellClose: EventEmitter<never> = new EventEmitter<never>();
  public cellClick: EventEmitter<never> = new EventEmitter<never>();

  public columnLockedChange: EventEmitter<never> = new EventEmitter<never>();
  public columnReorder: EventEmitter<never> = new EventEmitter<never>();
  public columnResize: EventEmitter<never[]> = new EventEmitter<never[]>();
  public columnStickyChange: EventEmitter<never> = new EventEmitter<never>();
  public contentScroll: EventEmitter<never> = new EventEmitter<never>();
  public csvExport: EventEmitter<never> = new EventEmitter<never>();
  public gridStateChange: EventEmitter<never> = new EventEmitter<never>();
  public groupCollapse: EventEmitter<GroupRowArgs> =
    new EventEmitter<GroupRowArgs>();
  public groupExpand: EventEmitter<GroupRowArgs> =
    new EventEmitter<GroupRowArgs>();
  public pdfExport: EventEmitter<never> = new EventEmitter<never>();
  public rowReorder: EventEmitter<never> = new EventEmitter<never>();
  public scrollBottom: EventEmitter<never> = new EventEmitter<never>();
  public selectionChange: EventEmitter<never> = new EventEmitter<never>();
}
