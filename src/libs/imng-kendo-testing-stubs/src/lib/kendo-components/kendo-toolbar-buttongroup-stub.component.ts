import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
@Component({
  selector: 'kendo-toolbar-buttongroup',
  template: '',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_TOOLBAR_BUTTONGROUP_STUB {
  @Input() public disabled?: boolean;
  @Input() public selection?: unknown;
  @Input() public width?: string;
}
