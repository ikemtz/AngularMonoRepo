import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'imng-kendo-copy[copyValue]',
  template: `
    <a (click)="copy()" [title]="'Copy the full value: ' + copyValue"
      >{{ displayValue }}&nbsp;<span
        class="k-icon k-i-copy k-icon-sm k-color-primary"></span
    ></a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImngKendoCopyComponent implements OnInit {
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
