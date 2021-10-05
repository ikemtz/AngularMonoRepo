import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'imng-kendo-grid-child-column-template',
  templateUrl: './kendo-child-column-template.component.html',
  styleUrls: ['./kendo-child-column-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImngGridChildColumnTemplateComponent implements OnInit {
  @Input() public data: unknown[];
  @Input() public field: string;
  @Input() public visibleRecCount = 5;
  @Input() public showMore = true;
  @Input() public toolTipJoinCharacter = ';';
  @Output() showMoreClicked = new EventEmitter();

  public currentData: unknown[];

  public ngOnInit(): void {
    this.currentData = (this.data || [])
      .filter(val => (val[this.field] || '').length > 0)
      .map(t => t[this.field]);
  }

  public formatToolTip(): string {
    return this.currentData
      .filter((_val, index) => index >= this.visibleRecCount)
      .join(`${this.toolTipJoinCharacter} `);
  }

  public moreClicked(): void {
    this.showMoreClicked.emit();
  }
}
