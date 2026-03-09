import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

@Component({
  selector: 'kendo-button-group',
  template: '',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_BUTTON_GROUP_STUB {
  @Input() public disabled = false;
  @Input() public navigable = true;
  @Input() public width: number | string = '20%';
  @Input() public selection = 'selection';
  @Input() public tabIndex = 0;
  public navigate?: EventEmitter<never>;
}
