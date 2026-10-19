import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core';
import { SVGIcon } from '../interfaces/svg-icon';

@Component({
  selector: 'kendo-expansionpanel',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_EXPANSION_PANEL_STUB {
  @Input() animation?: number | boolean = true;
  @Input() collapseIcon?: string;
  @Input() disabled = false;
  @Input() expanded = false;
  @Input() expandIcon?: string;
  @Input() subtitle?: string;
  @Input() svgCollapseIcon?: SVGIcon;
  @Input() svgExpandIcon?: SVGIcon;
  @Input() title = '';

  @Output() action = new EventEmitter<never>();
  @Output() collapse = new EventEmitter<never>();
  @Output() expand = new EventEmitter<never>();
  @Output() expandedChange = new EventEmitter<boolean>();

  public toggle(expanded: boolean) {
    this.expandedChange.emit(expanded);
  }
}
