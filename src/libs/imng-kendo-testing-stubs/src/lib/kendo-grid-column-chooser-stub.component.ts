import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

@Component({
  selector: 'kendo-grid-column-chooser',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_GRID_COLUMN_CHOOSER_STUB {
  @Input() public allowHideAll: boolean | undefined;
  @Input() public autoSync: boolean | undefined;
}
