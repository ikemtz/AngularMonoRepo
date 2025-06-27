import {
  Component,
  AfterViewInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FilterService } from '@progress/kendo-angular-grid';
import {
  CompositeFilterDescriptor,
  distinct,
  filterBy,
  FilterDescriptor,
} from '@progress/kendo-data-query';
import { IdType } from 'imng-nrsrx-client-utils';
import { ODataState } from 'imng-kendo-odata';

@Component({
    selector: 'imng-multi-select-filter',
    template: `
    <ul>
      @if (showTextFilter) {
        <li>
          <input class="k-textbox" (input)="onInput($event)" />
        </li>
      }
      @for (item of currentData; track item; let i = $index) {
        <li
          #itemElement
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
          <label
            class="k-multiselect-checkbox k-checkbox-label"
            for="chk-{{ valueAccessor(item) }}"
            >
            {{ textAccessor(item) }}
          </label>
        </li>
      }
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
      .k-checkbox {width: 14px; height: 15px;}
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MultiSelectFilterComponent implements AfterViewInit {
  @Input() public isPrimitive = false;
  @Input() public odataState: ODataState | null = {};
  @Input() public data: unknown[] = [];
  @Input() public textField: string | undefined = undefined;
  @Input() public valueField: string | undefined = undefined;
  @Input() public field = '';
  @Input() public showTextFilter = true;

  public currentData: unknown[] = [];
  public value: unknown[] = [];

  public textAccessor = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataItem: any //NOSONAR
  ) =>
    this.isPrimitive || !this.textField ? dataItem : dataItem[this.textField];
  public valueAccessor = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataItem: any //NOSONAR
  ) =>
    this.isPrimitive || !this.valueField ? dataItem : dataItem[this.valueField];

  constructor(
    public readonly filterService: FilterService,
    public readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  public ngAfterViewInit() {
    this.currentData = this.data;
    const tempValue = this.odataState?.filter?.filters.map(
      (f: CompositeFilterDescriptor | FilterDescriptor) =>
        (f as CompositeFilterDescriptor).filters
          .filter(
            (x: FilterDescriptor | CompositeFilterDescriptor) =>
              (x as FilterDescriptor).field === this.field
          )
          .map(
            (x: FilterDescriptor | CompositeFilterDescriptor) =>
              (x as FilterDescriptor).value
          )
    );
    this.value = tempValue?.length ? tempValue?.flat() || [] : [];

    this.showTextFilter =
      this.showTextFilter &&
      typeof this.textAccessor(this.currentData[0]) === 'string';
    this.changeDetectorRef.markForCheck();
  }

  public isItemSelected(item: unknown) {
    return this.value.some((x) => x === this.valueAccessor(item));
  }

  public onSelectionChange(item: unknown, li: HTMLLIElement) {
    if (this.value.some((x) => x === item)) {
      this.value = this.value.filter((x) => x !== item);
    } else {
      this.value.push(item);
    }
    const currentFilter: CompositeFilterDescriptor = {
      logic: this.odataState?.filter?.logic ?? 'and',
      filters: this.odataState?.filter?.filters
        ? this.odataState.filter.filters
        : [],
    };
    if (
      currentFilter.filters.some(
        (x: CompositeFilterDescriptor | FilterDescriptor) =>
          (x as CompositeFilterDescriptor).filters.some(
            (f: FilterDescriptor | CompositeFilterDescriptor) =>
              (f as FilterDescriptor).field === this.field
          )
      )
    ) {
      currentFilter.filters = currentFilter.filters.filter(
        (x: CompositeFilterDescriptor | FilterDescriptor) =>
          !(x as CompositeFilterDescriptor).filters.some(
            (f: FilterDescriptor | CompositeFilterDescriptor) =>
              (f as FilterDescriptor).field === this.field
          )
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
  public onInput(e: { target: { value: IdType; }; } | any) { //NOSONAR
    this.currentData = distinct(
      [
        ...this.currentData.filter((dataItem: unknown) =>
          this.value.some((val) => val === this.valueAccessor(dataItem))
        ),
        ...filterBy(this.data, {
          operator: 'contains',
          field: this.textField,
          value: e.target.value,
        }),
      ],
      this.textField
    );
    this.changeDetectorRef.markForCheck();
  }

  public onFocus(li: HTMLLIElement): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ul = li.parentNode as any; //NOSONAR
    const below =
      ul.scrollTop + ul.offsetHeight < li.offsetTop + li.offsetHeight;
    const above = li.offsetTop < ul.scrollTop;

    // Scroll to focused checkbox
    if (below || above) {
      ul.scrollTop = li.offsetTop;
    }
    this.changeDetectorRef.markForCheck();
  }
}
