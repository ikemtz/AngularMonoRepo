import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'imng-kendo-copy',
  template: `
       <a (click)="copy()">{{ display }}&nbsp;<span class="k-icon k-i-copy k-icon-md k-color-primary"></span></a>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImngKendoCopyComponent {
  @Input() public display: string | unknown[] = '';
  @Input() public copyValue = '';
  public copy(): void {
    navigator.clipboard.writeText(this.copyValue);
  }
}
