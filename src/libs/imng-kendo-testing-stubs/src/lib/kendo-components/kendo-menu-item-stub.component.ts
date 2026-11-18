import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

@Component({
  selector: 'kendo-menu-item',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_MENU_ITEM_STUB {
  public cssClass = input<unknown>();
  public cssStyle = input<unknown>();
  public data = input<unknown>();
  public description = input<string>();
  public disabled = input<boolean>();
  public groupHeader = input<boolean>();
  public icon = input<string>();
  public separator = input<boolean>();
  public svgIcon = input<string>();
  public text = input<string>();
  public url = input<string>();
}
