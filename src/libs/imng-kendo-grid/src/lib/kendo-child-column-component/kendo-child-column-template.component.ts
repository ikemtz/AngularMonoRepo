import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'imng-kendo-grid-child-column-template',
  template: `<div *ngFor="let item of currentData | slice: 0:visibleRecCount">
      {{ item }}
    </div>
    <button
      type="button"
      *ngIf="showMore && (currentData?.length || 0) > visibleRecCount"
      class="btn btn-sm btn-primary"
      [title]="formatToolTip()"
      (click)="moreClicked()"
    >
      More ...
      <span class="badge bg-secondary">{{
        currentData.length - visibleRecCount
      }}</span>
    </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImngGridChildColumnTemplateComponent implements OnInit {
  private _data: unknown[] = [];
  public currentData: unknown[] = [];
  private initialized = false;

  @Output() showMoreClicked = new EventEmitter();
  @Input() public field = '';
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

  constructor(public readonly changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.currentData = (this.data || [])
      .filter((val) => (typeof val === 'string' ? val.length > 0 : true))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((t: any) => t[this.field]);
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
