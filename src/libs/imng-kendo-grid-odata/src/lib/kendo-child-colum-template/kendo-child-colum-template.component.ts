import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'imng-kendo-grid-child-colum-template',
  templateUrl: './kendo-child-colum-template.component.html',
  styleUrls: ['./kendo-child-colum-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImngGridChildColumTemplateComponent {

  @Input() public data: unknown[];
  @Input() public field: string;
  @Input() public visibleRecCount = 5;
  @Input() public showMore = true;
  @Output() showMoreClicked = new EventEmitter<unknown[]>();

  public formatToolTip(): string {
    return [...this.data.filter((_val, index) => index >= this.visibleRecCount)]
      .map(t => t[this.field])
      .join(' ; ');
  }

  public moreClicked(): void {
    this.showMoreClicked.emit(this.data.map(t => t[this.field]));
  }

}
