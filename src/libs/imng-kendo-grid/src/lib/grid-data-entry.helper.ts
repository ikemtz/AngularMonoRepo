import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditEvent, CancelEvent, SaveEvent, RemoveEvent, AddEvent, GridComponent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

export class GridDataEntryHelper<T extends { id?: string | number | Date; }> {
  private _editedRowIndex: number;
  private _gridFormGroup: FormGroup;
  private readonly _gridData$: BehaviorSubject<Array<T>>;
  public sortDescriptors$ = new BehaviorSubject<SortDescriptor[]>([]);
  public get gridFormGroup(): FormGroup {
    return this._gridFormGroup;
  }

  public get gridData$(): Observable<Array<T>> {
    return this._gridData$.asObservable();
  }

  public get gridData(): Array<T> {
    return this._gridData;
  }

  public set gridData(value: Array<T>) {
    if (value) {
      this._gridData = [...value];
      this._gridData$.next(this._gridData);
    }
  }

  public get isInEditMode(): boolean {
    return !!this._gridFormGroup;
  }

  public get isValid(): boolean {
    return this.gridValidationLogic(this.gridData);
  }

  public get isValid$(): Observable<boolean> {
    return this.gridData$.pipe(map(t => this.gridValidationLogic(t)));
  }
  constructor(private readonly formGroupFactory: () => FormGroup, private _gridData: Array<T> = []) {
    this._gridData$ = new BehaviorSubject<Array<T>>(_gridData);
  }

  public addItems(...items: T[]): T[] {
    if (items) {
      this._gridData.push(...items);
      this._gridData$.next(this._gridData);
    }
    return this._gridData;
  }

  public removeItems(...items: T[]): T[] {
    if (items) {
      items.forEach(f => {
        this._gridData = this.gridData.filter(t => t !== f);
      });
      this._gridData$.next(this._gridData);
    }
    return this._gridData;
  }


  public editHandler(editEvent: EditEvent): void {
    this.closeEditor(editEvent.sender, editEvent.rowIndex);

    this._gridFormGroup = this.formGroupFactory();
    this._gridFormGroup.patchValue(editEvent.dataItem);
    this._editedRowIndex = editEvent.rowIndex;
    editEvent.sender.editRow(editEvent.rowIndex, this._gridFormGroup);
  }

  private closeEditor(grid: GridComponent, rowIndex = this._editedRowIndex): void {
    grid.closeRow(rowIndex);
    this._editedRowIndex = undefined;
    this._gridFormGroup = undefined;
  }

  public cancelHandler(cancelEvent: CancelEvent): void {
    this.closeEditor(cancelEvent.sender, cancelEvent.rowIndex);
  }

  public saveHandler(saveEvent: SaveEvent): void {
    const result: T = saveEvent.formGroup.value;
    const tempGrid: T[] = this.gridData.map(t => ({ ...t }));
    if (saveEvent.isNew) {
      result.id = null;
      tempGrid.push(result);
    } else {
      tempGrid.splice(saveEvent.rowIndex, 1, result);
    }
    this.gridData = tempGrid;
    this._gridData$.next(this.gridData);
    this.closeEditor(saveEvent.sender, saveEvent.rowIndex);
  }

  public removeHandler(removeEvent: RemoveEvent): void {
    const tempGrid = this.gridData.map(t => ({ ...t }));
    tempGrid.splice(removeEvent.rowIndex, 1);
    this.gridData = tempGrid;
    this._gridData$.next(this.gridData);
  }

  public sortHandler(sortDescriptors: SortDescriptor[]): void {
    this.sortDescriptors$.next(sortDescriptors);
    this.gridData = orderBy(this.gridData, sortDescriptors);
  }

  public addHandler(addEvent: AddEvent): void {
    this.closeEditor(addEvent.sender);
    this._gridFormGroup = this.formGroupFactory();
    addEvent.sender.addRow(this._gridFormGroup);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public gridValidationLogic(data: Array<T>): boolean {
    return this._gridData.length > 0 && !this._gridFormGroup;
  }
}
