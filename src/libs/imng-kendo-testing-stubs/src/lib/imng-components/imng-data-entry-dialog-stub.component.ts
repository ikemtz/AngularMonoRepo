import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'imng-data-entry-dialog',
  imports: [],
  template: ``,
  standalone: true,
})
export class IMNG_DATA_ENTRY_DIALOG_STUB implements OnInit {
  @Input() public minWidth?: number;
  @Input() public width = 800;
  @Input() public height = 600;
  @Input() public autoFocusedElement?: string;
  @Input() public parentComponent?: never; //NOSONAR
  @Input() public cancelButtonText?: string = 'Cancel';
  @Input() public submitButtonText?: string = 'Submit';
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

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  public ngOnInit(): void {
    /* empty */
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public close(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public cancel(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public submit(): void {}
  get dialogActionBtnsCtx(): object | null {
    //NOSONAR
    return {
      $implicit: { cancel: () => this.cancel(), submit: () => this.submit() },
    };
  }
}
