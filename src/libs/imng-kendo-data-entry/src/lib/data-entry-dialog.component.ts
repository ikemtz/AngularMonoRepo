import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryDirective } from './base-data-entry.directive';

@Component({
  selector: 'imng-data-entry-dialog[parentComponent]',
  templateUrl: './data-entry-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataEntryDialogComponent implements OnInit {
  @Input() public width: string | number;
  @Input() public height: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public parentComponent: BaseDataEntryDirective<any>;
  public loading$: Observable<boolean>;
  public addEditForm: FormGroup;
  public submitted: boolean;
  public dialogTitle: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  component: {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  public ngOnInit(): void {
    if (!this.parentComponent) {
      throw new TypeError(`The input 'parentComponent' is required`);
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
  public submit(): void {
    this.parentComponent.onSubmit();
  }
}
