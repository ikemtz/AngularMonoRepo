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
import {
  CompositeFilterDescriptor,
  DataResult,
  GroupDescriptor,
  SortDescriptor,
} from '@progress/kendo-data-query';

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
  @Input() public columnMenu = false;
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
  public cancel: EventEmitter<never> = new EventEmitter<never>();
  public save: EventEmitter<never> = new EventEmitter<never>();
  public remove: EventEmitter<never> = new EventEmitter<never>();
  public add: EventEmitter<never> = new EventEmitter<never>();
  public cellClose: EventEmitter<never> = new EventEmitter<never>();
  public cellClick: EventEmitter<never> = new EventEmitter<never>();
}
