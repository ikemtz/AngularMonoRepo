import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
} from '@angular/core';
import { CssClassType, FieldDataType, FilterVariant, StyleType } from '../type';
import { FilterVariantSettings } from '../interfaces/filter-variant-settings';
import { ColumnSortSettings } from '../interfaces/column-sort-settings';

@Component({
  selector: 'kendo-grid-column',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_GRID_COLUMN_STUB {
  @Input() public autoSize?: boolean;
  @Input() public cellRowSpan?: boolean | (() => number);
  @Input() public columnMenu = true;
  @Input() public class?: CssClassType;
  @Input() public editable = true;
  @Input() public editor = 'text';
  @Input() public field?: string;
  @Input() public filter: FieldDataType = 'text';
  @Input() public filterable = true;
  @Input() public filterClass?: CssClassType;
  @Input() public filterStyle?: StyleType;
  @Input() public filterVariant: FilterVariant | FilterVariantSettings =
    'default';
  @Input() public footerClass?: CssClassType;
  @Input() public footerStyle?: StyleType;
  @Input() public format?: never;
  @Input() public groupable = true;
  @Input() public headerClass?: CssClassType;
  @Input() public headerStyle?: StyleType;
  @Input() public hidden = false;
  @Input() public includeInChooser = true;
  @Input() public lockable = true;
  @Input() public locked = false;
  @Input() public maxResizableWidth?: number;
  @Input() public media?: string;
  @Input() public minResizableWidth = 10;
  @Input() public reorderable = true;
  @Input() public resizable = true;
  @Input() public resizeStep = 10;
  @Input() public sortable: boolean | ColumnSortSettings = true;
  @Input() public stickable = true;
  @Input() public sticky = false;
  @Input() public style?: StyleType;
  @Input() public tableCellsRole = 'gridcell';
  @Input() public title?: string;
  @Input() public width?: number;

  public orderIndex = 0;
}
