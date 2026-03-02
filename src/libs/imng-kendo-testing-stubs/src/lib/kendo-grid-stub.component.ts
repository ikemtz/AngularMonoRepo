import { jest } from '@jest/globals';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { of } from 'rxjs';
import { DataResult, GroupDescriptor } from '@progress/kendo-data-query';

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
  @Input() public resizable = true;
  @Input() public data: never[] | DataResult = [];
  @Input() public group: Array<GroupDescriptor> | null | undefined;

  public saveAsPDF = jest.fn();
  public saveAsExcel = jest.fn();
  public dataStateChange = of({});
  public excelExport = of([]);
}
