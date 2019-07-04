import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from '../base-data-entry.component';

@Component({
  selector: 'imkd-data-entry-dialog[parentComponent]',
  templateUrl: './data-entry-dialog.component.html',
  styleUrls: ['./data-entry-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataEntryDialogComponent implements OnInit {
  @Input() public width: string;
  @Input() public height: string;
  @Input() public parentComponent: BaseDataEntryComponent<any, any>;
  public active$: Observable<boolean>;
  public loading$: Observable<boolean>;
  public addEditForm: FormGroup;
  public submitted: boolean;
  public dialogTitle: string;

  constructor() { }

  ngOnInit() {
    if (!this.parentComponent) {
      throw new TypeError("The input 'parentComponent' is required");
    }
    this.dialogTitle = this.parentComponent.dialogTitle;
    this.active$ = this.parentComponent.active$;
    this.loading$ = this.parentComponent.loading$;
    this.addEditForm = this.parentComponent.addEditForm;
    this.submitted = this.submitted;
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

