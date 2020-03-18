import { Directive, ChangeDetectorRef, OnInit, Input, OnDestroy } from '@angular/core';
import { GridComponent, EditEvent, CancelEvent, SaveEvent, RemoveEvent, AddEvent } from '@progress/kendo-angular-grid';
import { GridDataEntryHelper } from './grid-data-entry.helper';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[imngEditableDataGrid]',
})
export class ImngEditableDataGridDirective implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];
  @Input('imngEditableDataGrid') public gridDataEntryHelper: GridDataEntryHelper<object>;
  constructor(private readonly gridComponent: GridComponent, private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.gridComponent.edit.subscribe((t: EditEvent) => this.gridDataEntryHelper.editHandler(t)),
      this.gridComponent.cancel.subscribe((t: CancelEvent) => this.gridDataEntryHelper.cancelHandler(t)),
      this.gridComponent.save.subscribe((t: SaveEvent) => this.gridDataEntryHelper.saveHandler(t)),
      this.gridComponent.remove.subscribe((t: RemoveEvent) => this.gridDataEntryHelper.removeHandler(t)),
      this.gridComponent.add.subscribe((t: AddEvent) => this.gridDataEntryHelper.addHandler(t)),
    );
    this.gridComponent.reorderable = true;
    this.gridComponent.resizable = true;
    this.gridComponent.filterable = false;
    this.gridComponent.sortable = {
      allowUnsort: true,
      mode: 'multiple',
    };
    this.gridComponent.navigable = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(t => {
      if (t) {
        t.unsubscribe();
      }
    });
  }
}
