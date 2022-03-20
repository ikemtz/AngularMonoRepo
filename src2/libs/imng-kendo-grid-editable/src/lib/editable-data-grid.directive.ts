import {
  Directive,
  ChangeDetectorRef,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  GridComponent,
  EditEvent,
  CancelEvent,
  SaveEvent,
  RemoveEvent,
  AddEvent,
} from '@progress/kendo-angular-grid';
import { GridDataEntryHelper } from './grid-data-entry.helper';
import { Subscriptions, Subscribable } from 'imng-ngrx-utils';
import { SortDescriptor } from '@progress/kendo-data-query';
import { tap } from 'rxjs/operators';
import { IdType } from 'imng-nrsrx-client-utils';

/*
 * ### Example markup
 * <kendo-grid [imngEditableDataGrid]="gridDataEntryHelper" .... />
 *
 * ### Note:
 * gridDataEntryHelper must be set to an instance GridDataEntryHelper
 */

@Directive({
  selector: '[imngEditableDataGrid]',
})
export class ImngEditableDataGridDirective
  implements OnInit, OnDestroy, Subscribable
{
  public readonly allSubscriptions = new Subscriptions();
  // eslint-disable-next-line @typescript-eslint/ban-types
  _gridDataEntryHelper: GridDataEntryHelper<{ id: IdType }>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  get gridDataEntryHelper(): GridDataEntryHelper<{ id: IdType }> {
    return this._gridDataEntryHelper;
  }
  @Input('imngEditableDataGrid')
  // eslint-disable-next-line @typescript-eslint/ban-types
  set gridDataEntryHelper(value: GridDataEntryHelper<{ id: IdType }>) {
    this._gridDataEntryHelper = value;
    this.allSubscriptions.push(
      this.gridDataEntryHelper.sortDescriptors$
        .pipe(
          tap((sortDescriptor) => (this.gridComponent.sort = sortDescriptor))
        )
        .subscribe()
    );
  }
  constructor(
    public readonly gridComponent: GridComponent,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.allSubscriptions.push(
      this.gridComponent.edit.subscribe((t: EditEvent) =>
        this.gridDataEntryHelper.editHandler(t)
      ),
      this.gridComponent.cancel.subscribe((t: CancelEvent) =>
        this.gridDataEntryHelper.cancelHandler(t)
      ),
      this.gridComponent.save.subscribe((t: SaveEvent) =>
        this.gridDataEntryHelper.saveHandler(t)
      ),
      this.gridComponent.remove.subscribe((t: RemoveEvent) =>
        this.gridDataEntryHelper.removeHandler(t)
      ),
      this.gridComponent.add.subscribe((t: AddEvent) =>
        this.gridDataEntryHelper.addHandler(t)
      ),
      this.gridComponent.sortChange.subscribe((t: SortDescriptor[]) =>
        this.gridDataEntryHelper.sortHandler(t)
      )
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
    this.allSubscriptions.unsubscribeAll();
  }
}
