import {
  Component,
  Input,
  ChangeDetectionStrategy,
  TemplateRef,
  ContentChild,
  input,
} from '@angular/core';
import { DialogButtonsDirective } from './dialog-buttons.directive';

@Component({
  selector: 'imng-data-delete-dialog',
  template: `<kendo-dialog
      [width]="width()"
      [minWidth]="minWidth() ?? width()"
      [height]="height()"
      (close)="cancel()">
      <kendo-dialog-titlebar>{{ dialogTitle() }}</kendo-dialog-titlebar>
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
        name="imngCancelDataEntry"
        kendoButton
        (click)="cancel()"
        class="btn btn-secondary btn-sm">
        {{ cancelButtonText }}
      </button>
      <button
        name="imngDeleteData"
        type="submit"
        kendoButton
        (click)="delete()"
        class="btn btn-danger btn-sm">
        {{ deleteButtonText }}
      </button>
    </ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DataDeleteDialogComponent {
  public readonly minWidth = input<number | undefined>(undefined);
  public readonly width = input(400);
  public readonly height = input(200);
  public readonly dataItem = input.required<unknown>();
  public readonly dialogTitle = input('Deletion Confirmation');
  public readonly facade = input.required<{
    clearCurrentEntity: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteExistingEntity: (x: any) => void;
  }>();
  /**
   * https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/initial-focus/
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public cancelButtonText?: string = 'Cancel';
  @Input() public deleteButtonText?: string = 'Delete';
  @ContentChild(DialogButtonsDirective, { static: true, read: TemplateRef })
  /**
   * Example Usage:
   * <imng-data-delete-dialog>
   * ......
   *  <ng-template [imngDialogBtns] let-coreButtons>
   *    <button id="btnCustom1" class="k-button" (click)="cancel()">Close</button>
   *  </ng-template>
   * </imng-data-delete-dialog>
   */
  public dialogBtnsTemplate?: TemplateRef<unknown>;

  public cancel(): void {
    this.facade().clearCurrentEntity();
  }
  public delete(): void {
    this.facade().deleteExistingEntity(this.dataItem());
  }
  get dialogActionBtnsCtx(): object | null {
    //NOSONAR
    return {
      $implicit: { cancel: () => this.cancel(), submit: () => this.delete() },
    };
  }
}
