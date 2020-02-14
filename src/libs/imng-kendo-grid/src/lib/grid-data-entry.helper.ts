import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

export class GridDataEntryHelper<T> {
  private editedRowIndex: number;
  private gridFormGroup: FormGroup;
  public _gridData: Array<T>;
  public readonly gridData$ = new Subject<Array<T>>();

  get gridData(): Array<T> {
    return this._gridData;
  }
  set gridData(value: Array<T>) {
    this._gridData = value;
    this.gridData$.next(value);
  }
  constructor(private readonly formGroupFactory: () => FormGroup) {}

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender, rowIndex);

    this.gridFormGroup = this.formGroupFactory();
    this.gridFormGroup.patchValue(dataItem);
    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.gridFormGroup);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.gridFormGroup = undefined;
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const result: T = formGroup.value;
    if (isNew) {
      this.gridData.push(result);
    }
    this.gridData$.next(this.gridData);
    this.closeEditor(sender, rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.gridData = this.gridData.filter(t => t !== dataItem);
    this.gridData$.next(this.gridData);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);
    this.gridFormGroup = this.formGroupFactory();
    sender.addRow(this.gridFormGroup);
  }
}
