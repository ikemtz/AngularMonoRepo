import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from './base-data-entry.component';

@Component({
  selector: 'imng-data-entry-dialog[parentComponent]',
  templateUrl: './data-entry-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataEntryDialogComponent implements OnInit {
  @Input() public width: string | number;
  @Input() public height: string | number;
  @Input() public parentComponent: BaseDataEntryComponent<any, any>;
  public loading$: Observable<boolean>;
  public addEditForm: FormGroup;
  public submitted: boolean;
  public dialogTitle: string;
  component: {};

  constructor() {}

  ngOnInit() {
    if (!this.parentComponent) {
      throw new TypeError("The input 'parentComponent' is required");
    }
    this.dialogTitle = this.parentComponent.dialogTitle;
    this.loading$ = this.parentComponent.loading$;
    this.addEditForm = this.parentComponent.addEditForm;
  }

  public close(): void {
    this.parentComponent.closeForm();
  }
  public cancel(): void {
    this.parentComponent.onCancel();
  }
  public submit() {
    this.parentComponent.onSubmit();
  }
}
