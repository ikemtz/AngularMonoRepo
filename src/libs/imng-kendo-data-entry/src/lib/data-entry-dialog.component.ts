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
import { IMNG_KENDO_DIALOG_BUTTONS } from './dialog-buttons.directive';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'imng-data-entry-dialog[parentComponent]',
  imports: [CommonModule, KENDO_DIALOG],
  template: `<kendo-dialog
      [width]="width"
      [minWidth]="minWidth ?? width"
      [height]="height"
      (close)="close()"
      [autoFocusedElement]="autoFocusedElement || ''">
      <kendo-dialog-titlebar class="bg-primary">{{
        dialogTitle
      }}</kendo-dialog-titlebar>
      <ng-content />
      <kendo-dialog-actions>
        <ng-container
          *ngTemplateOutlet="
            dialogBtnsTemplate || defaultDialogActionsTpl;
            context: dialogActionBtnsCtx
          " />
      </kendo-dialog-actions>
    </kendo-dialog>
    <ng-template #defaultDialogActionsTpl>
      <button
        id="imngCancelDataEntry"
        name="imngCancelDataEntry"
        kendoButton
        (click)="cancel()"
        class="btn btn-secondary btn-sm">
        {{ cancelButtonText }}
      </button>
      <button
        id="imngSubmitDataEntry"
        name="imngSubmitDataEntry"
        [attr.form]="formId"
        type="submit"
        kendoButton
        (click)="submit()"
        class="btn btn-primary btn-sm">
        {{ submitButtonText }}
      </button>
    </ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IMNG_KENDO_DATA_ENTRY_DIALOG implements OnInit {
  @Input() public minWidth?: number; //NOSONAR
  @Input() public width = 800; //NOSONAR
  @Input() public height = 600; //NOSONAR
  /**
   * https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/initial-focus/
   */
  @Input() public autoFocusedElement?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public parentComponent?: BaseDataEntryComponent<any>; //NOSONAR
  @Input() public cancelButtonText?: string = 'Cancel';
  @Input() public submitButtonText?: string = 'Submit';
  @ContentChild(IMNG_KENDO_DIALOG_BUTTONS, { static: true, read: TemplateRef })
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
  public formId?: string;
  public submitted = false;
  public dialogTitle?: string;
  public component?: NonNullable<unknown>;

  public ngOnInit(): void {
    if (!this.parentComponent) {
      throw new TypeError(`The input 'parentComponent' is required`);
    }
    this.dialogTitle = this.parentComponent.dialogTitle;
    this.loading$ = this.parentComponent.loading$;
    this.addEditForm = this.parentComponent.addEditForm;
    this.submitButtonText ??= this.parentComponent.submitButtonText ?? 'Submit';
    this.cancelButtonText ??= this.parentComponent.cancelButtonText ?? 'Cancel';
    this.formId ??= this.parentComponent.formId ?? 'imng-form';
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
