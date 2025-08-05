import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { copyIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'imng-kendo-copy[copyValue]',
  template: `
    <a (click)="copy()" [title]="'Copy the full value: ' + copyValue"
      >{{ displayValue }}&nbsp;
      <kendo-svg-icon
        class="k-icon-sm k-color-primary"
        [icon]="copyIcon"></kendo-svg-icon
    ></a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ImngKendoCopyComponent implements OnInit {
  public readonly copyIcon = copyIcon;
  /**
   * Optional
   */
  @Input() public displayValue: unknown;
  /**
   * Required
   */
  @Input() public copyValue = '';

  ngOnInit(): void {
    if (this.copyValue && !this.displayValue) {
      this.displayValue = this.copyValue;
    }
  }
  public copy(): void {
    navigator.clipboard?.writeText(this.copyValue);
  }
}
