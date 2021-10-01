import { Component, ChangeDetectionStrategy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterService } from "@progress/kendo-angular-grid";
import { CompositeFilterDescriptor, distinct, filterBy, FilterDescriptor } from '@progress/kendo-data-query';
import { ODataState } from 'imng-kendo-odata';

@Component({
  selector: 'imng-multi-select-filter',
  templateUrl: './multi-select-filter.component.html',
  styleUrls: ['./multi-select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectFilterComponent implements AfterViewInit {

  @Input() public isPrimitive = false;
  @Input() public odataState: ODataState;
  @Input() public data: unknown[];
  @Input() public textField: string = undefined;
  @Input() public valueField: string = undefined;
  @Input() public field: string = null;
  @Output() public valueChange = new EventEmitter<number[]>();

  public currentData: any;
  public showFilter = true;
  private value: unknown[] = [];

  public textAccessor = (dataItem: unknown) =>
    this.isPrimitive ? dataItem : dataItem[this.textField];
  public valueAccessor = (dataItem: unknown) =>
    this.isPrimitive ? dataItem : dataItem[this.valueField];

  constructor(private readonly filterService: FilterService) {
  }


  public ngAfterViewInit() {
    this.currentData = this.data;
    this.value = this.odataState.filter?.filters.map(
      (f: CompositeFilterDescriptor) => f.filters
        .filter((x: FilterDescriptor) => x.field === this.field)
        .map((x: FilterDescriptor) => x.value)
    ).reduce((previousArray: [], currentArray: []) => previousArray.concat(...currentArray)) ?? [];

    this.showFilter =
      typeof this.textAccessor(this.currentData[0]) === "string";
  }

  public isItemSelected(item: unknown) {
    return this.value.some((x) => x === this.valueAccessor(item));
  }

  public onSelectionChange(item: unknown, li) {
    if (this.value.some((x) => x === item)) {
      this.value = this.value.filter((x) => x !== item);
    } else {
      this.value.push(item);
    }
    const currentFilter: CompositeFilterDescriptor = {
      logic: this.odataState.filter?.logic ?? 'and',
      filters: this.odataState.filter?.filters ? this.odataState.filter.filters : []
    };
    if (currentFilter.filters.some((x: CompositeFilterDescriptor) => x.filters.some((f: FilterDescriptor) => f.field === this.field))) {
      currentFilter.filters = currentFilter.filters.filter((x: CompositeFilterDescriptor) => !x.filters.some((f: FilterDescriptor) => f.field === this.field));
    }
    if (this.value.length > 0) {
      currentFilter.filters = [...currentFilter.filters, {
        logic: 'or', filters: this.value.map((value) => ({
          field: this.field,
          operator: "eq",
          value,
        }))
      }];
    }
    this.filterService.filter(currentFilter);

    this.onFocus(li);
  }

  public onInput(e: { target: { value: string | number | Date; }; } | any) {
    this.currentData = distinct(
      [
        ...this.currentData.filter((dataItem: unknown) =>
          this.value.some((val) => val === this.valueAccessor(dataItem))
        ),
        ...filterBy(this.data, {
          operator: "contains",
          field: this.textField,
          value: e.target.value,
        }),
      ],
      this.textField
    );
  }

  public onFocus(li: any): void {
    const ul = li.parentNode;
    const below =
      ul.scrollTop + ul.offsetHeight < li.offsetTop + li.offsetHeight;
    const above = li.offsetTop < ul.scrollTop;

    // Scroll to focused checkbox
    if (below || above) {
      ul.scrollTop = li.offsetTop;
    }
  }
}
