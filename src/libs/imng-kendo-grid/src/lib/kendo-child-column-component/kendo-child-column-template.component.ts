import { SlicePipe } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  inject,
} from '@angular/core';

@Component({
  selector: 'imng-kendo-grid-child-column-template',
  imports: [SlicePipe],
  template: `@for (
      item of currentData | slice: 0 : visibleRecCount;
      track item
    ) {
      <div>
        {{ item }}
      </div>
    }
    @if (showMore && (currentData?.length || 0) > visibleRecCount) {
      <button
        type="button"
        class="btn btn-sm btn-primary"
        [title]="formatToolTip()"
        (click)="moreClicked()">
        More ...
        <span class="badge bg-secondary">{{
          (currentData?.length ?? 0) - visibleRecCount
        }}</span>
      </button>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IMNG_KENDO_GRID_CHILD_COLUMN_TEMPLATE implements OnInit {
  readonly changeDetectorRef = inject(ChangeDetectorRef);

  private _data: unknown[] = [];
  public currentData?: unknown[] = [];
  private initialized = false;

  @Output() showMoreClicked = new EventEmitter();
  @Input() public field = '';
  @Input() public visibleRecCount = 5; //NOSONAR
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

  public ngOnInit(): void {
    this.currentData = (this.data ?? [])
      .filter((val) => (typeof val === 'string' ? val.length > 0 : true))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((t: any) => t[this.field]); //NOSONAR
    this.initialized = true;
  }
  public formatToolTip(): string {
    return (this.currentData ?? [])
      .filter((_val, index) => index >= this.visibleRecCount)
      .join(`${this.toolTipJoinCharacter} `);
  }

  public moreClicked(): void {
    this.showMoreClicked.emit();
  }
}
