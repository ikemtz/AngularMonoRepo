import { jest } from '@jest/globals';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
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
  @Input() public groupable = false;
  @Input() public loading = false;
  @Input() public kendoGridExpandDetailsBy:
    | string
    | ((dataItem: never) => never) = 'kendoGridExpandDetailsBy';
  @Input() public expandedDetailKeys: never[] = [];
  @Input() public columnMenu = false;
  @Input() public filterable: boolean | string = false;
  @Input() public pageSize = 20;

  public saveAsPDF = jest.fn();
  public saveAsExcel = jest.fn();
  public dataStateChange = of({});
  public excelExport = of([]);
  public detailExpand: EventEmitter<never> = new EventEmitter<never>();
}
