import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
} from '@angular/core';
import { ExcelExportData } from '../interfaces/excel-export-data';
import { CellOptions } from '../interfaces/cell-options';

@Component({
  selector: 'kendo-treelist-excel',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_TREELIST_EXCEL_STUB {//NOSONAR
  @Input() public allPages? = true;
  collapsible?: boolean;
  creator?: string;
  date?: Date;
  expandAll? = true;
  fetchData?: (component: unknown) => ExcelExportData;
  fileName? = 'Export.xlsx';
  filterable?: boolean;
  forceProxy?: boolean;
  paddingCellOptions?: CellOptions;
  proxyURL?: string;
}
