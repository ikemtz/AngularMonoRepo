import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ApplyToWordOptions } from '../interfaces/apply-to-word-options';
import { PasteCleanupSettings } from '../interfaces/paste-cleanup-settings';
import { EditorPasteEvent } from '../interfaces/editor-paste-event';
import { EditorCommand } from '../types/editor-command';
import { DialogCommand } from '../types/dialog-command';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'kendo-editor',
  template: '',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useValue: {
        writeValue: jest.fn(),
        registerOnChange: jest.fn(),
        registerOnTouched: jest.fn(),
      },
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_EDITOR_STUB {
  @Input() public applyToWord: boolean | ApplyToWordOptions = false;
  @Input() public disabled?: boolean;
  @Input() public iframe = true;
  @Input() public iframeCss: unknown;
  @Input() public pasteCleanupSettings?: PasteCleanupSettings;
  @Input() public placeholder?: string;
  @Input() public plugins?: () => [];
  @Input() public preserveWhitespace: boolean | 'full' = false;
  @Input() public readonly = false;
  @Input() public resizable = false;
  @Input() public schema: unknown;
  @Input() public value = '';

  public blur = new EventEmitter<never>();
  public focus = new EventEmitter<never>();
  public paste = new EventEmitter<EditorPasteEvent>();
  public valueChange = new EventEmitter<never>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public exec(_commandName: EditorCommand, _attr: unknown) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public openDialog(_dialogName: DialogCommand) {}
}
