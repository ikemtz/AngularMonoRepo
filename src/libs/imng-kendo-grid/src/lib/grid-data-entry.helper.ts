import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export class GridDataEntryHelper<T> {
  private editedRowIndex: number;
  private gridFormGroup: FormGroup;
  private gridData: Array<T>;
  constructor(
    private readonly formGroupFactory: () => FormGroup,
    private readonly sourceObservable: Observable<Array<T>> = null,
  ) {}

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
    this.closeEditor(sender, rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.gridData = this.gridData.filter(t => t !== dataItem);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);
    this.gridFormGroup = this.formGroupFactory();
    sender.addRow(this.gridFormGroup);
  }
}
