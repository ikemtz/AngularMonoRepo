import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

@Component({
  selector: 'kendo-chart-series-item',
  template: '',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_CHART_SERIES_ITEM_STUB {
  @Input() public type = 'type';
  @Input() public name = 'name';
  @Input() public line = 'line';
  @Input() public style = 'style';
  @Input() public data: never[] = [];
}
