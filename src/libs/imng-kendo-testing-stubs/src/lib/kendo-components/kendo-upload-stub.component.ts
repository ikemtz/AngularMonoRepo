import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ActionsLayout } from '../type';
import { ChunkSettings } from '../interfaces/chunk-settings';
import { HttpHeaders } from '@angular/common/http';
import { FileRestrictions } from '../interfaces/file-restrictions';

@Component({
  selector: 'kendo-upload',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_UPLOAD_STUB
  implements OnInit, OnDestroy, ControlValueAccessor
{
  public ngOnDestroy = jest.fn();
  public ngOnInit = jest.fn();
  public writeValue = jest.fn();
  public registerOnChange = jest.fn();
  public registerOnTouched = jest.fn();
  public setDisabledState? = jest.fn();
  public ngAfterViewInit = jest.fn();

  @Input() public accept?: string;
  @Input() public actionsLayout?: ActionsLayout = 'end';
  @Input() public autoUpload?: boolean = true;
  @Input() public batch?: boolean = false;
  @Input() public chunkable?: boolean | ChunkSettings = false;
  @Input() public concurrent?: boolean = true;
  @Input() public disabled?: boolean = false;
  @Input() public multiple?: boolean = true;
  @Input() public removeField?: string;
  @Input() public removeHeaders?: HttpHeaders;
  @Input() public removeMethod?: string;
  @Input() public removeUrl?: string;
  @Input() public responseType?: 'text' | 'arraybuffer' | 'blob' | 'json' =
    'json';
  @Input() public restrictions?: FileRestrictions;
  @Input() public saveField?: string;
  @Input() public saveHeaders?: HttpHeaders;
  @Input() public saveMethod?: string;
  @Input() public saveUrl?: string;
  @Input() public showFileList?: boolean = true;
  @Input() public tabindex?: number = 0;
  @Input() public withCredentials?: boolean = true;
  @Input() public zoneId?: string;

  // eslint-disable-next-line @angular-eslint/no-output-native
  public cancel = new EventEmitter<never>();
  public clear = new EventEmitter<never>();
  public complete = new EventEmitter<never>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  public error = new EventEmitter<ErrorEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  public blur = new EventEmitter<never>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  public focus = new EventEmitter<never>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  public pause = new EventEmitter<never>();
  public remove = new EventEmitter<never>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  public resume = new EventEmitter<unknown>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  public select = new EventEmitter<never>();
  public success = new EventEmitter<never>();
  public upload = new EventEmitter<never>();
  public uploadProgress = new EventEmitter<never>();
  public valueChange = new EventEmitter<never[]>();

  public cancelUploadByUid = jest.fn();
  public clearFiles = jest.fn();
  public pauseFileByUid = jest.fn();
  public removeFilesByUid = jest.fn();
  public resumeFileByUid = jest.fn();
  public retryUploadByUid = jest.fn();
  public uploadFiles = jest.fn();
}
