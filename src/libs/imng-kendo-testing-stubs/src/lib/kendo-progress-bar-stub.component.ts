import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

@Component({
  selector: 'kendo-progressbar',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_PROGRESSBAR_STUB {
  @Input() value: number | undefined;
  @Input() min: number | undefined;
  @Input() max: number | undefined;
  @Input() label:
    | boolean
    | {
        visible: boolean;
        format: string;
        position: string;
      }
    | undefined;
}
