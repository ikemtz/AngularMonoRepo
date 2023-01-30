import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from './base-data-entry.component';
import { DialogButtonsDirective } from './dialog-buttons.directive';

@Component({
  selector: 'imng-data-entry-dialog[parentComponent]',
  template: `<kendo-dialog
      [width]="width"
      [minWidth]="minWidth ?? width"
      [height]="height"
      (close)="close()"
      [autoFocusedElement]="autoFocusedElement || ''">
      <kendo-dialog-titlebar class="bg-primary">{{
        dialogTitle
      }}</kendo-dialog-titlebar>
      <ng-content></ng-content>
      <kendo-dialog-actions>
        <ng-container
          *ngTemplateOutlet="
            dialogBtnsTemplate || defaultDialogActionsTpl;
            context: dialogActionBtnsCtx
          ">
        </ng-container>
      </kendo-dialog-actions>
    </kendo-dialog>
    <ng-template #defaultDialogActionsTpl>
      <button kendoButton (click)="cancel()" class="btn btn-secondary btn-sm">
        Cancel
      </button>
      <button
        [attr.form]="formId"
        type="submit"
        kendoButton
        (click)="submit()"
        class="btn btn-primary btn-sm">
        {{ saveButtonText }}
      </button>
    </ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataEntryDialogComponent implements OnInit {
  @Input() public minWidth?: number; //NOSONAR
  @Input() public width = 800; //NOSONAR
  @Input() public height = 600; //NOSONAR
  /**
   * https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/initial-focus/
   */
  @Input() public autoFocusedElement?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public parentComponent?: BaseDataEntryComponent<any>; //NOSONAR
  @Input() public saveButtonText?: string;
  @ContentChild(DialogButtonsDirective, { static: true, read: TemplateRef })
  /**
   * Example Usage:
   * <imng-data-entry-dialog>
   * ......
   *  <ng-template [imngDialogBtns] let-coreButtons>
   *    <button id="btnCustom1" class="k-button" (click)="cancel()">Close</button>
   *  </ng-template>
   * </imng-data-entry-dialog>
   */
  public dialogBtnsTemplate?: TemplateRef<unknown>;
  public loading$?: Observable<boolean>;
  public addEditForm?: FormGroup;
  public formId = 'imng-form';
  public submitted = false;
  public dialogTitle?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  public component?: {};

  public ngOnInit(): void {
    if (!this.parentComponent) {
      throw new TypeError(`The input 'parentComponent' is required`);
    }
    this.dialogTitle = this.parentComponent.dialogTitle;
    this.loading$ = this.parentComponent.loading$;
    this.addEditForm = this.parentComponent.addEditForm;
    this.saveButtonText ??= this.parentComponent.saveButtonText;
    this.formId = this.parentComponent.formId;
  }

  public close(): void {
    this.parentComponent?.closeForm();
  }
  public cancel(): void {
    this.parentComponent?.onCancel();
  }
  public submit(): void {
    this.parentComponent?.onSubmit();
  }
  get dialogActionBtnsCtx(): object | null {
    //NOSONAR
    return {
      $implicit: { cancel: () => this.cancel(), submit: () => this.submit() },
    };
  }
}
