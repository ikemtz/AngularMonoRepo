import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'imng-kendo-grid-child-column-template',
  templateUrl: './kendo-child-column-template.component.html',
  styleUrls: ['./kendo-child-column-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImngGridChildColumnTemplateComponent implements OnInit {
  private _data: unknown[];
  public currentData: unknown[];
  private initialized = false;

  @Output() showMoreClicked = new EventEmitter();
  @Input() public field: string;
  @Input() public visibleRecCount = 5;
  @Input() public showMore = true;
  @Input() public toolTipJoinCharacter = ';';
  @Input() set data(value: unknown[]) {
    this._data = value;
    if (this.initialized) {
      this.ngOnInit();
      this.changeDetectorRef.markForCheck();
    }
  }
  get data(): unknown[] {
    return this._data;
  }

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.currentData = (this.data || [])
      .filter(val => (val[this.field] || '').length > 0)
      .map(t => t[this.field]);
    this.initialized = true;
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
