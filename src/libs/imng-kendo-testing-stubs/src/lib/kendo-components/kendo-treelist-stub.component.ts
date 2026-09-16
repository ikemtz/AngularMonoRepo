import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
  TrackByFunction,
  QueryList,
  EventEmitter,
} from '@angular/core';
import { ColumnMenuSettings } from '../interfaces/column-menu-settings';
import { Observable } from 'rxjs';
import { TreeListDataResult } from '../interfaces/tree-list-data-result';
import { FilterableSettings } from '../types/filterable-settings';
import { PagerSettings } from '../interfaces/pager-settings';
import { RowClassFn, ScrollMode, SortSettings } from '../type';
import { SelectableSettings } from '../interfaces/selectable-settings';
import { SortDescriptor } from '../interfaces/sort-descriptor';
import { NavigationCell } from '../interfaces/navigation-cell';
import { NavigationRow } from '../interfaces/navigation-row';

@Component({
  selector: 'kendo-treelist',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_TREELIST_STUB {
  //NOSONAR
  @Input('aria-label') public ariaLabel?: string;
  @Input() public autoSize = false;
  @Input() public columnMenu?: boolean | ColumnMenuSettings;
  @Input() public data?: unknown[] | Observable<unknown> | TreeListDataResult;
  @Input() public fetchChildren?: (
    node: unknown,
  ) => unknown[] | Observable<unknown[]>;
  @Input() public filter?: unknown;
  @Input() public filterable?: FilterableSettings;
  @Input() public hasChildren?: (node: unknown) => boolean;
  @Input() public height?: number;
  @Input() public hideHeader = false;
  @Input() public idField = 'id';
  @Input() public isExpanded?: (node: unknown) => boolean;
  @Input() public isSelected?: (
    dataItem: unknown,
    column?: unknown,
    columnIndex?: number,
  ) => boolean;
  @Input() public loading = false;
  @Input() public navigable = true;
  @Input() public pageable: boolean | PagerSettings = false;
  @Input() public pageSize = 10;
  @Input() public reorderable = false;
  @Input() public resizable = false;
  @Input() public rowClass?: RowClassFn;
  @Input() public rowHeight?: number;
  @Input() public rowReorderable = false;
  @Input() public scrollable: ScrollMode = 'scrollable';
  @Input() public selectable?: boolean | SelectableSettings;
  @Input() public skip?: number;
  @Input() public sort?: SortDescriptor[];
  @Input() public sortable: SortSettings = false;
  @Input() public trackBy?: TrackByFunction<unknown>;
  @Input() public virtualColumns = false;

  public activeCell?: NavigationCell;
  public activeRow?: NavigationRow;
  public columns?: QueryList<unknown>;

  public add?: EventEmitter<unknown>;
  // eslint-disable-next-line @angular-eslint/no-output-native
  public cancel?: EventEmitter<unknown>;
  public cellClick?: EventEmitter<unknown>;
  public cellClose?: EventEmitter<unknown>;
  public columnLockedChange?: EventEmitter<unknown>;
  public columnReorder?: EventEmitter<unknown>;
  public columnResize?: EventEmitter<unknown>;
  public columnVisibilityChange?: EventEmitter<unknown>;
  public contentScroll?: EventEmitter<unknown>;
  public dataStateChange?: EventEmitter<unknown>;
  public edit?: EventEmitter<unknown>;
  public excelExport?: EventEmitter<unknown>;
  public filterChange?: EventEmitter<unknown>;
  public pageChange?: EventEmitter<unknown>;
  public pdfExport?: EventEmitter<unknown>;
  public remove?: EventEmitter<unknown>;
  public rowReorder?: EventEmitter<unknown>;
  public save?: EventEmitter<unknown>;
  public scrollBottom?: EventEmitter<unknown>;
  public selectionChange?: EventEmitter<unknown>;
  public sortChange?: EventEmitter<unknown>;

  public addRow = jest.fn();
  public autoFitColumn = jest.fn();
  public autoFitColumns = jest.fn();
  public cancelCell = jest.fn();
  public closeCell = jest.fn();
  public closeRow = jest.fn();
  public collapse = jest.fn();
  public drawPDF = jest.fn();
  public editCell = jest.fn();
  public editRow = jest.fn();
  public expand = jest.fn();
  public focus = jest.fn();
  public focusCell = jest.fn();
  public focusNextCell = jest.fn();
  public focusPrevCell = jest.fn();
  public isEditing = jest.fn();
  public isEditingCell = jest.fn();
  public reload = jest.fn();
  public reorderColumn = jest.fn();
  public saveAsExcel = jest.fn();
  public saveAsPDF = jest.fn();
  public scrollTo = jest.fn();
  public updateView = jest.fn();
}
