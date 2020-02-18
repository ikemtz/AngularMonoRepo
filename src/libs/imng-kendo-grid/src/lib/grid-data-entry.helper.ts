import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public set gridData(value: Array<T>) {
    this._gridData = value;
    this._gridData$.next(value);
  }

  public get isInEditMode$(): Observable<boolean> {
    return this.gridData$.pipe(map(t => !!this._gridFormGroup));
  }
  public get isValid$(): Observable<boolean> {
    return this.gridData$.pipe(map(t => t.length > 0 && !this._gridFormGroup));
  }
  constructor(private readonly formGroupFactory: () => FormGroup, private _gridData: Array<T> = []) {
    this._gridData$ = new BehaviorSubject<Array<T>>(_gridData);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender, rowIndex);

    this._gridFormGroup = this.formGroupFactory();
    this._gridFormGroup.patchValue(dataItem);
    this._editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this._gridFormGroup);
  }

  private closeEditor(grid, rowIndex = this._editedRowIndex) {
    grid.closeRow(rowIndex);
    this._editedRowIndex = undefined;
    this._gridFormGroup = undefined;
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const result: T = formGroup.value;
    if (isNew) {
      result.id = null;
      this.gridData.push(result);
    }
    this._gridData$.next(this.gridData);
    this.closeEditor(sender, rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.gridData = this.gridData.filter(t => t !== dataItem);
    this._gridData$.next(this.gridData);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);
    this._gridFormGroup = this.formGroupFactory();
    sender.addRow(this._gridFormGroup);
  }
}
