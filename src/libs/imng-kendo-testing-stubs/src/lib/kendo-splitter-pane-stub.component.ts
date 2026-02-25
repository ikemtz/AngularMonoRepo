import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
} from '@angular/core';

@Component({
  selector: 'kendo-splitter-pane',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_SPLITTER_PANE_STUB {
  @Input() size: string | undefined;
  @Input() collapsible: boolean | undefined;
}
