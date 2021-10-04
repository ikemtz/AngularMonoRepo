import { Component, AfterViewInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FilterService } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, distinct, filterBy, FilterDescriptor } from '@progress/kendo-data-query';
import { ODataState } from 'imng-kendo-odata';

@Component({
  selector: 'imng-multi-select-filter',
  template: `
    <ul>
      <li *ngIf="showFilter">
        <input class="k-textbox" (input)="onInput($event)" />
      </li>
      <li
        #itemElement
        *ngFor="let item of currentData; let i = index"
        (click)="onSelectionChange(valueAccessor(item), itemElement)"
        [ngClass]="{ 'k-state-selected': isItemSelected(item) }"
      >
        <input
          type="checkbox"
          id="chk-{{ valueAccessor(item) }}"
          (focus)="onFocus(itemElement)"
          class="k-checkbox"
          [checked]="isItemSelected(item)"
        />
        <label class="k-multiselect-checkbox k-checkbox-label" for="chk-{{ valueAccessor(item) }}">
          {{ textAccessor(item) }}
        </label>
      </li>
    </ul>
  `,
  styles: [
    `
      ul {
        list-style-type: none;
        height: 200px;
        overflow-y: scroll;
        padding-left: 0;
        padding-right: 12px;
      }

      ul > li {
        padding: 8px 12px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-bottom: none;
      }

      ul > li:last-of-type {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }

      .k-multiselect-checkbox {
        pointer-events: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectFilterComponent implements AfterViewInit {
  @Input() public isPrimitive = false;
  @Input() public odataState: ODataState;
  @Input() public data: unknown[];
  @Input() public textField: string = undefined;
  @Input() public valueField: string = undefined;
  @Input() public field = '';

  public currentData: unknown[];
  public showFilter = true;
  public value: unknown[] = [];

  public textAccessor = (dataItem: unknown) => (this.isPrimitive ? dataItem : dataItem[this.textField]);
  public valueAccessor = (dataItem: unknown) => (this.isPrimitive ? dataItem : dataItem[this.valueField]);

  constructor(private readonly filterService: FilterService, private readonly changeDetectorRef: ChangeDetectorRef) { }

  public ngAfterViewInit() {
    this.currentData = this.data;
    const tempValue = this.odataState.filter?.filters.map((f: CompositeFilterDescriptor) =>
      f.filters.filter((x: FilterDescriptor) => x.field === this.field).map((x: FilterDescriptor) => x.value),
    );
    this.value =
      tempValue?.length >= 0
        ? tempValue.reduce((previousArray: [], currentArray: []) => previousArray.concat(...currentArray))
        : [];

    this.showFilter = typeof this.textAccessor(this.currentData[0]) === 'string';
    this.changeDetectorRef.markForCheck();
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
      filters: this.odataState.filter?.filters ? this.odataState.filter.filters : [],
    };
    if (
      currentFilter.filters.some((x: CompositeFilterDescriptor) =>
        x.filters.some((f: FilterDescriptor) => f.field === this.field),
      )
    ) {
      currentFilter.filters = currentFilter.filters.filter(
        (x: CompositeFilterDescriptor) => !x.filters.some((f: FilterDescriptor) => f.field === this.field),
      );
    }
    if (this.value.length > 0) {
      currentFilter.filters = [
        ...currentFilter.filters,
        {
          logic: 'or',
          filters: this.value.map((value) => ({
            field: this.field,
            operator: 'eq',
            value,
          })),
        },
      ];
    }
    this.filterService.filter(currentFilter);

    this.onFocus(li);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onInput(e: { target: { value: string | number | Date; }; } | any) {
    this.currentData = distinct(
      [
        ...this.currentData.filter((dataItem: unknown) =>
          this.value.some((val) => val === this.valueAccessor(dataItem)),
        ),
        ...filterBy(this.data, {
          operator: 'contains',
          field: this.textField,
          value: e.target.value,
        }),
      ],
      this.textField,
    );
    this.changeDetectorRef.markForCheck();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onFocus(li: any): void {
    const ul = li.parentNode;
    const below = ul.scrollTop + ul.offsetHeight < li.offsetTop + li.offsetHeight;
    const above = li.offsetTop < ul.scrollTop;

    // Scroll to focused checkbox
    if (below || above) {
      ul.scrollTop = li.offsetTop;
    }
    this.changeDetectorRef.markForCheck();
  }
}
