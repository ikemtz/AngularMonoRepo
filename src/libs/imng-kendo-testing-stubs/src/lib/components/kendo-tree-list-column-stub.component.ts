import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ColumnSortSettings } from '../type';

@Component({
  selector: 'kendo-treelist-column',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_TREELIST_COLUMN_STUB {//NOSONAR
  @Input() publicautoSize?: boolean;
  columnMenu? = true;
  class?: string | string[] | Set<string> | { [key: string]: unknown }; //NOSONAR
  editable? = true;
  editor?: 'boolean' | 'text' | 'numeric' | 'date' = 'text';
  expandable?: boolean;
  field?: string;
  filter?: 'boolean' | 'text' | 'numeric' | 'date' = 'text';
  filterable? = true;
  footerClass?: string | string[] | Set<string> | { [key: string]: unknown };
  footerStyle?: { [key: string]: string };
  format?: unknown;
  headerClass?: string | string[] | Set<string> | { [key: string]: unknown };
  headerStyle?: { [key: string]: string };
  hidden? = false;
  includeInChooser? = true;
  lockable? = true;
  locked? = false;
  media?: string;
  minResizableWidth? = 10;
  reorderable? = true;
  resizable? = true;
  resizeStep? = 10;
  sortable?: ColumnSortSettings = true;
  style?: { [key: string]: string };
  tableCellsRole? = 'gridcell';
  title?: string;
  width?: number;

  public orderIndex = 0;
}
