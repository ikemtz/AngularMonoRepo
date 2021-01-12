import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from './base-data-entry.component';

@Component({
  selector: 'imng-data-entry-dialog[parentComponent]',
  template: `
  <kendo-dialog [width]="width" [height]="height" (close)="close()">
  <kendo-dialog-titlebar class="bg-primary">{{dialogTitle}}</kendo-dialog-titlebar>
  <ng-content></ng-content>
  <kendo-dialog-actions>
    <button id="btnCancel" class="k-button" (click)="cancel()">Cancel</button>
    <button id="btnSave" class="k-button k-primary" (click)="submit()">Save</button>
  </kendo-dialog-actions>
  </kendo-dialog>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataEntryDialogComponent implements OnInit {
  @Input() public width: string | number;
  @Input() public height: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public parentComponent: BaseDataEntryComponent<any>;
  public loading$: Observable<boolean>;
  public addEditForm: FormGroup;
  public submitted: boolean;
  public dialogTitle: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  public component: {};

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
