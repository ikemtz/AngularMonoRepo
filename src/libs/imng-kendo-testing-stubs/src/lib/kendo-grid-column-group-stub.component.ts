import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
} from '@angular/core';

@Component({
  selector: 'kendo-grid-column-group',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_GRID_GROUP_COLUMN_STUB {
  @Input() width = 50;
  @Input() field = '';
  @Input() title = '';
  @Input() public locked = false;
  @Input() public groupable = true;
  @Input() public editable = false;
  @Input() public hidden = false;
  @Input() public headerClass = '';
}
