import { Component, Input, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'imng-kendo-grid-child-column-template',
  templateUrl: './kendo-child-column-template.component.html',
  styleUrls: ['./kendo-child-column-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImngGridChildColumnTemplateComponent implements AfterViewInit {
  @Input() public data: unknown[];
  @Input() public field: string;
  @Input() public visibleRecCount = 5;
  @Input() public showMore = true;
  @Output() showMoreClicked = new EventEmitter();

  public currentData: unknown[];

  public ngAfterViewInit(): void {
    this.currentData = (this.data || [])
      .filter(val => (val[this.field] || '').length > 0)
      .map(t => t[this.field]);
  }

  public formatToolTip(): string {
    return this.currentData
      .filter((_val, index) => index >= this.visibleRecCount)
      .join(' ; ');
  }

  public moreClicked(): void {
    this.showMoreClicked.emit();
  }
}
