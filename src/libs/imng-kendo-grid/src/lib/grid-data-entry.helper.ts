import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditEvent, CancelEvent, SaveEvent, RemoveEvent, AddEvent, GridComponent } from '@progress/kendo-angular-grid';

export class GridDataEntryHelper<T extends { id?: string | number }> {
  private _editedRowIndex: number;
  private _gridFormGroup: FormGroup;
  private readonly _gridData$: BehaviorSubject<Array<T>>;

  public get gridFormGroup(): FormGroup {
    return this._gridFormGroup;
  }

  public get gridData$(): Observable<Array<T>> {
    return this._gridData$.asObservable();
  }

  public get gridData() {
    return this._gridData;
  }

  public set gridData(value: Array<T>) {
    this._gridData = value;
    this._gridData$.next(value);
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

  public editHandler(editEvent: EditEvent) {
    this.closeEditor(editEvent.sender, editEvent.rowIndex);

    this._gridFormGroup = this.formGroupFactory();
    this._gridFormGroup.patchValue(editEvent.dataItem);
    this._editedRowIndex = editEvent.rowIndex;
    editEvent.sender.editRow(editEvent.rowIndex, this._gridFormGroup);
  }

  private closeEditor(grid: GridComponent, rowIndex = this._editedRowIndex) {
    grid.closeRow(rowIndex);
    this._editedRowIndex = undefined;
    this._gridFormGroup = undefined;
  }

  public cancelHandler(cancelEvent: CancelEvent) {
    this.closeEditor(cancelEvent.sender, cancelEvent.rowIndex);
  }

  public saveHandler(saveEvent: SaveEvent) {
    const result: T = saveEvent.formGroup.value;
    if (saveEvent.isNew) {
      result.id = null;
      this.gridData.push(result);
    } else {
      const tempGrid = this.gridData.map(t => ({ ...t }));
      console.log(`Pre Splice: ${JSON.stringify(tempGrid)}`);
      tempGrid.splice(saveEvent.rowIndex, 1, result);
      this.gridData = tempGrid;
      console.log(`Post Splice: ${JSON.stringify(this.gridData)}`);
    }
    this._gridData$.next(this.gridData);
    this.closeEditor(saveEvent.sender, saveEvent.rowIndex);
  }

  public removeHandler(removeEvent: RemoveEvent) {
    this.gridData = this.gridData.filter(t => t !== removeEvent.dataItem);
    this._gridData$.next(this.gridData);
  }

  public addHandler(addEvent: AddEvent) {
    this.closeEditor(addEvent.sender);
    this._gridFormGroup = this.formGroupFactory();
    addEvent.sender.addRow(this._gridFormGroup);
  }

  public gridValidationLogic(data: Array<T>): boolean {
    return this._gridData.length > 0 && !this._gridFormGroup;
  }
}
