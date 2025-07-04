import { Directive, OnInit, Input, OnDestroy, inject } from '@angular/core';
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
  standalone: false,
})
export class ImngEditableDataGridDirective
  implements OnInit, OnDestroy, Subscribable
{
  readonly gridComponent = inject(GridComponent);

  public readonly allSubscriptions = new Subscriptions();
  _gridDataEntryHelper?: GridDataEntryHelper<{ id?: IdType }>;
  get gridDataEntryHelper(): GridDataEntryHelper<{ id?: IdType }> | undefined {
    return this._gridDataEntryHelper;
  }
  @Input('imngEditableDataGrid')
  set gridDataEntryHelper(
    value: GridDataEntryHelper<{ id?: IdType }> | undefined,
  ) {
    this._gridDataEntryHelper = value;
    this.allSubscriptions.push(
      this.gridDataEntryHelper?.sortDescriptors$
        .pipe(
          tap((sortDescriptor) => (this.gridComponent.sort = sortDescriptor)),
        )
        .subscribe(),
    );
  }

  ngOnInit(): void {
    this.allSubscriptions.push(
      this.gridComponent.edit.subscribe((t: EditEvent) =>
        this.gridDataEntryHelper?.editHandler(t),
      ),
      this.gridComponent.cancel.subscribe((t: CancelEvent) =>
        this.gridDataEntryHelper?.cancelHandler(t),
      ),
      this.gridComponent.save.subscribe((t: SaveEvent) =>
        this.gridDataEntryHelper?.saveHandler(t),
      ),
      this.gridComponent.remove.subscribe((t: RemoveEvent) =>
        this.gridDataEntryHelper?.removeHandler(t),
      ),
      this.gridComponent.add.subscribe((t: AddEvent) =>
        this.gridDataEntryHelper?.addHandler(t),
      ),
      this.gridComponent.sortChange.subscribe((t: SortDescriptor[]) =>
        this.gridDataEntryHelper?.sortHandler(t),
      ),
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
